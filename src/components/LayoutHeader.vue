<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getStorage, removeStorage } from '@/utils/storage'

// 登录态：ref 包一层，退出后界面才能立即更新（阶段 5 学 Pinia 后改为全局 store）
const nickname = ref(getStorage('nickname'))
const router = useRouter()

function logout() {
  removeStorage('token')
  removeStorage('nickname')
  nickname.value = ''      // 清本地状态，界面立即回到未登录
  router.push('/')
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

      <!-- 购物车入口：数量徽标暂时写死，阶段 5 接入 Pinia 后变成活的 -->
      <router-link class="cart" to="/cart">🛒 购物车</router-link>
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