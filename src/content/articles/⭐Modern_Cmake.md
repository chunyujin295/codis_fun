---
title: ⭐Modern_CMake.md
date: '2025-12-10 10:11'
tag:
  - Modern_CMake
category:
  - Learn
  - Cpp
  - Modern_CMake
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241217111020446.png
abbrlink: 4a8b5c39
---

> [CMake影响与挑战-modernCMake](https://chatgpt.com/c/6937e78c-79c4-832f-a6c8-65b1b2925b2b)
>
> [CMake影响与挑战-modernCMake](https://chatgpt.com/share/6937ea3b-9d80-8007-a138-23dd18010194)

# modern cmake?这是什么意思

> 所谓 **modern CMake** 并不是一个官方版本号，而是一种使用 CMake 的“思维方式”从老一代写法向新一代写法的升级。
>
> 一句话总结区别：
>
> **老式 CMake：像在手写编译命令**
> **现代 CMake：像在声明目标之间的依赖关系**
>
> ------
>
> ### 老式 CMake（混乱、全局变量驱动）
>
> 典型特征：
>
> ```
> include_directories(include)
> add_definitions(-DUSE_XYZ)
> set(SOURCES a.cpp b.cpp c.cpp)
> add_executable(app ${SOURCES})
> target_link_libraries(app foo bar)
> ```
>
> 问题是：
>
> • include 目录、编译选项全局污染
> • 编译 flag 容易丢、互相覆盖
> • 项目越大越混乱
> • 每个子项目都得重复设置
>
> 换句话说，它像是在“全局堆叠构建参数”，没有模块化、没有封装。
>
> ------
>
> ### modern CMake（面向 target 的接口与封装）
>
> > target：构建目标
>
> 标志性的写法：
>
> ```
> add_library(mylib src/a.cpp src/b.cpp)
> target_include_directories(mylib PUBLIC include)
> target_compile_features(mylib PUBLIC cxx_std_20)
> 
> add_executable(app src/main.cpp)
> target_link_libraries(app PRIVATE mylib)
> ```
>
> 关键词：**target（目标）**
>
> 每个 target（库 / 可执行文件）有自己的：
>
> • include 路径
> • 编译特性
> • 依赖
> • 链接选项
>
> 且依赖关系自动传播：
>
> ```
> app → mylib → include、flags、C++20
> ```
>
> 无需在 app 里再重复写设置。
>
> ------
>
> ### modern CMake 的核心理念（通俗解释）
>
> 老式写法：全局搞定编译器配置，然后让所有目标凑合着用
> 现代写法：把配置封装到每个目标上，然后它们自己负责传播依赖
>
> 这带来的好处非常现实：
>
> • 项目越大越不会乱
> • 不同模块不会互相污染
> • 依赖管理清晰透明
> • 子项目直接复用，不重新配置
> • 导出给别人用时非常方便（`find_package`）
>
> 所以现代 CMake 是“项目越来越大越爽”，而老式 CMake 是“项目越大越地狱”。
>
> ------
>
> ### 它为什么叫 modern
>
> 因为这种理念在 CMake 3 之后逐渐成熟，大约从 3.10 ~ 3.15 时代开始成为行业共识。
> 如今写库的“标准范式”就是：
>
> ```
> add_library(mylib ...)
> target_include_directories(mylib PUBLIC ...)
> target_compile_features(mylib PUBLIC cxx_std_20)
> target_link_libraries(mylib PUBLIC otherlib)
> ```
>
> 完全不用 `include_directories()`、`add_definitions()`、`set(CMAKE_CXX_FLAGS ...)` 等老旧写法。
>
> ------
>
> ### 一个非常现实的判断
>
> 如果你看到某项目的 CMakeLists 像一团全局命令和变量泥沼，那是老式 CMake。
> 如果你看到它只围绕 `target_xxx()` 操作，那就是 modern CMake。
>
> ------
>
> 一旦习惯 modern CMake，你会明显感觉：
>
> • 配置逻辑更清晰
> • CMakeLists 好维护
> • 不会随便把 include / flags 洒得到处都是
> • 导出给别人用更容易
>
> 如果愿意，我可以给你一个最小但真正“现代风格”的项目模板，再加上解释，让你一看就懂并直接能用到工作或项目里。

# 不使用include_directories,那我项目中的头文件路径如何能被引入呢

> 关键在于：**现代 CMake 不再用全局的 include_directories，而是把 include 路径绑定到具体的 target 上。**
>
> 你的问题可以改写成一句更本质的话：
>  “不给整个项目设 include 路径，那编译器怎么知道头文件在哪？”
>
> 答案是：**通过 target 的接口传播机制。**
>
> ------
>
> ### 最直接的例子
>
> 假设你有：
>
> ```
> project/
>  ├─ include/    # 头文件
>  └─ src/        # 源文件
> ```
>
> modern CMake 写法：
>
> ```
> add_library(mylib
>     src/a.cpp
>     src/b.cpp
> )
> 
> target_include_directories(mylib
>     PUBLIC
>         ${CMAKE_CURRENT_SOURCE_DIR}/include
> )
> ```
>
> 不是全局注入，而是告诉 CMake：**mylib 这个库需要这个包含路径**。
>
> 现在你创建可执行程序：
>
> ```
> add_executable(app src/main.cpp)
> target_link_libraries(app PRIVATE mylib)
> ```
>
> 然后神奇的事发生了——
>  你**不需要**手动给 app 添加 include 路径。
>  因为：
>
> ```
> mylib 的 PUBLIC include 会自动传播到 app
> ```
>
> 这就是“接口传播”。
>
> ------
>
> ### 为什么这么做更安全
>
> 全局 include_directories 的问题：
>
> • 任何模块都可能意外包含到不该访问的头文件
>  • include 顺序互相干扰
>  • 追踪“这个路径从哪来的”非常难
>  • 大项目里极容易爆炸成混乱
>
> target_include_directories 的特点：
>
> • 依赖关系清晰
>  • 哪个模块暴露哪些头文件一目了然
>  • PRIVATE / PUBLIC / INTERFACE 语义明确
>  • 不会污染不相关的模块
>
> 一个库声明 PUBLIC include，就是说：
>
> “依赖我的人，也需要看到这些头文件。”
>
> PRIVATE 只给自己用。
>  INTERFACE 只给别人传播，自己不需要。
>
> ------
>
> ### 让人最安心的一句话总结
>
> 过去：
>  “把头文件路径丢进全局，让所有东西共享。”
>
> 现在：
>  “把头文件路径绑定到库，让依赖关系自然传播。”
>
> 这不仅更合理，而且对大型工程来说是救命稻草。
>
> ------
>
> ### 如果你的头文件在源代码旁边（常见）
>
> 如果你的库头文件在 `src/` 同目录，不在独立的 include 文件夹，比如：
>
> ```
> src/
>   a.cpp
>   a.h
>   b.cpp
>   b.h
> ```
>
> modern CMake 推荐做法是**声明为 INTERFACE 或 PUBLIC 目录**：
>
> ```
> target_include_directories(mylib
>     PUBLIC
>         ${CMAKE_CURRENT_SOURCE_DIR}/src
> )
> ```
>
> 而不是 include_directories 全局注入。
>
> ------
>
> 简而言之：
>
> 你不是“放弃了 include 路径”
>  而是“把 include 路径正确地绑定给它所属的 target，让依赖关系自动管理范围。”
>
> 现代 CMake 的威力就在这一点上：**干净、封闭、可传播、可维护。**
>
> 如果你愿意，我可以再往下扩展——
>  展示一个真正完整的现代 CMake 项目模板，从根到子模块、安装、导出、find_package 全部顺畅。
>  那会让你对这一套机制理解得更扎实。

# 好的

> 下面给出一个**真正现代风格、可实际复用的 CMake 项目模板**。
>  这个模板具备核心能力：
>
> • 层次清晰的目录结构
>  • 库对外暴露头文件，并支持依赖传播
>  • 可执行程序正确链接库
>  • 支持 `install` 和 `find_package`
>  • 完全避免老式全局命令
>
> 看完这一套，你就能理解 modern CMake 的完整工作流。
>
> ------
>
> ## 目录结构（标准推荐）
>
> ```
> MyProject/
>  ├─ CMakeLists.txt
>  ├─ cmake/                # 自定义 cmake 脚本放这里（可选）
>  ├─ include/
>  │    └─ mylib/
>  │         └─ mylib.h     # 对外头文件
>  └─ src/
>       ├─ mylib.cpp        # 库源文件
>       └─ main.cpp         # 可执行程序
> ```
>
> ------
>
> ## 顶层 CMakeLists.txt
>
> ```cmake
> cmake_minimum_required(VERSION 3.20)
> project(MyProject LANGUAGES CXX)
> 
> # 默认使用 C++20（推荐，不建议修改全局 CXX_FLAGS）
> set(CMAKE_CXX_STANDARD 20)
> set(CMAKE_CXX_STANDARD_REQUIRED ON)
> 
> # 创建库 target
> add_library(mylib
>     src/mylib.cpp
> )
> 
> # 库的头文件路径绑定到库本身，而不是全局
> target_include_directories(mylib
>     PUBLIC
>         ${CMAKE_CURRENT_SOURCE_DIR}/include
> )
> 
> target_compile_features(mylib PUBLIC cxx_std_20)
> 
> # 创建可执行文件
> add_executable(myapp src/main.cpp)
> target_link_libraries(myapp PRIVATE mylib)
> 
> # 安装（让其他项目 find_package(MyProject)）
> install(TARGETS mylib myapp
>     EXPORT MyProjectTargets
>     ARCHIVE DESTINATION lib
>     LIBRARY DESTINATION lib
>     RUNTIME DESTINATION bin
> )
> install(DIRECTORY include/ DESTINATION include)
> 
> # 导出配置文件供 find_package() 使用
> include(CMakePackageConfigHelpers)
> write_basic_package_version_file(
>     "${CMAKE_CURRENT_BINARY_DIR}/MyProjectConfigVersion.cmake"
>     COMPATIBILITY SameMajorVersion
> )
> install(EXPORT MyProjectTargets
>     FILE MyProjectTargets.cmake
>     NAMESPACE MyProject::
>     DESTINATION lib/cmake/MyProject
> )
> configure_file(
>     MyProjectConfig.cmake.in
>     "${CMAKE_CURRENT_BINARY_DIR}/MyProjectConfig.cmake"
>     @ONLY
> )
> install(
>     FILES "${CMAKE_CURRENT_BINARY_DIR}/MyProjectConfig.cmake"
>           "${CMAKE_CURRENT_BINARY_DIR}/MyProjectConfigVersion.cmake"
>     DESTINATION lib/cmake/MyProject
> )
> ```
>
> ------
>
> ## MyProjectConfig.cmake.in （写在工程根目录）
>
> ```cmake
> @PACKAGE_INIT@
> 
> include("${CMAKE_CURRENT_LIST_DIR}/MyProjectTargets.cmake")
> ```
>
> 这三行就够，不用写乱七八糟的逻辑。
>
> ------
>
> ## 库源码示例
>
> include/mylib/mylib.h：
>
> ```cpp
> #pragma once
> #include <string>
> 
> std::string hello();
> ```
>
> src/mylib.cpp：
>
> ```cpp
> #include "mylib/mylib.h"
> 
> std::string hello() {
>     return "hello";
> }
> ```
>
> ------
>
> ## main 示例
>
> src/main.cpp：
>
> ```cpp
> #include <iostream>
> #include "mylib/mylib.h"
> 
> int main() {
>     std::cout << hello() << std::endl;
> }
> ```
>
> ------
>
> ### 构建与安装验证
>
> 构建：
>
> ```
> cmake -S . -B build
> cmake --build build
> ```
>
> 安装：
>
> ```
> cmake --install build --prefix install
> ```
>
> 然后任意项目都可以这样使用：
>
> ```cmake
> find_package(MyProject REQUIRED)
> add_executable(test t.cpp)
> target_link_libraries(test PRIVATE MyProject::mylib)
> ```
>
> ------
>
> ## 总结这套架构的优点
>
> • 没有 `include_directories()`、`add_definitions()` 这种全局污染
>  • 所有依赖、头文件、编译特性都挂在 target 上
>  • app 自动继承 mylib 的 include，不需要重复设置
>  • 安装 / 导出逻辑标准、清晰
>  • 随时可扩展多个模块而不会乱掉
>
> 这个就是**现代 CMake 指南书级的最小范例**。
>
> 如果之后你想继续升级构建系统，我可以逐步扩展：
>
> ➤ 加子模块（subdirectory）
>  ➤ 加第三方依赖（find_package、FetchContent）
>  ➤ 切换共享库 / 静态库
>  ➤ 单元测试与 coverage
>  ➤ CPack 打包发行
>
> 你愿意研究哪个方向，我就继续往下带你。

# 所以这样的话,一个大型项目可以被分为多个子项目,当子项目中需要调用别的子项目中的头文件的时候,只需要引入对应的子项目就行了

> 完全正确，你已经抓到现代 CMake 的核心思想。
>
> 一个大型项目拆成多个子项目（模块 / 组件 / 库），每个子项目是一个 **target**。
>  当某个子项目需要使用另一个子项目的头文件时，不是“加 include 路径”，而是 **链接那个子项目的 target**。
>
> 效果不是“我拿到它的头文件路径”，而是：
>
> **我依赖它，它的接口自动对我生效——头文件、编译选项、特性统统自动传过来。**
>
> ------
>
> 举个更接近真实大型工程的例子：
>
> ```
> GameEngine/
>  ├─ CMakeLists.txt
>  ├─ Engine/
>  │    ├─ CMakeLists.txt
>  │    └─ ...
>  ├─ Renderer/
>  │    ├─ CMakeLists.txt
>  │    └─ ...
>  ├─ Physics/
>  │    ├─ CMakeLists.txt
>  │    └─ ...
>  └─ Game/
>       ├─ CMakeLists.txt
>       └─ ...
> ```
>
> 顶层 CMakeLists：
>
> ```cmake
> add_subdirectory(Engine)
> add_subdirectory(Renderer)
> add_subdirectory(Physics)
> add_subdirectory(Game)
> ```
>
> 每个模块都是独立 target：
>
> Engine/CMakeLists.txt：
>
> ```cmake
> add_library(engine ...)
> target_include_directories(engine PUBLIC include)
> ```
>
> Renderer/CMakeLists.txt：
>
> ```cmake
> add_library(renderer ...)
> target_link_libraries(renderer PUBLIC engine)
> ```
>
> Physics/CMakeLists.txt：
>
> ```cmake
> add_library(physics ...)
> target_link_libraries(physics PUBLIC engine)
> ```
>
> Game/CMakeLists.txt：
>
> ```cmake
> add_executable(game ...)
> target_link_libraries(game PRIVATE renderer physics)
> ```
>
> ------
>
> ### 依赖关系自然产生效果
>
> game → renderer → engine
>  game → physics → engine
>
> game 自动获得：
>
> • Engine 暴露的头文件
>  • Engine 的编译特性（比如 C++20 或 SIMD）
>  • Engine 打开的预处理器定义
>  • Engine 依赖的库
>  • Engine 的 include 目录
>
> 无须手动写 include_directories，也永远不会出现“忘了加 include 路径”这种蠢 bug。
>
> ------
>
> ### 为什么这对大型项目很重要
>
> 传统“手写 include 的时代”会出现这些地狱场景：
>
> • 头文件路径依赖链混乱
>  • 新人看不懂依赖关系
>  • 模块间互相污染
>  • 模块解耦失败
>  • CI 经常因为路径乱套而爆炸
>
> 而现代 CMake 改写了规则：
>
> • 模块之间的依赖像搭积木一样清楚
>  • 依赖谁 → 链接那个 target，就行
>  • 子项目的公共 API 由 `PUBLIC` 控制
>  • 不必担心 include 顺序、冲突、污染
>
> 大型系统开发从易碎变成可维护。
>
> ------
>
> ### 越到后期好处越明显
>
> 项目越大，modern CMake 的收益越大。
>  最终你会发现 CMakeLists.txt 的可读性甚至比很多 C++ 源文件还好：
>
> ```
> Game depends on Renderer and Physics
> Renderer depends on Engine
> Physics depends on Engine
> ```
>
> 这基本等于自动生成了依赖图，构建逻辑就不会失控。
>
> ------
>
> 你已经理解到核心了。
>  如果你愿意，我们可以继续进阶下去，例如：
>
> • 如何在一个模块中“只暴露部分头文件”
>  • 如何让子项目可以被外部项目单独构建（可插拔）
>  • 如何为库生成导出宏（支持跨平台 DLL）
>  • 引入第三方库的最佳方式（避免乱用子模块或全局变量）
>
> 这些是大型 C++ 项目真正会遇到的问题，也是 modern CMake 的杀手级能力。