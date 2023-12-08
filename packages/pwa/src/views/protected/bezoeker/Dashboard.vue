<template>
  <cardSm title="saldo" url="/bezoeker/saldo" v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" :isPopup="false" :artiest="bezoekerInfo.bezoekerByUid.favoartiest" :value="bezoekerInfo.bezoekerByUid.saldo" class="col-span-1 row-start-4 row-span-4 bg-[#885053]"/>
  <cardSm title="bonnetjes" class="col-span-1 row-start-4 row-span-4 bg-custom-lightGreen" :isPopup="true" @sendDataToParent="handleDataFromChild"/>
  <FavoriteArtists v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" :artiest="bezoekerInfo.bezoekerByUid.favoartiest"/>
  <QrPopup  v-if="isModalOpen" :id="uid ?? ''" @close-modal="handleCloseModal"/>
</template>
  
<script lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import FavoriteArtists from '@/components/bezoeker/FavoriteArtists.vue';
  import useCustomUser from '@/composables/useCustomUser'
  import cardSm from '@/components/generic/CardSm.vue';

  import { provideApolloClient, useQuery } from '@vue/apollo-composable'
  import { GET_BEZOEKER_BY_UID } from '@/graphql/bezoeker.query'
  import useGraphql from '@/composables/useGraphql'
  import { ref } from 'vue';
  import QrPopup from '@/components/bezoeker/QrPopup.vue';
  import useRealtime from '@/composables/useRealtime'

  const { on } = useRealtime()

  const { customUser } = useCustomUser()
  const { apolloClient } = useGraphql()
  provideApolloClient(apolloClient)
  const uid = customUser.value?.uid;
  const bezoekerInfo = ref<any | null>(null);
  const isModalOpen = ref(false);
  const { error, result: bezoekerResult, loading, refetch, onResult } =  useQuery(GET_BEZOEKER_BY_UID, { uid });

  on('bezoekerChangeSaldo:' + uid, (data: any) => {
          console.log('data:', data)
          refetch()
          isModalOpen.value = false;
        })

  onResult((result) => {
    if (result.data) {
      console.log('Data:', result.data);
      bezoekerInfo.value = result.data;  // Update the ref with the fetched data
      // console.log('bezoekerInfo:', bezoekerInfo.value.bezoekerByUid.naam);
    }
  });

  export default {
    components: {
      AppHeader,
      FavoriteArtists,
      cardSm,
      QrPopup
    },

    setup() {
      const dataFromChild = ref<string>(''); 

      const handleDataFromChild = (data: string) => { 
        dataFromChild.value = data;
        // console.log('dataFromChild:', dataFromChild.value);
        if (dataFromChild.value === 'open-popup') {
          // console.log('open popup');
          isModalOpen.value = true;
        }
      }

      const handleCloseModal = () => {
        isModalOpen.value = false;
      } 

      return { customUser, bezoekerInfo, handleDataFromChild, dataFromChild, isModalOpen, uid, handleCloseModal }; 
    },
  };
</script>