---
title: 组合键映射到Home-End-PgUp和PgDn
date: '2024-10-24 22:46'
tag:
  - AutoHotKey
category:
  - Skill
  - AutoHotKey
  - Windows
cover: >-
  https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202024-08-12%20210205.png
abbrlink: e5f830c6
sticky:
---

因为本人的小键盘不带有完整的Home和End按键，并且fn的功能被更换键盘RGB灯效替换了，因此需要将组合按键映射成为Home和End按键，实现光标跳转到文字的头、尾

结合之前fn+左右键实现Home、End的功能，我将tab + 左右键改为了对应功能，一是没有占用其他热键，二是操作起来比较容易

新建了一个名为`ChangeTab.ahk`的文件，放在了启动路径下，内容为：

`#NoEnv的作用应该是指定使用v1版本的ahk`

```shell
#NoEnv
Tab & Left::Home
Tab & Right::End
Tab & Up::PgUp
Tab & Down::PgDn
Tab::Tab
```

<mark>不建议将改内容添加到上次的ChangeLock.ahk（详细请看上一篇文章[Windows将大写锁定键设置为中英文切换 | Towel](https://chunyujin.top/chunyujin/679ac598)），因为会导致按键捕获混乱，最好一套逻辑单独用一个文件。</mark>

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20250104222200319.png" alt="image-20250104222200319" style="zoom:80%;" />