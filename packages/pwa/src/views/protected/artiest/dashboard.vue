<template>
  <cardSm
    title="item"
    :isPopup="true"
    class="col-span-1 row-start-4 row-span-4"
    @sendDataToParent="handleDataFromChild"
  />
  <!-- <cardSm title="vip lijst" class="col-span-1 row-start-4 row-span-4" /> -->
  <ItemPopUp v-if="isModalOpen"  @close-modal="handleCloseModal" />
  <AgendaArtist />
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_Artiesten } from '@/graphql/artiest.query'
import AppHeader from '@/components/AppHeader.vue'
import AgendaArtist from '@/components/artiest/AgendaArtist.vue'
import cardSm from '@/components/generic/CardSm.vue'
import ItemPopUp from '@/components/artiest/ItemPopUp.vue'

import { ref } from 'vue'

const isModalOpen = ref(false)

export default {
  components: { Container, AppHeader, AgendaArtist, cardSm, ItemPopUp },

  setup() {
    const dataFromChild = ref<string>('')

    const handleDataFromChild = (data: string) => {
      dataFromChild.value = data
      // console.log('dataFromChild:', dataFromChild.value);
      if (dataFromChild.value === 'open-popup') {
        // console.log('open popup');
        isModalOpen.value = true
      }
    }

    const handleCloseModal = () => {
      isModalOpen.value = false
    }

    const {
      loading: ArtiestenLoading,
      result: ArtiestenData,
      error: ArtiestenError,
    } = useQuery(ALL_Artiesten)
    console.log(ArtiestenData)
    return {
      ArtiestenData,
      ArtiestenLoading,
      ArtiestenError,
      handleCloseModal,
      handleDataFromChild,
      isModalOpen,
    }
  },
}
</script>
