import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((_, _2) => {
  const authStore = useAuthStore()

  if (authStore.isLoggedIn)
    return navigateTo('/')
})
