---
title: NotePad++配置
date: '2022-12-15 22:00'
tag: NotePad++
category: 
  - Skill
  - IDE
abbrlink: 55caa4ef
---
#### 准备工作

安装MinGW并添加到环境变量：

[点此查看步骤(建议右键选择在新窗口中打开)](http://chunyujin.top/chunyujin/1ee5d0ce.html)

创建一个cpp文件并写一段测试代码

![image-20221215200029209](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215200029209.png)

点击顶部菜单栏的“运行”或者直接按F5

![image-20221215200205821](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221215200205821.png)

输入一下宏定义命令

```shell
cmd /k pushd "$(CURRENT_DIRECTORY)" && g++ -o "$(NAME_PART).exe" "$(FULL_CURRENT_PATH)" && "$(NAME_PART)".exe & PAUSE & EXIT
```

点击运行即可

建议选择“保存”按键，将宏定义保存到快捷键，比如`ctrl + alt + n`(跟vscode的coderunner插件一样的快捷键)，下次运行直接快捷键即可

> `cmd /k`：**打开** cmd 控制台，运行完程序让其停留而不自动关闭。
>
> `pushd "$(CURRENT_DIRECTORY)"`：**将工作路径更换到源文件所在的路径**，例如'pushd E:\kkk'相当于 cmd 中先`e:`再`cd kkk`，这条命令在源代码要调用同目录文件而只写了相对路径时尤为重要。因为 Notepad++ 的默认工作路径是它自己的安装路径。
>
> `g++ -o "$(NAME_PART).exe" "$(FULL_CURRENT_PATH)"`：调用环境变量中的编译器 g++.exe 来将源代码**编译**成同名 exe 文件并输出到相同路径。
>
> `"$(NAME_PART)".exe`：**运行**源代码编译出的可执行文件。
>
> `PAUSE`：暂停，提示**“按任意键继续”**，配合下一条命令实现“按任意键关闭”的效果，两者都没有的话程序运行完就会秒关。
>
> `EXIT`：**关闭** cmd 控制台，没有的话按任意键会退到 cmd 命令台，等待输入下一条命令。
>
> - $(CURRENT_DIRECTORY)代表文件所在目录的路径。
>
> - $(NAME_PART)表示该文件无后缀部分的文件名。
>
> - $(FULL_CURRENT_PATH)代表当前完整的文件路径。
>
> - 双引号（半角）：用于防止目录或文件名中含空格的情况。
>
> - “&&”和“&”：前者表示上一条命令正常执行完再执行下一条命令，非正常则不执行下一条；后者无顾虑。例如一分为六后的后两条子命令，表示不管源代码编译、运行是否成功，都会出现“按任意键继续”字样，并且按任意键后关闭 cmd 控制台。