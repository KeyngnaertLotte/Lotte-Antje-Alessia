<template>
    <div class="col-span-2 row-start-8 row-span-17 bg-white rounded-xl m-4 grid grid-rows-17">
        <p class="font-bold font-body text-2xl m-3">FAVORIETE ARTIESTEN</p>
        <div class="flex flex-row w-full justify-around row-start-3 font-body">
            <button :class="['border', 'px-6', 'border-3', 'border-[#94C9A9]', 'rounded-lg', {'bg-[#94C9A9]':activeButton === 1}, {'text-white':activeButton === 1}]" @click="handleButtonClick(1)"><p class="font-medium">ANTJE</p></button>
            <button :class="['border', 'px-6', 'border-3', 'border-[#777DA7]', 'rounded-lg', {'bg-[#777DA7]':activeButton === 2}, {'text-white':activeButton === 2}]" @click="handleButtonClick(2)"><p class="font-medium">LOTTE</p></button>
            <button :class="['border', 'px-6', 'border-3', 'border-[#D5573B]', 'rounded-lg', {'bg-[#D5573B]':activeButton === 3}, {'text-white':activeButton === 3}]" @click="handleButtonClick(3)"><p class="font-medium">ALÉSSIA</p></button>
        </div>
        <div class="overflow-y-auto row-start-5 row-span-12">
            <div v-for="(favorite, index) in filteredFavorites" :key="index" :class="['flex', 'flex-col', 'justify-center', 'items-center', 'p-2', 'm-4', 'mt-0', 'rounded-lg', `bg-[${favorite.color}]`]">
                <p class="font-bold text-white text-2xl font-body">{{ favorite.artiest }}</p>
                <p class="text-white text-lg font-body">{{ favorite.time }}</p>
            </div>
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, computed } from 'vue';

    const activeButton = ref(null);

    const handleButtonClick = (buttonIndex: any) => {
        if (activeButton.value === buttonIndex) {
            activeButton.value == 0;
        } else {
            activeButton.value = buttonIndex;
        }
    };

    const favorites = ref([
        { artiest: 'BOHNES', time: '20:00 - 21:30', color: '#777DA7' },
        { artiest: 'NEFFEX', time: '21:15 - 22:15', color: '#D5573B' },
        { artiest: 'BOYWITHUKE', time: '22:30 - 23:30', color: '#D5573B' },
        { artiest: 'BERIGHTBACK', time: '23:45 - 01:00', color: '#94C9A9' }
    ]);

    const filteredFavorites = computed(() => {
        if (activeButton.value === 1) {
            return favorites.value.filter((favorite) => favorite.color === '#94C9A9');
        } else if (activeButton.value === 2) {
            return favorites.value.filter((favorite) => favorite.color === '#777DA7');
        } else if (activeButton.value === 3) {
            return favorites.value.filter((favorite) => favorite.color === '#D5573B');
        } else {
            return favorites.value;
        }
    });
  </script>