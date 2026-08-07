---
title: Qt代码格式化-使用astyle插件
date: '2024-8-7 21:37'
tag:
  - Qt
category:
  - Qt
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202408041153746.png'
abbrlink: 3a989153
---

具体配置请见下面文章[天上人间 (cnblogs.com)](https://www.cnblogs.com/hhddd-1024/p/17812399.html)

> 其他参考文章：
> [QT 代码格式化 | 配置Beautifier - 简书 (jianshu.com)](https://www.jianshu.com/p/e91ed18d4cfd)
> [qt creator 代码格式化工具Astyle的配置_qt creater 配置astyle-CSDN博客](https://blog.csdn.net/okpfsje123/article/details/107933946)
>
> [Qt Creator 代码格式化的高级配置_qt creator代码格式化-CSDN博客](https://blog.csdn.net/zzs0829/article/details/83933747)

## 以下是补充说明：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807094452154.png" alt="image-20240807094452154" style="zoom:80%;" />

> 红色部分是astyle可执行程序的路径
>
> 蓝色部分是用户自定义的模块：
> 点击“Add”为添加新设置，“Edit”对于当前模块进行更改
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807094707645.png" alt="image-20240807094707645" style="zoom:80%;" />
>
> > 模块的设置基本框架为：
> > Name可以自定义
> > Value部分：
> >
> > ​	必须先使用`--style=`添加一个astyle的固定风格，该风格是astyle插件中预先设置好的诸多风格之一，可以在[astyle官方文档]([Artistic Style (sourceforge.net)](https://astyle.sourceforge.net/astyle.html))进行查看，也可以在astyle安装目录子文件夹file下查看有哪些预定风格：
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807095017257.png" alt="image-20240807095017257" style="zoom:80%;" />
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807095005956.png" alt="image-20240807095005956" style="zoom:80%;" />
> >
> > 需要注意的是，在自定义Value部分时，必须要先设定好这样一个风格，否则会报错如：
> > Failed to format: The command "D:\software\astyle-3.5.2-x64\astyle.exe" terminated with exit code 1..
> > Error in Beautifier: Cannot open documentation file "C:/Users/30297/AppData/Roaming/QtProject/qtcreator/beautifier/documentation/artisticstyle.xml".
> > 等
> >
> > 另外就是自定义部分，下面是一个基于allman格式的自定义模板：
> > ```shell
> > --style=allman
> > indent=spaces=4			# 缩进采用4个空格
> > indent-switches			# -S  设置 switch 整体缩进
> > indent-cases			# -K  设置 cases 整体缩进
> > indent-namespaces		# -N  设置 namespace 整体缩进
> > indent-preproc-block	# -xW 设置预处理模块缩进
> > indent-preproc-define   # -w  设置宏定义模块缩进	
> > pad-oper                # -p  操作符前后填充空格
> > #delete-empty-lines      # -xe 删除多余空行
> > add-braces              # -j  单行语句加上大括号
> > align-pointer=name      # *、&这类字符靠近变量名字
> > #align-pointer=type
> > ```
> >
> > 如果自定义配置格式书写有问题，也会出现上述报错。即上述报错一般都源自于自定义配置模块编写出错，仔细检查对照一下即可。

### 设置保存文件时自动格式化

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807095404788.png" alt="image-20240807095404788" style="zoom: 67%;" />

"Enable auto format on file save"