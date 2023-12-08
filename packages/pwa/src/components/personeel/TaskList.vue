<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { PlusCircle, X } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_TASK } from '@/graphql/taak.mutation'

const props = defineProps({
  takenlijst: {
    type: Array as () => Array<any>,
  },
})

const { mutate: createTask } = useMutation(CREATE_TASK)

const newTaskName = ref('')
const newTaskPlaats = ref('')
const newTaskAantal = ref<number>(1)
const newTaskDeadline = ref('')
const newTaskCategory = ref('')
const newTaskType = ref('')

const showAddTaskPopup = ref(false)
const showMessageCreated = ref(false)

const toegevoegdMessage = ref('')

const openAddTaskPopup = () => {
  showAddTaskPopup.value = true
}

const closeAddTaskPopup = () => {
  showAddTaskPopup.value = false
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

const validateAantalInput = () => {
  newTaskAantal.value = Math.min(100, Math.max(1, newTaskAantal.value))
}
</script>

<template>
  <div class="bg-white shadow-md p-4 rounded-2xl col-span-2 h-fit mx-4">
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-xl">Takenlijst</h1>
      <button @click="openAddTaskPopup">
        <PlusCircle class="stroke-custom-blue" />
      </button>
    </div>
    <div class="mt-3" v-for="taak in takenlijst">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-1">
        <div class="flex items-center col-span-4">
          <input
            type="checkbox"
            class="form-checkbox accent-custom-green h-5 w-5 mr-3"
            id="checkbox"
          />
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
          class="absolute top-[-1rem] right-[-0.5rem] flex flex-row bg-[#D5573B] rounded-lg h-12 w-12 justify-center items-center"
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
            class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
          />
          <select
            v-model="newTaskPlaats"
            class="w-full bg-gray-200 rounded font-pop p-2 text-xl focus:outline-none"
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
            class="w-full bg-gray-200 rounded font-pop p-2 text-xl focus:outline-none"
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
            class="w-full bg-gray-200 rounded font-pop p-2 text-xl focus:outline-none"
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
            class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
          />
          <input
            v-model="newTaskDeadline"
            type="time"
            class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
          />
          <button
            @click="addTask"
            class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 items-center justify-center"
          >
            Voeg toe
          </button>
        </div>
      </div>
    </div>
    <div
      class="fixed z-1 row-span-2 left-0 top-auto w-full h-fit flex justify-center items-center"
    >
      <div class="flex justify-center items-center">
        <p
          v-if="showMessageCreated == true"
          class="bg-[#777DA7] text-white rounded-md p-3 opacity-85 shadow-sm"
        >
          Taak toegevoegd!
        </p>
      </div>
    </div>
  </div>
</template>
