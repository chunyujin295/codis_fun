# 性能优化说明

本文记录本站做过的性能优化，以及资源压缩的具体方法。改动散落在源码、`public/`、`scripts/` 和 Nginx 配置里，这里统一说明。

## 总览

| 优化项 | 手段 | 收益 |
| ------ | ---- | ---- |
| 咖啡 SVG | svgo 压缩 | 440KB → 72KB（**-83%**） |
| 中文字体 | 本地化 + 子集化 | 11MB/字重 → 838KB（**-92%**） |
| 字体加载 | 移除 Google Fonts、`font-display: swap` | 不再依赖外网，首屏不阻塞 |
| 传输压缩 | Nginx gzip | HTML/CSS/JS/JSON/SVG 压缩约 75–85% |
| 缓存 | Nginx 缓存头 | 静态资源长缓存，字体 30 天 |

---

## 1. SVG 图标压缩

### 背景

`public/coffee.svg` 同时作为 favicon 和首页头像。原始文件是 1254×1254 的矢量图，含 1.3 万个高精度坐标（小数到 8 位），体积 440KB —— 对一张 80px 头像 / 32px favicon 来说严重超标。

### 方法：svgo

[svgo](https://github.com/svg/svgo) 是标准的 SVG 压缩工具。核心是**降低路径坐标精度**（在小尺寸下 8 位小数毫无意义）并合并冗余路径。

```bash
npx --no-install svgo public/coffee.svg \
  -o public/coffee.svg \
  --config svgo.config.mjs
```

配置关键项：

```js
export default {
  multipass: true,                 // 多轮优化
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // 坐标精度降到 2 位小数（80px 显示下不可见差异）
          convertPathData: { floatPrecision: 2, transformPrecision: 2 },
          cleanupNumericValues: { floatPrecision: 2 },
          removeViewBox: false,
        },
      },
    },
  ],
};
```

结果：**440KB → 72KB（-83%）**，视觉无差异。

> 通用经验：SVG 里的 `path` 数据往往由绘图工具导出，坐标冗余严重。凡是小尺寸展示的 SVG（图标、favicon），用 svgo 过一遍通常能省 60–90%。

---

## 2. 字体本地化

### 背景

原方案从 Google Fonts 加载 5 个字体族（Inter、JetBrains Mono、Noto Sans SC、Noto Serif SC）。问题：

1. Google Fonts 在国内访问不稳定，甚至被墙，导致字体加载失败或长时间阻塞。
2. `@import` 写在 CSS 里会串行阻塞首屏渲染。

### 改动

- 移除 `global.css` 里的 `@import`，以及 `BaseLayout.astro` 里的字体 `<link>`。
- 改用**本地自托管**的思源宋体（Source Han Serif CN，简体）。

最终字体配置见 `src/styles/global.css`：

```css
@font-face {
  font-family: "Source Han Serif CN";
  src: url("/fonts/SourceHanSerifCN-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Source Han Serif CN";
  src: url("/fonts/SourceHanSerifCN-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}
```

- 正文（`--font-serif` / `--font-sans`）用 400 Regular，标题用 500 Medium。
- `font-display: swap`：文字先用系统字体渲染，字体下载完成后无缝替换，避免白屏等待。

---

## 3. 字体子集化（核心压缩）

### 背景

完整中文字体动辄 10–24MB（思源宋体单个字重约 11MB），直接上网页不可接受。但一个博客实际用到的汉字只有一两千个，**子集化**可以只保留用到的字形，把体积压缩到几百 KB。

### 方法

`scripts/subset-font.py` 会自动完成两步：

1. **提取字符集**：扫描 `src/` 下所有 `.md`/`.astro`/`.ts`/`.css` 等源码，收集实际出现的字符；再并上 **GB2312 一级常用字（3755 字）** 作为兜底，避免未来新文章缺字。
2. **子集化 + 转 woff2**：调用 `pyftsubset`（fonttools）裁剪字形并输出 woff2。

```bash
# 生成思源宋体 Regular 子集（默认）
python3 scripts/subset-font.py

# 生成指定字重 / 字体
python3 scripts/subset-font.py src/font/SourceHanSerifCN/SourceHanSerifCN-Medium.otf
```

依赖安装（一次性）：

```bash
pip install --break-system-packages fonttools brotli
```

### 结果

| 字体 | 源文件 | 子集后 woff2 | 压缩率 |
| ---- | ------ | ------------ | ------ |
| Source Han Serif CN Regular | 11MB | 838KB | -92% |
| Source Han Serif CN Medium | 11MB | 849KB | -92% |

子集覆盖 3973 个字符（站点实际字符 + GB2312 一级常用字）。

### 什么时候要重新子集化

当**新增文章用到了当前子集之外的生僻字**时，跑一次：

```bash
python3 scripts/subset-font.py
python3 scripts/subset-font.py src/font/SourceHanSerifCN/SourceHanSerifCN-Medium.otf
```

然后 `npm run build`。缺字时文字会回退到系统字体（观感是部分字用了别的字形），肉眼能察觉。

> 源字体放在 `src/font/SourceHanSerifCN/`，只保留 Regular + Medium 两个字重。若要加 Light（300）等其他字重，把对应 `.otf` 放回该目录、跑上面命令、并在 `global.css` 加一条 `@font-face` 即可。

---

## 4. 服务端压缩与缓存（Nginx）

### gzip

本站由 Nginx 直接服务 `dist/`。gzip 配置集中在**主配置** `/etc/nginx/nginx.conf`（避免站点配置里重复定义、互相覆盖）：

```nginx
gzip on;
gzip_vary on;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript
           text/xml application/xml application/xml+rss text/javascript
           image/svg+xml;
```

要点：

- `text/html` 默认总是压缩，无需显式列出（显式列出会触发 `duplicate MIME type` 警告）。
- `application/json` 覆盖 `search-index.json`（搜索索引，218KB）。
- `image/svg+xml` 覆盖 SVG 图标。
- **woff2 字体不加 gzip**：woff2 本身就是压缩格式，gzip 无收益。

实测响应头：HTML / JSON / SVG 均返回 `Content-Encoding: gzip`。

### 缓存

站点配置 `/etc/nginx/sites-available/codis-fun` 中：

```nginx
# 带 hash 的构建产物（CSS/JS），永久缓存
location /_astro/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# 字体，缓存 30 天
location /fonts/ {
    expires 30d;
    add_header Cache-Control "public";
}
```

- `/_astro/` 下是 Astro 构建出的 CSS/JS，文件名带内容 hash，可放心长缓存。
- `/fonts/` 字体文件名不含 hash，缓存 30 天；若更新字体内容需改文件名或等待过期。

### 验证

```bash
# 验证 gzip
curl -sI -H "Accept-Encoding: gzip" http://localhost:5006/ | grep -i content-encoding
# 验证缓存
curl -sI http://localhost:5006/fonts/SourceHanSerifCN-Regular.woff2 | grep -i cache-control
```

---

## 5. 其他已内置的优化

以下由 Astro 构建时自动完成，无需额外配置：

- **HTML/CSS/JS 压缩**：`astro build` 默认 minify 产物。
- **代码分割**：Mermaid、KaTeX 等重库按需动态加载（`import("mermaid")`），没有对应图表的页面不会下载这些大块 JS。
- **搜索索引懒加载**：`search-index.json` 只在用户打开搜索框时才 fetch。

---

## 附录：本次优化的完整改动清单

| 文件 | 改动 |
| ---- | ---- |
| `public/coffee.svg` | svgo 压缩 440KB → 72KB |
| `src/styles/global.css` | 移除 Google Fonts；新增思源宋体 `@font-face`；字体变量本地化 |
| `src/layouts/BaseLayout.astro` | 移除 Google Fonts 的 preconnect/link |
| `public/fonts/*.woff2` | 思源宋体 Regular + Medium 子集 |
| `src/font/SourceHanSerifCN/` | 源字体（Regular + Medium） |
| `scripts/subset-font.py` | 字体子集化脚本 |
| Nginx 主配置 | `gzip_types` 补 `image/svg+xml` |
| Nginx 站点配置 | 新增 `/fonts/` 缓存；移除重复的 gzip 块 |
