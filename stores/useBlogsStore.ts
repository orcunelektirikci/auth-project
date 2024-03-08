import { defineStore } from 'pinia'
import model from './models/blog'
import globalActions from '~/stores/globalActions'
import globalGetters from '~/stores/globalGetters'

import type { BlogItems } from '~/types/store/blogs'

export const useBlogsStore = defineStore('blogs', {
  state: () => ({
    model,
    items: {} as BlogItems,
  }),
  getters: {
    ...globalGetters,
  },
  actions: {
    ...globalActions,
  },
})
