// Mock 适配器：没有后端时充当「假服务器」
// axios 发出请求后会调用 adapter（网络层），这里不发真实请求，
// 而是按 method + url 查表返回假数据 —— 拦截器、剥壳等链路全部真实走通。
// 换真实后端时：删掉 request.js 里的 adapter 配置、改一下 baseURL 即可。
import users from '@/mock/users.json'
import goods from '@/mock/goods.json'
// 订单「数据库」：模块级内存数组。切换页面不丢，整页刷新会清空（真实项目在后端）
const orders = []

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
    },   
  },
  {
    method: 'GET',
    url: '/api/goods',
    handler(config) {
      const { categoryId, id } = config.params || {}
      // 老接口迁移：getGoodsById / getGoodsByCategory 统一走这一个端点
      // 用 query 参数区分（假服务器是精确字符串匹配，支持 /:id 要写路径解析器，得不偿失）
      if (id) {
        return { code: 1, data: goods.find((g) => g.id === Number(id)) }  // find 不到返回 undefined，详情页已有兜底
      }
      if (categoryId) {
        return { code: 1, data: goods.filter((g) => g.categoryId === Number(categoryId)) }
      }
      return { code: 1, data: goods }
    }
  },

  {
    method: 'POST',
    url: '/api/orders',
    handler(config) {
      // 真实后端下单必须鉴权：token 由请求拦截器自动带上（阶段 4 的资产）
      if (!config.headers?.get('Authorization')) {
        return { code: 0, message: '请先登录' }
      }
      const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      // 订单号：时间戳 + 随机尾数（真实项目由后端生成，规则更严谨）
      const order = {
        id: 'DD' + Date.now() + Math.floor(Math.random() * 100),
        createdAt: new Date().toLocaleString('zh-CN'),
        items: data.items,
        total: data.total,
        status: '待发货'
      }
      orders.push(order)   // 落库（内存）
      return { code: 1, data: order }
    }
  },
  {
    method: 'GET',
    url: '/api/orders',
    handler(config) {
      // 和下单一同款鉴权；真实后端还会按用户过滤订单，mock 简化成全部返回
      if (!config.headers?.get('Authorization')) {
        return { code: 0, message: '请先登录' }
      }
      return { code: 1, data: orders }
    }
  },

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

