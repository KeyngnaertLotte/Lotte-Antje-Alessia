<template>
  <div class="bg-white shadow-md p-4 rounded-2xl col-span-2 h-fit mx-4">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-xl">
        {{ $t('dashboard.takenlijst', { user: firebaseUser?.displayName }) }}
      </h1>
      <button
        @click="openAddTaskPopup"
        class="focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
      >
        <PlusCircle class="stroke-custom-blue" />
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
      v-if="showAddTaskPopup"
      class="fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
        <button
          @click="closeAddTaskPopup"
          class="absolute top-[-1rem] right-[-0.5rem] flex flex-row bg-custom-orange rounded-lg h-12 w-12 justify-center items-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
        >
          <X class="h-10 w-10 stroke-white" />
        </button>
        <div class="flex flex-col justify-around items-center h-full">
          <h1 class="text-3xl font-body font-bold text-custom-orange my-6">
            Taak toevoegen
          </h1>

          <input
            v-model="newTaskName"
            type="text"
            placeholder="Taak naam"
            class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
          <select
            v-model="newTaskPlaats"
            class="w-full bg-gray-200 rounded font-pop p-2 text-xl focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          >
            <option disabled value="" class="text-gray">Plaats</option>
            <option class="text-black">Lotte</option>
            <option class="text-black">Antje</option>
            <option class="text-black">Aléssia</option>
            <option class="text-black">Bar</option>
            <option class="text-black">Toiletten</option>
            <option class="text-black">Backstage</option>
            <option class="text-black">Andere</option>
          </select>
          <select
            v-model="newTaskType"
            class="w-full bg-gray-200 rounded font-pop p-2 text-xl focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          >
            <option disabled value="" class="text-gray">Type</option>
            <option class="text-black">Podium - licht</option>
            <option class="text-black">Podium - geluid</option>
            <option class="text-black">Bar - eten</option>
            <option class="text-black">bar - drank</option>
            <option class="text-black">Allround</option>
            <option class="text-black">Kuisen</option>
            <option class="text-black">Aanvulling</option>
            <option class="text-black">Loges</option>
          </select>
          <select
            class="w-full bg-gray-200 rounded font-pop p-2 text-xl focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="newTaskCategory"
          >
            <option disabled value="" class="text-gray">Categorie</option>
            <option class="text-black">Drank</option>
            <option class="text-black">Eten</option>
            <option class="text-black">Geluid</option>
            <option class="text-black">Instrument</option>
            <option class="text-black">Licht</option>
            <option class="text-black">Andere</option>
          </select>
          <input
            v-model="newTaskAantal"
            type="number"
            max="100"
            min="1"
            @input="validateAantalInput"
            class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
          <input
            v-model="newTaskDeadline"
            type="time"
            class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 text-xl focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
          <button
            @click="addTask"
            class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 items-center justify-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
          >
            Voeg toe
          </button>
        </div>
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
        <div class="flex flex-col justify-around items-center h-full">
          <h1 class="text-3xl font-body font-bold text-custom-orange my-6">
            Weet je zeker dat je de taak hebt afgerond?
          </h1>
          <div class="flex justify-around w-full px-4 gap-4">
            <button
              @click="deleteTask"
              class="mt-6 w-1/4 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 items-center justify-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
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
    <div
      class="fixed z-1 row-span-2 left-0 top-auto w-full h-fit flex justify-center items-center"
    >
      <div class="flex justify-center items-center">
        <p
          v-if="showMessageCreated == true"
          class="bg-custom-purple text-white rounded-md p-3 opacity-85 shadow-sm"
        >
          Taak toegevoegd!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { PlusCircle, X } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { REMOVE_TAAK_BIJ_PERSONEEL } from '@/graphql/personeel.mutation'
import { CREATE_TASK, REMOVE_TASK_FROM_LIST } from '@/graphql/taak.mutation'
import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { useQuery } from '@vue/apollo-composable'
import { GET_PERSONEEL_BY_UID } from '@/graphql/personeel.query'

import useLanguage from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import { stringify } from 'querystring'



const { customUser } = useCustomUser()
const uid = customUser.value?.uid

const { mutate: createTask } = useMutation(CREATE_TASK)

const newTaskName = ref('')
const newTaskPlaats = ref('')
const newTaskAantal = ref<number>(1)
const newTaskDeadline = ref('')
const newTaskCategory = ref('')
const newTaskType = ref('')

const showAddTaskPopup = ref(false)
const showTaskDonePopup = ref(false)
const showMessageCreated = ref(false)

const toegevoegdMessage = ref('')

const currentTaakId = ref('')

const openAddTaskPopup = () => {
  showAddTaskPopup.value = true
}

const closeAddTaskPopup = () => {
  showAddTaskPopup.value = false
}
const openTaskDonePopup = (taakId: string) => {
  showTaskDonePopup.value = true
}

const closeTaskDonePopup = () => {
  showTaskDonePopup.value = false
  refetch()
}

const hideMessage = () => {
  showMessageCreated.value = false
}

const addTask = () => {
  if (
    newTaskName.value &&
    newTaskDeadline.value &&
    newTaskPlaats.value &&
    newTaskType.value &&
    newTaskCategory.value &&
    newTaskAantal.value
  ) {
    showAddTaskPopup.value = false

    createTask({
      createTakenInput: {
        naam: newTaskName.value,
        deadline: newTaskDeadline.value,
        plaats: newTaskPlaats.value,
        type: newTaskType.value,
        category: newTaskCategory.value,
        aantal: newTaskAantal.value,
      },
    }).then(graphqlresult => {
      console.log(graphqlresult)
      toegevoegdMessage.value = 'Taak toegevoegd!'

      newTaskName.value = ''
      newTaskPlaats.value = ''
      newTaskType.value = ''
      newTaskCategory.value = ''
      newTaskAantal.value = 1
      newTaskDeadline.value = ''
    })

    const instance = getCurrentInstance()
    if (instance) {
      instance.emit('task-added')
    }

    showMessageCreated.value = true
    setTimeout(hideMessage, 5000)
  }
}

const personeelInfo = ref<any | null>(null)
const takenlijst = ref<any | null>(null)

const { onResult, refetch } = useQuery(GET_PERSONEEL_BY_UID, { uid })
const getPersoneelInfo = async () => {
  console.log('uid:', uid)
  try {
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

getPersoneelInfo()


const taakDone = (taakId: string) => {
  console.log('taak done')
  currentTaakId.value = taakId
  showTaskDonePopup.value = true
}

const deleteTask = () => {
  const taakId = currentTaakId.value
  console.log('delete task: ', taakId)

  const { mutate: removeTaak } = useMutation(REMOVE_TASK_FROM_LIST)

  // removeTaakBijPersoneel({ id: taakId })
  removeTaak({ id: taakId, uid: uid })
  console.log('taakId is: ', taakId)
  console.log('taak verwijderd')
  showTaskDonePopup.value = false
  refetch()
}

const validateAantalInput = () => {
  newTaskAantal.value = Math.min(100, Math.max(1, newTaskAantal.value))
}

const { firebaseUser, logout } = useFirebase()
</script>
