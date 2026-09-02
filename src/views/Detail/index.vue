<template>
  <div class="detail-page">
    <div v-if="loading" class="loading">加载中…</div>
    <div v-else-if="currentGoods" class="detail-card">
      <div class="detail-icon">{{ currentGoods.icon }}</div>
      <div class="detail-info">
        <h2>{{ currentGoods.name }}</h2>
        <p class="detail-price">¥{{ currentGoods.price }}</p>
        <p class="detail-brand">{{ currentGoods.brand }}</p>
        <p class="detail-desc">{{ currentGoods.description }}</p>
        <div class="buy-box">
          <!-- 数量步进器 -->
          <div class="count-box">
            <button :disabled="count <= 1" @click="count--">−</button>
            <input v-model.number="count" />
            <button @click="count++">+</button>
          </div>
          <button class="buy-btn" @click="addToCart">加入购物车</button>
        </div>
        <p v-show="tipVisible" class="cart-tip">已加入购物车：{{ currentGoods.name }} × {{ count }}
       </p>
      </div>
    </div>

    <div v-else class="empty">商品不存在</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getGoodsById } from '@/apis/goods'

const route = useRoute()
const goodsId = Number(route.params.id)   // 老朋友：字符串转数字

const currentGoods = ref(null)
const loading = ref(true)
onMounted(async () => {
  currentGoods.value = await getGoodsById(goodsId)  // 找不到 → undefined → v-else 兜底
  loading.value = false
})
const count = ref(1)              // 购买数量，初始 1 件
const tipVisible = ref(false)     // 「已加入」提示条的显示状态

function addToCart() {
  if(count.value<1){
    count.value=1
  }
  tipVisible.value = true
  setTimeout(() => {
    tipVisible.value = false      // 2 秒后自动隐藏
  }, 2000)
}

</script>


<style scoped>
.detail-page {
  max-width: 1200px;    /* 版心：老朋友 */
  margin: 20px auto;
}

.detail-card {
  display: flex;        /* 左右两栏 */
  gap: 40px;
  background: #fff;
  border-radius: 8px;
  padding: 40px;
}

.detail-icon {
  width: 400px;
  height: 400px;        /* 正方形大图区 */
  flex-shrink: 0;       /* 窗口变窄时不许被压扁 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 8px;
  font-size: 160px;     /* emoji 放大 10 倍 */
}

.detail-info {
  flex: 1;              /* 占满剩余宽度 */
}

.detail-info h2 {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 16px;
}

.detail-price {
  color: var(--brand-color);   /* 品牌金 */
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
}

.detail-brand {
  color: #999;
  font-size: 14px;
  margin-bottom: 12px;
}

.detail-desc {
  color: #666;
  line-height: 1.8;     /* 行距 1.8 倍，长文案更透气 */
}

/* 加载中和不存在共用一套居中灰字 → 选择器用逗号合并 */
.loading, .empty {
  padding: 60px 0;
  text-align: center;
  color: #999;
}
.buy-box{
  display:flex;
  gap:16px;
  margin-top:30px;
}
.count-box{
  display:flex;
  border:1px solid var(--brand-color);
  border-radius:6px;
  overflow:hidden;
}
.count-box button{
  width:40px;
  height:40px;
  border:none;
  background:#f5f5f5;
  font-size:18px;
  cursor:pointer;
  box-sizing:border-box;
  padding:0;
}
.count-box button:hover{
  background:#eee;
}
.count-box button:disabled{
  color:#ccc;
  cursor:not-allowed;
}
.count-box input{
  box-sizing:border-box;
  padding:0;
  width:50px;
  height:40px;
  border:none;
  text-align:center;
  font-size:16px;
}
.count-box input:focus{
  outline:none;
}
.buy-btn{
  background:var(--brand-color);
  color:#fff;
  border:none;
  border-radius:6px;
  padding:0 28px;
  font-size:16px;
  cursor:pointer;
  transition:all 0.3s;
}
.buy-btn:hover{
  opacity:0.85;
}
.cart-tip{
  margin-top:12px;
  color:var(--brand-color);
  font-size:14px;
}
</style>
