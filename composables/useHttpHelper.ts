import { useAuthStore } from '~/stores/useAuthStore'
import type { ErrorResponse } from '~/types/response'

export function useHttpHelper() {
  const unAuthenticate = (message: string | undefined) => {
    const authStore = useAuthStore()
    authStore.logout()
    useToastMessage(message || useNuxtApp().$i18n.t('errors.unauthenticated'), 401).showError()
    return navigateTo('/login')
  }

  const notfound = (message: string | undefined) => {
    throw createError({ statusCode: 404, message: message || useI18n().t('errors.notFound'), fatal: true })
  }

  const specialErrorCodes: Record<number, (message: string | undefined) => ReturnType<typeof createError | typeof navigateTo>> = {
    401: unAuthenticate,
    403: unAuthenticate,
    404: notfound,
    405: notfound,
  }

  const parseErrorHandler = (response: ErrorResponse) => {
    const errorHandler = specialErrorCodes[Number(response.status) || response.statusCode || 0]
    const message = response?.data?.message || response?._data?.message || response?.message || response?.statusText || undefined

    if (errorHandler)
      return errorHandler(message)
    else
      useToastMessage(message || '', response.status || response.statusCode || 500)
  }

  return {
    parseErrorHandler,
    unAuthenticate,
    notfound,
  }
}
