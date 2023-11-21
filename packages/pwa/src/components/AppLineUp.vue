<template>
    <div class="flex flex-col items-center mx-4 mb-8">
            <h1 class="font-header text-custom-darkGreen text-5xl mb-4">Antje</h1>
            <button @click="() => openModal('Tom Mish')" class="bg-custom-darkGreen my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">TOM MISH</p>
                <p class="font-body text-xl text-white leading-none">20:15 - 21:30</p>
            </button>
            <button @click="() => openModal('Brihang')" class="bg-custom-darkGreen my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">BRIHANG</p>
                <p class="font-body text-xl text-white leading-none">22:00 - 23:15</p>
            </button>
            <button @click="() => openModal('BeRightBack')" class="bg-custom-darkGreen my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">BERIGHTBACK</p>
                <p class="font-body text-xl text-white leading-none">23:45 - 01:00</p>
            </button>
        </div>
        <div class="flex flex-col items-center mx-4 mb-8">
            <h1 class="font-header text-custom-purple text-5xl mb-4">Lotte</h1>
            <button @click="() => openModal('Bohnes')" class="bg-custom-purple my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">BOHNES</p>
                <p class="font-body text-xl text-white leading-none">20:00 - 21:30</p>
            </button>
            <button @click="() => openModal('Aston')" class="bg-custom-purple my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">ASTON</p>
                <p class="font-body text-xl text-white leading-none">21:45 - 22:45</p>
            </button>
            <button @click="() => openModal('NF')" class="bg-custom-purple my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">NF</p>
                <p class="font-body text-xl text-white leading-none">23:00 - 00:30</p>
            </button>
        </div>
        <div class="flex flex-col items-center mx-4">
            <h1 class="font-header text-custom-orange text-5xl mb-4">Aléssia</h1>
            <button @click="() => openModal('TheFatRat')" class="bg-custom-orange my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">THEFATRAT</p>
                <p class="font-body text-xl text-white leading-none">20:00 - 21:00</p>
            </button>
            <button @click="() => openModal('Neffex')" class="bg-custom-orange my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">NEFFEX</p>
                <p class="font-body text-xl text-white leading-none">21:15 - 22:15</p>
            </button>
            <button @click="() => openModal('BoyWithUke')" class="bg-custom-orange my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">BOYWITHUKE</p>
                <p class="font-body text-xl text-white leading-none">22:30 - 23:30</p>
            </button>
            <button @click="() => openModal('Imagine Dragons')" class="bg-custom-orange my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full">
                <p class="font-body text-2xl font-bold text-white leading-none">IMAGINE DRAGONS</p>
                <p class="font-body text-xl text-white leading-none">23:45 - 00:45</p>
            </button>
        </div>
        <DetailArtiest v-if="isModalOpen" :artist="artist" :modalState="isModalOpen" :isBezoeker="isBezoeker" @close-modal="handleCloseModal"/>
    
</template>

<script lang="ts">
import DetailArtiest from '@/components/bezoeker/DetailArtiest.vue';
import { ref, computed, type PropType } from 'vue';

const isModalOpen = ref(false);
const artist = ref('Lotte');
const isBezoeker = ref(false);

export default {
  props: {
    favorites: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  components: {
    DetailArtiest
  },
  setup(props) {
    console.log("favorites", props);

    function openModal(artistName: string) {
      const url = window.location.href;
      console.log(url);
      // see if url has bezoeker
      const result = url.includes('bezoeker');
      console.log(result);

      if (result) {
        isBezoeker.value = true;
      }
      isModalOpen.value = true;
      artist.value = artistName;
    }

    const isArtistInFavorites = computed(() => {
      return props.favorites.some(favorite => favorite.artiest === artist.value.toUpperCase());
    });

    function handleCloseModal() {
      isModalOpen.value = false;
    }

    return {
      isModalOpen,
      artist,
      openModal,
      isArtistInFavorites,
      handleCloseModal,
      isBezoeker
    };
  },
};
</script>