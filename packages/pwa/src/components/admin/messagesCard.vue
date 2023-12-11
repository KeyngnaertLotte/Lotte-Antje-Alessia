<template>
    <div class="row-span-3 col-span-2 p-6 bg-white rounded-lg shadow-md col-start-6">
      <h1 class="text-2xl font-bold font-body">Ontvangen berichten</h1>
      
    </div>
  </template>
  
  <script lang="ts">
    import useRealtime from '@/composables/useRealtime'
    const { on } = useRealtime()

    on('messageToAdmin', (data: any) => {
      console.log('data:', data)
    })

  export default {
    setup() {
      return {
      };
    },
  };
  </script>
  