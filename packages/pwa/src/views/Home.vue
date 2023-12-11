<template class="bg-[#DFE6DA]">
  <div class="relative bg-[#DFE6DA]">
    <div class="absolute w-full grid grid-rows-5">
      <router-link to="/auth/login" class="justify-self-end m-4 row-span-1 focus:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white"
        ><p class="font-body font-bold text-white text-3xl">
          LOGIN
        </p></router-link
      >
      <div
        class="flex flex-col items-end row-span-4 justify-center justify-self-center"
      >
        <p class="font-header font-bold text-white text-7xl">Lotantsia</p>
        <p class="font-header font-bold text-white text-5xl">Festival</p>
      </div>
    </div>
    <img src="../images/bg-small.png" alt="" class="w-screen" />
  </div>
  <div class="bg-primary">
    <AppLineUp />
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import AppLineUp from '../components/AppLineUp.vue'
import AppFooter from '../components/AppFooter.vue'

import { onMounted } from 'vue'

import useFirebase from '@/composables/useFirebase'
const { firebaseUser } = useFirebase()
import useCustomUser from '@/composables/useCustomUser'
const { customUser } = useCustomUser()
import { useRouter } from 'vue-router'
const { push } = useRouter()
const role = customUser.value?.role.toLocaleLowerCase()

onMounted(() => {
  console.log(firebaseUser.value)
  if (firebaseUser.value !== null) {
    push('/' + role + '/dashboard')
  }
})
</script>
