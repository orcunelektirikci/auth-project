import type { RestVerb, TokenType } from '~/types/request'
import type { Dictionary } from '~/types/objects'
import type { HttpResponse, LoginResponse } from '~/types/response'

export type SupportedAuthProviders = 'sanctum' | 'passport'

export interface ApiComposable {
  login: (email: string, password: string, remember?: boolean) => Promise<LoginResponse | undefined>
  sendRequest: (uri: string, options?: { params?: Dictionary, method?: RestVerb, body?: Dictionary }) => Promise<HttpResponse>
  fetchUser: () => Promise<HttpResponse>
  revokeToken: (type: TokenType) => void
  setToken: (type: TokenType, value: string) => void
  reset: () => void
  logout: () => Promise<void>
}
