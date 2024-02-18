<script lang="ts" setup>
import type { LOGIN_FIELDS } from '~/types/auth'

definePageMeta({
  middleware: ['guest'],
})

const loginForm = reactive<LOGIN_FIELDS>({
  email: '',
  password: '',
})

const { login } = usePassport()
const authStore = useAuthStore()

const handleLogin = async () => {
  const result = await login(loginForm.email, loginForm.password)

  console.log({ result })

  if (result.error) {
    // use toastr here
  }
  else {
    authStore.setAccessToken(result.access_token)
    authStore.setAuthUser(result.user)
    navigateTo('/', { replace: true })
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="email">E-mail</label>
      <input id="email" v-model="loginForm.email" type="email">
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" v-model="loginForm.password" type="password">
    </div>

    <button type="submit">
      Login
    </button>
  </form>
</template>

<style scoped></style>
