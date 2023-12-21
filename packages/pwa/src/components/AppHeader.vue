<template>
  <AppBurgerMenu
    v-if="role"
    :isVisible="isVisible"
    @toggleVisibility="toggleVisibility"
    :roleShow="role"
  />
  <div class="absolute top-0 left-0 right-0 px-8 py-6 bg-custom-orange md:py-5">
    <div
      class="text-3xl text-white flex justify-between content-center font-header md:text-2xl"
    >
      <div class="flex flex-col md:flex-row">
        <p>Hey</p>
        <p class="md:pl-3">{{ naam }}!</p>
      </div>
      <button
        @click="toggleVisibility"
        class="focus:outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white"
      >
        <AlignJustify class="h-12 w-12 fill-white md:h-8 md:w-8" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import AppBurgerMenu from '@/components/AppBurgerMenu.vue'
import { AlignJustify } from 'lucide-vue-next'
import { ref } from 'vue'
import useCustomUser from '@/composables/useCustomUser'
import useRealtime from '@/composables/useRealtime'
import { useToast } from 'vue-toastification'

const { on } = useRealtime()
const isVisible = ref(false)

const { customUser } = useCustomUser()
const toast = useToast()

export default {
  components: { AppBurgerMenu, AlignJustify },
  props: {
    naam: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const role = customUser.value?.role
    let canReceiveNotification = true

    function toggleVisibility() {
      isVisible.value = !isVisible.value
    }

    on(
      'adminNotification:' + role?.toString().toLocaleLowerCase(),
      (data: any) => {
        if (canReceiveNotification) {
          // console.log('data:', data)
          toast.info(data, { timeout: 5000 })
          canReceiveNotification = false

          setTimeout(() => {
            canReceiveNotification = true
          }, 5000)
        }
      },
    )

    const naam = props.naam

    return {
      isVisible,
      toggleVisibility,
      naam,
      role,
    }
  },
}
</script>

<style>
.Vue-Toastification__toast {
  background-color: #777da7;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;
}
</style>
