import { defineStore } from 'pinia'
import type { User } from '~/types/store/users'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    user: null as User | null,
    accessToken: '',
  }),
  getters: {
    isLoggedIn: (state): boolean => !!state.user,
    isAdmin: (state): boolean => !!state.user?.roles?.includes('admin'),
  },
  actions: {
    setAuthUser(userData: User) {
      this.user = userData
    },
    setAccessToken(token: string) {
      this.accessToken = token
    },
    logout() {
      void useApi().logout()
      this.$reset()
    },
  },
})
