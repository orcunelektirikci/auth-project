// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_ENDPOINT,
      passportClientId: process.env.PASSPORT_CLIENT_ID,
      passportClientSecret: process.env.PASSPORT_CLIENT_SECRET,
    },
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  devtools: { enabled: true },
})
