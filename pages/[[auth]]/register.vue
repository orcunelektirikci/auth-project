<script lang="ts" setup>
import type { REGISTER_FIELDS } from '~/types/auth'
import Button from '~/components/UI/Button.vue'
import Card from '~/components/UI/Card.vue'

definePageMeta({
  middleware: ['guest'],
  layout: 'auth',
})

const registerForm = reactive<REGISTER_FIELDS>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const handleRegister = () => {
  // Todo::implement
  console.log({ registerForm })
}
</script>

<template>
  <Card class="md:w-9/12 lg:w-1/2 text-md md:text-lg bg-white">
    <template #title>
      <div class="mb-4 border-b text-center flex flex-col space-y-2 pb-2">
        <div class="text-sm">
          AuthProject
        </div>
        <div>
          Register
        </div>
      </div>
    </template>
    <form class="md:w-9/12 lg:w-2/3 mx-auto" @submit.prevent="handleRegister">
      <div class="flex flex-col space-y-3 mb-10">
        <div class="flex justify-between items-center">
          <label for="email">Name</label>
          <input id="email" v-model="registerForm.name" type="text" class="outline-none border rounded px-2 py-1 text-md">
        </div>
        <div class="flex justify-between items-center">
          <label for="email">E-mail</label>
          <input id="email" v-model="registerForm.email" type="email" class="outline-none border rounded px-2 py-1 text-md">
        </div>
        <div class="flex justify-between items-center space-x-4">
          <label for="password">Password</label>
          <input id="password" v-model="registerForm.password" type="password" class="outline-none border rounded px-2 py-1 text-md">
        </div>
        <div class="flex justify-between items-center space-x-4">
          <label for="password">Password Confirmation</label>
          <input id="password" v-model="registerForm.password_confirmation" type="password" class="outline-none border rounded px-2 py-1 text-md">
        </div>
      </div>

      <div class="flex items-center justify-center">
        <Button type="submit">
          Register
        </Button>
      </div>
    </form>

    <div class="text-md mt-4 text-center md:w-4/6 lg:w-3/5 mx-auto">
      <p>
        Have an account?
        <NuxtLink to="/login" tag="a" class="text-blue-500">
          Login
        </NuxtLink>
      </p>
    </div>
  </Card>
</template>

<style scoped></style>
