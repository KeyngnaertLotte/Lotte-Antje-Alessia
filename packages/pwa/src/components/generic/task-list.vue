<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  title: {
    type: String,
  },
})
</script>

<template>
  <div class="bg-white shadow-md w-64 h-64 p-4 rounded-md">
    <h1>Takenlijst</h1>
    <div class="mt-3">
      <ul>
        <li class="flex justify-between">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">Frisdranken stand A</label>
          </div>
          <p>3:32</p>
        </li>
        <li class="flex justify-between">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">Microfoon Antje</label>
          </div>
          <p>4:08</p>
        </li>
        <li class="flex justify-between">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">Rietjes stand B</label>
          </div>
          <p>3:16</p>
        </li>
        <li class="flex justify-between">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">...</label>
          </div>
          <p>3:29</p>
        </li>
      </ul>
    </div>
  </div>
</template>
