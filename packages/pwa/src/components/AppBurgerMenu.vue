<template>
    <div class="max-w-screen max-h-screen h-screen  bg-[#D5573B] relative z-1 flex flex-col overflow-hidden" v-if="isVisible">
      <div class="flex justify-end p-4">
          <button @click="toggleVisibility" class="justify-self-end "> <X class="h-12 w-12 stroke-white"/></button>
      </div>
      <div class="flex justify-center items-center py-12">
          <div class=" flex flex-col justify-center items-center w-fit">
          <p class="text-white font-bold text-5xl">Lotantsia</p>
          <p class="text-white font-bold text-3xl self-end">Festival</p>
      </div>
      </div>
      <div class="px-6 py-12 ">
          <div class="flex flex-col justify-center gap-8">
              <router-link to="/dashboard" class="flex flex-row items-center text-2xl text-white gap-4 font-bold"> <Clock3 class="stroke-white h-8 w-8"/>LINE UP</router-link>
              <router-link to="/dashboard" class="flex flex-row items-center text-2xl text-white gap-4 font-bold"> <MapPin class="stroke-white h-8 w-8"/>MAP</router-link>
              <router-link to="/dashboard" class="flex flex-row items-center text-2xl text-white gap-4 font-bold"> <Coins class="stroke-white h-8 w-8"/>SALDO</router-link>
          </div>
      </div>
      <div class="h-full flex justify-center items-end pb-12">
          <router-link to="/dashboard" class="flex flex-row items-center text-2xl text-white gap-4 font-bold"> <LogOut  class="stroke-white h-8 w-8 transform -scale-x-100"/> UITLOGGEN</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
    import { AlignJustify, X, Clock3, MapPin, Coins, LogOut  } from 'lucide-vue-next';
  
      const { isVisible } = defineProps(['isVisible']);
      const emit = defineEmits();
  
      function toggleVisibility() {
      emit('toggle-visibility');  // Emit event to toggle visibility
      }
  </script>
  