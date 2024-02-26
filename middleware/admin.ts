import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (!authStore.isAdmin)
    return navigateTo('/')
})
