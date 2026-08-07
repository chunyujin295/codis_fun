---
title: lazyvim安装了但是不生效
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 问题解决
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 9a70019a
---
参考教程：[linux下使用neovim但是出现版本过低的问题无法使用lazyvim | Yuzai Blog](https://docs.yuzaicn.com/常用工具/Vim配置/nvim/neovim-linux)

如果你确实安装了lazyvim，并在.config下添加了nvim文件夹，但是启动nvim的时候发现lazyvim并没有开始配置。

或许是因为你的nvim版本太老了，你可以使用`nvim --version`查看自己的版本，或者干脆直接`nvim`进入主页面查看版本。

前往lazyvim官网[🚀 Getting Started | LazyVim](https://www.lazyvim.org/)，查看最低neovim版本要求，来确认你的neovim版本是否确实低于最低要求了。

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208154713417.png" alt="image-20250208154713417" style="zoom:80%;" /><br>好吧，apt有时候确实维护的很慢，uos上才只能安装0.3版本的</center></div>

接下来你需要卸载你的旧版neovim，如果你是通过apt安装的：

``` bash
sudo apt-get remove neovim # 直接卸载掉
```

然后自己手动去官网下载一份Release版本的，安装教程见[Ubuntu下neovim+lazyvim安装及配置]()

