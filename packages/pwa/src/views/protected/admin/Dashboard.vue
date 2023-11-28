<template>
  <!-- <Container/> -->
  <div
    class="row-start-4 col-span-2 row-span-21 grid grid-rows-6 grid-cols-7 gap-4 m-4"
  >
    <div
      class="bg-white w-full mx-auto p-6 rounded-lg shadow-md row-span-6 col-span-5"
    >
      <h1 class="text-2xl font-bold mb-4 font-body">Lijst van personeel</h1>
      <div class="flex items-center justify-between mb-4 px-2">
        <h2 class="text-lg font-bold w-1/4">Achternaam</h2>
        <h2 class="text-lg font-bold w-1/4">Voornaam</h2>
        <select
          class="text-lg font-bold w-1/4 p-2 rounded-md"
          @change="filterByType(($event.target as HTMLInputElement)?.value)"
        >
          <option value="all" selected>Type</option>
          <option value="none">Leeg</option>
          <option v-for="option in types" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <p class="w-1/14 flex justify-end items-center text-lg font-bold"></p>
      </div>
      <div class="overflow-auto max-h-[80%]">
        <div
          v-for="(item, index) in filterPersoneel"
          :key="item.id"
          class="flex items-center justify-between border-b-2 p-2 last:border-b-none"
        >
          <p class="w-1/4">{{ item.achternaam }}</p>
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
          <button class="w-1/14 flex justify-center items-center">
            <Trash2 class="stroke-1.5" />
          </button>
        </div>
      </div>
    </div>
    <div class="row-span-3 col-span-2 p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold font-body">Bericht</h1>
      <form action="" class="flex flex-col justify-between">
        <div class="flex flex-row w-full my-4">
          <label for="" class="mr-4">Voor: </label>
          <select
            name=""
            id=""
            class="bg-gray-200 rounded font-pop text-xl focus:outline-none w-3/4 p-1"
          ></select>
        </div>
        <textarea
          placeholder="Typ hier je mededeling"
          name=""
          id=""
          cols="50"
          rows="3"
          class="w-full block font-pop border-2 rounded-md p-1 focus:outline-none focus:border-4 focus:border-white bg-white"
        ></textarea>

        <button
          class="py-1 bg-custom-purple text-white my-6 rounded w-1/2 self-end"
        >
          VERZEND
        </button>
      </form>
    </div>
    <div class="row-span-3 col-span-2 bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold font-body">Voeg taak toe</h1>
      <form action="" class="flex flex-col justify-around w-full h-full">
        <div class="flex flex-row w-full my-4">
          <label for="" class="mr-4">Voor: </label>
          <select
            name=""
            id=""
            class="bg-gray-200 rounded font-pop text-xl focus:outline-none w-3/4 p-1"
          ></select>
        </div>
        <div class="flex flex-row">
          <label for="" class="mr-4">Taak: </label>
          <input type="text" class="border-b-2 border-b-black w-3/4" />
        </div>

        <button
          class="py-1 bg-custom-orange text-white my-6 rounded w-1/2 self-end"
        >
          VERZEND
        </button>
      </form>
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
import { Trash2 } from 'lucide-vue-next'

// const { error, result: bezoekerResult, loading, refetch, onResult } =  useQuery(GET_BEZOEKER_BY_UID, { uid });
const { error, onResult, refetch } = useQuery(GET_PERSONEEL)

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
const filterPersoneel = ref<any | null>(null)

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

onResult(result => {
  if (result.data) {
    const sortedPersoneel = [...result.data.personeel]

    // Sort the array by achternaam
    sortedPersoneel.sort((a: Personeel, b: Personeel) =>
      a.achternaam.localeCompare(b.achternaam),
    )

    // Update personeelInfo with the sorted array
    personeelInfo.value = sortedPersoneel
    filterPersoneel.value = sortedPersoneel
  }
})

export default {
  // components: { Container },
  components: { Trash2 },

  setup() {
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

    const filterByType = (value: string) => {
      console.log('filter by type', value)
      console.log(
        'personeelInfo.value',
        personeelInfo.value)
      if (value === 'all') filterPersoneel.value = personeelInfo.value
      else if (value === 'none') filterPersoneel.value = personeelInfo.value.filter(
        (item: Personeel) => item.type === "",  
      )
      else filterPersoneel.value = personeelInfo.value.filter(
        (item: Personeel) => item.type === value,
      )
    }

    return { personeelInfo, onChange, types, filterByType, filterPersoneel }
  },
}
</script>
