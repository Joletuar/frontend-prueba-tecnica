import { createApp } from 'vue'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

import App from './App.vue'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})

app.use(pinia)
app.use(VueQueryPlugin, {
  queryClient,
})

app.mount('#app')
