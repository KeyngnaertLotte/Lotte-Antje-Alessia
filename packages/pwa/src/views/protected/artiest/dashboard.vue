<template>
  <div class="max-h-screen grid grid-cols-2 grid-rows-24 h-screen bg-[#EFEFEF]">
        <div class="col-span-2 row-span-3 ">
            <AppHeader/>
        </div>
        <div class="col-span-1 row-start-4 row-span-4 bg-[#885053] rounded-xl m-4 flex flex-col items-center p-2">
            <p class="text-white font-body font-bold text-2xl self-start">IK HEB IETS NODIG</p>
            <!-- <p class="text-white font-pop font-extrabold text-3xl pt-4">€ 24,00</p> -->
        </div>
        <div class="col-span-1 row-start-4 row-span-4 bg-[#C6ECAE] rounded-xl m-4 flex flex-col items-center ">
            <p class="font-bold font-body text-2xl p-2 self-start">VIP-LIJST</p>
            <!-- <p class=""><QrCode class="w-16 h-16"/></p> -->
        </div>
        <AgendaArtist/>
    </div>


</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
    import Container from '@/components/generic/Container.vue';
    import { ALL_Artiesten } from '@/graphql/artiest.query';
    import { AlignJustify, QrCode } from 'lucide-vue-next';
    import AppHeader from '@/components/AppHeader.vue'
    // import FavoriteArtists from '@/components/artiest/FavoriteArtists.vue';
    import AgendaArtist from '@/components/artiest/AgendaArtist.vue';

    export default {
        
        components: { Container, AppHeader, AgendaArtist},

        setup() {
            const {loading: ArtiestenLoading, result: ArtiestenData, error: ArtiestenError} = useQuery(ALL_Artiesten)
            console.log(ArtiestenData)
            return {
                ArtiestenData,
                ArtiestenLoading,
                ArtiestenError,
            }
        },
    }
</script>