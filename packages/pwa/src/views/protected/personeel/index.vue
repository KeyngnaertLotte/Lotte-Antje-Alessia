<template>
  <container>
    <h1>dashboard Personeel</h1>

    <div v-if="PersoneelLoading">Loading</div>
    <div v-if="PersoneelError">{{ PersoneelError }}</div>
    <card-sm title="drinken & eten"/>
    <task-list/>
    <!-- <div v-if="PersoneelData">
      <card-sm title="materiaal" url="/personeel/materiaal"/>
      <card-sm title="uurrooster" url="/personeel/uurrooster"/>
      <card-sm title="item toevoegen" url="/artiest/item-toevoegen"/>
      <card-sm title="vip lijst"/>
      <card-sm title="saldo" value="500" url="/bezoeker/saldo"/>
      <card-sm title="scanner"/>
    </div> -->
  </container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_Personeel } from '@/graphql/personeel.query'
import CardSm from '@/components/generic/card-sm.vue'
import TaskList from '@/components/generic/task-list.vue'

export default {
  components: { Container, CardSm, TaskList },

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
