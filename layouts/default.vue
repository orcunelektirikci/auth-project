<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'
import HeaderMobileBar from '~/components/Navigation/HeaderMobileBar.vue'
import Button from '~/components/UI/Button.vue'

const authStore = useAuthStore()
const passport = usePassport()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const handleLogout = () => {
  passport.reset()
  authStore.logout()

  navigateTo('/login')
}

const navItems = [
  {
    to: '/',
    text: 'Home',
    display: isLoggedIn,
  },
  {
    to: '/login',
    text: 'Login',
    display: !isLoggedIn,
  },
  {
    to: '/register',
    text: 'Register',
    display: !isLoggedIn,
  },
  {
    to: '/blog',
    text: 'Blog',
    display: isLoggedIn,
  },
]
</script>

<template>
  <div class="container-full h-[100vh] font-sans bg-gradient-to-b from-teal-50 via-green-200 to-teal-300 ">
    <HeaderMobileBar :items="navItems">
      <template #logo>
        <div class="flex items-center h-full">
          Auth Project
        </div>
      </template>
      <template #action_buttons>
        <Button size="sm" @click="handleLogout">
          Logout
        </Button>
      </template>
    </HeaderMobileBar>
    <main class="px-[2vw]">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>
