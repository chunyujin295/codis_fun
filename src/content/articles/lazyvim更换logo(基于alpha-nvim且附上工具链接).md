---
title: lazyvim更换logo(基于alpha-nvim且附上工具链接)
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
abbrlink: 9149a01e
---
进入[Dashboard-nvim | LazyVim](https://www.lazyvim.org/extras/ui/dashboard-nvim)

选择dashboard-nvim的Full Spec，拷贝下来

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209193137496.png" alt="image-20250209193137496" style="zoom:80%;" />

进入nvim的配置文件夹，进入lua/plugins，新建一个.lua文件，我这里取名`my-bashboard.lua`：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209193528817.png" alt="image-20250209193528817" style="zoom:80%;" />

将内容拷贝进去，并在最前面加上return。

打开一个[制作字符字的网站](https://patorjk.com/software/taag/#p=display&f=ANSI%20Shadow&t=KUN*2)，或者[制作字符画的网站](https://www.lddgo.net/image/image-ascii-converter)。但是我这里参考的是`ayamir-nvim`的制作方式：[nvimdots/lua/core/settings.lua at main · ayamir/nvimdots](https://github.com/ayamir/nvimdots/blob/main/lua/core/settings.lua)这是它的配置文件内容：

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209213159460.png" alt="image-20250209213159460" style="zoom:80%;" /><br>太美了</center></div>

这里作者的注释中给出了两条链接

- [TheZoraiz/ascii-image-converter: A cross-platform command-line tool to convert images into ascii art and print them on the console. Now supports braille art!](https://github.com/TheZoraiz/ascii-image-converter)这是一个图片转字符画的工具，作者就是用它实现的这张凌波丽字符。强力推荐。安装它的Release版本即可。
- [问题·Ayamir/Nvimdots Wiki --- Issues · ayamir/nvimdots Wiki](https://github.com/ayamir/nvimdots/wiki/Issues#change-dashboard-startup-image)这个是`ayamir-nvim`关于启动图的配置的解释。

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209215827188.png" alt="image-20250209215827188" style="zoom:80%;" /><br>命令是从官网学的</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209215948688.png" alt="image-20250209215948688" style="zoom:80%;" /><br>配置上</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250209215920104.png" alt="image-20250209215920104" style="zoom:80%;" /><br>简约而不简单</center></div>



# 更新-更好的解决方案

现在我找到了一个更加厉害的转换工具，除了输出艺术文本，还可以自动将图片生成艺术文本后转化为生成适合`alpha-nvim`的lua文件，拿起返回值就能用，强的很，GitHub附有教学

> img2art GitHub官网：[Asthestarsfalll/img2art: Convert image/gif/video to ascii art.](https://github.com/Asthestarsfalll/img2art)
>
> 一个用其配置自己alpha的dashboard教程：[LightingNvim](https://github.com/nxtkofi/LightningNvim/tree/master)，我的配置就是参考的这个，同时这个包含了img2art的部分参数简介

## 安装方式

要求具有python环境，按照官方README教程

```bash
pip install img2art
```

以下命令查看使用方法

```bash
img2art --help
```

> 现在最新版的img2art对于lua的导出会有点bug，我已经跟作者联系并提交了自己的修改分支，期待后续版本的正常使用。

使用命令将本地图片转为配置好的lua文件，该文件返回一个封装好各种数据的名为header的结构体，该结构体与alpha所需数据匹配，拿来即用。具体写法直接见https://github.com/chunyujin295/my-nvim 中my-alpha.lua中的配置，下面简要介绍img2art的使用，一个命令例子：

```bash
img2art .\116603054_p0.jpg  --scale 0.03  --threshold 50  --save-raw ./test.lua --alpha
```

将本地图片解析完之后，转换成开箱即用的lua格式并保存在本地

> --scale 姑且理解为缩放值，浮点数，调整以确保能适配你的neovim主页
>
> --threshold 这是一个色彩相关的数据，调整以确保生成满足你色彩需求的图片
>
> 剩余的指令就是生成适合alpha配置的dashboard图片标题信息的结构体lua文件

效果：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250216033723640.png" alt="image-20250216033723640" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250216033744014.png" alt="image-20250216033744014" style="zoom:80%;" />