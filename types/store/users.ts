export interface User {
  id: number
  name: string
  email: string
  roles?: string[]
}

export interface UserItems {
  [key: number | string]: User
}
