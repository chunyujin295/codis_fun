---
title: C++_范围for
date: '2024-7-19 16:31'
tag:
  - Cpp
category:
  - Cpp
abbrlink: d5cdc759
---

# C++_范围for

通常遍历STL的方式有三种：

1. 通过下标+循环 （只适用于顺序存储结构）
2. 迭代器iterator（STL容器都自带）
3. 范围for

下面讲解一下范围for：
范围for的实现逻辑实际上就是调用了迭代器iterator，通过查看汇编就可以看出来

范围for是遍历STL中的每一个元素

> 这里不要和迭代器搞混，迭代器是访问的元素的地址，然后再解引用迭代器，访问到的元素
>
> 范围for使用时变量直接就是获取到的元素（也就是包含了用迭代器获取地址+迭代器解引用）

下面是一个使用案例：
```C++
string s("hello world");
//范围for
for(char ch : s)
{
    cout << ch;
}

//迭代器iterator
string::iterator it = s.begin();
while(it!= s.end())//注意要使用不等号而不是小于号，因为某些数据结构地址空间不一定是连续的
{
    cout << *it;
    it++;
}

//当然，使用auto更为简便
//范围for
for(auto ch : s)
{
    cout << ch;
}

//迭代器
auto it = s.begin();
while(it != s.end())
{
    cout << *it;
    it++;
}
```

