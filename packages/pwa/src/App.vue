<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import useGraphql from './composables/useGraphql'
import useLanguage from './composables/useLanguage'
import { useI18n } from 'vue-i18n'
import useCustomUser from './composables/useCustomUser'
import { SUPPORTED_LOCALES } from './bootstrap/i18n'

export default {
  setup() {
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    if (customUser.value?.locale) {
      setLocale(customUser.value.locale)
    } else {
      setLocale(
        navigator.languages.find(locale =>
          Object.keys(SUPPORTED_LOCALES).includes(locale),
        ) ?? locale.value,
      )
    }
  },
}
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
