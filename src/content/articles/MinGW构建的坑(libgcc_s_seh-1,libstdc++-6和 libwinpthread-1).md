---
title: MinGW构建的坑(libgcc_s_seh-1,libstdc++-6和 libwinpthread-1)
date: '2026-3-9 13:24'
tag:
  - MinGW
category:
  - Learn
  - Cpp
  - MinGW
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/MinGW-LOGO.png'
abbrlink: 845149a0
---

在Windows用mingw编译的C/C++程序默认会依赖这三个动态库：

- `libgcc_s_seh-1.dll`： 该库是 GCC 提供的一个运行时库，用于处理 C 和 C++ 程序中的一些基本运算。SEH 代表结构化异常处理，这是 Windows 系统上的一种异常处理机制。
- `libstdc+±6.dll`： 该库是 GCC 提供的 C++ 标准库的动态链接库文件，它包含了 C++ 程序运行时需要的标准库实现。在 Windows 平台上，许多使用 C++ 编写的应用程序都依赖这个 DLL 文件。
- `libwinpthread-1.dll`： 该库是 GnuWin 工具集中的一个 DLL 文件，它提供了 POSIX 线程库（pthreads）的 Windows 实现。

所以说编出来的程序，还需要自己手动拷贝这三个库到可执行目录才行。（很麻烦）

gcc提供了静态链接这几个库的方法：

> 静态链接libgcc_s_seh-1.dll
> 链接时增加链接选项 -static-libgcc
>
> ```bash
> gcc -o myprogram myprogram.c -static-libgcc
> ```
>
>
> 静态链接libstdc+±6
> 链接时增加链接选项 -static-libstdc++
>
> ```bash
> g++ -o myprogram main.cpp -static-libstdc++
> ```
>
> 静态链接libwinpthread-1.dll
> 暂时没法发现静态链接libwinpthread-1.dll的专用链接选项，不过可以通过链接选项 -static来实现。不过链接选项-static相当于将libstdc+±6和libgcc_s_seh-1也静态链接了。
>
> ```bash
> g++ -o myprogram main.cpp -static
> ```



对于cmake来说，可以在构建的时候，静态链接这三个库，下面是千问给出的两个cmake写法：

```cmake
# 对某一target生效
if (MINGW)
    target_link_options(${PROJECT_NAME} PRIVATE
        -static-libgcc
        -static-libstdc++
        -Wl,-Bstatic
        -lwinpthread
        -Wl,-Bdynamic
    )
endif()


# 对所有构建项目生效
if (MINGW)
    add_link_options(
        -static-libgcc
        -static-libstdc++
        -Wl,-Bstatic
        -lwinpthread
        -Wl,-Bdynamic
    )
endif()
```



注意事项：

你的项目作为最下层的target，依赖很多第三方库以及项目中的其他target，所以需要确保MinGW下，他们也是静态链接了上面的三个库，或者如果有些库你并不可控，无法修改他们的cmake选项，那么将他们打包成静态库，然后被你的最终target静态链接，也是可以的。



> 参考链接：[mingw静态链接(libgcc_s_seh-1,libstdc++-6和 libwinpthread-1)_libwinpthread-1.dll-CSDN博客](https://blog.csdn.net/flysnow010/article/details/138123797)