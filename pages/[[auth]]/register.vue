<script lang="ts" setup>
import type { REGISTER_FIELDS } from '~/types/auth'

definePageMeta({
  middleware: ['guest'],
})

const registerForm = reactive<REGISTER_FIELDS>({
  email: '',
  password: '',
  password_confirmation: '',
})

const handleRegister = () => {

}
</script>

<template>
  <form @submit.prevent="handleRegister">
    <div>
      <label for="email">E-mail</label>
      <input id="email" v-model="registerForm.email" type="email">
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" v-model="registerForm.password" type="password">
    </div>
    <div>
      <label for="password">Password Confirmation</label>
      <input id="password" v-model="registerForm.password_confirmation" type="password">
    </div>

    <button type="submit">
      Register
    </button>
  </form>
</template>

<style scoped></style>
