import { useSanctum } from '~/composables/useSanctum'
import { usePassport } from '~/composables/usePassport'
import type { SUPPORTED_AUTH_PROVIDERS } from '~/types/api'

export function useApi(): any {
  const supportedProviders: Record<SUPPORTED_AUTH_PROVIDERS, () => void> = {
    passport: usePassport,
    sanctum: useSanctum,
  }

  const config = useRuntimeConfig()

  const authProvider = config.public?.authProvider || 'passport'
  const provider = supportedProviders[authProvider as SUPPORTED_AUTH_PROVIDERS]

  return provider()
}
