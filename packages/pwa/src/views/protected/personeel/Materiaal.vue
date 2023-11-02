<template>
  <div class="mt-24">
    <div v-for="materiaal in materiaalInfo">
      <div v-for="m in materiaal">
        <button
          @click="toggleShow(m.categorie)"
          class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between"
        >
          <p>{{ m.categorie }}</p>
          <ChevronDown class="stroke-custom-brown" />
        </button>
        <transition name="slide-fade">
          <div v-if="isShow(m.categorie)">
            <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
              <p>{{ m.item }}</p>
              <p>{{ m.aantal }}</p>
            </div>
            <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
              <p>{{ m.item }}</p>
              <p>{{ m.aantal }}</p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ChevronDown } from 'lucide-vue-next'
import { GET_MATERIAAL } from '@/graphql/materiaal.query'

type ShowState = { [key: string]: boolean }

const materiaalInfo = ref<any | null>(null)

export default {
  name: 'Materiaal',
  components: { ChevronDown },
  props: {},
  setup() {
    const showState = ref<ShowState>({})

    const toggleShow = (category: string) => {
      showState.value[category] = !showState.value[category]
    }

    const isShow = (category: string) => {
      return showState.value[category] || false
    }

    const getMateriaalInfo = async () => {
      try {
        const { onResult } = useQuery(GET_MATERIAAL)
        onResult(result => {
          if (result.data) {
            console.log('Data:', result.data)
            materiaalInfo.value = result.data
            console.log('materiaalInfo:', materiaalInfo.value)
          }
        })
      } catch (error) {
        console.error('Error fetching materiaal info:', error)
      }
    }

    getMateriaalInfo()
    return {
      toggleShow,
      isShow,
      getMateriaalInfo,
      materiaalInfo,
    }
  },
}
</script>


<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
