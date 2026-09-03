import goods from "@/mock/goods.json";
import request from'./request'

export function getGoodsByCategory(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(goods.filter((g) => g.categoryId === categoryId));
    }, 500);
  });
}
export function getGoodsById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(goods.find((g) => g.id === id));   // find：找不到返回 undefined
    }, 500);
  });
}
export function searchGoods(keyword) {
  return request.get('/search', { params: { keyword } })
}