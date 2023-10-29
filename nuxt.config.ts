// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_colors.scss" as *;'
        }
      }
    }
  },
  app: {
    head: {
      title: 'SplashyTV'
    }
  },
  modules: [
    ['@nuxtjs/google-fonts', {
    families: {
      Lato: [100, 300]
    }
  }],
  ['nuxt-icon']
]
})
