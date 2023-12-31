<template>
  <div
    class="bg-white shadow-md p-4 rounded-2xl col-span-2 h-fit mx-4 row-start-5"
    v-if="takenInfo"
  >
    <div class="flex flex-col items-start">
      <h1 class="font-bold text-xl">{{ $t('taken.alle.open.taken') }}</h1>
      <h2 class="font-bold text-sm text-gray-600">{{ $t('taken.claim') }}</h2>
    </div>
    <div class="mt-3" v-for="taken in takenInfo">
      <div class="grid grid-cols-5 gap-y-3 grid-rows-1" v-for="taak in taken">
        <div class="flex items-center col-span-4">
          <button
            @click="ClaimTaak(taak.id)"
            :id="taak.id"
            class="px-3 py-1 text-white my-2 mx-2 rounded w-fit focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
            :class="{
              'bg-custom-orange': taak.status === false,
              'hover:bg-custom-brown': taak.status === false,
              'bg-gray-400': taak.status === true,
            }"
            :disabled="taak.status === true"
          >
            Claim
          </button>
          <label :for="taak.id">{{ taak.naam }}</label>
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
import { UPDATE_STATUS } from '@/graphql/taak.mutation'
import { GET_PERSONEEL_BY_UID } from '@/graphql/personeel.query'
import { ADD_TAAK } from '@/graphql/personeel.mutation'
import useCustomUser from '@/composables/useCustomUser'
import { useMutation } from '@vue/apollo-composable'

const takenInfo = ref<any | null>(null)
let refetchFunction: any = null
export default {
  setup() {
    const { customUser } = useCustomUser()
    // console.log('customUser: ', customUser.value?.uid)

    const { onResult: personeelResult } = useQuery(GET_PERSONEEL_BY_UID, {
      uid: customUser.value?.uid,
    })

    personeelResult(result => {
      if (result.data) {
        // console.log('personeelResult: ', result.data.personeelByUid.type)
        const type = result.data.personeelByUid.type
        const { onResult, refetch } = useQuery(GET_TAAK_BY_TYPE, {
          type,
        })
        refetchFunction = refetch

        onResult(result => {
          if (result.data) {
            // console.log('TYPE: ', type)
            takenInfo.value = result.data
            // console.log('takenInfo: ', takenInfo.value)
          }
        })
      }
    })

    const ClaimTaak = (taakId: string) => {
      // console.log('claim deze taak: ', taakId)
      // voeg deze taak toe aan de taken van personeel
      const { mutate: addTaak } = useMutation(ADD_TAAK)
      addTaak({
        taakId: taakId,
        uid: customUser.value?.uid,
      })
      // console.log('taak geclaimd')

      // update de status van deze taak naar true dat die geclaimd is
      const { mutate: updateTaak } = useMutation(UPDATE_STATUS)
      updateTaak({
        id: taakId,
        status: true,
      })
      // console.log('taak geupdate')
      refetchFunction()
    }

    return {
      ClaimTaak,
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
