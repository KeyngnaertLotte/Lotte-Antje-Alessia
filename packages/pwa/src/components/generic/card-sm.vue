<script setup lang="ts">
import { Crown } from 'lucide-vue-next';
import { PlusCircle } from 'lucide-vue-next';
import { QrCode, PackageOpen, Clock3 } from 'lucide-vue-next';
import { computed, defineProps } from 'vue';


// DF = Drink & Food
const icons: Record<string, any> = {
    'uurrooster': Clock3,
    'materiaal': PackageOpen,
    'drinken & eten': QrCode,
    'vip lijst': Crown,
    'scanner': QrCode,
    'item toevoegen': PlusCircle,
}

const color: Record<string, any> = {
    'uurrooster': 'bg-custom-brown',
    'materiaal': 'bg-custom-red',
    'drinken & eten': 'bg-custom-blue',
    'vip lijst': 'bg-custom-brown',
    'scanner': 'bg-custom-brown',
    'item toevoegen': 'bg-custom-brown',
    'saldo': 'bg-custom-brown',
}

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    value: {
        type: String,
    },
})

const icon = computed(() => {
    // Look up the icon based on the title
    return icons[props.title] || null;
})
</script>

<template>
  <div
    class="w-48 h-28 text-white rounded-md m-5 flex flex-col items-center justify-center"
    :class="color[$props.title]"
  >
    <p class="font-bold text-xl">{{ $props.title.toLocaleUpperCase() }}</p>
    <div class="flex justify-center items-center my-2">
      <p v-if="$props.title === 'saldo'" class="font-bold text-3xl h-12">
        € {{ $props.value }}
      </p>
      <component v-else :is="icon" class="w-12 h-12" />
    </div>
  </div>
</template>
