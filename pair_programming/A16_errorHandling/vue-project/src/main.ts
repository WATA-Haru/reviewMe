import { createApp } from 'vue'
import App from './App.vue'


async function prepare() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/worker');
    worker.start();
  }
  return Promise.resolve();
}

prepare().then(() => {
  createApp(App).mount('#app');
});
