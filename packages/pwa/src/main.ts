import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './router'

import useFirebase from '@/composables/useFirebase'

import useCustomUser from './composables/useCustomUser'

const app = createApp(App)
const { restoreUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()

;(async () => {
  await restoreUser()
  await restoreCustomUser()

  app.use(router)
  app.mount('#app')
})()
