<template>
  <form @submit.prevent="updateTask"
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
        <h1 class="text-2xl font-bold mb-4 font-body">Pas taak aan</h1>
        <div class="flex flex-col w-full">
          <label for="">Taak naam</label>
          <input
            type="text"
            v-model="naam"  required
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2" 
          />
        </div>
        <div class="flex flex-col w-full">
          <p for="">Type</p>
          <div class="flex flex-row justify-between items-center">
            <div
              v-for="option in types"
              :key="option"
              class="flex flex-row items-center justify-center"
            >
              <input
                type="radio"
                name="type"
                :id="option"
                :value="option"
                class="mr-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
                v-model="type"
              />
              <label :for="option">{{ option }}</label>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Plaats</label>
          <select
            required
            class="bg-gray-200 rounded font-pop p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="plaats"
          >
            <option v-for="plaats in plaatsen">{{ plaats }}</option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Deadline</label>
          <input
            type="time"
            pattern="^(?:[01]\d|2[0-3]):[0-5]\d$"
            v-model="deadline" required
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-col w-full">
          <label for="">Categorie</label>
          <select
            required
            class="bg-gray-200 rounded font-pop p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="categorie"
            @change="updatedData"
          >
            <option v-for="categorie in categorieen">{{ categorie }}</option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Materiaal</label>
          <select
            required
            class="bg-gray-200 rounded font-pop p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="materiaal"
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
            v-model="aantal" required
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-row justify-between w-full mt-10">
          <button
            @click="deleteTask"
            class="py-1 bg-gray-200 text-custom-brown my-6 rounded w-1/5 self-end hover:bg-gray-300 focus:outline-none focus-visible:border-custom-orange focus-visible:bg-gray-300 focus-visible:ring-2 focus-visible:ring-custom-orange"
          >
            DELETE
          </button>
          <button
            type="submit"
            class="py-1 bg-custom-orange text-white my-6 rounded w-1/5 self-end hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { UPDATE_TAAK, REMOVE_TAAK } from '@/graphql/taak.mutation'
import { ref } from 'vue'
import { GET_MATERIAAL_BY_CATEGORIE } from '@/graphql/materiaal.query'
import { CREATE_TASK } from '@/graphql/taak.mutation'

const naam = ref('')
const type = ref('')
const plaats = ref('')
const categorie = ref('')
const aantal = ref(0)
const deadline = ref('')
const materiaal = ref('')

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

const plaatsen = [
  'Antje',
  'Lotte',
  'Aléssia',
  'Bar',
  'Toiletten',
  'Loges',
  'Magazijn',
]

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

let listMateriaal = ref<string[]>([])

export default {
  props: {
    taskData: {
      type: Object,
      required: true,
    },
  },
  components: {
    X,
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close-modal')
    }

    const { mutate: removeTaak } = useMutation(REMOVE_TAAK)

    const deleteTask = async () => {
      console.log('delete')
      const id = props.taskData.id
      await removeTaak({ id: id })
      closeModal()
    }

    const { mutate: updateTaak } = useMutation(UPDATE_TAAK)

    const updateTask = async () => {
      console.log('update')
      const updateTaakInput = {
        naam: naam.value,
        type: type.value,
        plaats: plaats.value,
        category: categorie.value,
        aantal: aantal.value,
        deadline: deadline.value,
        materiaal: materiaal.value,
      }

      console.log(await updateTaakInput)

      const id = props.taskData.id

      await updateTaak({ id: id, updateTakenInput: updateTaakInput })

      closeModal()
    }

    const { onResult, refetch } = useQuery(GET_MATERIAAL_BY_CATEGORIE, {
      categorie: categorie,
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

    const updatedData = () => {
      refetch()
    }

    naam.value = props.taskData.naam
    type.value = props.taskData.type
    plaats.value = props.taskData.plaats
    categorie.value = props.taskData.category
    aantal.value = props.taskData.aantal
    deadline.value = props.taskData.deadline
    materiaal.value = props.taskData.materiaal

    return {
      closeModal,
      types,
      plaatsen,
      categorieen,
      deleteTask,
      updateTask,
      naam,
      type,
      plaats,
      categorie,
      aantal,
      deadline,
      materiaal,
      listMateriaal,
      updatedData,
    }
  },
}
</script>
