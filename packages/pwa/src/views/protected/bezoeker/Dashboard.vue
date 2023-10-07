<template>
    <div class="max-h-screen grid grid-cols-2 grid-rows-24 h-screen bg-[#EFEFEF]">
        <div class="col-span-2 row-span-3 ">
            <AppHeader/>
        </div>
        <div class="col-span-1 row-start-4 row-span-4 bg-[#885053] rounded-xl m-4 flex flex-col items-center p-2">
            <p class="text-white font-bold text-2xl self-start">SALDO</p>
            <p class="text-white font-extrabold text-3xl py-2">€ 24,00</p>
        </div>
        <div class="col-span-1 row-start-4 row-span-4 bg-[#C6ECAE] rounded-xl m-4 flex flex-col items-center ">
            <p class="font-bold text-2xl">DRINK&FOOD</p>
            <p class="m-2"><QrCode class="w-16 h-16"/></p>
        </div>
        <FavoriteArtists/>
    </div>
  </template>
  
  <script setup>
    import { AlignJustify, QrCode } from 'lucide-vue-next';
    import AppHeader from '../../../components/AppHeader.vue';
    import FavoriteArtists from '../../../components/artiest/FavoriteArtists.vue';
  </script>