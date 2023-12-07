<template>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Artiesten</h1>

    <div v-if="ArtiestenLoading">Loading...</div>
    <div v-if="ArtiestenError">
      {{ ArtiestenError }}
    </div>

    <div
      v-if="ArtiestenData"
      class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-12"
    >
      <div v-for="artiest in ArtiestenData.artiesten" class="flex items-center gap-6">
        <div>
          <h2 class="text-lg font-semibold tracking-wide">
            {{ artiest.naam }}
          </h2>
          <p class="text-xs tracking-wide mb-2">{{ artiest.podium }}</p>
          <p class="text-sm">{{ artiest.podium }} times spotted</p>

          <RouterLink
            class="flex items-center text-sm text-blue-600 hover:underline mt-2"
            :to="`/Artiesten/${artiest.naam}`"
            >{{ artiest.naam }} <ArrowRightIcon class="h-4"
          /></RouterLink>
        </div>
      </div>
    </div>
</template>


<script lang="ts">

    import { useQuery } from '@vue/apollo-composable';
    import { ALL_Artiesten } from '@/graphql/artiest.query'

    interface Artiest {
        id: string
        naam: string
        podium: String
    }

    export default {

        setup() {
            const {loading: ArtiestenLoading, result: ArtiestenData, error: ArtiestenError} = useQuery(ALL_Artiesten)
           return {
                ArtiestenData,
                ArtiestenLoading,
                ArtiestenError,
            }
        },
    }

</script>