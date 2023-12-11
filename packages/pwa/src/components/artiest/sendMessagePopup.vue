<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="h-1/3 w-7/8 bg-white rounded-md flex justify-center relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      <div class="p-6 h-full flex flex-col justify-between ">
        <p class="text-2xl font-bold font-body">Stuur naar admin</p>
        <textarea
          placeholder="Typ hier wat je bericht voor admin"
          v-model="messageContent"
          cols="50"
          rows="3"
          class="w-full h-full my-6 block font-pop border-2 rounded-md p-1 focus:outline-none focus:border-4 focus:border-white bg-white "
        ></textarea>
        <button
          @click="sendMessage"
          class=" w-full rounded-md bg-custom-orange py-2 font-body font-bold text-2xl text-white flex items-center justify-center"
        >
          VERZEND
        </button>
      </div>

    </div>
  </div>
</template>


<script lang="ts">
import useRealtime from '@/composables/useRealtime'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'

const messageContent = ref('')

export default {
  components: {
    X,
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close-modal')
    }

    const sendMessage = () => {
    const { emit } = useRealtime()
    if (messageContent.value !== '') {
      emit('messageToAdmin', messageContent.value + ' - ' + props.userName)
      closeModal()
      messageContent.value = ''
    } 
    }
    
    return {
      closeModal,
      sendMessage,
      messageContent,
    }
  },
}


</script>

