---
title: Hexo自动化提交-gulp压缩静态资源
date: '2024-10-10 19:22'
tag: Hexo
category:
  - Skill
  - Hexo
abbrlink: 49b78e
---



```shell
hexo clean
hexo generate
gulp  #进行css压缩
hexo deploy 或 hexo server
```



# 关于gulp

gulp可以对于网站静态文件进行压缩，缩小网站静态体积，加快加载速度

[Hexo-gulp压缩静态资源加快加载速度 | Towel (chunyujin.top)](https://chunyujin.top/chunyujin/9dba5c90)

# 命令精简

使用了gulp时候，构建发布需要四个命令：

```shell
hexo clean
hexo g
gulp
hexo deploy
```

# 自动化-很好用

这四个命令，可以都写在`package.json`文件中。直接替换文件中对应位置的代码即可

```json
"scripts": {
  "build": "hexo clean && hexo g && gulp",
  "deploy": "hexo clean && hexo g && gulp && hexo deploy"
}
```

构建只需要执行`npm run build`，构建+发布只需要执行`npm run deploy`。

甚至可以加上git相关的操作，以及一个一步到位的操作：

```json
  "scripts": {
    "build": "hexo clean && hexo g && gulp",
    "deploy": "hexo clean && hexo g && gulp && hexo deploy",
    "git_push": "git pull origin main && git add . && git commit -m \"change\" && git push origin main",
    "auto": "git add . && git commit -m \"change\" && git pull origin main && hexo clean && hexo g && gulp && hexo deploy && git add . && git commit -m \"change\" && git push origin main"
  },
```

