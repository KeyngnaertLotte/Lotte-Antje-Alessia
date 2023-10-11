<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
})
</script>

<template>
  <div class="bg-white shadow-md max-w-fit p-4 rounded-2xl">
    <h1 class="font-bold text-xl">Takenlijst</h1>
    <div class="mt-3">
      <div class="grid grid-cols-2 gap-y-3 grid-rows-2">
        <div class="flex items-center">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">Frisdranken stand A</label>
        </div>
        <p class="text-end">3:32</p>
        <div class="flex items-center">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">Microfoon Antje</label>
        </div>
        <p class="text-end">4:08</p>
        <div class="flex items-center">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">Rietjes stand B</label>
        </div>
        <p class="text-end">3:16</p>
        <div class="flex items-center">
          <input type="checkbox" class="form-checkbox accent-custom-green h-5 w-5 mr-3" id="checkbox"/>
          <label for="checkbox">...</label>
        </div>
        <p class="text-end">3:29</p>
      </div>
    </div>
  </div>
</template>
