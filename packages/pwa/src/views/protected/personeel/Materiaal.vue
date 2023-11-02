<template>
  <div class="mt-24">
    <button @click="toggle" class="bg-blue-400 text-white">
      decoration
    </button>
    <transition name="slide" mode="out-in">
      <div v-if="show" key="content" class="bg-white rounded-md">
        <div class="m-4 p-2">
          <p>balloons</p>
          <p>30 pieces</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
};
</script>
<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.8s ease-in-out;
}
.slide-enter, .slide-leave-to{
  transform: translateY(-100%);
}
</style>
