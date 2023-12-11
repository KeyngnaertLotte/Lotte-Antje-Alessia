<template>
  <div
    class="col-span-2 row-start-8 row-span-17 bg-white rounded-xl m-4 grid grid-rows-17"
  >
    <p class="font-bold font-body text-2xl m-3">FAVORIETE ARTIESTEN</p>
    <div class="flex flex-row w-full justify-around row-start-3 font-body">
      <button
        :class="[
          'border',
          'px-6',
          'border-3',
          'border-custom-darkGreen',
          'rounded-lg',
          { 'bg-custom-darkGreen': activeButton === 1 },
          { 'text-white': activeButton === 1 },
          'hover:bg-custom-darkGreen',
          'hover:text-white',
          'focus:outline-none',
          'focus:ring-3',
          'focus:ring-custom-darkGreen',

        ]"
        @click="handleButtonClick(1)"
      >
        <p class="font-medium">ANTJE</p>
      </button>
      <button
        :class="[
          'border',
          'px-6',
          'border-3',
          'border-custom-purple',
          'rounded-lg',
          { 'bg-custom-purple': activeButton === 2 },
          { 'text-white': activeButton === 2 },
          'hover:bg-custom-purple',
          'hover:text-white',
          'focus:outline-none',
          'focus:ring-3',
          'focus:ring-custom-purple',
        ]"
        @click="handleButtonClick(2)"
      >
        <p class="font-medium">LOTTE</p>
      </button>
      <button
        :class="[
          'border',
          'px-6',
          'border-3',
          'border-custom-orange',
          'rounded-lg',
          { 'bg-custom-orange': activeButton === 3 },
          { 'text-white': activeButton === 3 },
          'hover:bg-custom-orange',
          'hover:text-white',
          'focus:outline-none',
          'focus:ring-3',
          'focus:ring-custom-orange',
        ]"
        @click="handleButtonClick(3)"
      >
        <p class="font-medium">ALÉSSIA</p>
      </button>
    </div>
    <div class="overflow-y-auto row-start-5 row-span-12">
      <div
        v-for="(favorite, index) in filteredFavorites"
        :key="index"
        :class="[
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'p-2',
          'm-4',
          'mt-0',
          'rounded-lg',
          `bg-custom-${favorite.color}`,
        ]"
      >
        <p class="font-bold text-white text-2xl font-body">
          {{ favorite.artiest }}
        </p>
        <p class="text-white text-lg font-body">
          {{ favorite.startTime }} - {{ favorite.endTime }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'

const activeButton = ref(0)
const favoritesData = ref([] as any)

export default {
  props: {
    artiest: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    favoritesData.value = props.artiest

    const handleButtonClick = (buttonIndex: any) => {
      if (activeButton.value === buttonIndex) {
        activeButton.value = 0
      } else {
        activeButton.value = buttonIndex
      }
    }

    const filteredFavorites = computed(() => {
      const sortedFavorites = [...favoritesData.value].sort((a, b) => {
        if (a.startTime < b.startTime) {
          return -1
        } else if (a.startTime > b.startTime) {
          return 1
        } else {
          if (a.endTime < b.endTime) {
            return -1
          } else if (a.endTime > b.endTime) {
            return 1
          } else {
            return 0
          }
        }
      })

      if (activeButton.value === 1) {
        return sortedFavorites.filter(
          (favorite: any) => favorite.color === 'darkGreen',
        )
      } else if (activeButton.value === 2) {
        return sortedFavorites.filter(
          (favorite: any) => favorite.color === 'purple',
        )
      } else if (activeButton.value === 3) {
        return sortedFavorites.filter(
          (favorite: any) => favorite.color === 'orange',
        )
      } else {
        return sortedFavorites
      }
    })

    return { activeButton, handleButtonClick, filteredFavorites }
  },
}
</script>
