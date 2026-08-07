---
title: butterfly修改白天模式下主界面字体颜色
date: '2023-10-10 22:39'
tag: Hexo
category:
  - Skill
  - Hexo
abbrlink: 4307f2c8
---



## 修改标题和副标题文字颜色：

打开文件themes/butterfly/source/css/_layout/head.styl

在大约第37和44行开始

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311081121958.png" alt="截屏2023-11-08 11.17.41" style="zoom:50%;" />

在“color”这一行中更改里面的颜色

修改前：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102242968.png" alt="截屏2023-10-10 22.18.54" style="zoom:67%;" />

修改后：（只关注文字颜色，背景颜色因为更换了背景图片所以不同

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311081122714.png" alt="截屏2023-11-08 11.17.54" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102243451.png" alt="截屏2023-10-10 22.18.59" style="zoom:67%;" />

> 43行的颜色参数与网站左上角标题遮罩相关，白色为透明，在移动端表现明显，如果设置为黑色，则会看到黑色方形遮罩，此处仍设置为白色
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202311081047401.jpeg" alt="IMG_2032" style="zoom: 25%;" />

## 修改顶部菜单文字颜色：

打开文件themes/butterfly/source/css/_layout/head.styl

在大约第268行开始

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102244840.png" alt="截屏2023-10-10 22.36.06" style="zoom:50%;" />

在“color”这一行中更改里面的颜色

修改前：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102245862.png" alt="截屏2023-10-10 22.36.22" style="zoom:50%;" />

修改后：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102245932.png" alt="截屏2023-10-10 22.36.37" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102246548.png" alt="截屏2023-10-10 22.46.10" style="zoom:50%;" />