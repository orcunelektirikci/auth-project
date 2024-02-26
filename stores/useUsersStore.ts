import { defineStore } from 'pinia'
import globalGetters from '~/stores/globalGetters'
import type { UserItems } from '~/types/store/users'
import globalActions from '~/stores/globalActions'

export const useUsersStore = defineStore('users', {
  state: () => ({
    storeName: 'users',
    title: {
      plural: 'users.title.plural',
      singular: 'users.title.singular',
    },
    pagination: {
      // Todo:: populate
      itemsPerPage: 20,
      currentPage: 1,
      pageCount: 1,
    },
    items: {} as UserItems,
  }),
  getters: {
    ...globalGetters,
  },
  actions: {
    ...globalActions,
  },
})
