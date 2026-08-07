---
title: Windows下lazyvim的rg安装和配置
date: '2025-6-1 11:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 配置及使用
  - lazyvim
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250601110734614.png
abbrlink: 5d69b84a
---

## lazyvim的依据文本查询功能

在lazyvim中，如果想要根据文本内容进行搜索，可以在开始界面使用g按钮

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250601110400511.png" alt="image-20250601110400511" style="zoom:80%;" /><br>但是我们发现提示需要安装rg这个软件在Windows系统上</center></div>

lazyvim的依据文本查询功能依赖于rg(ripgrep)软件，这是一个用来根据内容进行查询的跨平台工具，安装了它，我们可以查询一些大概知道有什么内容但是忘记了名字和位置的文件。

进入GitHub安装release发布版本：[Release 14.1.1 · BurntSushi/ripgrep](https://github.com/BurntSushi/ripgrep/releases/tag/14.1.1)

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208012313894.png" alt="image-20250208012313894" style="zoom:80%;" /><br>安装MSVC版本可能需要你配置了MSVC工具链</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208012446748.png" alt="image-20250208012446748" style="zoom:80%;" /><br>解压到你能找到的地方</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208012601645.png" alt="image-20250208012601645" style="zoom:80%;" /><br>添加到环境变量</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208012849171.png" alt="20250208012849171" style="zoom:80%;" /><br>lazyvim可以使用Find Text功能了</center></div>

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250601110734614.png" alt="image-20250601110734614" style="zoom:80%;" />