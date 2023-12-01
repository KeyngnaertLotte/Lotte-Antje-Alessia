<template>
    <div class="col-span-2 rounded-lg bg-white row-span-22 m-5 p-6">
      <h1 class="text-2xl font-bold mb-4 font-body">Alle taken</h1>
      <div class="flex items-center justify-between mb-4 px-2 bg-gray-200">
        <h2 class="text-lg font-bold w-1/4">Naam</h2>
        <h2 class="text-lg font-bold w-1/3">Type</h2>
        <h2 class="text-lg font-bold w-1/5">Plaats</h2>
        <h2 class="text-lg font-bold w-1/4">Categorie</h2>
        <h2 class="text-lg font-bold w-1/7">Aantal</h2>
        <h2 class="text-lg font-bold w-1/4">Deadline</h2>
        <h2 class="text-lg font-bold w-1/4">Benodigdheden</h2>
        <h2 class="text-lg font-bold w-1/4">Status</h2>
        <h2 class="text-lg font-bold w-1/14"></h2>
      </div>
      <div class="overflow-auto max-h-[80%]">
        <div v-for="(item, index) in data" :key="item.id" class="flex items-center justify-between border-b-2 p-2 last:border-b-none">
          <p class="w-1/4">{{ item.naam }}</p>
          <p class="w-1/3">{{ item.type }}</p>
          <p class="w-1/5">{{ item.plaats }}</p>
          <p class="w-1/4">{{ item.category }}</p>
          <p class="w-1/7">{{ item.aantal }}</p>
          <p class="w-1/4">{{ item.deadline }}</p>
          <p class="w-1/4">{{ item.materiaal }}</p>
          <p class="w-1/4">{{ item.status }}</p>
          <button class="w-1/14 flex justify-center items-center">
            <Pencil class="stroke-1.5" />
          </button>
        </div>
      </div>
    </div>
      
  </template>
  
  <script lang="ts">
  import { useQuery } from '@vue/apollo-composable'
  import { GET_ALL_TAKEN } from '@/graphql/taken.query'
  import { computed, ref } from 'vue'
  import { Pencil } from 'lucide-vue-next'
  
  const data = ref<any | null>(null)
  
  const { onResult, refetch } = useQuery(GET_ALL_TAKEN)
  
  onResult(result => {
        if (result.data) {
          console.log('Data:', result.data.taken)
          data.value = result.data.taken
        }
      })
  
  
  export default {
    components: {
      Pencil,
    },
    setup() {
      return { data, }
    },
  }
  </script>
  