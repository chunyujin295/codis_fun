---
title: Windows查看进程中快捷键是否冲突
date: '2024-10-29 14:10'
tag:
  - Windows
category:
  - Skill
  - Windows
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029141056514.png
abbrlink: e43a59fb
sticky:
---
遇到快捷键冲突的情况，一个个关软件去试总归是个笨办法，有没有什么方式可以快速查看电脑上注册的全局快捷键呢？搜索了一下，发现还真有：OpenArk
这里是官网链接：https://openark.blackint3.com/

注意：
1、OpenArk属于逆向工具，会调用系统敏感权限，因此下载时会报毒，介意的人最好不要下。
2、使用OpenArk检索注册的系统热键时，可能会会提示让你关闭HVCI功能，也就是内存完整性，这个功能是win10/win11之后新加的，注重电脑安全的，最好在使用完软件之后再打开，开、关之后需要重启电脑。打开方式在设置里，搜索设备安全性：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029140357593.png" alt="image-20241029140357593" style="zoom:80%;" />


以下是使用OpenArk查看热键冲突的使用步骤：
1、先以管理员权限运行程序
2、点击系统热键Tab
3、点击进入内核模式
4、去掉正则的勾选
5、输入要搜索的快捷键组合

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029140411420.png" alt="image-20241029140411420" style="zoom:80%;" />