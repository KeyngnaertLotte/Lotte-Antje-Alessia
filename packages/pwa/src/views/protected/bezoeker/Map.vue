<template>
    <div class="col-span-2 row-start-4 row-span-full bg-secondary">
        <img class="h-full w-full" src="https://images.unsplash.com/photo-1478860409698-8707f313ee8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Map" usemap="#map" />
        <map class="h-screen w-screen" name="map">
        <area shape="rect" coords="10,10,100,100" href="#" alt="Area 1" />
        <area shape="circle" coords="200,200,50" href="#" alt="Area 2" />
        <!-- Add more areas as needed -->
        </map>
    </div>
  </template>
  
  <script lang="ts">
    export default {
        components: {
        },
    };
  </script>