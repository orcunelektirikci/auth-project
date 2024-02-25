import type { FETCH_OPTIONS, TOKEN_TYPE } from '~/types/request'
import type { ApiComposable } from '~/types/api'
import { useHttpHelper } from '~/composables/useHttpHelper'
import type { LOGIN_DATA, LOGIN_RESPONSE_DATA } from '~/types/response'
import type { USER } from '~/types/store/users'
import { sanitizeUrl } from '~/utils/helpers'

const accessToken = ref<string>('')
const refreshToken = ref<string>('')

export function usePassport(): ApiComposable {
  const config = useRuntimeConfig()

  const sendRequest = async (uri: string, options: FETCH_OPTIONS = {}, addApiPrefix: boolean = true) => {
    let headers = { Accept: 'application/json', ...(options.headers || {}) } as Record<string, string>
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

    return $fetch(sanitizeUrl(uri), {
      retry: false,
      cache: 'no-cache',
      ...options,
      headers,
      watch: false,
      onResponseError({ response: errResponse }) {
        useHttpHelper().parseErrorHandler(errResponse)
      },
    }).catch((err) => {
      return err
    })
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

  const fetchUser = async () => {
    const me: any = await sendRequest(config.public.apiUserPath)

    if (me.error) {
      useToastMessage(me.error.statusCode, me.error.message).showError()
      return me.error
    }

    return me
  }

  const login = async (username: string, password: string) => {
    const passportConfig = {
      grant_type: 'password',
      client_id: config.public.passportClientId,
      client_secret: config.public.passportClientSecret,
      scope: '*',
    }

    // @ts-expect-error fix fetch types
    const loginResponse: LOGIN_RESPONSE_DATA = await sendRequest(config.public.apiLoginPath, {
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

    // @ts-expect-error fix fetch types
    const resp: LOGIN_DATA & { user: USER } = { ...loginResponse }

    const me = await fetchUser()
    resp.user = me.data

    return resp
  }

  const logout = async () => {
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
