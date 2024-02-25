import { useAuthStore } from '~/stores/useAuthStore'
import type { ERROR_RESPONSE } from '~/types/response'

export function useHttpHelper() {
  const unAuthenticate = (message: string | undefined) => {
    const authStore = useAuthStore()
    authStore.logout()
    useToastMessage(401, message || useNuxtApp().$i18n.t('errors.unauthenticated')).showError()
    return navigateTo('/login')
  }

  const notfound = (message: string | undefined) => {
    throw createError({ statusCode: 404, message: message || useI18n().t('errors.notFound') })
  }

  const specialErrorCodes: Record<number, (message: string | undefined) => void> = {
    401: unAuthenticate,
    403: unAuthenticate,
    404: notfound,
    405: notfound,
  }

  const parseErrorHandler = (response: ERROR_RESPONSE) => {
    const errorHandler = specialErrorCodes[response.status || response.statusCode || 0]
    const message = response?.data?.message || response?._data?.message || response?.message || response?.statusText || undefined

    if (errorHandler)
      return errorHandler(message)
    else
      useToastMessage(response.status || response.statusCode || 500, message || '')
  }

  return {
    parseErrorHandler,
    unAuthenticate,
    notfound,
  }
}