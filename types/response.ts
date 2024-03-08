import type { HasId, PaginationType } from '~/types/store/defaults'

export interface SuccessResponse {
  data: HasId | HasId[]
  meta?: PaginationType
}

export interface ErrorResponse {
  error?: string | number
  error_description?: string
  message?: string
  status?: number | string
  statusCode?: number
  statusText?: string
  data?: { message?: string }
  _data?: { message?: string }
}

export interface LoginData extends SuccessResponse {
  access_token?: string
  refresh_token?: string
  user?: HasId
}

export interface LoginError extends ErrorResponse {}

export type LoginResponse = LoginData | {
  error: LoginError
}

export type HttpResponse = SuccessResponse | {
  error: ErrorResponse
}
