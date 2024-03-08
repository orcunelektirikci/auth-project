import type { Obj } from '~/types/objects'

export interface User {
  id: number
  name: string
  email: string
  roles?: string[]
}

export type UserItems = Obj<User>
