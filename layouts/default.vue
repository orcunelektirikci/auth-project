<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/useAuthStore'

const { t } = useI18n()
const i18nHead = useLocaleHead()

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  templateParams: {
    siteName: t('general.siteTitle'),
  },
  titleTemplate: '%s | %siteName',
})

useSeoMeta({
  ogTitle: '%s | %siteName',
  twitterTitle: '%s | %siteName',
})

const authStore = useAuthStore()
const api = useApi()
const isLoggedIn = computed(() => authStore.isLoggedIn)

function handleLogout() {
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

function toggleDarkMode() {
  isDark.value = !isDark.value
}

useHead({
  bodyAttrs: {
    class: computed(() => isDark.value ? 'darkModeActive' : ''),
  },
})
</script>

<template>
  <div class="min-h-screen font-sans bg-gradient-to-tl from-primary-lighter dark:from-primary-dark to-primary-lighter dark:to-primary-dark via-accent-lighter dark:via-accent-dark">
    <NavigationHeaderMobileResponsiveBar :items="navItems">
      <template #logo>
        <div class="flex items-center h-full text-primary dark:text-primary-light">
          <NuxtLink to="/">
            Auth Project
          </NuxtLink>
        </div>
      </template>
      <template #outer_buttons>
        <ClientOnly>
          <NavigationLangSwitcher />
        </ClientOnly>
        <div class="p-1 border rounded-full bg-white dark:bg-secondary-darker dark:text-primary-light hover:bg-secondary-lighter dark:hover:bg-secondary cursor-pointer" @click="toggleDarkMode">
          <MoonIcon v-if="!isDark" class="w-6" />
          <SunIcon v-else class="w-6" />
        </div>
      </template>
      <template #action_buttons>
        <UiButton size="md" @click="handleLogout">
          Logout
        </UiButton>
      </template>
    </NavigationHeaderMobileResponsiveBar>
    <main class="px-[2vw] container py-5 mx-auto">
      <slot />
    </main>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    transform: translateY(-50%);
}
</style>
