import { defineStore } from 'pinia'
import { ref, computed,watch } from 'vue'
import { getStorage, setStorage } from '@/utils/storage'
const CART_KEY = 'cart-items'   // localStorage 的 key 提成常量，语义化命名
export const useCartStore = defineStore('cart', () => {
  const items = ref((getStorage(CART_KEY) || []).map((i) => ({ ...i, checked: i.checked ?? true })))
  watch(items, (val) => setStorage(CART_KEY, val), { deep: true })


  const totalCount = computed(() => 
    items.value.reduce((sum, item) => sum + item.count, 0)
  )
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.count, 0)
  )
  // 全选：get 判断是否全选中；set 接收 checkbox 传来的布尔值，批量设置
const allChecked = computed({
  get: () => items.value.length > 0 && items.value.every((i) => i.checked),
  set: (val) => items.value.forEach((i) => (i.checked = val))
})
// 选中商品：件数、金额、清单（购物车页合计和结算页都靠它们）
const selectedItems = computed(() => items.value.filter((i) => i.checked))
const selectedCount = computed(() => selectedItems.value.reduce((sum, i) => sum + i.count, 0))
const selectedTotal = computed(() => selectedItems.value.reduce((sum, i) => sum + i.price * i.count, 0))


  function addItem(product) {
    const exist = items.value.find(item => item.id === product.id)
    if (exist) {
      exist.count += product.count || 1
    } else{
      items.value.push({ ...product, count: product.count || 1, checked: true })

    }
  }

  function removeItem(id) {
    const idx = items.value.findIndex(item => item.id === id)
    if (idx > -1) items.value.splice(idx, 1)
  }
  function toggleCheck(id) {
  const item = items.value.find((i) => i.id === id)
  if (item) item.checked = !item.checked
}

  function changeCount(id, count) {
    const item = items.value.find((i) => i.id === id)
    if (item && count >= 1) item.count = count   // 数量下限 1，非法值直接忽略
  }


  function clear() {
    items.value = []
  }
  function removeChecked() {
    items.value = items.value.filter((i) => !i.checked)
  }
  return { items, totalCount, totalPrice, allChecked, toggleCheck, selectedItems, selectedCount, selectedTotal, removeChecked, addItem, removeItem, changeCount, clear }

  

})