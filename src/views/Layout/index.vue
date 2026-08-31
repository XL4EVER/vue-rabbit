<script setup>
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
</script>

<template>
  <div class="layout">
    <LayoutHeader />
    <main class="main">
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
.layout { min-height: 100vh; display: flex; flex-direction: column; }
.main { flex: 1; }
</style>