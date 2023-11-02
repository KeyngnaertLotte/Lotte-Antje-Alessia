<template>
  <div class="mt-24">
    <button @click="showdeco = !showdeco" class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between">
      <p>decoration</p>
      <ChevronDown class="stroke-custom-brown" />
    </button>
    <transition name="slide-fade">
      <div v-if="showdeco">
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

    <button @click="showlight = !showlight" class="m-4 mb-0 p-2 min-w-full border-custom-brown border-1 flex justify-between">
      <p>light</p>
      <ChevronDown class="stroke-custom-brown" />
    </button>
    <transition name="slide-fade">
      <div v-if="showlight">
        <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
          <p>laser</p>
          <p>3 pieces</p>
        </div>
        <div class="m-2 mx-4 mt-0 p-2 flex justify-between min-w-full">
          <p>projectors</p>
          <p>5 pieces</p>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next';

const showdeco = ref(false)
const showlight = ref(false)
const showfood = ref(false)
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
