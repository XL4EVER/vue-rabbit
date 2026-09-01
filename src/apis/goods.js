import goods from "@/mock/goods.json";

export function getGoodsByCategory(categoryId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(goods.filter((g) => g.categoryId === categoryId));
    }, 500);
  });
}
