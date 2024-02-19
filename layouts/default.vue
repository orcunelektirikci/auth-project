<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const passport = usePassport()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const handleLogout = () => {
  passport.reset()
  authStore.logout()

  navigateTo('/login')
}
</script>

<template>
  <header>
    <nav>
      <ul>
        <li>
          <NuxtLink to="/">
            Home
          </NuxtLink>
        </li>
        <li v-if="!isLoggedIn">
          <NuxtLink to="/login">
            Login
          </NuxtLink>
        </li>
        <li v-if="!isLoggedIn">
          <NuxtLink to="/register">
            Register
          </NuxtLink>
        </li>
        <li v-if="isLoggedIn">
          <NuxtLink to="/blog">
            blog
          </NuxtLink>
        </li>
        <li v-if="isLoggedIn">
          <button @click="handleLogout">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
</template>

<style scoped>

</style>
