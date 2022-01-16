import colors from 'vuetify/es5/util/colors';

export default {
  googleAnalytics: {
    id: 'UA-215418410-1'
  },
  env: {
    PAYJP_KEY: 'pk_test_9667f2e2e7f32f44bc8c4726',
    PAYJP_KEY_C2C: 'pk_test_4d03e6598aa936718b4929e4',
    PAYJP_KEY_B2C: 'pk_test_9667f2e2e7f32f44bc8c4726',
    ...process.env,
  },
  publicRuntimeConfig: {
    explorerURL: 'https://testnet.bscscan.com/address/',
    omniauth: {
      facebookAuthUrl:
        'https://www.facebook.com/v12.0/dialog/oauth?client_id=846994962669102&response_type=token&scope=email',
    },
  },
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - fire-digital-front-mobile',
    title: 'fire-digital-front-mobile',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    script: [{ src: 'https://js.pay.jp/v2/pay.js', body: true }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/common.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/i18n.js' },
    { src: '@/plugins/axios.js' },
    { src: '@/plugins/vue-toasted.js' },
    // { src: '@/plugins/payjp.js' },
    { src: '@/plugins/vue-masonry', ssr: false },
    { src: '@/plugins/filters.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/proxy'],
  router: {
    middleware: 'auth',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
};
