import { useHttpHelper } from '~/composables/useHttpHelper'
import type { ApiComposable } from '~/types/api'
import type { StrObj } from '~/types/objects'
import type { FetchOptions } from '~/types/request'
import type { HttpResponse, LoginResponse } from '~/types/response'
import { sanitizeUrl } from '~/utils/helpers'

export function useSanctum(): ApiComposable {
  const accessToken = useState('access_token', () => '')

  const config = useRuntimeConfig()

  const sendRequest = async (uri: string, options: FetchOptions = {}, addApiPrefix: boolean = true): Promise<HttpResponse> => {
    let headers = { Accept: 'application/json', ...(options.headers || {}) } as StrObj
    let oauthToken = ''

    const csrfToken = useCookie('XSRF-TOKEN')

    if (csrfToken.value)
      headers['X-XSRF-TOKEN'] = csrfToken.value
    else
      return Promise.reject(useHttpHelper().parseErrorHandler({ message: '', status: 401 }))

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
        cache: 'force-cache',
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
      return Promise.reject(err)
    }
  }

  const revokeToken = () => {
    accessToken.value = ''
    clearNuxtState('access_token')
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
    clearNuxtState('access_token')
  }

  const getCsrfCookie = async () => {
    await $fetch(sanitizeUrl(config.public.apiCookiePath), {
      credentials: 'include',
      baseURL: config.public.apiUrl,
    })

    return useCookie('XSRF-TOKEN')
  }

  const fetchUser = async () => {
    const me = await sendRequest(config.public.apiUserPath)

    if ('error' in me && me.error && me.error.message) {
      useToastMessage(me.error.message, me.error.statusCode).showError()
      return Promise.reject(me.error)
    }

    return Promise.resolve(me)
  }

  const login = async (email: string, password: string, remember?: boolean) => {
    const csrfToken = await getCsrfCookie()

    if (!csrfToken.value) {
      useToastMessage(useI18n().t('auth.login.couldNotLogin'), 500).showError()
      return
    }

    const loginResponse: LoginResponse = await sendRequest(config.public.apiLoginPath, {
      method: 'POST',
      body: { email, password, remember },
    })

    if ('access_token' in loginResponse && loginResponse.access_token) {
      setToken(loginResponse.access_token)
      localStorage.setItem('oauth-token', loginResponse.access_token)
    }
    return loginResponse
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
