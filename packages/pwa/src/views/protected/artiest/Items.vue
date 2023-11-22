<template>
  <div class="mt-8 col-span-2 row-span-20 flex flex-col items-center">
    <div v-if="MateriaalByCategorie" class="flex flex-col items-center w-full">
      <div
      
        v-for="categorie in Object.keys(MateriaalByCategorie)"
        :key="categorie"
        class="w-[90%] flex-col items-center justify-center"
      >
        <button
          @click="toggleShow(categorie)"
          class="my-4 p-2 w-full border-custom-brown border-1 flex justify-between"
        >
          <p>{{ categorie }}</p>
          <ChevronDown class="stroke-custom-brown" />
        </button>

        <transition name="slide-fade">
          <div v-if="isShow(categorie)">
            <div
              v-for="item in MateriaalByCategorie[categorie]"
              :key="item.item"
            >
              <div
                v-if="item.categorie === categorie"
                class="mx-4 mt-0 p-2 flex justify-between "
              >
                <p>{{ item.item }}</p>
                <button @click="minusButtonClicked(item)">
                  <MinusIcon class="stroke-custom-brown" />
                </button>
                <p>{{ aantal[item.item] }}</p>
                <button @click="plusButtonClicked(item)">
                  <plus-icon class="stroke-custom-brown" />
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <button
      @click="submit"
      class="w-[90%] rounded-md bg-custom-orange py-2 px-4 font-body font-bold text-2xl text-white mt-4"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { ChevronDown, MinusIcon, PlusIcon } from 'lucide-vue-next'
import { GET_MATERIAAL } from '@/graphql/materiaal.query'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ITEM } from '@/graphql/artiest.mutation'
import useCustomUser from '@/composables/useCustomUser'

type ShowState = { [key: string]: boolean }

const { customUser } = useCustomUser()
const uid = customUser.value?.uid

const { mutate: createItem } = useMutation(CREATE_ITEM)
const materiaalInfo = ref<any | null>(null)
// const aantal[item] = ref<number>(0)
const aantal = ref<Record<string, number>>({})

interface ItemType {
  item: string
  categorie: string
  aantal: number
}

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
      console.log(item, aantal)
      aantal.value[item.item] = aantal.value[item.item] - 1
    }

    const plusButtonClicked = (item: any) => {
      console.log(item, aantal)
      aantal.value[item.item] = aantal.value[item.item] + 1
    }

    const submit = () => {
      console.log('submit')
      console.log(aantal)
      console.log(aantal.value)
      // for (const item in aantal.value) {
      //   console.log(item)
      //   console.log(aantal.value[item])
      //   createItem({
      //     createBenodigdhedenInput: {
      //       item: item,
      //       aantal: aantal.value[item],
      //       categorie: ,
      //       deadline: newItemDeadline.value,
      //     },
      //     uid: uid,
      //   })
      //     .then(graphqlresult => {
      //       console.log('🎉 new item created in our database')
      //       console.log(graphqlresult)
      //     })
      //     .catch(error => {
      //       console.error('Error creating item:', error)
      //     })
      // }

      for (const item in aantal.value) {
        console.log(item)
        console.log(aantal.value[item])

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
              console.log(graphqlresult)
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
        console.log('categorizedItems: ', categorizedItems)
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
