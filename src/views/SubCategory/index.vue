<template>
  <div class="sub-page">
    <div v-if="currentCategory">
      <h2>{{ currentCategory.name }}</h2>

      <!-- 筛选标签栏 -->
      <div class="tabs">
        <span
          v-for="t in tabs"
          :key="t"
          :class="{ active: activeTab === t }"
          @click="activeTab = t"
        >{{ t }}</span>
      </div>

      <p class="count" v-if="!loading">共 {{ filteredGoods.length }} 个商品</p>

      <div v-if="loading" class="loading">加载中…</div>
      <div v-else class="goods-grid">
        <!-- 注意：遍历的是 computed 的结果 filteredGoods，不是原始 goods -->
        <GoodsCard v-for="g in filteredGoods" :key="g.id" :goods="g" />
      </div>
    </div>

    <div v-else class="empty">分类不存在</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import categories from '@/mock/categories.json'
import { getGoodsByCategory } from '@/apis/goods'
import GoodsCard from '@/components/GoodsCard.vue' 

const route = useRoute()
const categoryId = Number(route.params.id)
const currentCategory = categories.find(c => c.id === categoryId)

// 异步获取该分类全部商品（和 Category 页同一套逻辑）
const goods = ref([])
const loading = ref(true)
onMounted(async () => {
  goods.value = await getGoodsByCategory(categoryId)
  loading.value = false
})

// 各分类的档位配置表（key = 分类 id，没配置的分类走 defaultTabs）
const rangeMap = {
  1: ['全部', '3000元以下', '3000-10000元', '10000元以上'],   // 手机数码：单价高
  2: ['全部', '1000元以下', '1000-3000元', '3000元以上'],     // 家用电器
}
const defaultTabs = ['全部', '100元以下', '100-500元', '500元以上']
const tabs = computed(() => rangeMap[categoryId] || defaultTabs)
const activeTab = ref('全部')

// 核心：computed 派生数据——activeTab 一变，filteredGoods 自动重算
const filteredGoods = computed(() => {
  const list = goods.value
  const label = activeTab.value
  if (label === '全部') return list   // '全部' 时原样返回

  // 通用解析：从标签文字里提取价格区间 min / max
  let min = 0
  let max = Infinity

  if (label.includes('-')) {
    // '3000-10000元' → 拆成 ['3000', '10000元'] 再转数字
    const parts = label.split('-')
    min = Number(parts[0])
    max = Number(parts[1].replace('元', ''))
  } else if (label.includes('以下')) {
    max = Number(label.replace('元以下', ''))    // '3000元以下' → 3000
  } else if (label.includes('以上')) {
    min = Number(label.replace('元以上', ''))    // '10000元以上' → 10000
  }

  return list.filter(g => g.price >= min && g.price <= max)
})
</script>

<style scoped>
.sub-page {
  max-width: 1200px;
  margin: 20px auto;
}

h2 {
  font-size: 22px;
  font-weight: bold;
  border-left: 4px solid var(--brand-color);
  padding-left: 12px;
  margin-bottom: 20px;
}

/* 标签栏 */
.tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.tabs span {
  padding: 6px 16px;
  border: 1px solid var(--border-color);
  border-radius: 16px;          /* 胶囊形 */
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs span:hover {
  border-color: var(--brand-color);   /* hover 金边金字的过渡态 */
  color: var(--brand-color);
}

.tabs span.active {
  background: var(--brand-color);     /* 选中：金底白字 */
  border-color: var(--brand-color);
  color: #fff;
}

.count {
  color: #999;
  font-size: 14px;
  margin: 8px 0 20px;
}

.goods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.loading {
  padding: 60px 0;
  text-align: center;
  color: #999;
}

.empty {
  padding: 60px 0;
  text-align: center;
  color: #999;
}
</style>