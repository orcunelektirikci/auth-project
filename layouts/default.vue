<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/useAuthStore'
import HeaderMobileBar from '~/components/Navigation/HeaderMobileBar.vue'
import Button from '~/components/UI/Button.vue'

const authStore = useAuthStore()
const api = useApi()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const handleLogout = () => {
  api.reset()
  authStore.logout()

  navigateTo('/login')
}

const navItems = [
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

const isDark = ref(false)
const html = document.querySelector('html') as HTMLHtmlElement

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  html.classList.toggle('darkModeActive')
}
</script>

<template>
  <div class="min-h-screen font-sans bg-gradient-to-tl from-primary-lighter dark:from-primary-dark to-primary-lighter dark:to-primary-dark via-accent-lighter dark:via-accent-dark">
    <HeaderMobileBar :items="navItems">
      <template #logo>
        <div class="flex items-center h-full text-primary dark:text-primary-light">
          <NuxtLink to="/">
            Auth Project
          </NuxtLink>
        </div>
      </template>
      <template #outer_buttons>
        <div class="p-1 border rounded-full bg-white dark:bg-secondary-darker dark:text-primary-light hover:bg-secondary-lighter dark:hover:bg-secondary cursor-pointer" @click="toggleDarkMode">
          <MoonIcon v-if="!isDark" class="w-6" />
          <SunIcon v-else class="w-6" />
        </div>
      </template>
      <template #action_buttons>
        <Button size="md" @click="handleLogout">
          Logout
        </Button>
      </template>
    </HeaderMobileBar>
    <main class="px-[2vw] container">
      <slot />
    </main>
  </div>
</template>

<style scoped>

</style>
