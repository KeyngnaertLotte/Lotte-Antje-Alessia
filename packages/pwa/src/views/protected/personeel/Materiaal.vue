<template>
  <!-- <div class="mt-24"> -->
  <div class="col-span-2 row-start-4 h-fit">
    <div v-if="MateriaalByCategorie">
      <div
        v-for="categorie in Object.keys(MateriaalByCategorie)"
        :key="categorie"
      >
        <button
          @click="toggleShow(categorie)"
          class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between"
        >
          <p>{{ categorie }}</p>
          <ChevronDown class="stroke-custom-brown" />
        </button>
        <transition name="slide-fade">
          <div v-if="isShow(categorie)">
            <div
              v-for="item in MateriaalByCategorie[categorie]"
              :key="categorie"
            >
              <div
                v-if="item.categorie === categorie"
                class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full"
              >
                <p>{{ item.item }}</p>
                <p>{{ item.aantal }}</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ChevronDown } from 'lucide-vue-next'
import { GET_MATERIAAL } from '@/graphql/materiaal.query'

type ShowState = { [key: string]: boolean }

const materiaalInfo = ref<any | null>(null)

export default {
  components: { ChevronDown },
  setup() {
    const showState = ref<ShowState>({})
    const { onResult } = useQuery(GET_MATERIAAL)

    const toggleShow = (category: string) => {
      showState.value[category] = !showState.value[category]
    }

    const isShow = (category: string) => {
      return showState.value[category] || false
    }

    onResult(result => {
      if (result.data) {
        materiaalInfo.value = result.data
      }
    })

    const MateriaalByCategorie = computed(() => {
      if (materiaalInfo.value) {
        const categorizedItems: { [key: string]: any[] } = {}
        materiaalInfo.value.materiaal.forEach((item: any) => {
          const category = item.categorie
          if (!categorizedItems[category]) {
            categorizedItems[category] = []
          }
          categorizedItems[category].push(item)
        })
        console.log('categorizedItems: ', categorizedItems)
        return categorizedItems
      }
      return null
    })

    return {
      toggleShow,
      isShow,
      MateriaalByCategorie,
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
