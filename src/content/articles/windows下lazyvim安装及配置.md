---
title: Windows下lazyvim安装及配置
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
abbrlink: 9c945613
---

# 安装lazyvim

参考链接：[🛠️ 安装 |LazyVim --- 🛠️ Installation | LazyVim](https://www.lazyvim.org/installation)

终端直接执行

```bash
# 克隆项目到 C:\Users\你的电脑用户名\AppData\Local\nvim
git clone https://github.com/LazyVim/starter $env:LOCALAPPDATA\nvim
```

> 记得将git添加上代理的端口，否则可能终端报错无法连接到git，而且后边lazyvim自动配置的时候也从GitHub克隆各种插件，所以确保你的git能正常访问GitHub。具体操作请见另一篇文章[Windows下终端Git开启代理]()。

或者直接去官网[LazyVim/starter: Starter template for LazyVim](https://github.com/LazyVim/starter)下载lazyvim的开始工具starter的源码包到本地`C:\Users\你的电脑用户名\AppData\Local\`下，解压，删除压缩包，改名文件夹名为nvim

> 当然，如果你更改了XDG_CONFIG_HOME环境变量的位置，那么就安装到那个地方

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208094851482.png" alt="image-20250208094851482" style="zoom:80%;" />下载lazy-starter的压缩包</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208094501180.png" alt="image-20250208094501180" style="zoom:80%;" /><br>解压后转移到Local下，并改名为nvim</center></div>

然后需要删除`C:\Users\你的电脑用户名\AppData\Local\nvim`下的`.git`

之后再次启动nvim

```baeh
nvim
```

就开始自动配置了

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208010031017.png" alt="image-20250208010031017" style="zoom:80%;" /><br>lazyvim自动配置中</center></div>

## 关于git访问Github

lazyvim执行自动配置等操作时，要频繁使用git连接GitHub。如果你的git无法连接Github，那么配置时会报很多错误。

国内用户访问GitHub确实是一个问题，且就算你会使用魔法，当使用git命令访问GitHub时也不一定生效，因为你需要为git添加上代理才可以。

### 方法一

你需要确保能魔法，然后参照我的[Windows下终端Git添加代理]()。

### 方法二

另外还有一种方式，那就是将你的本地ssh key公钥添加到你的GitHub上去，发现这样操作之后，无需配置git代理也能快速访问GitHub。[本地ssy key添加到GitHub]()



## 关于lazyvim

lazyvim相当于一套配置好了的neovim，如果用户想要自己配置属于自己的lazyvim，但是无从下手，不妨先安装lazyvim，然后查看一下它是如何配置的，再自己在其基础上进行修改。lazyvim的配置包结构非常规范，对用户十分具有参考价值。

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208013520646.png" alt="image-20250208013520646" style="zoom:80%;" /><br>lazyvim配置文件结构-非常符合nvim的配置文件结构要求</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208011731774.png" alt="image-20250208011731774" style="zoom:80%;" /><br>配置好的样子</center></div>

可以看到主界面支持很多的功能，但是`Find File`、`Recent Files`、`Config`等功能都依赖于`fzf`工具，而`Find Test`功能依赖于`rg`(ripgrep)工具，需要我们进行安装，请移步对应的文章。
