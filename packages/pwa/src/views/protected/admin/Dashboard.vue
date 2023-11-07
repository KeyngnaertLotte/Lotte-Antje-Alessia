<template>
  <div class="w-full">
    <Container class="p-4 mt-8">
      <div class="bg-white rounded-lg shadow-md p-4">
        <h1 class="text-2xl font-bold mb-4">List of Staff</h1>

        <div class="flex items-start justify-between">
          <div class="w-1/2 mt-1"> <!-- Added mt-1 for extra margin -->
            <h2 class="text-lg font-semibold">Naam</h2>
            <ul>
              <li
                v-for="(item, index) in personeelInfo"
                :key="item.id"
                class="flex items-center justify-between py-4.9 ">
                <span class="flex items-center">
                  <span class="mr-2">{{ item.voornaam }} {{ item.achternaam }}</span>
                </span>
              </li>
            </ul>
          </div>
          <div class="w-1/2">
            <h2 class="text-lg font-semibold">Type werknemer</h2>
            <ul>
              <li
                v-for="(item, index) in personeelInfo"
                :key="item.id"
                class="flex items-center justify-between py-4"
              >
                <select
                  v-model="item.type"
                  @change="onChange(item, index, ($event.target as HTMLInputElement)?.value)"
                  class="px-2 py-1 border rounded-lg"
                >
                  <option
                    :value="option"
                    v-for="option in types"
                    :key="option"
                    class="capitalize"
                  >
                    {{ option }}
                  </option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>





<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
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
  components: { Container },

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
