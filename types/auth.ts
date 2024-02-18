export interface User {
  id: number
  name: string
  email: string
}

export interface LOGIN_FIELDS {
  email: string
  password: string
}

export interface REGISTER_FIELDS {
  email: string
  password: string
  password_confirmation: string
}
