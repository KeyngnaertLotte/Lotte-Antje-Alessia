<template>
    <div class="col-span-2 row-start-5 row-span-full bg-primary">
      <div class="h-[93%] overflow-auto">
        <AppLineUpVue v-if="bezoekerInfoLoaded" :favorites="bezoekerInfo.bezoekersFavorite" />
      </div>
    </div>
</template>
  
  
  <script lang="ts">
    import useCustomUser from '@/composables/useCustomUser'
    import { provideApolloClient, useQuery } from '@vue/apollo-composable'
    import { GET_FAVOARTISTS_BY_ID } from '@/graphql/bezoeker.query'
    import useGraphql from '../../../composables/useGraphql'
    import { onMounted, ref } from 'vue';
    import AppLineUpVue from '@/components/AppLineUp.vue';

    const { customUser } = useCustomUser();
    const { apolloClient } = useGraphql();
    provideApolloClient(apolloClient);
    const uid = customUser.value?.uid;
    const bezoekerInfo = ref<BezoekerInfo>({});
    const bezoekerInfoLoaded = ref(false);
    const { error, result, loading, refetch, onResult } = useQuery(GET_FAVOARTISTS_BY_ID, { uid });

    onResult((result) => {
        if (result.data) {
        console.log('Data:', result.data);
        bezoekerInfo.value = result.data;
        bezoekerInfoLoaded.value = true; // Data is now available
        }
    });

    onMounted(() => {
        refetch()
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    });

    interface BezoekerInfo {
        bezoekersFavorite?: any[]
    }

    export default {
    components: {
        AppLineUpVue,
    },
    setup() {
        return { bezoekerInfo, bezoekerInfoLoaded };
    },
    };
</script>
