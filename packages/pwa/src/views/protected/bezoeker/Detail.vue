<template>
  <div>Event: {{ eventId }}</div>
  <Camera />
  <div>test</div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { Camera } from 'lucide-vue-next'

export default {
  components: {
    Camera,
  },
  setup() {
    const { params } = useRoute()

    console.log('*')
    console.log(params)

    return {
      eventId: params.eventId,
    }
  },
}
</script>
