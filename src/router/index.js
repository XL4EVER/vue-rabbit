import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        { path: '', component: () => import('@/views/Home/index.vue') },
        { path: 'category/:id', component: () => import('@/views/Category/index.vue') },
        { path: 'sub-category/:id', component: () => import('@/views/SubCategory/index.vue') },
        { path: 'detail/:id', component: () => import('@/views/Detail/index.vue') },
        { path: 'cart', component: () => import('@/views/Cart/index.vue'), meta: { requiresAuth: true } },
        { path: 'search', component: () => import('@/views/Search/index.vue') }

      ]
    },
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

// 全局前置守卫：每次跳转前检查登录状态
router.beforeEach((to) => {
  const userStore = useUserStore()   // pinia 已在 main.js 注册，守卫里可以放心用
  if (to.path === '/login' && userStore.token) return '/'
  if (to.meta.requiresAuth && !userStore.token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  return true   // 其余情况放行
})

export default router