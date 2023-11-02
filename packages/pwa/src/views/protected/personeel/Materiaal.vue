<template>
  <div class="mt-24">
    <div v-for="materiaal in materiaalInfo">
      <div v-for="m in materiaal">
        <button
          @click="showGeluid = !showGeluid"
          class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between"
        >
          <p>{{ m.categorie }}</p>
          <ChevronDown class="stroke-custom-brown" />
        </button>
        <transition name="slide-fade">
          <div v-if="showGeluid">
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

    <!-- <button
      @click="showLicht = !showLicht"
      class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between"
    >
      <p>light</p>
      <ChevronDown class="stroke-custom-brown" />
    </button>
    <transition name="slide-fade">
      <div v-if="showLicht">
        <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
          <p>laser</p>
          <p>3 pieces</p>
        </div>
        <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
          <p>projectors</p>
          <p>5 pieces</p>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ChevronDown } from 'lucide-vue-next'
import { GET_MATERIAAL } from '@/graphql/materiaal.query'

const materiaalInfo = ref<any | null>(null)

export default {
  name: 'Materiaal',
  components: {ChevronDown},
  props: {},
  setup() {
    //voor elk onderdeel een show variabele
    const showGeluid = ref(false)
    const showLicht = ref(false)
    const showInstrument = ref(false)
    const showPodium = ref(false)
    const showBackstage = ref(false)
    const showStroom = ref(false)
    const showToilet = ref(false)
    const showEtenDrinken = ref(false)
    const showEhbo = ref(false)
    const showBeveiliging = ref(false)
    const showAfval = ref(false)
    const showDecor = ref(false)

    const getMateriaalInfo = async () => {
      try{
        const { onResult } = useQuery(GET_MATERIAAL)
        onResult(result => {
          if (result.data){
            console.log('Data:', result.data)
            materiaalInfo.value = result.data
            console.log('materiaalInfo:', materiaalInfo.value)
          }
        })
      }
      catch(error){
        console.error('Error fetching materiaal info:', error)
      }
    }

    getMateriaalInfo()
    return {
      showGeluid,
      showLicht,
      showInstrument,
      showPodium,
      showBackstage,
      showStroom,
      showToilet,
      showEtenDrinken,
      showEhbo,
      showBeveiliging,
      showAfval,
      showDecor,

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
