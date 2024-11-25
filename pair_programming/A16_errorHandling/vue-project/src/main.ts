import { createApp } from 'vue'
import App from './App.vue'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  const { worker } = await import('./mocks/worker');
  return worker.start();
}

enableMocking().then(() => {
  createApp(App).mount('#app');
});
