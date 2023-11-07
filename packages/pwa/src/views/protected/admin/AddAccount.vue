import type { ADD_PERSONEEL } from '@/graphql/personeel.mutation'; import type {
ADD_PERSONEEL } from '@/graphql/personeel.mutation'; import type { log } from
'console';
<template>
  <div class="ml-8 mt-4">
  <form @submit.prevent="submitForm" class="w-full mt-10">
    <h1 class="text-4xl font-bold tracking-wider">Create Account</h1>
    <p class="text-neutral-500 mb-4">
      Create an account and keep track of your birds.
    </p>

    <div v-if="errorMessage">
      <p class="text-red-600">{{ errorMessage }}</p>
    </div>

    <div class="mt-6">
      <label
        for="nickname"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Name
      </label>
      <input
        type="text"
        name="nickname"
        id="nickname"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:ring-2 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50 focus-visible:border-blue-500 focus-visible:ring-blue-400"
        v-model="newUser.name"
      />
    </div>

    <div class="mt-6">
      <label
        for="email"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
        v-model="newUser.email"
      />
    </div>

    <div class="mt-6">
      <label
        for="password"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
        v-model="newUser.password"
      />
    </div>

    <div class="mt-6">
      <label
        for="rol"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Rol
      </label>
      <select
        v-model="newUser.role"
        class="w-full px-3 py-2 border border-gray-300 rounded mb-4"
      >
        <option>Personeel</option>
        <option>Artiest</option>
      </select>
    </div>

    <button
      class="mt-6 w-full rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
    >
      Register
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/login"
      >
        Already have an account?
      </RouterLink>
    </div>
  </form>
</div>
</template>

<script lang="ts">
import { ref, reactive, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMutation } from '@vue/apollo-composable'

import useFirebase from '@/composables/useFirebase'
import { ADD_USER_ADMIN } from '@/graphql/user.mutation'
import { ADD_PERSONEEL } from '@/graphql/personeel.mutation'
import { ADD_ARTIEST } from '@/graphql/artiest.mutation'

export default {
  setup() {
    const { registerAdmin } = useFirebase()
    const { mutate: addUser } = useMutation(ADD_USER_ADMIN)
    const { mutate: addPersoneel } = useMutation(ADD_PERSONEEL)
    const { mutate: addArtiest } = useMutation(ADD_ARTIEST)
    const errorMessage: Ref<string> = ref('')
    const { push } = useRouter()

    const newUser = reactive({
      name: '',
      email: '',
      password: '',
      role: '',
    })

    const submitForm = () => {
      if (
        newUser.name === '' ||
        newUser.email === '' ||
        newUser.password === '' ||
        newUser.role === ''
      ) {
        errorMessage.value = 'Please fill in all fields.'
        return
      }

      // User the register function from the useFirebase composable
      registerAdmin(newUser.name, newUser.email, newUser.password)
        .then((newFireBaseUser: any) => {
          console.log('🎉 new firebase user created in firebase')
          console.log(newFireBaseUser)
          console.log('uid', newFireBaseUser.uid)

          //create user in our own database with the same uid
          //use the mutation we created in the graphql folder
          console.log('new user role: ', newUser.role)
          addUser({
            createUserInput: {
              locale: 'nl',
              uid: newFireBaseUser.uid,
              naam: newUser.name,
              role: newUser.role,
            },
          })
            .then(graphqlresult => {
              console.log('🎉 new user created in our database')
              console.log(graphqlresult)
              if (newUser.role === 'Personeel') {
                addPersoneel({
                  createPersoneelInput: {
                    uid: newFireBaseUser.uid,
                    voornaam: newUser.name,
                    achternaam: "",
                    type: ""
                  },
                })
                  .then(graphqlresult => {
                    console.log('🎉 new personeel created in our database')
                    console.log(graphqlresult)
                    //redirect to the home page
                  })
                  .catch(error => {
                    errorMessage.value = error.message
                  })
              }
              if (newUser.role === 'Artiest') {
                addArtiest({
                    createArtiestenInput: {
                    uid: newFireBaseUser.uid,
                    naam: newUser.name,
                  },
                })
                  .then(graphqlresult => {
                    console.log('🎉 new artiest created in our database')
                    console.log(graphqlresult)
                    //redirect to the home page
                  })
                  .catch(error => {
                    errorMessage.value = error.message
                  })
              }

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
