import { defineStore } from 'pinia'
import model from './models/blog'
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
    model,
    pagination: {
      itemsPerPage: 15,
      currentPage: 1,
      lastPage: 1,
      totalItems: 0,
      itemsByPage: {},
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
