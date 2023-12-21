<template>
  <div class="fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white w-3/5 h-7/10 rounded-lg relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-custom-orange rounded-lg h-12 w-12 flex justify-center items-center hover:bg-custom-brown focus:outline-custom-brown focus:bg-custom-brown"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>

      <div class="p-8 flex flex-col items-center justify-between h-full">
        <h1 class="text-2xl font-bold mb-4 font-body">Pas event aan</h1>

        <div class="flex flex-col space-y-4 w-1/2">
          <div class="flex items-center space-x-4">
            <label class="text-lg font-bold">Event:</label>
            <div class="flex space-x-2">
              <input v-model="selectedEvent" type="radio" id="Opzetten" value="Opzetten" class="focus:outline-custom-orange " />
              <label for="Opzetten">Opzetten</label>
              <input v-model="selectedEvent" type="radio" id="Soundcheck" value="Soundcheck" class="focus:outline-custom-orange " />
              <label for="Soundcheck">Soundcheck</label>
              <input v-model="selectedEvent" type="radio" id="Optreden" value="Optreden" class="focus:outline-custom-orange " />
              <label for="Optreden">Optreden</label>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <label for="startTime" class="text-lg font-bold">Start tijd:</label>
            <input id="startTime" type="time" v-model="startTime" class="border border-gray-300 rounded px-2 py-1 focus:outline-custom-orange" :step="900"/>
          </div>
          <div class="flex items-center space-x-2">
            <label for="endTime" class="text-lg font-bold">Eind tijd:</label>
            <input id="endTime" type="time" v-model="endTime" class="border border-gray-300 rounded px-2 py-1 focus:outline-custom-orange" step="900"/>
          </div>
          <div class="flex items-center space-x-2">
            <label class="text-lg font-bold">Podium:</label>
            <div class="flex space-x-2">
              <input v-model="selectedPodium" type="radio" id="Antje" value="Antje" class="focus:outline-custom-orange" />
              <label for="Antje">Antje</label>
              <input v-model="selectedPodium" type="radio" id="Lotte" value="Lotte" class="focus:outline-custom-orange" />
              <label for="Lotte">Lotte</label>
              <input v-model="selectedPodium" type="radio" id="Aléssia" value="Aléssia" class="focus:outline-custom-orange" />
              <label for="Aléssia">Aléssia</label>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-end mt-6">
          <button
            @click="updateTask"
            class="py-2 px-16 bg-custom-orange text-white rounded hover:bg-custom-brown focus:outline-custom-brown focus:bg-custom-brown"
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
import { reactive, ref } from 'vue'
import { UPDATE_AGENDA } from '@/graphql/artiest.mutation'
import { useMutation } from '@vue/apollo-composable'

export default {
  props: {
    eventData: {
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

    const deleteTask = () => {
      console.log('delete')
      closeModal()
    }

    const { mutate: updateAgenda } = useMutation(UPDATE_AGENDA)

    const updateTask = async () => {
      const updatedData = reactive({ ...props.eventData })
      updatedData.taak = selectedEvent.value
      updatedData.podium = selectedPodium.value
      updatedData.tijd = startTime.value + ' - ' + endTime.value

      const AgendaInput = {
        id: updatedData.id,
        taak: updatedData.taak,
        tijd: updatedData.tijd,
        podium: updatedData.podium,
      }

      await updateAgenda({ uid: updatedData.artiest, agendaInput: AgendaInput })

      closeModal()
    }

    const selectedEvent = ref(props.eventData.taak)
    const selectedPodium = ref(props.eventData.podium)
    // split time from string before - and after -
    const startTime = ref(props.eventData.tijd.split(' - ')[0])
    const endTime = ref(props.eventData.tijd.split(' - ')[1])


    return {
      closeModal,
      deleteTask,
      updateTask,
      selectedEvent,
      selectedPodium,
      startTime,
      endTime,
    }
  },
}
</script>
