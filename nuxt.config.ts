export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: '/dark-mode.js',
          type: 'text/javascript',
          tagPosition: 'bodyClose',
          defer: true,
          async: true,
        },
      ],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          charset: 'utf-8',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'in-out' },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      passportClientId: process.env.NUXT_PUBLIC_PASSPORT_CLIENT_ID,
      passportClientSecret: process.env.NUXT_PUBLIC_PASSPORT_CLIENT_SECRET,
      authProvider: process.env.NUXT_PUBLIC_AUTH_PROVIDER || 'sanctum',
      apiUserPath: process.env.NUXT_PUBLIC_API_USER_PATH || 'me',
      apiLoginPath: process.env.NUXT_PUBLIC_API_LOGIN_PATH || 'login',
      apiCookiePath: process.env.NUXT_PUBLIC_API_COOKIE_PATH || 'sanctum/csrf-cookie',
      apiPrefix: process.env.NUXT_PUBLIC_API_PREFIX || 'api/',
    },
  },
  components: {
    dirs: [
      '~/components',
    ],
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    // ['nuxt-bugsnag', {
    //   config: {
    //     baseUrl: 'http://localhost:3000',
    //     apiKey: process.env.BUGSNAP_API_KEY,
    //   },
    // }],
    ['@nuxtjs/sitemap', {
      site: process.env.NUXT_PUBLIC_APP_URL,
      trailingSlash: true,
    }],
    ['@nuxtjs/i18n', {
      defaultLocale: 'tr',
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        redirectOn: 'root',
      },
      baseUrl: process.env.NUXT_PUBLIC_APP_URL,
      langDir: 'locales',
      locales: [
        { code: 'tr', iso: 'tr-TR', file: 'tr.ts' },
        { code: 'en', iso: 'en-US', file: 'en.ts' },
      ],
    }],
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
        Poppins: true,
      },
    }],
  ],
  devtools: { enabled: true },
  telemetry: false,
})
