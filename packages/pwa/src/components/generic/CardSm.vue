<script setup lang="ts">
import { Crown } from 'lucide-vue-next';
import { PlusCircle } from 'lucide-vue-next';
import { QrCode, PackageOpen } from 'lucide-vue-next';
import { computed  } from 'vue';
import { useRouter } from 'vue-router'; 



// icon aan de hand van de titel
const icons: Record<string, any> = {
    'materiaal': PackageOpen,
    'bonnetjes': QrCode,
    'vip lijst': Crown,
    'scanner': QrCode,
    'item': PlusCircle,
}

// kleur kaartje aan de hand van de titel
const color: Record<string, any> = {
    'materiaal': 'bg-custom-greenblue',
    'bonnetjes': 'bg-custom-green',
    'vip lijst': 'bg-custom-green',
    'scanner': 'bg-custom-blue',
    'item': 'bg-custom-brown',
    'saldo': 'bg-custom-brown',
}

const colorAcces: Record<string, any> = {
    'materiaal': 'hover:bg-custom-lightGreen focus:bg-custom-lightGreen',
    'bonnetjes': 'hover:bg-custom-darkGreen focus:bg-custom-darkGreen',
    'vip lijst': 'hover:bg-custom-darkGreen',
    'scanner': 'hover:bg-[#9BA0C2] focus:bg-[#9BA0C2]',
    'item': 'hover:bg-custom-orange focus:bg-custom-orange',
    'saldo': 'hover:bg-custom-orange focus:bg-custom-orange',
}

// kleur text aan de hand van de titel
const textColor: Record<string, any> = {
    'materiaal': 'text-black',
    'bonnetjes': 'text-black',
    'vip lijst': 'text-black',
    'scanner': 'text-white',
    'item': 'text-white',
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
    isPopup: {
        type: Boolean,
        default: false,
    },
})

const icon = computed(() => {
    return icons[props.title] || null;
})

const router = useRouter(); 
const emits = defineEmits();

const handleClick = () => {
    if (props.isPopup) emits('sendDataToParent', 'open-popup')
    else router.push(`${props.url}`)
}
</script>

<template>
  <button
    class="rounded-md m-5 flex flex-col items-center justify-center shadow-md  focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-orange"
    :class="color[$props.title], textColor[$props.title], colorAcces[$props.title]"
    @click="handleClick"
  >
    <!-- <p class="font-bold text-2xl self-start font-body px-3">{{ $props.title.toLocaleUpperCase() }}</p> -->
    <p class="font-bold text-2xl self-start font-body px-3">{{ $t(`card.${$props.title}`) }}</p>
    <div class="flex justify-center items-center my-2">
      <p v-if="$props.title === 'saldo'" class="font-pop font-extrabold text-3xl pt-4">
        € {{ $props.value }}
      </p>
      <component v-else :is="icon" class="w-12 h-12" />
    </div>
  </button>
</template>
