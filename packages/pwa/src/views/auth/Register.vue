<template>
  <form
    @submit.prevent="submitForm"
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
        <h1 class="text-5xl font-body font-bold text-custom-orange">
          Registreer
        </h1>
        <p class="text-neutral-500 mb-4">Maak hier een account aan.</p>
      </div>

      <div class="mt-6 w-full">
        <div class="w-full flex justify-center mb-8">
          <input
            type="text"
            name="nickname"
            id="nickname"
            class="block w-9/10 border-b-2 border-custom-darkGreen pl-1 text-xl focus:rounded-lg focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="newUser.name"
            placeholder="Gebruikersnaam"
          />
        </div>

        <div class="w-full flex justify-center mb-8">
          <input
            type="email"
            name="email"
            id="email"
            class="block w-9/10 border-b-2 border-custom-darkGreen pl-1 text-xl focus:rounded-lg focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="newUser.email"
            placeholder="Email adres"
          />
        </div>

        <div class="w-full flex justify-center">
          <input
            type="password"
            name="password"
            id="password"
            class="block w-9/10 border-b-2 border-custom-darkGreen pl-1 text-xl focus:rounded-lg focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            v-model="newUser.password"
            placeholder="Wachtwoord"
          />
        </div>
      </div>

      <div class="w-full flex flex-col items-center justify-center">
        <button
          class="mt-6 w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
        >
          Register
        </button>
        <div class="flex justify-center">
          <RouterLink
            class="mt-1 inline-block rounded text-center text-custom-darkGreen focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
            to="/auth/login"
          >
            Heb je al een account?
          </RouterLink>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'

import useFirebase from '@/composables/useFirebase'
import { ADD_USER } from '@/graphql/user.mutation'
import { ADD_BEZOEKER } from '@/graphql/bezoeker.mutation'

export default {
  setup() {
    const { register } = useFirebase()
    const { mutate: addUser } = useMutation(ADD_USER)
    const { mutate: addBezoeker } = useMutation(ADD_BEZOEKER)
    const errorMessage: Ref<string> = ref('')
    const { push } = useRouter()

    const newUser = reactive({
      name: '',
      email: '',
      password: '',
    })

    const submitForm = () => {
      if (
        newUser.name === '' ||
        newUser.email === '' ||
        newUser.password === ''
      ) {
        errorMessage.value = 'Please fill in all fields.'
        return
      }

      register(newUser.name, newUser.email, newUser.password)
        .then((newFireBaseUser: any) => {
          // console.log('🎉 new firebase user created in firebase')
          // console.log(newFireBaseUser)
          // console.log('uid', newFireBaseUser.uid)

          addUser({
            createUserInput: {
              locale: 'nl',
              uid: newFireBaseUser.uid,
              naam: newUser.name,
            },
          })
            .then(graphqlresult => {
              // console.log('🎉 new user created in our database')
              // console.log(graphqlresult)
              addBezoeker({
                createBezoekerInput: {
                  uid: newFireBaseUser.uid,
                  naam: newUser.name,
                },
              })
                .then(graphqlresult => {
                  // console.log('🎉 new bezoeker created in our database')
                  // console.log(graphqlresult)
                  push({ path: '/bezoeker/dashboard' })
                })
                .catch(error => {
                  errorMessage.value = error.message
                })
            })
            .catch(error => {
              errorMessage.value = error.message
            })
        })
        .catch(error => {
          errorMessage.value = error.message
        })
        .finally(() => {})
    }

    return {
      errorMessage,
      newUser,
      submitForm,
    }
  },
}
</script>
