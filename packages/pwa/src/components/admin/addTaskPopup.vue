<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white w-9/10 h-9/10 rounded-lg relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      
      <div class="w-full h-full p-6">
        <h1 class="text-2xl font-bold mb-4 font-body ">Maak nieuwe taak aan</h1>
      <div class="flex flex-col w-full">
        <label for="taskName">Taak naam</label>
        <input v-model="formData.taskName" type="text" class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full">
      </div>
      <div class="flex flex-col w-full">
        <p for="">Type</p>
        <div  class="flex flex-row justify-between items-center ">
        <div v-for="option in types" :key="option" class="flex flex-row items-center justify-center ">
            <input v-model="formData.selectedType" type="radio" name="type" :id="option" :value="option" class="mr-2">
            <label :for="option">{{ option }}</label>
        </div>
    </div>
    </div>
      <div class="flex flex-col w-full">
        <label for="">Plaats</label>
        <select v-model="formData.selectedPlace" name="" id="" class="bg-gray-200 rounded font-pop focus:outline-none p-2">
            <option>aaaaaaaa</option>
        </select>
      </div>
      <div class="flex flex-col w-full">
        <label for="">Categorie</label>
        <select v-model="formData.selectedCategory" name="" id="" class="bg-gray-200 rounded font-pop focus:outline-none p-2">
            <option>aaaaaaaaaa</option>
        </select>
      </div>
      <div class="flex flex-col w-full">
        <label for="">Aantal</label>
        <input type="number" v-model="formData.amount"  class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full">
      </div>
      <div class="flex flex-col w-full">
        <label for="">Deadline</label>
        <input type="time" v-model="formData.deadline" class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full">
      </div>
      <div class="flex flex-col w-full">
        <label for="">Benodigdheden</label>
        <select name="" id="" v-model="formData.material" class="bg-gray-200 rounded font-pop focus:outline-none p-2">
            <option>aaaaaaaaaaaa</option>
        </select>
      </div>
      <div class="flex flex-row justify-center w-full mt-10">
      <button @click="createTask" class="py-1 bg-custom-orange text-white my-6 rounded w-1/5 self-end">MAAK TAAK AAN</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

const types = ['Podium - licht',
  'Podium - geluid',
  'Bar - eten',
  'Bar - drank',
  'Allround',
  'Kuisen',
  'Aanvulling',
  'Loges']

  const formData = ref({
      taskName: '',
      selectedType: '',
      selectedPlace: '',
      selectedCategory: '',
      amount: '',
      deadline: '',
      material: '',
    });


export default {
  components: {
    X,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close-modal')
    }

    const createTask = () => {
        console.log('update')
        console.log(formData.value)
        closeModal()
    }


    return {
      closeModal,
        types,
        createTask,
        formData
        
    }
  },
}
</script>
