import request from './request'

// 老接口迁移：手写 Promise + setTimeout 时代结束，统一走 axios 链路
export function getGoodsByCategory(categoryId) {
  return request.get('/goods', { params: { categoryId } })
}
export function getGoodsById(id) {
  return request.get('/goods', { params: { id } })
}
export function searchGoods(keyword) {
  return request.get('/search', { params: { keyword } })
}
