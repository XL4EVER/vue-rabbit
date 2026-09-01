<template>
  <div class="card">
    <div class="card-img">{{ goods.icon }}</div>
    <div class="card-name">{{ goods.name }}</div>
    <div class="card-price">¥{{ goods.price }}</div>
  </div>
</template>

<script setup>
defineProps({
  goods: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s;
  overflow: hidden;
  background: #fff;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.card-img {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff3e0;
  font-size: 48px;
}

.card-name {
  font-weight: bold;
  padding: 8px 12px;
}

.card-price {
  color: var(--brand-color);
  font-weight: bold;
  padding: 0 12px 12px;
}
</style>
