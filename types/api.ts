import type { FetchOptions, TokenType } from '~/types/request'

export type SupportedAuthProviders = 'sanctum' | 'passport'

export interface ApiComposable {
  login: (email: string, password: string) => Promise<any>
  sendRequest: (uri: string, options?: FetchOptions) => Promise<any>
  fetchUser: () => Promise<any>
  revokeToken: (type: TokenType) => void
  setToken: (type: TokenType, value: string) => void
  reset: () => void
  logout: () => void
}
