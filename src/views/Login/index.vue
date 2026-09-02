<template>
  <div class="login-page">
    <div class="login-card">
      <h2>登录</h2>
      <form @submit.prevent="onSubmit">
        <!-- 字段区、按钮都放这里 -->
        <div class="form-item">
          <label>账号</label>
          <input
            v-model="form.account"
            type="text"
            placeholder="请输入账号"
            @input="errors.account = ''"
          />
          <p v-if="errors.account" class="error">{{ errors.account }}</p>
        </div>
        <div class="form-item">
          <label>密码</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            @input="errors.password = ''"
          />
          <p v-if="errors.password" class="error">{{ errors.password }}</p>
        </div>
        <p v-if="submitError" class="error submit-error">{{ submitError }}</p>
        <button type="submit" class="submit-btn" :disabled="submitting">
          {{ submitting ? '登录中…' : '登录' }}
        </button>
         
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loginApi } from '@/apis/user'
import { setStorage } from '@/utils/storage'

const form = reactive({ account: '', password: '' })   // 表单数据
const errors = reactive({ account: '', password: '' }) // 字段错误提示（空串 = 无错）
const submitError = ref('')   // 表单级错误：账号或密码错误
const submitting = ref(false) // 提交中，防重复提交

const router = useRouter()    // 老朋友：跳转用
const route = useRoute()      // 老朋友：读参数用（这里读 ?redirect=）
function validate() {
  errors.account = ''
  errors.password = ''
  let ok = true
  if (!form.account.trim()) {
    errors.account = '账号不能为空'
    ok = false
  }
  if (!form.password) {
    errors.password = '密码不能为空'
    ok = false
  } else if (form.password.length < 6) {
    errors.password = '密码至少 6 位'
    ok = false
  }
  return ok
}
async function onSubmit() {
  if (!validate()) return
  submitting.value = true
  submitError.value = ''
  try {
    // 成功：loginApi 返回 { token, nickname }（两层壳已在拦截器剥掉）
    const user = await loginApi({ account: form.account, password: form.password })
    setStorage('token', user.token)          // 登录凭证落 localStorage
    setStorage('nickname', user.nickname)    // 昵称也存一份，页头要显示
    router.replace(route.query.redirect || '/')  // 跳回「来路」，没有来路就回首页
  } catch (msg) {
    submitError.value = msg   // 「账号或密码错误」
  } finally {
    submitting.value = false
  }
}
</script>
<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.login-card {
  width: 420px;
  background: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 30px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-color);
}

.form-item input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.form-item input:focus {
  border-color: var(--brand-color);
}

.error {
  margin-top: 6px;
  font-size: 12px;
  color: #d33;
}

.submit-error {
  margin-bottom: 16px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 12px 0;
  border: none;
  border-radius: 6px;
  background: var(--brand-color);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.3s;
}

.submit-btn:hover {
  opacity: 0.85;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>