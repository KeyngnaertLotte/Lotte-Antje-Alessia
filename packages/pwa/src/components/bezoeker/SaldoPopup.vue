<template>
  <div class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
    <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-custom-orange rounded-lg h-12 w-12 flex justify-center items-center hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      <form @submit.prevent="checkAndCloseModal" class="flex flex-col justify-around items-center h-full">
        <h1 class="text-3xl font-body font-bold text-custom-orange my-6">
          Voer een bedrag in
        </h1>
        <div class="flex justify-center items-center gap-2 w-3/4">
          <p class="font-pop text-4xl text-custom-darkGreen">€</p>
          <input
            v-model="amount"
            type="number"
            name="amountInput"
            required min="0.01" step="0.01"
            class="block font-pop mx-2 w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:outline-none focus:rounded-lg focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          />
        </div>
        <button
          type="submit"
          class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white flex gap-4 hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
        >
          <Landmark class="h-8 w-8 border-white" />OVERSCHRIJVEN
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { X, Landmark } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { ADD_SALDO } from '@/graphql/bezoeker.mutation'
import { ref } from 'vue'

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
    const amount = ref('');

    const closeModal = () => {
      emit('close-modal');
    }

    const checkAndCloseModal = () => {
  const saldoValue = parseFloat(amount.value);
  console.log('Parsed saldoValue:', saldoValue);

  const { mutate: addSaldo } = useMutation(ADD_SALDO);

  if (!isNaN(saldoValue)) {
    // Ensure that it's a valid number and greater than 0
    addSaldo({ uid: props.id, saldo: saldoValue })
      .then((graphqlresult) => {
        console.log('🎉 new transactie added to Bezoeker');
        console.log(graphqlresult?.data); // Access the returned data
      })
      .catch((error) => {
        console.error(error);
      });
    closeModal();
  } else {
    console.log('Invalid input: Please enter a valid number greater than 0');
  }
};


    return {
      amount,
      closeModal,
      checkAndCloseModal,
    }
  },
}
</script>
