export type REST_VERB = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'PATCH' | 'patch' | 'DELETE' | 'delete'

export interface FETCH_OPTIONS {
  method?: REST_VERB
  headers?: Record<string, string>
  body?: object | null
}

export type TOKEN_TYPE = 'access_token' | 'refresh_token'