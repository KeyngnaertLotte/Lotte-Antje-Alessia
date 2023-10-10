<template>
  <container>
    <h1>dashboard Personeel</h1>

    <div v-if="PersoneelLoading">Loading</div>
    <div v-if="PersoneelError">{{ PersoneelError }}</div>
    <div v-if="PersoneelData">
      <card-sm title="drinken & eten" />
      <card-sm title="materiaal" />
      <card-sm title="uurrooster" />
      <card-sm title="item toevoegen" />
      <card-sm title="vip lijst"/>
      <card-sm title="saldo" value="500"/>
      <card-sm title="scanner" />
    </div>
  </container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_Personeel } from '@/graphql/personeel.query'
import CardSm from '@/components/generic/card-sm.vue'

export default {
  components: { Container, CardSm },

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
