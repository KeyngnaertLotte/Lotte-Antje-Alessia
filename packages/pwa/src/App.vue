<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import useGraphql from './composables/useGraphql'
import useLanguage from './composables/useLanguage'
import { useI18n } from 'vue-i18n'

export default {


  setup() {
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useLanguage()

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    setLocale(locale.value)
    return {
    }
  },
}
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
