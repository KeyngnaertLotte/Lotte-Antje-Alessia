<template>
    <Container>
        <div>
    <div class="flex w-full justify-between">
      <h1 class="text-4xl font-bold tracking-wide mb-6">Agenda</h1>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="loading">
      <p>data is loading.</p>
    </div>
    <table class="w-full" v-if="ArtiestenData">
      <!-- <tr class="text-left">
        <th>Naam</th>
        <th>Podium</th>
        <th>Time</th>
      </tr> -->
      <tr v-for="artiest in ArtiestenData.artiesten">
        <td class="py-3">{{ artiest.naam }}</td>
        <td class="py-3">{{ artiest.podium }}</td>
      </tr>
    </table>
</div>
  </Container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
    import Container from '@/components/generic/Container.vue';
    import { ALL_Artiesten } from '@/graphql/artiest.query'

    export default {
        
        components: { Container},

        setup() {
            const {loading: ArtiestenLoading, result: ArtiestenData, error: ArtiestenError} = useQuery(ALL_Artiesten)
            console.log(ArtiestenData)
            return {
                ArtiestenData,
                ArtiestenLoading,
                ArtiestenError,
            }
        },
    }
</script>