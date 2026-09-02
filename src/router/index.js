import { createRouter, createWebHistory } from 'vue-router'
import { getStorage } from '@/utils/storage'

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
        { path: 'cart', component: () => import('@/views/Cart/index.vue'), meta: { requiresAuth: true } }
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
  const token = getStorage('token')
  // 规则 1：已登录的人访问登录页 → 直接回首页
  if (to.path === '/login' && token) return '/'
  // 规则 2：未登录的人访问「需要登录」的页面 → 去登录页，并把来路记在 redirect 里
  if (to.meta.requiresAuth && !token) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  return true   // 其余情况放行
})

export default router