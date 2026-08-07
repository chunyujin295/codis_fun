---
title: C-指针进阶知识
date: '2024-8-7 22:57'
tag:
  - Cpp
category:
  - Cpp
abbrlink: f389ecbc
---

## C-指针进阶知识

#### 数组指针

```C++
int p1;
int p2[5];
int* p3[5];//
int (*p4)[5] = p3;//数组指针
```

> 1. *与变量名p结合的优先程度是最弱的， * 会优先与前面的类型参数进行结合，而变量又会先与后面的方括号、括号结合，所以如果想说明变量是指针，且变量后又有其他符号跟随，就必须用括号将 *和变量括起来，变成 ( *p )的形式。
>
> 2. p1是int类型的变量
>
> 3. p2的变量类型是`int [5]`，是一个数组，保存int类型的元素
>
> 4. p3的变量类型是`int* [5]`，是一个数组，保存int*类型的元素
>
> 5. p4先与* 结合，p4的变量类型是`int (*)[5]`，是一个指针。指向的是`int [5]`类型，即包含五个int类型元素的数组；即p4存储的是包含5个int类型元素的数组的地址。p4是数组指针
>
>    数组指针p4的值虽然和数组名p3一样，都是数组的起始地址，不过前者是”数组p3这个对象“的起始地址，后者是数组p3内首元素“的起始地址，它们的值完全相同，但是表示的范围跨度就不一样了，从现象上来看，数组指针是以一整个数组的空间为跨度，而数组首地址则是一个元素的空间为跨度
>
>    <img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/image-20240807170034054.png" alt="image-20240807170034054" style="zoom:80%;" />
>
> 
>
> *的本意：解引用



#### 函数指针

```c++
void add1(int);
void (*add2)(int);
```

> 1. add1的变量类型是`void (int)`，是一个函数，特征为参数类型是int，返回值类型为void
> 2. add2的变量类型是`void (*)(int)`，是一个指针，指向特征为：参数类型是int，返回值类型为void 的函数
>
> 函数指针使用时，一般写作：
>
> ```C++
> void (*add2)(int) = add1;
> //add2是一个函数指针，解引用后就是一个函数，所以解引用后用来承接一个函数
> //或者
> void (*add2)(int);
> add2 = &add1;
> //add2是一个函数指针，所以add2用来承接一个函数的地址（函数取地址了）
> ```

void (* test)()的test 不等于 void* test()的test
前者test是一个指向返回值为空、无参数的函数的指针；后者test是一个返回值为void*、无参数的函数

###### add1与&add1

> <mark>`add1`和`add2`（也就是`&add1`）的值一样，都是函数的起始地址，但是类型不一样，含义也不太相同。</mark>
> <mark>`add1`的值是函数的首地址，它的类型是`void  (int)`</mark>
> <mark>`add2`（也就是`&add1`）表示的是一个指向函数`add1`这个对象的指针，它的类型是`void (*)(int)`</mark>
> <mark>`add1`和`add2`（即`&add1`）所代表的地址值是一样的，但是类型不一样</mark>
>
> 为什么要强调这一点？
>
> 因为在一些语言或者框架下，对于类型有比较严格的要求（比如Qt的connect函数），函数指针就必须是函数名取地址(&add1这种)，确保是诸如void (*)(int)这种类型，否则会报错。
>
> C语言中要求没有这么严格，add和&add可以混用，比如add就可以作为下面函数指针数组的元素使用。



#### 函数指针数组

```C++
void (*p[5])(int, int);
```

> p的变量类型是`void (*[5])(int, int)`，是一个数组，保存的元素的类型为`void (*)(int, int)`，是指向`void (int, int)`类型的指针，即指向返回值为空、两个参数为int的函数。
>
> 函数指针数组的使用：转移表
>
> ```C++
> //例如用转移表来写一个计算器
> #include <stdio.h>
> using namespace std;
> 
> int add(int a, int b)
> {
> 	return a + b;
> }
> int sub(int a, int b)
> {
> 	return a - b;
> }
> int mul(int a, int b)
> {
> 	return a * b;
> }
> int div(int a, int b)
> {
> 	return a / b;
> }
> 
> int main()
> {
> 	int x,y;
> 	int input = 1;
> 	int (*p[5])(int, int) = {0, add, sub, mul, div};//转移表
>     //注意这里使用了add(int (int,int)类型)，而不是&add即int(*)(int,int)类型
>     //因为C语言对于这个不是很严格
>     while (input)
>      {
>          printf( "*************************\n" );
>          printf( "  1:add           2:sub  \n" );
>          printf( "  3:mul           4:div  \n" );
>          printf( "*************************\n" );
>          printf( "请选择：" );
>          scanf( "%d", &input);
>          if ((input <= 4 && input >= 1))
>          {
>              printf( "输入操作数：" );
>              scanf( "%d %d", &x, &y);
>              ret = (*p[input])(x, y);
>          }
>          else
>          	printf( "输入有误\n" );
>          printf( "ret = %d\n", ret);
>       }
>  	return 0;
> }
> ```



#### 指向函数指针数组的指针

```c++
int (*(*p)[5]) (int);
```

p是一个指针，指向类型为`int (*[5]) (int)`的对象，该对象是一个数组，存储的元素类型为`int (*)(int)`，即函数指针。所以p是指向函数指针数组的指针



#### 回调函数

如果一个函数B，其指针作为另一个函数A的参数，并再A中被调用了，那么B就称为回调函数。

> 回调函数不是直接就使用的，而是由其他函数作为参数传入后，在某个时期（比如放在顺序执行的某个位置或者满足某个特定的事件、条件）被这个函数调用的。也就是说，调用方先执行自己的语句，回过头来再调用这个函数，所以这个函数叫做“回调函数”

基本结构：
```C++
#include <stdio.h>

typedef void (*Callback)(int);
//回调函数类型名称重命名

void claculateSum(int a, int b,Callback cb)
{
  	int sum = a + b;
  	cb(sum);
  	//调用回调函数，将结果传递给回调函数
}

char* printSum(int sum)//定义回调函数
{
  	printf("计算结果为：%d\n",sum);
  	return "回调函数已调用\n";
}

int main()
{
  	char *ret = caluculateSum(6, 2, printSum);
  	//调用calculateSum函数，并将printSum函数作为回调函数传递
  
  	printf("%s\n", ret);
}

/*
预期结果：
8
回调函数已调用
*/
```

##### typedef的用法

typedef用来为某个类型起别名

```C++
typedef char CHAR;
//为char类型起别名CHAR，这样就可以用CHAR来声明变量了
CHAR c = '1';
```

typedef一次可以为一个类型起多个别名

```C++
typedef int antelope, bagel, mushroom;
//typedef为int取了三个别名
bagel i = 10;
```

typedef可以为数组起别名

```C++
typedef int array[5];
//typedef为int [5]类型的数组取别名
array nums = {1, 2, 3, 4, 5};
```

**由此可以看到，使用typedef取别名的时候，别名的位置就在变量名的位置上**

typedef为函数指针取别名

```C++
typedef void (*func) (int, int);
//为void (*)(int,int)类型取别名
void printAdd(int a, int b)
{
  	printf("%d\n", a + b);
}

func = &printAdd;
```

> typedef的主要好处
>
> 1. 更好的代码可读性
>
>    ```C++
>    typedef char* STRING;
>    
>    STRING name = "chenyujin";
>    ```
>
>    用`STRING`声明变量的时候，就可以轻易辨别该变量是字符串
>
> 2. 为struct、union、enum等命令定义复杂的数据结构创建别名，从而便于引用
>
>    ```C++
>    struct treenode{
>      //...
>    }
>    typedef struct treenode* TreeNode;
>    ```
>
>    `TreeNode`为`struct treenode*`的别名
>
>    也可以在struct定义数据写在一起
>
>    ```C++
>    typedef struct treenode{
>      //...
>    } *TreeNode;
>    ```
>
>    `TreeNode`为`struct treenode*`的别名
>
> 3. 方便以后为变量更改类型
>
> 4. 可移植性
>
>    某一个值在不同计算机上的类型，可能是不一样的。
>
>    ```
>    int i = 100000;
>    ```
>
>    上面代码在32位整数的计算机没有问题，但是在16位整数的计算机就会出错。
>
>    C 语言的解决办法，就是提供了类型别名，在不同计算机上会解释成不同类型，比如`int32_t`。
>
>    ```
>    int32_t i = 100000;
>    ```
>
>    上面示例将变量`i`声明成`int32_t`类型，保证它在不同计算机上都是32位宽度，移植代码时就不会出错。
>
>    这一类的类型别名都是用 typedef 定义的。下面是类似的例子。
>
>    ```
>    typedef long int ptrdiff_t;typedef unsigned long int size_t;typedef int wchar_t;
>    ```
>
>    这些整数类型别名都放在头文件`stdint.h`，不同架构的计算机只需修改这个头文件即可，而无需修改代码。
>
>    因此，`typedef`有助于提高代码的可移植性，使其能适配不同架构的计算机。
>
> 5. 简化类型声明
>
>    C 语言有些类型声明相当复杂，比如下面这个。
>
>    ```
>    char (*(*x(void))[5])(void);
>    ```
>
>    typedef 可以简化复杂的类型声明，使其更容易理解。首先，最外面一层起一个类型别名。
>
>    ```
>    typedef char (*Func)(void);Func (*x(void))[5];
>    ```
>
>    这个看起来还是有点复杂，就为里面一层也定义一个别名。
>
>    ```
>    typedef char (*Func)(void);typedef Func Arr[5];Arr* x(void);
>    ```
>
>    上面代码就比较容易解读了。
>
>    - `x`是一个函数，返回一个指向 Arr 类型的指针。
>    - `Arr`是一个数组，有5个成员，每个成员是`Func`类型。
>    - `Func`是一个函数指针，指向一个无参数、返回字符值的函数。
>
> 该部分参考自[typedef 命令 - 《阮一峰《C 语言教程》》 - 书栈网 · BookStack](https://www.bookstack.cn/read/wangdoc-clang-tutorial/docs-typedef.md)

##### void*的用法

1. `void*`表示”任意类型的指针“，它可以接收任意类型的指针，而不必进行强制类型转换，经常用于作为回调函数中的参数类型，因为这样可以接受任何类型的指针了，包括各种类型的函数指针

2. 当然，`void*` 不只可以用于回调函数，不知用于承接各种函数指针，void* 可以承接各种类型的指针，用于任何你想用的地方

3. `void*`可以直接和其他类型的指针比较存放的地址值是否相同

4. 当要使用`void*`的时候，必须要进行强制类型转换，否则不知道这个指针究竟是什么类型的

   > 这里要补充的是，`承接`和`使用`不同，一个是被赋值，一个是用与进行操作
   >
   > ```C++
   > double d_num = 3.145;
   > void * d_point = &d_num;//承接
   > cout << *(double*)d_point << endl;//使用，此处是打印d_point指向的对象的值
   > ```

5. `void*`和其他所有指针一样，可以通过NULL或nullptr来初始化，表示一个空指针

   > NULL和nullptr的区别，请见“编程日志”的C++目录下的“NULL和nullptr的区别”[C++_NULL和nullptr的区别](https://chunyujin.top/chunyujin/f7a38933)

6. 当`void*`作为函数的输入和输出时，表示可以接受和输出任意类型的指针

   如果函数的参数或返回值可以是任意类型的指针，那么应声明其类型为`void*`

   > 这里是不是和模版有点类似，模版是泛型编程，模版参数也是可以表示任意类型，只不过在使用的时候需要显式表明

