/* =========================================================
   个人作品集 · 数据配置文件（内容来自 profile.md）
   ---------------------------------------------------------
   所有需要展示的内容都集中在这里，修改后刷新页面即可生效。

   ★ 如何新增一个项目：
   往 PROJECTS 数组最上面添加一个新对象（字段与现有项目一致），
   页面会自动渲染，顶部分类筛选器也会自动更新，无需改其他代码。
   ========================================================= */

const PROFILE = {
  name: "小和",
  nameEn: "XIAO HE",                          // 首屏左上角的英文标识
  role: "软件工程专业 · 广州软件学院在读",        // 一句话身份说明
  major: "软件工程",
  location: "中国 · 广州",
  status: "广州软件学院 · 在读",

  avatar:
    "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Stylized%20flat%20vector%20portrait%20of%20a%20young%20developer%20with%20headphones,%20coral%20orange%20and%20cream%20color%20palette,%20minimalist%20geometric%20illustration,%20clean%20solid%20background,%20modern%20avatar&image_size=square",

  // 侧栏一句话简介（取自 profile.md 自我介绍）
  bio: "软件工程专业学生，目前主要关注 AI 辅助开发与大语言模型技术，常用 Python、Java 和 TypeScript 进行项目开发。",

  // 首屏大标题（em 部分会用强调色高亮）
  heroTitle: { before: "关注", em: "AI 辅助开发", after: "与大语言模型应用。" },
  heroLead:
    "我叫小和，是一名软件工程专业学生，目前主要关注 AI 辅助开发与大语言模型技术。平时主要使用 Python、Java 和 TypeScript 项目开发，也在持续学习前后端开发、数据可视化和 AI 应用构建。",

  // 「关于我」正文，数组中每个元素是一段
  about: [
    "我叫小和，是一名软件工程专业学生，目前主要关注 AI 辅助开发与大语言模型技术。",
    "平时主要使用 Python、Java 和 TypeScript 项目开发，也在持续学习前后端开发、数据可视化和 AI 应用构建。",
  ],

  // 侧栏技能分组（均来自 profile.md）
  skills: {
    技能: ["Python", "Java", "TypeScript", "HTML / CSS"],
    方向: ["AI 辅助开发", "大语言模型应用"],
    持续学习: ["前后端开发", "数据可视化", "AI 应用构建"],
  },
};

/* ---------------------------------------------------------
   项目列表：按时间从新到旧排列（内容来自 profile.md）
   字段说明：
   - name        项目名称
   - category    分类（筛选器会自动汇总这里的分类）
   - date        完成时间，格式如 2025.04
   - stack       技术栈（数组）
   - description 项目简介
   - highlights  亮点/功能（数组，展示为强调色小方块列表）
   - image       项目配图（大图，建议 16:9）
   - imageAlt    图片替代文本
   - link / repo 演示与源码链接，暂无可用 "#" 占位
   --------------------------------------------------------- */
const PROJECTS = [
  {
    name: "轻记账 · 极简记账微信小程序",
    category: "移动应用",
    date: "2025.04",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    description:
      "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    highlights: ["语音快捷记账", "月度收支统计", "预算提醒"],
    image:
      "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minimalist%20expense%20tracking%20mobile%20app%20UI%20mockup,%20phone%20screen%20showing%20monthly%20budget%20chart%20and%20expense%20list,%20soft%20teal%20and%20white%20interface,%20modern%20mobile%20design,%20soft%20gradient%20background,%20high%20quality%20screenshot&image_size=landscape_16_9",
    imageAlt: "轻记账小程序界面",
    link: "#",
    repo: "#",
  },
];
