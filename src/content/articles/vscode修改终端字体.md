---
title: vscode修改终端字体
date: '2024-10-29 22:21'
tags:
  - VsCode
category:
  - Skill
  - IDE
  - VsCode
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221623422.png"
abbrlink: ef8a072c
---

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029220252046.png" alt="image-20241029220252046" style="zoom:80%;" />

vscode终端突然变成了不知道哪儿来的字体，这种字体不等宽，而且是类似于宋体的一种结构，看起来十分的不舒服，所以希望将字体更换回原来的、和系统保持一致的字体。

首先打开vscode的设置，在设置上方搜索框中输入"terminal font"，发现当前的字体为"monospace"，效果跟最上面的图片一下，并且看到了"默认为Editor: Font Family的值"的字样。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221302712.png" alt="image-20241029221302712" style="zoom:80%;" />

点击黄色的字，进入到对应的设置中

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221203665.png" alt="image-20241029221203665" style="zoom:80%;" />

发现这个是关于vscode整体字体的设置的，目前我的vscode整体上除了终端之外，全部都是等宽的非线性字体，还是比较整洁和美观的(没搞做的话，应该就是微软雅黑的字体)，所以我的需求就是将终端也换成这种字体。

点击齿轮，选择"重置此设置"

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221525021.png" alt="image-20241029221525021" style="zoom:80%;" />

发现原本的字体就是这个

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221203665.png" alt="image-20241029221203665" style="zoom:80%;" />

那么好，将终端的也改成这个就好了

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221623422.png" alt="image-20241029221623422" style="zoom:80%;" />

发现终端的字体立马就变了：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029221640365.png" alt="image-20241029221640365" style="zoom:80%;" />

非常的舒服。原来的时候终端字体设置的是"monospace"，而不是现在的"Consolas, 'Courier New', monospace"，怀疑monospace只是里面一部分字符(大概是空格之类的)设置，并不完整，更改成默认的就可以了。





另外如果发现vscode默认的字体也不是等宽的话，可以下载一下JetBrains推出的字体，就是和他们的IDE一样的字体，安装方式见下面的图片，更换方式见上述内容，字体推荐选"Regular"的。

[JetBrains Mono: A free and open source typeface for developers | JetBrains: Developer Tools for Professionals and Teams](https://www.jetbrains.com/lp/mono/)

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029220229200.png" alt="image-20241029220229200" />

在vscode中，如果想要更改终端中的字体，可以采用下面的方式：
