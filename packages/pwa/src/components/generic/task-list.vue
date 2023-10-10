<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
    },
})
</script>

<template>
  <div class="bg-pink-300 shadow-lg w-64 h-64 p-4 rounded-md">
    <h1>Takenlijst</h1>
  </div>
</template>
