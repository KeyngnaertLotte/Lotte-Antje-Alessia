<template>
  <form
    @submit.prevent="createTask"
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white w-9/10 h-9/10 rounded-lg relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-custom-orange rounded-lg h-12 w-12 flex justify-center items-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>

      <div class="w-full h-full p-6">
        <h1 class="text-2xl font-bold mb-4 font-body">Maak nieuwe taak aan</h1>
        <div class="flex flex-col w-full mb-2">
          <label for="taskName">Taak naam</label>
          <input
            v-model="formData.taskName"
            type="text"
            required
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-col w-full mb-2">
          <p for="">Type</p>
          <div class="flex flex-row justify-between items-center">
            <div
              v-for="option in types"
              :key="option"
              class="flex flex-row items-center justify-center"
            >
              <input
                v-model="formData.selectedType"
                type="radio"
                name="type"
                :id="option"
                :value="option"
                required
                class="mr-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
              />
              <label :for="option">{{ option }}</label>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full mb-2">
          <label for="">Plaats</label>
          <select
            v-model="formData.selectedPlace"
            required
            class="bg-gray-200 rounded p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          >
            <option v-for="plaats in plaatsen">{{ plaats }}</option>
          </select>
        </div>
        <div class="flex flex-col w-full mb-2">
          <label for="">Deadline</label>
          <input
            type="time"
            pattern="^(?:[01]\d|2[0-3]):[0-5]\d$"
            v-model="formData.deadline"
            required
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-col w-full mb-2">
          <label for="">Categorie</label>
          <select
            v-model="formData.selectedCategory"
            required
            class="bg-gray-200 rounded p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            @change="updatedData"
          >
            <option v-for="categorie in categorieen">{{ categorie }}</option>
          </select>
        </div>
        <div class="flex flex-col w-full mb-2">
          <label for="">Materiaal</label>
          <select
            required
            v-model="formData.material"
            class="bg-gray-200 rounded  p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          >
            <option v-for="i in listMateriaal">
              {{ i }}
            </option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Aantal</label>
          <input
            type="number"
            v-model="formData.amount"
            required
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-row justify-center w-full ">
          <button
            type="submit"
            class="py-1 bg-custom-orange text-white my-6 rounded w-1/5 hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
          >
            MAAK TAAK AAN
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { GET_MATERIAAL_BY_CATEGORIE } from '@/graphql/materiaal.query'
import { CREATE_TAAK_ADMIN } from '@/graphql/taak.mutation'

const types = [
  'Podium - licht',
  'Podium - geluid',
  'Bar - eten',
  'Bar - drank',
  'Allround',
  'Kuisen',
  'Aanvulling',
  'Loges',
]

const plaatsen = ['Antje', 'Lotte', 'Allesia', 'Bar', 'Toiletten', 'loges']

const categorieen = [
  'geluid',
  'verlichting',
  'instrumenten',
  'podium',
  'elektriciteit',
  'toiletten',
  'eten',
  'drinken',
  'ehbo',
  'beveiliging',
  'afval',
  'decoratie',
]

const formData = ref({
  taskName: '',
  selectedType: '',
  selectedPlace: '',
  selectedCategory: '',
  amount: '',
  deadline: '',
  material: '',
})

let listMateriaal = ref<string[]>([])

export default {
  components: {
    X,
  },
  
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close-modal')
    }

    const updatedData = () => {
      const { onResult } = useQuery(GET_MATERIAAL_BY_CATEGORIE, {
        categorie: formData.value.selectedCategory,
      })

      onResult(result => {
        if (result.data) {
          listMateriaal.value = []
          console.log(result.data.findByCategorie.length)
          for (let i = 0; i < result.data.findByCategorie.length; i++) {
            console.log(result.data.findByCategorie[i].item)
            listMateriaal.value.push(result.data.findByCategorie[i].item)
          }
        }
      })
    }

    const { mutate: createTaskMutation } = useMutation(CREATE_TAAK_ADMIN)

    const createTask = async () => {
      console.log('update')
      console.log(formData.value)
      const createTaakInput = {
        naam: formData.value.taskName,
        type: formData.value.selectedType,
        plaats: formData.value.selectedPlace,
        category: formData.value.selectedCategory,
        aantal: formData.value.amount,
        deadline: formData.value.deadline,
        materiaal: formData.value.material,
      }

      await createTaskMutation({ createTakenInput: createTaakInput })

      closeModal()
    }

    return {
      closeModal,
      types,
      createTask,
      formData,
      plaatsen,
      categorieen,
      listMateriaal,
      updatedData,
    }
  },
}
</script>
