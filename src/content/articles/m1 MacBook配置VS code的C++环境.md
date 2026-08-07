---
title: VsCode_C++环境搭建(Mac m1芯片版本)
date: '2022-12-13 10:11'
tag: VsCode
category: 
  - Skill
  - IDE
abbrlink: 1580f89a
---
[文章转载自百叶的自留地(2021年8月)，非商业用途，侵删](https://www.cnblogs.com/BYGAO/p/15135609.html)

文末放了我的三个json文件配置，可以参考。

## 1.下载VS code

VS code已针对m1 芯片进行了适配，去官网下载VS code Apple Silicon版并安装。

## 2.确保clang已安装

在终端里输入`clang --version`查看是否已安装，若未安装，输入`xcode-select --install`读完条款输入agree安装即可。

## 3.下载扩展

一共有三个扩展需要下载。
1.C/C++
2.C++ Intellisense
3.CodeLLDB
4.Chinese(中文插件，可选)

## 4.新建cpp文件

这里直接采用[微软官方文档](https://code.visualstudio.com/docs/cpp/config-clang-mac)里的代码。

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
    vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

    for (const string& word : msg)
    {
        cout << word << " ";
    }
    cout << endl;
}
```

这个时候，在文件第10行输入`msg.`应该是能看到VS code跳出`assign`之类的提示的。

## 5.配置文件

### 1.配置tasks.json文件

首先点击`终端`---`配置默认生成任务`---`C/C++ clang++`，会生成一个tasks.json文件，这是默认生成的，需要修改其中的`args`选项,添加一个`"-std=c++17"`，修改后为

```bash
			"args": [
				"-g",
				"${file}",
				"-std=c++17",
				"-o",
				"${fileDirname}/${fileBasenameNoExtension}"
			],
```

配置完后，会发现VS code提示语法错误，不要急，接下来就修正它。

### 2.配置c_cpp_properties.json文件

使用组合键`shift+command+p`（mac下shift就是`fn`键上面那个啦），调出`C/C++:编辑配置（json）`，会自动生成一个`c_cpp_properties.json`文件。

将`"compilerPath": "/usr/bin/clang",`修改为`"compilerPath": "/usr/bin/clang++",`
将`""cppStandard": "c++98",`修改为`"cppStandard": "c++17",`

其实只是将编译器修改为clang++，cpp标准修改为C++ 17.

### 3.编译生成文件

这么配置完后，其实VS code还是会报两个语法错误，不过这不要紧，这是因为还没更新的缘故。
点击`终端`---`运行生成任务`，运行完后会生成一个二进制文件，语法报错也没了，表示我们编译成功了。
如果想测试的话，新建一个终端，使用`./你的二进制文件名`，即可看到输出结果。

### 4.配置launch.json文件

点击`运行`---`添加配置`---`C++(GDB/LLDB)`---`clang++`，会生成一个`launch.json`文件。
将`"type": "cppdbg",`修改为`"type": "lldb",`
至此，所有文件就配置完了。

### 5.调试

在文件的第10行放一个断点，点击`运行`---`启动调试`，就可以看到各种变量了。

## 我的文件配置

以下是我的三个json文件配置代码。
`tasks.json`:

```bash
{
	"version": "2.0.0",
	"tasks": [
		{
			"type": "cppbuild",
			"label": "C/C++: clang++ 生成活动文件",
			"command": "/usr/bin/clang++",
			"args": [
				"-g",
				"${file}",
				"-std=c++17",
				"-o",
				"${fileDirname}/${fileBasenameNoExtension}"
			],
			"options": {
				"cwd": "${fileDirname}"
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": {
				"kind": "build",
				"isDefault": true
			},
			"detail": "编译器: /usr/bin/clang++"
		}
	]
}
```

`c_cpp_properties.json`:

```bash
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "compilerPath": "/usr/bin/clang++",
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "macos-clang-arm64"
        }
    ],
    "version": 4
}
```

`launch.json`:

```kotlin
{
    // 使用 IntelliSense 了解相关属性。 
    // 悬停以查看现有属性的描述。
    // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "clang++ - 生成和调试活动文件",
            "type": "lldb",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb",
            "preLaunchTask": "C/C++: clang++ 生成活动文件"
        }
    ]
}
```

