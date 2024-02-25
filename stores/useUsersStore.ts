import { defineStore } from 'pinia'
import globalGetters from '~/stores/globalGetters'
import type { USER_ITEMS } from '~/types/store/users'
import globalActions from '~/stores/globalActions'

export const useUsersStore = defineStore('users', {
  state: () => ({
    storeName: 'users',
    pagination: {
      // Todo:: populate
      itemsPerPage: 20,
      currentPage: 1,
      pageCount: 1,
    },
    items: {} as USER_ITEMS,
  }),
  getters: {
    ...globalGetters,
  },
  actions: {
    ...globalActions(this),
  },
})
