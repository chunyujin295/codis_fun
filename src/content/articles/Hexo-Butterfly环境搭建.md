---
title: Hexo-Butterfly环境搭建
date: '2024-10-10 18:17'
tag: Hexo
category:
  - Skill
  - Hexo
sticky: 999
cover: https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202310102034111.gif
abbrlink: db7f9dc7
---

# 前言

1. 本教程只是环境搭建，并不涉及网站部署等，只涉及到电脑本地环境的创建。因为博主此前已经构建过一个基于Hexo-Butterfly主题的博客了，现在需求为在不同电脑搭建出网站部署环境，将网站源码上传到git上，实现在不同电脑上都可以更新网站的需求。

2. 本教程基于Windows操作系统，macOS、Linux系统操作上都是大同小异，搭建方式基本都是从官网或终端进行软件的下载和安装。与Windows不同的是，macOS和Linux对于环境变量等的管理比较简单，所以比Windows操作系统下搭建环境更加简单一些。



# 终端工具的选择

Windows：有两个终端工具

- Windows Terminal PowerShell(简称PowerShell)。微软在win10后期新推出的终端工具。支持Windows命令，部分.ned和Linux shell命令。
- ”命令行提示符“cmd。比较古早的终端，只支持Windows命令。

建议选择Windows powershell。因为后期可能会涉及到需要管理员权限的操作，届时直接使用管理员模式打开powershell即可。

> 这里其实也可以使用cmd，快捷打开管理员模式的方法：
>
> 1. win+r打开“运行”
> 2. 输入cmd，不要点击回车
> 3. Ctrl+Shift+Enter打开cmd
>
> Windows  

macOS、Linux：直接使用自带终端。可以随时进入root模式，很方便。

后期安装好之后，都会改为直接使用vscode中的终端。



## 环境准备

- Node。Node.js 是一个开源的、跨平台的 JavaScript 运行时环境。[Node.js 中文网 (nodejs.cn)](https://nodejs.cn/)

- nvm。(Node Version Manager)是 Nodejs 版本管理器，它能让我们方便的对 Node.js 的版本进行切换。
- npm。(Node Package Manager)，Node.js 的包管理器，安装 Node.js 之后自带 npm，无需单独安装
- Hexo。一个由Node.js驱动的博客简单强大的博客框架。[Hexo](https://hexo.io/zh-cn/)
- vscode。

教程推荐：

- [Node.js介绍和环境配置（含NVM、NPM、NVM的安装） - 千古壹号 - 博客园 (cnblogs.com)](https://www.cnblogs.com/qianguyihao/p/8492713.html)
- [node.js - 安装npm，nvm，node - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000011114680)

### nvm安装

[Windows版安装地址 · Releases · coreybutler/nvm-windows (github.com)](https://github.com/coreybutler/nvm-windows/releases))

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010151855178.png" alt="image-20241010151855178" />

下载之后解压到本地软件安装目录中

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010151944766.png" alt="image-20241010151944766" />

双击运行，开始安装

安装之后，会被自动添加到环境变量中。

在终端中测试安装是否成功：

![image-20241010152154711](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010152154711.png)

配置环境变量：

> 正常来说，nvm安装之后会自动配置好环境变量：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010161247200.png" alt="image-20241010161247200" style="zoom:80%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010161331585.png" alt="image-20241010161331585" style="zoom:80%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010161411700.png" alt="image-20241010161411700" style="zoom:80%;" />



### Node、npm安装

[Node.js 中文网 (nodejs.com.cn)](https://www.nodejs.com.cn/download.html)

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241022150735487.png" alt="image-20241022150735487" style="zoom:67%;" />

下载.msi安装包，然后进行安装，设置安装目录，在安装中，会自动将node添加到环境变量，node安装完成，npm也安装完成了。

<mark>需要注意的是，当前阶段，如果想使用node或者npm执行一些命令，可能需要在管理员模式下启用终端(因为有些用户可能不从属于管理员组)，否则会error。等后面完成了一些配置，就可以在普通用户下使用node和npm了。</mark>

测试node和npm安装成功：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010162147431.png" alt="image-20241010162147431" style="zoom:80%;" />



### Hexo安装

需要将hexo使用npm安装到指定目录，因此先进入指定路径

#### 通过管理员模式进入指定目录的方法

>  方法有很多，无非就是先用管理员模式打开终端，然后cd进入要安装的目录
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010162818276.png" alt="image-20241010162818276"  />
>
> ![image-20241010162847131](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010162847131.png)
>
> 注意如果路径有空格，需要用`""`将路径包裹起来

安装Hexo环境：

```shell
npm install -g hexo-cli
```

#### 更换npm源或安装cnpm

> 如果下载时卡住：
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010163300272.png" alt="image-20241010163300272" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010163719938.png" alt="image-20241010163719938" />
>
> 原因：npm源在国外
>
> **解决方案一：可以换为国内淘宝镜像源：**
>
> [npm 使用淘宝镜像及切换回官方源_npm 淘宝源-CSDN博客](https://blog.csdn.net/XueZePeng18729875380/article/details/129519153)
>
> 注意淘宝镜像源可能会有更新，网址会发生改变，请自己百度最新的镜像源
>
> ```shell
> npm config set registry https://registry.npmmirror.com/
> ```
>
> 更换之后进行测试：
>
> ```shell
> npm config get registry
> ```
>
> 返回结果为` https://registry.npm.taobao.org `则说明配置成功：
>
> ```shell
> PS D:\software\Hexo> npm config set registry https://registry.npmmirror.com/
> PS D:\software\Hexo> npm config get registry
> https://registry.npmmirror.com/
> ```
>
> 
>
> **解决方案二：安装 cnpm 来替代 npm，cnpm是淘宝团队创建的为国内用户使用的npm替代品：**
>
> ```shell
> npm install -g cnpm --registry=https://registry.npmmirror.com
>  
>  # 注册模块镜像
>  npm set registry https://registry.npmmirror.com  
>  
>  // node-gyp 编译依赖的 node 源码镜像  
>  npm set disturl https://npmmirror.com/dist 
>  
>  // 清空缓存  
>  npm cache clean --force  
>  
>  // 安装cnpm  
>  npm install -g cnpm --registry=https://registry.npmmirror.com 
> ```
>
> 安装完后最好查看其版本号cnpm -v或关闭命令提示符重新打开，安装完直接使用可能会出现错误
>
> cnpm跟npm用法完全一致，只是在执行命令时将npm改为cnpm
>
>  
>
> **npm 切换回官方源：**
>
> ```                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  shell
> npm config delete registry
> ```
>
> 或者直接修改为原本的源
>
> ```shell
> npm config set registry https://registry.npmjs.org/
> ```



书接上回，安装Hexo：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010171928006.png" alt="image-20241010171928006" />



<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010171939117.png" alt="image-20241010171939117" style="zoom:80%;" />

#### 解决PowerShell下使用hexo时报错"在此系统上禁止运行脚本"的问题

安装之后可能又会发现新的问题：vscode中使用powershell或者直接在Windows terminal的powershell下使用`hexo -v`检查hexo安装，发现无法识别命令。而cmd执行则可以：

> **powershell不行**
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120114634662.png" alt="image-20241120114634662"  />
>
> **cmd可以**
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010172513371.png" alt="image-20241010172513371" style="zoom:80%;" />



> 因为hexo本身就是基于Node.js的博客框架，是一个脚本，所以在此会出现”不能运行脚本“的错误
>
> 关于Windows更改脚本可执行权限，请移步[【解决PowerShell报错“进制在此系统上运行脚本”的问题】](https://chunyujin.top/chunyujin/d6a22065)，下面提供的为此问题的解决方案



在powershell中运行命令行查看系统权限：`Get-ExecutionPolicy -List`

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010172720088.png" alt="image-20241010172720088" style="zoom:80%;" />

通过这个命令发现CurrentUser的权限是Undefined，那么就是权限的问题，就可以通过增加权限解决了：



##### 增加PowerShell中CurrentUser权限以解决上述问题：

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

之后执行`Get-ExecutionPolicy -List`再次查看权限：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010172937214.png" alt="image-20241010172937214" style="zoom:80%;" />

之后使用`hexo -v`检查一下安装：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010173004341.png" alt="image-20241010173004341" style="zoom:67%;" />

安装完成

## 拉取仓库-最后配置

创建一个新的空文件夹用来存放博客项目，`git init`一下，将网站工程从git远端仓库上下拉回来

![image-20241010173558750](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010173558750.png)

因为博客是使用的GitHub运行的，因此还需要执行最后一步：

将本地ssh公钥添加到GitHub中

获取公钥：[Git！从零开始连接远程仓库 | Towel (chunyujin.top)](https://chunyujin.top/chunyujin/b51810cf)

> 如果本地没有产生过公钥，执行，下面命令，以前生成过，直接跳过这一步即可：
>
> ```shell
> ssh-keygen -t rsa
> ```
>
> 然后一路回车。
>
> 获取本地公钥：
>
> ```shell
> cat ~/.ssh/id_rsa.pub
> ```

打开GitHub，登录进去，点击右上角头像，进入设置：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010174412262.png" alt="image-20241010174412262" />

点击右上角New SSH Key

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010174523081.png" alt="image-20241010174523081" />

创建一个标题，并将ssh key复制进下面：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010174624863.png" alt="image-20241010174624863" />

点击Add SSH key，然后输入GitHub密码进行确定

然后可以看到新添加上的了：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010174731187.png" alt="image-20241010174731187" />

如果绑定邮箱了，还会收到邮箱提示。

测试一下是否成功：

```shell
ssh -T git@github.com
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010174933309.png" alt="image-20241010174933309" />

现在就可以在vscode中打开项目根目录了

### 关于初始化

博客项目只有在创建的时候进行一下初始化就可以，因为我这个博客很久之前就创建好了，并且初始化文件都会保存在一起放入了根目录，所以不需要再初始化，直接就可以使用了

```
【node_modules】：依赖包
【scaffolds】：生成文章的一些模板
【source】：用来存放你的文章
【themes】：主题
【.npmignore】：发布时忽略的文件（可忽略）
【_config.landscape.yml】：主题的配置文件
【_config.yml】：博客的配置文件
【package.json】：项目名称、描述、版本、运行和开发等信息
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010175206195.png" alt="image-20241010175206195" />

直接vscode打开，就可以进行提交三板斧等操作了

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010175404122.png" alt="image-20241010175404122" />

之后就可以发布项目到GitHub上进行运行了

### 如果项目文件夹下报错“ERROR Cannot find module 'hexo' from ”

![image-20241010175951865](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010175951865.png)

根据最后一行的信息，说明没有安装相关的moudle，安装上即可：
```shell
npm install --force
```

> 侧面反映了shell中解毒草药就在五步之内

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010180311742.png" alt="image-20241010180311742" />

执行一条hexo命令试试：

![image-20241010180425268](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010180425268.png)

完美！



最后还有一点：

### 配置gulp压缩静态资源

[Hexo-gulp压缩静态资源加快加载速度 | Towel (chunyujin.top)](https://chunyujin.top/chunyujin/9dba5c90)

## 切记每次修改前git pull，修改完之后git push一下，保持同步，防止出错



WebStorm配置

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110182133008.png" alt="image-20260110182133008" />