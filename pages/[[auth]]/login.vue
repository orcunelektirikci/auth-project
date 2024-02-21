<script lang="ts" setup>
import type { LOGIN_FIELDS } from '~/types/auth'
import Card from '~/components/UI/Card.vue'
import Button from '~/components/UI/Button.vue'

definePageMeta({
  middleware: ['guest'],
  layout: 'auth',
})

const loginForm = reactive<LOGIN_FIELDS>({
  email: '',
  password: '',
})

const { login } = useApi()

const authStore = useAuthStore()

const handleLogin = async () => {
  const result = await login(loginForm.email, loginForm.password)

  console.log({ result })

  if (!result.error) {
    authStore.setAccessToken(result.access_token)
    authStore.setAuthUser(result.user)
    navigateTo('/', { replace: true })
  }
}
</script>

<template>
  <Card class="md:w-9/12 lg:w-1/2  text-md md:text-lg bg-white">
    <template #title>
      <div class="mb-4 border-b text-center flex flex-col space-y-2 pb-2">
        <div class="text-sm">
          AuthProject
        </div>
        <div>
          Login
        </div>
      </div>
    </template>
    <form class="md:w-9/12 lg:w-2/3  mx-auto" @submit.prevent="handleLogin">
      <div class="flex flex-col space-y-3 mb-10">
        <div class="flex justify-between items-center">
          <label for="email">E-mail</label>
          <input id="email" v-model="loginForm.email" type="email" class="outline-none border rounded px-2 py-1 text-md">
        </div>
        <div class="flex justify-between items-center space-x-4">
          <label for="password">Password</label>
          <input id="password" v-model="loginForm.password" type="password" class="outline-none border rounded px-2 py-1 text-md">
        </div>
      </div>

      <div class="flex items-center justify-between">
        <Button type="submit">
          Login
        </Button>

        <div>
          <label>
            <input type="checkbox" value="remember">
            <span class="ml-2">Remember me?</span>
          </label>
        </div>
      </div>
    </form>

    <div class="mt-4 text-center md:w-4/6 lg:w-3/5 mx-auto">
      <p>Don't have an account?</p> <p>
        <NuxtLink to="/register" tag="a" class="text-primary">
          Register here
        </NuxtLink>
      </p>
    </div>
  </Card>
</template>

<style scoped></style>
