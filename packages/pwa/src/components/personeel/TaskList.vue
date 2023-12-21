<template>
  <div class="bg-white shadow-md p-4 rounded-2xl col-span-2 h-fit mx-4">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-xl">
        {{ $t('dashboard.takenlijst', { user: firebaseUser?.displayName }) }}
      </h1>
      <button
        @click="handleClick"
        class="focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
      >
        <PlusCircle class="stroke-custom-purple" />
      </button>
    </div>
    <div class="mt-3" v-for="taak in takenlijst">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-1">
        <div class="flex items-center col-span-4">
          <button
            @click="taakDone(taak.id)"
            :id="taak.id"
            class="px-3 py-1 bg-custom-orange hover:bg-custom-brown text-white my-2 mx-2 rounded w-fit focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
          >
            Done
          </button>
          <label for="checkbox">{{ taak.naam }}</label>
        </div>
        <p class="text-end col-span-1 self-center">{{ taak.deadline }}</p>
      </div>
    </div>
    <div
      v-if="showTaskDonePopup"
      class="fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
        <button
          @click="closeTaskDonePopup"
          class="absolute top-[-1rem] right-[-0.5rem] flex flex-row bg-custom-orange rounded-lg h-12 w-12 justify-center items-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
        >
          <X class="h-10 w-10 stroke-white" />
        </button>
        <div class="p-6 flex flex-col justify-around items-center">
          <h1 class="text-3xl font-body font-bold text-custom-orange my-6 text-center">
            Weet je zeker dat je de taak hebt afgerond?
          </h1>
          <div class="flex justify-around w-full px-4 gap-4">
            <button
              @click="deleteTask"
              class="mt-6 w-1/4 rounded-md bg-custom-green py-2 px-4 font-body font-bold text-2xl text-black flex gap-4 items-center justify-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
            >
              Ja
            </button>
            <button
              @click="closeTaskDonePopup"
              class="mt-6 w-1/4 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 items-center justify-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
            >
              Nee
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { PlusCircle, X } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { REMOVE_TASK_FROM_LIST } from '@/graphql/taak.mutation'
import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { useQuery } from '@vue/apollo-composable'
import { GET_PERSONEEL_BY_UID } from '@/graphql/personeel.query'
import { useRouter } from 'vue-router'; 


const router = useRouter(); 

const { customUser } = useCustomUser()
const uid = customUser.value?.uid


const showTaskDonePopup = ref(false)
const currentTaakId = ref('')


const closeTaskDonePopup = () => {
  showTaskDonePopup.value = false
  refetch()
}

const handleClick = () => {
  router.push('/personeel/taken')
}

const personeelInfo = ref<any | null>(null)
const takenlijst = ref<any | null>(null)

const { onResult, refetch } = useQuery(GET_PERSONEEL_BY_UID, { uid })
const getPersoneelInfo = async () => {
  // console.log('uid:', uid)
  try {
    onResult(result => {
      if (result.data) {
        // console.log('Data:', result.data)
        personeelInfo.value = result.data // Update the ref with the fetched data
        // console.log(
        //   'personeelInfo:',
        //   personeelInfo.value.personeelByUid.achternaam,
        // )

        takenlijst.value = personeelInfo.value.personeelByUid.takenlijst
        // console.log('takenlijst:', takenlijst.value)
      }
    })
  } catch (error) {
    console.error('Error fetching personeel info:', error)
  }
}

getPersoneelInfo()


const taakDone = (taakId: string) => {
  // console.log('taak done')
  currentTaakId.value = taakId
  showTaskDonePopup.value = true
}

const deleteTask = () => {
  const taakId = currentTaakId.value
  // console.log('delete task: ', taakId)

  const { mutate: removeTaak } = useMutation(REMOVE_TASK_FROM_LIST)

  removeTaak({ id: taakId, uid: uid })
  // console.log('taakId is: ', taakId)
  // console.log('taak verwijderd')
  showTaskDonePopup.value = false
  refetch()
}

const { firebaseUser } = useFirebase()
</script>
