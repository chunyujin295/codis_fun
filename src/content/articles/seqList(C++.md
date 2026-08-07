---
title: 数据结构_顺序表（C++
date: '2023-2-21 8:47'
tag:
  - 数据结构
  - Cpp
category:
  - 数据结构
  - Cpp
abbrlink: bd5238f
---

### 数据结构_SeqList顺序表（C++实现

> 前言：此类笔记仅用于个人复习，内容主要在于记录和体现个人理解，详细还请结合bite课件、录播、板书和代码。

[toc]

#### 前言&注意事项

> 1. 有些函数没有修改成员数据的要求，防止成员函数被修改，将只有读取要求的函数设为常函数（只读函数
> 2. 用 C++实现，有很多优势，其中一个就是对象可以直接访问并修改数据成员，不用再想要修改的时候再传地址什么的
> 3. ==**assert果然还是太暴力了**，能不用就不用吧，但是一定要记住要判断 表指针 为空的情况==
>
>    1. ==可以抛出异常信号  (建议用这个，因为运行错误的时候知道原因==
>    2. ==可以直接返回==
>    3. 判断指针head为空的方式
>
>    ```cpp
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
> 4. 其他注意事项在代码注释以及code日记中体现

#### 顺序表实现方法

==**注意：这个是带哨兵位的头结点的顺序表！！**==

==但是实际上完全没有必要在顺序表上用哨兵位！因为根本不需要找头结点！而且一般情况下顺序表就是不用的，所以用了哨兵位很容易搞混！！！！==

是因为学校的数据结构教材用了才写上的！！教材不好

> seqList.h
>
> ```c++
> #include<iostream>
> 
> using namespace std;
> 
> //专门作为异常信息的类（用于异常处理抛出）;
> class outofsize
> {
> };//用于判断非法访问
> 
> class nullPointer
> {
> };//用于判断空指针，此处主要用于判断 扩容是否失败 以及 头指针是否为空
> 
> 
> template<class slDataType>
> class seqList
> {
> private:
> 	slDataType* elem;       //用数组实现顺序表
> 	int size;               //顺序表实际大小
> 	int capacity;           //顺序表容量（能存储的除了哨兵位的头结点之外的实际有效数据的个数
> 	void doubleCapacity(); //扩容函数；不过这里没必要单独写出来，只有在添加数据的时候有可能会调用到，其他时候不会用到，所以不会产生函数的复用，不用单独构建这个函数，直接包含在添加数据的函数里面就行
> public:
> 	seqList(int Size = 10); //初始化顺序表
> 
> 	bool seqListEmpty() const; //判空，空则返回真，否则返回假
> 
> 	bool seqListFull() const; //判满
> 
> 	void seqListPushHead(slDataType x); //头插
> 
> 	void seqListPushBack(slDataType x); //尾插
> 
> 	void seqListPopHead(); //头删
> 
> 	void seqListPopBack(); //尾删
> 
> 	void seqListInsert(int pos, slDataType& data); //在任意位置pos插入；此处对元素数据运用了引用，不用再构建形参局部变量，可以减少一点空间开辟，不过个人感觉没有也无伤大雅
> 
> 	void seqListErase(int pos); //删除pos的元素
> 
> 	void seqListRemove(int pos, slDataType& e); //删除pos处的元素，并赋值给e（这里才体现引用的用处
> 
> 	slDataType seqListGet(int pos) const; //返回pos处的元素
> 
> 	int seqListFind(slDataType& data) const; //返回值等于data的元素的位置,没有则返回0
> 
> 	int seqListLength() const; //返回顺序表长度
> 
> 	void seqListDestory(); //清除顺序表，使其成为空表
> 
> 	~seqList()
> 	{
> 	}; //析构函数
> };
> 
> ```
>
> seqList.cpp
>
> ````cpp
> #include"seqList.h"
> 
> template<class slDataType>
> seqList<slDataType>::seqList(int Size)//初始化顺序表
> {
> 	this->elem = new slDataType[Size];//开辟动态数组
> 	if (!elem)
> 		throw nullPointer();
> 	this->size = 0;
> 	this->capacity = Size-1;//保留第一个元素作为哨兵位的头结点（不过个人认为在顺序表这里没有必要，链表那里才能体现出哨兵位头结点的好处）
> } 
> 
> template<class slDataType>
> void seqList<slDataType>::doubleCapacity()//扩容函数
> {
> 	assert(elem);//感觉判空的时候不如直接用assert，因为为了判空就用异常处理有些大材小用，而且只在判空的时候用assert，这样就直到程序一中断就说明是空指针
> 	//所以关于指针可能为空的情况，我在除了这个函数之外的地方都用的assert，这个用异常处理结构太麻烦了,直接暴力检查就ok
> 
> 	slDataType* newElem = new slDataType[capacity * 2];
> 
> 	if (!newElem)
> 		throw nullPointer();
> 
> 	for (int i = 1;i <= size; i++)//注意，因为是有哨兵位的，所以i的范围是1（头）到size（尾）
> 	{
> 		newElem[i] = elem[i];
> 	}
> 
> 	delete []elem;
> 	elem = newElem;
> 	capacity = capacity * 2 - 1;//第一个结点要留给哨兵位，capacity是实际能存储的有效数据的个数
> 	//到了这里，感觉写顺序表用哨兵位的头结点真的是，麻烦又没有必要
> }
> template<class slDataType>
> bool seqList<slDataType>::seqListEmpty()const//判空，空则返回真，否则返回假
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	return size == 0;
> }
> 
> template<class slDataType>
> bool seqList<slDataType>::seqListFull()const//判满
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	return size == capacity;
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListPushHead(slDataType x)//头插
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (size == capacity)
> 		doubleCapacity();//顺序表满了就扩容
> 	for (int i = size + 1; i > 1; i --)
> 	{
> 		elem[i] = elem[i - 1];
> 	}
> 	elem[1] = x;
> 	size++;
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListPushBack(slDataType x)//尾插
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (size == capacity)
> 		doubleCapacity();
> 	size++;
> 	elem[size] = x;
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListPopHead()//头删
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (size != 0)
> 	{
> 		for (int i = 1; i < size; i++)
> 			elem[i] = elem[i + 1];
> 		size--;
> 	}
> 	else
> 	{
> 		throw nullList();
> 	}
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListPopBack()//尾删
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (size != 0)
> 	{
> 		size--;
> 	}
> 	else
> 	{
> 		throw nullList();
> 	}
> }
> 
> 
> ````
>
> ==注意是带哨兵位头结点的顺序表！！！==
>
> ~~~cpp
> template<class slDataType>
> void seqList<slDataType>::seqListInsert(int pos, slDataType& data)//在任意位置pos插入
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (pos > size + 1 || pos < 1)			//pos=1的时候是头插，=size+1的时候是尾插
> 		throw outofsize();
> 	if (size == capacity)
> 		doubleCapacity();
> 	for (int i = size + 1; i > pos; i--)
> 	{
> 		elem[i] = elem[i - 1];
> 	}
> 	elem[pos] = data;
> 	size++;
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListErase(int pos)//删除pos的元素
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (pos > size + 1 || pos < 1)			//pos=1的时候是头删，=size+1的时候是尾删
> 		throw outofsize();
> 	if (size != 0 )
> 	{
> 		for (int i = pos; i < size; i++)
> 			elem[i] = elem[i + 1];
> 		size--;
> 	}
> 	else
> 	{
> 		throw nullList();
> 	}
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListRemove(int pos, slDataType& e)//删除pos处的元素，并赋值给e（这里才体现引用的用处
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (pos > size + 1 || pos < 1)			
> 		throw outofsize();
> 
> 	e = elem[pos];
> 	seqListErase(pos);
> }
> 
> template<class slDataType>
> slDataType seqList<slDataType>::seqListGet(int pos)const//返回pos处的元素
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	if (pos > size + 1 || pos < 1)			
> 		throw outofsize();
> 	return elem[pos];
> }
> 
> template<class slDataType>
> int seqList<slDataType>::seqListFind(slDataType& data)const//返回值等于data的元素的位置，没有则返回0（这里采用了一个比较有意思的方式
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	int i;
> 	elem[0] = data;						//将需要查找的值赋给哨兵位头结点，哨兵位头结点中的数据不属于顺序表中的数据
> 	for (i = size; i >= 0; i--)		//这样的话只需要遍历一遍就好了，没找到的话就会遍历到底，i就直接等于0，比较巧妙
> 		if (elem[i] == data)
> 			break;
> 	return i;
> }
> 
> template<class slDataType>
> int seqList<slDataType>::seqListLength()const//返回顺序表长度
> {
> 	if(!elem)
>      throw nullPointer();
> 
> 	return size;
> }
> 
> template<class slDataType>
> void seqList<slDataType>::seqListDestory()//清除顺序表，使其成为空表
> {
> 	if(!elem)
>      throw nullPointer();
> 	delete[]elem;
> 	elem = NULL;
> 	size = 0;
> 	capacity = 0;
> }
> ~~~
>
> 

#### 总结

>  这里只有一点比较重要，并且关系到以后的C++中关于动态内存释放的处理：
>
>  由于C++中有析构函数，所以不必要额外使用函数来进行动态内存的释放，将销毁动态内存的工作交给析构函数就可以，所以可以有别的函数来做别的工作，比如上面的顺序表，除了完全销毁顺序表之外，还可以清空顺序表（clear函数）：
>
>  顺序表的头结点也是动态开辟的，但是可以不销毁它，保留下来，这样这个头还在，其他的空间被销毁了，就使得原来的顺序表被清空，再次写入数据的话不用再初始化顺序表，直接用原来的这个头结点就可以
>
>  在析构函数中，又可以复用clear函数，然后只需要delete掉头结点就可以

#### 题目

==注意，本次用的是上面写的seqList，所以是带哨兵位头结点的！所以数组权重跟常规情况不太一样！不过思路无碍==

==下面这些函数都是直接在上面👆写好的顺序表头文件中作为成员函数声明的，并在另一个文件中定义的==

> 当然也可以不用作为成员函数，而是重新写一个头文件和源文件，并在头文件中包含单链表的源文件来使用写好的顺序表
>
> 但是因为题目大都是在现有顺序表的基础上进行操作，也就是对顺序表进行操作，不如直接写成顺序表的成员函数，直接在顺序表中调用更方便

1.设计一个函数用来删除大于等于x且小于y的元素,要求要用较高的效率，且空间复杂度为1

> ```cpp
> //设计一个函数用来删除大于等于x且小于y的元素,要求要用较高的效率，且空间复杂度为1
> //这个函数已经声明在了seqList.h中了（否则没法用私有成员，写起来就有点麻烦
> 
> template<class slDataType>//其实不用函数模板，因为题目的要求的前提就是元素是整型，但是因为是成员函数，所以。。。。
> void seqList<slDataType>::del_x_y(int x, int y)
> {
>     int i, j;
>     for (i = 1; i <= size; i++)//因为本次的顺序表用的是哨兵位的头结点，所以权重从1开始，size为最后一个
>     {
>         if (elem[i] >= x && elem[i] < y)
>         {
>             if (i != j)
>             {
>                 elem[j] = elem[i];
>             }
>             j++;
>         }
>     }
>     size = j;//这一步也很有特点，本来顺序表中超过size但是小于capacity的空间本来就是存着数据的，赋值只是用数据覆盖原来的数据
> }
> ```
>
> 这个函数设计的非常巧妙，时间复杂度也很低，仅为O(N)
>
> i就相当于一个侦察兵走在后面，把后面符合要求的元素的值向前赋值给到j的位置
>
> 就叫这个方法为**侦察兵法**吧

2.设有一个顺序表，含有2n个整数，其中n个正数，n个负数，设计一个算法，使L中呈现正数负数相间排列。要求时间符复杂度O(N)，空间为1

> ```cpp
> //假设顺序表中由2n数据，n个正数，n个负数，希望用时间复杂度O(n),和空间复杂度O(1),来将顺序表变成正负相间的
> template <class slDataType>
> void seqList<slDataType>::Switch(int n)
> {
>     int i = 1, j = 2;
> 
>     while (i <= 2 * n && j <= 2 * n)
>     {
>         if (elem[i] > 0)
>         {
>             if (elem[j] < 0)
>             {
>                 i += 2;
>                 j += 2;
>             }
>             else
>             {
>                 i += 2;
>             }
>         }
>         else
>         {
>             if (elem[j] < 0)
>             {
>                 j += 2;
>             }
>             else
>             {
>                 int k = elem[i];
>                 elem[i] = elem[j];
>                 elem[j] = k;
>                 i += 2;
>                 j += 2;
>             }
>         }
>     }
> }
> ```
>
> 思路：
>
> 用两个指针，一个为i，专门指向奇数位置，一个j，指向偶数位置；i、j分别负责判断自己位子上是否为正数、负数。如果i上元素正数，i指向下一个奇数位置；否则停下等j，等到j指向的元素不是负数的时候，i、j上的元素值互换，然后i、j指向自己的下一个。

3.假设两个 元素依值递增有序排列 的线性表A、B分别表示两个集合，求这两个集合的交、并、差，并且要求结果的集合也是递增的有序线性表

> 一定要注意，a、b都是有序的，这一点很好用
>
> ~~~cpp
> //假设两个 元素依值递增有序排列 的线性表A、B分别表示两个集合，求这两个集合的 交集 ,并且要求结果的集合也是递增的有序线性表
> template <class slDataType>
> void seqList<slDataType>::Same(seqList &a, seqList &b)
> {
>  int i = 1, j = 1;
> 
>  while (i <= a.seqListLength())
>  {
>      if (a.seqListGet(i) == b.seqListGet(j))
>      {
>          seqListPushBack(a.seqListGet(i));
>          i++;
>          j++;
>      }
>      else
>      {
>          while (a.seqListGet(i) > b.seqListGet(j))
>              j++;
>          while (a.seqListGet(i) < b.seqListGet(j))
>              i++;
>      }
>  }
> }
> ~~~
>
> 如果相等，就入结果；如果a大，就让b后移，再判断；如果b大，就让a后移，再判断
>
> ~~~cpp
> //假设两个 元素依值递增有序排列 的线性表A、B分别表示两个集合，求这两个集合的 并集 ,并且要求结果的集合也是递增的有序线性表
> template <class slDataType>
> void seqList<slDataType>::Add(seqList &a, seqList &b)
> {
>  int i = 1, j = 1;
> 
>  while (i <= a.seqListLength() && j <= b.seqListLength())
>  {
>     if (a.seqListGet(i) <= b.seqListGet(j))
>      {
>          seqListPushBack(a.seqListGet(i));
>          i++;
>      }
>      else if (a.seqListGet(i) > b.seqListGet(j))
>      {
>          j++;
>      }
>  }
> 
>  while (i <= a.seqListLength())
>  {
>      seqListPushBack(a.seqListGet(i));
>      i++;
>  }
> 
>  while (j <= b.seqListLength())
>  {
>      seqListPushBack(b.seqListGet(j));
>      j++;
>  }
> }
> ~~~
>
> 以a为基础，小于等于b的时候，说明是b中没有的或者是跟b一样的，入结果；大于b的时候，就后移a；如果a后移到最后都没有比b大的，就说明b后面的全都是a中没有的，就把b中的后面的所有的入结果
>
> ~~~cpp
> //假设两个 元素依值递增有序排列 的线性表A、B分别表示两个集合，求这两个集合的 差集 ,并且要求结果的集合也是递增的有序线性表
> // a和b的差集，就是a-b，就是a-a交b
> template <class slDataType>
> void seqList<slDataType>::Difference(seqList &a, seqList &b)
> {
>  seqList c;
>  c.Same(a, b); // c是ab的交集
> 
>  int i = 1, k = 1;
> 
>  while (i <= a.seqListLength())
>  {
>      while (a.seqListGet(i) < c.seqListGet(k) && i <= a.seqListLength())//a里的元素比交集小，就放到结果里，然后再判断a中的下一个
>      {
>          seqListPushBack(a.seqListGet(i));
>          i++;
>      }
>      while (a.seqListGet(i) > c.seqListGet(k) && i <= a.seqListLength())//a里的元素比交集大，也放到结果里，a以后的元素一定都不小于交集中现在指向的元素，交集应指向下一个元素（如果现在这个不是最后一个的话
>      {
>          seqListPushBack(a.seqListGet(i));
>          i++;
>          if (k < c.seqListLength())
>              k++;
>      }
>      //如果相等，则不入结果，往后比较
>      i++;
>      if (k < c.seqListLength())
>          k++;
>  }
> }
> 
> ~~~

4.假设一个顺序表L中所有元素为整数，设计一个算法调整该顺序表，使表中所有小于0的元素放在大于等于0的元素的后面

> ```cpp
> //假设一个顺序表L中所有元素为整数，设计一个算法调整该顺序表，使表中所有小于0的元素放在大于等于0的元素的后面
> template<class slDataType>
> void seqList<slDataType>::Change()
> {
>     int i=1,j=1;
>     for(j=1;j<=size;j++)
>     {
>         if(elem[j]<0)
>         {
>             int k=elem[j];
>             elem[j]=elem[i];
>             elem[i]=k;
>             i++;
>         }
>     }
> }
> ```
>
> **侦察兵法**，j当侦察兵，如果遇到了小于0的，就跟i进行交换，确保了i经过之后都变成了比0小的

5.设顺序表A中前m个有序，后n个有序，试设计一算法使得整个顺序表有序

> ```cpp
> //设顺序表A中前m个有序，后n个有序，试设计一算法使得整个顺序表有序
> //假设让新顺序表成为递增的：先判断怎么有序的，如果都是递增或者递减，就比较之后让小的进入新顺序表
> //如果一个递增一个递减，就让递增的正着，递减的反着，进行比较，然后进入新顺序表
> //最后新顺序表赋值给原顺序表
> template <class slDataType>
> void seqList<slDataType>::sort_sort(int m, int n)
> {
>     int i, j;
>     seqList New;
> 
>     if (elem[1] <= elem[2]) //如果前m个递增
>     {
>         if (elem[m + 1] <= elem[m + 2]) //如果后n个递增
>         {
>             i = 1;
>             j = m + 1;
>             while (i <= m && j <= m + n)
>             {
>                 if (elem[i] <= elem[j])
>                 {
>                     New.seqListPushBack(elem[i]);
>                     i++;
>                 }
>                 else
>                 {
>                     New.seqListPushBack(elem[j]);
>                     j++;
>                 }
>             }
>             while (i <= m)
>             {
>                 New.seqListPushBack(elem[i]);
>                 i++;
>             }
>             while (j <= m + n)
>             {
>                 New.seqListPushBack(elem[j]);
>                 j++;
>             }
>         }
> 
>         else //如果后n个递减
>         {
>             i = 1;
>             j = m + n;
>             while (i <= m && j >= m + 1)
>             {
>                 if (elem[i] <= elem[j])
>                 {
>                     New.seqListPushBack(elem[i]);
>                     i++;
>                 }
>                 else
>                 {
>                     New.seqListPushBack(elem[j]);
>                     j--;
>                 }
>             }
>             while (i <= m)
>             {
>                 New.seqListPushBack(elem[i]);
>                 i++;
>             }
>             while (j >= m + 1)
>             {
>                 New.seqListPushBack(elem[j]);
>                 j--;
>             }
>         }
>     }
> 
>     else //如果前m个递减
>     {
>         if (elem[m + 1] <= elem[m + 2]) //如果后n个递增
>         {
>             i = m;
>             j = m + 1;
>             while (i >= 1 && j <= m + n)
>             {
>                 if (elem[i] <= elem[j])
>                 {
>                     New.seqListPushBack(elem[i]);
>                     i--;
>                 }
>                 else
>                 {
>                     New.seqListPushBack(elem[j]);
>                     j++;
>                 }
>             }
>             while (i >= 1)
>             {
>                 New.seqListPushBack(elem[i]);
>                 i--;
>             }
>             while (j <= m + n)
>             {
>                 New.seqListPushBack(elem[j]);
>                 j++;
>             }
>         }
> 
>         else //如果后n个递减
>         {
>             i = m;
>             j = m + n;
>             while (i >= 1 && j >= m + 1)
>             {
>                 if (elem[i] <= elem[j])
>                 {
>                     New.seqListPushBack(elem[i]);
>                     i--;
>                 }
>                 else
>                 {
>                     New.seqListPushBack(elem[j]);
>                     j--;
>                 }
>             }
>             while (i >= 1)
>             {
>                 New.seqListPushBack(elem[i]);
>                 i--;
>             }
>             while (j >= m + 1)
>             {
>                 New.seqListPushBack(elem[j]);
>                 j--;
>             }
>         }
>     }
> 
>     int k = 1;
>     while (k <= m + n)
>     {
>         elem[k] = New.seqListGet(k);
>         k++;
>     }
> }
> ```
>
> 解析见注释

#### 结束

That's all, thanks for reading!💐