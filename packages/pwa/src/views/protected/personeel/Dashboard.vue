<template>
      <CardSm title="materiaal"  class="col-span-1 row-start-4 row-span-4"/>
      <!-- <CardSm title="uurrooster" /> -->
      <CardSm title="scanner"  class="col-span-1 row-start-4 row-span-4"/>
      <task-list />
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_PERSONEEL } from '@/graphql/personeel.query'
import CardSm from '@/components/generic/card-sm.vue'
import TaskList from '@/components/generic/task-list.vue'
import AppHeader from '@/components/AppHeader.vue'

import useFirebase from '@/composables/useFirebase'
const { firebaseUser, logout } = useFirebase()
firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

export default {
  components: { Container, CardSm, TaskList, AppHeader },

  setup() {
    const {
      loading: PersoneelLoading,
      error: PersoneelError,
      result: PersoneelData,
    } = useQuery(ALL_PERSONEEL)
    return {
      PersoneelLoading,
      PersoneelError,
      PersoneelData,
    }
  },
}
</script>
