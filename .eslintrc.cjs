module.exports = {
    root: true,
    env: { node: true },
    extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
    rules: {
      'vue/multi-word-component-names': 'off',  // 关闭多单词组件名校验
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }