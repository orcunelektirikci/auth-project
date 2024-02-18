import type { FETCH_OPTIONS, TOKEN_TYPE } from '~/types/request'

const accessToken = ref<string>('')
const refreshToken = ref<string>('')
const config = useRuntimeConfig()

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

    // Todo:: fix any
    const { data }: { data: any } = await useFetch(`${config.public.apiUrl}/oauth/token`, {
      method: 'POST',
      body: { ...passportConfig, username, password },
    })

    if (Object.prototype.hasOwnProperty.call(data, 'error'))
      return data.error

    setToken('access_token', data.value.access_token)
    setToken('refresh_token', data.value.reset_token)

    const resp = { ...data.value }

    // Todo:: fix any
    const { data: me }: { data: any } = await fetch('/api/me')

    if (Object.prototype.hasOwnProperty.call(data, 'error'))
      return data.error

    resp.user = toValue(me).data

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
