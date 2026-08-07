---
title: Ubuntu下neovim安装
date: '2025-5-31 17:00'
tag:
  - neovim
category:
  - Skill
  - (˘•ω•˘)
  - neovim
  - 安装
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/PixPin_2025-05-31_17-14-15.png
abbrlink: 86e5a8ba
---

> 本教程的安装教程仅提供一种或几种最简单的方案，更多方案可以自行百度

# neovim安装

## 通过apt安装

```bash
sudo apt-get install neovim
```

安装完执行`nvim`即可启动

## 去官网下载Release版本

有时候apt维护的neovim版本很低，甚至达不到lazyvim的最低版本要求，因此我们直接去下载最新的Release版本。

### 下载

[neovim/INSTALL.md at master · neovim/neovim](https://github.com/neovim/neovim/blob/master/INSTALL.md)

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208155443844.png" alt="image-20250208155443844" style="zoom:80%;" /><br>选择适合你的版本</center></div>



或者使用`wget`或`curl`命令进行下载

```bash
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
```

### 解压

解压之后移动到合适的路径

```bash
tar xzvf nvim-linux-x86_64.tar.gz
sudo mv nvim-linux-x86_64 /usr/local/neovim
# 路径随便，也可以是~/software啥的，只要确保你不会误删除就行
```

### 添加到环境变量

确保能在全局进行使用

```bash
# 如果你的终端是bash
echo 'export PATH=$PATH:/usr/local/neovim/bin' >> ~/.bashrc
source ~/.bashrc # 重新运行bash配置文件使配置生效
# 如果你的终端是zsh
echo 'export PATH=$PATH:/usr/local/neovim/bin' >> ~/.zshrc
source ~/.zshrc # 重新运行zsh配置文件使配置生效
```

尝试`nvim`是否生效，从主界面检查一下版本，或者使用`nvim --version`

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250208164233189.png" alt="image-20250208164233189" style="zoom:80%;" /><br>现在就是最新的了，超级新</center></div>
