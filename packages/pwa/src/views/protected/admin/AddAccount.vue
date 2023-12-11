<template>
  <form
    @submit.prevent="submitForm"
    class="col-span-2 row-span-22 m-10 bg-white rounded-lg p-6 flex flex-col justify-between"
  >
    <h1 class="text-2xl font-bold mb-4 font-body">Maak een account</h1>

    <div v-if="errorMessage">
      <p class="text-red-600">{{ errorMessage }}</p>
    </div>

    <div class="">
      <label
        for="rol"
        class="text-md block font-semibold  text-gray-700 dark:text-gray-200"
      >
        Rol
      </label>
      <select
        v-model="newUser.role"
        class="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
      >
        <option>Personeel</option>
        <option>Artiest</option>
      </select>
    </div>

    <div v-if="shouldShowArtiestFields" class="">
      <label
        for="nickname"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Artiestennaam
      </label>
      <input
        type="text"
        name="nickname"
        id="nickname"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="newUser.name"
      />
    </div>

    <div v-if="shouldShowPersoneelFields" class="flex flex-row">
      <div class="flex flex-col justify-center items-start w-1/2 mr-4">
        <label
          for="voornaam"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Voornaam
        </label>
        <input
          type="text"
          name="voornaam"
          id="voornaam"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          v-model="newUser.voornaam"
        />
      </div>
      <div class="flex flex-col justify-center items-start w-1/2">
        <label
          for="achternaam"
          class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        >
          Achternaam
        </label>
        <input
          type="text"
          name="achternaam"
          id="achternaam"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          v-model="newUser.achternaam"
        />
      </div>
    </div>

    <div class="">
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
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="newUser.email"
      />
    </div>

    <div class="">
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
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="newUser.password"
      />
    </div>

    <button
      class="mt-6 w-1/3 rounded-md border-2 bg-custom-orange self-center py-2 px-4 font-semibold text-white hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
    >
      Registreer
    </button>
  </form>
</template>

<script lang="ts">
import { ref, computed, reactive, type Ref } from 'vue'
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

    const shouldShowArtiestFields = computed(() => newUser.role === 'Artiest')
    const shouldShowPersoneelFields = computed(
      () => newUser.role === 'Personeel',
    )

    const newUser = reactive({
      name: '',
      voornaam: '',
      achternaam: '',
      email: '',
      password: '',
      role: 'Personeel',
    })

    const submitForm = () => {
      if (
        newUser.role === '' ||
        (newUser.role === 'artiest' && newUser.name === '') ||
        (newUser.role === 'personeel' &&
          (newUser.voornaam === '' || newUser.achternaam === '')) ||
        newUser.email === '' ||
        newUser.password === ''
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
          if (newUser.role === 'Personeel') {
            newUser.name = newUser.voornaam + ' ' + newUser.achternaam
          } else if (newUser.role === 'Artiest') {
            newUser.name = newUser.name
          }
          addUser({
            createUserAdminInput: {
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
                    voornaam: newUser.voornaam,
                    achternaam: newUser.achternaam,
                    type: '',
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
      shouldShowArtiestFields,
      shouldShowPersoneelFields,
    }
  },
}
</script>
