---
title: CentOS & macOS终端配置
date: '2023-8-31 11:29'
tag:
  - CentOS
  - Linux
  - macOS
category:
  - Skill
  - Shell
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202308311131885.jpg'
abbrlink: 6e2ea259
---

# CentOS & macOS终端配置

## 终端美化（两系统通用）

### 1.设置默认 shell 为 zsh

查看系统所有的 shell 列表

```shell
cat /etc/shells
```

设置默认 shell 为 zsh，它功能比较多，会好使一些。

```shell
chsh -s /bin/zsh
```



### 2.安装 oh-my-zsh

oh-my-zsh 是一款社区驱动的命令行工具，它基于 zsh 命令行，提供了主题配置，插件机制，大大提高了可玩（用）性。它的 Github 地址为：https://github.com/robbyrussell/oh-my-zsh

我们可以使用 curl 安装：

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

上面地址不行的话，可以尝试下面这个：

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```



### 3.配置命令自动提示、语法高亮

#### 1⃣️命令自动提示：

这里我们用到 zsh-autosuggestions 插件，它可以让终端提示我们接下来可能要输入的命令，按右键即可补齐，提高我们工作的效率。

首先，我们先将仓库克隆到 ～/.oh-my-zsh/custom/plugins 目录下

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH/custom/plugins/zsh-autosuggestions
```

#### 2⃣️语法高亮：

zsh-syntax-highlighting 语法高亮插件，作用：命令错误显示红色，直到你输入正确才会变绿色

安装如下：

```shell
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH/custom/plugins/zsh-syntax-highlighting
```

#### 3⃣️配置文件内容，使上面功能被添加：

使用`vim ~/.zshrc`打开文件，找到其中的插件设置，默认是`plugins=(git)`，我们将其修改为：
```shell
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
source $ZSH/oh-my-zsh.sh
```

退出文件后，输入`source ~/.zshrc`，或者重启中断，应用设置

> 如果未安装vim，见下方vim安装教程

### 4.设置 zsh 主题

我们可以通过` vim ~/.zshrc` 命令打开 zsh 的配置文件，修改其中的` ZSH_THEME` 字段的值，进行主题的修改。

大家可以在 https://github.com/ohmyzsh/ohmyzsh/wiki/themes 链接中，选择自己喜欢的主题。

我选择的主题的是 crcandy，因为它选择的信息比较全，而且它不依赖其他的特殊字体，可以在不同的终端下正常显示。

```shell
ZSH_THEME="crcandy"
```

退出文件后，输入`source ~/.zshrc`，或者重启中断，应用设置

## CentOS配置

### 1.vim安装

```shell
sudo yum install -y vim
```

### 2.安装VimForCpp

VimForCpp是由比特教育汤众老师开发的一款软件，帮助对vim配置方法不熟悉的新手封装的一键式vim环境安装包. 主要针对终端vim用户, 适合远程ssh连接Linux服务器进行开发的场景，将vim打造成一个cpp开发IDE

教程：https://gitee.com/c-yujin/vimforcpp

### 经常遇到的问题：

#### 1⃣️VimForCpp图标问题

有些shell下，VimForCpp可能会遇到图标无法正常显示的情况，可以按照原链接最下面的教程进行解决，如果无法解决，可以尝试以下方式，关闭图标显示：
使用`sudo vim ~./vimrc`进入配置文件，将`Plug 'ryanoasis/vim-devicons'`注释掉即可

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202308311108325.png" alt="截屏2023-08-31 11.08.20" style="zoom:50%;" />

#### 2⃣️使用vim打开文件时，显示YouCompleteMe插件不支持此低版本vim

由于VimForCpp使用了YouCompleteMe这款插件，若插件版本过高，vim版本低，就会出现此错误

解决方法：降级YouCompleteMe插件，或升级vim版本

##### 在服务器上升级vim到最新版本：

1. 通过yum安装Python3

```shell
sudo yum install -y git gcc-c++ ncurses-devel python-devel cmake wget make
sudo yum install -y python36 python36-devel
```

2. 克隆Github的vim项目

```shell
// 克隆项目到本地
// 假定是在~目录下克隆，实际可变更位置。
cd ~
git clone https://github.com/vim/vim.git
```

3.  配置并编译Vim

```bash
// 进入项目
cd vim

// 配置参数
./configure --prefix=/usr/local/vim  --enable-pythoninterp=yes --enable-python3interp=yes --with-python-command=python --with-python3-command=python36

// 编译文件，可能需要使用sudo权限
sudo make
sudo make install

// 编译成功后，vim/src/目录下，会有 vim 文件，后面会用到
ls ~/vim/src -al
```

4. 复制Vim到系统配置，并修改Profile

```bash
// 复制前可以备份一下
sudo cp /usr/bin/vim /usr/bin/vim.backup

// 复制前面编译的vim到系统配置
cd ~/vim/src
sudo cp vim /usr/bin

// 修改系统的Profile, 如果sudo权限不够，则可以尝试使用root用户，我是用的root用户。
su  // 输入root密码，如果还没有设置，则输入 `sudo passwd` 设置root密码。
echo "PATH=\$PATH:/usr/local/vim/bin" >> /etc/profile

// 运行刚修改的配置。
source /etc/profile

// 最后，check version
vim --version
// 同时，也能看到它支持Python3了。(7.4是不支持的。)
```

>作者：神执念浅言多行
>链接：https://www.jianshu.com/p/b44d568aef9f
>来源：简书
>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



#### 3⃣️使用vim打开一些文件时，使用键盘上下左右键变成了在文件中输入内容

此情况多见于普通用户打开一些root权限文件，也可能是由于YouCompleteMe插件产生的bug

如下图，在正常模式下，使用键盘上下左右键翻页，变成了进入到插入模式下的输入字母"B"

![Aug-31-2023 11-25-58](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202308311126771.gif)

解决方法1:

使用hjkl移动光标，不使用键盘上下左右键

解决方法2:

在root权限下打开，即`sudo vim 文件`