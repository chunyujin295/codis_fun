---
title: Git！从零开始连接远程仓库
date: '2023-1-14 11:29'
tag: Git
category: 
  - Skill
  - Git
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202303071152813.jpg'
sticky: 999
abbrlink: b51810cf
---

## Git！从零开始用连接远程仓库！！[全平台]

[toc]

### 前言

> 无论你正在使用的是macOS、Linux还是Windows，总是可以使用Git这个无人争锋的 <u>版本控制系统</u>软件 进行本地仓库的构建以及将本地仓库和远程仓库(GItHub、GItee等)链接
>
> 因为原理都是一样的！

<mark style="background-color:pink">所以实际操作都用高亮（就像是这段文字）标识出来并设为标题，方便快速操作</mark>



<mark style="background-color:yellow">没有标明是在macOS、Linux还是Windows系统，说明操作基本是一样的</mark>

因为在下是苦bee大学僧，经常去教室上课，mac又是放在宿舍里的，所以有些非单一场景独占的掩饰有时是mac终端，有时是Windows Git Bash，这两者除了外观不一样，基本操作都是一样的～～

### 准备工作

> macOS和Linux的用户电脑如今一般都自带Git～
>
> Windows用户到官网中进行安装Git即可～
>
> <mark style="background-color:yellow">macOS、Linux的终端，与Windows的Git Bash窗口，操作命令完全是一致的！因为macOS的终端包含Git，而Windows的Git就是Git呀~</mark>

连接远程仓库有两种方式，一种是通过HTTPS与远程仓库进行连接，一种是SSH与远程仓库进行连接

HTTPS连接时每次都要输入Gitee的用户名和密码，这里用SSH进行连接，将本地Git与远程Gitee关联，进而进行本地仓库与远程仓库的连接

### SSH连接远程仓库

下面让在下来展示从建立仓库到连接远程仓库的过程～～

### <mark style="background-color:pink">🌱步骤一➡️配置你的Git个人用户信息（全局）</mark>

> git作为一个软件，而且是作为一个版本控制的软件，每每都会涉及到文件的更改，我们对于文件的每一次更改都保存在了Git里面，所以，知道 更改文件的人是谁 是肥肠重要滴～
>
> 在git里，你需要先配置好自己的用户名和邮箱，这样你才是一个值得被信任的用户～到时候连接人家的远程仓库，人家才敢跟你连接(如果有的话～)

Git 提供了一个叫做 `git config` 的命令，是专门用来 配置 和 读取 相应的工作环境变量的

> git的工作环境就是git正在工作的环境嘛（
>
> 也就是你在什么地方正在使用git，如果你在终端打开了git，那么它的工作环境就是当前整个电脑下，如果是在电脑的某个文件文件夹目录下，那git的工作环境就是在这个文件夹目录下～
>
> 工作环境变量就是工作环境的一些信息，用户信息就属于工作环境变量～

#### **步骤：**

1. **配置个人用户名和邮箱的命令：**

```
git config --global user.name "你的用户名"
git config --global user.email 你的邮箱
```

> --global选项的意思是“全局”，也就是说更改的配置就在你的用户主目录
>
> 为了以后不用每个目录底下都配置一遍用户信息，我们当然选择进行全局配置鸟～

2. **配置好了之后就可以看自己的用户信息:**

可以选择将所有的信息列出来

```
git config --list
```

也可以选择查看某个信息，比如只查看用户名

```
git config user.name
```

如果不知道之前自己有没有配置用户信息，可以用查看信息的命令查看一下～～

> 除了用户名和邮箱，还可以配置用户密码
>
> ``` 
> git config --global user.password 你的密码
> ```



#### <mark style="background-color:lime">**具体操作：**</mark>

##### **macos和Linux下：**

> - 打开一个新的**终端**界面
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301141031052.png" alt="截屏2023-01-14 10.31.16" style="zoom:33%;" />
>
> 或
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301141032962.png" alt="截屏2023-01-14 10.32.22" style="zoom: 33%;" />
>
> - **输入配置用户信息的指令**
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046709.png" alt="截屏2022-10-19 17.14.58 Redacted" style="zoom:50%;" />
>
> - **检查一下是否配置好**
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046835.png" alt="截屏2022-10-19 17.15.05 Redacted" style="zoom:50%;" />
>
> 如果灰色标记标出来的三行信息跟自己刚才的配置的一样，说明成功了哦～



##### Windows下：

> - 打开**Git Bash**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046894.png" alt="image-20221020000813500" style="zoom:80%;" />
>
> - **输入配置用户信息的指令**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046946.png" alt="image-20221020002543410" style="zoom:80%;" />
>
> - **检查一下是否配置好**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046091.png" alt="image-20221020002655079" style="zoom:80%;" />

🎉恭喜，到这里，Git需要配置的前期工作已经完成了🎉



----

###### [如何修改用户的配置](#[补充]如何修改用户配置)【见最下方的补充】

-----



### <mark style="background-color:pink">🌱步骤二➡️拥有/建立一个本地仓库，并将本地文件夹文件提交进本地仓库</mark>

> 你可以新建空的文件夹作为试验，建立一个Git的仓库，也可以用一个已经保存了文件的文件夹建成一个Git仓库
>
> 因为这都是一样的，都只是一个 **将已有的文件夹** 设定为 **一个Git仓库** 的过程

**这里我就用我已经拥有的文件夹来开始**

#### **步骤：**

1. **在你想要建立成仓库的文件夹打开Git**
2. **将这个文件夹初始化为一个Git本地仓库**

命令为

```
git init
```

如果显示了 Initialized empty Git repository in .......

说明你的仓库已经初始化好了，现在有了一个空的位于当前文件夹的空仓库

-----

###### [如何查看仓库的状态](#[补充]查看仓库状态)【见最下方的补充】

-------

3. **将文件夹里的 一个文件或者所有文件 提交到Git仓库中**

   1. 将文件添加到GIt的缓存区

   ```
   git add .         # 如果你想要将文件夹里所有的文件都提交到Git仓库，可以用 . 来表示当前文件夹（当前文件夹就含有所有文件不是吗
   git add 文件名(如果不是文件夹还要包涵文件后缀)       # 如果你想提交单个文件/文件夹
   ```

   > 1.  “ ."是相对路径的写法，表示当前目录，当前目录就是现在打开的这个刚创建了一个Git仓库的文件夹呀～
   > 2.  为什么要先放到GIt缓存区：因为安全，放到了缓存区之后再正式提交到Git本地仓库，有了可以撤回的空间
   >
   > ```
   > git rm --cached 文件       # 撤回刚才放到缓存区的文件
   > ```

   2. 查看一下此时仓库的状态

      ```shell
      git status #查看当前仓库的状态
      ```

      会发现有Changes to be committed的提示

   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20230314102715824.png" alt="image-20230314102715824" style="zoom: 80%;" />
   
   ​		说明缓存区内有文件未提交到Git仓库

   3. 将缓存区提交到Git仓库
   
   ``` 
   git commit -m "提交时你想要添加的说明"
   ```
   
   > ”说明“是必须添加的内容，因为Git的一个作用就是追踪你对于仓库的操作，记录你何时因为什么原因更新了仓库文件
   >
   > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046311.png" alt="截屏2022-10-21 01.00.35" style="zoom:50%;" />



#### <mark style="background-color:lime">具体操作：</mark>

##### macOS和Linux下：

> - **进入到想要建立成仓库的文件夹终端下：**
>
>   有两种方法：
>
>   方法一：用鼠标
>
>   鼠标移动到文件夹上，右击鼠标，找到“服务”
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046536.png" alt="截屏2022-10-19 19.31.47" style="zoom:50%;" />
>
>   “新建位于文件夹位置的终端标签页” 和 “新建位于文件夹位置的终端窗口” 都可以
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046598.png" alt="截屏2022-10-19 19.33.31 Redacted" style="zoom:50%;" />
>
>   此时发现进入到了文件夹的终端窗口
>
>     方法二：用终端命令行
>
>   首先我们需要知道文件夹的路径
>
>   如果不知道可以打开一个终端窗口，并将文件夹拖进去，就可以得到这个文件夹的路径了
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046704.png" alt="截屏2022-10-19 19.36.55 Redacted" style="zoom:50%;" />
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046766.png" alt="截屏2022-10-19 19.37.17 Redacted" style="zoom:50%;" />
>
>   我们将这个文件夹的路径复制一下
>
>   在终端中用cd指令就可以打开文件夹下的终端了
>
>   ```
>    cd 你刚刚复制的文件夹路径
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046821.png" alt="截屏2022-10-19 19.37.57 Redacted" style="zoom:50%;" />>
>
>   > cd指令可以直接在终端中进入指定的文件路径
>
> - **文件夹初始化为Git仓库**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046884.png" alt="截屏2022-10-19 19.47.11 Redacted" style="zoom:50%;" />
>
> - 查看一下这个Git仓库状态
>
>   ～如果文件夹原来没东西，应该是这样的
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046936.png" alt="截屏2022-10-19 19.53.52 Redacted" style="zoom:50%;" />
>
>   ~如果文件夹内有东西（我的CLion文件夹里放入的是hello.c），应该是这样的
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046015.png" alt="截屏2022-10-19 19.55.49 Redacted" style="zoom:50%;" />
>
>   > 关于“Unteacked files:“的信息，在[补充的内容：2.查看仓库状态](#2.查看仓库状态)中有说明
>
> - 如果文件夹中原来没有文件，现在可以放入一个文件，以便测试一下下一步的操作
>
>   我的CLion文件夹里已经放入了一个 hello.c
>
> - **将文件夹中的 所有文件或者单个文件 添加到Git缓冲区**
>
>   此处我添加所有的文件（文件夹里其实也就一个hello.c文件）
>
>   并查看一下Git仓库状态
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046046.png" alt="截屏2022-10-19 19.50.17 Redacted" style="zoom:50%;" />
>
>   说明hello.c这个文件添加到了缓存区
>
>   > 并且Git还细心提示可以用 
>
>  >```
>  >git rm --cached 文件
>  >```
>  >
>  >来**撤销刚才添加到缓存区的文件**
>
> - **将缓存区的文件提交到Git仓库**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046116.png" alt="截屏2022-10-19 20.01.47 Redacted" style="zoom:50%;" />
>
>   我添加的说明是"This is a test"，想添加什么都可以，尽量用英文
>
>   查看一下仓库状态
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046189.png" alt="截屏2022-10-19 20.03.10 Redacted" style="zoom:50%;" />
>
>   ”nothing to commit, working tree clean“无事可做，工作树干净
>
>   意思是之前的文件都提交了，现在没有需要提交的文件了，工作树（缓存区）很干净（因为缓存区都提交了



##### Windows下：

> - 找到想要设为Git本地仓库的文件夹，右击，点击**Git Bash Here**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046246.png" alt="image-20221020002832274" style="zoom:80%;" />
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046313.png" alt="image-20221020003438024" style="zoom:80%;" />
>
>   这样就在Git中进入了文件夹
>
> - **文件夹初始化为Git仓库**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046369.png" alt="image-20221020003654246" style="zoom:80%;" />
>
> - 查看一下这个Git仓库的状态
>
>   如果文件夹中原来没有文件，应该是这样的~
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046445.png" alt="image-20221020003829168" style="zoom:80%;" />
>
>   如果文件夹中原来有文件（比如我的CLion文件夹原来有一个hello.c文件)，是这样的~
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046499.png" alt="image-20221020005253111" style="zoom:80%;" />
>
>   > 关于“Unteacked files:“的信息，在[补充的内容：2.查看仓库状态](#2.查看仓库状态)有说明
>
> - 如果文件夹中原来没有文件，现在可以放入一个文件，以便测试一下下一步的操作
>
>   我的CLion文件夹里已经放入了一个 hello.c
>
> - **将文件夹中的 所有文件或者单个文件 添加到Git缓冲区**
>
>   此处我添加所有的文件（文件夹里其实也就一个hello.c文件）
>
>   并查看一下Git仓库状态
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046563.png" alt="image-20221020010248818" style="zoom:80%;" />
>
>   说明hello.c这个文件添加到了缓存区
>
>   > 并且Git还细心提示可以用 
>   >
>   > ```
>   > git rm --cached 文件
>   > ```
>   >
>   > 来撤销刚才添加到缓存区的文件
>
> - **将缓存区的文件提交到Git仓库**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046613.png" alt="image-20221020010408321" style="zoom:80%;" />
>
>   我添加的说明是"This is a test"，想添加什么都可以，尽量用英文
>
>   查看一下仓库状态
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046665.png" alt="image-20221020010442512" style="zoom:80%;" />
>
>   ”nothing to commit, working tree clean“无事可做，工作树干净
>
>   意思是之前的文件都提交了，现在没有需要提交的文件了，工作树（缓存区）很干净（因为缓存区都提交了

🎉恭喜，到这一步，你已经有了一个Git本地仓库，并学会了如何往仓库中提交文件🎉



----

###### [仓库的分支----在查看仓库的时候，第一行中的"On branch XXX"是什么](#[补充][重点]仓库的分支)【见最下方的补充】

------



### <mark style="background-color:pink">🌱步骤三➡️拥有/建立一个远程仓库，并与本地仓库连接 ----Gitee为例</mark>

- 公有仓库和私有仓库的区别：公有仓库所有人可见，私有仓库只有仓库成员可见
- 所有可见仓库的用户都具有读取仓库内容的权利(pull、clone)，公有仓库所有人可见，故任何仓库都可以获取共有仓库的数据；私有仓库对外首先是不可见的，所以只有仓库成员可见，自然只有仓库成员有读取仓库的权利【能看到仓库，就能读取，看不到，当然不能读取】
- 只有被仓库认证的成员即仓库成员才可以修改仓库的内容(比如上传push到远程仓库)，仓库的创建者(拥有者)自然是仓库成员，如果想要添加仓库成员，由仓库创建者进行添加
- Gitee相当于一个远端机器，我们可以在Gitee官网登陆上自己的账户来管理Gitee账户及其下的各个仓库。也可以使用本地的Git与远端Gitee通过某种方式进行关联，这样本地机器可以连接到远端Gitee机器，从而具有修改Gitee账户下所有仓库的权利，也就是说本地Git可以将数据写入(推送）到远端Gitee账户下的仓库里了。
  - 本地Git与远端Git进行关联是通过SSH Key实现的。SSH Key分为SSH Public Key和SSH Private Key，即SSH公钥和密钥。公钥和密钥可以相互匹配。如果要将Gitee与Git关联，要将Gitee里添加上本地Git的公钥。这样当本地Git申请连接远程Gitee的时候，Gitee会用添加到它里面的公钥去匹配本地Git密钥，如果能通过匹配，则Gitee通过申请，本地Git就能连上Gitee了。（如果本地Git用户设置了密码，在Gitee拿着公钥申请本地Git密钥的时候，要输入本地Git密码才能获取到密钥，否则本地Git不予权限）
  - 一个Gitee可以关联多个本地机器（一个人可能有多个电脑，但只有一个Gitee账户
- 仓库可以与其它的仓库进行数据交流(下拉、推送、克隆等)操作，只要给定仓库的地址，并具有相应数据操作的权限就可以。一个仓库还可以与另一个仓库进行连接，这样这两个仓库之间就有了比较固定的关系，再进行数据交流的时候不用再指定仓库地址，只要表明是已连接的仓库就可以。

#### <mark style="background-color:lime">1.本地Git关联远端Gitee</mark>

###### 1⃣️获取本地Git的SSH 公钥

###### macOS和Linux下获取本地Git的SSH 公钥：

> - 打开一个终端
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046938.png" alt="image-20221020151601824" style="zoom:80%;" />
>
> - 以防万一，先测试一下Git是否安装了SSH
>
>   ```
>   ssh
>   ```
>
>   如果出现了
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046002.png" alt="截屏2022-10-19 21.01.32 Redacted" style="zoom:50%;" />
>
>   说明带有SSH，否则自行下载安装（在终端中输出`sudo apt-get install ssh`即可）
>
> - 紧接着，输入以下指令【注意，如果确定本地ssh已经生成了密钥和公钥，请跳过这一步】
>
>   ```shell
>   ssh-keygen -t rsa
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20230314103046849.png" alt="image-20230314103046849" style="zoom:80%;" />
>
>   一路按回车就可以
>
>   就会在**安装了SSH的路径**上生成**id-rsa (密钥文件**)和**id-rsa.pub (公钥文件)**
>
> - macOS和Linux的SSH路径在~/.ssh下
>
>   > ~的意思是个人文件夹
>   >
>   > 就是   /Users/你自己的用户名
>   >
>   > 所以~/.ssh 就是 /User/你自己的用户名/.ssh
>
> - 获得SSH公钥：
>
>   **方法一:**
>
>   打开一个终端，在终端中输入
>
>   ```
>   cat /User/你自己的用户名/.ssh/id_rsa.pub
>   ```
>
>   或者
>
>   ```
>   cat ~/.ssh/id_rsa.pub
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046064.png" alt="截屏2022-10-19 21.45.49 Redacted Redacted" style="zoom:50%;" />
>
>   **<u>中间的这一大段的就是本地Git的SSH 公钥，复制它即可</u>**
>
>   **方法二：**
>
>   打开一个终端，直接用cd指令进入到.ssh文件夹下
>
>   ```shell
>    cd ~/.ssh
>   ```
>
>   输入
>
>   ```
>    cat id_rsa.pub
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046169.png" alt="截屏2022-10-20 00.02.44 Redacted" style="zoom:50%;" />
>
>   **<u>中间的这一大段就是本地Git的SSH 公钥，复制它即可</u>**
>
> - 🎉这一步就完成了

###### Windows下获取本地Git的SSH key公钥：

> - 打开Git Bash
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046309.png" alt="image-20221020151305597" style="zoom:80%;" />
>
> - 以防万一，先看一下Git有没有安装SSH
>
>   ```
>   ssh
>   ```
>
>   如果出现了
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046366.png" alt="image-20221020150100500" style="zoom:80%;" />
>
>   说明安装了SSH，否则请自行下载安装（在Git Bash中输入`sudo apt-get install ssh`即可）
>
> - 紧接着，输入以下指令 【注意，如果确定本地ssh已经生成了密钥和公钥，请跳过这一步】
>
>   ```shell
>   ssh-keygen -t rsa
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20230314102326065.png" alt="image-20230314102326065" style="zoom: 80%;" />
>
>   一路按回车就可以
>
>   就会在**安装了SSH的路径**上生成**id-rsa (密钥文件**)和**id-rsa.pub (公钥文件)**
>
> - Windows的SSH路径在~/.ssh下
>
>   > ~的意思是个人文件夹
>   >
>   > 就是   /Users/你自己的用户名
>   >
>   > 所以~/.ssh 就是 /User/你自己的用户名/.ssh
>
> - **获得SSH公钥：**
>
>   **方法一:**
>
>   在Git Bash中输入
>
>   ```
>   cat /User/你自己的用户名/.ssh/id_rsa.pub
>   ```
>
>   或者
>
>   ```
>   cat ~/.ssh/id_rsa.pub
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046410.png" style="zoom:80%;" />
>
>   **<u>中间的这一大段就是本地Git的SSH 公钥，复制它即可</u>**
>
>   **方法二：**
>
>   在Git Bash中，直接用cd指令进入到.ssh文件夹下
>
>   ```
>    cd ~/.ssh
>   ```
>
>   输入
>
>   ```
>    cat id_rsa.pub
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046482.png" alt="image-20221020151035414" style="zoom:80%;" />
>
>   **<u>中间的这一大段就是本地Git的SSH 公钥，复制它即可</u>**

###### 2⃣️将本地Git的SSH key公钥添加到远程Gitee：

> - 点击GItee的**头像-设置**
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046574.png" alt="截屏2022-10-19 22.56.01" style="zoom:50%;" />
>
> - 点击左侧的**SHH公钥**（因为我已经添加了一个公钥了，所以显示的是公钥数为1，否则是0）
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046666.png" alt="截屏2022-10-19 22.56.33 Redacted" style="zoom:50%;" />
>
> - 将之前获得的SSH 公钥填进第二个框，第一个框就自动填充了
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046723.png" alt="截屏2022-10-19 22.42.12" style="zoom:40%;" />
>
> - 添加好了就是这样的
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046838.png" alt="截屏2022-10-19 22.48.15 Redacted" style="zoom:50%;" />

#### <mark style="background-color:lime">2.本地仓库连接远程仓库</mark>

##### 建立一个远程仓库（如果有了的话就不用了）

> - 进入到Gitee官网，网页右上角会发现
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046713.png" alt="截屏2022-10-19 22.27.47" style="zoom: 40%;" />
>
> - 填写仓库名称，”初始化仓库“的选项勾不勾都是可以的
>
> - 在仓库的权限方面，若设为开源/共有，则任何人都对于仓库拥有读(pull,clone)写(push)权限；设为私有，只有仓库拥有者具有写的权限，其他人只具有可读权限
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046789.png" alt="截屏2022-10-19 22.29.13 Redacted" style="zoom:50%;" />
>
> - 进入到仓库中会是这样的（如果勾选了“初始化仓库”，仓库中会有下图的文件，没有的话就没有）
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046868.png" alt="截屏2022-10-19 22.29.39 Redacted" style="zoom:50%;" />
>
> - 这样一个远程仓库就建立好了

##### 本地仓库连接远程仓库：

> - 获取Gitee仓库的ssh，直接复制
>
>   ![截屏2022-10-19 22.59.35 Redacted](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046966.png)
>
> - 在本地Git仓库里输入
>
>   ```shell
>   git remote add origin 你刚才复制的Gitee仓库的链接
>   ```
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046981.png" alt="截屏2022-10-19 23.04.34 Redacted" style="zoom:50%;" />
>
>   没有报错说明连接上了

------

###### [如何查看隐藏文件](#[补充]查看隐藏文件)【见最下方的补充】

---



### <mark style="background-color:pink">🌱步骤四➡️pull 和 push(本地仓库与远程仓库的文件提交和获取)</mark>

> **push：“推”，将本地仓库当前分支的文件 上传合并/推送合并 到远程仓库某个分支**
>
> **pull：“拉”，将远程仓库某个分支的文件 下拉合并/获取合并 到本地仓库当前分支**

#### push：

push是将本地仓库当前分支的内容上传合并到远程仓库的某个分支

因此要确保要上传的文件已经被添加到了本地仓库中

我们上面讲到了如何将文件添加到本地仓库：

```shell
git add 文件名 # 将文件添加到缓冲区
# 如果要将文件夹内所有文件都添加到缓冲区，执行 git add .

git commit -m "上传备注留言" # 将缓冲区文件添加到本地仓库
# 上传备注留言，本次提交的留言，比如如果这是第三次修改项目，可以留言"change 3.0"，支持中文
```

> 可以使用`git status`指令查看仓库状态，见下面补充：[[补充]查看仓库状态](# [补充]查看仓库状态)

然后使用上传命令即可：

```shell
git push origin master 远程仓库分支名
```



例如：

我们现在将这个"测试用文件夹"master分支的仓库，push到已经连接的远程仓库test的master分支（要上传的文件已经添加到了本地仓库）

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046029.png" alt="截屏2022-10-21 01.45.01" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046093.png" alt="截屏2022-10-21 01.44.30" style="zoom:50%;" />

可以看到远程仓库里已经有了本地仓库的所有文件

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046170.png" alt="截屏2022-10-21 01.47.20" style="zoom:50%;" />

#### pull：

pull指令步骤就很简单了：
```shell
git pull origin 远程仓库分支名
```

例如：

我们随便在远程仓库添加一个文件，来模拟别的本地仓库push文件到远程仓库test

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046214.png" alt="截屏2022-10-21 01.49.21" style="zoom:50%;" />

现在在本地仓库pull远程仓库test的master分支仓库

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046274.png" alt="截屏2022-10-21 01.52.04" style="zoom:50%;" />

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046329.png" alt="截屏2022-10-21 01.53.07" style="zoom:50%;" />

成功了（好耶

> ⚠️`push`、`pull`总是取双方仓库每个文件的最新状态
>
> ⚠️因为是Git仓库，所以无论是`push`还是`pull`，都是对于仓库内的文件进行的下拉、提交，没有提交到仓库里的文件，Git是无权管理的
>
> > 比如，我在当前分支(master)CLion文件夹里添加了一个hello.c文件，并不把它提交到仓库
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046385.png" alt="截屏2022-10-20 22.08.04" style="zoom:50%;" />
> >
> > 现在我将远程仓库master分支的所有文件下拉到本地仓库
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046454.png" alt="截屏2022-10-20 22.09.05 Redacted" style="zoom:50%;" />
> >
> > 远程仓库的master分支里本来是没有hello.c文件的，而本地仓库master分支里也没有(因为没提交到仓库)，所以没有涉及到关于hello.c文件的跟踪，hello.c还是存在于CLion文件夹(但并不在本地仓库master分支里)
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046385.png" alt="截屏2022-10-20 22.08.04" style="zoom:50%;" />
> >
> > 如果现在查看仓库状态
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046498.png" alt="截屏2022-10-20 22.12.02 Redacted" style="zoom:50%;" />
> >
> > Look，确实是这样的
> >
> > 如果将hello.c添加到本地仓库master分支，再从远程仓库master分支pull到本地仓库当前分支
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046735.png" alt="截屏2022-10-20 22.14.15 Redacted" style="zoom:50%;" />
> >
> > 发现，诶？不对诶，怎么CLion文件夹中还有hello.c文件？
> >
> > 因为Git跟踪的hello.c状态，远程与本地相比，在本地的状态是最新的，因为远程：没跟踪到hello.c文件(连状态都没有)，本地：于XX日期XX时刻创建了hello.c文件，当然是本地的最新啦
> >
> > 那么，我们先将本地仓库push到远程仓库，再到远程仓库去删除这个hello.c文件
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046893.png" alt="截屏2022-10-20 22.19.34 Redacted" style="zoom:50%;" />
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046957.png" alt="截屏2022-10-20 22.19.45 Redacted" style="zoom:50%;" />
> >
> > 那这样远程仓库的hello.c状态就比本地仓库新了：于xxx时刻被删除
> >
> > 再次将远程仓库pull到本地仓库
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046131.png" alt="截屏2022-10-20 22.22.35 Redacted" style="zoom:50%;" />
> >
> > (界面往往包含很多信息，比如这个，显示hello.c的最新的状态是在远程仓库被删除了)
> >
> > 看一下本地CLion文件夹
> >
> > <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046186.png" alt="截屏2022-10-20 22.24.17" style="zoom:50%;" />
> >
> > 明白了吧～～

因为不止一个本地仓库可以访问远程仓库，所以如果你不知道自己本地仓库的版本比远程仓库是新还是旧

每次开始工作时建议先将远程仓库pull到本地仓库，因为pull和push总是取文件最新状态嘛～～

[git 为什么要先commit，然后pull，最后再push？而不是commit然后直接push？](https://blog.csdn.net/wys0127/article/details/123856744)



🎉恭喜，到这一步，你已经掌握了如何在本地仓库和远程仓库进行文件提交和获取了🎉



#### [补充] git clone 及其与git pull的区别

> - 打开Gitee中自己刚创建的远程仓库页面，点击右侧的“克隆/下载”，选取"HTTPS"或者"SSH"，点击“复制”
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301141103859.png" alt="截屏2023-01-14 11.02.38" style="zoom:50%;" />
>
> - 打开本地仓库的Git bash/终端，输入指令
>
>   ```shell
>   git clone 刚刚复制的HTTPS或者SSH
>   ```
>
>   > `git clone`命令的作用是将远程仓库克隆到本地
>
>   - 如果仓库是私有仓库，按道理说只有仓库成员才可见，所以需要验证本地用户信息
>
>     - 如果本地Git没有关联这个私人仓库的Gitee，需要输入用户的Gitee用户名和密码来验证自己是该私有仓库的成员
>
>       用户名可以在Gitee网页中的个人主页上查看
>
>     <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301141110019.png" alt="截屏2023-01-14 11.08.16 Redacted" style="zoom:50%;" />
>
>     - 如果本地Git关联了这个私有仓库的Gitee，则输入本地Git的密码即可clone
>
>   
>   - 如果仓库是公有仓库，直接可以clone
>   
>   出现类似上图就说明clone成功

> `git pull`是获取仓库中某一个分支下的新的数据（如果有的话），并与本地分支数据进行合并
>
> `git clone`是将整个仓库下载下来，包括日记信息和各分支数据等

#### [补充]如何修改用户配置

> 如果单纯想要修改用户配置，只需要用添加用户配置的命令就可以了，因为新的配置会覆盖旧的配置

> 如果想要删除用户配置，比如删除用户名、邮箱、密码
>
> ```bash
> git config --global --unset user.name
> git config --global --unset user.email
> git config --global --unset user.password
> ```
>
> 删除了用户名和邮箱，在连接远程仓库的时候可能会被认为本地Git不安全（因为都没有报上名来~~
>
> 删除了密码，则在进行一些操作时会跳过输入密码的环节，方便但是不是很安全，因为往往是在一些“确认要进行操作吗”的操作时需要你输入密码来确认，如果没有密码就直接跳过了~

[点这里返回上次阅读的位置](# 如何修改用户的配置【见最下方的补充】)



#### [补充]查看仓库状态

```
git status
```

这是一个使用很频繁的命令，有时候你就是想看看现在仓库处于什么状态，有时候你会忘记自己有没有将文件夹下已经更改的文件提交到Git仓库，等等等等，反正只要你想看一下仓库状态，就会用它～

> 比如到现在为止，我们只是完成了仓库的初始化，还没有向仓库中提交任何文件
>
> - 如果文件夹中本来是没有文件的，我们查看一下仓库的状态
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046235.png" alt="截屏2022-10-19 17.53.32 Redacted" style="zoom:50%;" />
>
> 可以看到 “No commits yet”（还没有任何提交）
>
> - 如果文件夹里原来是有文件的（比如一个文件hello.c），我们查看一下仓库的状态
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046288.png" alt="截屏2022-10-19 19.19.26 Redacted" style="zoom:50%;" />
>
> 可以看到Git检测到文件夹里有一个新的文件"未被跟踪"（Untracked files ：）
>
> 在括号里提示了用什么命令来将hello.c文件放入缓存区
>
> 下面的红色的hello.c就是未被添加到缓存区的文件
>
> > “跟踪”，因为Git本身是一个版本控制软件，说白了就是记录并保存下来你每次对于文件的更改（这个就叫跟踪，知道你什么时候修改的什么文件）
> >
> > <mark style="background-color:yellow">**只有将修改了的文件添加到Git的缓存区，文件状态才能被Git跟踪**</mark>
> >
> > <mark style="background-color:yellow">当你完成了所有的工作、已经不需要再对任何文件进行更改，就执行最后一步：将缓存区的文件提交到Git，这样仓库里的文件就会更新了</mark>
> >
> > > 修改，当然是包括添加新文件、删除旧文件、更改现有文件等~





#### [补充] [重点] 仓库的分支

branch 即为“分支”

如果用户a和用户b同时对于项目进行修改，仓库为了防止两人的修改相互影响，会形成两条分支来分别保存a、b的修改，这样a、b对于项目的修改都在自己的那条分支上，等到ab的工作完成了，就可以选择统一将分支合并起来

> 在仓库初始化(执行了`git init`)之后，会默认生成一个主分支master，也就是在Windows的Git Hash窗口中显示的这个绿色的
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046347.png" alt="image-20221020171909705" style="zoom:80%;" />
>
> 在macOS和Linux下的终端里不会主动显示当前分支名字，但是也可以在某些地方看到
>
> 比如在查看仓库状态下(Windows的Git Bash里也一样)
>
> 当然，在这个终端窗口里，显示我的这个分支名字是main，那是因为我改名了hhh~
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046936.png" alt="截屏2022-10-19 19.53.52 Redacted" style="zoom:50%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046445.png" alt="image-20221020003829168" style="zoom:80%;" />

``` 
git branch
```

**显示当前仓库下所有的分支**

这个命令可以查看当前仓库的所有分支，并用“ * ”标记出用户当前使用的分支

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046596.png" alt="image-20221020172917614" style="zoom:80%;" />
>
> 可以看到现在我只有一个分支master，并处在这个分支上

> ⚠️如果输入此指令之后，并没有正常显示，而是显示了END和一堆～，按q退出，然后输入` git config --global core.pager ''`即可
>
> core.pager指定 Git 运行诸如`log`、`diff`等所使用的分页器，你能设置成用`more`或者任何你喜欢的分页器（默认用的是`less`）， 当然你也可以什么都不用，设置空字符串（如上面的这条指令设置），这样不管命令输出多少，都会在一页显示所有内容



~~~
git branch 新分支名称
~~~

**增加一个分支**

这个命令会增加一个分支，新增的分支会复制原有分支的所有内容，保证新分支的初始内容和原分支一样

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046663.png" alt="image-20221020173709847" style="zoom:80%;" />
>
> 看到新增加了一个分支a

```
git checkout 想要切换到的分支
```

**切换当前分支**

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046764.png" alt="image-20221020174000192" style="zoom:80%;" />
>
> 看到切换了分支（甚至在Git Bash中还会用蓝色的字体标出来当前分支，这还是很银杏化的~~
>
> mac和Linux泪目....(不过这个应该是可以配置的)

```
git checkout -b 新分支名称
```

**新增一个分支并切换到这个新分支**

就是上两个操作的简化~~

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046825.png" alt="image-20221020191116028" style="zoom:80%;" />

```
git merge 要合并到当前分支的分支名
```

将某个分支合并到**当前分支**

注意：只能将别的分支合并到当前分支，因此合并前要注意一下当前分支

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046943.png" alt="image-20221020191856740" style="zoom:80%;" />
>
> 可以看到，分支合并到master之后，原分支并不会被删除~

```
git branch -d 要删除的分支名
```

删除某个分支

前提：1.不能删除当前所在的分支，执行删除前记得切换分支

​			2.如果一个分支在创建后<u>仓库内容被修改(提交到了Git仓库才能被追踪，才能判断被修改)</u>，并且<u>没有合并到其他分支</u>，是不允许被删除的

> 在master分支下创建分支a和b
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010046994.png" alt="image-20221020193904453" style="zoom:80%;" />
>
> 切换到分支a，在文件夹中创建一个hello.txt文件，但不提交到仓库里
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047046.png" alt="image-20221020194217899" style="zoom:80%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047219.png" alt="image-20221020194305055" style="zoom:80%;" />
>
> 然后切换到master，删除a，发现正常删除了
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047280.png" alt="image-20221020201631869" style="zoom:80%;" />
>
> 但是如果分支a下，文件夹下添加的hello.txt文件提交到了Git里，再回到master分支删除分支a，就会报错，分支a尚未合并到其他分支
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047331.png" alt="image-20221020202208027" style="zoom:80%;" />

```
git branch -D 要删除的分支名
```

强制删除某个分支

”强制“在于可以删除 未合并到其他分支的 已修改的分支

> 上面那张图片也说了，If you are sure you want to delete it, run 'git branch -D a'
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047382.png" alt="image-20221020202701428" style="zoom:80%;" />

```
git tag 标签/版本名称
```

为当前的仓库状态添加一个标签，就像每次软件的版本一样~

```
git tag
```

查看所有标签/版本

> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047440.png" alt="截屏2022-10-20 21.57.34 Redacted" style="zoom:50%;" />

<mark style="background-color:yellow">**总结一个很重要的知识点**</mark>

> 如果我们在只有一个分支master的仓库，再添加一个分支a，并切换到分支a
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047509.png" alt="截屏2022-10-21 01.04.54" style="zoom:50%;" />
>
> 原来的时候仓库master分支里有一个test.txt文件，因为构建了一个分支，master分支里的所有文件也都复制到了a分支里
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047566.png" alt="截屏2022-10-21 01.05.41" style="zoom:50%;" />
>
> 现在我们正处在分支a，我们添加一个文件A.txt到分支a仓库里面
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047662.png" alt="截屏2022-10-21 01.08.08" style="zoom:50%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047725.png" alt="截屏2022-10-21 01.09.22" style="zoom:50%;" />
>
> 
>
> 现在切换到master分支
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047769.png" alt="截屏2022-10-21 01.10.31" style="zoom:50%;" />
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047843.png" alt="截屏2022-10-21 01.11.01" style="zoom:50%;" />
>
> - <mark style="background-color:yellow">**我们可以体会到：分支是相互独立的**</mark>
>
> 我们再切回到分支a
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047900.png" alt="截屏2022-10-21 01.12.38" style="zoom:50%;" />
>
> 嗯没错没毛病，A.txt又回来了
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047954.png" alt="截屏2022-10-21 01.13.21" style="zoom:50%;" />
>
> 好，现在再在分支a的文件夹里添加一个B.txt，但是这次不提交到分支a的仓库
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047024.png" alt="截屏2022-10-21 01.14.34" style="zoom:50%;" />
>
> 我们直接切换到分支master
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047080.png" alt="截屏2022-10-21 01.15.15" style="zoom:50%;" />
>
> 发现分支为master时的文件夹里，有B.txt
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047133.png" alt="截屏2022-10-21 01.16.00" style="zoom:50%;" />
>
> 这并不是因为B.txt从分支a的仓库复制到了分支master的仓库
>
> 而是因为B.txt既不属于分支a仓库，也不属于分支master
>
> 它并不存在于Git仓库里
>
> - <mark style="background-color:yellow">**我们可以发现**</mark>
>
>   <mark style="background-color:yellow">**Git仓库 不等于 整个文件夹，文件夹的文件提交到GIt仓库之后才属于仓库，否则只是一个存在于文件夹但是不存在于仓库的文件**</mark>
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047204.png" alt="截屏2022-10-21 01.24.33" style="zoom:50%;" />
>
> 现在我们切换回a分支
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047900.png" alt="截屏2022-10-21 01.12.38" style="zoom:50%;" />
>
> 好，之前不是在文件夹里创建了一个B.txt但是没有提交到分支a的仓库嘛
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047266.png" alt="截屏2022-10-21 01.28.55" style="zoom:50%;" />
>
> 现在我们将它添加到分支a的缓存区，但不提交到仓库里
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047327.png" alt="截屏2022-10-21 01.29.32" style="zoom:50%;" />
>
> 切换到master分支
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047387.png" alt="截屏2022-10-21 01.31.54 Redacted" style="zoom:50%;" />
>
> 可以发现切换的时候有一个关于B.txt的提示，并且master分支下，文件夹里还是有B.txt
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047445.png" alt="截屏2022-10-21 01.36.12" style="zoom:50%;" />
>
> 说明B.txt文件还是不属于Git仓库
>
> 但是能检测到B.txt的动向了，说明
>
> - <mark style="background-color:yellow">**将文件添加到缓存区，只是给了Git跟踪文件状态的权利，但是文件并不会进入到Git仓库里，除非提交到仓库**</mark>

[点这里返回刚在阅读的位置](#仓库的分支----在查看仓库的时候，第一行中的"On branch XXX"是什么【见最下方的补充】)



#### [补充]查看隐藏文件

macOS和Linux下：

> 以"."开头的文件都是隐藏文件，我们可以先打开访达
>
> 在左侧列表中找到 位置 下的个人电脑的文件夹
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047501.png" alt="截屏2022-10-19 21.34.50" style="zoom: 50%;" />
>
> 打开Macintosh HD - 用户 - 自己用户名的文件夹
>
> 然后在这个文件夹里按下⇧ + ⌘ +. 
>
> 就可以显示隐藏文件，再按一遍就可以关闭显示隐藏文件
>
> <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202301010047598.png" alt="截屏2022-10-19 21.37.12" style="zoom:50%;" />

[点这里返回刚才阅读的位置](#如何查看隐藏文件【见最下方的补充】)

#### [补充]文件.gitignore

.gitignore是本地Git仓库的一个隐藏文件，它的作用相当于黑名单，凡是在这个文件里包含的文件都不会被上传到远端仓库。

> .gitignore文件里的黑名单文件是可以用通配符来表示的



#### [补充]另一种链接远端仓库的方式（不需要提交公钥）

1. 创建好一个本地仓库

2. ```shell
   git clone 远端仓库的http(在Gitee中会找到，跟ssh位置一样)
   ```

   第一次链接是会要求输入远端仓库的账户和密码，也就是Gitee的用户名和密码

3. push和pull的操作：

   ```shell
   git push 
   git pull
   ```

   操作时可能需要gitee账户的密码





参考文章：《从0开始的Github》



## 相关笔记
- [[Skill/工具/Git/我的Git使用方案.md|我的Git使用方案]]
- [[Skill/工具/Git/一定是先commit在pull最后push.md|一定是先commit在pull最后push]]
- [[Skill/工具/Git/Git撤销回滚.md|Git撤销回滚]]
- [[Skill/工具/Git/如何将现有仓库推送到远程新仓库.md|如何将现有仓库推送到远程新仓库]]
