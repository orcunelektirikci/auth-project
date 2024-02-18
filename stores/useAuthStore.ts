import { defineStore } from 'pinia'
import type { User } from '@/types/auth'

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    user: null as User | null,
    accessToken: '',
  }),
  getters: {
    isLoggedIn: (state): boolean => !!state.user,
  },
  actions: {
    setAuthUser(userData: User) {
      this.user = userData
    },
    setAccessToken(token: string) {
      this.accessToken = token
    },
    logout() {
      this.$reset()
    },
  },
})
