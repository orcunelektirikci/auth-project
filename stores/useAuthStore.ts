import { defineStore } from 'pinia'
import type { User } from '~/types/store/users'
import { objHas } from '~/utils/helpers'
import type { LoginData } from '~/types/response'

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
    async login(email: string, password: string, remember: boolean = false) {
      const api = useApi()

      const loginResp = await api.login(email, password, remember)

      if (loginResp && !objHas(loginResp, 'error')) {
        if ('accessToken' in loginResp)
          this.setAccessToken((loginResp as LoginData).access_token as string)

        const me = await api.fetchUser()

        if (!('error' in me))
          this.setAuthUser(me.data as User)
      }

      return loginResp
    },
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

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
