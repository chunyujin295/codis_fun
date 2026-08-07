---
title: 云服务器+frp实现远程访问Linux物理机
date: '2026-1-10 18:22'
tag:
  - Linux
  - Ubuntu
  - 远程ssh
  - frp
category:
  - Skill
  - Linux
  - frp与服务处理
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/PixPin_2026-01-10_18-24-55.png
abbrlink: 8d0c2680
---

# 场景

1. 家中有一台Linux主机，想要通过公网而不是局域网内部远程访问这台机器
2. 还是家中的这台Linux主机，跑了一个服务，希望能够在公网下直接被访问到
3. 扩展场景：远程访问本地Linux主机上跑的服务（本质上frp就是干这个事儿的）

# 准备

1. Linux主机
2. 一台云服务器([B站云服务器选购区up主](https://space.bilibili.com/66715613?spm_id_from=333.788.upinfo.detail.click)，如果你后面的需求仅仅是远程连接本地ssh，那么最便宜的即可（2核2G够用）。如果想要访问本地一些其他服务，带宽一定要高一些（建议50M以上，最好选具有峰值带宽的性价比云服务器，例如阿里云200M峰值的)
3. [frp](https://github.com/fatedier/frp)
4. 稍微灵巧的双手与稍微智慧的大脑

# frp简单介绍

> 在GitHub主页中，已经具有了全面的说明，此处仅是快速进行通俗介绍。



## frp的功能

frp 做的事情只有一件：

> **把“外面访问不到的内网端口”，变成“外面能访问的公网端口”**

家里那台 Linux：

- 在 NAT 后面
- 跑着一个服务（HTTP、SSH、游戏服、你自己写的怪东西都行）

frp 的策略是：

- **内网机器主动连云服务器**
- 云服务器替它“代收流量”
- 流量通过这条已建立的连接“反向送回内网”

这就绕开了 NAT、防火墙、运营商的冷脸。



## 使用frp的客户端和服务端

`frpc` -> client，在你的本地Linux机器上运行；`frps` -> server，在云服务器上运行

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/architecture.png" alt="architecture" /><br/>GitHub官网介绍图</center></div>

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110121845453.png" alt="image-20260110121845453" /><br/>大概这么个流程，主要让你知道哪个机器应该跑服务端，哪个应该跑客户端</center></div>



# 步骤一：安装frp到S端与C端

> 两端需要安装相同版本的
>
> 如果服务端不方便访问GitHub，可以使用vscode或者其他ssh工具，将本地文件直接上传过去

[frp项目地址](https://github.com/fatedier/frp/releases/tag/v0.66.0)

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110122040253.png" alt="image-20260110122040253" style="zoom:80%;" />

```bash
wget https://github.com/fatedier/frp/releases/tag/v0.66.0
```

S端与C端都安装，且版本要统一



## 解压到合适位置

安装后解压到一个合适的位置

```bash
tar -vzxf frp_0.66.0_linux_amd64.tar.gz -C 指定的位置
```

### 删除多余版本，改文件夹名（建议）

解压后的目录中可能会保留多个项目，删除多余的，只留下来需要的同名文件夹即可。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110122810972.png" alt="image-20260110122810972"  />

改成一个好些的名字，方便后面设置开机自启

```bash
mv frp_0.66.0_linux_amd64  frp
```



## 目录结构

```bash
drwxr-xr-x yj yj 4.0 KB Sat Jan 10 12:17:34 2026  .
drwxrwxr-x yj yj 4.0 KB Sat Jan 10 12:12:52 2026  ..
.rwxr-xr-x yj yj  16 MB Sun Jan  4 14:58:46 2026  frpc # 客户端软件
.rw-r--r-- yj yj 149 B  Sat Jan 10 12:17:34 2026  frpc.toml # 客户端配置
.rwxr-xr-x yj yj  20 MB Sun Jan  4 14:58:47 2026  frps # 服务端软件
.rw-r--r-- yj yj  16 B  Sun Jan  4 15:03:24 2026  frps.toml # 服务端配置
.rw-r--r-- yj yj  11 KB Sun Jan  4 15:03:24 2026  LICENSE
```





# 步骤二：修改配置文件

## S端

### 1.修改配置文件

`frps.toml`

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110123452000.png" alt="image-20260110123452000" style="zoom:80%;" />

【bindPort】是服务端提供给客户端，用于绑定服务的端口，客户端通过服务端ip + 绑定端口，连接到服务端服务。可以自己规定端口，注意大于1000且不要和服务端其他端口重复即可。

### 2.开放云服务器端口

云服务器现在一般都有安全组策略，不允许随便访问端口，因此接下来需要去云服务器控制台打开该端口的访问权限。

你可以在云服务器厂商的控制台页面，找到 安全组策略/防火墙 等字眼。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110123942166.png" alt="image-20260110123942166" style="zoom:80%;" />



## C端

### 1.修改配置文件

`frpc.toml`

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110124157011.png" alt="image-20260110124157011" style="zoom:80%;" />

【serverAddr】服务端地址，即你的云服务器公网ip。

【serverPort】服务端提供的绑定端口，即服务端`frps.toml`的【bindPort】。

【[[proxies]]】代理配置，一个代理配置下面有以下几个配置项，配置文件中可以存在任意个代理，往下追加就好。

- name 代理的别名，自己取名字。
- type 代理类型，通常为tcp。
- localIP 本地服务IP，即localhost，即127.0.0.1。
- localPort 本地服务提供的ip，ssh服务则固定为22，如果你跑其他的服务，那就是该服务的接口。
- remotePort 映射到云服务器frps的端口，需要你自己定，且在云服务器端口上进行开放，这样才能被fcps监听和处理。

### 2.开放云服务器端口

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110124735891.png" alt="image-20260110124735891"  />



# 步骤三：启动fcp程序，测试CS是否建立连接

云服务器启动服务端

```bash
frps -c frps.toml
```

本地Linux电脑启动客户端

```
frpc -c frpc.toml
```



客户端启动后，查看两端日志。

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110130638467.png" alt="image-20260110130638467" /><br/>客户端日志，连接上了服务端，添加上了一个端口代理</center></div>

# 步骤四：外界访问服务

frp本质上就是端口映射，因此基本使用原理就是访问frp中映射出来的那个端口的服务即可。

### ssh服务

假设我们映射的端口是本地的ssh服务端口22，那么可以在外界公网上走服务器代理，ssh访问本地Linux了。

我将云服务器的

命令：

```bash
ssh -p 6000 本地Linux用户@云服务器公网IP 
```

<div><center><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260110130816728.png" alt="image-20260110130816728" style="zoom:80%;" /><br/>成功访问上家里的电脑了🎉</center></div>

### 其他服务

如果本地Linux跑了一个服务，暴露出的端口是7000，映射到云服务器是9999，那么直接访问云服务器上的9999端口即可。



# 步骤五：设置开机自启动服务

> 这样能获得一个较为稳定的使用环境。且比守护进程更稳定，守护进程无法开机自启，不够自动化。

服务端客户端一样。这里以客户端为例。

## 创建service文件

```bash
sudo vim /etc/systemd/system/frpClient.service # 文件名自定义，这里我取名frpClient
```

内容：

```ini
[Unit]
# 服务名，自定义，建议与该文件名一致
Description=frpClient
After=network.target

[Service]
Type=simple
# 服务要执行的命令，路径都是绝对路径
ExecStart=/home/yj/SoftWare/frp/frpc -c /home/yj/SoftWare/frp/frpc.toml 
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```



## 重新加载systemd

```bash
sudo systemctl daemon-reexec
```



## 启动&设置开机自启

```bash
sudo systemctl start frpClient # 服务名是刚才文件中设置的，下面也一样
sudo systemctl enable frpClient
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111123357561.png" alt="image-20260111123357561"  />

## 查看状态和日志

```bash
sudo systemctl status frpClient # 查看状态
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111123422861.png" alt="image-20260111123422861" />

```bash
journalctl -u frpClient -f # 查看服务运行日志
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111123502274.png" alt="image-20260111123502274" />

## 关掉服务

```bash
sudo systemctl stop frpClient
```

检查：

```bash
sudo systemctl status frpClient
```

## 禁止开机自启动

```bash
sudo systemctl disable frpClient
```

## 强制杀掉服务

```bash
sudo systemctl kill frpClient # 适用于服务卡住、不响应的时候
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111123605417.png" alt="image-20260111123605417" />

# 步骤六：重启服务

frp 的配置文件改了，默认情况下不会自动生效，必须重启对应的进程或服务。

只要配置文件内容改了，就需要重启服务才能生效。

如果你是用 **systemd**：

```bash
# 服务端
sudo systemctl restart frpServer # 这里是你自己创建的服务名，我沿用了上面我自定义的

# 客户端
sudo systemctl restart frpClient
```

如果你是手动跑的（前台 / nohup / screen）：

```bash
# 先停掉
ps aux | grep frp # 这里就是frp进城了
kill <pid>

# 再重新启动
./frps -c frps.toml
./frpc -c frpc.toml
```

**快速判断有没有生效的小技巧**
 重启后立刻看日志：

```bash
journalctl -u frpServer -n 50 --no-pager
journalctl -u frpClient -n 50 --no-pager
```
