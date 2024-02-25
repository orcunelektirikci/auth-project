// interface FILTER_PARAMS {
//   field: string
//   value: any
// }

import type { USER } from '~/types/store/users'

export interface BLOG {
  id: number
  title: string
  body: string
  author: USER
}

// Todo:: solve the issue with storing objects in the state
export interface BLOG_ITEMS {
  [key: number | string]: BLOG
}
