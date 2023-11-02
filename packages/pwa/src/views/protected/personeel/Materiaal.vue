<template>
  <div class="mt-24">
    <div>{{  }}</div>
    <!-- <button
      @click="showGeluid = !showGeluid"
      class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between"
    >
      <p>decoration</p>
      <ChevronDown class="stroke-custom-brown" />
    </button>
    <transition name="slide-fade">
      <div v-if="showGeluid">
        <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
          <p>balloons</p>
          <p>30 pieces</p>
        </div>
        <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
          <p>flowers</p>
          <p>50 pieces</p>
        </div>
      </div>
    </transition>

    <button
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
import { ChevronDown } from 'lucide-vue-next'



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

      }
      catch(error){
        console.error('Error fetching materiaal info:', error)
      }
    }


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
      showDecor
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
