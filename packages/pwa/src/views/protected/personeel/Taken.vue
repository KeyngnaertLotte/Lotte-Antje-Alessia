<template>
  <div
    class="bg-white shadow-md p-4 rounded-2xl col-span-2 h-fit mx-4"
    v-if="takenInfo"
  >
    <div class="flex flex-col items-start">
      <h1 class="font-bold text-xl">{{ $t('taken.alle.open.taken') }}</h1>
      <h2 class="font-bold text-sm text-gray-600">{{ $t('taken.claim') }}</h2>
    </div>
    <div class="mt-3" v-for="taken in takenInfo">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-1" v-for="taak in taken">
        <div class="flex items-center col-span-4">
          <input
            type="checkbox"
            class="form-checkbox accent-custom-green h-5 w-5 mr-3"
            id="checkbox"
          />
          <label for="checkbox">{{ taak.naam }}</label>
        </div>
        <p class="text-end col-span-1 self-center">{{ taak.deadline }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { GET_TAAK_BY_TYPE } from '@/graphql/taak.query'
type ShowState = { [key: string]: boolean }

const takenInfo = ref<any | null>(null)

export default {
  setup() {
    const showState = ref<ShowState>({})
    const { onResult } = useQuery(GET_TAAK_BY_TYPE, {
      type: 'Podium - licht (Aléssia)',
    })

    const toggleShow = (category: string) => {
      showState.value[category] = !showState.value[category]
    }

    const isShow = (category: string) => {
      return showState.value[category] || false
    }

    onResult(result => {
      if (result.data) {
        takenInfo.value = result.data
        console.log('takenInfo: ', takenInfo.value)
      }
    })

    return {
      toggleShow,
      isShow,
      takenInfo,
    }
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
