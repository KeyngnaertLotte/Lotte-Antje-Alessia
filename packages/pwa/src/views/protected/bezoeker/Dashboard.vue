<template>
        <cardSm title="saldo" url="/bezoeker/saldo" v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" :artiest="bezoekerInfo.bezoekerByUid.favoartiest" :value="bezoekerInfo.bezoekerByUid.saldo" class="col-span-1 row-start-4 row-span-4 bg-[#885053]"/>
        <cardSm title="bonnetjes" class="col-span-1 row-start-4 row-span-4 bg-custom-lightGreen "/>
        <FavoriteArtists v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" :artiest="bezoekerInfo.bezoekerByUid.favoartiest"/>
  </template>
  
  <script lang="ts">
    import { QrCode } from 'lucide-vue-next';
    import AppHeader from '@/components/AppHeader.vue';
    import FavoriteArtists from '@/components/bezoeker/FavoriteArtists.vue';
    import useCustomUser from '@/composables/useCustomUser'
    import cardSm from '@/components/generic/CardSm.vue';

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
            cardSm,
        },
        setup() {
    

    const getBezoekerInfo = async () => {
        // console.log('uid:', uid);
      try {
        const { onResult } = useQuery(GET_BEZOEKER_BY_UID, { uid });
        onResult((result) => {
          if (result.data) {
            console.log('Data:', result.data);
            bezoekerInfo.value = result.data;  // Update the ref with the fetched data
            // console.log('bezoekerInfo:', bezoekerInfo.value.bezoekerByUid.naam);
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