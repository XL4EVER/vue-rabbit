import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

// 登录态全局 store：任何组件/守卫都能读写，避免各处自己读 storage
export const useUserStore = defineStore('user', () => {
  // 初始值从 localStorage 恢复，刷新后登录态还在
  const token = ref(getStorage('token'))
  const nickname = ref(getStorage('nickname'))

  function setLogin(user) {
    token.value = user.token
    nickname.value = user.nickname
    setStorage('token', user.token)        // 内存和 localStorage 双写
    setStorage('nickname', user.nickname)
  }

  function logout() {
    token.value = ''
    nickname.value = ''
    removeStorage('token')
    removeStorage('nickname')
  }

  return { token, nickname, setLogin, logout }
})
