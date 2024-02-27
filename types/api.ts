import type { RestVerb, TokenType } from '~/types/request'

export type SupportedAuthProviders = 'sanctum' | 'passport'

type Dictionary = Record<string, string | number>

export interface ApiComposable {
  login: (email: string, password: string) => Promise<any>
  sendRequest: (uri: string, options?: { params?: Dictionary, method?: RestVerb, body?: Dictionary }) => Promise<any>
  fetchUser: () => Promise<any>
  revokeToken: (type: TokenType) => void
  setToken: (type: TokenType, value: string) => void
  reset: () => void
  logout: () => void
}
