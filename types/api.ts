import type { FETCH_OPTIONS, TOKEN_TYPE } from '~/types/request'

export type SUPPORTED_AUTH_PROVIDERS = 'sanctum' | 'passport'

export interface ApiComposable {
  login: (email: string, password: string) => Promise<any>
  sendRequest: (uri: string, options?: FETCH_OPTIONS) => Promise<any>
  fetchUser: () => Promise<any>
  revokeToken: (type: TOKEN_TYPE) => void
  setToken: (type: TOKEN_TYPE, value: string) => void
  reset: () => void
  logout: () => void
}
