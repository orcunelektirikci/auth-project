export type RESPONSE = SUCCESS_RESPONSE & ERROR_RESPONSE

export type LOGIN_RESPONSE_DATA = LOGIN_DATA | LOGIN_ERROR

export interface SUCCESS_RESPONSE {
  data: any
}

export interface ERROR_RESPONSE {
  error?: string
  error_description?: string
  message?: string
  status?: number
  statusCode?: number
  statusText?: string
  data?: { message?: string }
  _data?: { message?: string }
}

export interface LOGIN_DATA {
  access_token?: string
  refresh_token?: string
}

export interface LOGIN_ERROR extends ERROR_RESPONSE {}
