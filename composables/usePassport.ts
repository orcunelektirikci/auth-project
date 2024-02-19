import type { FETCH_OPTIONS, TOKEN_TYPE } from '~/types/request'

const accessToken = ref<string>('')
const refreshToken = ref<string>('')
const config = useRuntimeConfig()
const $toast = useNuxtApp().$toast

export function usePassport() {
  const fetch = async (uri: string, options: FETCH_OPTIONS = {}) => {
    let headers = {} as Record<string, string>
    let oauthToken = ''

    if (options.headers)
      headers = { ...options.headers }

    if (!Object.prototype.hasOwnProperty.call(headers, 'Authorization')) {
      if (accessToken.value)
        oauthToken = accessToken.value
      else
        oauthToken = localStorage.getItem('oauth-token') || '' as string

      headers = { ...headers, Authorization: `Bearer ${oauthToken}` }
    }

    if (!options.method)
      options.method = 'GET'

    return useFetch(`${config.public.apiUrl}${uri}`, { ...options, headers, watch: false })
  }

  const revokeToken = (type: TOKEN_TYPE = 'access_token') => {
    if (type === 'refresh_token')
      refreshToken.value = ''
    else
      accessToken.value = ''
  }

  const setToken = (type: TOKEN_TYPE, value: string) => {
    if (type === 'refresh_token') {
      refreshToken.value = value
    }
    else {
      accessToken.value = value
      localStorage.setItem('oauth-token', value)
    }
  }

  const reset = () => {
    accessToken.value = ''
    refreshToken.value = ''
    localStorage.removeItem('oauth-token')
  }

  const login = async (username: string, password: string) => {
    const passportConfig = {
      grant_type: 'password',
      client_id: config.public.passportClientId,
      client_secret: config.public.passportClientSecret,
      scope: '*',
    }

    const { data, error }: { data: any, error: any } = await useFetch(`${config.public.apiUrl}/oauth/token`, {
      method: 'POST',
      body: { ...passportConfig, username, password },
    })

    if (error.value) {
      useToastMessage(error.value.statusCode, error.value.data?.message).showError()
      return error
    }

    setToken('access_token', data.value.access_token)
    setToken('refresh_token', data.value.reset_token)

    const resp = { ...toValue(data) }

    const { data: me, error: meError }: { data: any, error: any } = await fetch('/api/me')

    if (meError.value)
      useToastMessage(meError.value.statusCode, meError.value.data?.message).showError()

    resp.user = me.value.data

    return resp
  }

  return {
    login,
    fetch,
    revokeToken,
    setToken,
    reset,
  }
}
