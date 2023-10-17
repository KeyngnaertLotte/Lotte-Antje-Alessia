<template>
      <div :class="['max-h-screen', 'grid', 'grid-cols-2', 'grid-rows-24', 'h-screen', `bg-${bgColorClass}`]">
          <div class="col-span-2 row-span-3 ">
              <AppHeader v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid" :naam="bezoekerInfo.bezoekerByUid.naam"/>
          </div>
          
        <RouterView/>
      </div>
    </template>
    
    <script lang="ts">
      import { QrCode } from 'lucide-vue-next';
      import AppHeader from '@/components/AppHeader.vue';
      import FavoriteArtists from '@/components/bezoeker/FavoriteArtists.vue';
      import useCustomUser from '@/composables/useCustomUser'
  
      import { provideApolloClient, useQuery } from '@vue/apollo-composable'
      import { GET_BEZOEKER_BY_UID } from '@/graphql/bezoeker.query'
      import useGraphql from '../../composables/useGraphql'
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
        computed: {
            bgColorClass() {
                const routeSegment = this.$route.path.split('/')[2];
                console.log('routeSegment:', routeSegment);
                return routeSegment === 'lineup' ? 'primary' : 'secondary';
            }
        }
        

  };
    </script>