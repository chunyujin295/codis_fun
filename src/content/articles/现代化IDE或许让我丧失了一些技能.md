---
title: 现代化IDE或许让我丧失了一些技能
date: '2025-1-29 21:55'
tag:
  - Ai问答
category:
  - Ai问答
abbrlink: 2a4edbc7
---

> 事情的来龙去脉：
>
> 2025年的大年初一，我尝试使用cursor(基于vscode魔改的集成了AI编码工具的一个编辑器)配置一下项目的开发环境，但是配置了半个多小时以失败告终，我发现自己已经过度依赖于现代化的IDE了，越来越关注于项目的开发而忽略了构建工具的使用，自己正在缺失某些部分的能力

##### 问题

现在我有这样的一个疑问：我作为一个cpp的程序员，在开发的时候使用CLion这种比较成熟的人性化IDE，通过图形化的方式我可以很方便得配置各种环境；但是到了vscode中，我需要通过安装插件的方式来配置cmake，或许我也可以接受，只要知道插件如何使用，我如何执行cmake命令就可以；但是如果给了我一个”裸“的环境，比如一个我依赖的各种库已经安装好了，但是并没有给我一个IDE的环境，需要我在命令行下使用cmake命令进行构建、编译，我需要配置大量的参数，这一定会十分麻烦。但是作为一个程序员，确实需要掌握这种使用最基本的工具的能力，而不是过度依赖于现代化的IDE，而我好像发现我逐渐丧失了这种能力，请问我应该如何去解决我心头的疑惑呢？或许有意识地进行在例如Linux命令行终端开发练习会有些作用吗？

##### DeepSeek-V3

> 深度思考：嗯，我现在是一个C++程序员，平时用CLion这种IDE很顺手，图形界面配置环境很方便。但最近遇到个问题，当需要用VSCode或者纯命令行环境的时候，感觉有点力不从心。特别是在没有IDE的情况下，需要手动配置CMake和各种参数，这让我有点焦虑。担心自己过于依赖IDE，而失去了底层工具的使用能力。该怎么办呢？
>
> 
>
> 首先，我应该回忆一下CMake的基本用法。记得CMake是通过CMakeLists.txt文件来管理项目的，但具体怎么在命令行里运行呢？是不是先创建一个build目录，然后进去执行cmake ..，然后再make？不过有时候可能需要指定编译器或者依赖库的路径，这时候是不是要用-D选项来设置变量？比如指定Boost库的位置或者OpenCV的路径？
>
> 
>
> 比如，如果项目需要依赖某个库，比如Boost，那么在CMakeLists.txt里应该有find_package(Boost REQUIRED)，然后在命令行中如果Boost不在默认路径，可能需要用-DBOOST_ROOT=/path/to/boost这样的参数。对吧？那如果我在命令行里编译的时候，如何正确传递这些参数呢？是不是在cmake命令后面加上这些-D选项？
>
> 
>
> 另外，可能还会遇到不同平台的问题，比如在Linux下和Windows下，路径的写法不同，或者编译器不同，这时候CMake的生成文件也会有差异。比如在Windows下可能需要生成Visual Studio的项目文件，而Linux下生成Makefile。这时候应该怎么处理？
>
> 
>
> 还有，如果在命令行里编译时出现错误，比如找不到某个库，这时候需要怎么排查？可能需要检查CMake的输出，看看有没有找到所需的库，或者检查CMakeCache.txt里的变量是否正确。或者是不是需要设置环境变量，比如PKG_CONFIG_PATH来帮助CMake找到.pc文件？
>
> 
>
> 再想想，有没有什么练习的方法能提升这方面的能力？比如在Linux虚拟机里，从零开始配置一个C++项目，手动写CMakeLists.txt，然后在命令行里编译。可能需要安装一些依赖库，比如安装Boost、OpenSSL等，然后在CMake中正确引用它们。这样反复练习，应该能熟悉CMake的各种配置选项和命令行的使用。
>
> 
>
> 另外，阅读一些CMake的官方文档或者教程可能会有帮助。比如CMake的官方教程就教了如何逐步构建项目，添加库、安装规则等。或许我应该跟着这些教程一步步来，实际操作一遍，加深理解。
>
> 
>
> 还有，可能参考一些开源项目的CMake配置，看看他们是怎么组织项目结构，处理依赖库，设置编译选项的。例如，一些使用CMake管理的知名项目，比如CMake自身、LLVM等，他们的CMakeLists.txt是怎么写的，如何处理不同平台和编译器的差异。
>
> 
>
> 在实际操作中，可能会遇到各种问题，比如链接错误、头文件找不到等。这时候需要学会如何阅读CMake生成的日志，查看编译器的错误信息，然后一步步调整CMake的配置。比如，如果头文件路径不对，可能需要用include_directories()命令添加路径；如果链接库找不到，可能需要用target_link_libraries()指定库的路径和名称。
>
> 
>
> 还有，自动化构建工具的使用，比如make、ninja等，不同的生成器在CMake中如何选择？比如使用-G"Unix Makefiles"或者-G"Ninja"，然后编译时用make或者ninja命令。这些工具的区别和优缺点是什么？
>
> 
>
> 可能还需要了解如何交叉编译，如何为不同的目标平台生成构建文件。比如，为ARM架构编译程序，需要在CMake中设置什么选项？
>
> 
>
> 总结一下，我需要的是系统地学习和练习CMake的命令行使用，理解其工作原理，以及如何处理各种常见的配置问题。通过实际项目练习，查阅文档，参考开源项目，逐步积累经验，减少对IDE的依赖。同时，熟悉编译工具链，了解从源码到可执行文件的整个构建过程，这样即使没有IDE，也能游刃有余地处理构建问题。

面对从依赖IDE转向命令行构建的挑战，可以按照以下步骤系统性地提升能力，逐步掌握CMake和命令行工具的使用：

---

### **1. 理解CMake基础**
- **核心概念**：熟悉`CMakeLists.txt`的结构、变量、函数（如`project()`, `add_executable()`, `target_link_libraries()`）。
- **官方文档**：阅读[CMake官方教程](https://cmake.org/cmake/help/latest/guide/tutorial/index.html)，完成基础到进阶的示例项目。
- **最小化示例**：从最简单的项目开始，例如：
  ```cmake
  cmake_minimum_required(VERSION 3.10)
  project(HelloWorld)
  add_executable(hello main.cpp)
  ```
  在命令行中执行：
  ```bash
  mkdir build && cd build
  cmake .. && cmake --build .
  ```

---

### **2. 掌握命令行操作**
- **标准流程**：
  ```bash
  # 创建构建目录（隔离源码和生成文件）
  mkdir build && cd build
  
  # 生成构建系统（如Makefile）
  cmake .. -DCMAKE_BUILD_TYPE=Release
  
  # 编译项目
  cmake --build . --parallel 4
  
  # 安装（可选）
  cmake --install .
  ```
- **常用参数**：
  - `-D<VAR>=<VALUE>`：定义变量（如`-DBOOST_ROOT=/opt/boost`）。
  - `-G "生成器"`：指定生成器（如`Ninja`, `Unix Makefiles`, `Visual Studio 17 2022`）。
  - `--target`：指定构建目标（如`clean`, `install`）。

---

### **3. 处理外部依赖**
- **FindPkgConfig**：使用`find_package`或`pkg-config`定位库：
  ```cmake
  find_package(Boost REQUIRED COMPONENTS filesystem)
  target_link_libraries(hello PRIVATE Boost::filesystem)
  ```
  若库不在默认路径，通过`-D`传递路径：
  ```bash
  cmake .. -DBOOST_ROOT=/custom/boost/path
  ```
- **手动指定路径**：
  ```cmake
  include_directories(/path/to/include)
  link_directories(/path/to/lib)
  ```

---

### **4. 调试与排错**
- **查看详细输出**：
  ```bash
  cmake -S . -B build --debug-output
  cmake --build build --verbose
  ```
- **检查CMakeCache.txt**：构建目录下的`CMakeCache.txt`包含所有缓存变量，用于确认路径、开关是否正确。
- **日志分析**：关注CMake的`Warning`或`Error`信息，常见问题如：
  - 头文件路径缺失 → 检查`include_directories()`或`find_package`。
  - 库未找到 → 检查`target_link_libraries()`和库路径。

---

### **5. 进阶实践**
- **多配置构建**：
  
  ```bash
  cmake .. -DCMAKE_BUILD_TYPE=Debug   # 调试构建
  cmake .. -DCMAKE_BUILD_TYPE=Release # 发布构建
  ```
- **交叉编译**：使用工具链文件（`-DCMAKE_TOOLCHAIN_FILE`）指定目标平台。
- **脚本化构建**：编写Shell脚本或Makefile封装常用命令，例如：
  
  ```bash
  # build.sh
  #!/bin/bash
  build_type=${1:-Release}
  cmake -S . -B build -DCMAKE_BUILD_TYPE=$build_type
  cmake --build build --config $build_type
  ```

---

### **6. 学习资源与工具**
- **书籍**：《Professional CMake: A Practical Guide》系统学习CMake最佳实践。
- **开源项目参考**：研究如[LLVM](https://github.com/llvm/llvm-project)、[OpenCV](https://github.com/opencv/opencv)的CMake配置。
- **工具链熟悉**：
  - **编译器**：`g++`/`clang`的常用参数（如`-I`, `-L`, `-l`）。
  - **构建工具**：`make`（`-jN`并行编译）、`ninja`（更快增量构建）。

---

### **7. 实战练习**
- **挑战1**：在Linux虚拟机中，手动安装依赖库（如Boost、OpenSSL），编写CMake项目并编译。
- **挑战2**：尝试为现有IDE项目（如CLion）编写纯命令行构建脚本，确保两者行为一致。
- **挑战3**：贡献开源项目，参与其CMake构建系统的维护。

---

### **总结**
通过理解CMake原理、掌握命令行工具链、逐步实践复杂场景，你可以摆脱对IDE的过度依赖。关键在于：
1. **从简单到复杂**：从最小项目开始，逐步添加功能。
2. **主动排错**：通过日志和文档解决问题，积累经验。
3. **模仿与创新**：参考成熟项目，再尝试独立设计构建系统。

最终，你将在命令行环境下游刃有余，同时也能更深入地理解构建过程，提升作为C++开发者的核心竞争力。

##### 问题

那么是不是现在程序员越来越依赖于现代化的IDE，而减少了对于一般构建流程的忽视呢？对于我而言，我在使用CLion的时候，对于项目的构建，只关注了如何编写CMakeLists.txt，而忽略了对cmake命令行命令的使用，因为这部分已经由我预先在CLion中的设置，以及CLion的自动识别而完成了

##### DeepSeek-V3

> 深度思考：好的，我现在需要分析用户的问题，并提供一个合适的回答。用户之前已经询问了关于如何从依赖IDE转向命令行构建的问题，现在他进一步探讨程序员是否越来越依赖现代IDE而忽视了构建流程，并提到自己在使用CLion时只关注编写CMakeLists.txt，而忽略了CMake命令行，因为CLion自动处理了这部分。
>
> 
>
> 首先，我需要确认用户的核心关切点：是否过度依赖IDE导致对底层构建流程的理解不足，以及如何弥补这种不足。用户承认自己只关注CMakeLists.txt，而CLion自动处理了命令行的部分，这可能导致他对实际构建过程不够熟悉。
>
> 
>
> 接下来，我需要考虑如何结构化回答。可能需要分几个部分：现状分析、用户的具体情况、解决方案和建议，以及总结。同时，需要保持回答的条理性和实用性，给出具体的步骤或方法，帮助用户逐步掌握命令行构建。
>
> 
>
> 我需要验证用户提到的现象是否普遍，即程序员是否普遍依赖IDE而忽视构建流程。这可能涉及到开发工具的发展趋势，IDE的自动化带来的便利性和潜在的知识盲点。同时，用户的情况可能是个例，但也是一个常见的学习路径问题，即工具的使用掩盖了底层细节，导致知识缺口。
>
> 
>
> 然后，针对用户的具体情况，他使用CLion，熟悉CMakeLists.txt的编写，但对命令行参数和实际构建步骤不熟悉。需要建议他从基础开始，逐步脱离IDE，手动执行CMake命令，理解每个步骤的作用，比如生成构建系统、编译、链接等。此外，可以推荐他通过实际项目练习，比如在Linux终端下创建项目，手动配置和构建，以加深理解。
>
> 
>
> 还需要提到如何利用现有资源，比如官方文档、教程、开源项目的构建脚本，以及如何调试和排查构建过程中的问题。强调实践的重要性，以及分阶段学习的方法，避免一开始就面对复杂项目而产生挫败感。
>
> 
>
> 另外，可能需要讨论IDE和命令行工具的结合使用，指出两者并非对立，而是互补。掌握命令行构建可以增强对IDE配置的理解，反之亦然。同时，可以提到一些工具，如CMake的--build命令，生成器（如Ninja），以及如何通过脚本自动化构建流程，从而提高效率。
>
> 
>
> 最后，总结时需肯定用户意识到问题的重要性，并鼓励他通过系统学习和实践来弥补知识缺口，提升作为开发者的核心竞争力。

你观察到的现象确实普遍存在，现代IDE的便利性让开发者更专注于核心代码逻辑，但也可能掩盖了底层构建系统的复杂性。这种依赖本身并非错误，但过度依赖可能导致对构建流程的理解停留在表层。以下是对这一现象的深度分析和应对建议：

---

### **一、现状分析：IDE的“双刃剑”效应**
1. **IDE的自动化优势**  
   - **抽象复杂性**：CLion、VS等IDE通过图形界面和智能配置，自动生成构建命令（如`cmake -B build -D...`），开发者只需关注`CMakeLists.txt`的核心逻辑。
   - **效率提升**：一键编译、调试、代码提示等功能显著减少重复劳动。
   - **跨平台一致性**：IDE自动适配不同平台的构建差异（如Windows的`MSBuild`与Linux的`Makefile`）。

2. **潜在的知识盲区**  
   - **黑盒化构建流程**：开发者可能不了解`CMake`命令参数、生成器（`-G`）、构建类型（`-DCMAKE_BUILD_TYPE`）等关键概念。
   - **依赖管理模糊**：当项目依赖第三方库时，IDE可能通过GUI配置路径，但开发者可能不熟悉如何通过命令行指定`-DBOOST_ROOT=/path`。
   - **调试能力弱化**：若构建失败，依赖IDE自动报错可能导致开发者不熟悉如何通过日志（如`CMakeOutput.log`）或`CMakeCache.txt`排查问题。

---

### **二、你的现状：CLion使用者的典型路径**
你在CLion中的体验是典型的“高层抽象工作流”：
1. **关注点集中**：只需编写`CMakeLists.txt`，IDE自动处理：
   - 生成构建目录（如`cmake -B build`）
   - 传递隐式参数（如编译器路径、依赖库搜索路径）
   - 调用底层构建工具（如`make`、`ninja`）
2. **隐藏的细节**：  
   ```bash
   # CLion背后可能执行的命令示例（用户不可见）
   cmake -B build -G "Ninja" -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_COMPILER=/usr/bin/clang++ ..
   cmake --build build --target MyApp
   ```
   - 你未直接接触`-G`（生成器）、`-DCMAKE_CXX_COMPILER`（编译器选择）等关键参数。

---

### **三、解决方案：从“IDE舒适区”到“命令行掌控力”**
#### **1. 阶段性学习：从“知其然”到“知其所以然”**
- **阶段1：观察IDE的行为**  
  - 在CLion中启用详细构建日志（Settings → Build, Execution, Deployment → CMake → 勾选`Verbose output`），观察实际执行的CMake命令。
  - 示例输出：
    ```
    /usr/bin/cmake -DCMAKE_BUILD_TYPE=Debug -G "CodeBlocks - Ninja" /path/to/project
    /usr/bin/cmake --build /path/to/build --target MyApp -- -j 8
    ```
  - **目的**：建立“CMakeLists.txt ↔ 实际命令行”的映射关系。

- **阶段2：手动复现IDE的构建流程**  
  - 在终端中手动执行CLion生成的命令，验证能否独立构建项目。
  - 示例：
    ```bash
    # 清理旧构建
    rm -rf build && mkdir build && cd build
    
    # 模拟CLion参数（从日志中提取）
    cmake .. -G "Ninja" -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_COMPILER=clang++
    
    # 编译
    cmake --build . --target MyApp
    ```
  - **目的**：理解IDE的“魔法”本质是预设的命令行参数。

- **阶段3：自主控制构建过程**  
  - **挑战1：手动指定依赖库**  
    假设项目依赖OpenCV，但在系统路径中未安装：
    ```bash
    cmake .. -DOpenCV_DIR=/opt/opencv/lib/cmake/opencv4
    ```
  - **挑战2：切换编译器和构建类型**  
    ```bash
    # 使用GCC并开启Release模式
    cmake .. -DCMAKE_CXX_COMPILER=g++ -DCMAKE_BUILD_TYPE=Release
    ```
  - **挑战3：生成不同构建系统**  
    ```bash
    # 生成Unix Makefiles代替Ninja
    cmake .. -G "Unix Makefiles"
    ```

#### **2. 深度实践：从单一项目到复杂场景**
- **项目1：跨平台库的构建**  
  编写一个依赖Boost的跨平台库，要求：
  - 在Linux中手动指定Boost路径：`-DBOOST_ROOT=/custom/boost`
  - 在Windows中通过`-G "Visual Studio 17 2022"`生成VS工程。

- **项目2：调试构建失败场景**  
  故意在`CMakeLists.txt`中制造错误（如错误库路径），练习通过日志分析问题：
  ```bash
  # 查看详细错误信息
  cmake --build . --verbose
  # 检查CMake缓存变量
  cat CMakeCache.txt | grep BOOST
  ```

- **项目3：集成外部工具链**  
  为嵌入式开发配置交叉编译（如ARM Cortex-M），使用工具链文件：
  ```bash
  cmake .. -DCMAKE_TOOLCHAIN_FILE=arm-gcc-toolchain.cmake
  ```

#### **3. 工具链辅助：平衡效率与掌控力**
- **脚本化构建（保留IDE效率）**  
  将手动命令行操作封装为脚本，例如`build.sh`：
  ```bash
  #!/bin/bash
  BUILD_TYPE=${1:-Debug}
  INSTALL_PREFIX=${2:-/usr/local}
  
  cmake -B build -G "Ninja" \
    -DCMAKE_BUILD_TYPE=$BUILD_TYPE \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX
  cmake --build build --target install
  ```
  - **优势**：既保留命令行灵活性，又通过脚本减少重复输入。

- **与IDE协同工作**  
  - 在CLion中自定义CMake配置（Settings → CMake → Profiles），显式指定参数（如`-DBOOST_ROOT`），而非依赖IDE自动推断。
  - 通过CLion的“Terminal”标签页直接操作命令行，逐步减少对GUI按钮的依赖。

---

### **四、认知升级：理解构建系统的本质**
1. **CMake的核心作用**  
   - 不是“构建工具”，而是**构建系统生成器**。它根据`CMakeLists.txt`生成底层构建系统（如Makefile、Ninja、VS Solution），再由`make`、`ninja`、`msbuild`等工具执行实际编译。

2. **构建流程的四个层次**  
   | 层级            | 内容                     | 示例工具                        |
   | --------------- | ------------------------ | ------------------------------- |
   | 1. 项目描述     | 定义目标、依赖、编译选项 | `CMakeLists.txt`, `meson.build` |
   | 2. 生成构建系统 | 转换描述文件为具体指令   | `cmake`, `meson`                |
   | 3. 执行构建     | 调用编译器、链接器       | `make`, `ninja`, `xcodebuild`   |
   | 4. 安装/打包    | 部署产物                 | `cmake --install`, `cpack`      |

   **关键点**：IDE通常隐藏了第2、3层，而命令行操作要求开发者显式控制每一层。

---

### **五、总结与建议**
1. **明确目标**：无需完全抛弃IDE，但需通过命令行补充以下能力：
   - **精准控制构建参数**
   - **调试复杂构建问题**
   - **适应无GUI环境（如服务器CI/CD）**

2. **渐进式路径**：
   ```mermaid
   graph LR
   A[IDE自动构建] --> B[观察IDE生成的命令]
   B --> C[手动执行这些命令]
   C --> D[修改参数并理解影响]
   D --> E[独立设计构建系统]
   ```

3. **终极收益**：
   - 对构建系统的**全链路掌控力**
   - 解决IDE无法处理的**边界情况**（如定制工具链、混合语言项目）
   - 提升在**运维、部署、持续集成**场景下的竞争力

**行动建议**：从今天起，选择一个现有CLion项目，关闭自动配置功能，尝试在终端中从头构建它。记录每一步遇到的问题，并关联到`CMake`文档中的相关章节。重复此过程直到你感受到“透明感”——即你能清晰地想象出从`CMakeLists.txt`到最终二进制文件的每一步如何被转化为机器指令。