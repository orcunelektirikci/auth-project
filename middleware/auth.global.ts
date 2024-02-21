import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((to, _) => {
  const authStore = useAuthStore()

  const middlewares = to.meta?.middleware as null | string[]
  if (!middlewares?.includes('guest') && !authStore.isLoggedIn)
    return navigateTo('/login')
})
