<template>
  <div class="col-span-2 rounded-lg bg-white row-span-22 m-5 p-6">
    <div class="flex flex-row items-center justify-between">
      
    <h1 class="text-2xl font-bold mb-4 font-body w-2/3">Alle personeel en artiesten</h1>
    <input type="text" name="search" id="search" placeholder="Zoek naar een naam" class="border-2 border-black p-1 rounded w-1/3" v-model="searchTerm">
    </div>
    <div class="flex flex-row w-full justify-start items-center mb-4 ">
      <h2 class="text-lg font-bold w-1/2">Naam</h2>
      <h2 class="text-lg font-bold w-1/2">Rol</h2>
    </div>
    <div class="overflow-auto max-h-[80%] w-full">
      <div v-for="(user, index) in filteredUsers"
          :key="index"
          :class="{ 'bg-gray-50': index % 2 === 0 }"
          class="flex flex-row items-center justify-start border-b-2 p-2 last:border-b-none"
        >
        <p class="w-1/2">{{ user.naam }}</p>
        <p class="w-1/2">{{ user.role }}</p>
        
      </div>
    </div>
    
  </div>
    
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_USERS_BY_ROLE } from '@/graphql/user.query'
import { computed, ref } from 'vue'

const data = ref<any | null>(null)
const searchTerm = ref('')

const { onResult, refetch } = useQuery(GET_USERS_BY_ROLE)

onResult(result => {
      if (result.data) {
        console.log('Data:', result.data.findByRole)
        data.value = result.data.findByRole
      }
    })

const filteredUsers = computed(() => {
  if (data.value) {
    return data.value.filter((user: any) => {
      return user.naam.toLowerCase().includes(searchTerm.value.toLowerCase())
    })
  }
})


export default {
  setup() {
    return { data, searchTerm, filteredUsers }
  },
}
</script>
