<template>
  <div class="not-found">
    <p class="code">404</p>
    <p class="msg">页面走丢了，去别处逛逛吧</p>
    <router-link class="home-btn" to="/">回首页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: #f5f5f5;
}
.code {
  font-size: 96px;
  font-weight: bold;
  color: var(--brand-color);
  margin: 0;
}
.msg {
  color: #999;
}
.home-btn {
  margin-top: 12px;
  padding: 10px 28px;
  background: var(--brand-color);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
}
.home-btn:hover {
  opacity: 0.85;
}
</style>
