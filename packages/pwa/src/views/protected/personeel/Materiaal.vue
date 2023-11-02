<template>
  <div class="mt-24 flex flex-col">
    <button @click="showdeco = !showdeco" class="bg-blue-400 text-white">
      decoration
    </button>
    <transition name="slide-fade">
      <div v-if="showdeco">
        <div class="m-4 p-2">
          <p>balloons</p>
          <p>30 pieces</p>
        </div>
      </div>
    </transition>
    <button @click="showlight = !showlight" class="bg-blue-400 text-white">
      decoration
    </button>
    <transition name="slide-fade">
      <div v-if="showlight">
        <div class="m-4 p-2">
          <p>balloons</p>
          <p>30 pieces</p>
        </div>
      </div>
    </transition>
    <button @click="showfood = !showfood" class="bg-blue-400 text-white">
      decoration
    </button>
    <transition name="slide-fade">
      <div v-if="showfood">
        <div class="m-4 p-2">
          <p>balloons</p>
          <p>30 pieces</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showdeco = ref(true)
const showlight = ref(true)
const showfood = ref(true)
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
