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
        <h1 class="text-2xl font-bold mb-4 font-body">Pas event aan</h1>
        <div class="flex flex-row justify-between items-center">
          <p class="text-lg font-bold">Event: </p>
            <input type="radio" name="event" id="opzetten" class="mr-2" value="opzetten"/>
            <label for="opzetten">Opzetten</label>
            <input type="radio" name="event" id="soundcheck" value="soundcheck" class="mr-2" />
            <label for="soundcheck">Soundcheck</label>
            <input type="radio" name="event" id="optreden" class="mr-2" value="optreden"/>
            <label for="optreden">Optreden</label>
        </div>
        <!-- <div>
            <label for="">Start tijd: </label>
            <input type="time" name="" id="">
        </div>
        <div>
            <label for="">Eind tijd: </label>
            <input type="time" name="" id="">
        </div> -->
        <div class="flex flex-row justify-between items-center">
          <p class="text-lg font-bold">Podium: </p>
            <div class="flex flex-row items-center justify-center">
                <input type="radio" name="plaats" id="Antje" class="mr-2">
                <label for="Antje">Antje</label>
            </div>
            <div class="flex flex-row items-center justify-center">
                <input type="radio" name="plaats" id="Lotte" class="mr-2">
                <label for="Lotte">Lotte</label>
            </div>
            <div class="flex flex-row items-center justify-center">
                <input type="radio" name="plaats" id="Aléssia" class="mr-2">
                <label for="Aléssia">Aléssia</label>
            </div>
        </div>
        <div class="flex flex-row justify-end w-full mt-10">
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

    const updateTask = () => {
      console.log('update')
      closeModal()
    }

    const currentData = props.eventData

    return {
      closeModal,
      currentData,
      deleteTask,
      updateTask,
    }
  },
}
</script>
