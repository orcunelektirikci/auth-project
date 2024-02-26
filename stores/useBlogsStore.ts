import { defineStore } from 'pinia'
import globalActions from '~/stores/globalActions'
import globalGetters from '~/stores/globalGetters'
import type { BlogItems } from '~/types/store/blogs'

export const useBlogsStore = defineStore('blogs', {
  state: () => ({
    storeName: 'blogs',
    title: {
      plural: 'blogs.title.plural',
      singular: 'blogs.title.singular',
    },
    pagination: {
      // Todo:: populate
      itemsPerPage: 20,
      currentPage: 1,
      pageCount: 1,
    },
    items: {} as BlogItems,
  }),
  getters: {
    ...globalGetters,
  },
  actions: {
    ...globalActions,
  },
})
