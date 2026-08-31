<template>
  <header class="header">
    <div class="container">
      <!-- Logo：真实项目里是图片，今天先用文字 -->
      <a class="logo">小肥圆</a>

      <!-- 导航菜单 -->
      <nav class="nav">
        <router-link to="/">首页</router-link>
        <router-link to="/category/101">分类</router-link>
        <router-link to="/login">登录</router-link>
      </nav>

      <!-- 搜索框 -->
      <div class="search">
        <input type="text" placeholder="搜索商品" />
        <button>搜索</button>
      </div>

      <!-- 购物车入口：数量徽标暂时写死，阶段 5 接入 Pinia 后变成活的 -->
      <a class="cart">🛒 购物车(0)</a>
    </div>
  </header>
</template>


<style scoped>
.header {
  height: 60px;
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
  font-size:24px;
  font-weight: bold;
  color:var(--brand-color);
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
      background:var(--brand-color);
      color:#fff;
      padding:8px 16px;
      cursor:pointer;
    }
.cart{
  margin-left:auto;
  color:var(--brand-color);
  font-weight:bold;
}
</style>