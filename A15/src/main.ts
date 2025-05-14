import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

/**
 *
 * @description - setup msw on browser env official example(https://github.com/mswjs/examples/blob/main/examples/with-vue/src/main.ts)
 */
async function prepareApp() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }

  return Promise.resolve()
}

const app = createApp(App)

prepareApp().then(() => {
  app.mount('#app')
})
