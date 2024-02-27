// interface FILTER_PARAMS {
//   field: string
//   value: any
// }

import type { User } from '~/types/store/users'

export interface Blog {
  id: number
  title: string
  body: string
  author: User
}

export interface BlogItems {
  [key: number | string]: Blog
}
