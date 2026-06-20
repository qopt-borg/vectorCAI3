import { boot } from 'quasar/wrappers'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export default boot(({ app }) => {
  app.config.globalProperties.$katex = katex
})
