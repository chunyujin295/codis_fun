---
title: Linux_快捷键&热键
date: '2022-10-21 00:52'
tag: Linux
category: Linux
abbrlink: bd04c738
---



## 1. 光标移动

```shell
  ctrl + <      # 移动到前一个单词开头
  ctrl + >      # 移动到后一个单词结尾
  ctrl + A      # 移动到开头
  ctrl + E      # 移动到结尾
  alt  + B      # 向左移动一个单词
  alt  + F      # 向右移动一个单词
  ctrl + B      # 向左移动一个字符
  ctrl + F      # 向右移动一个字符
  esc  + B      # 向左移动一个单词
  esc  + F      # 向右移动一个单词
  ctrl + XX     # 在上次光和当前光标所在字符间跳转
  esc  + T      # 交换光标位置前的两个单词
```

## 2. 拷贝/剪切/粘贴/删除

```shell
* ctrl/shift + Insert # whindows下复制粘贴文本 
* cmd + c/v # macOS下复制粘贴文本
  ctrl + K      # 剪切光标后所有字符
  ctrl + U      # 剪切光标前所有字符
  ctrl + Y      # 粘贴ctrl+U/K剪切的内容
  ctrl + W      # 删除光标前一个单词
  ctrl + D      # 删除光标所在字符(光标右侧) #不建议使用
  ctrl + H      # 删除光标前字符(光标左侧)
```

## 3. 撤销

```shell
* ctrl + _      # 撤销操作
  ctrl + ?      # 撤消前一次输入
  alt  + R      # 撤消前一次动作
```

## 4. 替换

```shell
* ctrl + T      # 将光标当前字符与前面一个字符替换
```

## 5. 历史命令编辑

```shell
  ctrl + P      # 上条输入的命令(相当于上键)
  ctrl + N      # 上条历史命(相当于下键)
  alt  + >      # 上一次执行命令
* ctrl + R      # 输入残缺指令，搜索对应完整历史指令
```

## 6. 控制命令

```shell
* ctrl + L      # 清除屏幕，相当于clear
* ctrl + C      # (强制)终止命令&另起一行
* ctrl + D      # 退出(比如用户登出、退出shell、退出终端)
* ctrl + Z      # 暂停并挂起当前任务
  ctrl + I      # 补全功能(类似Tab键)
  ctrl + O      # 重复执行命令
  alt  + <数字>  # 操作的次数
  ctrl + S      # 锁住终端，阻止屏幕输出
  ctrl + Q      # 解锁终端，允许屏幕输出
```

## 7.补全/补齐

```shell
tab
# 单击tab实现指令补全，仅当通过残缺的指令能确定唯一的完整指令时才可以实现补全
# 双击tab实现档案补全，当通过残缺的指令无法确定唯一完整指令时，显示所有对应指令
```

![Dec-12-2022 14-04-41](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212121406831.gif)

![Dec-12-2022 14-05-29](https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202212121406885.gif)
