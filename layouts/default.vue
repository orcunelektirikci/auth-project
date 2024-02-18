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
        <li>
          <NuxtLink v-if="!isLoggedIn" to="/login">
            Login
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-if="!isLoggedIn" to="/register">
            Register
          </NuxtLink>
        </li>
        <li>
          <NuxtLink v-if="isLoggedIn" to="/testpage">
            test page
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
