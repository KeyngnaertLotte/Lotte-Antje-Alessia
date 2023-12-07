<script lang="ts">
import { ref } from 'vue'
import { Euro, X } from 'lucide-vue-next'


const showCamera = ref(false)
const price = ref(0)

export default {
  components: {
    X,
    Euro,
  },
  methods: {
    closeModal() {
      showCamera.value = false
      this.$emit('close-modal')
    },
  },
  setup() {
    return {
      showCamera,
      scanButtonClick,
      price,
    }
  },
}

const scanButtonClick = () => {
  // Access the input value using the ref
  const enteredValue = price.value
  console.log('Entered Value:', enteredValue)

  if (enteredValue === 0 || enteredValue.toString() === '' ) {
    alert('Please enter a valid price before scanning.')
    return
  } else {
    showCamera.value = true
    console.log('Entered Value:', enteredValue)
  }
}
</script>

<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="w-7/8 bg-white rounded-md flex items-center justify-center relative"
      :class="[{ 'h-2/3': showCamera }, { 'h-1/3': !showCamera }]"
    >
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      <div
        v-if="!showCamera"
        class="h-1/2 flex flex-col items-center justify-around"
      >
        <h1 class="text-2xl font-body font-bold text-custom-orange my-6">
          Geef een bedrag in:
        </h1>
        <div class="flex flex-row w-full items-center justify-center">
          <Euro class="h-8 w-8" />
          <input
            type="number"
            v-model.number="price"
            class="block font-pop w-2/5 border-b-2 text-xl border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
          />
        </div>

        <button
          class="mt-6 w-full rounded-md bg-custom-orange py-2 font-body font-bold text-2xl text-white flex items-center justify-center gap-4"
          @click="scanButtonClick"
        >
          Scan
        </button>
      </div>
      <div v-if="showCamera">
      </div>
    </div>
  </div>
</template>
