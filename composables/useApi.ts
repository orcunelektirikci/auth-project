import { useSanctum } from '~/composables/useSanctum'
import { usePassport } from '~/composables/usePassport'
import type { ApiComposable, SupportedAuthProviders } from '~/types/api'
import { objHas } from '~/utils/helpers'

export function useApi() {
  const supportedProviders: Record<SupportedAuthProviders, () => ApiComposable> = {
    passport: usePassport,
    sanctum: useSanctum,
  }

  const config = useRuntimeConfig()
  const authProvider = config.public?.authProvider || 'sanctum'

  if (!objHas(supportedProviders, authProvider))
    throw createError({ statusCode: 500, message: `${authProvider} is not supported!`, fatal: true })

  const provider = supportedProviders[authProvider as SupportedAuthProviders]
  return provider()
}
