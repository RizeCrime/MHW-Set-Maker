// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content'
  ],
  colorMode: {
    preference: 'dark'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
