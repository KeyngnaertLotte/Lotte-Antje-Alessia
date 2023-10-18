<script setup lang="ts"></script>

<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="relative bg-white w-9/10 h-3/4 rounded-lg flex flex-col items-center p-6"
    >
      <!-- <button @click="closeModal" class="absolute top-[-1rem] right-[-0.5rem] flex justify-end bg-[#D5573B] rounded-lg"> <X class="z-5 h-12 w-12 fill-white"/></button> -->
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <p class="text-white font-bold font-body text-2xl">X</p>
      </button>
    </div>
  </div>
</template>
