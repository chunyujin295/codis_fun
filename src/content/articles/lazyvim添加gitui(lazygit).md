---
title: lazyvim添加gitui(lazygit)
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
abbrlink: 4ad5a2ce
---

lazyvim的git功能有一部分依赖于gitgui：

`<leader>gg`快捷键能打开gitgui

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209185739831.png" alt="image-20250209185739831" style="zoom:80%;" />

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209190453750.png" alt="image-20250209190453750" style="zoom:80%;" /><br>此时查看快捷键，g系列中并没有gg这个快捷键</center></div>

我们进入上面提到的链接中：

他说需要安装gitui工具，其实就是指的lazygit这款跨平台的git工具：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209191700927.png" alt="image-20250209191700927" style="zoom:80%;" />

> lazygit安装教程，其实很简单[lazygit安装与使用]()，就是使用方法需要稍微学习一下，毕竟在大型项目中，对于git的使用可能会比较复杂

安装好之后，在lazyvim中再次查看`<leader>g`系列的指令：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209191821438.png" alt="image-20250209191821438" style="zoom:80%;" /><br>现在可以通过&lt;leader&gt;gg命令在nvim中使用lazygit了</leader>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209192158724.png" alt="image-20250209192158724" style="zoom:80%;" /></center></div>