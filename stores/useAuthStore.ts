import { defineStore } from 'pinia'
import type { USER } from '~/types/store/users'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    user: null as USER | null,
    accessToken: '',
  }),
  getters: {
    isLoggedIn: (state): boolean => !!state.user,
    isAdmin: (state): boolean => !!state.user?.roles?.includes('admin'),
  },
  actions: {
    setAuthUser(userData: USER) {
      this.user = userData
    },
    setAccessToken(token: string) {
      this.accessToken = token
    },
    logout() {
      useApi().logout()
      this.$reset()
    },
  },
})
