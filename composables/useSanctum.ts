import type { FETCH_OPTIONS } from '~/types/request'
import type { LOGIN_DATA, LOGIN_RESPONSE_DATA } from '~/types/response'
import type { USER } from '~/types/store/users'
import { useHttpHelper } from '~/composables/useHttpHelper'
import { sanitizeUrl } from '~/utils/helpers'

const accessToken = ref<string>('')

export function useSanctum() {
  const config = useRuntimeConfig()

  const sendRequest = async (uri: string, options: FETCH_OPTIONS = {}, addApiPrefix: boolean = true) => {
    let headers = { Accept: 'application/json', ...(options.headers || {}) } as Record<string, string>
    let oauthToken = ''

    const csrfToken = useCookie('XSRF-TOKEN')
    if (csrfToken.value)
      headers['X-XSRF-TOKEN'] = csrfToken.value as string

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

  const revokeToken = () => {
    accessToken.value = ''
  }

  const setToken = (value: string) => {
    accessToken.value = value
    localStorage.setItem('oauth-token', value)
  }

  const reset = () => {
    const authCookie = useCookie('XSRF-TOKEN')
    authCookie.value = null
    accessToken.value = ''
    localStorage.removeItem('oauth-token')
  }

  const getCsrfCookie = async () => {
    await $fetch(sanitizeUrl(config.public.apiCookiePath) as string, {
      credentials: 'include',
      baseURL: config.public.apiUrl,
    })

    return useCookie('XSRF-TOKEN')
  }

  const fetchUser = async () => {
    const me: any = await sendRequest(config.public.apiUserPath)

    if (me.error) {
      useToastMessage(me.error.statusCode, me.error.message).showError()
      return me.error
    }

    return me
  }

  const login = async (email: string, password: string, remember: boolean = false) => {
    const csrfToken = await getCsrfCookie()

    if (!csrfToken.value) {
      useToastMessage(500, useI18n().t('auth.login.couldNotLogin')).showError()
      return
    }

    // @ts-expect-error fix fetch types
    const loginResponse: LOGIN_RESPONSE_DATA = await sendRequest(config.public.apiLoginPath, {
      method: 'POST',
      body: { email, password, remember },
    })

    if ('access_token' in loginResponse && loginResponse.access_token) {
      setToken(loginResponse.access_token)
      localStorage.setItem('oauth-token', loginResponse.access_token)
    }
    else {
      return loginResponse
    }

    // @ts-expect-error fix fetch types
    const resp: LOGIN_DATA & { user: USER } = { ...loginResponse }

    const me = await fetchUser()
    resp.user = me.data

    return resp
  }

  const logout = async () => {
    reset()
    await sendRequest('/logout')
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
