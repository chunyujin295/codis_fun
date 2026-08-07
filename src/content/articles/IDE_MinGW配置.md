---
title: MinGW配置
date: '2023-3-17 20:48'
tag: MinGW
category:
  - Skill
  - IDE
abbrlink: 91f40f34
---

#### 安装MinGW

相比在 Linux 平台上安装 GCC 编译环境，在 Windows 平台上安装 MinGW 是比较简单的，只需经历以下几个过程。

1. 打开 [MinGW 官网](https://osdn.net/projects/mingw/)（点击即可进入官网），下载 MinGW 安装包。

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215215731250.png" alt="image-20221215215731250" style="zoom:67%;" />

2. 下载完成后，会得到一个名为 mingw-get-setup.exe 的安装包，双击打开它，可以看到如下的对话框：

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215215752602.png" alt="image-20221215215752602" style="zoom:67%;" />

3. 直接点击“Install”，进入下面的对话框，自定义安装位置，然后选择continue

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215215808186.png" alt="image-20221215215808186" style="zoom:67%;" />

4. 进入安装 MinGW 配置器的界面。安装完成之后，得到一个名为 "MinGW Installer Manager" 的软件，借助它，可以随时根据需要修改 GCC 编译器的配置。点击“continue”,会自动弹出配置界面，如下所示：

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215215823311.png" alt="image-20221215215823311" style="zoom:67%;" />

5. 为使 GCC 同时支持编译 C 语言和 C++，需勾选图中标注的 2 项。我们知道，GCC 还支持其它编程语言，读者可借助此配置器，随时实际需要安装自己需要的编译环境。勾选完成后，在菜单栏中选择`Installation -> Apply Changes`，弹出如下对话框：

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215215851706.png" alt="image-20221215215851706" style="zoom:67%;" />


选择“Apply”。然后耐心等待，直至安装成功，即可关闭此界面。注意，整个安装过程中可能会提示某些组件下载失败，但没关系，后续需要时，可以通过 MinGw Installer（图 4 所示）安装界面中的 “All Packages”选项中，手动选择指定的安装包进行安装。

#### 添加到环境变量

打开`我的电脑`->`属性`->`高级系统设置`->`“高级”中的环境变量`



<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215213001922.png" alt="image-20221215213001922" style="zoom:67%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215213141396.png" alt="image-20221215213141396" style="zoom: 67%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215213248912.png" alt="image-20221215213248912" style="zoom:67%;" />

在上方的“用户变量”的Path变量中添加MinGW的bin的位置

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215213407962.png" alt="image-20221215213407962" style="zoom:67%;" />

> 也可以在下方的“系统变量”的Path中添加MinGW的bin的位置
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215213829809.png" alt="image-20221215213829809" style="zoom:67%;" />
>
> 环境变量、系统变量、用户变量的关系：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215214853021.png" alt="image-20221215214853021" style="zoom: 50%;" />
>
> 环境变量只是一个总称，代表了系统变量和用户变量，因此我们说环境变量都是指的系统变量和用户变量。系统变量就是系统级别的变量，用户需要使用系统变量。如果系统变量被修改了，而任何系统用户都在用系统变量，因此每个系统用户都将受到影响。用户变量运行在系统变量之上的，每个用户拥有不同的用户变量，不同用户的用户变量之间是并列的，也是互不干扰的。

#### 检验配置完成

打开命令行提示符，输入`gcc -v`或者`g++ -v`

出现下面则说明成功

<img src = "https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-12-15%20220238.png" style="zoom: 67%;" >