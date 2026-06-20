const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  return {
    boot: ['katex'],

    css: ['app.scss'],

    extras: ['material-icons', 'mdi-v7'],

    build: {
      publicPath: '/vectorCAI3/',
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },
      vueRouterMode: 'hash',
      vitePlugins: []
    },

    devServer: {
      open: true
    },

    framework: {
      config: {
        brand: {
          primary: '#534AB7',
          secondary: '#3C3489',
          accent: '#AFA9EC',
          dark: '#1d1d1d',
          positive: '#3B6D11',
          negative: '#A32D2D',
          info: '#534AB7',
          warning: '#BA7517'
        }
      },
      plugins: ['Notify', 'Dialog']
    },

    animations: [],

    ssr: { pwa: false },
    pwa: {},
    cordova: {},
    capacitor: { hideSplashscreen: true },
    electron: { inspectPort: 5858, bundler: 'packager' },
    bex: {}
  }
})
