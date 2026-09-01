<template>
  <div class="banner-area">
    <!-- flex 横排 + 版心 -->
    <ul class="category">
      <li
        v-for="c in categories"
        :key="c.id"
        :class="{ active: currentId === c.id }"
        @click="goCategory(c)"
      >
        {{ c.name }}
      </li>
    </ul>
    <div class="banner" @mouseenter="stopCarousel" @mouseleave="startCarousel">
      <!-- 3 个渐变块，只有 current === i 的显示 -->
      <div
        class="banner-item"
        v-for="(b, i) in banners"
        :key="b.id"
        v-show="current === i"
        :style="{ background: `linear-gradient(90deg, ${b.from}, ${b.to})` }"
      >
        {{ b.text }}
      </div>
      <!-- 圆点指示器 -->
      <div class="dots">
        <span
          v-for="(b, i) in banners"
          :key="b.id"
          :class="{ active: current === i }"
          @click="current = i"
        ></span>
      </div>
    </div>
  </div>
  <!-- 商品推荐 -->
<div class="goods">
  <h2>热门推荐</h2>
  <div class="goods-grid">
    <GoodsCard v-for="g in goods" :key="g.id" :goods="g" @click="goDetail(g)" />
  </div>
</div>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { getGoodsByCategory } from '@/apis/goods'
import GoodsCard from '@/components/GoodsCard.vue'


const router=useRouter();
function goCategory(c){
  currentId.value=c.id;
  router.push(`/category/${c.id}`);
}
function goDetail(g) {
  router.push(`/detail/${g.id}`)
}

defineOptions({
  name: "HomeIndex",
});

// 分类数据（后面阶段会改成从接口拿，现在先写死——Mock 思想的第一步）
const categories = ref([
  { id: 1, name: "数码产品" },
  { id: 2, name: "家用电器" },
  { id: 3, name: "服装鞋包" },
  { id: 4, name: "食品生鲜" },
  { id: 5, name: "美妆个护" },
  { id: 6, name: "运动户外" },
  { id: 7, name: "图书文具" },
  { id: 8, name: "母婴玩具" },
]);
const currentId = ref(null); // 当前选中的分类 id

// Banner 数据：3 张"图"先用渐变背景块代替，避免外链图片失效
const banners = ref([
  { id: 1, text: "罐罐首发 5 折起", from: "#ffd2a0", to: "#ff9a62" },
  { id: 2, text: "开饭季 肚肚狂欢", from: "#e0c3fc", to: "#8ec5fc"},
  { id: 3, text: "秋季上新 满 300 减 50", from: "#a0e8ff", to: "#62b4ff" },
]);
const current = ref(0); // 当前显示的 Banner 下标（从 0 开始数，数组下标知识）
const goods = ref([])
let timer = null

// 启动轮播：挂载时和鼠标移出时都要用 → 抽成函数复用
function startCarousel() {
  timer = setInterval(() => {
    current.value = (current.value + 1) % banners.value.length
  }, 2000)
}

// 暂停轮播：清掉定时器就是暂停
function stopCarousel() {
  clearInterval(timer)
}

onMounted(async () => {
  const digitalGoods = await getGoodsByCategory(1)  // 数码产品分类
  goods.value = digitalGoods.slice(0, 5)            // 截取前 5 个上推荐位
  startCarousel()   // ← 原来那两行 setInterval 换成这一句
})

onUnmounted(() => {
  clearInterval(timer)
})


</script>

<style scoped>
.banner-area {
  display: flex;
  max-width: 1200px;
  margin: 20px auto;
  gap: 20px;
}
.category{
  width:240px;
  background:#f5f5f5;
  list-style:none;
  padding:0;
  margin:0;
}
.category li{
  padding:14px 20px;
  cursor:pointer;
}
.category li:hover{
  background:#ffe8cc;
}
.category li.active{
  background:var(--brand-color);
  color:#fff;
}
.banner{
  flex:1;
  position:relative;
  height:400px;
  overflow:hidden;
  border-radius:8px;
}
.banner-item{
  position:absolute;
  inset:0;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:32px;
  font-weight:bold;
  color:#fff;
}
.dots{
  position:absolute;
  bottom:20px;
  left:0;
  right:0;
  text-align:center;
}
.dots span{
  display:inline-block;
  width:10px;
  height:10px;
  border-radius:50%;
  background:rgba(255,255,255,0.5);
  margin:0 4px;
  cursor:pointer;
}
.dots span.active{
  background:var(--brand-color);
}
.goods{
  max-width: 1200px;
  margin: 40px auto;
}
h2{
  font-size:22px;
  font-weight:bold;
  border-left:4px solid var(--brand-color);
  padding-left:12px;
}
.goods-grid {
  display: grid;                            /* ① 开启网格 */
  grid-template-columns: repeat(5, 1fr);    /* ② 5 列，每列等宽 */
  gap: 20px;                                /* ③ 格子间距（行列同时生效） */
}
</style>
