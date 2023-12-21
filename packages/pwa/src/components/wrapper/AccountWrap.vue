<template>
  <div
    :class="[
      'max-h-screen',
      'grid',
      'grid-cols-2',
      'grid-rows-24',
      'h-screen',
      'font-pop',
      `${bgColorClass}`,
    ]"
  >
    <div class="col-span-2 row-span-3">
      <AppHeader v-if="userName" :naam="userName" />
    </div>
    <RouterView />
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import useCustomUser from '@/composables/useCustomUser'

const { customUser } = useCustomUser()
var userName = customUser.value?.naam

console.log('userName:', customUser.value)

export default {
  components: {
    AppHeader,
  },
  setup() {
    userName = customUser.value?.naam
    return {
      userName,
    }
  },

  computed: {
    bgColorClass() {
      const routeSegment = this.$route.path.split('/')[2]
      return routeSegment === 'lineup' ? 'bg-primary' : 'bg-secondary'
    },
  },
}
</script>
