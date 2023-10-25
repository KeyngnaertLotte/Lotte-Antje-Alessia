<template>
      <div :class="['max-h-screen', 'grid', 'grid-cols-2', 'grid-rows-24', 'h-screen', `${bgColorClass}`]">
          <div class="col-span-2 row-span-3 ">
              <AppHeader v-if="userName" :naam="userName"/>
          </div>
        <RouterView/>
      </div>
    </template>
    
    <script lang="ts">
      import { QrCode } from 'lucide-vue-next';
      import AppHeader from '@/components/AppHeader.vue';
      import FavoriteArtists from '@/components/bezoeker/FavoriteArtists.vue';
      import useCustomUser from '@/composables/useCustomUser';

      const { customUser } = useCustomUser()
      var userName = customUser.value?.naam

      

      export default {
          components: {
              AppHeader,
              FavoriteArtists,
              QrCode,
          },
            setup() {
                // console.log('userName:', userName);
                userName = customUser.value?.naam
                return {
                    userName
                }
            },

        computed: {
            bgColorClass() {
                const routeSegment = this.$route.path.split('/')[2];
                // console.log('routeSegment:', routeSegment);
                return routeSegment === 'lineup' ? 'bg-primary' : 'bg-secondary';
            }
            },
        }
        

    </script>