---
title: CMake导入动态库注意事项及建议(Windows篇)
date: '2024-12-17 10:01'
tag:
  - CMake
category:
  - Skill
  - CMake
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241217111020446.png
abbrlink: b6c01c5b
---



> 前言：不同操作系统对于可执行程序及其依赖的动态库的管理方式不同，以下内容针对的是Windows平台下的注意事项及建议，且部分文件是按照的MSVC构建套件下生成的文件格式举例。

当通过各种方式导入动态库之后，可能会遇到一个问题：cmake执行正常，构建编译正常，生成了`exe`文件，但是执行时却出了问题：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216105242693.png" alt="image-20241216105242693" style="zoom:80%;" />

有些情况下构建阶段就会报错：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216005009162.png" alt="image-20241216005009162" style="zoom: 33%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216004954526.png" alt="image-20241216004954526" style="zoom: 33%;" />

我们打开cmake生成的构建文件夹，找到可执行程序`.exe`（可执行程序在构建(即编译)完成后就生成了），将`.dll`文件拷贝到`.exe`同目录下：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216003312216.png" alt="image-20241216003312216" style="zoom: 80%;" />

再次执行，发现问题解决了，程序正常执行：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216004026538.png" alt="image-20241216004026538" style="zoom: 80%;" />

为什么找不到`.dll`的报错，通过将该文件复制到可执行文件的位置，运行时这个问题就解决了？

如果你确定了使用的库在导出是没有问题，那么问题很可能就出现在**运行时动态库的链接**上。

- 动态库在编译构建时不会打包进入程序中(这是与静态库的区别，静态库在编译的链接阶段会导入到可执行文件中)。

  动态库只有在两种情况下会被可执行文件链接使用：**load-time dynamic linking(加载时动态链接)**和**run-time dynamic linking(运行时动态链接)** 

  - **load-time dynamic linking(加载时动态链接)**

    - 当把可执行文件复制到内存后，且在程序开始运行之前，操作系统会查找可执行文件依赖的动态库信息(主要是动态库的名字以及存放路径)，找到该动态库后就将该动态库从磁盘搬到内存，并进行符号决议(关于符号决议，参考符号决议一节)，如果这个过程没有问题，那么一切准备工作就绪，程序就可以开始执行了，如果找不到相应的动态库或者符号决议失败，那么会有相应的错误信息报告为用户，程序运行失败。
    - 从总体上看，加载时动态链接可以分为两个阶段：阶段一，将动态库信息写入可执行文件；阶段二，加载可执行文件时依据动态库信息进行动态链接。

  - **run-time dynamic linking(运行时动态链接)**

    - run-time dynamic linking 运行时动态链接则不需要在编译链接时提供动态库信息，也就是说，在可执行文件被启动运行之前，可执行文件对所依赖的动态库信息一无所知，只有当程序运行到需要调用动态库所提供的代码时才会启动动态链接过程。

      我们在上一段中介绍了load-time，也就是程序加载时，那么程序加载完成后就开始程序执行了，那么所谓run-time(运行时)指的就是从程序开始被CPU执行到程序执行完成退出的这段时间。

      所以运行时动态链接这种方式对于“动态链接”阐释的更加淋漓尽致，因为可执行文件在启动运行之前都不知道需要依赖哪些动态库，只在运行时根据代码的需要再进行动态链接。同加载时动态链接相比，运行时动态链接将链接这个过程再次推迟往后推迟，推迟到了程序运行时。

      由于在编译链接生成可执行文件的过程中没有提供所依赖的动态库信息，因此这项任务就留给了程序员，在代码当中如果需要使用某个动态库所提供的函数，我们可以使用特定的API来运行时加载动态库，在Windows下通过LoadLibrary或者LoadLibraryEx，在Linux下通过使用dlopen、dlsym、dlclose这样一组函数在运行时链接动态库。当这些API被调用后，同样是首先去找这些动态库，将其从磁盘copy到内存，然后查找程序依赖的函数是否在动态库中定义。这些过程完成后动态库中的代码就可以被正常使用了。

      相对于加载时动态链接，运行时动态链接更加灵活，同时将动态链接过程推迟到运行时可以加快程序的启动速度。

> [彻底理解链接器：三，库与可执行文件 - SegmentFault 思否](https://segmentfault.com/a/1190000016433897)

动态库的一个优点其实也是它的缺点，即动态链接下的可执行文件不可以被独立运行（这里讨论的是加载时动态链接，load-time dynamic link），换句话说就是，如果没有提供所依赖的动态库或者所提供的动态库版本和可执行文件所依赖的不兼容，程序是无法启动的。动态库的依赖问题会给程序的安装部署带来麻烦，在Linux环境下尤其严重，在开发过程中依赖的一些比较有名的第三方库可能默认不会随着安装包发布，这就会导致用户在较低版本Linux中安装时经常会出现程序无法启动的问题，原因就在于我们编译链接使用都动态库和用户Linux系统中都动态库不兼容。解决这个问题的方法通常有两种，一个是用户升级系统中都动态库，另一个是接下来要介绍的将第三方库随安装包一起发布。

不知道是否注意到这样一个问题：编写程序最终的目的是什么？

编写程序最终的目的就是生成一个可执行程序，而可执行程序生成后，就与我们的源代码脱离了——可执行程序能否执行与源代码无关。编码只是过程，源码只是生成可执行程序的“脚本”，可执行程序才是结果。

我们编写代码一切的目的都是为了生成这个小小的`.exe`。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216140316252.png" alt="image-20241216140316252" style="zoom:67%;" />

如果可执行程序在生成和执行的过程中，需要依赖一些第三方库，那么我们需要为可执行程序与第三方库建立链接，这也就是我们之前所做的。

如果这个库是静态库，那么生成可执行程序时，库就已经被打包进入了可执行程序内一起生成，可执行程序运行的时候，直接就可以使用自己内部的静态库了，不需要依赖其他外部的东西了；

如果是动态库，则需要以一个单独的外部`dll`文件的方式与可执行程序放在一起：因为动态库直到可执行程序被加载到内存中，或者可执行程序运行的时候，才会与可执行程序链接起来，所以可执行程序的运行必须依赖`dll`文件，`dll`文件就像是可执行程序的挂件。

> 这也就是为什么上面提到的问题，通过将`dll`拷贝到`exe`旁边就解决了。

对于用户来说，只关心可执行程序，以及可执行程序运行时依赖的东西：动态库和必要的运行环境。没有这两样东西，程序跑不起来。而并不去关系程序是如何构建、编译生成的，所以不去关心项目本身的结构。可执行程序能否正常执行也与这些东西无关。

对于开发者来说，当发布程序的时候，只需要发布出可执行程序、可执行程序运行必要的环境，以及可执行程序依赖的动态库文件(如果程序使用了动态库的话)。【前提这不是一个开源项目】。
我们看市面上常见的软件包都是如此：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216142314408.png" alt="image-20241216142314408" style="zoom:67%;" />

所以：就算是我们在写项目时，将第三方库拷贝到了项目下，然后通过各种CMake命令导入、链接，会发现程序运行时依然缺少动态库：因为这都只是在程序构建时做的工作。确保程序能够成功与第三方库建立连接、构建出来。并没有真正地**将动态库文件放到可执行文件查找动态库所在的路径上**。所以程序想要正常运行，要确保`dll`文件存在于`exe`文件动态库查询路径：

查询顺序由高到低：

1. 当前工作目录。(`exe`所在目录)
2. 系统目录（例如 `C:\Windows\System32`）。
3. Windows 目录（例如 `C:\Windows`）。
4. 环境变量 `Path` 中指定的所有目录。

只要`dll`文件存在于以上任意路径下，`exe`文件都能顺利执行，但是一个新的问题又来了：放到哪个路径下比较好？

试想一下，如果我们的程序要给用户打包使用了，而程序运行时依赖于一些第三方库：
如果采用方法4，用户电脑上比如要手动将我们程序包中的`dll`文件放入环境变量中；
如果采用方法2、3，也是需要用户手动将`dll`文件放入指定的位置；

虽然前三种方式，可以通过编写脚本来解决，但是采用第一种方法，我们可以在打包程序的时候，直接将`dll`与`exe` 扔在一起，用户拿到之后直接双击`exe`就可以执行，岂不美哉？这大大方便了软件为不同用户电脑的分发。现在绝大多数软件也采取的这种方式：**第三方库随安装包一起发布**。

在考虑如何将`dll`放入到`exe` 同路径下之前，我们可以在思考一个问题：如何生成一个相对规范的可执行文件目录。

先在很多情况下，除非自己手动规定可执行程序的生成路径，IDE会自动为我们安排好可执行程序生成路径，比如CLion会生成到当前工程下的`cmake-bulid-xxx`目录下，该目录同时包含了构建过程中的很多临时文件：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216145651145.png" alt="image-20241216145651145" style="zoom:80%;" />

而Qt则会生成到项目同级父目录下的`build-xxx`目录下的`Debug`或`Release`目录下：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216145840835.png" alt="image-20241216145840835" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216145846229.png" alt="image-20241216145846229" style="zoom:80%;" />

所以仅仅是使用了不同的IDE，生成`exe`位置就不同，这让人感觉不是很“规范”，所以我们需要手动指定一个生成`exe`文件的目录

```cmake
set(EXECUTABLE_OUTPUT_PATH <path>)
```

这条命令用于指定当前CMakeLists.txt项目中`add_executable()`生成的可执行文件放置的位置。

```cmake
install(FILES <file> DESTINATION <path>)
```

然后使用该命令将指定文件拷贝到指定目录。

这样就实现了将`dll`、`exe`放置到指定的目录下，可执行程序的导出目录更规范了。

使用时要注意，执行cmake、构建之后，需要进行“安装”(命令行中为`camke --install`)，才能执行install命令，将指定文件拷贝到指定目录。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216150619888.png" alt="image-20241216150619888" style="zoom:67%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216150627958.png" alt="image-20241216150627958" style="zoom:67%;" />

```cmake
cmake_minimum_required(VERSION 3.15)
project(xmllibrary_test)

set(CMAKE_CXX_STANDARD 11)

include_directories(${PROJECT_SOURCE_DIR}/third/myxml/include)

message(${MYLIB})
add_executable(${PROJECT_NAME} main.cpp)

set(EXECUTABLE_OUTPUT_PATH ${CMAKE_CURRENT_SOURCE_DIR}/bin)

target_link_directories(${PROJECT_NAME} PUBLIC ${PROJECT_SOURCE_DIR}/third/myxml/lib)

target_link_libraries(${PROJECT_NAME} PUBLIC myxml)

install(FILES ${PROJECT_SOURCE_DIR}/third/myxml/dll/myxml.dll DESTINATION ${CMAKE_CURRENT_SOURCE_DIR}/bin/Debug)
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241216151619467.png" alt="image-20241216151619467" style="zoom:67%;" />

这样就实现了一个比较规范的发布目录结构，此后无论通过何种方式导入、产出第三方库，都建议按照此目录结构结果为导向。