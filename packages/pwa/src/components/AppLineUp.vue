<template>
  <div class="flex flex-col items-center mx-4 mb-8">
    <h1 class="font-header text-custom-darkGreen text-5xl mb-4">Antje</h1>
    <button
      v-for="artiest in lineUpAntje"
      @click="() => openModal(artiest.naam)"
      class="bg-custom-darkGreen my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full"
    >
      <p class="font-body text-2xl font-bold text-white leading-none">
        {{ artiest.naam }}
      </p>
      <p class="font-body text-xl text-white leading-none">
        {{ artiest.tijd }}
      </p>
    </button>
  </div>
  <div class="flex flex-col items-center mx-4 mb-8">
    <h1 class="font-header text-custom-purple text-5xl mb-4">Lotte</h1>
    <button
      v-for="artiest in lineUpLotte"
      @click="() => openModal(artiest.naam)"
      class="bg-custom-purple my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full"
    >
      <p class="font-body text-2xl font-bold text-white leading-none">
        {{ artiest.naam }}
      </p>
      <p class="font-body text-xl text-white leading-none">
        {{ artiest.tijd }}
      </p>
    </button>
  </div>
  <div class="flex flex-col items-center mx-4">
    <h1 class="font-header text-custom-orange text-5xl mb-4">Aléssia</h1>
    <button
      v-for="artiest in lineUpAlessia"
      @click="() => openModal(artiest.naam)"
      class="bg-custom-orange my-2 rounded-lg flex flex-col items-center leading-none py-3 w-full"
    >
      <p class="font-body text-2xl font-bold text-white leading-none">
        {{ artiest.naam }}
      </p>
      <p class="font-body text-xl text-white leading-none">
        {{ artiest.tijd }}
      </p>
    </button>
  </div>
  <DetailArtiest
    v-if="isModalOpen"
    :artist="artist"
    :modalState="isModalOpen"
    :isBezoeker="isBezoeker"
    @close-modal="handleCloseModal"
  />
</template>

<script lang="ts">
import DetailArtiest from '@/components/bezoeker/DetailArtiest.vue'
import { ref, computed, type PropType } from 'vue'
import { GET_LINEUP } from '@/graphql/artiest.query'
import { useQuery } from '@vue/apollo-composable'
import { ArrowUpToLine } from 'lucide-vue-next'

const isModalOpen = ref(false)
const artist = ref('Lotte')
const isBezoeker = ref(false)

const lineUpAntje = ref<any | null>(null)
const lineUpLotte = ref<any | null>(null)
const lineUpAlessia = ref<any | null>(null)

export default {
  props: {
    favorites: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  components: {
    DetailArtiest,
  },
  setup(props) {
    console.log('favorites', props)

    const { onResult } = useQuery(GET_LINEUP)
    onResult(result => {
      if (result.data) {
        lineUpAntje.value = result.data.lineUp.filter(
          (artiest: any) => artiest.podium === 'Antje',
        )
        lineUpLotte.value = result.data.lineUp.filter(
          (artiest: any) => artiest.podium === 'Lotte',
        )
        lineUpAlessia.value = result.data.lineUp.filter(
          (artiest: any) => artiest.podium === 'Aléssia',
        )
      }
    })

    function openModal(artistName: string) {
      const url = window.location.href
      console.log(url)
      // see if url has bezoeker
      const result = url.includes('bezoeker')
      console.log(result)

      if (result) {
        isBezoeker.value = true
      }
      isModalOpen.value = true
      artist.value = artistName
    }

    const isArtistInFavorites = computed(() => {
      return props.favorites.some(
        favorite => favorite.artiest === artist.value.toUpperCase(),
      )
    })

    function handleCloseModal() {
      isModalOpen.value = false
    }

    return {
      isModalOpen,
      artist,
      openModal,
      isArtistInFavorites,
      handleCloseModal,
      isBezoeker,
      lineUpAntje,
      lineUpLotte,
      lineUpAlessia,
    }
  },
}
</script>
