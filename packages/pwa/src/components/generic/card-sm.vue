<script setup lang="ts">
import { Crown } from 'lucide-vue-next';
import { PlusCircle } from 'lucide-vue-next';
import { QrCode, PackageOpen, Clock3 } from 'lucide-vue-next';
import { computed, defineProps } from 'vue';

// icon aan de hand van de titel
const icons: Record<string, any> = {
    'uurrooster': Clock3,
    'materiaal': PackageOpen,
    'drinken & eten': QrCode,
    'vip lijst': Crown,
    'scanner': QrCode,
    'item toevoegen': PlusCircle,
}

// kleur kaartje aan de hand van de titel
const color: Record<string, any> = {
    'uurrooster': 'bg-custom-brown',
    'materiaal': 'bg-custom-greenblue',
    'drinken & eten': 'bg-custom-green',
    'vip lijst': 'bg-custom-green',
    'scanner': 'bg-custom-green',
    'item toevoegen': 'bg-custom-brown',
    'saldo': 'bg-custom-blue',
}

// kleur text aan de hand van de titel
const textColor: Record<string, any> = {
    'uurrooster': 'text-white',
    'materiaal': 'text-black',
    'drinken & eten': 'text-black',
    'vip lijst': 'text-black',
    'scanner': 'text-black',
    'item toevoegen': 'text-white',
    'saldo': 'text-white',
}

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    value: {
        type: String,
    },
})

const icon = computed(() => {
    return icons[props.title] || null;
})
</script>

<template>
  <button
    class="w-48 h-28 rounded-md m-5 flex flex-col items-center justify-center shadow-md"
    :class="color[$props.title], textColor[$props.title]"
    @click="() => $router.push(`${$props.url}`)"
  >
    <p class="font-bold text-xl">{{ $props.title.toLocaleUpperCase() }}</p>
    <div class="flex justify-center items-center my-2">
      <p v-if="$props.title === 'saldo'" class="font-bold text-3xl h-12">
        € {{ $props.value }}
      </p>
      <component v-else :is="icon" class="w-12 h-12" />
    </div>
  </button>
</template>
