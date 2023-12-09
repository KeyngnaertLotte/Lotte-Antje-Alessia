import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from './composables/useFirebase'
import { i18n } from './bootstrap/i18n'

import useCustomUser from './composables/useCustomUser'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
const { restoreUser, firebaseUser } = useFirebase()
const { restoreCustomUser } = useCustomUser()

app.use(i18n) // ALTIJD VOOR DE ROUTER!
app.use(Toast, { maxToasts: 1 })
;(async () => {
  await restoreUser()
  if (firebaseUser.value) await restoreCustomUser()

  app.use(router)
  app.mount('#app')
})()


