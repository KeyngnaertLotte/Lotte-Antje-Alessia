<template>
  <Container>
    <div>
      <h1>List of Staff</h1>
      <ul>
        <li v-for="(item, index) in personeelInfo">
          {{ item.voornaam }} {{ item.achternaam }} - {{ item.type }}
          <select v-model="item.type">
            <option disabled value="">{{item.type}}</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
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

    getPersoneelInfo()

    return { personeelInfo }
  },
}
</script>
