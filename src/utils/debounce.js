// 防抖工具：连续调用 fn 时清掉上一次的定时器，只有停止调用 delay 毫秒后才真正执行
export default function debounce(fn, delay = 500) {
  let timer = null
  function debounced(...args) {
    clearTimeout(timer)              // 又来一次调用？把上一次预约的执行作废
    timer = setTimeout(() => {
      fn.apply(this, args)           // 安静了 delay 毫秒，执行最后一次调用
    }, delay)
  }
  debounced.cancel = () => clearTimeout(timer)   // 「立即执行」场景用来取消排队
  return debounced
}
