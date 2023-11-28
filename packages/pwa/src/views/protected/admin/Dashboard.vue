<template>
  <!-- <Container/> -->
  <div
    class="row-start-4 col-span-2 row-span-21 grid grid-rows-5 grid-cols-5 gap-4 m-4"
  >
    <div class="bg-white w-full mx-auto p-6 rounded-lg shadow-md row-span-5 col-span-3 ">
      <h1 class="text-2xl font-bold mb-4 font-body">Lijst van personeel</h1>
      <div class="flex items-center justify-between mb-4 px-2">
        <h2 class="text-lg font-bold w-1/4">Achternaam</h2>
        <h2 class="text-lg font-bold w-1/4">Voornaam</h2>
        <select class="text-lg font-bold w-1/4 p-2 rounded-md">
          <option value="none" selected>Type</option>
          <option v-for="option in types" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <p class="w-1/14 flex justify-end items-center text-lg font-bold"> </p>
      </div>
      <div class="overflow-auto max-h-[80%]">
        <div
        v-for="(item, index) in personeelInfo"
        :key="item.id"
        class="flex items-center justify-between border-b-2 p-2 last:border-b-none"
      >
        <p class="w-1/4"> {{ item.achternaam }}</p>
        <p class="w-1/4">{{ item.voornaam }}</p>
          <select
            class="w-1/4 border p-2 rounded-md"
            v-model="item.type"
            @change="
              onChange(item, index, ($event.target as HTMLInputElement)?.value)
            "
          >
            <option :value="option" v-for="option in types" :key="option">
              {{ option }}
            </option>
          </select>
        <button class="w-1/14 flex justify-center items-center"><Trash2 class=" stroke-1.5"/></button>
      </div>
      </div>
      
    </div>
    <div class="row-span-2 col-span-2 bg-[#D5573B] rounded-lg shadow-md">
      <h1>Bericht</h1>
    </div>
    <div class="row-span-3 col-span-2 bg-[#D5573B] rounded-lg shadow-md">
      <h1>Taken toevoegen</h1>
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
import { Trash2 } from 'lucide-vue-next';

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
  components: { Trash2 },

  setup() {
    const getPersoneelInfo = async () => {
      //   console.log('uid:', uid)
      try {
        const { onResult } = useQuery(GET_PERSONEEL)
        onResult(result => {
          if (result.data) {
            const sortedPersoneel = [...result.data.personeel];

          // Sort the array by achternaam
          sortedPersoneel.sort((a: Personeel, b: Personeel) =>
            a.achternaam.localeCompare(b.achternaam)
          );

          // Update personeelInfo with the sorted array
          personeelInfo.value = sortedPersoneel;
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
