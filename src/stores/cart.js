import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

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

  function clear() {
    items.value = []
  }

  return { items, totalCount, totalPrice, addItem, removeItem, clear }
})