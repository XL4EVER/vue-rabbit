<template>
  <footer class="footer">
    <div class="container">
      <div class="links">
        <dl>
          <dt>购物指南</dt>
          <dd>购物流程</dd>
          <dd>会员介绍</dd>
          <dd>常见问题</dd>
        </dl>
        <dl>
          <dt>配送方式</dt>
          <dd>配送范围</dd>
          <dd>配送费用</dd>
        </dl>
        <dl>
          <dt>售后服务</dt>
          <dd>退换货政策</dd>
          <dd>客服中心</dd>
        </dl>
        <dl>
          <dt>关于我们</dt>
          <dd>公司简介</dd>
          <dd>联系我们</dd>
        </dl>
      </div>
      <div class="copyright">© 2026 小肥圆商城 版权所有 all rights reserved</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #f5f5f5;
  padding:30px 0;
  color:var(--text-color);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.links {
  display: flex;
  justify-content: space-between;
}

.links dt {
  font-weight: bold;
  margin-bottom: 12px;
}

.links dd {
  margin: 0;              /* 关键！浏览器默认给 dd 加了 40px 左缩进，必须清零 */
  color: var(--text-color);
  font-size: 14px;
  line-height: 28px;
}

.copyright {
  margin-top: 30px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
  text-align: center;
  font-size: 14px;
  color: var(--text-color);
}
</style>