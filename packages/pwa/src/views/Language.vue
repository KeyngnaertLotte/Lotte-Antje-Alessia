<template>
  <div>
    <h1 class="text-4xl font-bold tracking-wide mb-6">
      {{ $t('account.welcome', { user: firebaseUser?.displayName }) }}
    </h1>
    <h1 class="text-4xl font-bold tracking-wide mb-6">
      {{ $t('taken.claim', { user: firebaseUser?.displayName }) }}
    </h1>

    <form @submit.prevent="">
      <button
        @click="logoutUser"
        class="px-6 py-2 text-white bg-red-600 rounded-md focus:outline-none focus-visible:ring-4 ring-red-300 hover:bg-red-800"
      >
        Log out
      </button>
      <label for="language">select language</label>
      <select name="language" id="language" @change="setLanguage" :value="locale">
        <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
          {{ value }}
        </option>
      </select>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import useFirebase from '@/composables/useFirebase'

import useLanguage from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'

const { firebaseUser, logout } = useFirebase()
const { replace } = useRouter()
const { setLocale } = useLanguage()
const { locale } = useI18n()

firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

const logoutUser = () => {
  logout().then(() => {
    replace({ path: '/' })
  })
}

const setLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setLocale(target.value)
}
</script>
