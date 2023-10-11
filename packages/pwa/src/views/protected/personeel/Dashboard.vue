<template>
  <div
    class="max-h-screen grid grid-cols-2 grid-rows-24 h-screen bg-secondary overflow-hidden"
  >
    <div class="col-span-2 row-span-3">
      <AppHeader />
    </div>
    <div
      class="flex flex-row items-center justify-center col-span-2 row-start-6"
    >
      <CardSm title="materiaal" />
      <CardSm title="uurrooster" />
    </div>
    <div class="col-span-2 row-start-10 justify-center items-center m-5">
      <task-list />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_Personeel } from '@/graphql/personeel.query'
import CardSm from '@/components/generic/card-sm.vue'
import TaskList from '@/components/generic/task-list.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: { Container, CardSm, TaskList, AppHeader },

  setup() {
    const {
      loading: PersoneelLoading,
      error: PersoneelError,
      result: PersoneelData,
    } = useQuery(ALL_Personeel)
    return {
      PersoneelLoading,
      PersoneelError,
      PersoneelData,
    }
  },
}
</script>
