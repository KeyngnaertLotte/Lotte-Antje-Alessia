<template>
  <div
    class="row-span-3 col-span-2 p-6 bg-white rounded-lg shadow-md col-start-6"
  >
    <h1 class="text-2xl font-bold font-body">Berichten centrum</h1>
    <div class="w-full">
      <p class="w-1/2">Van</p>
      <p class="w-1/2">Bericht</p>
      <p class="w-1/14"></p>
    </div>
    <div class="overflow-y-auto max-h-4/5 my-4">
      <div
        v-for="(message, index) in items"
        :key="index"
        class="flex flex-row w-full justify-between items-center border-b-2 border-gray-200 p-2"
      >
        <p>{{ message.key }}</p>
        <p>{{ message.value }}</p>
        <button><X class="h-4 w-4" /></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useRealtime from '@/composables/useRealtime'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
const { on } = useRealtime()

let canReceiveNotification = true

on('messageToAdmin', (data: any) => {
  if (canReceiveNotification) {
    console.log('data:', data)

    const [content, from] = data.split(' - ')
    if (!localStorage.getItem(from)) {
      localStorage.setItem(from, content);
      canReceiveNotification = false;

      setTimeout(() => {
        canReceiveNotification = true;
      }, 5000);
    }
  }
})

export default {
  components: {
    X,
  },
  setup() {
    const items = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const value = localStorage.getItem(key)
      if (!key.startsWith('firebase')) {
        if (!key.startsWith('can')){
        items.push({ key, value })}
      }
      console.log('items:', items)
    }
    return {
      items,
    }
  },
}
</script>
