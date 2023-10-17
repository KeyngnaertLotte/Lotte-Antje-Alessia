<template>
  <div
    class="col-span-2 row-start-8 row-span-17 bg-white rounded-xl m-4 grid grid-rows-17"
  >
    <p class="font-bold font-body text-2xl m-3">AGENDA</p>
    <!-- <div class="flex flex-row w-full justify-around row-start-3 font-body">
            <button :class="['border', 'px-6', 'border-3', 'border-[#94C9A9]', 'rounded-lg', {'bg-[#94C9A9]':activeButton === 1}, {'text-white':activeButton === 1}]" @click="handleButtonClick(1)"><p class="font-medium">ANTJE</p></button>
            <button :class="['border', 'px-6', 'border-3', 'border-[#777DA7]', 'rounded-lg', {'bg-[#777DA7]':activeButton === 2}, {'text-white':activeButton === 2}]" @click="handleButtonClick(2)"><p class="font-medium">LOTTE</p></button>
            <button :class="['border', 'px-6', 'border-3', 'border-[#D5573B]', 'rounded-lg', {'bg-[#D5573B]':activeButton === 3}, {'text-white':activeButton === 3}]" @click="handleButtonClick(3)"><p class="font-medium">ALÉSSIA</p></button>
        </div> -->
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
import Container from '@/components/generic/Container.vue'
import { GET_Artiest_By_Uid } from '@/graphql/artiest.query'
import useCustomUser from '@/composables/useCustomUser'

const { customUser } = useCustomUser()
const uid = customUser.value?.uid
const AgendaItems = ref<any | null>(null)

export default {
  components: {
    Container,
  },
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

    getBezoekerInfo()

    return { customUser, AgendaItems }
  },
}
</script>
