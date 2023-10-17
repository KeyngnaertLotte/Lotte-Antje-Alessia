<template>
        <div class="col-span-1 row-start-4 row-span-4 bg-[#885053] rounded-xl m-4 flex flex-col items-center p-2">
            <p class="text-white font-body font-bold text-2xl self-start">SALDO</p>
            <p v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" class="text-white font-pop font-extrabold text-3xl pt-4">€ {{ bezoekerInfo.bezoekerByUid.saldo }}</p>
        </div>
        <div class="col-span-1 row-start-4 row-span-4 bg-custom-lightGreen rounded-xl m-4 flex flex-col items-center ">
            <p class="font-bold font-body text-2xl p-2">DRINK&FOOD</p>
            <p class=""><QrCode class="w-16 h-16"/></p>
        </div>
        <FavoriteArtists v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" :artiest="bezoekerInfo.bezoekerByUid.favoartiest"/>
  </template>
  
  <script lang="ts">
    import { QrCode } from 'lucide-vue-next';
    import AppHeader from '@/components/AppHeader.vue';
    import FavoriteArtists from '@/components/bezoeker/FavoriteArtists.vue';
    import useCustomUser from '@/composables/useCustomUser'

    import { provideApolloClient, useQuery } from '@vue/apollo-composable'
    import { GET_BEZOEKER_BY_UID } from '@/graphql/bezoeker.query'
    import useGraphql from '../../../composables/useGraphql'
    import { ref } from 'vue';


    const { customUser } = useCustomUser()
    const { apolloClient } = useGraphql()
    provideApolloClient(apolloClient)
    const uid = customUser.value?.uid;
    const bezoekerInfo = ref<any | null>(null);
    export default {
        components: {
            AppHeader,
            FavoriteArtists,
            QrCode,
        },
        setup() {
    

    const getBezoekerInfo = async () => {
        console.log('uid:', uid);
      try {
        const { onResult } = useQuery(GET_BEZOEKER_BY_UID, { uid });
        onResult((result) => {
          if (result.data) {
            console.log('Data:', result.data);
            bezoekerInfo.value = result.data;  // Update the ref with the fetched data
            console.log('bezoekerInfo:', bezoekerInfo.value.bezoekerByUid.naam);
          }
        });
      } catch (error) {
        console.error('Error fetching bezoeker info:', error);
      }
    };

    getBezoekerInfo();  // Call the function to fetch the data

    return { customUser, getBezoekerInfo, bezoekerInfo };  // Return bezoekerInfo
  },
};
  </script>