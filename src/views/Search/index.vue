<template>
  <div class="search-page">
    <!-- 搜索框只留页头那一个（全局唯一入口），本页只负责展示结果 -->
    <!-- 四态渲染：加载中 / 没输词 / 没找到 / 有结果 -->
    <div v-if="loading" class="tip">搜索中…</div>
    <div v-else-if="!keyword.trim()" class="tip">请输入关键词搜索</div>
    <div v-else-if="!list.length" class="tip">没有找到与「{{ keyword }}」相关的商品</div>
    <template v-else>
      <p class="count">共 {{ list.length }} 件商品</p>
      <div class="goods-grid">
        <GoodsCard v-for="g in list" :key="g.id" :goods="g" @click="goDetail(g)" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'  
import { useRoute, useRouter } from 'vue-router'
import { searchGoods } from '@/apis/goods'
import GoodsCard from '@/components/GoodsCard.vue'

const route = useRoute()
const router = useRouter()

// 关键词由 watch 从 URL 同步过来（单一数据源）
const keyword = ref('')
const list = ref([])
const loading = ref(false)

watch(
  () => route.query.keyword,
  (val) => {
    const kw = String(val || '')
    keyword.value = kw                  // 同步输入框（页头跳转时，这个词由这里带进页面）
    if (!kw) { list.value = []; return }  // 空词：清空列表，走「请输入关键词」分支
    fetchResults(kw)
  },
  { immediate: true }   // 替代 onMounted：进页面立刻执行一次
)
async function fetchResults(kw) {
  loading.value = true
  try {
    list.value = await searchGoods(kw)
  } catch {
    list.value = []
  } finally {
    loading.value = false
  }
}

function goDetail(g) {
  router.push(`/detail/${g.id}`)
}

</script>

<style scoped>
.search-page {
  max-width: 1200px;
  margin: 20px auto;
}
.count {
  color: #999;
  font-size: 14px;
  margin: 16px 0;
}
.tip {
  padding: 80px 0;
  text-align: center;
  color: #999;
}
.goods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
</style>
