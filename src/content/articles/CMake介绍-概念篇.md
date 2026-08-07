---
title: CMake介绍-概念篇
date: '2024-12-17 9:58'
tag:
  - CMake
category:
  - Skill
  - CMake
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241217111020446.png
abbrlink: afe27bfb
---

# CMake是什么



<img align="left" src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241202134356074.png"   style="zoom:80%;"/>CMake 是一个开源的跨平台自动化**生成**建构系统、用来管理软件建置的程序，并不依赖于某特定编译器，并可支持多层目录、多个应用程序与多个函数库。
CMake 通过使用简单的配置文件 CMakeLists.txt，自动生成不同平台的构建文件（如 Makefile、Ninja 构建文件、Visual Studio 工程文件等），简化了项目的编译和构建过程。

**CMake 本身不是构建工具，而是生成<mark>构建系统(的配置文件)</mark>的工具，它生成的构建系统可以使用不同的编译器和工具链。**



## cpp编译过程

cpp程序的编译过程：

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/2050266-20230912084836970-816251789.png" alt="020-static-and-dynamic-link" style="zoom:60%;"/>
        <br>windows下生成可执行程序是.exe
    </center>
</div>

## 编译工具链

cpp程序自己肯定是无法做到上面这些流程的，必须借助一些外部的工具，来执行整个编译流程，编译器与链接器等就扮演了这个角色。通常来说，一个完整的编译流程，并不是只依赖于某一个编译链接工具，而是以来一连串的工具链。

**Windows：MSVC和SDK**

MSVC并不是一个单独的编译、连接器，而是一套工具链集合。SDK主要提供了在编译链接过程中要使用到的C、C++标准库以及Windows平台的库文件、元数据等。如果把MSVC理解为工具的话，那么SDK更偏向于工具所需要的物料。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241202164621526.png" alt="image-20241202164621526" style="zoom:50%;" />

**Linux：GCC、G++**

**MacOS：clang/LLVM工具链**

## 构建系统

编译的工具链所做的工作，其实还是比较偏向底层的核心的编译和链接功能，提供的都是最最基本的支持。

随着项目工程越来越复杂，源代码文件越来越多，编译配置项根据场景的不同越来越复杂（例如，Debug模式和Release模式下编译参数不一样）的时候，依然通过直接调用这些命令的时候就会很复杂，我们需要编写大量复杂的命令行才能完成一个复杂项目的编译工作。基于这样的背景，我们诞生了构建系统（Build System）。

> 简单项目：
>
> ```
> root
> |------ test.cpp
> ```
>
> ```shell
> g++ test.cpp -o test
> ```
>
> 稍微复杂一点的项目：
>
> ```
> root
> |------ test
> |       |------- test.h
> |		|------- test.cpp
> |------ common
> |		|------- common.h
> |		|------- common.cpp
> |------ main.cpp
> ```
>
> ```shell
> g++ -I. test/test.cpp test/common.cpp common/common.cpp -o main
> ```
>
> 每次要执行编译的时候，都要输入这些命令行，更别说包含链接库等的G++命令了。

**构建系统**，简单来说，就是一个管理构建流程的系统，用户根据项目，设定好编译的先后顺序、依赖关系，之后就由构建系统<u>自动化地调用编译工具链，执行项目地编译工作。</u>

> 打比方：炒菜。
>
> - 源文件：食材。
> - 编译工具链：厨具。
>
> 在没有构建系统之前，用户需要一步步自己去拿着厨具处理食材。
>
> - 构建系统：自动炒菜机器人。
>
> 用户只需要给自动炒菜机器人设定好菜谱，机器人就会按照流程设定，使用对应地厨具去处理对应的食材了。

### 常见的构建系统：

**Windows：MSBuild与sln、vcxproj**

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/2050266-20230912084836995-52841496.png" alt="050-VS-IDE-MSBuild-MSVC-flow" style="zoom: 50%;" />

**Linux：make与Makefile**

make是构建工具，读取配置文件Makefile文件，根据内容执行具体的构建流程。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/2050266-20230912084836857-2014059872.png" alt="060-make-GCC-flow" style="zoom: 50%;" />

Makefile的内容较好理解，基本就是一个包含了gcc相关命令的脚本文件：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241202150147753.png" alt="image-20241202150147753" style="zoom: 80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241202150707339.png" alt="image-20241202150707339" style="zoom: 80%;" />

**macOS：xcodebuild与xcodeproj**

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/2050266-20230912084837040-751031072.png" alt="070-xocde-xcodebuild-clang" style="zoom:50%;" />

## 生成构建系统的工具：CMake

前面我们介绍了构建系统的能力：允许用户以配置的方式来组织项目，并让构建系统代替用户完成底层编译工具链的调用。

但是我们不难发现：不同的平台的构建系统，都有自己独有的编译工具链和配置，如果想要实现一份代码的跨平台编译，目前需要准备至少三套构建系统。此外，如果项目本身结构发生了变化，需要同时修改三套构建系统。

那么面对一致性与可维护性的问题，有人提出这样的解决思路，既然每个平台的构建系统比较成熟了， 那么**暂时**不考虑重新做一套的跨平台的构建系统，而是换一个角度，提供一个工具并约定一套几乎与平台无关的通用配置。通过工具加上特定的配置，就可以做到：

- 如果用户希望在Windows上构建应用的时候，那么这个工具就基于配置生成一套msbuild能够加载的<u>`.sln`、`.vcxproj`工程配置</u>。于是，我们可以直接使用msbuild构建或是用VS打开工程开发构建；
- 如果用户希望在Linux上基于同样的代码构建Linux平台的应用，那么这个工具就利用同一份配置生成一套make能够加载的<u>Masefield配置</u>。于是，在Linux，我们就可以使用make命令来构建这个应用了；
- macOS同理。

基于上述的设想，[CMake](https://cmake.org/)面世。与CMake搭配的所谓的“通用配置”，就是我们经常见到的CMakeLists.txt文件，通过特定的DSL（领域特定语言），来描述项目结构以及编译规则。CMake工作流程就是根据CMakeLists.txt来生成平台构建系统特定的项目结构和配置。基于上述设想的结果，各个平台的构建系统配置的编写与维护的任务就沉淀到了CMake中，减轻用户的一部分开发负担。

### CMake 的作用和优势

- **跨平台支持：** CMake 支持多种操作系统和编译器，使得同一份构建配置可以在不同的环境中使用。
- **简化配置：** 通过 CMakeLists.txt 文件，用户可以定义项目结构、依赖项、编译选项等，无需手动编写复杂的构建脚本。
- **自动化构建：** CMake 能够自动检测系统上的库和工具，减少手动配置的工作量。
- **灵活性：** 支持多种构建类型和配置（如 Debug、Release），并允许用户自定义构建选项和模块。

------

### 构建配置

- **CMakeLists.txt 文件：** CMake 的配置文件，用于定义项目的构建规则、依赖关系、编译选项等。每个 CMake 项目通常包含一个或多个 CMakeLists.txt 文件。
- **构建目录：** 为了保持源代码的整洁，CMake 鼓励使用独立的构建目录（Out-of-source 构建）。这样，构建生成的文件与源代码分开存放。

------

### 基本工作流程

1. **编写 CMakeLists.txt 文件：** 定义项目的构建规则和依赖关系。
2. **生成构建文件：** 使用 CMake 生成适合当前平台的构建系统文件（例如 Makefile、Visual Studio 工程文件）。
3. **执行构建：** 使用生成的构建系统文件（如 `make`、`ninja`、`msbuild`）来编译项目。

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/2050266-20230912084837077-1614238150.png" alt="080-CMake-flow" style="zoom: 50%;" />
        <br>通过CMake，实现了一致性和可维护性
    </center>
</div>



# CMake究竟在做什么

**CMake 自己并没有构建任何东西的能力**，CMake它依赖于系统中的其他工具(构建系统)来执行实际的编译、链接和其他任务。CMake好似一个在构建过程中工作的“协调器”，它清楚哪些步骤需要完成，理解最终目标是什么，以及忙碌于为构建工作找到合适的“工人”和“材料”。综上，**这个过程有三个阶段：配置、生成、构建阶段**

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E6%97%A0%E6%A0%87%E9%A2%98-2024-12-02-1532.png" alt="无标题-2024-12-02-1532" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241202112859766.png" alt="image-20241202112859766" style="zoom:80%;" />



# 补充说明：Ninja：跨平台的构建系统

上面说到，为了解决不同平台下构建系统不互通等问题，CMake等构建系统生成工具应运而生。但是存在那么一个构建系统Ninja，本身就是跨平台的，所以从根本上就解除了构建系统不容平台不互通的问题。Ninjia 的配置文件是`.ninjia`

> 注意Ninja是构建系统，与Windows下的MSBuild，Linux下的make，macOS下的xcodebuild是同一层级的，而不是cmake这种构建系统生成工具。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/2050266-20230912084836883-1517869470.png" alt="090-ninja-build-system" style="zoom:50%;" />