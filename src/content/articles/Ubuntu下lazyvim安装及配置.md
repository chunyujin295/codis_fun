---
title: Ubuntu下lazyvim安装及配置
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 配置及使用
  - lazyvim
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 38a9d704
---

> 本教程的安装教程仅提供一种或几种最简单的方案，更多方案可以自行百度

参考链接：[🛠️ 安装 |LazyVim --- 🛠️ Installation | LazyVim](https://www.lazyvim.org/installation)

# lazyvim安装

```bash
# 克隆项目到 用户配置目录下
git clone https://github.com/LazyVim/starter ~/.config/nvim
```

安装完成之后删除掉该目录下的`.git`

文件执行`nvim`，lazyvim便开始自动配置



## 关于git访问Github

上面的git命令需要git能连接到GitHub，且后续lazyvim执行自动配置等操作时，也是要频繁使用git连接GitHub。如果你的git无法连接Github，那么配置时会报很多错误。

国内用户访问GitHub确实是一个问题，且就算你会使用魔法，当使用git命令访问GitHub时也不一定生效，因为你需要为git添加上代理才可以。

### 方法一

如果你是按照我的[Linux下配置clash全局代理]()的方式为Linux添加了全局代理，那么Git也会受到影响，可以访问GitHub，否则你只能在浏览器或者其他软件上访问外网，但是git还是无法连接到GitHub，这时请参照我的[Windows下终端Git添加代理]()。

### 方法二

另外还有一种方式，那就是将你的本地ssh key公钥添加到你的GitHub上去，发现这样操作之后，无需配置git代理也能快速访问GitHub。[本地ssy key添加到GitHub]()



## 安装fzf

lazyvim的文件查询功能依赖于fzf工具，安装配置及使用教程请见[fzf安装配置与使用]().



## 安装grep

一般Ubuntu上已经安装了grep，这是一个文件内容搜索的工具，lazyvim的文本搜索功能依赖于它。

```bash
sudo apt-get install grep
```

