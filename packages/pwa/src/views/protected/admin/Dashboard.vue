<template>
    <!-- <Container/> -->
    <div class="row-start-4 col-span-2 row-span-21 flex items-center justify-center">
      <div class="bg-white w-10/12 mx-auto p-6 rounded-lg shadow-md">
  <h1 class="text-3xl font-bold mb-4">Lijst van personeel</h1>
  <div class="flex items-center justify-between mb-4">
    <h2 class="text-lg font-bold w-2/5">Naam</h2>
    <select class="text-lg font-bold w-2/5 p-2 rounded-md">
      <option value="none" selected>Type</option>
      <option v-for="option in types" :key="option" :value="option">{{ option }}</option>
    </select>
    <p class="w-1/5">Edit</p>
  </div>
    <div v-for="(item, index) in personeelInfo" :key="item.id" class="flex items-center justify-between border-b-2 p-2">
      <p class="w-3/7">{{ item.voornaam }} {{ item.achternaam }}</p>
      <div class="w-3/7 flex justify-center items-center">
        <select class="w-1/2 border p-2 rounded-md" v-model="item.type" @change="onChange(item, index, ($event.target as HTMLInputElement)?.value)">
          <option :value="option" v-for="option in types" :key="option">{{ option }}</option>
        </select>
      </div>
      <p class="w-1/7">Edit</p>
    </div>
</div>
    </div>
</template>





<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
// import Container from '@/components/generic/Container.vue'
import { GET_PERSONEEL } from '@/graphql/personeel.query'
import { UPDATE_TYPE } from '@/graphql/personeel.mutation'
import { useMutation } from '@vue/apollo-composable'
import { ref } from 'vue'

interface Personeel {
  id: string
  voornaam: string
  uid: string
  achternaam: string
  type: string
  takenlijst: Takenlijst[]
}

interface Takenlijst {
  plaats: string
  naam: string
  category: string
  aantal: number
  deadline: string
}

const personeelInfo = ref<any | null>(null)

const types = [
  'Podium - licht',
  'Podium - geluid',
  'Bar - eten',
  'Bar - drank',
  'Allround',
  'Kuisen',
  'Aanvulling',
  'Loges',
]

export default {
  // components: { Container },

  setup() {
    const getPersoneelInfo = async () => {
      //   console.log('uid:', uid)
      try {
        const { onResult } = useQuery(GET_PERSONEEL)
        onResult(result => {
          if (result.data) {
            console.log('Data:', result.data.personeel)
            personeelInfo.value = result.data.personeel
          }
        })
      } catch (error) {
        console.error('Error fetching bezoeker info:', error)
      }
    }

    const onChange = (item: Personeel, index: number, newValue: string) => {
      const { mutate: updateType } = useMutation(UPDATE_TYPE)
      console.log(
        `Type changed to ${item.type} for ${item.voornaam} ${item.achternaam} uid: ${item.uid}`,
      )
      console.log(`new value: ${newValue}`)
      updateType({
        updateTypeInput: newValue,
        uid: item.uid,
      })
        .then(graphqlresult => {
          console.log('🎉 type updated in our database')
          console.log(graphqlresult)
        })
        .catch(error => {
          console.log('Error updating type:', error)
        })
    }

    getPersoneelInfo()

    return { personeelInfo, onChange, types }
  },
}
</script>
