import projectsData from './data/projects.json'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      routes: projectsData.map(p => `/projects/${p.slug}`),
    },
  },

  app: {
    // GitHub Pages project page: set NUXT_APP_BASE_URL=/it-portfolio/ in .env.production
    // GitHub Pages user/org page (username.github.io): leave as '/'
    baseURL: process.env.NUXT_APP_BASE_URL ?? '/',
    head: {
      title: 'Shota Arakawa | Portfolio',
      htmlAttrs: { lang: 'ja' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'フルスタックエンジニア 荒川奨太のポートフォリオ' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css',
        },
      ],
    },
  },
})
