---
title: msys2与msvc编译ffmpeg-有人成功有人失败了
date: '2026-3-9 13:24'
tag:
  - Ffmpeg
  - MinGW
category:
  - Learn
  - Cpp
  - ffmpeg
  - 编译
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/ffmpeg-logo.jpg'
abbrlink: bf110e6a
---

> 原文地址：[用msys2与msvc编译FFmpeg—FFmpeg调试环境搭建](https://ffmpeg.xianwaizhiyin.net/debug-ffmpeg/msys2-msvc.html)
>
> 笔记中可能对原有教程进行了一些补充与改进

本文讲解如何使用 msys2 + msvc 来编译 FFmpeg ，msys2 的安装请看 [《MSYS2介绍》](https://ffmpeg.xianwaizhiyin.net/msys2/intro.html)。

下面开始操作，先找到 **x64 Native Tools Command Prompt for VS 2019** 这个命令工具（vs2022 x64、2026 x64同理），点击它打开命令行，如下：

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-6.png)

**这样打开的命令行 是有 vs2019 的环境变量的**，如下图：

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-7.png)

千万不要用下面这种 win+R 的方式打开命令行，这样子打开命令行是没有 vs2019 的环境变量的。

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-8.png)

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-9.png)

------

为了让 MSYS2 保留 VS2019 Developer Command Prompt 中的 PATH，使 MSYS2 不重写 PATH，从而可以直接调用 cl、link 等工具，需要修改 `C:\msys64\msys2_shell.cmd` 中的 `rem set MSYS2_PATH_TYPE=inherit`，去掉rem（rem是cmd中注释的意思），变成`set MSYS2_PATH_TYPE=inherit`。使MSYS2的环境变量继承当前CMD的窗口的环境变量。

------

在 **x64 Native Tools Command Prompt for VS 2019** 命令窗口输入 `cd c:\msys64\` （取决于你安装的msys64的位置）先回到 msys64目录。

然后再输入 `.\msys2_shell.cmd -mingw64`，启动 msys2 命令行窗口，如图：

提醒：`-mingw64` 是指使用 64 位的 gcc 环境，但是本文不使用 gcc 编译器，用的是 MSVC 编译器。

由于上面使用 x64 打开的命令行窗口，所以使用的是 msvc 64 位的编译器，如果需要使用 32 位的 msvc ，要用 **x86** Native Tools Command Prompt for VS 2019 打开 msys2 环境。

```
#回到 MSYS2 的安装目录
cd c:\msys64\
#启动 msys2 命令行
.\msys2_shell.cmd -mingw64
```

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-10.png)

在 msys2 命令行窗口 输入 `echo $LIB` ，可以看到 msys2 命令行窗口 已经继承了 vs2019 的 lib 环境变量。

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-11.png)

再输入一下 `which cl.exe` ，确认一下 cl.exe 是在vs2019的目录下。

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/cuda-0-12.png)

然后输入`which link.exe`，看一下 link.exe 是否是vs下的link.exe

![image-20260303133454768](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260303133454768.png)

> 如果你发现link.exe的位置不是vs目录下的那个，而是msys中自带的：
>
> 那么说明msys2的link.exe环境变量优先于了CMD环境中的vs带有的link.exe。你可以寻找其他方式，使系统中vs的link.exe优先级高于msys2中的，这样which优先找到的是vs下的。也可以参考[《官方MSVC编译FFmpeg》](https://trac.ffmpeg.org/wiki/CompilationGuide/MSVC)中给出的解决方案https://trac.ffmpeg.org/ticket/3203：
>
> ![image-20260303133109826](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260303133109826.png)
>
> 在msys2中执行：
>
> > ```bash
> > export PATH="/d/SoftWare/VS/vs2022/VC/Tools/MSVC/14.42.34433/bin/HostX64/x64:$PATH"
> > hash -r
> > which link.exe
> > ```
>
> 或者：
>
> ![image-20260303133408722](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260303133408722.png)
>
> 将msys中 /bin/link.exe 删除 或者 改名(建议，比如改成link1.exe，后续再改回来)，然后在原来msys2窗口中执行`which link.exe`，现在打印的应该是vs下的link.exe了。
>
> > 本文原作者的记录：(实际上下面的脚本没有变，但是我还是无法拿到msvc的link.exe)
> >
> > 提醒：FFmpeg-4.4.1 版本已经不需要 重命名 `C:/msys64/usr/bin/link.exe` 为 `C:/msys64/usr/bin/link.bak` ， 避免和MSVC 的 link.exe 抵触。早期的版本可能需要。因为在 configure 里面编译的时候，调用的是 ./compat/window/mslink ，如下：
> >
> > ![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msvc-0-1.png)
> >
> > ```
> > ./compat/window/mslink 代码
> > #!/bin/sh
> > 
> > LINK_EXE_PATH=$(dirname "$(command -v cl)")/link
> > if [ -x "$LINK_EXE_PATH" ]; then
> >     "$LINK_EXE_PATH" $@
> > else
> >     link.exe $@
> > fi
> > exit $?
> > ```
> >
> > 上面是 `mslink` 的代码，可以看到，他的逻辑就是优先 使用 跟 `cl.exe` 同目录下的 `link.exe`。`cl.exe` 只有在vs2019 那里才有，`C:/msys64/usr/bin` 目录下没有 `cl.exe`，所以会优选使用 vs2019 里面的 `link.exe`，所以不重命名 `C:/msys64/usr/bin/link.exe` 也没关系。

------

MSYS2 + MSVC 环境已经准备好了，MSYS2 命令行已经继承了 vs2019 的环境变量，下面开始编译 FFmpeg。

1. 上 [Github](https://github.com/FFmpeg/FFmpeg) 或者 [FFmpeg官网(推荐，有正式发行版源码)](https://www.ffmpeg.org/download.html) 下载 FFmpeg 源代码（原教程以4.4.1为例），拷贝到 下图中的目录，这样 msys2 环境也能找到。

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msvc-1-1.png)

2.回到 msys2 命令行窗口，安装所需软件，命令如下：

```
pacman -S diffutils make pkg-config yasm
```

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msvc-1-2.png)

3.

```

```

4.进入 FFmpeg-n4.4.1 源码目录，执行 configure ，如下：（记得改一下路径）

```
cd /home/loken/ffmpeg/FFmpeg-n4.4.1

./configure \
--prefix=/home/loken/ffmpeg/build64/ffmepg-4.4-msvc \
--enable-gpl \
--enable-nonfree \
--enable-shared \
--disable-optimizations \
--disable-asm \
--disable-stripping \
--toolchain=msvc

make -j8
# 要执行 make install
make install
```

> 上述命令可以让ai看一下，有什么其他的可以优化性能和包体积的选项（记得改一下路径）
>

5.编译完成之后，ffmepg-4.4-msvc 目录如下：

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msvc-1-3.png)

![img](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msvc-1-4.png)

在 configure的时候 我故意使用了 --enable-shared 开启了编译动态库，所以生成了 一堆的 lib 跟 dll 文件。

上面的流程中，需要执行 make install， 因为 install 这个操作会把 exe 跟 dll 复制到同一个目录，这样才能运行。

------

这些 lib 跟 dll 都是可以被 MSVC 使用的，他们本身就是 msvc 编译出来的。具体试用，可以参考[《用msys2与mingw编译FFmpeg》](https://ffmpeg.xianwaizhiyin.net/debug-ffmpeg/msys2-mingw.html)最后的 ffmpeg-test 的 version.exe 程序，使用方法是一样的。

相关阅读：

1. [《官方MSVC编译FFmpeg》](https://trac.ffmpeg.org/wiki/CompilationGuide/MSVC)
2. [被微软式中文给坑了—又一个FFmpeg 编译失败问题](https://zhuanlan.zhihu.com/p/1937091185752674763)

3. [一个发布ffmpeg msvc版本库的仓库，现在维护到了7.1.](https://github.com/ShiftMediaProject/FFmpeg)

# 失败的话

不知为何，我自己编译了很多次，尝试了各种方法，最后都失败了。且网上成功案例并不是特别多，开始怀疑，是不是构建MSVC的ffmpeg是一件不那么被推荐的事情？后来发现，使用MinGW构建ffmpeg，本身就是会自动构建出ffmpeg的MSVC导入库，所以说，本身就可以给MSVC使用，不需要额外用MSVC进行构建了。