# 学习进度记录

> 本项目是「电商门户网站」学习项目，面向前端实习生岗位准备。
> 每次学习结束后更新本文件，下次开始时先读这里。

## 技术栈

Vue 3（组合式 API）+ Vite + Vue Router + Pinia + axios（待装）

## 当前进度

### ✅ 阶段 0（已完成）：项目跑起来 + Vue 入门

- Git 初始化、约定式提交（chore/feat）、推送到 GitHub
- 理解了 Vite 项目结构：index.html → main.js → App.vue → 路由 → 页面
- 理解了嵌套路由 + Layout 布局模式
- Vue 第一课：单文件组件三块结构、{{ }} 插值、v-bind、v-on、v-for + :key、v-if、ref 响应式
- 在首页 Home/index.vue 完成了练习：计数器 + 商品列表 + 涨价按钮 + 热卖标记

### 🔜 阶段 1（下次开始）：Layout 页头 + 首页正式版

- 把 Layout 里的占位文字换成真正的页头：Logo + 导航菜单 + 搜索框 + 购物车入口
- 首页正式版：分类导航 + 轮播图 Banner + 商品推荐区块
- 知识点：组件拆分、flex 布局、CSS 变量
- 对应岗位要求：HTML+CSS 布局能力

## 常用命令速查

```bash
npm run dev        # 启动开发服务器（热更新）
git add .          # 暂存改动
git commit -m "feat: xxx"   # 提交（feat=新功能 fix=修bug docs=文档 chore=杂项）
git push           # 推送到 GitHub
git status         # 查看当前状态
```

## 面试话术底稿（每阶段扩充）

> 我使用 Vue 3 组合式 API 和 Vite 从零搭建了电商门户项目。项目使用 vue-router
> 嵌套路由实现 Layout 布局复用（页头/页脚共享），使用 Pinia 进行购物车状态管理，
> 并通过 axios 封装统一处理请求拦截。开发过程使用 Git 进行规范化的版本管理
> （Conventional Commits）。
