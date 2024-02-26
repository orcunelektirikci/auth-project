export interface LoginFields {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterFields {
  name: string
  email: string
  password: string
  password_confirmation: string
}
