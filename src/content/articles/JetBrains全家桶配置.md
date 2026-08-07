---
title: JB全家桶快捷键&操作
date: '2022-12-2 10:48'
tag: JetBrains
category: 
  - Skill
  - IDE
  - JetBrains
abbrlink: 1d504d03
---
#### 运行程序

⌃  + R

ctrl + R

#### 格式化代码

⌘ + ⌥  + L

win + alt + L　

#### 批量更改变量、函数名称

光标**移动到**变量、函数名称上

⇧  + F6

Shift + F6

#### CLion_vscode风格代码高亮插件

vscode dark原版风格

![截屏2023-03-03 18.45.45](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303031846341.png)

vscode dark plus 风格（个人认为黑色不如上面更纯粹，高亮也稍逊一点）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210272216897.png" alt="截屏2022-10-27 22.16.17" style="zoom:50%;" />



#### CLion_vscode风格代码样式(用于格式化样式)

Microsoft风格（vscode

舒服😌

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210272214080.png" alt="截屏2022-10-27 22.10.18" style="zoom:50%;" />

设置解引用符号*的位置

第一种舒服😌

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210301112448.png" alt="截屏2022-10-30 11.10.27" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210301112444.png" alt="截屏2022-10-30 11.10.50" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210301112437.png" alt="截屏2022-10-30 11.11.03" style="zoom:50%;" />

#### 设置背景

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210272217806.png" alt="截屏2022-10-27 22.16.48" style="zoom:50%;" />

#### 如果在CLion外部更改了项目中的文件的属性

**比如我在CLion外部将原本的main.c改名成为了GuessingGame.c**

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031163458930.png" alt="image-20221031163458930" style="zoom: 80%;" />

clion会报错

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031163348563.png" alt="image-20221031163348563" style="zoom: 80%;" />

发现CmakeLists.txt文件包含的文件是aaa main.c而不是aaa GuessingGame.c，说明并没有将GuessingGame.c包含在项目里

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031163553021.png" alt="image-20221031163553021" style="zoom:80%;" />

将第6行括号里的main.c改成GuesingGame.c即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031164432573.png" alt="image-20221031164432573" style="zoom:80%;" />

> 注意，如果不是替换掉main.c，而只是添加GuessingGame.c的话，CLion中其实main.c是不存在的，那么就找不到main.c，当然也会报错
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031165612625.png" alt="image-20221031165612535" style="zoom:80%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031165619957.png" alt="image-20221031165619808" style="zoom:80%;" />



然后会发现提示CMake项目需要重新加载，重新加载即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/QQ%E5%9B%BE%E7%89%8720221031164540.jpg" alt="QQ图片20221031164540" style="zoom:80%;" />



**同样，如果在CLion外部，将文件添加到项目中，在CLion中也会报错**

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031164230637.png" alt="image-20221031164230449" style="zoom:67%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031164247033.png" alt="image-20221031164247033" style="zoom:67%;" />

在CmakeLists.txt文件中添加上这几个文件就可以

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031165652840.png" alt="image-20221031165652840" style="zoom:80%;" />

> ==**注意在CmakeLists.txt中添加文件的写法格式，上图就是正确的格式**==



如果是在CLion内部新建头文件或者源文件，在添加的时候，勾选上添加到目标即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202211102142435.png" alt="截屏2022-11-10 21.40.22" style="zoom:50%;" />

忘记勾选也没事，在CmakeLists.txt文件中添加上就可以



#### 可以直接将没有配置环境的文件夹直接在CLion中打开

众所周知，CLion会对每一个项目配置环境，前提是这是CLion的项目

如果一个文件夹不是CLion的项目，我们在CLion中打开，CLion会提示是否配置环境

(CLion项目中的环境配置文件↓)

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202022-10-31%20170055.png" alt="屏幕截图 2022-10-31 170055" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/QQ%E5%9B%BE%E7%89%8720221031170119.jpg" alt="QQ图片20221031170119" style="zoom:80%;" />

如果一个不是CLion项目的文件夹（也就是说没有配置环境），在CLion中打开

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031170502825.png" alt="image-20221031170502825" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031170513665.png" alt="image-20221031170513665" style="zoom:80%;" />

会提示是否创建CMake项目

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20221031170644553.png" alt="image-20221031170644553" style="zoom:80%;" />

选择“创建”即可

这样CLion就会在文件夹中生成环境文件了，文件夹就变成了一个CLion项目



#### Windows下CLion运行结果中文输出是乱码

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241018113104441.png" alt="image-20241018113104441" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241018113315192.png" alt="image-20241018113315192" />

去掉勾选即可

#### 彩虹括号 插件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202211120940116.png" alt="截屏2022-11-12 09.40.19" style="zoom:50%;" />

会让编译器代码高亮变慢，所以已经卸载……（而且现在还要钱了。。。2025.1.16）

#### 加载进度条美化插件

马里奥和彩虹猫等

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250116094125401.png" alt="image-20250116094125401" style="zoom:80%;" />

#### PyCharm的解释器

**使用系统本地解释器：**

源文件直接可以跨平台，再使用本地系统的解释器进行解释即可，不需要在项目里添加解释器文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202304021047890.png" alt="截屏2023-04-02 10.47.19" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202304021049462.png" alt="截屏2023-04-02 10.47.27" style="zoom:50%;" />

只需要检查一下当前解释器是不是系统本地的即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202304021612683.png" alt="截屏2023-04-02 16.11.05" style="zoom:50%;" />

**使用虚拟解释器：**

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202304021616897.png" alt="截屏2023-04-02 16.16.16" style="zoom:50%;" />

**两者的区别：**

虚拟环境是根据项目来的，不同的项目之间的环境是独立的，这样在引入库的时候，各个项目之间是独立的，不会相互影响，不会将库引入到系统本地中，而是在项目里，避免了互相影响和冗杂。但是项目大小会比使用本地环境的项目大一些。
