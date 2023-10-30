<template>
    <cardSm title="item" class="col-span-1 row-start-4 row-span-4"/>
    <cardSm title="vip lijst" class="col-span-1 row-start-4 row-span-4"/>
    <AgendaArtist/>
</template>

<script lang="ts">
    import { useQuery } from '@vue/apollo-composable';
    import Container from '@/components/generic/Container.vue';
    import { ALL_Artiesten } from '@/graphql/artiest.query';
    import AppHeader from '@/components/AppHeader.vue'
    import AgendaArtist from '@/components/artiest/AgendaArtist.vue';
    import cardSm from '@/components/generic/CardSm.vue';

    export default {
        
        components: { Container, AppHeader, AgendaArtist, cardSm},

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