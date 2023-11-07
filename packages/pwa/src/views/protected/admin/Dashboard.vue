<template>
  <Container>
    <div>
      <h1>List of Staff</h1>
      <ul>
        <li v-for="(item, index) in personeelInfo" :key="item.id">
          {{ item.voornaam }} {{ item.achternaam }}
          <select
            v-model="item.type"
            @change="onChange(item, index, ($event.target as HTMLInputElement)?.value)"
          >
            <option :value="option" v-for="option in types" :key="option">
              {{ option }}
            </option>
          </select>
        </li>
      </ul>
    </div>
  </Container>
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
