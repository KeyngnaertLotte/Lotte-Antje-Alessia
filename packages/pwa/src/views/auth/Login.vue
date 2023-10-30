<template>
  <form @submit.prevent="handleLogin" class="w-full h-screen grid grid-rows-3 grid-cols-1 justify-center items-center " style="background-image: url(../../../../../src/images/bg-small.png); background-size: 100% auto;">
    <div class="flex flex-col justify-center items-center row-start-1 row-span-1">
      <div class="flex flex-col items-end row-span-4 justify-center  justify-self-center">
          <p class="font-header font-bold text-white text-6xl">Lotantsia</p>
          <p class="font-header font-bold text-white text-4xl">Festival</p>
        </div>
    </div>

    <!-- <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div> -->

    <div class="row-start-2 row-span-2 bg-white w-full h-full rounded-t-3xl p-4 flex flex-col  items-center">
      <h1 class="text-5xl font-body font-bold text-custom-darkGreen my-6">Login</h1>
      <div class="mt-6 w-full">
      <div class="w-full">
        <label
        for="email"
        class="text-md block font-pop font-bold tracking-wider text-custom-brown"
      >
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="mt-1 block w-full rounded-md border-2 border-custom-brown p-2 focus:outline-none focus-visible:border-custom-darkGreen focus-visible:ring-2 focus-visible:ring-custom-darkGreen"
        v-model="loginCredentials.email"
      />
    </div>
    <div class="mt-6 w-full">
      <label
        for="password"
        class="text-md block font-pop font-bold tracking-wider text-custom-brown"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        class="mt-1 block w-full rounded-md border-2 border-custom-brown p-2 focus:outline-none focus-visible:border-custom-darkGreen focus-visible:ring-2 focus-visible:ring-custom-darkGreen"
        v-model="loginCredentials.password"
      />
      <RouterLink
        to="/auth/forgot-password"
        class="mt-1 inline-block rounded text-sm text-custom-purple hover:underline focus:outline-none "
      >
        Forgot password?
      </RouterLink>
    </div>
      </div>

    <div class="w-full flex flex-col h-full justify-center">
      <button
      class="mt-6 w-full rounded-md bg-custom-purple py-2 px-4 font-semibold text-white "
    >
      Login
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-custom-purple focus:outline-none focus-visible:ring-2 "
        to="/auth/register"
      >
        Need to create an account?
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
      email: 'artiest@gmail.com',
      password: '123456',
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
