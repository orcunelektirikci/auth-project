export type RESPONSE = SuccessResponse & ErrorResponse

export type LoginResponseData = LoginData | LoginError

export interface SuccessResponse {
  data: any
}

export interface ErrorResponse {
  error?: string
  error_description?: string
  message?: string
  status?: number
  statusCode?: number
  statusText?: string
  data?: { message?: string }
  _data?: { message?: string }
}

export interface LoginData {
  access_token?: string
  refresh_token?: string
}

export interface LoginError extends ErrorResponse {}
