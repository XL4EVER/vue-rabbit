<template>
  <div class="orders-page">
    <h2>我的订单</h2>

    <!-- 空状态 -->
    <div v-if="!orders.length" class="empty">
      <p>还没有订单</p>
      <router-link to="/">去逛逛</router-link>
    </div>

    <!-- 订单列表：外层循环订单，内层循环订单里的商品（两层各用自己的 :key） -->
    <template v-else>
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-head">
          <span class="order-id">订单号：{{ order.id }}</span>
          <span class="order-time">{{ order.createdAt }}</span>
          <span class="order-status">{{ order.status }}</span>
        </div>
        <div class="order-body">
          <div v-for="item in order.items" :key="item.id" class="order-goods">
            <span class="name">{{ item.name }}</span>
            <span class="price">¥{{ item.price }} × {{ item.count }}</span>
          </div>
        </div>
        <div class="order-foot">
          <span>合计：<b>¥{{ order.total }}</b></span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getOrdersApi } from '@/apis/order'

const orders = ref([])

onMounted(async () => {
  try {
    orders.value = await getOrdersApi()   // 拦截器已剥壳，直接是数组
  } catch {
    orders.value = []   // 出错兜底成空列表（阶段 3 的老朋友）
  }
})
</script>

<style scoped>
.orders-page {
  max-width: 1200px;
  margin: 20px auto;
}
.order-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 16px;
}
.order-head {
  display: flex;
  gap: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f5f5f5;
  color: #666;
  font-size: 14px;
}
.order-status {
  margin-left: auto;
  color: var(--brand-color);
  font-weight: bold;
}
.order-goods {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}
.order-goods .name {
  flex: 1;
}
.order-goods .price {
  color: #999;
}
.order-foot {
  padding-top: 12px;
  text-align: right;
}
.order-foot b {
  color: var(--brand-color);
  font-size: 18px;
}
.empty {
  text-align: center;
  padding: 80px 0;
  color: #999;
}
.empty a {
  display: inline-block;
  margin-top: 12px;
  padding: 8px 24px;
  background: var(--brand-color);
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
}
</style>
