import axios from 'axios'
import { getStorage } from '@/utils/storage'
import mockAdapter from './mockAdapter'

// 创建 axios 实例：统一 baseURL（环境变量配置）、超时时间
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  adapter: mockAdapter // ← 假服务器。真实后端就绪后删掉这一行
})

// 请求拦截器：每次请求自动带上 token
instance.interceptors.request.use(
  (config) => {
    const token = getStorage('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器：剥掉 axios 外壳，只交业务数据
// 约定：code === 1 成功（返回 data），code === 0 失败（统一抛出文案）
instance.interceptors.response.use(
  (response) => {
    if (response.data.code !== 1) {
      return Promise.reject(response.data.message || '请求失败')
    }
    return response.data.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error.message || '网络异常，请稍后重试')
  }
)

export default instance
