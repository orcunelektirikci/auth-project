import type { FetchOptions, TokenType } from '~/types/request'
import type { ApiComposable } from '~/types/api'
import { useHttpHelper } from '~/composables/useHttpHelper'
import type { HttpResponse, LoginData, LoginResponse } from '~/types/response'
import { sanitizeUrl } from '~/utils/helpers'
import type { StrObj } from '~/types/objects'
import type { HasId } from '~/types/store/defaults'

export function usePassport(): ApiComposable {
  const accessToken = useState('access_token', () => '')
  const refreshToken = useState('refresh_token', () => '')

  const config = useRuntimeConfig()

  const sendRequest = async (uri: string, options: FetchOptions = {}, addApiPrefix: boolean = true): Promise<HttpResponse> => {
    let headers = { Accept: 'application/json', ...(options.headers || {}) } as StrObj
    let oauthToken = ''

    if (config.public.apiUrl)
      options.baseURL = `${config.public.apiUrl}${sanitizeUrl(addApiPrefix && config.public.apiPrefix ? `${config.public.apiPrefix}` : '')}`

    if (accessToken.value)
      oauthToken = accessToken.value
    else
      oauthToken = localStorage.getItem('oauth-token') || '' as string

    if (oauthToken && oauthToken !== '')
      headers = { ...headers, Authorization: `Bearer ${oauthToken}` }

    if (!options.method)
      options.method = 'GET'

    try {
      const fetch: Promise<HttpResponse> = $fetch(sanitizeUrl(uri), {
        retry: false,
        cache: 'no-cache',
        ...options,
        headers,
        watch: false,
        onResponseError({ response: errResponse }) {
          void useHttpHelper().parseErrorHandler(errResponse)
        },
      })

      return fetch
    }
    catch (err) {
      return await Promise.reject(err)
    }
  }

  const revokeToken = (type: TokenType = 'access_token') => {
    if (type === 'refresh_token') {
      refreshToken.value = ''
      clearNuxtState('refresh_token')
    }
    else {
      accessToken.value = ''
      clearNuxtState('access_token')
    }
  }

  const setToken = (type: TokenType, value: string) => {
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
    clearNuxtState(['access_token', 'refresh_token'])
  }

  const fetchUser = async () => {
    const me = await sendRequest(config.public.apiUserPath)

    if ('error' in me && me.error && me.error.message) {
      useToastMessage(me.error.message, me.error.statusCode).showError()
      return Promise.reject(me.error)
    }

    return Promise.resolve(me)
  }

  const login = async (username: string, password: string) => {
    const passportConfig = {
      grant_type: 'password',
      client_id: config.public.passportClientId,
      client_secret: config.public.passportClientSecret,
      scope: '*',
    }

    const loginResponse: LoginResponse = await sendRequest(config.public.apiLoginPath, {
      method: 'POST',
      body: { ...passportConfig, username, password },
    }, false)

    if ('access_token' in loginResponse && loginResponse.access_token) {
      setToken('access_token', loginResponse.access_token)
      localStorage.setItem('oauth-token', loginResponse.access_token)
    }
    else {
      return loginResponse
    }

    if ('refresh_token' in loginResponse && loginResponse.refresh_token)
      setToken('refresh_token', loginResponse.refresh_token)

    const resp: LoginData = { ...loginResponse }

    const me = await fetchUser()
    if (!('error' in me))
      resp.user = me.data as HasId

    return resp
  }

  const logout = async (): Promise<void> => {
    reset()
  }

  return {
    login,
    sendRequest,
    fetchUser,
    revokeToken,
    setToken,
    logout,
    reset,
  }
}
