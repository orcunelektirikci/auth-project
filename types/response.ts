export interface LOGIN_RESPONSE_DATA {
  data?: LOGIN_DATA | LOGIN_ERROR
}

export interface LOGIN_DATA {
  access_token?: Ref<string>
  refresh_token?: Ref<string>
}

export interface LOGIN_ERROR {
  error: string
  error_description: string
  message: string
}
