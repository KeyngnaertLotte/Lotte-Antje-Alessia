<template>
  <div
    class="max-h-screen grid grid-cols-2 grid-rows-24 h-screen bg-secondary overflow-hidden"
  >
    <div class="col-span-2 row-span-3">
      <AppHeader v-if="personeelInfo && personeelInfo.personeelByUid" :naam="personeelInfo.personeelByUid.voornaam"/>
    </div>
    <div
      class="flex flex-row items-center justify-center col-span-2 row-start-7"
    >
      <CardSm title="materiaal" />
      <!-- <CardSm title="uurrooster" /> -->
      <CardSm title="scanner" />
    </div>
    <div class="col-span-2 row-start-10 justify-center items-center m-5">
      <task-list />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { GET_PERSONEEL_BY_UID } from '@/graphql/personeel.query'
import CardSm from '@/components/generic/card-sm.vue'
import TaskList from '@/components/generic/task-list.vue'
import AppHeader from '@/components/AppHeader.vue'
import useCustomUser from '@/composables/useCustomUser'
import useGraphql from '@/composables/useGraphql'
import { provideApolloClient } from '@vue/apollo-composable'
import { ref } from 'vue'

import useFirebase from '@/composables/useFirebase'
const { firebaseUser, logout } = useFirebase()
firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

const { customUser } = useCustomUser()
const { apolloClient } = useGraphql()
provideApolloClient(apolloClient)
const uid = customUser.value?.uid
const personeelInfo = ref<any | null>(null)

export default {
  components: { Container, CardSm, TaskList, AppHeader },

  setup() {
    // const {
    //   loading: PersoneelLoading,
    //   error: PersoneelError,
    //   result: PersoneelData,
    // } = useQuery(GET_PERSONEEL_BY_UID)

    const getPersoneelInfo = async () => {
      console.log('uid:', uid)
      try {
        const { onResult } = useQuery(GET_PERSONEEL_BY_UID, { uid });
        onResult((result) => {
          if (result.data) {
            console.log('Data:', result.data)
            personeelInfo.value = result.data;  // Update the ref with the fetched data
            console.log('personeelInfo:', personeelInfo.value.personeelByUid.voornaam);
          }
        })
      } catch (error) {
        console.error('Error fetching personeel info:', error)
      }
    }

    getPersoneelInfo() // Call the function to fetch the data
    return {
      customUser, getPersoneelInfo, personeelInfo
      // PersoneelLoading,
      // PersoneelError,
      // PersoneelData,
    }
  },
}
</script>
