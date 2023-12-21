import EventPopup from '@/components/admin/eventPopup.vue';
<template>
  <div
    class="col-span-2 row-span-22 flex flex-row items-center justify-center"
    id="teleport-target"
  >
    <div class="bg-white w-full h-[95%] rounded-lg m-4 p-6">
      <h1 class="text-2xl font-bold mb-4 font-body">Agenda alle artiesten</h1>
      <div class="grid grid-rows-1 grid-cols-10 w-full bg-gray-200 mb-4">
        <h2 class="col-span-1"></h2>
        <h2 class="col-span-3 text-center text-lg font-bold">Antje</h2>
        <h2 class="col-span-3 text-center text-lg font-bold">Lotte</h2>
        <h2 class="col-span-3 text-center text-lg font-bold">Aléssia</h2>
      </div>
      <div class="overflow-auto max-h-[80%]">
        <div class="grid grid-rows-35 grid-cols-10">
          <agendaTimes />
          <artistAgenda
            v-for="artist in data"
            :key="artist.uid"
            :artist="artist"
            @open-modal="handleOpenModal"
          />
        </div>
      </div>
    </div>
  </div>
  <EventPopup
    v-if="isModalOpen"
    :eventData="selectedItem"
    @close-modal="handleCloseModal"
  />
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_Artiesten } from '@/graphql/artiest.query'
import { Pencil } from 'lucide-vue-next'
import agendaTimes from '@/components/admin/AgendaTimes.vue'
import artistAgenda from '@/components/admin/ArtistAgenda.vue'
import { computed, ref } from 'vue'
import EventPopup from '@/components/admin/eventPopup.vue'

const data = ref<any | null>(null)
const isModalOpen = ref(false)
const selectedItem = ref<any | null>(null)

const { onResult, refetch } = useQuery(ALL_Artiesten)

onResult(result => {
  if (result.data) {
    data.value = result.data.artiesten
  }
})

const handleOpenModal = (item: any) => {
  console.log(item)
  isModalOpen.value = true
  selectedItem.value = item
}
const handleCloseModal = async () => {
  isModalOpen.value = false
  selectedItem.value = null
  await refetch()
  console.log('refetch', data.value)
}

export default {
  components: {
    Pencil,
    agendaTimes,
    artistAgenda,
    EventPopup,
  },
  setup() {
    return {
      data,
      handleOpenModal,
      isModalOpen,
      selectedItem,
      handleCloseModal,
    }
  },
}
</script>
