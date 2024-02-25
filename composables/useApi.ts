import { useSanctum } from '~/composables/useSanctum'
import { usePassport } from '~/composables/usePassport'
import type { ApiComposable, SUPPORTED_AUTH_PROVIDERS } from '~/types/api'

export function useApi() {
  const supportedProviders: Record<SUPPORTED_AUTH_PROVIDERS, () => ApiComposable> = {
    passport: usePassport,
    sanctum: useSanctum,
  }

  const config = useRuntimeConfig()
  const authProvider = config.public?.authProvider || 'sanctum'

  if (!Object.prototype.hasOwnProperty.call(supportedProviders, authProvider))
    throw createError({ statusCode: 500, message: `${authProvider} is not supported!` })

  const provider = supportedProviders[authProvider as SUPPORTED_AUTH_PROVIDERS]
  return provider()
}
