<template>
    <AppBurgerMenu v-if="role" :isVisible="isVisible" @toggleVisibility="toggleVisibility" :roleShow="role"/>
      <div class="absolute top-0 left-0 right-0 px-8 py-6 bg-[#D5573B]">
          <div class=" text-3xl text-white flex justify-between content-center font-header">
              <p>Hey <br> {{naam}}!</p>
              <button @click="toggleVisibility">
                  <AlignJustify class="h-12 w-12 fill-white" />
              </button>
          </div>
      </div>
</template>

<script lang="ts">
    import AppBurgerMenu from '@/components/AppBurgerMenu.vue';
    import { AlignJustify } from 'lucide-vue-next';
    import { ref } from 'vue';
    import useCustomUser from '@/composables/useCustomUser';
    const isVisible = ref(false); 
    
    const { customUser } = useCustomUser()
    function toggleVisibility() {
        isVisible.value = !isVisible.value;
        // console.log("state menu", isVisible.value);
    }

    export default {
        components: { AppBurgerMenu, AlignJustify },
        props: {
            naam: {
                type: String,
                required: true,
            },
        },
        setup(props) {
            // console.log('customUser:', customUser.value?.role);
            const role = customUser.value?.role
            // console.log('role:', role);
            const naam = props.naam;
            // console.log("scream and shout",props);
            return {
                isVisible,
                toggleVisibility,
                naam,
                role
            };
        },
    };
    
  </script>