import { defineStore } from 'pinia'
import { ref, computed,watch } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
const CART_KEY = 'cart-items'   // localStorage 的 key 提成常量，语义化命名
export const useCartStore = defineStore('cart', () => {
  const items = ref(getStorage(CART_KEY) || [])
  watch(items, (val) => setStorage(CART_KEY, val), { deep: true })


  const totalCount = computed(() => 
    items.value.reduce((sum, item) => sum + item.count, 0)
  )
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.count, 0)
  )

  function addItem(product) {
    const exist = items.value.find(item => item.id === product.id)
    if (exist) {
      exist.count += product.count || 1
    } else {
      items.value.push({ ...product, count: product.count || 1 })
    }
  }

  function removeItem(id) {
    const idx = items.value.findIndex(item => item.id === id)
    if (idx > -1) items.value.splice(idx, 1)
  }
  function changeCount(id, count) {
    const item = items.value.find((i) => i.id === id)
    if (item && count >= 1) item.count = count   // 数量下限 1，非法值直接忽略
  }


  function clear() {
    items.value = []
  }

  return { items, totalCount, totalPrice, addItem, removeItem, clear ,changeCount }
})