---
title: Nerd字体配置
date: '2025-5-31 16:58'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - 字体
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/16ff712d01d606e2~tplv-t2oaga2asx-jj-mark%3A3024%3A0%3A0%3A0%3Aq75.png
abbrlink: f0c29b2a
---

众所周知，在配置终端的时候，往往因为字体不支持，导致很多花里胡哨的图标和渲染无法正确加载出来。这就不提到一个万能无敌的字体系列——Nerd字体。

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/16ff712d01d606e2~tplv-t2oaga2asx-jj-mark%3A3024%3A0%3A0%3A0%3Aq75.png" alt="img" style="zoom:80%;" />
        <br>
        可见Nerd字体是图标的集大成者
    </center>
</div>

下载地址：[Nerd Fonts - Iconic font aggregator, glyphs/icons collection, & fonts patcher](https://www.nerdfonts.com/font-downloads)

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206091642269.png" alt="image-20250206091642269" style="zoom:80%;" />
	<br>
        这里推荐JetBrainsMono的Nerd字体
    </center>
</div>
# 字体安装

## LInux安装

等待进行补充

## Windows安装

下载之后解压得到一大堆的.tff字体文件，我们选择字体`JetBrainsMonnoNerdFont-Medium.tff`安装即可

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206094103293.png" style="zoom:80%;" />
    <br>
    这个是一个中等粗细的字体，bond为粗，light为细，medium为中等
    </center>
</div>
如果觉得太粗可以在安装light，选择由己。

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206094248313.png" alt="image-20250206094248313" style="zoom:80%;" />
        <br>
        双击打开，点击安装
    </center>
</div>

## Windows下进行配置

### 终端(Windows Terminal)的配置

参考连接：[Windows 终端自定义提示符设置 | Microsoft Learn](https://learn.microsoft.com/zh-cn/windows/terminal/tutorials/custom-prompt-setup)

#### Win11：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206092650242.png" alt="image-20250206092650242" style="zoom:80%;" /><br>打开powershell，点击下拉角标</center><div>
选择“ **外观**”。 在 **“字体”** 下拉菜单中，选择 *Cascadia Code NF* 或要使用的 Nerd Font。

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206221942756.png" alt="image-20250206221942756" style="zoom:80%;" />
    </center>
</div>

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206222003077.png" alt="image-20250206222003077" style="zoom:80%;" />
    </center>
</div>
#### win10：

安装windows终端[Windows Terminal - Windows官方下载 | 微软应用商店 | Microsoft Store](https://apps.microsoft.com/detail/9n0dx20hk701?launch=true&mode=full&hl=zh-cn&gl=cn&ocid=bingwebsearch)

配置同上

### vscode终端字体配置

打开设置，输入font，点击左侧终端列表，右侧"Font Family"中输入字体名`JetBrainsMono NF Medium`即可。

> <div>
>     <center>
>         <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206094826821.png" alt="image-20250206094826821" style="zoom:80%;" />
>         <br>
>         字体名称在.tff文件中可以查看到
>     </center>
> </div>

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250206095036403.png" alt="image-20250206093345719" style="zoom:80%;" />
    </center>
</div>

ctrl + s保存之后终端字体立刻就更改了，否则重启vs试一下。