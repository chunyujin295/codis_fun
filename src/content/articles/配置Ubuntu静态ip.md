---
title: 配置Ubuntu静态IP
date: '2025-4-29 00:13'
tag:
  - Ubuntu
  - 网络
  - 静态IP
category:
  - Skill
  - Ubuntu
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250429001157153.png
abbrlink: d27b7a4a
---

当在局域网下通过ssh连接设备时，通常会因为路由器/光猫的DHCP分发IP导致同一设备的ip是动态变化的。

此教程教你设置Ubuntu系统设备的静态ip。

## 1.查看本机网卡信息

1. 使用命令

   ```bash
   ip a
   ```

   输出示例

   ```
   1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
       link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
       inet 127.0.0.1/8 scope host lo
          valid_lft forever preferred_lft forever
       inet6 ::1/128 scope host noprefixroute 
          valid_lft forever preferred_lft forever
   2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
       link/ether 60:a4:4c:62:60:3c brd ff:ff:ff:ff:ff:ff
       inet 192.168.1.5/24 brd 192.168.1.255 scope global noprefixroute enp3s0
          valid_lft forever preferred_lft forever
       inet6 fe80::62a4:4cff:fe62:603c/64 scope link 
          valid_lft forever preferred_lft forever
   ```

   第一个`lo`是你的本地接口，用于本地通信，第二个是你的网卡名称，也可能为`eth0`等名称

2. 或者使用

   ```bash
   ifconfig
   ```

   输出示例

   ```
   enp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
           inet 192.168.1.5  netmask 255.255.255.0  broadcast 192.168.1.255
           inet6 fe80::62a4:4cff:fe62:603c  prefixlen 64  scopeid 0x20<link>
           ether 60:a4:4c:62:60:3c  txqueuelen 1000  (以太网)
           RX packets 14402  bytes 16348294 (16.3 MB)
           RX errors 0  dropped 102  overruns 0  frame 0
           TX packets 6112  bytes 3089613 (3.0 MB)
           TX errors 0  dropped 7 overruns 0  carrier 0  collisions 0
   
   lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
           inet 127.0.0.1  netmask 255.0.0.0
           inet6 ::1  prefixlen 128  scopeid 0x10<host>
           loop  txqueuelen 1000  (本地环回)
           RX packets 3666  bytes 4081111 (4.0 MB)
           RX errors 0  dropped 0  overruns 0  frame 0
           TX packets 3666  bytes 4081111 (4.0 MB)
           TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
   ```

   第一个是你的网卡信息

## 2.查看网关信息

1. ```bash
   ip route show
   ```

   输出

   ```
   default via 192.168.1.1 dev enp3s0 proto static metric 100 
   192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.100 metric 100 
   ```

   第一行``default via``之后的``192.168.1.1``即为你的网关ip

2. 或者使用命令

   ```bash
   route -n
   ```

   输出

   ```
   内核 IP 路由表
   目标            网关            子网掩码        标志  跃点   引用  使用 接口
   0.0.0.0         192.168.1.1     0.0.0.0         UG    100    0        0 enp3s0
   192.168.1.0     0.0.0.0         255.255.255.0   U     100    0        0 enp3s0
   ```

## 3.编写配置文件

```bash
sudo vim /etc/netplan/00-installer-config.yaml
```

该配置文件，有则改之，无则创建

内容示例如下

```yaml
network:
  version: 2  # 指定 Netplan 配置的版本
  ethernets:
    enp3s0:  # 这是网卡 enp3s0 的配置
      dhcp4: no  # 禁用 DHCP，使用静态 IP
      addresses:
        - 192.168.1.100/24  #你期望配置出的静态 IP 地址
      gateway4: 192.168.1.1  # 刚才查看的网关地址
      nameservers:
        addresses:  # DNS 服务器地址
          - 8.8.8.8  # Google 公共 DNS 1
          - 8.8.4.4  # Google 公共 DNS 2
```

## 4.立即执行配置

保存并关闭文件后，执行以下命令应用更改：

```bash
sudo netplan apply
```

1. 系统会提示你输入管理员密码，输入后按回车键确认。

完成以上步骤后，你的 Ubuntu 系统的 IP 地址就会被设置为静态 IP 地址，且在系统重启后仍然保持不变。你可以在终端输入以下命令查看当前的 IP 地址配置，确认设置是否成功：

```bash
ip addr show enp3s0
```

或者

```bash
ifconfig
```



输出

```
2: enp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 60:a4:4c:62:60:3c brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global noprefixroute enp3s0
       valid_lft forever preferred_lft forever
    inet6 fe80::62a4:4cff:fe62:603c/64 scope link 
       valid_lft forever preferred_lft forever
```

