---
title: CLion-Linux远程开发
date: '2024-10-23 16:38'
tag: JetBrains
category:
  - Skill
  - IDE
  - JetBrains
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241024090337288.png
abbrlink: e6f97f8c
---

## 前言

CLion利用远程Linux开发有两种方式：

1. 远程连接Linux，利用CLion远程窗口直接操纵Linux。
2. 将CLion本地项目部署并映射到Linux目录下，基于本地CLion进行开发，构建时选择使用本地或远程Linux环境。

本教程使用的是方法2，原因如下：

1. 方法1需要远程Linux机器下载CLion引用，并占用较大的资源，对于小型Linux服务器支持不太好；方法2无需远程机器安装CLion。
2. 方法1一套代码，只能在Linux上运行，因为本质就是ssh连接到远程Linux服务器，只是界面借用了CLion；方法2可以实现同一套代码，通过切换编译环境，在不同环境下构建和运行，并支持同时部署到多个环境/机器下，在测试时比较方便。
3. 方法2可以及时进行本地与远程项目上传、下载、差看版本修改以进行同步等。



## 前置准备

- Linux环境下安装cmake、g++。
- Linux环境下安装好openssh，并开启远程服务，以Ubuntu为例：
  - 在终端中输入: sudo apt-get install openssh-server 安装[openssh](https://zhida.zhihu.com/search?content_id=556037211&content_type=Answer&match_order=2&q=openssh&zhida_source=entity)。
  - 在终端输入sudo ps -e|grep ssh 回车，有sshd 阐明ssh服务现已发动；如果未发动，输入sudo service ssh start 回车ssh服务。
- Windows环境(Mac环境同样适用)下安装好CLion、一款支持远程ssh的轻量化软件(如vscode、xshell、finalshell等)。



## 连接

基本思路

> 以单个项目为基本单位，将Windows本地项目部署到Linux服务器，并在其环境下进行构建、运行，并利用Clion功能进行代码版本同步。

### Windows本地创建项目

创建或打开任意想要部署在Linux上的项目

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023135251610.png" alt="image-20241023135251610" />

### 工具链中添加远程主机

点击左上角四条横杠，选择“文件”——“设置”——“构建、执行、部署”——“工具链”

点击工具链界面中左上角加号，添加远程主机，在“凭据”一栏点击设置，添加ssh配置，按照Linux服务器主机、用户名、密码等进行填写。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/tset.png" alt="tset" />

添加远程主机后回到工具链界面，发现远程Linux主机下cmake版本等已经被自动识别

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023140432230.png" alt="image-20241023140432230" style="zoom: 67%;" />

点击“应用”保存即可。

### 部署中设置路径映射

点击设置栏中的”部署“，发现之前添加的主机已经存在了

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023141905311.png" alt="image-20241023141905311" style="zoom:80%;" />

在这个页面中，”根路径“就是映射远程主机的起始路径，可以是"/"，也可以是用户的"/home/用户"路径等，此处的根目录更改，后面”映射“的相对路径也要更改。

点击页面上的”映射“，”本地路径“就是项目位于本地的位置，”部署目录“就是需要我们填写的映射到Linux远程的路径。因为前面”根目录“我设置的是"/"，因此这里填写想要放置的位置的绝对路径即可。

Web路径可以不写。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023142157741.png" alt="image-20241023142157741" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023142343427.png" alt="image-20241023142343427" style="zoom:80%;" />

> 需要注意的是：
>
> 路径应该是项目文件夹到项目文件夹的，建议在映射的时候，在远端新建一个用来存放映射项目的单独文件夹，防止映射到上层文件夹，破坏目录结构。
>
> 另外，CLion没有创建Linux远端新目录的权限，因此需要用户手动创建新目录。

完成后点击应用。

#### 如果发现Linux远程映射目录中没有对象的项目

Linux设置好映射路径之后，由于本地Clion中存在一些缓存，路径可能还是映射到自动设置的路径(一般是"\tmp\xxx"路径下)，可以查看一下CLion中cmake的结果，或者在Linux本地检查一下"\tmp\xxx"路径下是否有对应项目。

解决方法：重启CLion或者点击“使缓存失效”来清除缓存

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241029092333199.png" alt="image-20241029092333199" style="zoom:80%;" />

--------

> 到这一步，已经完成了本地与远程的映射，后续设置debug配置等之后，执行构建时会自动进行上传。
>
> 现阶段可以使用如下方法进行测试：
>
> 1.CLion窗口最下方，点击"<无默认服务器>"，选择部署好的远程主机（此步骤不影响部署，只是设定一个默认选项，减少后续设置）
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023143023020.png" alt="image-20241023143023020" style="zoom:80%;" />
>
> 2.右击项目文件夹，或选择菜单栏的工具，找到”部署“
>
> 可以看到关于”上传到远程主机“、”从远程主机下载“等操作，点击”上传到远程主机“
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023143426328.png" alt="image-20241023143426328" style="zoom:80%;" />
>
> 确认上传后等待执行完毕
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023143655915.png" alt="image-20241023143655915" style="zoom:80%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023143648276.png" alt="image-20241023143648276" style="zoom:80%;" />
>
> 可以看到远端对应路径下确实被部署了项目
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023143801196.png" alt="image-20241023143801196" style="zoom:80%;" />
>
> (如果没有在第1步中设置默认服务器，会是下面这个样子，但是点击上传之后，会弹出服务器选项，效果一样的)
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144011243.png" alt="image-20241023144011243" style="zoom:80%;" />



### 配置本地调用远程环境构建

点击CLion窗口右上角”Debug“，选择”编辑CMake配置文件“，在打开的设置界面中选择加号，创建新的配置文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144304626.png" alt="image-20241023144304626" style="zoom:80%;" />

更改名称、构建类型、工具链、生成器等，工具链选择远程Linux下的构建工具

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144425935.png" alt="image-20241023144425935" style="zoom:80%;" />

完成后选择确定，等待cmake项目加载

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144503759.png" alt="image-20241023144503759" style="zoom:80%;" />

> 期间可能会报错，因为远端cmake版本低于CMakeList.txt最低版本要求，更改一下CMakeList.txt中最低版本限制即可。
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144614089.png" alt="image-20241023144614089" style="zoom:80%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144628325.png" alt="image-20241023144628325" style="zoom:80%;" />
>
> 右击CMakeList.txt选择”重新加载CMake项目“，或者点击窗口左下角”重新加载CMake项目“的图标，等待CMake加载完成。
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144733359.png" alt="image-20241023144733359" style="zoom:80%;" />

更改完成后，发现右上角CMake配置中多了一个选项，这个就是调用的远程Linux环境下的CMake，至此设置完成。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023144932723.png" alt="image-20241023144932723" style="zoom:80%;" />



### CLion下生成构建系统、构建、执行过程

Linux下，生成构建、构建、执行都是需要一系列命令行进行操作的，CLion远程连接Linux之后，将命令行操作转化为了图形化界面的操作，用点击代替了命令行。

#### 生成构建系统：

CMakeList.txt为构建管理文件，通过该文件配合cmake命令行工具，可以生成不同平台下的构建系统。如通过CMakeList.txt，CMake可以生成Linux下的构建系统-makefile，Windows下也会生成对应的一个构建系统。

在CLion中，想要执行一个程序，需要先使用CMakeList.txt执行CMake项目的加载，生成不同平台下的构建系统：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023151229746.png" alt="image-20241023151229746" style="zoom:80%;" />

执行CMake构建之后，远程Linux环境下映射目录中也同步到了构建系统：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023154614984.png" alt="image-20241023154614984" style="zoom:80%;" />

CLion中对于cmake执行之后生成的build目录命名是依据：`cmake-build-配置文件名`，配置文件名即为之前设置的：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023151420854.png" alt="image-20241023151420854" style="zoom:80%;" />

在上面构建目录中，可以发现，两个环境下的构建目录中都没有可执行程序，因为cmake的作用<mark>只是生成不同环境下的构建系统</mark>，而构建系统因平台而异，可执行程序是如何利用构建系统构建出来的，不归cmake管了，这也是为什么cmake跨平台：只负责到生成构建系统，不负责具体的构建。

具体的构建过程，是由不同平台下执行自己的构建工具，如Linux下使用make命令，执行makefile文件中的自动化构建过程，而makefile类似于一种脚本，集合了gcc、g++、rm等命令，进行包括编译、链接、打包等的构建。

##### 如果构建后，发现远端Linux构建失败

并且排除了非CMake版本等问题，可以查看一下是否是因为映射路径无法查找到，解决方法见上面“如果发现Linux远程映射目录中没有对象的项目”。

#### 构建：

选择一个配置文件，点击右侧小锤子，执行“构建”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023154635927.png" alt="image-20241023154635927" style="zoom:80%;" />

发现产生了可执行程序(选择的本地构建，生成的Windows下的.exe)

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023154936490.png" alt="image-20241023154936490" style="zoom:80%;" />

执行远程的配置文件的构建：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023155210618.png" alt="image-20241023155210618" style="zoom:80%;" />

发现本地CLion项目下没有可执行程序，远程Linux项目下存在可执行程序。

猜想：

> 因为本地Windows并不具备Linux编译运行环境，因此在本地执行的操作，仅仅是<mark>使用CMake生成构建系统，并上传部署到远端Linux映射目录中，本地用户执行”构建“操作时，CLion命令远端Linux，在远程Linux下进行构建，生成可执行程序。后续可执行程序的执行，也是在远程Linux下执行可执行程序(毕竟本地Windows不具备运行环境)，然后将执行结果返回并打印到本地Windows下CLion终端。</mark>



> 如果没有生成构建系统，直接执行构建，则会因为没有构建系统目录而报错：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023155938447.png" alt="image-20241023155938447" style="zoom:80%;" />



#### 执行：

CLion下执行包括了构建。所以可以直接跳过构建这一步，直接执行。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023154635927.png" alt="image-20241023154635927" style="zoom:80%;" />

配置文件中选择”Debug“，执行本地的exe可执行程序；选择”remote-debug“等远程环境的配置文件，执行远程Linux下的可执行程序。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023160144043.png" alt="image-20241023160144043" style="zoom:80%;" />

> 本地执行结果：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023160445835.png" alt="image-20241023160445835" style="zoom:80%;" />
>
> 远端执行结果：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023160558425.png" alt="image-20241023160558425" style="zoom:80%;" />
>
> 从蓝色字体可以看出，一个执行的本地exe，一个执行的远端.out可执行程序，证实了前面的猜想。



## 其余功能介绍

### 部署中上传下载设置屏蔽文件

在设置--部署--”排除的路径“，可以查看当前上传下载中被排除的路径，CLion会自动设置排除掉构建系统目录：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023160908483.png" alt="image-20241023160908483" style="zoom:80%;" />

可以新增一个屏蔽，将部署路径(远端Linux)下的`.clion.source.upload.marker`文件排除掉，该文件是Clion添加到部署路径中，关于文件上传下载标记的，没有必要下载回本地项目中。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023161101328.png" alt="image-20241023161101328" style="zoom:80%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023161223807.png" alt="image-20241023161223807" style="zoom:80%;" />

### 部署中进行版本同步

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023161303444.png" alt="image-20241023161303444" style="zoom:80%;" />

在项目修改前后，可以通过这个进行版本同步，查看本地与远端代码的版本差异，从而选择将本地上传到远程，还是远程下载到本地。

![image-20241023161959762](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241023161959762.png)

通常，CLion本地修改，保存之后，会自动进行上传，因此下载、版本同步功能，多用于远程手动修改代码之后，同步到本地。