import type { StrObj } from '~/types/objects'

export type RestVerb = 'GET' | 'get' |
  'POST' | 'post' |
  'PUT' | 'put' |
  'PATCH' | 'patch' |
  'DELETE' | 'delete' |
  'OPTIONS' | 'options'

export interface FetchOptions {
  method?: RestVerb
  headers?: StrObj
  body?: object | null
  baseURL?: string
}

export type TokenType = 'access_token' | 'refresh_token'

export interface SubResourceBody {
  id: number | string
  subResourceStoreName: string
}
