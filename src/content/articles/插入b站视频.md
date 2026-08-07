---
title: 插入b站视频
date: '2023-7-29 14:23'
tag: Typora
category:
  - Skill
  - Typora
abbrlink: 44d47125
---

在b站视频点击分享，获取“嵌入代码”

<img src="https://map--depot.oss-cn-hangzhou.aliyuncs.com/image/202307291412908.png" alt="截屏2023-07-29 14.12.17" style="zoom:50%;" />

如上图，获取的嵌入代码为：

```html
<iframe src="//player.bilibili.com/player.html?aid=247120140&bvid=BV1Av411a7bt&cid=307398204&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
```

设置一下视频的长度、宽度、画质、弹幕开关、填充情况，并且关闭自动播放，如下：

```html
<iframe src="//player.bilibili.com/player.html?aid=247120140&bvid=BV1Av411a7bt&cid=307398204&page=1&high_quality=1&danmaku=0&autoplay=0" allowfullscreen="allowfullscreen" width="100%" height="500" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
```

## 代码讲解

```javascript
BILIBILI 地址PC端参数
    &high_quality=1   (1=最高画质 0=最低画质)
    &danmaku=0   (1=打开弹幕 0=关闭弹幕)
iframe 参数
    allowfullscreen="allowfullscreen" #移动端全屏
    sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts" #禁止弹出网页
```

| 属性         | 值                                                           | 描述                                                         |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| align        | left right top middle bottom                                 | 不赞成使用。请使用样式代替。规定如何根据周围的元素来对齐此框架。 |
|              |                                                              |                                                              |
| frameborder  | 10                                                           | 规定是否显示框架周围的边框。                                 |
| height       | pixels%                                                      | 规定 iframe 的高度。                                         |
| longdesc     | URL                                                          | 规定一个页面，该页面包含了有关iframe 的较长描述。            |
|              |                                                              |                                                              |
| marginheight | pixels                                                       | 定义 iframe的顶部和底部的边距。                              |
|              |                                                              |                                                              |
| marginwidth  | pixels                                                       | 定义 iframe的左侧和右侧的边距。                              |
|              |                                                              |                                                              |
| name         | frame_name                                                   | 规定 iframe 的名称。                                         |
| sandbox      | “”allow-formsallow-same-originallow-scriptsallow-top-navigation | 启用一系列对 <_iframe> 中内容的额外限制。                    |
| scrolling    | yesnoauto                                                    | 规定是否在 iframe中显示滚动条。                              |
|              |                                                              |                                                              |
| seamless     | seamless                                                     | 规定 <_iframe> 看上去像是包含文档的一部分。                  |
| src          | URL                                                          | 规定在 iframe中显示的文档的 URL。                            |
|              |                                                              |                                                              |
| srcdoc       | HTML_code                                                    | 规定在 <_iframe> 中显示的页面的 HTML 内容。                  |
| width        | pixels%                                                      | 定义 iframe 的宽度。                                         |



效果展示：

<iframe src="//player.bilibili.com/player.html?aid=247120140&bvid=BV1Av411a7bt&cid=307398204&page=1&high_quality=1&danmaku=0&autoplay=0" allowfullscreen="allowfullscreen" width="100%" height="500" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>