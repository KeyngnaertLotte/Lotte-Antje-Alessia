<template>
  <div
    class="col-span-2 row-start-5 bg-custom-purple flex justify-between mx-4 rounded-md h-[7rem] p-2"
  >
    <div class="text-white font-bold flex flex-col w-2/5 gap-2">
      <p class="font-body text-xl mx-2">{{ $t('mycoins.saldo') }}</p>
      <p
        class="font-pop text-4xl self-center"
        v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid"
      >
        € {{ bezoekerInfo.bezoekerByUid.saldo }}
      </p>
    </div>
    <button
      @click="handleModal"
      class="bg-white px-4 py-2 text-custom-purple rounded-md font-pop font-bold mx-4 self-center"
    >
      {{ $t('mycoins.voeg.toe') }}
    </button>
  </div>
  <div class="mx-4 bg-white row-start-9 p-4 rounded-md col-span-2 row-span-15">
    <p class="font-body text-xl font-bold">{{ $t('mycoins.transacties') }}</p>
    <div
      class="font-pop text-lg mt-5"
      v-if="bezoekerInfo && bezoekerInfo.bezoekerByUid"
    >
      <div
        v-for="(transactie, index) in reversedTransacties"
        :key="index"
        :class="[
          'flex',
          'justify-between',
          transactieColor(transactie.transactie),
        ]"
      >
        <p>{{ transactie.transactie }}</p>
        <p>€ {{ transactie.aantal }}</p>
      </div>
    </div>
  </div>
  <SaldoPopup
    :id="uid ?? ''"
    v-if="isModalOpen"
    @close-modal="handleCloseModal"
  />
</template>

<script lang="ts">
import useCustomUser from '@/composables/useCustomUser'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { GET_BEZOEKER_BY_UID } from '@/graphql/bezoeker.query'
import useGraphql from '../../../composables/useGraphql'
import { onMounted, ref } from 'vue'
import SaldoPopup from '@/components/bezoeker/SaldoPopup.vue'

const { customUser } = useCustomUser()
const { apolloClient } = useGraphql()
provideApolloClient(apolloClient)
const uid = customUser.value?.uid
const bezoekerInfo = ref<any | null>(null)
const isModalOpen = ref(false)

export default {
  components: {
    SaldoPopup,
  },
  setup() {
    onMounted(() => {
      getBezoekerInfo()
    })
    return {
      getBezoekerInfo,
      bezoekerInfo,
      isModalOpen,
      handleModal,
      handleCloseModal,
      uid,
    }
  },
  computed: {
    reversedTransacties() {
      if (this.bezoekerInfo && this.bezoekerInfo.bezoekerByUid) {
        // Use slice() to create a shallow copy of the array and then reverse it
        console.log(
          'transacties:',
          this.bezoekerInfo.bezoekerByUid.transacties.slice(),
        )
        return this.bezoekerInfo.bezoekerByUid.transacties.slice().reverse()
      }
      return []
    },
  },
  methods: {
    transactieColor(naam: string) {
      if (naam === 'Saldo Verhoging') {
        return 'text-custom-darkGreen'
      } else {
        return 'text-custom-orange'
      }
    },
  },
}

const handleModal = () => {
  isModalOpen.value = true
}
const handleCloseModal = () => {
  isModalOpen.value = false
}

const getBezoekerInfo = async () => {
  // console.log('uid:', uid);
  try {
    const { onResult } = useQuery(GET_BEZOEKER_BY_UID, { uid })
    onResult(result => {
      if (result.data) {
        console.log('Data:', result.data)
        bezoekerInfo.value = result.data // Update the ref with the fetched data
        // console.log('bezoekerInfo:', bezoekerInfo.value.bezoekerByUid.naam);
      }
    })
  } catch (error) {
    console.error('Error fetching bezoeker info:', error)
  }
}
</script>
