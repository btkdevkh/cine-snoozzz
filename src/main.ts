import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import App from './App.vue'
import router from './router'

const queryClient = new QueryClient()

const app = createApp(App)

// QueryClient
app.use(VueQueryPlugin, {
  queryClient,
})
app.use(createPinia())
app.use(router)

app.mount('#app')
