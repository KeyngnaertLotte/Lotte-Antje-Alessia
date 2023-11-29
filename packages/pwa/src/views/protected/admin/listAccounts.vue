<template>
  <div class="mt-8">
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 font-semibold">Naam</th>
          <th class="py-2 px-4 font-semibold">Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in data"
          :key="index"
          :class="{ 'bg-gray-50': index % 2 === 0 }"
        >
          <td class="py-2 px-4">{{ user.naam }}</td>
          <td class="py-2 px-4">{{ user.role }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_USERS_BY_ROLE } from '@/graphql/user.query'
import { ref } from 'vue'

const data = ref<any | null>(null)

export default {
  setup() {
    const { onResult, refetch } = useQuery(GET_USERS_BY_ROLE)

    const getUsersPersoneelArtiest = async () => {
      try {
        onResult(result => {
          if (result.data) {
            console.log('Data:', result.data.findByRole)
            data.value = result.data.findByRole
          }
        })
      } catch (error) {
        console.error('Error fetching bezoeker info:', error)
      }
    }
    getUsersPersoneelArtiest()
    return { data }
  },
}
</script>
