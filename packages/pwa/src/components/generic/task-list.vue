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
        <div>
          <input type="checkbox" id="checkbox" class="mr-3" />
          <label for="checkbox">Frisdranken stand A</label>
        </div>
        <p class="text-end">3:32</p>
        <div>
          <input type="checkbox" id="checkbox" class="mr-3" />
          <label for="checkbox">Microfoon Antje</label>
        </div>
        <p class="text-end">4:08</p>
        <div>
          <input type="checkbox" id="checkbox" class="mr-3" />
          <label for="checkbox">Rietjes stand B</label>
        </div>
        <p class="text-end">3:16</p>
        <div>
          <input type="checkbox" id="checkbox" class="mr-3" />
          <label for="checkbox">...</label>
        </div>
        <p class="text-end">3:29</p>
      </div>
      <!-- <ul>
        <li class="flex justify-between my-4">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">Frisdranken stand A</label>
          </div>
          <p>3:32</p>
        </li>
        <li class="flex justify-between my-4">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">Microfoon Antje</label>
          </div>
          <p>4:08</p>
        </li>
        <li class="flex justify-between my-4">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">Rietjes stand B</label>
          </div>
          <p>3:16</p>
        </li>
        <li class="flex justify-between my-4">
          <div>
            <input type="checkbox" id="checkbox" class="mr-3" />
            <label for="checkbox">...</label>
          </div>
          <p>3:29</p>
        </li>
      </ul> -->
    </div>
  </div>
</template>
