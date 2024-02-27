import { defineStore } from 'pinia'
import model from './models/user'
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
    model,
    pagination: {
      itemsPerPage: 15,
      currentPage: 1,
      lastPage: 1,
      totalItems: 0,
      itemsByPage: {},
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
