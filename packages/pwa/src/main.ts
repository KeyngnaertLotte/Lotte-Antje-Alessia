import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
