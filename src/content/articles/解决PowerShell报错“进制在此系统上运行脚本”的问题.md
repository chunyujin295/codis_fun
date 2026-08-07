---
title: 解决PowerShell报错“进制在此系统上运行脚本”的问题
date: '2024-11-20 14:03'
tag:
  - Windows
  - 脚本
  - 执行策略
  - PowerShell
category:
  - Skill
  - Windows
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120114634662.png
abbrlink: d6a22065
---

## 问题情景

有时候需要使用PowerShell执行一些脚本操作，比如使用Hexo脚本自动化搭建博客等时，会发现PowerShell上无法执行，并报错：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120114634662.png" alt="image-20241120114634662"  />

但是在cmd中执行，则会正常：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241010172513371.png" alt="image-20241010172513371" style="zoom:80%;" />

## 为什么

因为在powershell中执行脚本是需要权限的(算是一种安全性的设置)，即<mark>”脚本执行策略的设置“</mark>



## powershell脚本运行的几种权限(几种执行策略)：

- `Restricted`：默认设置，不允许任何脚本执行。处于Undefine状态时就是此执行策略
- `AllSigned`：只能运行经过数字证书签名的脚本

- `RemoteSigned`：运行本地脚本不需要数字证书签名，运行从远程脚本(如网络脚本)必须要数字证书签名
- `Unrestricted`：允许所有的脚本运行，但是在运行前会提示是否进行操作
- `Bypass`：允许所有的脚本运行，并且没有任何的提示和警告
- 另外还有两种执行策略：
  - `Default`：默认执行策略，Windows客户端为Restricted；Windows服务器为RemoteSigned。
  - `Undefined`：当前范围没有执行策略。如果所有范围的执行策略都是Undefined的话，实际使用的策略和Default策略保持一致。
  - 一般情况下Default和Undefined的策略就是Restricted



## 查看当前权限：

方法一：powershell中输入

```powershell
Get-ExecutionPolicy
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120143051720.png" alt="image-20241120143051720" style="zoom:80%;" />

可以查看到当前脚本执行策略为`Restricted`，即不能运行任何脚本

方法二：powershell中输入

```powershell
Get-ExecutionPolicy -List
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120143511192.png" alt="image-20241120143511192" style="zoom:80%;" />

可以查看应用于不同作用域(范围)的脚本执行策略。

`Scope`：作用域，包括：

- `MachinePolicy`：由组策略设置，影响整个计算机上的所有用户。这是最严格的范围，因为它会覆盖其他所有范围的策略。
- `UserPolicy`：由组策略设置，仅影响当前用户。它比`MachinePolicy`的范围更小，只适用于当前登录的用户。
- `Process`：执行策略仅影响当前会话（当前 Windows PowerShell 进程）。执行策略存储在 $env:PSExecutionPolicyPreference 环境变量中，不是存储在注册表中，并且当关闭会话时会删除它。不能通过编辑变量值来更改策略。
- `CurrentUser`：影响当前用户的PowerShell会话。这个范围的策略只对当前用户有效，不会影响其他用户。它存储在 HKEY_CURRENT_USER 注册表子项中。
- ` LocalMachine`：影响本地计算机。这个范围的策略对计算机上的所有用户都有效，但优先级低于`MachinePolicy`。它存储在 HKEY_LOCAL_MACHINE 注册表子项中。

> 1. 个人理解，`MachinePolicy`、`UserPolicy`与`CurrentUser`、`LocalMachine`主要是一个由组策略设置，一个存储在注册表中。
> 2. 作用域是相互包裹的，例如`LocalMachine`是包括了`CurrentUser`的，因此只需要设置`LocalMachine`，`CurrentUser`自然就会被影响到。不过还是要遵循<mark>【能实现功能的前提下使最小范围内的权限得到修改】</mark>



因此可以看到，在没有修改执行策略的时候，所有范围下执行策略都是最小的，因此我们根据自己的需求，修改对应作用域下的执行策略即可：

## 修改某作用域下的执行策略：

例如，如果想要实现上面问题情境中的需求，将执行策略改为`RemoteSigned`，并将影响的作用域设置为`CurrentUser`即可【尽量遵循：能实现功能的前提下使最小范围内的权限得到修改】

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120150418297.png" alt="image-20241120150418297" style="zoom:80%;" />



当然，也可以不指定作用域，直接进行修改执行策略，但此时自动认为作用域为`LocalMachine`

```powershell
Set-ExecutionPolicy RemoteSigned
```

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20241120151259097.png" alt="image-20241120151259097" style="zoom:80%;" />



不过需要在管理员模式下打开powershell，因为是对于本地计算机所有用户的执行策略进行更改，需要权限。否则无效(不会报错)

> 上面指定当前用户的执行权限的操作则不需要管理员权限，因为只影响了当前用户本身



## 删除管理策略/设置为默认：

将策略设置回`Undefined`即可：

```powershell
Set-ExecutionPolicy -ExecutionPolicy Undefined -Scope CurrentUser
```

```powershell
Set-ExecutionPolicy Undefine
```

