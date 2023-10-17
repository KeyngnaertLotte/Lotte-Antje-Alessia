<template>
  <div
    class="max-w-screen max-h-screen h-screen bg-[#D5573B] relative z-1 flex flex-col overflow-hidden"
    v-if="isVisible"
  >
    <div class="flex justify-end p-4">
      <button @click="toggleVisibility" class="justify-self-end">
        <X class="h-14 w-14 stroke-white" />
      </button>
    </div>
    <div class="flex justify-center items-center py-12">
      <div class="flex flex-col justify-center items-center w-fit">
        <p class="text-white font-bold text-6xl font-header">Lotantsia</p>
        <p class="text-white font-bold text-4xl self-end font-header">
          Festival
        </p>
      </div>
    </div>
    <div class="px-6 py-12">
      <div class="flex flex-col justify-center gap-8">
        <router-link
          to="/bezoeker/dashboard"
          class="flex flex-row items-center text-3xl text-white gap-4 font-body"
        >
          <LayoutDashboard  class="stroke-white h-8 w-8" />DASHBOARD</router-link
        >
        <router-link
          to="/bezoeker/lineup"
          class="flex flex-row items-center text-3xl text-white gap-4 font-body"
        >
          <Clock3 class="stroke-white h-8 w-8" />LINE UP</router-link
        >
        <router-link
          to="/dashboard"
          class="flex flex-row items-center text-3xl text-white gap-4 font-body"
        >
          <MapPin class="stroke-white h-8 w-8" />MAP</router-link
        >
        <router-link
          to="/dashboard"
          class="flex flex-row items-center text-3xl text-white gap-4 font-body"
        >
          <Coins class="stroke-white h-8 w-8" />SALDO</router-link
        >
      </div>
    </div>
    <div class="h-full flex justify-center items-end pb-12">
      <button
        @click="logoutUser"
        class="flex flex-row items-center text-3xl text-white gap-4 font-body"
      >
        <LogOut class="stroke-white h-8 w-8 transform -scale-x-100" />
        UITLOGGEN
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutDashboard , X, Clock3, MapPin, Coins, LogOut } from 'lucide-vue-next'
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'

const { isVisible } = defineProps(['isVisible'])
const emit = defineEmits()
const { firebaseUser, logout } = useFirebase()
const { replace } = useRouter()

function toggleVisibility() {
  emit('toggle-visibility') // Emit event to toggle visibility
}

const logoutUser = () => {
  logout().then(() => {
    replace({ path: '/' })
  })
}
</script>
