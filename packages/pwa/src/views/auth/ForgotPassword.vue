<template>
  <form
    @submit.prevent="handleResetPassword"
    class="w-full h-screen grid grid-rows-13 grid-cols-1 justify-center items-center"
    style="
      background-image: url(../../../../../src/images/bg-small.png);
      background-size: 100% auto;
    "
  >
    <div
      class="flex flex-col justify-center items-center row-start-3 row-span-1"
    >
      <div
        class="flex flex-col items-end row-span-4 justify-center justify-self-center"
      >
        <p class="font-header font-bold text-white text-6xl">Lotantsia</p>
        <p class="font-header font-bold text-white text-4xl">Festival</p>
      </div>
    </div>

    <div
      class="row-start-6 row-span-full bg-white w-full h-full rounded-t-[3rem] p-6 flex flex-col items-center justify-around"
    >
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-body font-bold text-custom-orange">
          Wachtwoord
        </h1>
        <p class="text-neutral-500 mb-4">
          Wachtwoord vergeten? Vraag een nieuw aan.
        </p>
      </div>
      <div class="mt-6 w-full flex justify-center">
        <input
          type="email"
          name="email"
          id="email"
          class="block w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:rounded-lg focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          v-model="email"
          placeholder="Email adres"
        />
      </div>
      <div class="w-full flex flex-col h-1/3 justify-center items-center">
        <button
          class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
        >
          Verstuur e-mail
        </button>
        <RouterLink
          class="w-full flex justify-center mt-1 inline-block rounded text-custom-darkGreen focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          to="/auth/login"
        >
          Wachtwoord niet vergeten? Keer terug
        </RouterLink>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'

export default {
  setup() {
    const { resetPassword } = useFirebase()

    const email = ref<string>('')
    const error = ref<AuthError | null>(null)

    const handleResetPassword = () => {
      resetPassword(email.value)
        .then(() => {
          error.value = null
        })
        .catch((err: AuthError) => {
          error.value = err
        })
    }

    return {
      email,
      error,

      handleResetPassword,
    }
  },
}
</script>
