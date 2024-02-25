import { defineStore } from 'pinia'
import globalActions from '~/stores/globalActions'
import globalGetters from '~/stores/globalGetters'
import type { BLOG_ITEMS } from '~/types/store/blogs'

export const useBlogsStore = defineStore('blogs', {
  state: () => ({
    storeName: 'blogs',
    pagination: {
      // Todo:: populate
      itemsPerPage: 20,
      currentPage: 1,
      pageCount: 1,
    },
    items: {} as BLOG_ITEMS,
  }),
  getters: {
    ...globalGetters,
  },
  actions: {
    ...globalActions(this),
  },
})
