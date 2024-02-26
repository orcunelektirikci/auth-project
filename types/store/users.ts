export interface User {
  id: number
  name: string
  email: string
  roles?: string[]
}

// Todo:: solve the issue with storing objects in the state
export interface UserItems {
  [key: number | string]: User
}
