<template>
  <form @submit.prevent="handleLogin" class="w-full h-screen grid grid-rows-13 grid-cols-1 justify-center items-center " style="background-image: url(../../../../../src/images/bg-small.png); background-size: 100% auto;">
    <div class="flex flex-col justify-center items-center row-start-3 row-span-1">
      <div class="flex flex-col items-end row-span-4 justify-center  justify-self-center">
          <p class="font-header font-bold text-white text-6xl">Lotantsia</p>
          <p class="font-header font-bold text-white text-4xl">Festival</p>
        </div>
    </div>

    <!-- <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div> -->

    <div class="row-start-6 row-span-full bg-white w-full h-full rounded-t-[3rem] p-6 flex flex-col  items-center justify-around ">
      <h1 class="text-5xl font-body font-bold text-custom-orange">Log in</h1>
      <div class="mt-6 w-full">
      <div class="w-full flex justify-center">
      <input
        type="email"
        name="email"
        id="email"
        class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:outline-none focus:rounded-lg focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2" 
        v-model="loginCredentials.email" placeholder="Email adres" required
      />
    </div>
    <div class="w-full flex flex-col justify-center items-center m-t-4">
      <input
        type="password"
        name="password"
        id="password"
        class="block font-pop w-9/10 border-b-2 border-custom-darkGreen p-1 text-xl focus:outline-none focus:rounded-lg focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="loginCredentials.password" placeholder="Wachtwoord" required
      />
      <RouterLink
        to="/auth/forgot-password"
        class="w-9/10 font-pop mt-1 inline-block rounded text-md text-custom-darkGreen focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
      >
        Passwoord vergeten
      </RouterLink>
    </div>
      </div>

    <div class="w-full flex flex-col h-1/3 justify-center items-center">
      <button
      class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
    >
      Login
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-1 font-pop inline-block rounded text-center text-md text-custom-darkGreen focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        to="/auth/register"
      >
        Geen account? Maak hier één aan.
      </RouterLink>
    </div>
    </div>
    </div>

   
  </form>
</template>

<script lang="ts">
import { pushScopeId, ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // Composables
    const { login, firebaseUser } = useFirebase()
    const { restoreCustomUser } = useCustomUser()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()

    // Logic
    const loginCredentials = ref({
      email: '',
      password: '',
    })
    const error = ref<AuthError | null>(null)

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
        .then(() => {
          console.log('logged in')
          restoreCustomUser().then(() => {
            console.log('custom user restored')
            const role = customUser.value?.role.toLowerCase() 
            console.log('role: ', role)
            replace(`/${role}/dashboard`)
          })
        })
        .catch((err: AuthError) => {
          error.value = err
        })
    }

    return {
      loginCredentials,
      firebaseUser,

      error,
      handleLogin,
    }
  },
}
</script>
