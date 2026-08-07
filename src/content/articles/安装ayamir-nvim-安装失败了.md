---
title: 安装ayamir-nvim-安装失败了(此贴终结)
date: '2025-5-31 16:59'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 配置及使用
  - ayamir-nvim
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 6f98eb4e
---

# 前置工作

这是一套关于neovim的配置，所以安装它之前请您先确保自己安装了neovim。

如果你之前安装了lazyvim或者其他的neovim的修改插件，确保正确先将这些配置删除[neovim配置的卸载]()

# 关于ayamir-nvim

请看官网及知乎介绍

- [ayamir/nvimdots：一个配置良好且结构良好的 Neovim。 --- ayamir/nvimdots: A well configured and structured Neovim.](https://github.com/ayamir/nvimdots)
- [我的现代化Neovim配置 - 知乎](https://zhuanlan.zhihu.com/p/382092667)

其实我也不确定叫不叫这个名字，作者本人名字叫ayamir且是一位Eva绫波厨(俺也一样)(我猜名字直接去**Aya**na**mi** **R**ei)，所以我也直接取了`ayamir-nvim`。

# 安装

这类配置的安装方式都基本同lazyvim一样，克隆或下载配置文件包，该名nvim，放到`~/AppData/Local/nvim`(Windows)或`~/.config/nvim`(Linux)。

这部分可以直接去官网看readme，但是偶尔可能自己实际配置的时候遇到一些小问题，因此我在这里通过记录自己安装过程的方式。

建议使用官方给出的安装命令进行安装，而不是直接将仓库克隆为本地的nvim，因为可能里面一些插件的安装我们并没有执行。

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209142134153.png" alt="image-20250209142134153" style="zoom:80%;" /><br>官方给出的安装命令</center></div>

## Windows

我直接

```bash
Set-ExecutionPolicy Bypass -Scope Process -Force; Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/ayamir/nvimdots/HEAD/scripts/install.ps1'))
```

结果发现报错，后来仔细一看官方要求powershell版本要大于7.1，因此要去升级一下powershell的版本[powershell版本升级]()

搞完了之后重新执行一下。

### 遇到问题了

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209145531429.png" alt="image-20250209145531429" style="zoom:80%;" /><br>开始执行了，但是发现很多报错....</center></div>

阅读了一下，发现就是因为缺少这些工具，所以需要安装一下。

1.首先就是要确保自己安装了`scoop`这个Windows下的包管理工具，我之前已经安装了，所以需要的小伙伴自行百度。

2.安装make，发现开始自动使用`scoop`进行了安装，但是报错说缺少main这个bucket，而且下面缺少的也都是在scoop中尝试进行了安装.......

**马萨卡!!??**

<u>官方已经写好了使用scoop在main这个bucket里面进行安装了吗!!</u>

[给 Scoop 加上这些软件仓库，让它变成强大的 Windows 软件管理器 - 少数派](https://sspai.com/post/52710)

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209150432536.png" alt="image-20250209150432536" style="zoom:80%;" /><br>果然啊，按照教程添加上main bucket了</center></div>

**那现在, 再执行一遍安装命令试试**

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209150654923.png" alt="image-20250209150654923" style="zoom:80%;" /><br>开始遇水搭桥，爽了</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209151133394.png" alt="image-20250209151133394" style="zoom:80%;" /><br>Yes,Yes,Yes!!</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209151917576.png" alt="image-20250209151917576" style="zoom:80%;" /><br>安装的东西好多好慢啊<br>感觉我的C盘要爆炸了</center></div>

关于Ruby的安装, 要不然就直接按照提示, 执行ENTER, 要不然就通过官网进行安装.

[Windows环境下安装Ruby教程_ruby.exe-CSDN博客](https://blog.csdn.net/Alive_tree/article/details/103043158))

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209153509080.png" alt="image-20250209153509080" style="zoom:80%;" />

安装完之后,重新执行上面的

----

### Windows下安装失败了家人们.....

麻蛋, 还是不行, 构建失败了, 还是缺少东西,真是可恶啊,我还是老老实实用lazyvim吧.....

Ubuntu下倒是能装上