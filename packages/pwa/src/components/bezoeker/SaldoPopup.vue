<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      <div class="flex flex-col justify-around items-center h-full">
        <h1 class="text-3xl font-body font-bold text-custom-orange my-6">
          Voer een bedrag in
        </h1>
        <div class="flex justify-center items-center gap-2 w-3/4">
          <p class="font-pop text-4xl text-custom-darkGreen">€</p>
          <input
            type="number"
            name=""
            id="amountInput"
            class="block font-pop w-[90%] border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
          />
        </div>
        <button
          @click="checkAndCloseModal"
          class="mt-6 w-[90%] rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4"
        >
          <Landmark class="h-8 w-8 border-white" />OVERSCHRIJVEN
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { X, Landmark } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { ADD_SALDO } from '@/graphql/bezoeker.mutation'

export default {
  components: {
    X,
    Landmark,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close-modal')
    }

    const checkAndCloseModal = () => {
      const amountInput = document.getElementById(
        'amountInput',
      ) as HTMLInputElement
      const { mutate: addSaldo } = useMutation(ADD_SALDO)

      if (amountInput.value === '') {
        console.log('Input is empty')
      } else {
        const saldoValue = parseFloat(amountInput.value) // Parse to a floating-point number
        if (!isNaN(saldoValue)) {
          // Ensure that it's a valid number
          addSaldo({ uid: props.id, saldo: saldoValue })
            .then(graphqlresult => {
              console.log('🎉 new favoartiest added to Bezoeker')
              console.log(graphqlresult?.data) // Access the returned data
            })
            .catch(error => {
              console.error(error)
            })
          closeModal()
        } else {
          console.log('Invalid input: Not a number')
        }
      }
    }

    console.log('props:', props.id)

    return {
      closeModal,
      checkAndCloseModal,
    }
  },
}
</script>
