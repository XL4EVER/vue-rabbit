<template>
  <div class="layout">
    <header class="header">头部导航（含购物车入口）</header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">底部信息</footer>
  </div>
</template>

<script setup>
// 可引入购物车 store 显示数量
</script>

<style scoped>
.layout { min-height: 100vh; display: flex; flex-direction: column; }
.header { height: 60px; background: #fff; border-bottom: 1px solid #ddd; }
.main { flex: 1; }
.footer { height: 50px; background: #f5f5f5; }
</style>