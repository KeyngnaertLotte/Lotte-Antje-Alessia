import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'


import App from './App.vue'
import router from './bootstrap/router'

import useFirebase from '@/composables/useFirebase'
import { i18n } from './bootstrap/i18n'
import useLanguage from './composables/useLanguage'
import { useI18n } from 'vue-i18n'

const app = createApp(App)
const { restoreUser } = useFirebase()
// const setLocale = useI18n()

app.use(i18n) // ALTIJD VOOR DE ROUTER
;(async () => {
    await restoreUser()

    app.use(router)
    app.mount('#app')
})()

