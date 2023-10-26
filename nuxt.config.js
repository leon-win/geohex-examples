const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/geohex-examples/'
  }
} : {}

export default {
  target: 'static',
  ssr: false,
  injectScripts: false,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module'
  ],
  css: [
    '~/styles/common.css'
  ],
  env: {
    MAPBOX_ACCESS_TOKEN: 'pk.eyJ1IjoibGVvbi12aW5vZ3JhZG92IiwiYSI6ImNqbmt1YWR5bzFlNTAzd28zMTFkbXdrNzYifQ.CaItW4BNGEgvWl74RTikHw'
  },
  head: {
    title: 'Geohex examples',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ],
    script: [
      {
        src: 'https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.js',
        integrity: 'sha256-fNoRrwkP2GuYPbNSJmMJOCyfRB2DhPQe0rGTgzRsyso=',
        crossorigin: 'anonymous'
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/geohex@0.0.7/lib/geohex.min.js',
        integrity: 'sha256-y6uC/ut4X+JjNhdz1OdEscXA7iN44aUWsmIN3zauUHI=',
        crossorigin: 'anonymous'
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/leaflet@1.6.0/dist/leaflet.css',
        integrity: 'sha256-SHMGCYmST46SoyGgo4YR/9AlK1vf3ff84Aq9yK4hdqM=',
        crossorigin: 'anonymous'
      }
    ]
  },
  ...routerBase
}
