---
title: ⭐CMake基于_版本锁定的源码依赖_方案解决三方库跨平台问题.md
date: '2025-12-10 10:12'
tag:
  - CMake
category:
  - Learn
  - Cpp
  - Modern_CMake
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241217111020446.png
abbrlink: 8301bcfc
---

> 现在，当项目中需要使用到第三方库的时候，我已知有下面几种的处理方法：
>
> 1. **直接通过源码集成。**这样可以有效解决第三方库跨平台的问题，项目位于不同平台下，只需要现编译即可。
>
>    > 优点：跨平台性好，且源码继承后，第三方库的版本变动不会受到外接影响。
>    >
>    > 缺点：项目中杂糅进第三方源码，耦合性提升。不适用于闭源三方库。第三方库更新时，如果项目也需要更新，需要手动替换源码，繁杂。
>    >
>    > "跨平台稳，但升级麻烦。"
>
> 2. **在对应平台下安装第三方库，通过find_package的方法**（如果不在系统路径下，需要指定一下查询路径）进行引入。
>
>    > 优点：只需在CMake中写入find_package即可，项目中可以不携带任何第三方库相关源码或库，用户自行编译下载即可，降低项目与第三方库的结构耦合性。
>    >
>    > 缺点：并非自动且完全跨平台，依靠用户手动安装第三方库，并不方便。
>    >
>    > "解耦优雅，但跨平台和版本管理炸雷。"
>
> 3. **项目中携带预先编译好的第三方库。**
>
>    > 优点：简单。
>    >
>    > 缺点：第三方库对于跨平台的支持，完全依赖于维护者提供了哪些平台下的库，不全面。每增加一个第三方库，项目就需要引入n个库文件，项目大小飞速增长。
>    >
>    > "最挫的 一种方法。"
>
> 而且，如果现在我正在编写一个项目A，A项目中，引用了我此前自己编写的库B，那么需要使用哪种方式比较妥当呢？我的库B源码放置在了Git仓库上。
>
> 如果采用方法一，那么A中冗余一份随时可能过时B代码（因为B随时可能更新）。
>
> 如果采用方法二，在不同平台下开发的时候同样麻烦，需要先手动安装库B。
>
> 方法三，不适用于现代化的CMake，不建议考虑。

现在，越来越多的C++开始采用更成熟的跨平台方式：**统一源码管理 + 独立发布**

具体来说：

A *永远* 用源码方式集成 B（保证跨平台和构建一致性）
 但 B *仍然* 作为独立库对外发布（方便被别的项目复用）

关键是不要用“复制源码”那种半死不活的方式，而是用**可控版本的源码拉取机制**。



> > 以下内容来自https://chatgpt.com/share/6938d43e-268c-8007-ab77-1e60a457079d

# 可控版本的源码拉取机制

**Source-based Dependency Management（基于源码的依赖管理）**

**Version-pinned source dependencies（版本锁定的源码依赖）**

说白了就是基于Git等版本控制的源代码拉取。

> 方式 1：Git Submodule 方案
>  A 中引用 B，但不是复制代码，而是：
>
> ```
> A/
>   third_party/
>     B/   <-- Git Submodule 指向 B 仓库
> ```
>
> 当 B 更新时，A 想升级就手动 `git submodule update --remote`
>  不想升级就保持当前版本。
>
> 优点：版本完全可控、跨平台一致、构建同步
> 缺点：第一次学习 Submodule 会有点反人类（但能习惯）
>
> ------
>
> 方式 2：CMake FetchContent / CPM.cmake（推荐）
> 更现代，甚至不需要预先拉取 B。
>
> 在 A 的 CMakeLists.txt 加：
>
> ```cmake
> include(FetchContent)
> FetchContent_Declare(
>   ProjectB
>   GIT_REPOSITORY https://github.com/你/B.git
>   GIT_TAG v1.2.3
> )
> FetchContent_MakeAvailable(ProjectB)
> ```
>
> 这三个好处特别硬核：
>
> 1. A 始终构建 B 的源码 —— 天生跨平台
> 2. A 对 B 的版本是锁定的 —— 不会突然被升级炸掉
> 3. A 要升级 B 时只改一个 GIT_TAG
>
> 对外使用 B 的项目可以继续 `find_package(B)`
>  但 A 不需要依赖外置库文件。
>
> 这就是**源码集成的便利** + **库发布的解耦**的融合。
>
> ------
>
> 为什么这种方案在行业里变成主流？
>
> 因为 C++ 大型项目要长期活下去必须：
>
> • 自己稳定构建
>  • 外部稳定复用
>  • 依赖版本不偷偷变化
>  • 跨平台不靠“预编译库”堆尸
>
> 例如：
>
> Boost、LLVM、Google Test、spdlog、fmt、ImGui
>  都在逐步往这种“源码声明式拉取 + 独立发布”模式靠。
>
> ------
>
> 总结一句硬话：
>
> 跨平台项目不是靠多平台库文件堆出来的，而是靠**统一构建入口 + 明确依赖版本**稳定下来的。
>
> 把 B 当第三方依赖引用，但仍然以源码参与构建，就是这条路的工程化答案。



# CMake FetchContent / CPM.cmake

> 好，那我们就把这件事**一次讲清楚、讲透、讲到你能直接落地**。
>  下面不是“CMake 教程”，而是一套**工程级做法**，专门解决你现在的 A（可执行）+ B（库）+ 跨平台 + 可升级 这个组合拳。
>
> 我先讲 **FetchContent（CMake 官方）**，再补 **CPM.cmake（工程体验更好）**。原理是同一套。
>
> ------
>
> ## 一、你要先把 B 设计成“可被 Fetch 的库”
>
> 这是最容易被忽略、也是最关键的一步。
>
> ### 1️⃣ 项目 B 的最低要求
>
> B 必须满足三点：
>
> 1. **自己是一个标准 CMake 项目**
> 2. **导出 target（不是裸变量）**
> 3. **头文件 / 编译选项 / 依赖都绑在 target 上**
>
> ### ✅ 一个合格的 B 的最小结构
>
> ```
> B/
>   CMakeLists.txt
>   include/
>     B/b.h
>   src/
>     b.cpp
> ```
>
> ### ✅ B 的 CMakeLists.txt（核心）
>
> ```cmake
> cmake_minimum_required(VERSION 3.15)
> project(B LANGUAGES CXX)
> 
> add_library(B)
> 
> target_sources(B
>   PRIVATE
>     src/b.cpp
> )
> 
> target_include_directories(B
>   PUBLIC
>     $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
>     $<INSTALL_INTERFACE:include>
> )
> 
> target_compile_features(B PUBLIC cxx_std_17)
> ```
>
> ⚠️ 重要工程原则
>  **不要在 B 里写：**
>
> - `include_directories(...)`
> - `add_definitions(...)`
> - 全局 `set(CMAKE_CXX_FLAGS ...)`
>
> 全部用 `target_*`。
>
> 这样 B 才能被 A **无副作用地引入**。
>
> ------
>
> ## 二、A 使用 FetchContent 拉取 B（核心方案）
>
> 现在进入正题。
>
> ### 1️⃣ A 的目录结构
>
> ```
> A/
>   CMakeLists.txt
>   src/
>     main.cpp
> ```
>
> ### 2️⃣ A 的 CMakeLists.txt（完整版示例）
>
> ```cmake
> cmake_minimum_required(VERSION 3.15)
> project(A LANGUAGES CXX)
> 
> include(FetchContent)
> 
> FetchContent_Declare(
>   B
>   GIT_REPOSITORY https://github.com/你的名字/B.git
>   GIT_TAG        v1.2.3     # 🔒 锁版本
> )
> 
> FetchContent_MakeAvailable(B)
> 
> add_executable(A
>   src/main.cpp
> )
> 
> target_link_libraries(A
>   PRIVATE
>     B
> )
> ```
>
> ### 发生了什么？
>
> • CMake 配置阶段自动 clone B
>  • B 被当成子项目 add_subdirectory
>  • B 的 target 自动可用
>  • A 和 B 用的是 **同一套编译器 / 平台 / 选项**
>
> 这一步直接解决了你提出的三大痛点：
>
> ✅ 完全跨平台
>  ✅ 不需要任何预编译库
>  ✅ 升级 B 只改一个 tag
>
> ------
>
> ## 三、FetchContent 的“工程级细节”（非常重要）
>
> ### 🔹 1. 离线 / 内网构建怎么办？
>
> ```cmake
> set(FETCHCONTENT_FULLY_DISCONNECTED ON)
> ```
>
> 然后提前准备好源码缓存。
>
> ------
>
> ### 🔹 2. 本地调试 B（开发者常用）
>
> ```cmake
> set(FETCHCONTENT_SOURCE_DIR_B /path/to/local/B)
> ```
>
> A 会直接使用本地 B，不 clone。
>
> 这对同时开发 A+B 极其友好。
>
> ------
>
> ### 🔹 3. 防止 B 污染 A（必做）
>
> 在 B 中：
>
> ```cmake
> option(B_BUILD_TESTS "Build tests" OFF)
> ```
>
> 在 A 中：
>
> ```cmake
> set(B_BUILD_TESTS OFF CACHE BOOL "" FORCE)
> ```
>
> 主项目掌控子库行为。
>
> ------
>
> ## 四、让 B 同时支持 FetchContent + find_package（专业做法）
>
> 你提到：
>
> > B 还是一个“独立库”
>
> 这点很重要。
>
> ### ✅ B 的 install + export（简化版）
>
> ```cmake
> install(
>   TARGETS B
>   EXPORT BTargets
> )
> 
> install(
>   EXPORT BTargets
>   NAMESPACE B::
>   DESTINATION lib/cmake/B
> )
> ```
>
> 这样：
>
> • 外部项目可以 `find_package(B)`
>  • A 内部用 FetchContent
>  • 两种用法互不冲突
>
> 这就是**工业级库设计**。
>
> ------
>
> ## 五、CPM.cmake：FetchContent 的工程增强版
>
> 如果你觉得 FetchContent 稍微啰嗦，CPM 是工程师的快乐源泉。
>
> ### 1️⃣ 在 A 中引入 CPM
>
> ```cmake
> include(cmake/CPM.cmake)
> ```
>
> 或自动下载：
>
> ```cmake
> include(FetchContent)
> FetchContent_Declare(
>   CPM
>   GIT_REPOSITORY https://github.com/cpm-cmake/CPM.cmake.git
>   GIT_TAG v0.40.2
> )
> FetchContent_MakeAvailable(CPM)
> ```
>
> ------
>
> ### 2️⃣ 使用 CPM 添加 B
>
> ```cmake
> CPMAddPackage(
>   NAME B
>   GITHUB_REPOSITORY yourname/B
>   VERSION 1.2.3
> )
> ```
>
> 然后：
>
> ```cmake
> target_link_libraries(A PRIVATE B)
> ```
>
> ### CPM 的优势
>
> ✅ 自动缓存
>  ✅ 版本语义更清晰
>  ✅ 错误信息更友好
>  ✅ 更少样板代码
>
> 在真实工程中，**CPM 使用体验 > 原生 FetchContent**。
>
> ------
>
> ## 六、你现在这套方案解决了什么？
>
> ✔ 不在 A 中堆多平台库文件
>  ✔ B 升级不需要复制源码
>  ✔ A 的体积不随平台指数级膨胀
>  ✔ CI 一套脚本跑所有平台
>  ✔ 架构上没有“特殊平台分支”
>
> 一句工程结论：
>
> **你不是在“引入库”，而是在“声明依赖版本并让构建系统完成剩下的事”。**
>
> ------
>
> 下一步，如果你愿意，我们可以继续把这套方案升级到：
>
> • A / B / C 多库依赖树
>  • 私有仓库 + 鉴权
>  • CI 中的依赖缓存
>  • Windows / Android / iOS 的坑点
>  • ABI / 接口稳定性策略
>
> 这些是“能跑”和“能活三年”的分水岭。



# Git版本？

上面的方法中提到了，项目A引入B的源码的时候，需要锁定版本，且是git版本（git tag）。

> 这个问题抓住了工程链路中的关键节点：**“版本不是 CMake 设置的，是 Git 设置的。”**
>  FetchContent 里的 `GIT_TAG`，指的就是 **Git 仓库中的某个 Tag 或 Commit**。
>
> 换句话说：
>
> > 你要让 CMake 拉取到“版本 v1.2.3”，前提是你的 Git 仓库里**真的存在 v1.2.3 这个 tag**。
>
> 所以现在我们来完整讲清楚：
>  **一个 Git 项目正确的“版本化流程”到底怎么做？**
>
> ------
>
> # 1. Git 中如何创建一个版本（Tag）
>
> 假设你已经准备好一版稳定的 B 库，你想让它成为 “v1.2.3”。
>
> 在仓库根目录执行：
>
> ```bash
> git tag v1.2.3
> git push origin v1.2.3
> ```
>
> 就这么简单。
>
> 这两个命令的意思：
>
> - `git tag v1.2.3`
>    在当前 commit 上创建一个 tag，名字叫 v1.2.3。
> - `git push origin v1.2.3`
>    把这个 tag 推到远端（GitHub/GitLab）。
>
> 推上去之后，你的仓库 URL 就有这个版本了。
>
> 你可以在 GitHub 的代码页 → Tags 里看到它。
>
> ------
>
> # 2. 如何给 Tag 添加说明（更专业）
>
> 工程上常见做法是使用“annotated tag”（带信息的标签）：
>
> ```bash
> git tag -a v1.2.3 -m "B 库第一个正式版本，修复网络模块，新增 IO 接口"
> git push origin v1.2.3
> ```
>
> 这样 tag 不只是一串字符，而是：
>
> - 有创建者
> - 有日期
> - 有版本说明
> - 有 hash 绑定
>
> 这类 tag 更适合做 release。
>
> ------
>
> # 3. GitHub Release（不是必须，但非常专业）
>
> 如果你想让别人使用你的库，这一步能显著增加“可信度”。
>
> GitHub 上：
>
> - 点 **Releases** → **Create new release**
> - 选择 tag（或新建 tag）
> - 写 release note
> - 发布
>
> 这样别人会看到：
>
> ```
> B v1.2.3
> Source code (zip)
> Source code (tar.gz)
> Release notes
> ```
>
> FetchContent 也能拉这种 tag。
>
> ------
>
> # 4. CMake 如何使用这个版本
>
> 假设你刚刚打了 v1.2.3。
>
> A 的 CMake 就可以这样写：
>
> ```cmake
> FetchContent_Declare(
>   B
>   GIT_REPOSITORY https://github.com/yourname/B.git
>   GIT_TAG        v1.2.3
> )
> ```
>
> 然后 CMake 会：
>
> - clone 远端仓库
> - checkout 到 tag v1.2.3
> - 把它当作子项目构建
>
> 跨平台、版本锁定、可控。
>
> ------
>
> # 5. 版本升级怎么办？
>
> 当你更新了 B，并决定发布下一版：
>
> ```bash
> git tag v1.2.4
> git push origin v1.2.4
> ```
>
> 然后 A 中把 tag 换成：
>
> ```cmake
> GIT_TAG v1.2.4
> ```
>
> 完事。
>
> 升级完全可控，不会“偷偷混入未知改动”。
>
> ------
>
> # 6. 版本号选什么格式？
>
> 最常见也是最专业的格式叫 **Semantic Versioning（语义化版本号）**：
>
> ```
> MAJOR.MINOR.PATCH
> 例如：v2.5.13
> ```
>
> 含义：
>
> - MAJOR（大版本）
>    不兼容变化
> - MINOR（小版本）
>    新功能、兼容旧 API
> - PATCH（补丁）
>    bug 修复、功能不变
>
> C++ 库普遍采用这套规则。
>
> ------
>
> # 7. 总结成一句最硬核的话
>
> 你问的是：
>
> > CMake 的 GIT_TAG 指定的“版本”到底是什么？
>
> 工程上的准确回答是：
>
> > **它指向 Git 仓库中的 Tag 或某个 commit。
> >  版本管理属于 Git，CMake 只是使用它。**
>
> 你只需要会打 tag，这套跨平台方案就能跑完整生命周期。
>
> ------
>
> 如果你愿意，我们可以继续讲：
>
> - 如何在 CI 里自动打 tag、自动生成版本号
> - 如何保证版本对应 ABI（稳定性问题）
> - 如何让 B 同时对外提供 find_package Config
> - 如何给版本添加“预发布”（beta/rc）
> - 如何为库做“版本间兼容策略”
>
> 这些内容会让你的库达到专业开源项目那种“能长期活”的水平。



