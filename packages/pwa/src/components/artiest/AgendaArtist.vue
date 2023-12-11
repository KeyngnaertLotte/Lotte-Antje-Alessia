<template>
  <div
    class="col-span-2 row-start-8 row-span-17 bg-white rounded-xl m-4 grid grid-rows-17 relative"
  >
    <p class="font-bold font-body text-2xl m-3">AGENDA</p>
    <div class="overflow-y-auto row-start-3 row-span-16">
      <div
        v-for="(item, index) in AgendaItems"
        :key="index"
        :class="[
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'p-2',
          'm-4',
          'mt-0',
          'rounded-lg',
          `bg-[#94C9A9]`,
        ]"
      >
        <p class="font-bold text-white text-2xl font-body self-start">
          {{ item.taak }}
        </p>
        <p class="text-white text-lg font-body self-start">
          podium: {{ item.podium }}
        </p>
        <p class="text-white text-lg font-body self-end">{{ item.tijd }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_Artiest_By_Uid } from '@/graphql/artiest.query'
import useCustomUser from '@/composables/useCustomUser'
import { MessageCircle } from 'lucide-vue-next'

const { customUser } = useCustomUser()
const uid = customUser.value?.uid
const AgendaItems = ref<any | null>(null)
const showModal = ref(false)
const userName = String(customUser.value?.naam)

export default {
  components: { MessageCircle },
  setup() {
    const getBezoekerInfo = async () => {
      console.log('uid:', uid)
      try {
        const { onResult } = useQuery(GET_Artiest_By_Uid, { uid })
        onResult(result => {
          if (result.data) {
            console.log('Data:', result.data.artiestByUid.agenda)
            AgendaItems.value = result.data.artiestByUid.agenda
          }
        })
      } catch (error) {
        console.error('Error fetching bezoeker info:', error)
      }
    }

    const message = () => {
      showModal.value = true
    }

    getBezoekerInfo()

    return { customUser, AgendaItems, message, showModal, userName }
  },
}
</script>
