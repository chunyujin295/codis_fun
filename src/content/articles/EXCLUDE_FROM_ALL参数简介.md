---
title: EXCLUDE_FROM_ALL参数简介
date: '2024-12-17 11:23'
tag:
  - CMake
category:
  - Skill
  - CMake
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241217111020446.png
abbrlink: 8b45d222
---

在CMake中，`EXCLUDE_FROM_ALL` 是一个选项，可以用于 `add_custom_target`、`add_custom_command`、`add_library`、`add_executable` 等命令。当设置为 `TRUE` 时，它指示CMake生成的构建系统不要将该目标包含在默认的构建目标中。

具体来说，`EXCLUDE_FROM_ALL` 的作用包括：

1. **默认不构建**：当执行构建命令（如 `make` 或 `cmake --build`）时，被标记为 `EXCLUDE_FROM_ALL` 的目标不会被自动构建。这意味着它们不会包含在 "all" 目标中。
2. **显式构建**：尽管这些目标不会在默认构建中生成，但用户仍然可以通过显式指定目标名称来构建它们。例如，如果有一个被 `EXCLUDE_FROM_ALL` 标记的可执行文件 `my_executable`，用户可以通过 `make my_executable` 来单独构建它。
3. **依赖管理**：如果其他目标依赖于被 `EXCLUDE_FROM_ALL` 标记的目标，这些依赖目标仍然会被构建。`EXCLUDE_FROM_ALL` 只影响默认构建目标的包含性，不影响依赖关系。

使用 `EXCLUDE_FROM_ALL` 的一个常见场景是创建可选的构建目标，这些目标只有在用户明确需要时才会构建。这可以用于生成文档、运行测试、构建示例代码等。

例如，在 `add_library` 命令中使用 `EXCLUDE_FROM_ALL`：

cmake

```cmake
 add_library(my_library EXCLUDE_FROM_ALL source_file1.cpp source_file2.cpp)
```

这行代码会创建一个库 `my_library`，但它不会包含在默认的构建目标中。用户需要显式构建这个库。