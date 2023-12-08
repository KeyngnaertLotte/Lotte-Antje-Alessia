<template>
  <form @submit.prevent="handleResetPassword" class="w-full h-screen grid grid-rows-13 grid-cols-1 justify-center items-center " style="background-image: url(../../../../../src/images/bg-small.png); background-size: 100% auto;">
    <div class="flex flex-col justify-center items-center row-start-3 row-span-1">
      <div class="flex flex-col items-end row-span-4 justify-center  justify-self-center">
          <p class="font-header font-bold text-white text-6xl">Lotantsia</p>
          <p class="font-header font-bold text-white text-4xl">Festival</p>
        </div>
    </div>

    <div class="row-start-6 row-span-full bg-white w-full h-full rounded-t-[3rem] p-6 flex flex-col  items-center justify-around ">
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-4xl font-body font-bold text-custom-orange">Wachtwoord</h1>
        <p class="text-neutral-500 mb-4">
          Wachtwoord vergeten? Vraag een nieuw aan.
        </p>
      </div>

    <!-- <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div> -->
    <div class="mt-6 w-full flex justify-center">
      <!-- <label
        for="email"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Email address
      </label> -->
      <input
        type="email"
        name="email"
        id="email"
        class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
        v-model="email" placeholder="Email adres"
        />
    </div>
    <div class="w-full flex flex-col h-1/3 justify-center items-center">
      <button
      class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white "
    >
      Verstuur e-mail
    </button>
      <RouterLink
        class="w-full flex justify-center font-pop mt-1 inline-block rounded text-md text-custom-darkGreen hover:underline focus:outline-none "
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
    // Composables
    const { resetPassword } = useFirebase()

    const email = ref<string>('')
    const error = ref<AuthError | null>(null)

    const handleResetPassword = () => {
      resetPassword(email.value).then(() => {
        // TODO: show notification
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
