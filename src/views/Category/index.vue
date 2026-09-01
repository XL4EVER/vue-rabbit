<template>
    <div class="category-page">
      <div v-if="currentCategory">
        <h2>{{ currentCategory.name }}
          <router-link class="filter-link" :to="`/sub-category/${categoryId}`">高级筛选 →</router-link>
        </h2>
        <p class="count" v-if="!loading" >共 {{ categoryGoods.length }} 个商品</p>
        <div v-if="loading" class="loading">加载中…</div>
        <div v-else class="goods-grid">
          <GoodsCard v-for="g in categoryGoods" :key="g.id" :goods="g" @click="goDetail(g)" />
        </div>                  
      </div>                          

      <div v-else class="empty">分类不存在</div>
    </div>  
</template>

<script setup>
defineOptions({
  name: 'CategoryPage',
})

import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import categories from '@/mock/categories.json'
import { getGoodsByCategory } from '@/apis/goods'
import GoodsCard from '@/components/GoodsCard.vue'

const route = useRoute()
const router = useRouter()
const categoryId = Number(route.params.id)   // ⚠️ 字符串转数字

// find：找"第一个满足条件"的元素 → 当前分类对象
const currentCategory = categories.find(c => c.id === categoryId)

// filter：筛出"所有满足条件"的元素 → 该分类下的商品数组
const categoryGoods = ref([])
const loading=ref(true)
function goDetail(g) {
  router.push(`/detail/${g.id}`)
}
onMounted(async () => {
  categoryGoods.value = await getGoodsByCategory(categoryId)
  loading.value = false
})
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
.empty {
  padding: 60px 0;
  text-align: center;
  color: #999;
}
.loading {
  padding: 60px 0;
  text-align: center;
  color: #999;
}
.filter-link {
  float: right;
  font-size: 14px;
  font-weight:normal;
  color: var(--brand-color);
  text-decoration: none;
}
</style>