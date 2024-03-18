<script lang="ts" setup>
import { z } from 'zod'

import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email').trim(),
  password: z.string().min(3, 'Must be at least 8 characters').trim(),
  remember: z.boolean().default(true),
})

type Schema = z.output<typeof schema>

definePageMeta({
  middleware: ['guest'],
  layout: 'auth',
})

const loginForm = reactive<Schema>({
  email: 'test@example.com',
  password: '123456',
  remember: true,
})

const loading = ref(false)

const authStore = useAuthStore()

async function handleLogin(event: FormSubmitEvent<Schema>) {
  loading.value = true
  const result = await authStore.login(event.data.email, event.data.password, event.data.remember)

  if (result && !result.error) {
    if (authStore.user && authStore.user.roles?.includes('admin'))
      navigateTo('/admin', { replace: true })
    else
      navigateTo('/', { replace: true })
  }

  loading.value = false
}
</script>

<template>
  <UCard class="w-11/12 md:w-9/12 lg:w-1/2  text-md md:text-lg bg-white">
    <template #header>
      <div class="text-center flex flex-col space-y-1 py-2">
        <div class="text-2xl">
          Auth Project
        </div>
        <div class="text-sm">
          Login
        </div>
      </div>
    </template>
    <template #default>
      <UForm :schema="schema" :state="loginForm" class="space-y-4" @submit="handleLogin">
        <FormTextInput v-model="loginForm.email" variant="underline" name="email" label="E-Mail" />
        <FormTextInput v-model="loginForm.password" variant="underline" name="password" label="Password" type="password" />
        <div class="flex flex-col justify-between items-center space-y-8 pt-4">
          <FormCheckbox v-model="loginForm.remember" name="remember" label="Remember Me?" />
          <UButton type="submit" size="xl" block>
            Login
          </UButton>
        </div>
      </UForm>
    </template>
    <template #footer>
      <div class="mt-4 text-center md:w-4/6 lg:w-3/5 mx-auto">
        <p>Don't have an account?</p> <p>
          <NuxtLink to="/register" tag="a" class="text-teal-700">
            Register here
          </NuxtLink>
        </p>
      </div>
    </template>
  </UCard>
</template>

<style scoped></style>
