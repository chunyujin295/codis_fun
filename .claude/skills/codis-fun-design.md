---
name: codis-fun-design
description: codis-fun 设计准则 — 在写 UI 代码前调用，确保所有组件遵循侘寂极简风格
---

# codis-fun 设计准则

调用时机：新增页面、修改组件、调整样式、写任何 UI 代码之前。

## 核心哲学

**侘寂 (wabi-sabi) + 极简** — 不完美、安静、留白。温暖单色调，没有鲜艳色彩，没有多余装饰。

三个原则：
1. **安静** — 文字是主角，UI 只提供框架，不抢戏
2. **符号优先** — 能用符号就不要用文字：`←` `→` `∅` 代替 "上一页" "下一页" "无结果"
3. **少即是多** — 每个元素都要问"能删掉吗？"

## Color Palette

```
Light:  bg=#faf8f5  surface=#f3f0eb  text=#2c2419  muted=#8c8273  accent=#9b8c7a
Dark:   bg=#1a1815  surface=#24211c  text=#e8e0d5  muted=#8c8273  accent=#b8a994
```

规则：
- 禁止使用饱和度高的颜色。accent 只用于极少数强调场景
- 所有颜色必须从 CSS 变量取，禁止硬编码 hex
- shadow 极淡（light）或完全不用（dark）

## Typography

| 用途 | 字体 | 字重 |
|------|------|------|
| 标题 (h1–h3) | `--font-serif` (Noto Serif SC) | 400–500 |
| UI 文字、导航、标签 | `--font-sans` (Noto Sans SC) | 300 |
| 代码 | `--font-mono` (JetBrains Mono) | 400 |

规则：
- UI 元素的字重一律 `300`（轻、安静）
- 标题 `font-weight: 500` max，禁止 bold
- 字号统一用 `--text-*` 变量，不硬编码

## Spacing

```
--space-2xs: 0.25rem    --space-xs: 0.5rem    --space-sm: 0.75rem
--space-md: 1.25rem     --space-lg: 2rem      --space-xl: 3.25rem
--space-2xl: 5rem       --space-3xl: 8rem
```

规则：
- 间距全部使用 `--space-*`，不硬编码 px/rem
- 大块留白用 `--space-2xl` 或 `--space-3xl`
- 布局宽度用 `clamp()` 或 `--max-width-*`

## 组件设计模式

### 按钮
- 圆形 (36px × 36px, border-radius: 50%)
- 只有图标，没有文字
- hover: color 变深 + 浅色背景
- 不要边框、不要阴影

### 卡片
- 底部细线分隔 (`1px solid var(--color-border)`)
- hover: 整行右移 (`padding-left`)
- 右边箭头只在 hover 时显示

### 分隔线
- 用 `1px dashed var(--color-border)` + `opacity: 0.6`
- 不要粗线、不要实线（除非是卡片间）

### 搜索
- 触发：圆形图标按钮，和 GitHub/主题切换并排
- 模态：居中浮层，直角边框 (`border-radius: 0`)
- 结果：底部细线分隔，hover 变色
- 快捷键：`Ctrl+K`

### 分页
- 箭头符号 `←` `→`，不要文字
- 居中，顶部细线分隔
- 当前页/总页数：`N / M`

### 目录树 (TOC)
- 左侧 sticky，细线边框
- 平铺缩进，不需要折叠三角形
- 当前章节高亮 (accent 色 + 左边框)
- 900px 以下隐藏

### 标签
- `--text-xs` + `font-weight: 300`
- 浅色背景 + 细边框 + 小圆角
- 不用彩色标签

## 已拒绝的设计

以下设计已被明确拒绝，不要再尝试：
- ❌ 彩色标签/徽章
- ❌ 卡片阴影
- ❌ 大圆角 (>4px，除了圆形按钮)
- ❌ 渐变背景
- ❌ 鲜艳的 hover 效果
- ❌ 装饰性图标（除了必要的功能图标）
- ❌ 多余的提示文字（如"输入关键词开始搜索"）

## 已确认的设计决策

- ✅ 文章页左侧 TOC：fixed 全高，相对宽度 `min(360px, calc((100vw - article) / 2 - 2rem))`，文字换行，深度整行背景色区分，`›` 按钮在右侧边缘，点击平滑滑入/滑出（`translateX`），滚动条 4px 直角无按钮
- ✅ 搜索框：圆形按钮触发 → 居中直角模态
- ✅ 返回首页：单独 `←` 加粗大号
- ✅ 分页：`←` `N/M` `→`
- ✅ 置顶分隔：虚线，紧贴置顶区
- ✅ 置顶区标题：📌 置顶
