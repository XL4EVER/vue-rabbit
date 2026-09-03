<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { nickname } = storeToRefs(userStore)   // 数据用 storeToRefs（第二课学的）

const cartStore = useCartStore()


const router = useRouter()

function logout() {
  userStore.logout()       // 数据怎么清由 store 说了算
  router.push('/')         // 页面跳转是自己的事，留在组件里
}

</script>

<template>
  <header class="header">
    <!-- 顶部工具条：登录态右对齐，弱化为灰色小字 -->
    <div class="topbar">
      <div class="container">
        <div class="user">
          <router-link v-if="!nickname" to="/login">请先登录</router-link>          
          <template v-else>
            <span>你好，{{ nickname }}</span>
            <a class="logout" @click="logout">退出</a>
          </template>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Logo：真实项目里是图片，今天先用文字 -->
      <a class="logo">小肥圆</a>

      <!-- 导航菜单 -->
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/category/101">分类</router-link>
      </nav>

      <!-- 搜索框 -->
      <div class="search">
        <input type="text" placeholder="搜索商品" />
        <button>搜索</button>
      </div>

      <!-- 购物车入口：徽标实时显示 cart store 的商品总数 -->
      <router-link class="cart" to="/cart">
        🛒 购物车
        <span v-if="cartStore.totalCount > 0" class="cart-badge">{{ cartStore.totalCount }}</span>
      </router-link>
    </div>
  </header>
</template>


<style scoped>
.header {
  /* 不写死高度：内容两段（工具条 + 主行）由内容自然撑开，写死会溢出 */
  background: #fff;
  border-bottom: 1px solid #ddd;
}
.container{
    max-width:1200px;
    margin:0 auto;
    height:60px;
    display:flex;
    align-items:center;
    gap:40px;
}
.logo{
  font-size:34px;
  font-weight: bold;
  color:var(--brand-color);
  font-family:'YouYuan','幼圆','Microsoft YaHei',sans-serif;  /* 新增这行 */
  text-shadow:0 0 1px var(--brand-color); 
}
.nav{
  display:flex;
  font-weight: bold;
  gap:24px;
}
.nav a{
  color:var(--text-color);
  text-decoration:none;
}
.search{
  display:flex;
  border: 1px solid #ddd;
  border-radius:20px;
  overflow:hidden;
}
.search input{
    border:none;
    outline:none;
    padding:8px 16px;
    flex:1;
  }
.search button{
  border:none;
  outline:none;
  margin:4px;              /* 与容器内壁留缝，胶囊才能浮起来 */
  border-radius:16px;      /* 胶囊形状，和购物车呼应 */
  background:#fff6e6;      /* 品牌色浅色调背景，和购物车呼应 */
  color:var(--brand-color);
  font-weight:bold;
  padding:4px 16px;        /* 原 8px 上下，扣掉 4px margin 后总高不变 */
  cursor:pointer;
  transition:all 0.3s;
}
.search button:hover{
  background:var(--brand-color);
  color:#fff;
}

.cart{
  margin-left:auto;
  display:flex;
  align-items:center;
  gap:6px;
  padding:8px 18px;
  border-radius:18px;        /* 胶囊形状 */
  background:#fff6e6;        /* 品牌色的浅色调背景 */
  color:var(--brand-color);
  font-weight:bold;
  font-size:14px;
  text-decoration:none;      /* router-link 渲染成 a，去掉默认下划线 */
  transition:all 0.3s;
  position:relative;  
}
.cart-badge{
  position:absolute;
  top:-6px;
  right:-8px;             /* 冒出一半在胶囊右上角外 */
  min-width:16px;
  height:16px;
  padding:0 4px;
  border-radius:8px;      /* 胶囊一半高度 = 小圆角徽标 */
  background:#e4393c;     /* 电商红，和品牌金区分开，数量才有「提醒」感 */
  color:#fff;
  font-size:12px;
  line-height:16px;       /* 行高=高度，单行文字垂直居中 */
  text-align:center;
  box-sizing:border-box;
}
.cart:hover{
  background:var(--brand-color);
  color:#fff;                /* hover 反转：实底品牌色 + 白字 */
}
.topbar{
  background:#f5f5f5;
  border-bottom:1px solid #eee;
}
.topbar .container{
  height:32px;              /* 覆盖 .container 默认的 60px，工具条更矮 */
  justify-content:flex-end; /* 内容整体靠右 */
}
.user{
  display:flex;
  gap:12px;
  color:#999;
  font-size:13px;
}
.user a{
  color:#999;
  text-decoration:none;
}
.user a:hover{
  color:var(--brand-color);
}
.logout{
  cursor:pointer;
}

</style>