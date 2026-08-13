# Codis Fun

<p align="center">
  <img src="./public/coffee.svg" alt="LOGO" width="200">
</p>

个人网站

## 启动

```bash
npm install    # 安装依赖
npm run dev    # 启动开发服务器 → http://localhost:4321
```

## 命令

| 命令              | 说明                         |
| ----------------- | ---------------------------- |
| `npm run dev`     | 启动开发服务器，热更新       |
| `npm run build`   | 构建静态站点，输出到 `dist/` |
| `npm run preview` | 本地预览构建产物             |

## 写文章

### 添加新文章

1. 在 `src/content/articles/` 下新建 `.md` 文件
2. 文件名格式：`YYYY-MM-DD-slug.md`，例如 `2025-08-01-my-post.md`
3. 文件内容如下：

```md
---
title: "文章标题"
date: 2025-08-01
excerpt: "简短摘要，显示在首页卡片上。"
tags: ["标签1", "标签2"]
draft: false
---

文章正文，Markdown 格式。

## 二级标题

支持 **加粗**、*斜体*、`行内代码`、[链接](https://example.com)。

### 代码块

​```python
def hello():
    print("Hello, world!")
​```

> 引用文字。

- 列表项
- 支持 GFM 表格
- 支持任务列表
```

### frontmatter 说明

| 字段       | 必填 | 说明                                                |
| ---------- | ---- | --------------------------------------------------- |
| `title`    | 是   | 文章标题                                            |
| `date`     | 是   | 发布日期，格式 `YYYY-MM-DD` 或 `'YYYY-MM-DD HH:mm'` |
| `excerpt`  | 否   | 文章摘要，显示在首页卡片上                          |
| `tags`     | 否   | 标签列表（复数），`["标签1", "标签2"]`              |
| `tag`      | 否   | 单个标签（兼容旧格式），string 或 array             |
| `category` | 否   | 分类列表（兼容旧格式），string 或 array             |
| `cover`    | 否   | 封面图 URL，显示在文章页顶部                        |
| `sticky`   | 否   | 置顶权重，越大越靠前（如 `999`）                    |
| `abbrlink` | 否   | 短链接标识（兼容 Hexo）                             |
| `draft`    | 否   | 设为 `true` 则文章隐藏，不在首页显示                |

- `draft: true` 适合还没写完的文章，构建时自动跳过
- `tag` / `category` 支持 string 或 array 两种格式，兼容 Hexo 迁移文章

### 封面图

`cover` 字段的文章封面图显示在文章页顶部，被 `object-fit: cover` + `max-height: 480px` 居中裁剪（上下各裁掉一部分）。建议：

| 项目 | 建议 | 说明 |
| ---- | ---- | ---- |
| 比例 | **16:9** | 最通用；喜欢横幅感可上 21:9，避免 1:1 / 4:3 偏方的图 |
| 尺寸 | **1920×1080**（或 1600×900） | 宽 ≥ 1360px 就不会被放大发虚 |
| 构图 | **主体居中** | 上下会被裁掉约 15–20%，关键内容放水平中心线附近 |

- 封面显示宽度随内容列变化（约 640–1360px），高度上限 480px，没有任何单一比例能完全避免裁剪，16:9 居中裁剪后观感最好
- 最低底线：宽 ≥ 1200px，再小在宽屏上会轻微放大发糊

### Markdown 扩展

除了 GFM 标准（表格、代码高亮、任务列表），还支持：

| 功能              | 语法                             | 说明               |
| ----------------- | -------------------------------- | ------------------ |
| **数学公式**      | `$E=mc^2$` 行内，`$$...$$` 块级  | KaTeX 渲染         |
| **流程图/时序图** | ```` ```mermaid ```` 代码块      | Mermaid 客户端渲染 |
| **HTML 标签**     | `<img>` `<video>` `<details>` 等 | 原生 HTML 透传     |

- `remark-math` + `rehype-katex` 处理公式
- Mermaid 支持 flowchart、sequence、class、state、ER、gantt、pie 等全部图表类型

## 自定义

### 改头像

1. 准备一张 1:1 正方形图片（推荐 200×200 以上）
2. 放到 `public/` 目录下，比如 `public/my-avatar.png`
3. 编辑 [`src/lib/constants.ts`](src/lib/constants.ts)，修改第 8 行：

```ts
avatarPath: "/my-avatar.png",  // 改成你的文件名
```

头像默认显示彩色（不置灰）。如果想改回「平时置灰、悬停恢复彩色」，编辑 [`src/components/Hero.astro`](src/components/Hero.astro) 的 `.avatar` 样式，加上：

```css
filter: grayscale(100%);
transition: filter var(--transition-slow), border-color var(--transition-slow);
```

并在 `.avatar:hover` 里加上 `filter: grayscale(0%);`。

### 改标题和简介

编辑 [`src/lib/constants.ts`](src/lib/constants.ts)：

```ts
title: "Codis Fun",           // 浏览器标签页上的标题
headline: "安静的角落",        // 首页大标题
intro: "写一些代码...",        // 首页简介（显示在大标题下方）
```

改完保存，浏览器自动刷新。

### 改标签页图标（favicon）

1. 准备一张 SVG 图标，放到 `public/` 目录下，比如 `public/coffee.svg`
2. 编辑 [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro)，把 `href` 改成你的文件名：

```html
<link rel="icon" type="image/svg+xml" href="/coffee.svg" />
```

改完保存，浏览器自动刷新。

### 调整首页分页数量

首页每页显示 25 篇文章。想改这个数字，编辑 [`src/pages/[...page].astro`](src/pages/%5B...page%5D.astro) 的 `PAGE_SIZE`：

```ts
const PAGE_SIZE = 25;  // 改成你想要的数量
```

### 搜索

全站文章搜索，支持标题 + 正文模糊匹配：
- 点击 Header 右侧 🔍 图标，或按 `Ctrl+K`
- 输入关键词即时过滤，`↑↓` 导航，`Enter` 跳转
- 搜索索引在 `npm run build` 时自动生成（`scripts/build-search-index.mjs`）

### 文章目录树

文章页左侧有自动生成的目录树（TOC），基于文章内 h2–h4 标题：
- 全高固定定位，平滑滑入/滑出
- 点击右侧 `›` 按钮折叠/展开
- 当前阅读位置自动高亮
- 900px 以下自动隐藏

### 设计准则

本项目遵循一套侘寂极简设计准则，写 UI 之前请先调用 `codis-fun-design` skill 查看。详见 [`.claude/skills/codis-fun-design.md`](.claude/skills/codis-fun-design.md)。

## 性能优化

本站做过的资源压缩与性能优化（SVG 压缩、字体子集化、Nginx gzip 与缓存等）及具体方法，详见 [`docs/performance.md`](docs/performance.md)。

## 部署

构建产物是纯静态文件（HTML + CSS + SVG），部署到任意静态托管。

### 本机部署（当前方式）

本站目前就跑在**本机**，由 Nginx 直接服务 `dist/` 目录：

- 站点配置：`/etc/nginx/sites-available/codis-fun`（root 指向 `dist/`，监听 5006 端口，域名 `codis.fun`）
- Nginx 每次请求实时读取 `dist/` 里的文件，因此**改完重新构建即可生效，无需 reload nginx**

修改源码后，重新部署生效只需：

```bash
npm run build    # 重新构建，dist/ 更新，nginx 立即读到新内容
```

浏览器刷新即可看到效果；若没变化按 `Ctrl+Shift+R` 硬刷新，绕过浏览器对旧 HTML/CSS 的缓存。

---

### 服务器部署（Ubuntu 为例）

#### 准备工作

服务器需要以下条件：

| 条件            | 说明                                    |
| --------------- | --------------------------------------- |
| Ubuntu 20.04+   | 或 Debian 11+，任何 Linux 发行版均可    |
| Node.js 18+     | 用于构建站点（见下方安装步骤）          |
| Nginx           | 用作 Web 服务器，提供静态文件服务       |
| 域名（可选）    | 如需 HTTPS 则需要域名；仅 IP 访问可跳过 |
| 80/443 端口开放 | 防火墙 / 安全组放行 HTTP 和 HTTPS       |

#### 第一步：安装 Node.js

```bash
# 使用 NodeSource 安装 Node.js 22.x（LTS）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 验证
node --version   # 应输出 v22.x.x
npm --version    # 应输出 10.x.x
```

#### 第二步：上传代码到服务器

**方式 A：Git 克隆（推荐）**

```bash
# 先把代码推到 GitHub/GitLab，然后在服务器上：
git clone https://github.com/你的用户名/仓库名.git /var/www/codis-fun
cd /var/www/codis-fun
```

**方式 B：scp 上传**

```bash
# 在本地执行，将整个项目传到服务器：
scp -r d:/Code/codis_fun/* user@你的服务器IP:/var/www/codis-fun/
```

#### 第三步：构建

```bash
cd /var/www/codis-fun
npm install
npm run build

# 构建产物在 dist/ 目录下
ls dist/
# 输出：index.html  articles/  favicon.svg  avatar.svg  _astro/
```

#### 第四步：安装并配置 Nginx

```bash
# 安装
sudo apt update
sudo apt install -y nginx

# 创建站点配置
sudo nano /etc/nginx/sites-available/codis-fun
```

写入以下配置：

```nginx
server {
    listen 80;
    server_name 你的域名.com;   # 没有域名就填 _ （下划线）

    root /var/www/codis-fun/dist;
    index index.html;

    # 站点内链一律带尾部斜杠（/2/、/articles/xxx/、/tags/xxx/），
    # 关闭绝对重定向，避免在反向代理 / 端口映射下 301 跳到错误的主机:端口
    absolute_redirect off;

    # 静态文件缓存（CSS、JS 等带 hash 的资源）
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 字体缓存
    location /fonts/ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # SPA 兜底：所有路径都尝试返回 index.html
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Gzip 压缩（text/html 默认已压缩，无需列出）
    gzip on;
    gzip_vary on;
    gzip_comp_level 6;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/codis-fun /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default   # 删掉默认站点（可选）
sudo nginx -t                               # 检查配置
sudo systemctl reload nginx                 # 重载生效
```

#### 第五步：HTTPS（需要域名）

```bash
# 安装 certbot
sudo apt install -y certbot python3-certbot-nginx

# 自动配置 SSL 证书
sudo certbot --nginx -d 你的域名.com

# 证书会自动续期，无需手动操作
sudo certbot renew --dry-run   # 验证续期是否正常
```

#### 第六步：更新网站

每次修改内容后（新增文章、改配置等），在服务器上重新构建：

```bash
cd /var/www/codis-fun
git pull                    # 拉取最新代码（如果用 Git 管理）
npm run build               # 重新构建
# Nginx 指向 dist/，构建完即刻生效，无需重启
```

或者写一个一键更新脚本 `update.sh`：

```bash
#!/bin/bash
cd /var/www/codis-fun
git pull
npm install --silent
npm run build
echo "更新完成 — $(date)"
```

```bash
chmod +x update.sh
./update.sh
```

---

### 平台托管（零运维）

如果不想自己管理服务器，也可以选择：

| 平台             | 方式                                                |
| ---------------- | --------------------------------------------------- |
| **GitHub Pages** | 推送到 `gh-pages` 分支：`npx gh-pages -d dist`      |
| **Netlify**      | 连接仓库，构建命令 `npm run build`，发布目录 `dist` |
| **Vercel**       | 同上，自动识别 Astro 项目                           |
