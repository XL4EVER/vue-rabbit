// Mock 适配器：没有后端时充当「假服务器」
// axios 发出请求后会调用 adapter（网络层），这里不发真实请求，
// 而是按 method + url 查表返回假数据 —— 拦截器、剥壳等链路全部真实走通。
// 换真实后端时：删掉 request.js 里的 adapter 配置、改一下 baseURL 即可。
import users from '@/mock/users.json'

// 假接口路由表
const mockRoutes = [
  {
    method: 'POST',
    url: '/api/login',
    handler(config) {
      // axios 可能把请求体序列化成 JSON 字符串，统一还原成对象
      const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      const user = users.find(
        (u) => u.account === data?.account && u.password === data?.password
      )
      if (!user) return { code: 0, message: '账号或密码错误' }
      // 真实项目的 token 由后端签发，这里用固定格式模拟
      return { code: 1, data: { token: `mock-token-${user.id}`, nickname: user.nickname } }
    }
  }
]

// 把业务数据包成 axios 认识的响应对象（记得带上 config）
function toResponse(config, body) {
  return { data: body, status: 200, statusText: 'OK', headers: {}, config }
}

// adapter 契约：接收 config，返回 Promise<响应对象>
export default function mockAdapter(config) {
  // axios 把 baseURL 的拼接放在内置 adapter（网络层）里做；
  // 我们替换了网络层，所以要自己拼完整路径
  const url = (config.baseURL || '') + config.url
  const method = (config.method || 'get').toUpperCase()   // axios 会把 method 转成小写
  const route = mockRoutes.find((r) => r.method === method && r.url === url)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!route) {
        // 报错文案也顺便用规范化后的 method/url，以后排查更顺眼
        reject(new Error(`Mock 接口不存在: ${method} ${url}`))
        return
      }
      resolve(toResponse(config, route.handler(config)))
    }, 500) // 模拟网络延迟
  })
}

