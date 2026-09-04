<template>
  <div class="cart-page">
    <h2>购物车</h2>

    <!-- 空状态 -->
    <div v-if="!items.length" class="empty">
      <p>🛒 购物车还是空的</p>
      <router-link to="/">去逛逛</router-link>
    </div>

        <!-- 有货状态 -->
    <template v-else>
      <div class="cart-table">
        <div class="cart-head">
          <span></span><span>商品信息</span><span>单价</span><span>数量</span><span>小计</span><span>操作</span>
        </div>
        <div v-for="item in items" :key="item.id" class="cart-row">
          <div class="check-cell">
            <input type="checkbox" :checked="item.checked" @change="toggleCheck(item.id)" />
          </div>
          <div class="goods">
            <span class="goods-icon">{{ item.icon }}</span>
            <span class="goods-name">{{ item.name }}</span>
          </div>
          <span>¥{{ item.price }}</span>
          <div class="count-box">
            <button :disabled="item.count <= 1" @click="changeCount(item.id, item.count - 1)">−</button>
            <span class="count">{{ item.count }}</span>
            <button @click="changeCount(item.id, item.count + 1)">+</button>
          </div>
          <span class="subtotal">¥{{ item.price * item.count }}</span>
          <a class="del" @click="removeItem(item.id)">删除</a>
        </div>
      </div>

      <div class="cart-footer">
        <label class="check-all">
          <input type="checkbox" v-model="allChecked" />
          全选
        </label>
        <span>已选 <b>{{ selectedCount }}</b> 件，合计：<b class="total">¥{{ selectedTotal }}</b></span>
        <button class="clear-btn" @click="clear">清空购物车</button>
        <button class="pay-btn" :disabled="!selectedCount" @click="goCheckout">去结算({{ selectedCount }})</button>

      </div>
    </template>

  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter()
const cartStore = useCartStore()
const { items, allChecked, selectedCount, selectedTotal } = storeToRefs(cartStore)
const { changeCount, removeItem, clear, toggleCheck } = cartStore
function goCheckout() {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 20px auto;
}
.cart-table {
  background: #fff;
  border-radius: 8px;
  padding: 0 20px;
}
.cart-head {
  padding: 14px 0;
  color: #999;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.cart-row {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}
.goods {
  display: flex;
  align-items: center;
  gap: 12px;
}
.goods-icon {
  font-size: 40px;
}
.count-box {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: fit-content;      /* 收缩到内容宽度，不占满整列 */
}
.count-box button {
  width: 26px;
  height: 26px;
  border: none;
  background: none;
  cursor: pointer;
}
.count-box button:disabled {
  color: #ccc;
  cursor: not-allowed;
}
.count {
  padding: 0 8px;
  font-size: 14px;
}
.subtotal {
  color: var(--brand-color);
  font-weight: bold;
}
.del {
  color: #999;
  font-size: 13px;
  cursor: pointer;
}
.del:hover {
  color: #d33;
}
.cart-footer {
  margin-top: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}
.cart-footer b {
  color: var(--brand-color);
}
.total {
  font-size: 20px;
}
.clear-btn {
  margin-left: auto;       /* 老朋友：把清空和结算推到最右 */
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  color: #666;
}
.pay-btn {
  background: var(--brand-color);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 24px;
  cursor: pointer;
}
.empty {
  text-align: center;
  padding: 80px 0;
  color: #999;
}
.empty a {
  display: inline-block;
  margin-top: 12px;         /* 和上面的文案拉开点距离 */
  padding: 8px 24px;
  background: var(--brand-color);
  color: #fff;
  text-decoration: none;    /* 去掉 a 标签默认下划线 */
  border-radius: 6px;
  font-size: 14px;
}
.empty a:hover {
  opacity: 0.85;
}
.cart-head, .cart-row {
  display: grid;
  grid-template-columns: 40px 2fr 1fr 1fr 1fr 80px;  /* 最前面加 40px 复选框列 */
  align-items: center;
  gap: 12px;
}
.check-cell {
  text-align: center;
}
.check-cell input, .check-all input {
  accent-color: var(--brand-color);  /* 原生复选框染成品牌色 */
  cursor: pointer;
}
.check-all {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  cursor: pointer;
}
.pay-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

</style>