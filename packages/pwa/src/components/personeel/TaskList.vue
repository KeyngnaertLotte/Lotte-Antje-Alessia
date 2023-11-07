<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { PlusCircle, X } from 'lucide-vue-next'

const props = defineProps({
  takenlijst: {
    type: Array as () => Array<any>,
  },
})

const newTaskName = ref('')
const newTaskDeadline = ref('')

const showAddTaskPopup = ref(false)

const openAddTaskPopup = () => {
  showAddTaskPopup.value = true
}

const closeAddTaskPopup = () => {
  showAddTaskPopup.value = false
}

const addTask = () => {
  if (newTaskName.value && newTaskDeadline.value) {
    const newTask = {
      naam: newTaskName.value,
      deadline: newTaskDeadline.value,
    }
    newTaskName.value = ''
    newTaskDeadline.value = ''
    showAddTaskPopup.value = false

    const instance = getCurrentInstance()
    if (instance) {
      instance.emit('task-added', newTask)
    }
  }
}
</script>

<template>
  <div
    class="bg-white shadow-md  p-4 rounded-2xl col-span-2 row-span-16 mx-4"
    v-for="taak in takenlijst"
  >
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-xl">Takenlijst</h1>
      <button @click="openAddTaskPopup">
        <PlusCircle class="stroke-custom-blue" />
      </button>
    </div>
    <div class="mt-3">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-2">
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
      class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
        <button
            @click="closeAddTaskPopup"
            class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"><X class="h-10 w-10 stroke-white"/> </button>
        <div class="flex flex-col justify-around items-center h-full ">
          <h1 class="text-3xl font-body font-bold text-custom-orange my-6">Taak toevoegen</h1>
         
         <input
           v-model="newTaskName"
           type="text"
           placeholder="Task Name"
           class="block font-pop w-[90%] border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
         />
         <input
           v-model="newTaskDeadline"
           type="date"
           class="block font-pop w-[90%] border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
         />
           <button
             @click="addTask"
             class="mt-6 w-[90%] rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 items-center justify-center"
           >
             Add
           </button>
        </div>
         
          <!-- <button
            @click="closeAddTaskPopup"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover-bg-gray-400"
          >
            Close
          </button> -->
          </div>
        </div>
      </div>
</template>
