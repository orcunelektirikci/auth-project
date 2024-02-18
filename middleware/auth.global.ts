import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((to, _) => {
  const authStore = useAuthStore()

  // @ts-expect-error middleware is either array or null
  if (!to.meta?.middleware?.includes('guest') && !authStore.isLoggedIn)
    return navigateTo('/login')
})
