import request from './request'

// 下单：POST 请求体放订单数据（items + total），token 由拦截器自动带上
export const createOrderApi = (data) => request.post('/orders', data)
// 我的订单列表
export const getOrdersApi = () => request.get('/orders')
