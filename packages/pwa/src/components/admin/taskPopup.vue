<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white w-[90%] h-[90%] rounded-lg relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>

      <div class="w-full h-full p-6">
        <h1 class="text-2xl font-bold mb-4 font-body">Pas taak aan</h1>
        <div class="flex flex-col w-full">
          <label for="">Taak naam</label>
          <input
            type="text"
            :value="currentData.naam"
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full"
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
                class="mr-2"
              />
              <label :for="option">{{ option }}</label>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Plaats</label>
          <select
            name=""
            id=""
            class="bg-gray-200 rounded font-pop focus:outline-none p-2"
          >
            <option>aaaaaaaa</option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Categorie</label>
          <select
            name=""
            id=""
            class="bg-gray-200 rounded font-pop focus:outline-none p-2"
          >
            <option>aaaaaaaaaa</option>
          </select>
        </div>
        <div class="flex flex-col w-full">
          <label for="">Aantal</label>
          <input
            type="number"
            :value="currentData.aantal"
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full"
          />
        </div>
        <div class="flex flex-col w-full">
          <label for="">Deadline</label>
          <input
            type="time"
            :value="currentData.deadline"
            class="mt-1 block rounded-md border-2 border-gray-300 p-2 w-full"
          />
        </div>
        <div class="flex flex-col w-full">
          <label for="">Benodigdheden</label>
          <select
            name=""
            id=""
            class="bg-gray-200 rounded font-pop focus:outline-none p-2"
          >
            <option>aaaaaaaaaaaa</option>
          </select>
        </div>
        <div class="flex flex-row justify-between w-full mt-10">
          <button
            @click="deleteTask"
            class="py-1 bg-gray-200 text-custom-brown my-6 rounded w-1/5 self-end"
          >
            DELETE
          </button>
          <button
            @click="updateTask"
            class="py-1 bg-custom-orange text-white my-6 rounded w-1/5 self-end"
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { UPDATE_TAAK, REMOVE_TAAK } from '@/graphql/taak.mutation'

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
        naam: currentData.naam,
        type: currentData.type,
        plaats: currentData.plaats,
        category: currentData.category,
        aantal: currentData.aantal,
        deadline: currentData.deadline,
        materiaal: currentData.materiaal,
        status: currentData.status,
      }

      console.log()

      const id = props.taskData.id

      closeModal()
    }

    const currentData = props.taskData

    return {
      closeModal,
      types,
      currentData,
      deleteTask,
      updateTask,
    }
  },
}
</script>
