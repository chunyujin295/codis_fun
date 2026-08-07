---
title: 数据结构_顺序栈（C++
date: '2023-2-21 8:47'
tag:
  - 数据结构
  - Cpp
category:
  - 数据结构
  - Cpp
abbrlink: c000c11f
---

### 数据结构_顺序栈（C++实现

> 前言：此类笔记仅用于个人复习，内容主要在于记录和体现个人理解，详细还请结合bite课件、录播、板书和代码。

[toc]

---

####  前言

没什么好说的

> 1. 栈的实现可以用顺序结构（数组）实现-----数组栈，也可以用链式结构（链表）实现-----链式栈  。两者除了在结构上不同，还有一点不同就是数组栈是栈底在前面（首结点），栈顶在后面（尾结点），通过尾插尾删入栈出栈，链式栈是栈顶在前面，栈底在后面，通过头插头删入栈出栈，与数组栈方向相反。
>
>    最常用也可以说最好用的大概是数组栈
>
> 2. ==**assert果然还是太暴力了**，能不用就不用吧，但是一定要记住要判断 指针 为空的情况==
>
>    1. ==可以抛出异常信号  (建议用这个，因为运行错误的时候知道原因==
>    2. ==可以直接返回==
>    3. 判断指针head为空的方式
>
>    ``` cpp
>    if(!head) // if(!head)等价于if(head==NULL),head==NULL是head为空时等式成立，值为真
>      // head为空的话head就相当于0（假），非空就是真，所以当head为空的时候，!head就是真
>      throw nullPointer();//这里使用了抛出异常信号的方式,而且抛出的是一个匿名对象(因为要的是它的类型，没必要给对象命名了)
>                
>    //如果采用直接返回的方式
>    if(!head)
>        return;//直接返回的话，在有返回类型的函数里面可能会报错
>                
>    //以上两者都可以终止函数，不过直接return只能用在无返回值函数上，return本质是终止函数运行并返回NULL
>    ```



#### 实现

> **seqStack.h**
>
> ```cpp
> #include <iostream>
> 
> using namespace std;
> 
> class nullPointer
> {
> }; //用来判断空指针，此处主要用于判断扩容是否失败 以及 顺序表头指针是否为空
> class outofBound
> {
> }; //用于判断越界
> //用作异常处理信号而定义的两个空类
> 
> template <class elemType>
> class seqStack
> {
> private:
> elemType *array;
> int Top;      //栈顶下标
> int Capacity; //栈最大值
> void doubleSpace();
> 
> public:
> seqStack(int initSize = 100);                   //初始化
> int isEmpty() { return (Top == -1); };          //判空
> int isFull() { return (Top == Capacity - 1); }; //判满
> elemType top();                                 //返回栈顶元素
> void push(const elemType &e);                   //元素压栈；用const防止被篡改
> void pop();                                     //栈顶元素出栈
> ~seqStack() { delete[] array; };                //销毁栈
> };
> ```
>
> 
>
> **seqStack.cpp**
>
> ```cpp
> #include "seqStack.h"
> 
> template <class elemType>
> seqStack<elemType>::seqStack(int initSize) //初始化
> {
> array = new elemType(initSize);
> if (!array)
> throw nullPointer();
> Top = -1;
> Capacity = initSize;
> }
> 
> template <class elemType>
> void seqStack<elemType>::doubleSpace() //扩容
> {
> if (!array) // assert只用于判断assay是否为空指针，这样就能明确错误来源
> 		throw nullPointer();
> 
> elemType *tmp = new elemType[Capacity * 2];
> 
> if (!tmp)
> throw nullPointer();
> 
> for (int i = 0; i <= Top; i++) //往新空间里逐一复制结点
> tmp[i] = array[i];
> 
> delete[] array;
> array = tmp;
> 
> Capacity = Capacity * 2;
> }
> 
> template <class elemType>
> elemType seqStack<elemType>::top() //返回栈顶元素
> {
> if(!array)
> throw nullPointer();
> 
> if (isEmpty())
> throw outofBound();
> return array[Top];
> }
> 
> template <class elemType>
> void seqStack<elemType>::push(const elemType &e) //压栈
> {
> if(!array)
> throw nullPointer();
> 
> if (isFull())
> doubleSpace();
> array[++Top] = e;
> }
> 
> template <class elemType>
> void seqStack<elemType>::pop() //出栈
> {
> if(!array)
> throw nullPointer();
> 
> if (Top == -1) //或者if(isEmpty)
> throw outofBound();
> 
> Top--;
> }
> ```

#### 练习

**有些函数直接作为了上面实现的顺序栈的成员函数，用的时候别忘了在seqStack.h中声明**



1.现有一个元素均为整数的栈，使用另一个临时栈对其进行非递减排序

> ```cpp
> template <class elemType>
> void seqStack<elemType>::sort()
> {
>     seqStack tmp;
> 
>     for (int k = Top; k > -1; k--)
>     {
>         int K = top();
>         pop();
> 
>         if (tmp.isEmpty())
>         {
>             tmp.push(K);
>         }
>         else
>         {
>             while (!tmp.isEmpty())
>             {
>                 if (K <= tmp.top())
>                 {
>                     push(tmp.top());
>                     tmp.pop();
>                 }
>                 else
>                     break;
>             }
>             tmp.push(K);
>             int q = Top;
>             while (q >= k)
>             {
>                 tmp.push(top());
>                 pop();
>                 q--;
>             }
>         }
>     }
>     while (!tmp.isEmpty())
>     {
>         push(tmp.top());
>         tmp.pop();
>     }
> }
> ```
>
> > 要求对栈进行非递减排序，就是栈底最大，栈顶最小
> >
> > 思路就是把主栈元素依次出到临时栈来进行排序，在临时栈中排成栈底最小，栈顶最大
> >
> > 主栈栈顶大于等于临时栈顶，直接出主栈入临时栈
> >
> > 小于临时栈顶，主栈栈顶先出栈赋值给k，临时栈逐个出栈到主栈，直到临时栈顶小于k，k入临时栈，在将之前放到主栈的临时栈元素放回临时栈

 

2.

设计算法判别表达式中的括号是否配对出现， 平衡的表达式中'{'、'}'，'('、')'，'['、']' 应成对按序出现。

 例如"{[()]{()}{[()()]()}}" 是括号匹配的表达式， 而"[({}])"是括号不匹配的表达式

> ```cpp
> template <class elemType>
> int seqStack<elemType>::parentheses(string s)
> {
>      int size = s.length();
>     for (int x = 0; x < size; x++)
>     {
>         if (s[x] == '(' || s[x] == '{' || s[x] == '[')
>         {
>             push(s[x]);
>         }
>         else if (s[x] == ')' || s[x] == '}' || s[x] == ']')
>         {
>             if (s[x] == ')' && top() == '(')
>                 pop();
>             else if (s[x] == '}' && top() == '{')
>                 pop();
>             else if (s[x] == ']' && top() == '[')
>                 pop();
>             else
>                 return -1;
>         }
>     }
>     if (!isEmpty())
>         return -1;
> 
>     return 0;
> }
> ```
>
> bite讲过了



3.

用两个栈实现队列

> ```cpp
> template <class elemType>
> class Queue_stack
> {
> private:
>     seqStack<elemType> a, b;
> 
> public:
>     void push(const elemType &x)
>     {
>         b.push(x);
>     }
>     void pop()
>     {
>         if (a.isEmpty())
>             while (!b.isEmpty())
>             {
>                 a.push(b.top());
>                 b.pop();
>             }
>         a.pop();
>     }
>     elemType top()
>     {
>         if (a.isEmpty())
>             while (!b.isEmpty())
>             {
>                 a.push(b.top());
>                 b.pop();
>             }
>         return a.top();
>     }
>     void isEmpty()
>     {
>         return (a.isEmpty() && b.isEmpty());
>     }
> };
> ```
>
> 原理：一个栈负责入队列，一个栈负责出队列，一旦出队列栈为空，就把入队列栈中所有元素都出到出队列栈



4.

给定一个整型的顺序表， 表示在同一行的行星。 对于其中的元素， 正负值代表其一维的移动方向， 可以理解为正数代表行星向右移动， 负数代表行星向左移动。 方向相同的行星不会碰撞， 如果两个行星相向而行则会相互碰撞， 则较小的行星（绝对值代表行星大小）会爆炸， 大小相同时两者都会爆炸。 请设计程序给出行星碰撞后的结果。
例如： [4， 5， -3]， 5 与-3 发生碰撞， -3 爆炸而 5 幸存， 再没有负数即向左运动行星，碰撞结束结果为[4， 5]； [7， 1， -7]， 1 与-7碰撞， 1 爆炸而-7 幸存， 7 再与-7 碰撞， 两者都爆炸， 结果为[]。 注意如果是[-1,1]， 由于-1 向左而 1 向右， 两者不会碰撞。  

> ```cpp
> template <class elemType>
> void seqStack<elemType>::planet()
> {
>     seqStack<int> s;
>     while (!isEmpty())
>     {
>         if (s.isEmpty())
>         {
>             s.push(top());
>             pop();
>         }
>         else
>         {
>             if (s.top() < 0)
>             {
>                 if (top() < 0)
>                 {
>                     s.push(top());
>                     pop();
>                 }
>                 else
>                 {
>                     if (s.top() + top() > 0)
>                         s.pop();
>                     else if (s.top() + top() < 0)
>                         pop();
>                     else
>                     {
>                         s.pop();
>                         pop();
>                     }
>                 }
>             }
>             else
>             {
>                 s.push(top());
>                 pop();
>             }
>         }
>     }
>     while (!s.isEmpty())
>     {
>         push(s.top());
>         s.pop();
>     }
> 
> }
> ```
>
> 思路：（有点 类似中缀式转后缀式）
>
> 这个顺序表就是主栈，再创建一个临时栈
>
> 临时栈为空，主栈栈顶进临时栈；主栈栈顶是小于0的，进临时栈；主栈栈顶大于0，临时栈小于零，判断他俩的和，大于零说明主栈栈顶绝对值大，保留主栈栈顶，临时栈顶出栈，否则反之，如果和等0，则两边都出栈。最后主栈空了就临时栈出栈到主栈
>
> 因为结果保存在了栈里，输出的时候顺序是反的，不过只要再写一个逆置的函数就可以，比如把栈元素放到队列了，再出队列到栈就可以了



5.

现有一个柱状图中，其中每个矩形柱子皆为相邻，且宽度相等，默认为 1，现在需要知道在这个柱形图中能够找到的最大矩形的面积。数据用一组非负的整数来表示，代表每根柱形的高度，请算出最大矩形的面积。

例如，已知每根柱形的宽度为 1，若给出的非负整数为[3,2,7,5,4,1]。图中的阴影部分为 最大矩形的面积，即 12 个单位的面积。

 <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210120036203.png" alt="截屏2022-10-11 21.47.51" style="zoom: 33%;" />

> ```cpp
> int Rectangle(seqStack<int> now)
> {
>     seqStack<int> pass;
>     seqStack<int> elem;
>     int rectangle = 0;
>     while (!now.isEmpty())
>     {
>         int d = now.top();
>         int p = 0;
>         int n = 0;
> 
>         now.pop();
>         elem.push(d);
> 
>         while (!pass.isEmpty())
>         {
>             if (pass.top() >= d)
>             {
>                 elem.push(pass.top());
>                 pass.pop();
>                 p++;
>             }
>             else
>                 break;
>         }
>         while (!now.isEmpty())
>         {
>             if (now.top() >= d)
>             {
>                 elem.push(now.top());
>                 now.pop();
>                 n++;
>             }
>             else
>                 break;
>         }
> 
>         int r = d * (1 + p + n);
>         if (r > rectangle)
>             rectangle = r;
> 
>         while (n > 0)
>         {
>             now.push(elem.top());
>             elem.pop();
>             n--;
>         }
>         while (!elem.isEmpty())
>         {
>             pass.push(elem.top());
>             elem.pop();
>         }
>     }
>     return rectangle;
> }
> ```
>
> 用栈
>
> 一个现在栈now（也是形参）
>
> 开两个临时站”临时站elem“、”过去栈pass“
>
> 如果判断一个元素能形成的矩形的面积，要往它的左右相邻看（不能中断），如果有左、右大于它，就能和左、右构成矩形，也就是这个矩形的高是这个元素，宽是构成矩形的元素的个数
>
> 元素是now栈的栈顶，pass栈里存放的是判断过的元素，也就是正在判断的元素的右面的元素，而正在判断的元素左边的元素就是now里的
>
> 先将判断的元素出栈，赋值给d，并入栈到elem，elem是一个用来集合符合左右大于判断的元素的元素的栈，elem里的元素都是能构成矩形的元素
>
> 先判断 被判断的元素右面有没有可以和它组成矩形的元素，也就是从pass里找，如果栈顶大于，就出pass到elem中，再看pass的新栈顶，直到pass栈顶小于被判断的元素。pass每出一个元素到elem中，就用p计数，p++。p用来记录被判断的元素右面有几个可以和它组成矩形的元素。
>
> 再看 被判断的元素左面，也就是从now里找，因为被判断的元素已经出now了，所以现在now里是新栈顶，如果now栈顶大于被判断的元素，就出now到elem，再看新栈顶，直到now栈顶小于被判断的元素。用n计数出now到elem的元素个数。
>
> 现在就可以计算当前被判断的元素能组成的矩形面积了：高（d） *  宽（p+n+1），其中1是被判断的元素自己，p+n+1就是组成矩形的元素的个数，也就是elem里元素的个数
>
> 因为进elem的顺序是：
>
> d、p个pass栈的、n个now栈的
>
> 而now、pass栈进了elem还得出来，因为elem只是起统计作用的，不能破坏原来now和pass的内容
>
> 因为elem的元素还要回到now和pass里
>
> now最后进的，就先出，进了n个，就每次出一个，n--，直到n=0，说明elem里now的元素都返回now了
>
> elem里剩下的全部进pass就可以，因为elem栈底的d刚刚被判断过了，应该属于pass了，即元素出elem到pass直到elem空
>
>   <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210120036336.jpeg" alt="IMG_0648" style="zoom:40%;" />
>
>  <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210120036665.jpeg" alt="IMG_0649" style="zoom:40%;" />
>
>  <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210120036188.jpeg" alt="IMG_0650" style="zoom:40%;" /><img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202210120020565.jpeg" alt="IMG_0651" style="zoom:40%;" />
>

#### 结束

That's all, thanks for reading!💐

