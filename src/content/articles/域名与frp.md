---
title: 域名与frp
date: '2026-1-11 13:17'
tag:
  - Linux
  - Ubuntu
  - frp
  - 域名
category:
  - Skill
  - Linux
  - frp与服务处理
cover: 'https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/images.webp'
abbrlink: c6fe9995
---

当你注册了一个域名之后，你现在手握三大兵器：

- 域名
- 弹性云服务器-frps
- 本地Linux机器-frpc

我已经无法忍受每次访问服务的时候都要输入冗长的云服务器公网ip了，注册一个简洁易懂的域名吧！

----

域名注册过程各大云服务器厂商或者域名厂商都大差不差。

这里要讲的是域名注册之后要做的事情。

# 1.为域名加上DNS解析

如果想要让域名代替你的云服务器公网IP，需要为域名添加DNS解析。我买的腾讯云的域名，所以这里示例腾讯云。

流程其实非常简单，找到域名所在的控制台板块，找一下DNS解析相关模块，添加记录，然后记录值填写你的公网IP即可。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111131136596.png" alt="image-20260111131136596" />

添加之后你就可以尝试使用域名进行ssh登陆了：

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111131240248.png" alt="image-20260111131240248" />

# 2.域名备案

为你的域名上一个身份证，否则不合法，无法通过浏览器正常访问网站（这个不影响DNS解析，也就是说你还是能直接通过域名进行ssh连接等操作）。

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/iamge/image-20260111131256493.png" alt="image-20260111131256493" />

域名备案的操作，也是直接根据提示走就行。这里需要提一下，**域名备案要去你的云服务器厂商下去进行，而不是你购买域名的厂商**。我的云服务器购买的阿里云，域名买的腾讯云的，我要去阿里云申请域名备案。