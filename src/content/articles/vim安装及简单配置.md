---
title: vim安装及简单配置
date: '2025-6-2 11:11'
tag:
  - vim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 学习
  - vim学习
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250602112823573.png
abbrlink: 40cbae4c
---

Windows用户现在前往[vim官网](https://www.vim.org/)，点击安装链接，跳转到GitHub之后，发现发现版名称为"gvim"而不是vim，因为gvim是vim的扩展版本，vim存在于纯命令行交互的环境中，而随着现在图形化界面的发展，gvim作为了vim可用作鼠标交互、适用于图形化界面的vim。

# 安装

Windows用户建议前往[官网进行安装发行版](https://github.com/vim/vim-win32-installer/releases)，因为配置文件位置可控。

Linux用户直接使用包管理工具进行安装即可。

macos用户使用[macvim](https://macvim.org/)。当然也可以用包管理工具进行安装。macos Linux本一家。

<mark>安装完成后，如果通过命令启动无法识别，注意添加vim到环境变量。</mark>

# 配置

Windows下安装，通常在安装gvim时要求指定安装目录，安装目录下会存在`_vimrc`这就是gvim的配置文件

Linux下安装完，则会存在`~/.vimrc`文件

配置时向配置文件底部追加内容就行

> 我的vim配置文件备份：https://github.com/chunyujin295/my-vim.git

## 设置显示行号

```vim
set nu
```

## 关闭警告声音和屏幕闪烁

```vim
set vb t_vb=
au GuiEnter * set t_vb=
```

## 设置字体

字体\默认字号

```vim
set guifont=JetBrainsMono Nerd Font\ 14
```

设置了好像没成功，没什么用

## 设置vim内部调用出的外部shell

```vim
set shell=你的内置shell
例如：
set shell=nu
```

<mark>注意等号左右都不能有空格</mark>

### 解决当Nushell设置为vim内置shell时vim使用:!执行shell命令报错

但是发现当在vim中使用`:!`直接执行shell命令时，报错了：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250602230420315.png" alt="image-20250602230420315" style="zoom:80%;" />

这是因为Vim 使用 `shellcmdflag` 来指定如何传递命令给 shell。如果shell设置成为了nushell，需要设置shellcmdflag为`-c`参数，因为这是 Nu Shell 用于执行单行命令的标准参数。

```vim
set shellcmdflag=-c
```

设置完成之后：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-06-02_23-35-35.gif" alt="PixPin_2025-06-02_23-35-35" style="zoom:80%;" />

## 设置缩进长度和tab长度

设置缩进长度为4空格

```vim
set shiftwidth=4
```

设置tab长度为4空格

```vim
set tabstop=4
```

