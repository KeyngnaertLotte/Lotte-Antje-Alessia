<script setup lang="ts">
import { provide } from 'vue';
import { DefaultApolloClient} from '@vue/apollo-composable';
import useGraphql from './composables/useGraphql';

const { apolloClient } = useGraphql();

// maak alles beschikbaar in de scope
provide(DefaultApolloClient, apolloClient);
// behalve in composables

</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
