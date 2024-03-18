import { defineStore } from 'pinia'
import model from './models/user'
import globalGetters from '~/stores/globalGetters'
import globalActions from '~/stores/globalActions'

import type { UserItems } from '~/types/store/users'

export const useUsersStore = defineStore('users', {
  state: () => ({
    model,
    items: {} as UserItems,
  }),
  getters: {
    ...globalGetters,
  },
  actions: {
    ...globalActions,
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
