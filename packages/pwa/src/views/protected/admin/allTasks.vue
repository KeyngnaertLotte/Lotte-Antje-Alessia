<template>
    <div class="col-span-2 rounded-lg bg-white row-span-22 m-5 p-6">
      <div class="w-full flex flex-row justify-between mb-4">
        <h1 class="text-2xl font-bold font-body">Alle taken</h1>
        <button class="flex items-start justify-start bg-custom-orange rounded-lg hover:bg-custom-brown focus:outline-custom-brown focus:bg-custom-brown" @click="handleOpenAddTask"><Plus class="w-10 h-10 stroke-white "/></button>
      </div>
      <div class="flex items-center justify-between mb-4 px-2 bg-gray-200">
        <h2 class="text-lg font-bold w-1/4">Naam</h2>
        <h2 class="text-lg font-bold w-1/3">Type</h2>
        <h2 class="text-lg font-bold w-1/5">Plaats</h2>
        <h2 class="text-lg font-bold w-1/4">Categorie</h2>
        <h2 class="text-lg font-bold w-1/7">Aantal</h2>
        <h2 class="text-lg font-bold w-1/4">Deadline</h2>
        <h2 class="text-lg font-bold w-1/4">Benodigdheden</h2>
        <h2 class="text-lg font-bold w-1/4">Status</h2>
        <h2 class="text-lg font-bold w-1/14"></h2>
      </div>
      <div class="overflow-auto max-h-4/5">
        <div v-for="(item, index) in data" :key="item.id" class="flex items-center justify-between border-b-2 p-2 last:border-b-none">
          <p class="w-1/4">{{ item.naam }}</p>
          <p class="w-1/3">{{ item.type }}</p>
          <p class="w-1/5">{{ item.plaats }}</p>
          <p class="w-1/4">{{ item.category }}</p>
          <p class="w-1/7">{{ item.aantal }}</p>
          <p class="w-1/4">{{ item.deadline }}</p>
          <p class="w-1/4">{{ item.materiaal }}</p>
          <p class="w-1/4">{{ item.status }}</p>
          <button @click="handleOpenEditTask(item)" class="w-1/14 flex justify-center items-center focus:outline-custom-orange">
            <Pencil class="stroke-1.5 hover:stroke-custom-orange" />
          </button>
        </div>
      </div>
    </div>
      <TaskPopup v-if="isEditTaskOpen" :taskData="selectedItem" @close-modal="handleCloseModal"/>
      <addTaskPopup v-if="isAddTaskOpen"  @close-modal="handleCloseModal"/>
  </template>
  
  <script lang="ts">
  import { useQuery } from '@vue/apollo-composable'
  import { GET_TAKEN } from '@/graphql/taak.query'
  import { computed, ref } from 'vue'
  import { Pencil, Plus  } from 'lucide-vue-next'
  import TaskPopup from '@/components/admin/taskPopup.vue'
  import addTaskPopup from '@/components/admin/addTaskPopup.vue'
  
  const data = ref<any | null>(null)
  const isEditTaskOpen = ref(false)
  const isAddTaskOpen = ref(false)
  const selectedItem = ref<any | null>(null)
  
  const { onResult, refetch } = useQuery(GET_TAKEN)
  
  onResult(result => {
        if (result.data) {
          console.log('Data:', result.data.taken)
          data.value = result.data.taken
        }
      })
  

    const handleOpenEditTask = (item: any) => {
      isEditTaskOpen.value = true
      selectedItem.value = item
    }

    const handleOpenAddTask = () => {
      isAddTaskOpen.value = true
    }

    const handleCloseModal = () => {
      isEditTaskOpen.value = false
      isAddTaskOpen.value = false
      refetch()
    }
  
  export default {
    components: {
      Pencil,
      TaskPopup,
      addTaskPopup,
      Plus,
    },
    setup() {
      return { data, handleCloseModal, handleOpenEditTask, isEditTaskOpen, selectedItem, isAddTaskOpen, handleOpenAddTask }
    },
  }
  </script>
  