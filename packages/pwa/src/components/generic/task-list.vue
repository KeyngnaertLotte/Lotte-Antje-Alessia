<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  takenlijst: {
    type: Array as () => Array<any>,
  },
})

</script>

<template>
  <div class="bg-white shadow-md w-full p-4 rounded-2xl" v-for="taak in takenlijst">
    <h1 class="font-bold text-xl">Takenlijst</h1>
    <div class="mt-3">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-2">
        <div class="flex items-center col-span-4">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">{{ taak.naam }}</label>
        </div>
        <p class="text-end col-span-1 self-center">{{ taak.deadline }}</p>
      </div>
    </div>
  </div>
</template>
