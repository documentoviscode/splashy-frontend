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
    },
    pageTransition: {name: 'page', mode: 'out-in'}
  },
  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: [100, 300, 500, 600, 700, 900]
      }
    }],
    'nuxt-icon',
    '@nuxt/ui',
  ],
})
