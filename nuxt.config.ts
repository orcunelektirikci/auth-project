// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_ENDPOINT,
      passportClientId: process.env.PASSPORT_CLIENT_ID,
      passportClientSecret: process.env.PASSPORT_CLIENT_SECRET,
      authProvider: process.env.AUTH_PROVIDER || 'passport',
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-lodash',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: true,
          Poppins: true,
        },
      },
    ],
  ],
  devtools: { enabled: true },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: 'first',
    viewer: true,
  },
})
