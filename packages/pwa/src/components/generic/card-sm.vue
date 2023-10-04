<script setup lang="ts">
import { QrCode, PackageOpen, Clock3 } from 'lucide-vue-next';
const props = defineProps({
    voornaam: {
        type: String,
        required: true,
    },
})

</script>

<template>
    <div class="w-[160px] h-[100px] bg-custom-brown text-white rounded-md m-5">
        <p class="font-bold text-xl pl-2">Uurrooster</p>
        <div class="flex justify-center items-center my-2">
            <Clock3 class="h-12 w-12"/>
        </div>
    </div>
    <!-- <div class="w-[160px] h-[100px] bg-custom-brown text-white rounded-md m-5">
        <p class="font-bold text-xl pl-2">Materiaal</p>
        <div class="flex justify-center items-center my-2">
            <PackageOpen class="h-12 w-12"/>
        </div>
    </div> -->
    <!-- <div class="w-[160px] h-[100px] bg-custom-brown text-white rounded-md m-5">
        <p class="font-bold text-xl pl-2">DRINK & FOOD</p>
        <div class="flex justify-center items-center my-2">
            <QrCode class="h-12 w-12"/>
        </div>
    </div> -->
    <!-- <div class="w-[160px] h-[100px] bg-custom-brown text-white rounded-md m-5">
        <p class="font-bold text-xl pl-2">Saldo</p>
        <div class="flex justify-center items-center">
            <p class="font-bold text-3xl my-2">€ 2400</p>
        </div>
    </div> -->
</template>