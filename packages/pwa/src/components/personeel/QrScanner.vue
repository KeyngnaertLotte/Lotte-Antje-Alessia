<script lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { QrcodeStream } from 'vue-qrcode-reader'

import { useMutation } from '@vue/apollo-composable'
import { REMOVE_SALDO } from '@/graphql/bezoeker.mutation'
const { mutate: removeSaldo } = useMutation(REMOVE_SALDO)


const showCamera = ref(false)
const price = ref(0)
let enteredValue = 0
const selectedPlace = ref(""); 

export default {
  components: {
    X,
    QrcodeStream,
  },
  onMounted() {
    console.log('mounted')
    
  },
  setup(props, { emit }) {

    
const closeModal = () => {
  showCamera.value = false
  emit('close-modal')
}


const onDetect = (result: any) => {
  console.log('Result:', result[0].rawValue)
  console.log('Entered Value:', enteredValue)
  removeSaldo({ uid: result[0].rawValue, saldo: enteredValue, transactie: selectedPlace.value })
    .then(graphqlresult => {
      console.log('🎉 new transactie added to Bezoeker')
      console.log(graphqlresult?.data) // Access the returned data
    })
    .catch(error => {
      console.error(error)
    })
  closeModal()
}
    return {
      showCamera,
      scanButtonClick,
      price,
      closeModal,
      onDetect,
      selectedPlace,
      enteredValue
    }
  },
}



const scanButtonClick = () => {
  // Access the input value using the ref
  console.log('Show Camera:', enteredValue)
  enteredValue = price.value
  // console.log('Entered Value:', enteredValue)
  console.log('Selected Place:', selectedPlace.value)
  console.log('Price:', price.value)
  showCamera.value = true
}
</script>

<template>
  <div class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
    <div class="w-7/8 bg-white rounded-md flex items-center justify-center relative" :class="[{ 'h-2/3': showCamera }, { 'h-1/3 pb-2': !showCamera }]">
      <button @click="closeModal" class="absolute z-10 top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-custom-orange rounded-lg h-12 w-12 flex justify-center items-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange">
        <X class="h-10 w-10 stroke-white" />
      </button>
      <form @submit.prevent="scanButtonClick" v-if="!showCamera" class="h-full flex flex-col items-center justify-around">
        <h1 class="text-2xl font-body font-bold text-custom-orange my-4">Geef een bedrag in:</h1>
        <div class="flex flex-row w-full items-center justify-center mb-4">
          <p class="font-pop text-4xl text-custom-darkGreen">€</p>
          <input type="number" name="amountInput" required v-model="price" min="0.01" step="0.01" class="block font-pop mx-2 w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:outline-none focus:rounded-lg focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2" />
        </div>
        <div class="w-full flex items-center justify-center">
          
          <select v-model="selectedPlace" required class="p-2 w-9/10 border-custom-darkGreen rounded-lg border-2 flex justify-between focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2">
            <option value="" disabled>Selecteer plaats</option>
            <option value="Bar 1">Bar 1</option>
            <option value="Bar 2">Bar 2</option>
            <option value="Bar 3">Bar 3</option>
            <option value="Eetstand 1">Eetstand 1</option>
            <option value="Eetstand 2">Eetstand 2</option>
            <option value="Eetstand 3">Eetstand 3</option>
          </select>
        </div>
        <button type="submit" class="mt-6 w-full rounded-md bg-custom-orange py-2 font-body font-bold text-2xl text-white flex items-center justify-center gap-4 hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange" >
          Scan
        </button>
      </form>
      <div v-if="showCamera" class="h-full w-full">
        <QrcodeStream @detect="onDetect" class="h-full w-full" />
      </div>
    </div>
  </div>
</template>