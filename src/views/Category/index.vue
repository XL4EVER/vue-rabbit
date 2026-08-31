<template>
    <div class="category-page">
      <div v-if="currentCategory">
        <h2>{{ currentCategory.name }}</h2>
        <p class="count">共 {{ categoryGoods.length }} 个商品</p>
        <div class="goods-grid">
          <div class="card" v-for="g in categoryGoods" :key="g.id">
            <div class="card-img">{{ g.icon }}</div>
            <div class="card-name">{{ g.name }}</div>
            <div class="card-price">¥{{ g.price }}</div>
          </div>                     
        </div>                  
      </div>                          

      <div v-else class="empty">分类不存在</div>
    </div>  
</template>

<script setup>
defineOptions({
  name: 'CategoryPage',
})

import { useRoute } from 'vue-router'
import categories from '@/mock/categories.json'
import goods from '@/mock/goods.json'

const route = useRoute()
const categoryId = Number(route.params.id)   // ⚠️ 字符串转数字

// find：找"第一个满足条件"的元素 → 当前分类对象
const currentCategory = categories.find(c => c.id === categoryId)

// filter：筛出"所有满足条件"的元素 → 该分类下的商品数组
const categoryGoods = goods.filter(g => g.categoryId === categoryId)
</script>

<style scoped>
.category-page{
  max-width: 1200px;
  margin:20px auto;
}
h2 {
  font-size: 22px;
  font-weight: bold;
  border-left: 4px solid var(--brand-color);
  padding-left: 12px;
}

.count {
  color: #999;
  font-size: 14px;
  margin: 8px 0 20px;
  padding-left: 16px;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

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
  background: #f5f5f5;
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

.empty {
  padding: 60px 0;
  text-align: center;
  color: #999;
}
</style>