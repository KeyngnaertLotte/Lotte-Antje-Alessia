<template>
  <cardSm
    title="item"
    :isPopup="false"
    class="col-span-1 row-start-4 row-span-4 "
    
    :url="'/artiest/items'"
  />
  <AgendaArtist />
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ALL_Artiesten } from '@/graphql/artiest.query'
import AppHeader from '@/components/AppHeader.vue'
import AgendaArtist from '@/components/artiest/AgendaArtist.vue'
import cardSm from '@/components/generic/CardSm.vue'
import ItemPopUp from '@/components/artiest/ItemPopUp.vue'
import useCustomUser from '@/composables/useCustomUser'

import { ref } from 'vue'

const { customUser } = useCustomUser()

const uid = customUser.value?.uid

const isModalOpen = ref(false)

export default {
  components: { AppHeader, AgendaArtist, cardSm, ItemPopUp },

  setup() {
    const dataFromChild = ref<string>('')

    const handleDataFromChild = (data: string) => {
      dataFromChild.value = data
      if (dataFromChild.value === 'open-popup') {
        isModalOpen.value = true
      }
    }

    const handleCloseModal = () => {
      isModalOpen.value = false
    }

    return {
      handleCloseModal,
      handleDataFromChild,
      isModalOpen,
      uid,
    }
  },
}
</script>
