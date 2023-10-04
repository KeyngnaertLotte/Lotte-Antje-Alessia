<script setup lang="ts">
import { provide } from 'vue';
import { DefaultApolloClient} from '@vue/apollo-composable';
import useGraphql from './composables/useGraphql';
import useLanguage from './composables/useLanguage';


const { apolloClient } = useGraphql();
const { locale } = useLanguage();

// maak alles beschikbaar in de scope
provide(DefaultApolloClient, apolloClient);
// behalve in composables

</script>

<template>
  <div>
    <RouterView />

    {{ locale }}
    {{ $t('hello world') }}
  </div>
</template>
