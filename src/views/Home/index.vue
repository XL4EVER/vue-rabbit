<template>
  <div>
    <h1>首页</h1>
    <button @click="count++">点击次数：{{ count }}</button>
    <p v-if="count >= 3">你已点击 3 次以上！</p>
    <ul>
      <li v-for="item in goods" :key="item.id">
        {{ item.name }} - ¥{{ item.price }}
        <span v-if="item.price > 200">热卖🔥</span>
      </li>
    </ul>
    <button @click="raisePrice">全部涨价 10 元</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);

const goods = ref([
  { id: 1, name: "applewatch", price: 199 },
  { id: 2, name: "iphone", price: 89 },
  { id: 3, name: "ipad", price: 259 },
]);
function raisePrice() {
  goods.value.forEach((item) => {
    item.price += 10;
  });
}
</script>
