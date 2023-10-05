<template>
    <AppBurgerMenu :isVisible="isVisible" @toggleVisibility="toggleVisibility"/>
      <div class="absolute top-0 left-0 right-0 px-8 py-6 bg-[#D5573B]">
          <div class="font-mono text-2xl text-white font-bold flex justify-between content-center">
              <p>Hey <br> Jane!</p>
              <button @click="toggleVisibility">
                  <AlignJustify class="h-8 w-8 fill-white" />
              </button>
          </div>
      </div>
</template>

<script setup>
    import AppBurgerMenu from '../components/AppBurgerMenu.vue';
    import { AlignJustify } from 'lucide-vue-next';
    import { ref } from 'vue';

    const isVisible = ref(false); // Set it to true initially to show the AppHeader

    function toggleVisibility() {
    isVisible.value = !isVisible.value;
    console.log(isVisible.value);
    }
  </script>