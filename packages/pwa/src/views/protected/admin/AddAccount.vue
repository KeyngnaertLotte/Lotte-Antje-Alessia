<template>
  <form
    @submit.prevent="submitForm"
    class="col-span-2 row-span-22 m-10 bg-white rounded-lg p-6 flex flex-col justify-between"
  >
    <h1 class="text-2xl font-bold mb-4 font-body">Maak een account</h1>

    <div class="">
      <label
        for="rol"
        class="text-md block font-semibold text-black"
      >
        Rol
      </label>
      <select
        v-model="newUser.role"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
      >
        <option>Personeel</option>
        <option>Artiest</option>
      </select>
    </div>

    <div v-if="shouldShowArtiestFields" class="">
      <label
        for="nickname"
        class="text-md block font-semibold tracking-wider text-black"
      >
        Artiestennaam
      </label>
      <input
        type="text"
        name="nickname"
        id="nickname"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="newUser.name"
        required
        placeholder="Artiestennaam"
      />
    </div>

    <div v-if="shouldShowPersoneelFields" class="flex flex-row">
      <div class="flex flex-col justify-center items-start w-1/2 mr-4">
        <label
          for="voornaam"
          class="text-md block font-semibold tracking-wider text-black"
        >
          Voornaam
        </label>
        <input
          type="text"
          name="voornaam"
          id="voornaam"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          v-model="newUser.voornaam"
          required
          placeholder="Voornaam"
        />
      </div>
      <div class="flex flex-col justify-center items-start w-1/2">
        <label
          for="achternaam"
          class="text-md block font-semibold tracking-wider text-black"
        >
          Achternaam
        </label>
        <input
          type="text"
          name="achternaam"
          id="achternaam"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
          v-model="newUser.achternaam"
          required
          placeholder="Achternaam"
        />
      </div>
    </div>

    <div class="">
      <label
        for="email"
        class="text-md block font-semibold tracking-wider text-black"
      >
        E-mailadres
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="newUser.email"
        required
        placeholder="Example@mail.com"
      />
    </div>

    <div class="">
      <label
        for="password"
        class="text-md block font-semibold tracking-wider text-black"
      >
        Wachtwoord
      </label>
      <input
        type="password"
        name="password"
        id="password"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        v-model="newUser.password"
        required
      />
    </div>

    <button
      class="mt-6 w-1/3 font-body rounded-md border-2 bg-custom-orange self-center py-2 px-4  text-white hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
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

      
      registerAdmin(newUser.name, newUser.email, newUser.password)
        .then((newFireBaseUser: any) => {
          // console.log('🎉 new firebase user created in firebase')
          // console.log(newFireBaseUser)
          // console.log('uid', newFireBaseUser.uid)

          // console.log('new user role: ', newUser.role)
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
              // console.log('🎉 new user created in our database')
              // console.log(graphqlresult)
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
                    // console.log('🎉 new personeel created in our database')
                    // console.log(graphqlresult)

                    newUser.name = ''
                    newUser.voornaam = ''
                    newUser.achternaam = ''
                    newUser.email = ''
                    newUser.password = ''
                    newUser.role = 'Personeel'

                    alert('Account aangemaakt')
                  })
                  .catch(error => {
                    errorMessage.value = error.message
                    alert('Er is iets misgelopen')
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
                    // console.log('🎉 new artiest created in our database')
                    // console.log(graphqlresult)
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
