---
title: CMake介绍-语法篇1
date: '2024-12-17 9:59'
tag:
  - CMake
category:
  - Skill
  - CMake
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241217111020446.png
abbrlink: bccb25a8
---

# 基本的Cmake结构

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209142246224.png" alt="image-20241209142246224" style="zoom:80%;" />

当我们创建好一个CLion的Cpp项目时，会发现CLion自动为我们生成了一个最基础的CMakeLists.txt文件。


初始内容如下所示：

```cmake
cmake_minimum_required(VERSION 3.30) # CMake最低版本要求，建议不要过高或过低
project(cmaketest1) # 本项目的工程名

set(CMAKE_CXX_STANDARD 11) # 设置C++标准，此处意为C++11

add_executable(cmakeTest1 main.cpp 
        test.cpp
        test.h)
```



## 命令解析

### cmake_minimum_required()

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209154557690.png" alt="image-20241209154557690" style="zoom:80%;" />
        <br>图示供下方文字参考
    </center>
</div>

cmake_minimum_required是cmake的一个command，其设置项目的最低的cmake版本要求。如果实际环境的cmake版本小于该命令的设置，则报错。
这个命令通常是必要的，且在CMakeLists.txt文件的一开始就使用。（如果有多层目录，那么子目录下的文件可以不要）

```cmake
cmake_minimum_required(VERSION <min>[...<max>] [FATAL_ERROR])
```

<mark>（[]意味着可选、可有可无，下同）</mark>

- `VERSION`：关键字，必需且保持不变；
- `min` : 指定的`cmake`最低版本，实际运行环境的`cmake`必须不小于这个版本，通常说明编译文件使用到了哪个版本的特性。
- `max` : 可选，用于指定最高的`cmake`版本，如果设置，则必须不小于min且可能会影响`cmake_policy`的设置，此选项在3.12版本后才添加
- `min`, `max`均遵循`cmake`的版本格式：`major.minor[.patch[.tweak]]`
- `FATAL_ERROR` : 可选，在`cmake2.6`之后就不再使用，保留它仅仅为了兼容低版本的命令。



### project()

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209154557690.png" alt="image-20241209154557690" style="zoom:80%;" />
        <br>图示供下方文字参考
    </center>
</div>

`project`命令设置项目的名称，并将其保存在变量`PROJECT_NAME`中。如果是顶层`CMakeLists.txt`，还将项目名称存储在变量`CMAKE_PROJECT_NAME`中。
后面就可以直接用`${PROJECT_NAME}`或`${CMAKE_PROJECT_NAME}`命令来获取项目名称。

### add_executable()

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209154557690.png" alt="image-20241209154557690" style="zoom:80%;" />
        <br>图示供下方文字参考
    </center>
</div>

`add_executable` 用于创建一个可执行文件。当你希望编译一些源文件以生成一个可以直接运行的应用程序时，你会使用这个命令。可执行文件的输出依赖于操作系统，例如在 Unix 上通常是 `.out` 文件，而在 Windows 上则是 `.exe` 文件。

该命令的语法结构较为简单：

```cmake
add_executable(<可执行文件名称> [依赖的源文件])
```

<u>`add_executable`命令中必修添加的只有源文件，头文件并不是必须的。</u>

但是在某些情况下，例如使用cmake生成Qt的构建时，Qt Creator左侧的项目列表是基于add_executable()命令中添加的内容展示的，这并不影响构建项目，仅影响左侧视图：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209153357320.png" alt="image-20241209153357320" style="zoom:80%;" />

> 而另一个常见的命令为`add_library`， 是 CMake 构建系统中用于创建项目内库的核心命令。这个命令允许你指定库的源文件并定义其类型。这是我们创建与导入动静态库时，会用到核心命令，后面会进行讲解。

使用以上命令，可以构成一个最基础的CMakeLists.txt。



# 对基本的CMakeLists.txt编写进行简化

如果与CMakeLists.txt同级下有多个源文件，那么我们需要一个个加入到`add_executable()`命令中，非常繁琐。

<div>
    <center>
        <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209150210466.png" alt="image-20241209150210466" style="zoom: 80%;" />
        <br>项目中添加了一个子文件夹里面包含头文件源文件
    </center>
</div>

如果项目中存在多个子目录，每个子目录中又存在多个源文件，添加就更麻烦了，`aux_source_directory()`命令可以简化这一流程。

### aux_source_directory()

```cmake
aux_source_directory(<dir目录> [变量名])
```

该命令的作用是，将指定dir目录下的所有源文件名称都存储起来，并设置一个变量承接这些名称。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209150640080.png" alt="image-20241209150640080" style="zoom:80%;" />

通过这种方式，我们可以减少源文件手动添加的工作。



### include_directories()

现在已经解决了源文件手动添加的问题，但是在源文件中引入不同路径下的头文件时，需要使用相对或者绝对路径。`include_directories()`解决了头文件的添加问题。

```cmake
include_directories([目录1] [目录2])
```

该命令会将设置的目录添加到cmake的受理范围中，因此也会将其下的头文件自动添加到头文件的查询路径中。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209151155079.png" alt="image-20241209151155079" style="zoom:80%;" />

>  <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209151607594.png" alt="image-20241209151607594" style="zoom:80%;" />
>
> 1. 此前如果某个文件中引入不属于同级目录下的头文件，需要使用相对或者绝对路径。当使用命令后，程序在编译时会自动去被`include_directories()`添加的文件夹下查找，因此在引入的时候无需添加路径。
> 2. 上面示例图片中，`add_executable`命令中没有包含头文件，之前在介绍时提到了，头文件并不是必须包含的，与`include_directories()`命令的效果无关，此处特意说明，以免造成误导。

使用上面两个命令，可以较大程度上简化复杂项目的CMakeLits.txt构建流程，减少重复书写。



# 常用命令

再继续优化CMakeLists.txt构建之前，在此先介绍一些常用的命令和概念，为后续进行铺垫。

> <mark>说明</mark>：
>
> 1. 介绍命令时可能会出现一些初见难以理解的词汇，个人认为了解大意即可，无需全部了解。在阅读其他CMakelists.txt案例时，可以逐渐发现哪些命令、参数是常用的，能理解它们的意义并学会使用就可以了。
> 2. 下面的示例只演示一些常用的场景，还有些场景会和后面其他命令结合起来，这一点等到后面的命令会演示。



## set()、unset()

`set()`命令用于为变量名设置变量值。

`unset()`命令用于为变量取消变量值。如果`set()`是没有给变量名指定变量值，效果相当于`unset()`

### 普通变量

- 普通变量是在CMake配置过程中临时使用的变量，它们只在当前的CMake进程中有效，不会在不同的构建会话之间持久化。
- 普通变量有**作用域**限制，它们通常只在定义它们的CMakeLists.txt文件及其子目录(子项目)中有效。

set()、unset()设置普通变量：

```cmake
set(<变量名> [变量值] [PARENT_SCOPE])
unset(<变量名> [PARENT_SCOPE])
```

`PARENT_SCOPE`是一个修饰符，用于指定变量的作用域为父级作用域。

- 1. 作用域被提升之后，就不属于该子项目了，而是属于父项目。
  2. 另外，由于cmake命令也是顺序执行的，子项目只能拿到父项目在连接子项目之前(`add_subdirectory()`)的父变量，子项目中变量被提升，这个时间点是位于父项目连接子项目之后的，所以子项目是拿不到这个变量的。
  3. 这就是为什么下面的示例中，明明是在子项目中定义的变量，仅仅是做了一个作用域提升，但子项目自己却拿不到了。

> 当在函数或宏中设置变量时，使用`PARENT_SCOPE`修饰符可以将该变量的作用域提升到父级作用域，使得在函数或宏外部也能够访问和使用该变量。
> 需要注意的是，`PARENT_SCOPE`修饰符只能将变量的作用域提升到直接的父级作用域，无法跳过中间的作用域。如果要将变量的作用域提升到更高层次的作用域，需要在对应的父级作用域中再次使用set命令。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241210100721160.png" alt="image-20241210100721160" style="zoom:80%;" />

-------------

这里涉及到了一个打印的命令：

## message()命令

`message()`命令用于打印内容，包括变量的值。

```cmake
message([可选参数] 内容)
```

字符串和变量是可以拼接的，massage打印时，如果包含字符串，是否使用`""`引起来，会造成格式上的不同。
另外，如果字符串和变量拼接，使用引号的话，需要将整体都引起来，否则是错误的语法。

> 至于set变量时，变量的值是否用`""`引起来，都是可以的，不会影响格式。
>
> 但是建议全都统一使用`""`，确保格式的一致和可读性。

```cmake
set(TEST1 "world")
message("你好")
message(${TEST1})
message("你 好 ${TEST1}") # 打印结果：你 好 world
message(你 好 ${TEST1}) # 打印结果：你好world
message("你 好 "${TEST1}) # 语法错误，报错
```

`可选参数`：

- `STATUS`: 用于输出状态信息。这些信息通常不会导致构建过程停止。
- `WARNING`: 用于输出警告信息。这些信息会提醒用户注意某些可能的问题，但不会中断构建过程。
- `ERROR`: 用于输出错误信息。这些信息通常会导致构建过程停止。
- `FATAL_ERROR`: 用于输出致命错误信息，并立即停止构建过程。

------------------------------------

#### 普通变量的作用域体现：

```cmake
# 主程序的CMakeLists.txt
cmake_minimum_required(VERSION 3.29)
project(cmake_test2)

set(CMAKE_CXX_STANDARD 11)

set(MY_VARIABLE "Value") # 设置一个变量，作用域是当前CMakeList及子项目

# 定义一个函数
function(demonstrate_scope)
    # 在函数内部定义一个局部变量
    set(MY_LOCAL_VARIABLE "Local Value")

    # 打印
    message(STATUS "Inside function: MY_LOCAL_VARIABLE = ${MY_LOCAL_VARIABLE}")
    message(STATUS "Inside function: MY_VARIABLE = ${MY_VARIABLE}")
endfunction()

# 调用函数
demonstrate_scope()

# 尝试打印局部变量
message(STATUS "Outside function: MY_LOCAL_VARIABLE = ${MY_LOCAL_VARIABLE}")
message(STATUS "Outside function: MY_VARIABLE = ${MY_VARIABLE}")

add_subdirectory(test2)

# 尝试打印子项目设置变量
message(STATUS "Outside test2: TEST2_VARIABLE = ${TEST2_VARIABLE}")
message(STATUS "Outside test2: TEST2_PARENT_SCOPE_VARIABLE = ${TEST2_PARENT_SCOPE_VARIABLE}")
```

```cmake
# 子程序的CMakeLists.txt
cmake_minimum_required(VERSION 3.29)

project(test2)

set(TEST2_VARIABLE "test2 Value")
set(TEST2_PARENT_SCOPE_VARIABLE "test2 PARENT_SCOPE Value" PARENT_SCOPE)

message(STATUS "Inside test2: MY_VARIABLE = ${MY_VARIABLE}")
message(STATUS "Inside test2: TEST2_VARIABLE = ${TEST2_VARIABLE}")
message(STATUS "Inside test2: TEST2_PARENT_SCOPE_VARIABLE = ${TEST2_PARENT_SCOPE_VARIABLE}")
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241210142934265.png" alt="image-20241210142934265" style="zoom: 80%;" />

**结论**：

1. 普通变量默认作用域为当前项目及使用`add_subdirectory()`包含进来的子项目。(子项目可以访问父项目的变量，反之不行)
2. 如果普通变量是在某一个局部作用域，例如函数，中定义的，那么它只在这个局部作用域有效
3. 如果子项目的普通变量希望可以被父项目访问到，可以在定义时最后加上参数`PARENT_SCOPE`。
4. CMake的语句也是顺序执行的，如果将引入子项目的命令放在最前面，则会先执行子项目的CMakeLists.txt，并且子项目无法获得父项目后来创建的变量：
   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241210144345783.png" alt="image-20241210144345783" style="zoom:80%;" />

### 缓存变量

- 缓存变量是全局变量，它们在同一个CMake工程中的任何地方都可以使用，包括父目录和子目录。
- 缓存变量的值会被存储在`CMakeCache.txt`文件中，这意味着它们的值会在不同的构建会话之间持久化。
- 缓存变量通过`set()`命令加上`CACHE`关键字设置。
- 缓存变量可以被用户通过cmake-gui或ccmake工具修改，也可以在命令行中设置。

> 缓存变量的作用：
>
> 1. **持久化配置选项**： 缓存变量用于存储那些在项目配置过程中用户指定的选项，这些选项会在整个构建过程中保持不变，并且在后续的构建中可以被重新加载。这意味着用户在第一次配置项目时设置的选项，在后续的构建中不需要重新设置。
> 2. **用户界面交互**： 缓存变量允许用户通过命令行参数（使用 `-D` 选项）、图形界面（如cmake-gui或ccmake）或者直接编辑`CMakeCache.txt`文件来修改项目的构建选项。这提供了一种方便的方式来控制构建过程，例如选择不同的构建类型（Debug/Release）、启用或禁用特定的功能等。
> 3. **跨CMakeLists.txt共享**： 缓存变量是全局的，可以在项目的任何`CMakeLists.txt`文件中访问和修改。这使得在不同目录之间共享变量变得容易，因为它们不需要通过变量传递或者文件包含来共享。
> 4. **避免重复计算**： 有些变量的值可能需要CMake执行一些复杂的检查或测试来确定，这些值一旦确定后，存储在缓存变量中可以避免每次运行CMake时都重复这些计算。
> 5. **系统相关配置**： 缓存变量也用于存储系统相关的配置，这些配置通常是由CMake在第一次运行时确定的，比如系统的字节序等。这些值被存储在缓存中，以避免每次构建时都需要重新确定。
> 6. **强制重新运行CMake**： 当缓存变量的值发生变化时，CMake会重新运行，以确保所有的构建系统都反映了这些变化。这对于确保构建系统的一致性是非常重要的。
> 7. **版本控制和移植性**： 缓存变量可以帮助项目在不同的环境中保持一致的配置，这对于项目的版本控制和移植性是非常有用的。

设置Cache变量(缓存变量)

```cmake
set(<变量名> [变量值] CACHE <变量类型> <变量描述符> [FORCE])
unset(<变量名> CACHE)
```

`CACHE`：用来标识该变量为一个缓存变量

`变量类型`：用来标识变量的类型

- `BOOL`：布尔类型，即开/关（ON/OFF）值。cmake-gui 提供一个复选框。
- `FILEPATH`：指向磁盘上文件的路径。cmake-gui 提供一个文件对话框。
- `PATH`：指向磁盘上目录的路径。cmake-gui 提供一个文件对话框。
- `STRING`：字符串类型，即文本行。cmake-gui 提供一个文本字段或下拉选择（如果设置了 STRINGS 缓存变量属性）。
- `INTERNAL`：内部类型，即文本行。cmake-gui 不显示内部变量。内部变量可用于持久保存跨运行的变量。使用此类型会隐含使用 `FORCE`。

`变量描述符`：用来描述变量的含义或意义的，对变量进行说明。

`FORCE`：可选项，用于强制覆盖现有的缓存变量。缓存默认是不覆盖的，如果在调用之前缓存项不存在，或者给出了FORCE选项，那么缓存项将被设置为给定的值。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209232505367.png" alt="image-20241209232505367" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241210095309527.png" alt="image-20241210095309527" style="zoom:80%;" />

添加一个文件夹，创建一个新的CMakeLists.txt，模拟一个新的子项目，获取全局变量(缓存变量就是全局的)`TEST_NAME`，并用一个局部变量`MY_TEST_NAME`承接，然后打印：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209233556624.png" alt="image-20241209233556624" style="zoom: 60%;" />

既然缓存变量是全局的，那么不单独使用`get_property()`变量来获取可以吗？答案是可以：
<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241209234145164.png" alt="image-20241209234145164" style="zoom:60%;" />

> 关于上面提到的父项目添加子项目、`get_property()`等命令，后面会讲



### 环境变量

- 环境变量是当前CMake进程中获取的系统环境变量，它们可以被CMake获取并使用，也可以在CMake中进行临时性的修改，但这些修改只影响当前CMake进程，不影响系统或其他进程。
- 环境变量的设置和获取需要使用`ENV`关键字。
- 环境变量的修改是临时性的，一旦CMake进程结束，这些修改就会失效。

> 在CMake中更改环境变量主要有以下几个用途：
>
> 1. **临时修改构建环境**：
>    CMake允许在构建过程中临时修改环境变量，这些修改只影响当前的CMake进程，不会影响系统的其他部分或调用CMake的进程。这可以用于调整编译器的搜索路径、指定特定的编译器标志或其他构建相关的环境设置。
>
> 2. **传递构建参数**：
>    通过设置环境变量，可以在CMake配置过程中传递额外的参数给构建系统。例如，可以设置`CXXFLAGS`环境变量来为编译器指定额外的编译选项。
>
> 3. **控制构建行为**：
>    某些CMake变量依赖于环境变量的值。通过更改这些环境变量，可以改变CMake的行为，例如指定不同的编译器或工具链。
>
> 4. **访问系统环境变量**：
>    CMake可以使用`$ENV{NAME}`指令来访问系统的环境变量，这对于获取系统信息（如`HOME`目录）或配置特定的系统依赖项非常有用。
>
> 5. **跨平台构建**：
>    在进行跨平台构建时，环境变量可以帮助指定平台特定的路径或选项，使得构建过程能够适应不同的操作系统和环境。
>
> 6. **简化构建脚本**：
>    通过设置环境变量，可以减少在CMakeLists.txt中硬编码的路径和选项，使得构建脚本更加灵活和可维护。
>
> 需要注意的是，CMake中设置的环境变量更改是临时性的，一旦CMake运行结束，这些更改就会丢失。因此，它们主要用于影响CMake的配置和生成过程，而不会影响最终生成的构建文件或运行时环境。

```cmake
set(ENV{<变量名>} [<变量值>])
unset(ENV{<变量名>})
```

注意与之前不同的是，环境变量要用`ENV` + `{}`括起来。

```cmake
cmake_minimum_required(VERSION 3.29)
project(cmaketest2)

# 设置C++标准
set(CMAKE_CXX_STANDARD 11)

# 设置环境变量，指定MINGW编译器路径
set(ENV{MY_CMAKE_CXX_COMPILER} "D:/software/Qt/Tools/mingw730_64/bin/g++.exe")

# 使用环境变量设置CMake的CXX编译器
set(CMAKE_CXX_COMPILER $ENV{MY_CMAKE_CXX_COMPILER})

# 添加可执行文件
add_executable(cmaketest2 main.cpp)

# 输出编译器路径以确认设置成功
message(STATUS "MY_CMAKE_CXX_COMPILER: $ENV{MY_CMAKE_CXX_COMPILER}")
message(STATUS "CMAKE_CXX_COMPILER: ${CMAKE_CXX_COMPILER}")
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241210100102997.png" alt="image-20241210100102997"  />



## set_property()与get_property()

这两个命令用于设置属性和获取属性。

```cmake
set_property([范围] [APPEND | APPEND_STRING] PROPERTY <属性名> [属性值1[属性值2]])
```

`set_property`命令用于设置某一范围下的属性。

- `PROPERTY <属性名>`：`PROPERTY`是一个固定的标识，放在属性名前面，用来标识其后面的这个参数是一个属性名。

- `范围`：(范围相关的条目阅读起来不是很直观， 需要结合后面的案例来看)

  - `GLOBAL`：全局范围，范围是唯一的，所以不接受名称。用于获取全局属性，这些属性在整个CMake项目中都是可见的。例如，某些全局设置或状态信息。
  - `DIRECTORY [dir]`：范围缺省则默认为当前目录，但可以指定另一个目录，该目录必须已经由CMake处理(例如已通过`include_directories()`添加过的目录)。
  - `TARGET <target>`：范围必须命名一个现有目标。用于获取与特定构建目标相关的属性。例如，可以获取某个库的编译选项或链接库。
    - 现有目标 是指项目中要创建的目标，比如要生成的一个可执行文件，或者要生成的一个库
  - `SOURCE <source>`：范围必须命名一个源文件，默认从当前源目录的范围中读取属性。用于获取与特定源文件相关的属性，例如文件的编译选项或其他特性。
  - `INSTALL <file>`  ：范围必须命名一个已安装的文件路径。用于获取与安装相关的属性，通常在执行安装操作时使用，例如获取安装目标的属性。
  - `TEST <test>`：范围必须命名一项现有测试。用于获取与测试相关的属性，通常在使用CMake的测试框架（如CTest）时使用。
  - `CACHE <entry>`：范围必须命名一个缓存条目。用于获取与CMake缓存相关的属性，缓存条目通常在`CMakeCache.txt`文件中定义，允许持久化存储配置选项。
  - `VARIABLE`：范围是唯一的，不接受名称。用于获取CMake内部变量的属性，这些变量通常是CMake在运行时使用的，不需要指定名称。

  | 参数             | 说明                                                     | 作用                                                         | 补充                                                         |
  | :--------------- | -------------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | GLOBAL           | 全局范围，范围是唯一的，所以不接受名称                   | 用于获取全局属性，这些属性在整个CMake项目中都是可见的。例如，某些全局设置或状态信息。 |                                                              |
  | DIRECTORY [dir]  | 目录范围，默认为当前目录，所以目录可以缺省               | 范围缺省则默认为当前目录，但可以指定另一个目录，该目录必须已经由CMake处理(例如已通过`include_directories()`添加过的目录)。 |                                                              |
  | TARGET < target> | 范围必须命名一个现有目标                                 | 用于获取与特定构建目标相关的属性。例如，可以获取某个库的编译选项或链接库。 | “现有目标”是指项目中要创建的目标，比如要生成的一个可执行文件，或者要生成的一个库 |
  | SOURCE < source> | 范围必须命名一个源文件，默认从当前源目录的范围中读取属性 | 用于获取与特定源文件相关的属性，例如文件的编译选项或其他特性。 |                                                              |
  | INSTALL < file>  | 范围必须命名一个已安装的文件路径                         | 用于获取与安装相关的属性，通常在执行安装操作时使用，例如获取安装目标的属性。 |                                                              |
  | TEST < test>     | 范围必须命名一项现有测试                                 | 用于获取与测试相关的属性，通常在使用CMake的测试框架（如CTest）时使用。 |                                                              |
  | CACHE < entry>   | 范围必须命名一个缓存条目                                 | 用于获取与CMake缓存相关的属性，缓存条目通常在`CMakeCache.txt`文件中定义，允许持久化存储配置选项。 |                                                              |
  | VARIABLE         | 范围是唯一的，不接受名称                                 | 用于获取CMake内部变量的属性，这些变量通常是CMake在运行时使用的，不需要指定名称。 |                                                              |

- `APPEND`：如果属性名后面跟了很多属性值，该参数用来标明属性值是一个可扩展的list列表的形式。

- `APPEND_STRING`：如果属性名后面跟了很多属性值，该参数用来标明这些属性值连接起来成为了一串字符串。



```cmake
get_property(<变量名> [范围] PROPERTY <属性名> [可选参数])
```

- `变量名`：获取属性值之后必须通过一个变量来承接。

- `范围`：同上。不同范围内可能有同名的属性，范围就是为了区分各同名属性的。

- `可选参数`：用于获取属性值时，对变量执行的不同的行为：

  - **SET**：
    - 当指定`SET`选项时，`get_property()`命令会检查指定的属性是否已被设置。
    - 如果属性已被设置，变量将被设置为`TRUE`；否则，变量将被设置为`FALSE`。
    - 这个选项用于判断属性是否具有一个值，而不关心该值是什么。
  - **DEFINED**：
    - 当指定`DEFINED`选项时，`get_property()`命令会检查指定的属性是否已被定义。
    - 如果属性已被定义（即使值为空），变量将被设置为`TRUE`；否则，变量将被设置为`FALSE`。
    - 这个选项用于判断属性是否存在，而不关心其值。
  - **BRIEF_DOCS**：
    - 当指定`BRIEF_DOCS`选项时，`get_property()`命令会返回属性的简短文档说明。
    - 如果属性有文档说明，变量将被设置为该说明的字符串；否则，变量将被设置为`NOTFOUND`。
    - 这个选项用于获取属性的简要描述。
  - **FULL_DOCS**：
    - 当指定`FULL_DOCS`选项时，`get_property()`命令会返回属性的完整文档说明。
    - 如果属性有文档说明，变量将被设置为该说明的字符串；否则，变量将被设置为`NOTFOUND`。
    - 这个选项用于获取属性的详细描述。
  - 这些可选参数允许用户根据需要获取属性的不同方面信息，而不仅仅是属性的值。它们在编写灵活的CMake脚本时非常有用，特别是在需要根据属性的存在或定义状态做出对应的处理时。

  

  示例：(此处示例仅演示使用方法，具体场景下根据情况会有较大变化)

  设置一个全局的自定义的属性，并通过子项目获取到属性值

  ```cmake
  # 父项目
  cmake_minimum_required(VERSION 3.29)
  project(cmake_test2)
  
  set(CMAKE_CXX_STANDARD 11)
  
  set_property(GLOBAL PROPERTY MY_PROPERTY "this is my_property") # 设置一个全局属性
  
  add_executable(cmake_test2 main.cpp)
  
  add_subdirectory(test2) # 添加子项目
  ```

  ```cmake
  # 子项目
  cmake_minimum_required(VERSION 3.29)
  project(test2)
  
  get_property(MY_TEST2 GLOBAL PROPERTY MY_PROPERTY) # 获取全局属性，使用变量MY_TEST2承接
  
  message(${MY_TEST2}) # 打印变量值
  ```

  <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241210123746577.png" alt="image-20241210123746577" style="zoom: 67%;" />

  

  

  **设置目标属性：**

  ```cmake
  cmake_minimum_required(VERSION 3.29)
  project(cmake_test1)
  
  set(CMAKE_CXX_STANDARD 20) # 设定C++标准
  set(CMAKE_CXX_STANDARD_REQUIRED OFF) # 设定是否强制使用C++标准，否
  
  # 定义可执行目标
  add_executable(my_test1 test1.cpp)
  add_executable(my_test2 test2.cpp)
  
  # 设置目标属性
  set_property(TARGET my_test1 PROPERTY CXX_STANDARD 11) # 设定编译生成my_test1可执行目标时的C++标准
  set_property(TARGET my_test1 PROPERTY CXX_STANDARD_REQUIRED ON)# 设定是否强制使用C++标准，否
  ```

  这段代码的含义，主要体现在，先使用`set()`命令设置整个项目的C++标准及是否强制使用C++标准，然后又通过`set_property()`单独的设置了`my_test1`项目编译时遵循的C++标准的属性。

  

  **这里需要解释一些地方：**

  1. `set(CMAKE_CXX_STANDARD 20)`与`set_property(TARGET my_test1 PROPERTY CXX_STANDARD 11)`的格式看起来好像啊，如果set_property()命令是设置属性的话，`set()`命令这里看起来也好像是设置属性一样，但是`set()`命令不是设置变量的吗？
     - CMake 的 `set` 命令确实是用来设置变量的.
     - `CMAKE_CXX_STANDARD` 是 CMake 的内置变量，用于指定项目中希望使用的 C++ 标准版本。例如，设置为 `20` 表示目标代码应使用 C++20 标准。
     - 这个变量是 CMake 特定的，用于控制编译器使用的 C++ 标准。
     - 所以这条命令是通过设置CMake内置的特殊变量`CMAKE_CXX_STANDARD`来影响的整个项目的C++版本。
  2. - `CXX_STANDARD`则是每个可执行目标中都带有的一个属性，通过修改某个可执行目标的这个属性(给属性设定值)，可以影响到该可执行目标的C++版本。
  3. 通过上面的示例，感觉变量和属性非常类似，特别是在设置方面，都是通过“名+值”的方式进行设置，而且都能通过修改变量值或属性值，对构建过程产生一定的影响等。但是变量与属性是不同的两个东西：

### 变量与属性的区别

​	**变量Variables）**是CMake完成任务的基石，尽管这一基石正越来越多的被属性所取代，但直到现在为止，变量的作用是毋庸置疑的。
​	实际上，在整个CMake的工作逻辑中，CMakeLists.txt文件描述的核心内容就是项目的状态。以变量的形式将这种状态保存下来，是最直观的方式。当然现在CMake采用了更加容易理解的面向对象的组织方式，以各种对象（构建目标、目录、文件等）和对象的属性将状态组织起来。

​	**属性（Properties）**影响构建过程的几乎所有方面，从源文件如何编译成目标文件，一直到构建二进制文件在打包安装程序中的安装位置。它们始终附加到特定的实体，无论是目录、目标、源文件、测试用例、缓存变量，甚至整个构建过程本身。**与变量不同，属性不是保存类似变量的独立值，而是提供与其附加实体相关的信息。**这也就是为什么在获取属性的时候，需要一个变量去承接。

- 变量不附加到任何特定的实体，项目通常定义和使用自己的变量是很常见的。
- 属性通常由CMake明确定义并记录，并且始终应用于特定的实体。
- 导致混淆的可能原因之一是属性的默认值有时是由变量提供的。CMake用于相关属性和变量的命名通常遵循相同的模式，变量名是属性名加上CMAKE_前缀。

> 1. **作用域**：
>    - **变量**：CMake中的变量是通过`set()`命令设置的，并且它们的作用域是包含它们的CMakeLists.txt文件及其子目录。变量可以通过`${变量名}`或`$ENV{环境变量名}`的方式访问。
>    - **属性**：属性与特定的范围（如全局、目录、目标、源文件等）绑定，并且可以通过`set_property()`和`get_property()`命令进行设置和获取。属性的作用域取决于它们被设置的范围。
>
> 2. **持久性**：
>    - **变量**：变量在CMake配置过程中存在，但不会被持久化存储。它们在CMake重新运行时会丢失。
>    - **属性**：属性可以被持久化存储，特别是当它们与缓存（CACHE）范围关联时。这些属性可以在CMake重新运行时保持不变。
>
> 3. **使用方式**：
>    - **变量**：变量通常用于简单的值存储和传递，可以直接通过`${}`语法访问。
>    - **属性**：属性用于更复杂的场景，如与目标、源文件等关联的配置信息。它们需要通过`get_property()`命令来获取。
>
> 4. **文档说明**：
>    - **变量**：变量通常没有内建的文档说明。
>    - **属性**：属性可以有文档说明，可以通过`BRIEF_DOCS`和`FULL_DOCS`选项在`get_property()`命令中获取。
>
> 5. **继承性**：
>    - **变量**：变量不具有继承性，除非显式地在父作用域中设置。
>    - **属性**：某些属性可以从父范围继承到子范围，这取决于属性的定义。
>
> 总结来说，变量用于简单的值存储和传递，而属性用于与特定范围绑定的更复杂配置信息管理。选择使用变量还是属性取决于你的具体需求和场景。

