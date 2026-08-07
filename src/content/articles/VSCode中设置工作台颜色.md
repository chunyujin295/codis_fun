---
title: vscode中设置工作台颜色
date: '2023-12-8 12:51'
tag:
  - Linux
  - vscode
category:
  - Skill
  - Shell
abbrlink: 525df755
---

> 由于远程Linux服务器的oh-my-zsh主体文字颜色在主题中不好更改，此处采用更改vscode本地终端主体文字颜色的方法，实现远程连接Linux时，自定义主体文字颜色

通过将以下内容添加到用户设置中：
ctrl + , 并搜索 workbench（工作台)【或者在设置中找到工作台】，进入“外观”，找到“Color Customization”，然后点击「Edit in settings.json」（在settings.json中编辑）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202312080943844.png" alt="截屏2023-12-08 09.43.04" style="zoom:50%;" />

在最后加上如下语句:

```json
//终端颜色配置
"workbench.colorCustomizations" : 
{
	//可以将鼠标放到下面的色号上根据自己的偏好进行选择
	"terminal.foreground" : "#37FF13", //主体文字颜色，此处设置的绿色
 	"terminal.background" : "#2b2424" //背景颜色，可以不设置，保持与主题一致
 }
```

更改前后：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202312081023546.png" alt="截屏2023-12-08 10.20.07" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202312081024865.png" alt="截屏2023-12-08 10.20.17" style="zoom:50%;" />

另外还可以进行字体以及字体大小修改
"terminal.integrated.cursorBlinking": true,
"terminal.integrated.lineHeight": 1.2,
"terminal.integrated.letterSpacing": 0.1,
"terminal.integrated.fontSize": 15, //字体大小设置
"terminal.integrated.fontFamily": "Lucida Console", //字体设置
"terminal.integrated.shell.linux": "/bin/zsh",