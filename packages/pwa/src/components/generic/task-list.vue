<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
})
</script>

<template>
  <div class="bg-white shadow-md max-w-3xl p-4 rounded-2xl col-span-2 row-start-8 row-span-17 bg-white rounded-xl m-4 grid grid-rows-17">
    <h1 class="font-bold text-xl">Takenlijst</h1>
    <div class="mt-3">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-2">
        <div class="flex items-center col-span-4">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">Frisdranken stand A</label>
        </div>
        <p class="text-end col-span-1 self-center">3:32</p>
        <div class="flex items-center col-span-4">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">Microfoon Antje</label>
        </div>
        <p class="text-end col-span-1 self-center">4:08</p>
        <div class="flex items-center col-span-4">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">Rietjes stand B</label>
        </div>
        <p class="text-end col-span-1 self-center">3:16</p>
        <div class="flex items-center col-span-4">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">...</label>
        </div>
        <p class="text-end col-span-1 self-center">3:29</p>
      </div>
    </div>
  </div>
</template>
