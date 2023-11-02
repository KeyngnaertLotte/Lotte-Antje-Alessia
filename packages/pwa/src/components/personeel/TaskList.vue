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
    class="bg-white shadow-md w-full p-4 rounded-2xl"
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
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div class="flex justify-between mb-4 items-center">
          <h2 class="text-xl font-semibold">Add Task</h2>
          <button
            @click="closeAddTaskPopup"
            class="bg-gray-300 text-gray-700 px-2 py-1 rounded hover-bg-gray-400"
          >
            <X/>
          </button>
        </div>
        <input
          v-model="newTaskName"
          type="text"
          placeholder="Task Name"
          class="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <input
          v-model="newTaskDeadline"
          type="date"
          class="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <div class="flex justify-end">
          <button
            @click="addTask"
            class="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 mr-2"
          >
            Add
          </button>
          <!-- <button
            @click="closeAddTaskPopup"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover-bg-gray-400"
          >
            Close
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>
