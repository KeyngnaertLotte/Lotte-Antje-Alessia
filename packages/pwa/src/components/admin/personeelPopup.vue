<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white w-6/10 h-7/10 rounded-lg relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>

      <form @submit.prevent="updatePersoneel" class="w-full h-full p-6 flex flex-col justify-between items-center ">
        <h1 class="text-2xl font-bold mb-4 font-body">Pas personeel aan</h1>
        <div class="w-full flex flex-col justify-between items-center">
          <div class="flex flex-col w-full mb-6">
          <label for="">Voornaam</label>
          <input
            type="text"
            v-model="data.voornaam" required
            class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-col w-full mb-6">
          <label for="">Achternaam</label>
          <input
            type="text"
            v-model="data.achternaam" required
            class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <div class="flex flex-col w-full">
          <p for="">Type</p>
          <div class="flex flex-row justify-between items-center mt-1">
            <select
              class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
              v-model="data.type"
            >
              <option v-for="option in types" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>
        </div>
        <div class="flex flex-row justify-between w-full mt-10">
          <button
            @click="deletePersoneel"
            class="py-1 bg-gray-200 text-custom-brown my-6 rounded w-1/5 self-end"
          >
            DELETE
          </button>
          <button
            type="submit"
            class="py-1 bg-custom-orange text-white my-6 rounded w-1/5 self-end"
          >
            UPDATE
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { UPDATE_PERSONEEL, DELETE_PERSONEEL } from '@/graphql/personeel.mutation'
import { useMutation } from '@vue/apollo-composable'

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

const data = ref({
  voornaam: '',
  achternaam: '',
  type: '',
})

export default {
  props: {
    personeelData: {
      type: Object,
      required: true,
    },
  },
  components: {
    X,
  },
  setup(props, { emit }) {
    console.log(props.personeelData)

    const closeModal = () => {
      emit('close-modal')
    }

    const { mutate: deletePersoneelMutation } = useMutation(DELETE_PERSONEEL)

    const deletePersoneel = async() => {
      console.log('delete')
      const uid = currentData.uid
      await deletePersoneelMutation({ uid: uid })
      closeModal()
    }

    const { mutate: updatePersoneelMutation } = useMutation(UPDATE_PERSONEEL)

    const updatePersoneel = async () => {
      console.log('update')
      const uid = currentData.uid
      const updatedData = {
        voornaam: data.value.voornaam,
        achternaam: data.value.achternaam,
        type: data.value.type,
      }
      await updatePersoneelMutation({ uid: uid, updatePersoneelInput: updatedData })

      closeModal()
    }

    const currentData = props.personeelData
    data.value.achternaam = currentData.achternaam
    data.value.voornaam = currentData.voornaam
    data.value.type = currentData.type

    return {
      closeModal,
      types,
      data,
      deletePersoneel,
      updatePersoneel,
    }
  },
}
</script>
