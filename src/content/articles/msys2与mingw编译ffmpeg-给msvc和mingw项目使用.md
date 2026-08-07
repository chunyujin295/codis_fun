---
title: msys2与mingw编译ffmpeg-给msvc和mingw项目使用
date: '2026-3-9 13:25'
tag:
  - Ffmpeg
  - MinGW
category:
  - Learn
  - Cpp
  - ffmpeg
  - 编译
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/ffmpeg-logo.jpg'
abbrlink: da054e84
---

# 编译与安装

> 原文地址：[用msys2与mingw编译FFmpeg—FFmpeg调试环境搭建](https://ffmpeg.xianwaizhiyin.net/debug-ffmpeg/msys2-mingw.html)
>
> 笔记中对原有教程进行了一些补充与改进

## 编译之前

### 1.前置准备

FFmpeg 官网提供了两种编译源码的方法。

1，msys2 + mingw （本文的编译方法）

2，msys2 + msvc

MinGW 在前面文章[《MinGW介绍》](https://ffmpeg.xianwaizhiyin.net/base-compile/mingw-intro.html)已经介绍过了，MinGW 就是 把 gcc 编译器移植到 windows 了，并且提供了一些 以前只有在 Linux 才有的函数，例如 pthread_create() 。

------

为什么需要安装 msys2 ？

因为 windows 环境只能执行 batch 脚本，不能执行 shell 脚本。同时 windows 的 CMD 命令行，也没有 make，ls，mkdir 这些 linux 的命令。所以需要安装 msys2，可以把 msys2 理解成一个 linux 的环境，在 msys2 里面可以执行 shell 脚本跟很多linux的操作。

------

msys2 的安装请看 [《MSYS2介绍》](https://ffmpeg.xianwaizhiyin.net/msys2/intro.html)，下面开始操作，**打开普通的命令行窗口**，执行以下命令，进入 msys2 环境：

```
cd C:\msys64
.\msys2_shell.cmd -mingw64
```

上面的 `-mingw64` 是使用 64位的 gcc，如果需要使用 32 位 gcc，可以用 `-mingw32`

在 msys2 环境下，安装一些 必要的软件：

```bash
# 刷新软件包数据
pacman -Sy  
# 安装mingw-w64。
pacman -S mingw-w64-x86_64-toolchain
pacman -S mingw-w64-x86_64-SDL2 
pacman -S mingw-w64-x86_64-fdk-aac 
pacman -S mingw-w64-x86_64-x264 
pacman -S mingw-w64-x86_64-x265 
pacman -S git
pacman -S make
pacman -S automake 
pacman -S autoconf
pacman -S perl
pacman -S libtool
pacman -S libbz2
pacman -S mingw-w64-x86_64-cmake
pacman -S pkg-config 
pacman -S yasm
pacman -S diffutils
pacman -S sdl2 # 可选，看你是否需要运行fplay.exe
# 编译x264 需要 nasm
pacman -S nasm
```

小技巧， pacman -Ss 关键字：在仓库中搜索含关键字的包。

------

然后上 [Github](https://github.com/FFmpeg/FFmpeg) 或者 [FFmpeg官网(推荐，有正式发行版源码)](https://www.ffmpeg.org/download.html) 下载 FFmpeg 源代码（原教程以4.4.1为例），拷贝到 下图中的目录，这样 msys2 环境也能找到。

![msys2-mingw-1-1](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-1.png)

![msys2-mingw-1-2](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-2.png)

### 2.MinGW通用依赖

在Windows用mingw编译的C/C++程序默认会依赖这三个动态库：`libgcc_s_seh-1.dll`、`libstdc+±6.dll`、`libwinpthread-1.dll`，通常可以通过cmake控制他们的依赖改为静态链接（见我的笔记【Learn/Cpp/MinGW/MinGW/构建的坑】）。

ffmepg除了依赖上面三个库，自己还依赖一些工具库，上面的pacman已经安装过了。个人认为，环境默认的这些库，最好静态编进ffmepg里面，不同与工具库可以拷贝跟着ffmpeg一起发布。

FFmpeg 是纯 C 项目，通常不需要 `libstdc++`。

ffmpeg构建不使用cmake，但是使用.configure，而正好提供了一些参数，能够控制它静态链接上面的库，下面给出的教程中，`--extra-ldflags="-static-libgcc -Wl,-Bstatic -lpthread -Wl,-Bdynamic" `选项就是。

------

## 编译

进入 FFmpeg-n4.4.1 目录，开始编译，命令如下：（记得目录相关的改成自己的）

```bash
cd /home/loken/ffmpeg/ffmpeg-n4.4.1

./configure \
--prefix=/home/loken/ffmpeg/build64/ffmpeg-n4.4.1-mingw \
--enable-gpl \
--enable-debug=3 \
--disable-optimizations \
--disable-asm \
--disable-stripping \
--extra-ldflags="-static-libgcc -Wl,-Bstatic -lpthread -Wl,-Bdynamic" \
--enable-nonfree \
--enable-shared

make -j8 # 编辑时调用内核数量，按照自己电脑cpu配置，越多越好
make install
```

> 上述命令可以让ai看一下，有什么其他的可以优化性能和包体积的选项（记得改一下路径）
>
> > chatGPT生成的性能优先的选项：
> >
> > ```bash
> > ./configure \
> > --prefix=/home/loken/ffmpeg/build64/ffmpeg-n4.4.1-mingw \
> > --arch=x86_64 --target-os=mingw32 \
> > --enable-gpl --enable-nonfree \
> > --enable-shared \
> > --disable-debug \
> > --enable-optimizations \
> > --enable-asm \
> > --enable-runtime-cpudetect \
> > --enable-lto \
> > --extra-cflags="-O2 -DNDEBUG" \
> > --extra-ldflags="-static-libgcc -Wl,-Bstatic -lpthread -Wl,-Bdynamic" \
> > --extra-ldflags="-Wl,--gc-sections"
> > ```

上面的命令执行完之后，`ffmpeg-n4.4.1-mingw` 目录的结构分为bin、include、lib，bin目录如下：

![msys2-mingw-1-1](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-3.png)

可以看到，FFmpeg 的 makefile 特别智能，帮我们生成了 lib 导入库，这样就能很方便被 msvc 使用。

> 是的，FFmpeg在MinGW下，会交叉编译出MSVC的导入库，直接就可以给MSVC环境使用。

# 验证与使用

> 只要在外部环境中，运行 ffmpeg.exe 能够成功，基本代表库是可以投入使用的。如果想要运行 fplayer.exe ，需要pacman安装好SDL2。
>
> 如何验证：命令行运行 ffmpeg ，如果能正常启动，打印信息，则证明成功。

但是在具体的生产环境中，是否能真正使用，取决于将ffmpeg库在外部（msys2目录以外）时，能否正确运行。

我们用 [DependenciesGui.exe](https://github.com/lucasg/Dependencies/releases)查看一下 `ffmpeg.exe` 的整体依赖情况：

![msys2-mingw-1-3-1](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-3-1.png)

基本上，外部运行环境就是缺少这些库：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260306001302750.png" alt="image-20260306001302750" style="zoom: 80%;" />

上图中，圈出来的 dll 都是 mingw 里面的 dll。因为 mingw 编译出来的 ffmpeg 依赖这些 mingw 的库，所以只能在 msys2 环境下跑 通`ffmpeg.exe`。 如果在外部环境下，无论MinGW还是MSVC环境，想要使用ffmpeg的库，就需要把这些ffmpeg依赖的dll，拷贝到ffmpeg库所在同级目录下，确保依赖项能够被找到。

不建议按照上图，一个个对照去查找，建议直接先引用ffmpeg库在外部环境中，然后构建/使用的时候，看报错，缺少哪些dll，然后去`msys64\mingw64\bin`目录下去找，拷贝到ffmpeg库bin目录下。

如果你只想使用MSVC下的ffmpeg库，那么你直接双击启动ffmpeg，将报错缺少的库，从`msys64\ming64\bin`下面拷贝到ffmpeg库bin目录下即可。（基本上也就是上面图中标红的这些库，SDL2不是ffmpeg库调用必须的，是fplayer.exe运行时以来的图形化库）

![image-20260306000841254](https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260306000841254.png)

除了下图中的这个报错：这个报错是因为 msys64 和 Windows 下都有一个`libwinpthread-1.dll`，ffmpeg库目录下没有这个库的话，会优先使用Windows系统的，但是与ffmpeg不兼容。因此将`msys64\ming64\bin`中的这个库拷贝到ffmepg库目录下就能解决问题。

> 虽然上面我们通过configure设置了静态链接到`libwinpthread-1.dll`但是貌似没有生效，【编译】这门学科，有些玄学，我觉得应该看一下：《程序员的自我修养：链接、装载与库》

![image-20260304165833929](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260304165833929.png)

双击执行一下试试，一闪而过，但是没有报错。cmd命令行执行一下：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260304170512609.png" alt="image-20260304170512609" style="zoom: 50%;" />

当然，你也可以创建一个小的测试用例，引用ffmpeg库，这样无论 MinGW 还是 MSVC ，都能得到一个很好的验证：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20260304170721594.png" alt="image-20260304170721594" style="zoom:50%;" />

------

# 原文的验证方法

我们可以 使用 以下命令 查看 `avutil-56.dl`l 导出了哪些函数给我们使用。

```
dumpbin /EXPORTS avutil-56.dll > avutil-56.txt
```

![msys2-mingw-1-4](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-4.png)

从里面找到了一个 av_version_info 函数，注意那个地址 0005C570 。

------

我们现在测试一下 这个 avutil 动态库 在 MSVC 编译环境下好不好用。在 D 盘新建一个 目录 ffmpeg-test ，再创建一个 `version.c` 文件，内容如下：

```
#include <stdio.h>
const char *av_version_info(void);
int main()
{
    printf("Hello FFMPEG, version is %s\n", av_version_info());
    return 0;
}
```

上面 `av_version_info` 函数 的声明是我从 `avutil.h` 头文件里面扣出来的，这样不用引入整个 `avutil.h` 头文件，相对简单一些。

把 `avutil.lib` ，`avutil-56.dll` 也复制 到 ffmpeg-test 目录。

把 `C:\msys64\mingw64\bin` 目录下的 `libwinpthread-1.dll` 也拷贝到 ffmpeg-test 目录。如下：

![msys2-mingw-1-5](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-5.png)

上面这样做是因为 `avutil-56.dll` 依赖 `libwinpthread-1.dll` 。

------

然后 打开 vs2019 x64（vs2022 x64、2026 x64同理） 的命令窗口，进入 ffmpeg-test 目录。

![msys2-mingw-1-6](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-6.png)

执行以下命令开始编译：

```
cl.exe /c version.c
link.exe /DEBUG /OUT:version.exe version.obj avutil.lib
```

![msys2-mingw-1-7](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-7.png)

因此，MinGW 的 gcc 编译出来的 FFmpeg 动态库是好使的。

------

之前 dumpbin 的时候，`av_version_info` 函数的左边有个 0005C570 地址。这个是什么东西呢？

现在我们用 WinDbg 断点调试 一个 `version.exe` 文件 ，用 `bu version!main` 打一个断点，如下：

![msys2-mingw-1-8](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/msys2-mingw-1-8.png)

没看出 0005C570 跟 调试器的哪个地址有关系，暂时不管。