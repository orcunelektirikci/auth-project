import type { FETCH_OPTIONS, TOKEN_TYPE } from '~/types/request'

const config = useRuntimeConfig()

const accessToken = ref<string>('')
const refreshToken = ref<string>('')

export function useSanctum() {
  const fetch = async (uri: string, options: FETCH_OPTIONS = {}) => {
    let headers = {} as Record<string, string>
    let oauthToken = ''

    const csrfToken = useCookie('XSRF-TOKEN')
    if (csrfToken.value) {
      headers['X-XSRF-TOKEN'] = csrfToken.value as string
    }
    else {
      return {
        data: toRef(null),
        error: toRef({
          statusCode: 401,
          data: {
            message: 'Unauthorized!',
          },
        }),
      }
    }

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
    const authCookie = useCookie('XSRF-TOKEN')
    authCookie.value = null

    accessToken.value = ''
    localStorage.removeItem('oauth-token')
  }

  const getCsrfCookie = async () => {
    return await useFetch(`${config.public.apiUrl}/sanctum/csrf-cookie`, {
      credentials: 'include',
    })
  }

  const login = async (email: string, password: string) => {
    const { error: csrfError } = await getCsrfCookie()

    if (csrfError.value) {
      useToastMessage(csrfError.value?.data?.statusCode, csrfError.value?.data?.message).showError()
      return csrfError
    }

    const csrfToken = useCookie('XSRF-TOKEN')

    const { data, error }: { data: any, error: any } = await useFetch(`${config.public.apiUrl}/api/login`, {
      credentials: 'include',
      method: 'POST',
      body: { email, password },
      headers: {
        'Accept': 'application/json',
        'X-XSRF-TOKEN': csrfToken.value as string,
      },
    })

    if (error.value) {
      useToastMessage(error.value.statusCode, error.value.data?.message).showError()
      return error
    }

    if (data.value?.access_token) {
      setToken('access_token', data.value.access_token)
      localStorage.setItem('oauth-token', data.value.access_token)
    }

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
