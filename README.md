# 小陈 · 个人作品集

一个使用**原生 HTML / CSS / JavaScript** 构建的个人作品集单页网站，无任何框架与第三方依赖。
在线访问：[https://xixi405.github.io/portfolio/](https://xixi405.github.io/portfolio/)

## 功能特性

- **浅色 / 深色主题切换**：侧栏顶部按钮一键切换，遵循系统偏好，选择通过 `localStorage` 持久保存
- **项目分类筛选**：分类与数量由 `data.js` 中的项目数据自动汇总生成，新增项目无需手动维护筛选器
- **滚动导航高亮**：基于 `IntersectionObserver` 实现，滚动到对应区块时侧栏导航自动点亮
- **进入视口渐显动画**：轻微克制的内容浮现效果，并适配 `prefers-reduced-motion`
- **响应式布局**：桌面端左侧固定信息栏 + 右侧主内容；移动端自动切换为顶部堆叠 + 横向滑动导航

## 目录结构

```
lable04/
├── index.html        # 页面结构
├── css/
│   └── style.css     # 样式（CSS 变量驱动的浅色/深色主题）
├── js/
│   ├── data.js       # 个人资料与项目数据（修改内容只需编辑此文件）
│   └── main.js       # 渲染与交互逻辑
└── .gitignore
```

## 本地运行

方式一：直接双击打开 `index.html`。

方式二（推荐）：使用 VS Code 的 Live Server 插件，右键 `index.html` → **Open with Live Server**。

方式三：Python 静态服务器：

```bash
python -m http.server 5500
# 访问 http://localhost:5500
```

## 如何自定义

所有展示内容均集中在 [js/data.js](js/data.js)：

- `PROFILE`：姓名、头像、简介、技能分组、首屏文案等
- `PROJECTS`：项目列表，每项包含名称、分类、描述、亮点、技术栈、图片与链接

在 `PROJECTS` 中新增项目后，分类筛选器会自动出现新分类及对应数量。
