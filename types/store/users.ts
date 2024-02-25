export interface USER {
  id: number
  name: string
  email: string
}

// Todo:: solve the issue with storing objects in the state
export interface USER_ITEMS {
  [key: number | string]: USER
}
