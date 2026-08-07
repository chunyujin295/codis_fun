# Codis Fun

安静的角落 · 个人网站

## 启动

```bash
npm install    # 安装依赖
npm run dev    # 启动开发服务器 → http://localhost:4321
```

## 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器，热更新 |
| `npm run build` | 构建静态站点，输出到 `dist/` |
| `npm run preview` | 本地预览构建产物 |

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

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `excerpt` | 否 | 文章摘要，显示在首页卡片上 |
| `tags` | 否 | 标签列表，显示在文章页顶部 |
| `draft` | 否 | 设为 `true` 则文章隐藏，不在首页显示 |

- `draft: true` 适合还没写完的文章，构建时自动跳过
- 支持 GFM 表格、代码块（自动语法高亮）、任务列表

## 自定义

### 改头像

1. 准备一张 1:1 正方形图片（推荐 200×200 以上）
2. 放到 `public/` 目录下，比如 `public/my-avatar.png`
3. 编辑 [`src/lib/constants.ts`](src/lib/constants.ts)，修改第 8 行：

```ts
avatarPath: "/my-avatar.png",  // 改成你的文件名
```

### 改标题和简介

编辑 [`src/lib/constants.ts`](src/lib/constants.ts)：

```ts
title: "Codis Fun",           // 浏览器标签页上的标题
headline: "安静的角落",        // 首页大标题
intro: "写一些代码...",        // 首页简介（显示在大标题下方）
```

改完保存，浏览器自动刷新。

### 调整首页分页数量

首页每页显示 16 篇文章。想改这个数字，编辑 [`src/pages/[...page].astro`](src/pages/%5B...page%5D.astro) 第 12 行：

```ts
const PAGE_SIZE = 16;  // 改成你想要的数量，比如 10、25、50
```

数字越大，首页越长。<br>
设为 `9999` 相当于不分页。

## 部署

构建产物是纯静态文件（HTML + CSS + SVG），部署到任意静态托管。

---

### 服务器部署（Ubuntu 为例）

#### 准备工作

服务器需要以下条件：

| 条件 | 说明 |
|------|------|
| Ubuntu 20.04+ | 或 Debian 11+，任何 Linux 发行版均可 |
| Node.js 18+ | 用于构建站点（见下方安装步骤） |
| Nginx | 用作 Web 服务器，提供静态文件服务 |
| 域名（可选） | 如需 HTTPS 则需要域名；仅 IP 访问可跳过 |
| 80/443 端口开放 | 防火墙 / 安全组放行 HTTP 和 HTTPS |

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

    # 静态文件缓存（CSS、SVG 等带 hash 的资源）
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA 兜底：所有路径都尝试返回 index.html
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    gzip_min_length 256;
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

| 平台 | 方式 |
|------|------|
| **GitHub Pages** | 推送到 `gh-pages` 分支：`npx gh-pages -d dist` |
| **Netlify** | 连接仓库，构建命令 `npm run build`，发布目录 `dist` |
| **Vercel** | 同上，自动识别 Astro 项目 |
