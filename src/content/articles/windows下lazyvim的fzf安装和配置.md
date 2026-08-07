---
title: Windows下lazyvim的fzf安装和配置
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
abbrlink: 8e71814d
---

# lazyvim的查找文件功能

依赖于fzf软件，这是一个go语言编写的跨平台的文件模糊查找工具，Windows下可以直接访问GitHub官网进行relase版本的下载和安装：[Releases · junegunn/fzf](https://github.com/junegunn/fzf/releases)

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208010839553.png" alt="image-20250208010839553" style="zoom:80%;" /><br>选择好版本</center></div>

解压完之后发现直接就是一个.exe程序，将其添加在环境变量中以便在任何位置都能使用它：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208011255173.png" alt="image-20250208011255173" style="zoom:80%;" />
<br>可以先将fzf.exe转移到其他路径下
</center></div>


终端中输入`fzf`即可执行：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208011452369.png" alt="image-20250208011452369" style="zoom:80%;" /></center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208013038024.png" alt="image-20250208013038024" style="zoom:80%;" /><br>现在lazyvim支持文件查询功能了</ber></center></div>

> fzf更详细的安装及配置，可以查看[fzf安装配置及使用]()

# 新版本lazyvim安装fzf方法

现在最新版本的lazyvim中可以通过内部直接安装的方式启动fzf：

lazyextras中搜索fzf-lua或者editor.fzf

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250601105734662.png" alt="image-20250601105734662" style="zoom:80%;" />

按x直接安装即可