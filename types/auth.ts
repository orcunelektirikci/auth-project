export interface LOGIN_FIELDS {
  email: string
  password: string
  remember?: boolean
}

export interface REGISTER_FIELDS {
  name: string
  email: string
  password: string
  password_confirmation: string
}
