

<template>
    <div class="m-8">
      <div v-if="BenodigdhedenByCategory">
        <div v-for="category in Object.keys(BenodigdhedenByCategory)" :key="category" class="mb-6">
          <div
            @click="toggleCategory(category)"
            class="cursor-pointer text-3xl font-bold flex items-center mb-2"
          >
            <div class="flex items-center">
              <lucide-icon-chevron-down
                class="w-6 h-6 transform"
                :class="{ 'rotate-180': openCategories.includes(category) }"
              />
              <span class="ml-2">{{ category }}</span>
            </div>
          </div>
          <ul v-if="openCategories.includes(category)" class="mt-4 ml-8">
            <li
              v-for="item in BenodigdhedenByCategory[category]"
              :key="item.item"
              class="flex justify-between items-center mt-2"
            >
              <span class="text-2xl">{{ item.item.toLowerCase() }}</span>
              <span class="text-2xl">{{ item.aantal }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <p class="text-2xl font-semibold mt-8">Loading...</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, computed } from 'vue'
  import { useQuery } from '@vue/apollo-composable'
  import Container from '@/components/generic/Container.vue'
  import { GET_Artiest_By_Uid } from '@/graphql/artiest.query'
  import useCustomUser from '@/composables/useCustomUser'
  import { defineComponent } from 'vue'
  import * as LucideIcons from 'lucide-vue-next'
  
  const { customUser } = useCustomUser()
  const uid = customUser.value?.uid
  const Benodigdheden = ref<any | null>(null)
  
  export default {
    components: {
      Container,
      LucideIconChevronDown: LucideIcons.ChevronDown,
    },
    data() {
      return {
        openCategories: [] as string[], // Store open categories
      }
    },
    props: {
      BenodigdhedenByCategory: Object, // Assuming this is a prop you're passing
    },
    methods: {
      toggleCategory(category: string) {
        if (this.openCategories.includes(category)) {
          // If the category is already open, close it
          this.openCategories = this.openCategories.filter(c => c !== category)
        } else {
          // If the category is closed, open it
          this.openCategories.push(category)
        }
      },
    },
    setup() {
      const { onResult } = useQuery(GET_Artiest_By_Uid, { uid })
  
      onResult(result => {
        if (result.data) {
          Benodigdheden.value = result.data.artiestByUid.benodigdheden
        }
      })
  
      const BenodigdhedenByCategory = computed(() => {
        if (Benodigdheden.value) {
          const categorizedItems: { [key: string]: any[] } = {}
          Benodigdheden.value.forEach((item: any) => {
            const category = item.categorie
            if (!categorizedItems[category]) {
              categorizedItems[category] = []
            }
            categorizedItems[category].push(item)
          })
          return categorizedItems
        }
        return null
      })
  
      return { customUser, BenodigdhedenByCategory }
    },
  }
  </script>