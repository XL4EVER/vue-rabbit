# 学习进度记录

> 本项目是「电商门户网站」学习项目，面向前端实习生岗位准备。
> 每次学习结束后更新本文件，下次开始时先读这里。

## 技术栈

Vue 3（组合式 API）+ Vite + Vue Router + Pinia + axios（待装）

## 当前进度

### ✅ 阶段 0（已完成）：项目跑起来 + Vue 入门

- Git 初始化、约定式提交（chore/feat）、推送到 GitHub
- Vite 项目结构：index.html → main.js → App.vue → 路由 → 页面
- 嵌套路由 + Layout 布局模式
- Vue 第一课：单文件组件三块结构、{{ }} 插值、v-bind、v-on、v-for + :key、v-if、ref 响应式

### ✅ 阶段 1（已完成）：Layout 页头页脚 + 首页正式版

**功能**：
- 页头：Logo + 导航菜单（router-link）+ 搜索框 + 购物车入口
- 页脚：dl 语义化 4 列链接 + 版权条
- 首页：分类导航（点击高亮）+ 轮播图（圆点切换）+ 商品推荐网格（hover 上浮）

**知识点**：
- 组件拆分（views 页面级 vs components 积木级）、scoped 组件隔离
- flex 布局：display/justify-content/align-items/gap/margin-left:auto 推边
- grid 布局：repeat(n, 1fr) 等分列
- CSS 变量（:root 定义、var() 使用）、全局样式入口（main.js import）
- 响应式第一课：max-width 版心（width 死守 vs max-width 封顶）
- :class 对象绑定、:style 动态样式、v-show（vs v-if）、v-for 带下标、@click 直接赋值
- 伪类 :hover（必须平级带冒号，嵌套写法会编译成后代选择器而失效）
- 后代选择器（.nav a）、绝对定位（relative 锚点 + absolute）、transition/transform 动效
- 浏览器默认样式清零意识（ul 圆点、dd 缩进、a 下划线）
- 白屏排查三步法：终端 → Console → 错误遮罩
- 环境排障实录：nvm node_modules 链接丢失（手动 mklink 修复 + 开"开发人员模式"治本）

### ✅ 阶段 2（已完成）：分类页 + Mock 数据

**功能**：
- Category 分类页：动态路由 /category/:id、商品网格、加载状态、不存在兜底
- SubCategory 二级分类页：价格区间筛选（全部 / 100元以下 / 100-500元 / 500元以上）
- 商品卡片抽成公共组件 GoodsCard：首页 / 分类页 / 筛选页三处复用

**知识点**：
- 路由进阶：动态路由 :id、useRoute（读参数）vs useRouter（跳转）、
  编程式导航 router.push 模板字符串、路由参数永远是字符串（Number() 转换）
- Mock 分层：src/mock/*.json（Vite 原生 JSON 导入）+ src/apis 接口层（为换真实后端留口）
- find/filter 数组方法、Promise + setTimeout 模拟异步、async/await、
  onMounted 生命周期、loading 状态（为 axios 打基础）
- computed 计算属性：缓存派生数据，依赖一变自动重算（筛选即改即生效）
- 组件通信第一课：props 父传子、defineProps 类型校验（type/required）、
  单向数据流（子组件不能改 props，数据在哪定义就在哪修改）
- DRY 原则落地：重复的卡片代码抽成组件，一处修改处处生效（重构后外观不变）
- 排错实录：组件文件名与 import 不一致 → 解析失败白屏（Vite 按文件名精确匹配）

**下次继续（阶段 3）**：
- 商品详情页 Detail：点击卡片跳转、动态路由复用
- 组件通信第二课：自定义事件（子传父）
- Mock 数据扩充（商品增加 description 等字段）

## 常用命令速查

```bash
npm run dev        # 启动开发服务器（每次打开 VSCode 第一件事！VSCode 重启会杀掉终端）
git add .          # 暂存改动
git commit -m "feat: xxx"   # 提交（feat=新功能 fix=修bug docs=文档 chore=杂项）
git push           # 推送到 GitHub
git status         # 查看当前状态
git log --oneline  # 查看提交历史
```

## 面试话术底稿（每阶段扩充）

> 我使用 Vue 3 组合式 API 和 Vite 从零搭建了电商门户项目。项目使用 vue-router
> 嵌套路由实现 Layout 布局复用，页头页脚做组件化拆分；使用 CSS 变量统一管理
> 主题色，通过 flex 与 grid 布局实现页头、分类导航、轮播图（圆点切换）和商品
> 卡片网格等模块，并使用 max-width 版心实现基础响应式；轮播与分类高亮通过
> 响应式数据驱动（:class、v-show）。使用 Pinia 进行购物车状态管理。开发过程
> 使用 Git 进行规范化版本管理（Conventional Commits），并独立排查解决了
> Node 环境（nvm）的链接损坏问题。
>
> 商品模块使用动态路由与 useRoute/useRouter 实现分类页跳转，采用 Mock 分层
> （数据层 + 接口层）配合 Promise 模拟异步请求，结合 onMounted 与 loading
> 状态管理；使用 computed 响应式实现价格区间筛选，并将商品卡片抽成公共组件
> 在三处复用，通过 props 实现父传子通信（单向数据流），遵循 DRY 原则。
