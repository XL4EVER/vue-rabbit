<template>
  <div class="checkout-page">
    <h2>确认订单</h2>

    <div class="card">
      <h3>收货地址</h3>
      <p class="tip">地址管理功能开发中，暂用默认地址演示</p>
      <p class="addr">{{ nickname }} · 广东省广州市天河区 · 138****8888</p>
    </div>

    <div class="card">
      <h3>商品清单</h3>
      <div v-for="item in selectedItems" :key="item.id" class="goods-row">
        <span class="icon">{{ item.icon }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="price">¥{{ item.price }} × {{ item.count }}</span>
      </div>
      <p v-if="!selectedItems.length" class="tip">
        没有选中任何商品，<router-link to="/cart">去购物车勾选</router-link>
      </p>
    </div>

    <div class="submit-bar">
      <span>共 {{ selectedItems.length }} 种商品，合计：<b>¥{{ selectedTotal }}</b></span>
      <button class="submit-btn" :disabled="submitting || !selectedItems.length" @click="submitOrder">
        {{ submitting ? '提交中…' : '提交订单' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const { nickname } = storeToRefs(userStore)      // 收货人显示昵称
const { selectedItems, selectedTotal } = storeToRefs(cartStore)  // 结算只关心选中的

const submitting = ref(false)   // 防重复提交（阶段 4 登录页同款）

function submitOrder() {
  submitting.value = true
  // 模拟下单请求：真实项目里这里是 POST /api/orders，后端返回成功后再清购物车
  setTimeout(() => {
    cartStore.removeChecked()   // 已购商品从购物车移除，徽标自动减少
    submitting.value = false
    alert('下单成功！')
    router.replace('/')         // replace：返回键不该再回到已下单的结算页
  }, 800)
}
</script>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 20px auto;
}
.card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}
.card h3 {
  font-size: 16px;
  margin-bottom: 12px;
  border-left: 4px solid var(--brand-color);
  padding-left: 10px;
}
.tip {
  color: #999;
  font-size: 14px;
}
.addr {
  font-size: 15px;
  font-weight: bold;
}
.goods-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}
.icon {
  font-size: 32px;
}
.name {
  flex: 1;
}
.price {
  color: var(--brand-color);
  font-weight: bold;
}
.submit-bar {
  background: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}
.submit-bar b {
  color: var(--brand-color);
  font-size: 20px;
}
.submit-btn {
  background: var(--brand-color);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 28px;
  font-size: 15px;
  cursor: pointer;
}
.submit-btn:hover {
  opacity: 0.85;
}
.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
