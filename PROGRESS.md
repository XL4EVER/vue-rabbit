# 学习进度记录

> 本项目是「电商门户网站」学习项目，面向前端实习生岗位准备。
> 每次学习结束后更新本文件，下次开始时先读这里。

## 技术栈

Vue 3（组合式 API）+ Vite + Vue Router + Pinia + axios

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

### ✅ 阶段 3（已完成）：商品详情页

**已完成（第一课）**：
- 点击卡片跳转详情：$emit 自定义事件（子传父）——props + emit 构成组件通信闭环；
  emit 第二参数携带数据（事件 payload）
- Detail 详情页：动态路由复用 /detail/:id、getGoodsById（find 找不到返回 undefined 兜底）、
  三态渲染 v-if / v-else-if / v-else、loading 防「商品不存在」闪现
- 单一数据源原则：首页推荐商品改为从接口层取（消灭首页写死数据与 mock 的两份拷贝）
- Mock 数据扩充：商品增加 brand / description 字段
- 轮播图补全：setInterval 自动轮播（% 取模循环）、onUnmounted 清理定时器、
  mouseenter / mouseleave 悬停暂停（启动逻辑抽函数复用）
- 排错实录：Failed to resolve component 警告（import 丢失）、
  同一模块重复 import 报错、漏写 loading.value = false 导致状态卡死、
  script 中 ref 必须 .value（模板才自动解包）

**已完成（第二课）**：
- v-model 双向绑定（语法糖 = :value + @input）、.number 修饰符（input 输入是字符串的坑）
- 数量步进器：:disabled 边界控制（count <= 1）、count-- / count++ 自增减
- 加入购物车占位：提交前数据校验（count < 1 修正为 1）、setTimeout 一次性定时器、
  v-show 提示条（为阶段 5 Pinia 真正落库留口）
- CSS 排错实录：box-sizing: border-box + padding: 0 清除按钮默认内边距、
  :disabled / :hover 伪类必须加在"会被禁用"的元素上（.count-box:disabled 永远不命中）、
  浏览器原生 disabled 样式会伪装成自己的 CSS——F12 Styles 面板验证规则命中

### ✅ 阶段 4（已完成）：登录页 + 登录状态

**功能**：
- 安装 axios + 请求封装：实例（baseURL/timeout）+ 请求拦截器（自动带 token）
  + 响应拦截器（剥壳取数据、统一错误文案）
- 登录 Mock 接口：自定义 axios adapter 充当假服务器（method+url 查表、模拟延迟），
  账号密码校验，按业务状态码约定（code 1 成功 / 0 失败）返回
- 登录页：reactive 表单 + 提交校验（非空/长度）、@submit.prevent、
  try/catch/finally、token/nickname 落 localStorage、router.replace 跳转
- 登录状态守卫：beforeEach 全局前置守卫 + meta.requiresAuth 标记，
  未登录踢去登录页并用 ?redirect= 记来路，登录后跳回原页面
- 页头登录态：两段式页头（顶部工具条 + 主行）、欢迎语/退出、购物车胶囊按钮、
  搜索按钮胶囊化、logo 换幼圆字体
- 购物车占位页 /cart（阶段 5 做真购物车）

**知识点**：
- axios：create 实例、拦截器（中间件思想）、自定义 adapter（替换网络层）、
  业务状态码 vs HTTP 状态码
- reactive vs ref（一组相关字段 vs 单个值）、@submit.prevent（阻止表单默认刷新）、
  try/catch/finally（复位逻辑放 finally）、router.replace vs push（不留历史记录）
- 路由守卫：beforeEach（to/from、返回值三态：true / 路径 / {path,query}）、
  meta 路由元信息、to.fullPath 含查询参数
- 组件内登录态：ref 包 getStorage（普通值不响应，退出后界面不更新的坑）
- 布局与样式：两段式页头、写死高度溢出（内容变多要由内容撑开）、body 默认 margin 清零、
  胶囊按钮（margin 留缝 + padding 减法）、font-family 回退链、幼圆仿粗（text-shadow）、
  @font-face / 字体版权意识（免费可商用）
- 排错实录：mockAdapters 文件名多 s 与 import 不一致（阶段 2 老坑再现）、
  axios 1.x 自定义 adapter 不拼 baseURL（config.url 是原始相对路径、method 是小写）
  ——讲课结论要实测验证；.header 写死 60px 高度溢出（border 贯穿主行）；
  body 默认 8px margin 因工具条变灰而现形（旧 bug 现形）

### ✅ 阶段 5（已完成）：Pinia 购物车 + 登录态全局化

**功能**：
- 详情页「加入购物车」接入真 store（展开+覆盖传数据），页头红色徽标实时显示总数
- 购物车页：空状态（去逛逛）/ 列表（grid 表格）、数量步进（下限 1 禁用）、
  删除、清空、合计（件数+总价）、去结算占位
- 购物车持久化：初始化从 localStorage 恢复 + watch 深监听自动存盘（刷新不丢）
- 登录态升级为全局 user store：登录/退出/路由守卫统一读写 store（单一数据源）

**知识点**：
- Pinia：defineStore（setup store 写法）、useCartStore 单例、store 的 return 即对外 API
  （漏 return changeCount 的坑）、action 思想（改数据唯一入口是 store 方法）
- storeToRefs：解构不丢响应性（数据用 storeToRefs、方法直接拿）
- watch 监听器（vs computed 对比：算值 vs 做事）、deep: true 监听嵌套修改
- 持久化：内存状态 vs localStorage、手写持久化两步法 vs pinia-plugin-persistedstate 插件
- 替换式修改要「加新+删旧」（router 双份守卫教训）、过时注释比没注释更害人
- 按钮两档设计语言（导航工具档浅底 vs 主操作档实底）——视觉层级意识
- 排错实录：eslint 双配置并存（eslint.config.js 生效、.eslintrc.cjs 是僵尸文件），
  配置改了不生效先确认生效的是哪个文件

### ✅ 阶段 6（已完成）：搜索功能

**功能**：
- 搜索 Mock 接口（GET /api/search，name/brand 模糊匹配，空关键词兜底）+ searchGoods 走 axios 链路
- SearchBox 组件抽取：组件 v-model 手写展开（:modelValue + @update:modelValue），受控组件
- 单搜索框方案：页头是全局唯一搜索入口（结果页不放框），
  已在结果页时 replace（不留搜索历史）/ 其他页面 push（保留返回路径）
- 结果页：URL 是唯一入口（watch route.query + immediate 替代 onMounted）、
  四态渲染（搜索中/没输词/没找到/结果网格）、GoodsCard 复用
- 输入防抖：手写 debounce 工具（闭包 + cancel 取消排队），停顿 500ms 自动搜，
  回车/点击立即搜且不重复请求

**知识点**：
- 组件上的 v-model 是语法糖（:modelValue + @update:modelValue）、受控组件模式；
  v-model 与 @update:modelValue 不能重复监听（用前者就别再写后者）
- 同路由跳转组件复用不重建 → onMounted 不重复执行 → watch 路由参数修复
  （经典面试题「同路由不同 query 跳转组件为什么不更新」）+ immediate 选项
- 数据流收敛：URL 是唯一真相，页头改 URL、页面听 URL（单一数据源再升级，
  两个搜索框曾经靠它自动同步）
- 防抖 debounce vs 节流 throttle（面试必考）、闭包管理 timer、
  函数也是对象（可挂 cancel 方法）、clearTimeout 取消排队的执行
- 排错实录：页头改词搜索不生效（组件复用 + 页面不监听 URL）；
  goDetail 贴进 fetchResults 的花括号错位（lint no-unused-vars 兜底）；
  函数写好了忘了挂到模板（no-unused-vars 再兜底）

### ✅ 阶段 7（已完成）：购物车增强 + 结算流程

**功能**：
- 全选/单选：checked 字段入 store（?? 兜底老数据）、allChecked 可写计算属性（get/set）；
  全选视觉只有全部选中才亮对勾（半选保持白底空框，按需求去掉 indeterminate）
- 合计口径切换：页脚合计/件数按选中商品计算（selectedCount/selectedTotal/selectedItems）
- 去结算落地：结算页（收货地址占位 / 选中商品清单 / 合计 / 提交订单）、
  复用 requiresAuth 守卫、未勾选时按钮禁用
- 下单流程：模拟提交 → removeChecked 清已购商品 → 回首页（replace 不留结算页历史）、
  页头徽标自动联动减少

**知识点**：
- 可写计算属性 computed({ get, set })：v-model 的第三种搭档（原生 input / 组件 / computed）
- ?? 空值合并 vs ||：持久化老数据补字段（版本兼容思维）
- :checked + @change 受控写法：改数据唯一入口是 store 方法，不直接 v-model 改 store 数据
- 跨页面共享数据不用传参：结算页直接读 store（全局单例的红利）
- 下单后清理：removeChecked action；replace 阻止返回键回到已下单的结算页
- 排错实录：多文件改动最容易漏接线——事件没挂 @click（按钮点了没反应）、
  return 漏导出新 action（阶段 5 同款坑第三次出现）、函数贴到 return 之后
  （函数声明被 hoisting 提升，语法合法 lint 不报警——lint 保底语法，
  逻辑接线要靠点一遍流程验收）

**下次继续（阶段 8）**：
- 下单 mock 接口：POST /api/orders 走 request 链路（替换结算页的 setTimeout）
- 老接口迁移：getGoodsByCategory / getGoodsById 改走 request（换真后端前统一）
- 订单列表页（我的订单）：下单落库 + 展示

**遗留事项**（择日处理）：
- 可爱字体自托管（阿里妈妈方圆体/站酷快乐体，@font-face + woff2）
- 全局样式大重置（* margin/padding/box-sizing）需全站过一遍视觉

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
>
> 商品详情模块通过自定义事件（$emit）实现子组件向父组件传递点击事件并携带
> 商品数据，结合动态路由跳转至详情页；页面采用三态渲染（加载中/有数据/
> 不存在）兜底异常情况，并遵循单一数据源原则统一从 Mock 接口层取数；轮播图
> 使用 setInterval 定时器实现自动播放与鼠标悬停暂停，在组件销毁时通过
> onUnmounted 清理定时器，防止内存泄漏。
>
> 详情页购买交互使用 v-model 实现数量选择器的双向绑定（配合 .number 修饰符
> 与 :disabled 边界控制），并在提交前对用户输入做数据校验；通过 setTimeout
> 与 v-show 实现加入购物车的即时反馈；CSS 层面使用 box-sizing 统一盒模型，
> 通过 :disabled / :hover 伪类提供交互状态反馈。
>
> 登录模块使用 axios 进行请求封装：通过 axios.create 创建带 baseURL 与超时的
> 实例，请求拦截器统一携带 token（Authorization: Bearer），响应拦截器统一
> 处理业务状态码与错误文案；开发阶段通过自定义 axios adapter 充当 Mock 假
> 服务器（按 method+url 查表返回数据并模拟延迟），切换真实后端时仅需删除
> 一行配置。登录页使用 reactive 管理表单数据，提交前做非空与长度校验，
> 登录成功后 token 存入 localStorage 并用 router.replace 跳转；路由层通过
> 全局前置守卫 beforeEach 结合 meta 元信息实现登录状态守卫，未登录访问受
> 保护页面时重定向到登录页，同时用 query 参数记录来路，登录成功后跳回原
> 页面，形成完整闭环。
>
> 状态管理方面，使用 Pinia 管理购物车与登录态：商品加入购物车时展开商品数据并
> 携带数量写入 store，页头徽标通过 computed 总数实时联动；购物车页使用
> storeToRefs 保持解构后的响应性，数量变更、删除、清空等操作统一封装为
> store 的 action，保证修改逻辑单一入口；并通过 watch 深监听实现购物车
> 数据自动持久化到 localStorage，刷新不丢失。登录态同样收敛为全局 user
> store，路由守卫与页头统一读写同一数据源。此外排查修复了 ESLint 双配置
> 并存的历史问题（旧版 .eslintrc 与新版 flat config 同时存在，只有后者生效）。
>
> 搜索模块通过组件 v-model 的手写展开（:modelValue + @update:modelValue）
> 实现受控 SearchBox 组件，页头作为全局唯一搜索入口；搜索词通过 URL query
> 传递，结果页用 watch 监听路由参数（immediate 选项）驱动请求——解决同一
> 路由跳转时组件复用不重建、onMounted 不重复执行的问题，保证直接输 URL、
> 页头改词、刷新恢复三种入口行为一致；输入框通过手写 debounce 工具实现
> 防抖自动搜索（闭包管理定时器，附带 cancel 取消机制），回车与点击立即
> 搜索并先取消排队中的自动请求，避免重复网络请求。
>
> 购物车与结算模块通过可写计算属性（computed get/set）实现全选联动，
> 单选采用 :checked + @change 的受控写法，保证修改数据的唯一入口是 store
> 的 action；合计与商品清单按选中口径计算，结算页直接读取全局 store 的
> 选中数据实现跨页面共享，无需路由传参；结算路由复用登录守卫，下单成功
> 后通过 action 清理已购商品并用 router.replace 返回首页，避免历史记录
> 残留已提交的结算页；兼容性方面使用空值合并运算符（??）为 localStorage
> 中的旧版购物车数据补齐新增字段，保证持久化数据平滑升级。
