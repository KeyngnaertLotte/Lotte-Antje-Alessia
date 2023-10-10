<!-- <script setup lang="ts">
import { provide } from 'vue';
import { DefaultApolloClient} from '@vue/apollo-composable';
import useGraphql from './composables/useGraphql';
import useLanguage from './composables/useLanguage';


const { apolloClient } = useGraphql();
const { locale } = useLanguage();

// maak alles beschikbaar in de scope
provide(DefaultApolloClient, apolloClient);
// behalve in composables

</script> -->

<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'


import useGraphql from './composables/useGraphql'
import useLanguage from './composables/useLanguage'

export default {


  setup() {
    const { apolloClient } = useGraphql()
    const { locale } = useLanguage()

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    return {
      locale,
    }
  },
}
</script>

<template>
  <div>
    <RouterView />

    {{ locale }}
    {{ $t('hello') }}
  </div>
</template>
