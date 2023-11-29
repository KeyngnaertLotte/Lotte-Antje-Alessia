<template>
      <cardSm title="materiaal"  class="col-span-1 row-start-4 row-span-4" url="materiaal"/>
      <cardSm title="scanner"  class="col-span-1 row-start-4 row-span-4"/>
      <taskList :takenlijst="takenlijst"/>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { GET_PERSONEEL_BY_UID } from '@/graphql/personeel.query'
import cardSm from '@/components/generic/CardSm.vue';
import taskList from '@/components/personeel/TaskList.vue'
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
const takenlijst = ref<any | null>(null)

export default {
  components: { Container, cardSm, taskList, AppHeader },

  setup() {
    // const {
    //   loading: PersoneelLoading,
    //   error: PersoneelError,
    //   result: PersoneelData,
    // } = useQuery(GET_PERSONEEL_BY_UID)

    const getPersoneelInfo = async () => {
      console.log('uid:', uid)
      try {
        const { onResult } = useQuery(GET_PERSONEEL_BY_UID, { uid })
        onResult(result => {
          if (result.data) {
            console.log('Data:', result.data)
            personeelInfo.value = result.data // Update the ref with the fetched data
            console.log(
              'personeelInfo:',
              personeelInfo.value.personeelByUid.achternaam,
            )

            takenlijst.value = personeelInfo.value.personeelByUid.takenlijst
            console.log('takenlijst:', takenlijst.value)

          }
        })
      } catch (error) {
        console.error('Error fetching personeel info:', error)
      }
    }


    getPersoneelInfo() // Call the function to fetch the data
    return {
      customUser,
      getPersoneelInfo,
      personeelInfo,
      takenlijst
      // PersoneelLoading,
      // PersoneelError,
      // PersoneelData,
    }
  },
}
</script>
