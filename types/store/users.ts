import type { Obj } from '~/types/objects'

export interface User extends Obj<number | string | string[] | undefined> {
  id: number
  name: string
  email: string
  roles?: string[]
}

export type UserItems = Obj<User>
