---
title: C++_cin&cout
date: '2022-9-30 16:36'
tag:
  - C++
category:
  - 编程日志
  - C&C++
abbrlink: d0ce2bfa
---



#### C++_cin、cout怎么写

cout是输出流，变量a进入（输入）到输出流才能输出到屏幕，就是cout<<a

cin是输入流，让键盘上输入流进入（输入）到变量a才能给a赋上值，也就是cin>>a



另外，比如这个sstringstream类，是用来将string类转化成别的数据类型

~~~cpp
int stringToInt(string s) //将操作数字符串转变成int
{
    stringstream ss;
    int i;
    ss << s;
    ss >> i;
    return i;
}
~~~

要将这个string类s输入入到stringstream类ss中，然后将转化结果从ss输入到i中