<template>
  <div class="col-span-2 row-span-22 flex flex-row items-center justify-center">
    <div class="bg-white w-full h-[95%] rounded-lg m-4 p-6">
      <h1 class="text-2xl font-bold mb-4 font-body">Agenda alle artiesten</h1>
      <div class="grid grid-rows-1 grid-cols-10 w-full">
        <h2 class="col-span-1"></h2>
        <h2 class="col-span-3 text-center text-lg font-bold">Lotte</h2>
        <h2 class="col-span-3 text-center text-lg font-bold">Antje</h2>
        <h2 class="col-span-3 text-center text-lg font-bold">Aléssia</h2>
      </div>
      <div class="overflow-auto max-h-[80%]">
        <div class="grid grid-rows-35 grid-cols-10">
          <agendaTimes />
          <artistAgenda v-for="artist in data" :key="artist.id" :artist="artist" />
          
      </div>
        </div>
      </div>
    </div>
</template>


<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_Artiesten } from '@/graphql/artiest.query'
import { Pencil  } from 'lucide-vue-next'
import agendaTimes from '@/components/admin/agendaTimes.vue'
import agendaLines from '@/components/admin/agendaLines.vue'
import artistAgenda from '@/components/admin/artistAgenda.vue'
import { computed, ref } from 'vue'

const data = ref<any | null>(null)

const { onResult, refetch } = useQuery(ALL_Artiesten)

onResult(result => {
      if (result.data) {
        console.log('Data:', result.data.artiesten)
        data.value = result.data.artiesten
      }
    })



export default {
  components: {
    Pencil,
    agendaTimes,
    agendaLines,
    artistAgenda
  },
  setup() {
    return { data }
  },
};

</script>
