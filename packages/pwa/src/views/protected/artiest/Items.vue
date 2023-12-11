<template>
  <div
    class="mt-6 col-span-2 row-span-20 flex flex-col items-center overflow-hidden relative"
  >
    <!-- Render the first section if benodigdheden is available -->
    <div v-if="benodigdheden" class="flex flex-col items-center w-full mb-3 ">
      <div class="w-9/10 flex-col items-center justify-center relative">
        <button
          @click="toggleShow('benodigdheden')"
          class="p-2 w-full rounded border-1 flex justify-between bg-slate-300 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        >
          <p>Bestelde items</p>
          <ChevronDown />
        </button>

        <transition name="slide-fade" class="border-2 rounded">
          <div
            v-if="isShow('benodigdheden')"
            class="absolute left-0 right-0 bg-slate-300"
          >
            <div v-for="item in benodigdheden" :key="item.item">
              <div class="mx-4 mt-0 p-2 flex justify-between">
                <p>{{ item.item }}</p>
                <p>{{ item.aantal }}</p>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Render the rest of the content -->
    <div
      v-if="MateriaalByCategorie"
      class="flex flex-col items-center w-full overflow-y-auto h-80%"
    >
      <div
        v-for="categorie in Object.keys(MateriaalByCategorie)"
        :key="categorie"
        class="w-9/10 flex-col items-center justify-center"
      >
        <button
          @click="toggleShow(categorie)"
          class="my-4 p-2 w-full border-slate border-2 flex justify-between rounded focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2"
        >
          <p>{{ categorie }}</p>
          <ChevronDown class="" />
        </button>

        <transition name="slide-fade">
          <div v-if="isShow(categorie)">
            <div
              v-for="item in MateriaalByCategorie[categorie]"
              :key="item.item"
            >
              <div
                v-if="item.categorie === categorie"
                class="mx-4 mt-0 p-2 flex justify-between"
              >
                <p>{{ item.item }}</p>
                <div class="flex">
                  <button @click="minusButtonClicked(item)" class="pr-6 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2">
                    <MinusIcon class="" />
                  </button>
                  <p>{{ aantal[item.item] }}</p>
                  <button @click="plusButtonClicked(item)" class="pl-6 focus:outline-none focus-visible:border-custom-orange focus-visible:ring-2 focus-visible:ring-custom-brown focus-visible:ring-2">
                    <plus-icon class="" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <button
      @click="submit"
      class="w-9/10 rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white mt-4 hover:bg-custom-brown focus:outline-none focus-visible:border-custom-orange focus-visible:bg-custom-brown focus-visible:ring-2 focus-visible:ring-custom-orange"
    >
      Bevestigen
    </button>
  </div>
</template>

<!-- ... rest of the code ... -->

<script lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ChevronDown, MinusIcon, PlusIcon } from 'lucide-vue-next'
import { GET_MATERIAAL } from '@/graphql/materiaal.query'
import { GET_Artiest_By_Uid } from '@/graphql/artiest.query'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ITEM } from '@/graphql/artiest.mutation'
import useCustomUser from '@/composables/useCustomUser'

type ShowState = { [key: string]: boolean }

const { customUser } = useCustomUser()
const uid = customUser.value?.uid

const {
  onResult: resultArtiest,
  refetch,
  result: artiest,
} = useQuery(GET_Artiest_By_Uid, { uid })

const { mutate: createItem } = useMutation(CREATE_ITEM)
const materiaalInfo = ref<any | null>(null)
// const aantal[item] = ref<number>(0)
const aantal = ref<Record<string, number>>({})
const benodigdheden = ref<any | null>(null)

interface ItemType {
  item: string
  categorie: string
  aantal: number
}

resultArtiest(result => {
  if (result.data) {
    benodigdheden.value = result.data.artiestByUid.benodigdheden
  }
})

export default {
  components: { ChevronDown, MinusIcon, PlusIcon },
  setup() {
    const showState = ref<ShowState>({})
    const { onResult } = useQuery(GET_MATERIAAL)

    const toggleShow = (category: string) => {
      showState.value[category] = !showState.value[category]
    }

    const isShow = (category: string) => {
      return showState.value[category] || false
    }

    const minusButtonClicked = (item: any) => {
      if (aantal.value[item.item] > 0) {
        aantal.value[item.item] = aantal.value[item.item] - 1
      }
    }

    const plusButtonClicked = (item: any) => {
      aantal.value[item.item] = aantal.value[item.item] + 1
    }

    const submit = () => {
      console.log('submit')
      for (const item in aantal.value) {
        const categoryItem = materiaalInfo.value.materiaal.find(
          (materiaalItem: ItemType) => materiaalItem.item === item,
        )

        const category: string | undefined = categoryItem?.categorie

        if (aantal.value[item] !== 0) {
          createItem({
            createBenodigdhedenInput: {
              item: item,
              aantal: aantal.value[item],
              categorie: category,
              deadline: '',
            },
            uid: uid,
          })
            .then(graphqlresult => {
              console.log('🎉 new item created in our database')
              refetch()
              // reset aantal
              aantal.value[item] = 0
            })
            .catch(error => {
              console.error('Error creating item:', error)
            })
        }
      }
    }

    onResult(result => {
      if (result.data) {
        materiaalInfo.value = result.data
      }
    })

    const MateriaalByCategorie = computed(() => {
      if (materiaalInfo.value) {
        const categorizedItems: { [key: string]: any[] } = {}
        materiaalInfo.value.materiaal.forEach((item: any) => {
          const category = item.categorie
          if (!categorizedItems[category]) {
            categorizedItems[category] = []
          }
          categorizedItems[category].push(item)
          aantal.value[item.item] = 0
        })
        return categorizedItems
      }
      return null
    })

    return {
      toggleShow,
      isShow,
      MateriaalByCategorie,
      materiaalInfo,
      aantal,
      minusButtonClicked,
      plusButtonClicked,
      submit,
      benodigdheden,
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
