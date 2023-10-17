<template>
    <div class="col-span-2 row-start-5 row-span-full bg-primary">
        <AppLineUpVue/>
    </div>
  </template>
  
  <script lang="ts">
    import AppLineUpVue from '@/components/AppLineUp.vue';
    export default {
        components: {
            AppLineUpVue,
        },
    };
  </script>