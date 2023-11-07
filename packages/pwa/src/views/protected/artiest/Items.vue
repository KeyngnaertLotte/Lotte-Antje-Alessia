<!-- <script lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { GET_Artiest_By_Uid } from '@/graphql/artiest.query'
import useCustomUser from '@/composables/useCustomUser'

const { customUser } = useCustomUser()
const uid = customUser.value?.uid
const Benodigdheden = ref<any | null>(null)

// function sortItemsByCategory(items: any) {
//   const categories = [
//     'Drank',
//     'Eten',
//     'Geluid',
//     'Instrument',
//     'Licht',
//     'Andere',
//   ]
//   const sortedItems: any[] = []

//   // Initialize an empty object for each category
//   const categoryMap: any = {}
//   categories.forEach(category => {
//     categoryMap[category] = { categorie: category, items: [] }
//   })

//   // Sort the items into their respective categories
//   items.forEach((item: any) => {
//     if (categories.includes(item.categorie)) {
//       categoryMap[item.categorie].items.push({
//         naam: item.naam,
//         aantal: item.aantal,
//       })
//     }
//   })

//   // Convert the category objects into an array and return
//   categories.forEach(category => {
//     sortedItems.push(categoryMap[category])
//   })

//   return sortedItems
// }

export default {
  components: {
    Container,
  },
  setup() {
    const getBezoekerInfo = async () => {
      console.log('uid:', uid)
      try {
        const { onResult } = await useQuery(GET_Artiest_By_Uid, { uid })
        onResult(result => {
          if (result.data) {
            console.log('Data:', result.data.artiestByUid.benodigdheden)
            Benodigdheden.value = result.data.artiestByUid.benodigdheden
            console.log('Items:', Benodigdheden.value)
          }
        })
      } catch (error) {
        console.error('Error fetching bezoeker info:', error)
      }
    }

    getBezoekerInfo()

    console.log('Items:', Benodigdheden)

    return { customUser, Benodigdheden }
  },
}
</script>

<template></template> -->

<template>
  <div>
    <div class="m-8" v-if="BenodigdhedenByCategory">
      <div
        class="mt-4"
        v-for="category in Object.keys(BenodigdhedenByCategory)"
        :key="category"
      >
        <h2 class="text-3xl font-bold">{{ category }}</h2>
        <ul class="mt-4">
          <li
            v-for="item in BenodigdhedenByCategory[category]"
            :key="item.item"
            class="flex justify-between mt-1"
          >
            <span class="text-2xl">{{ item.item.toLocaleLowerCase() }}</span>
            <span class="text-2xl">{{ item.aantal }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { GET_Artiest_By_Uid } from '@/graphql/artiest.query'
import useCustomUser from '@/composables/useCustomUser'

const { customUser } = useCustomUser()
const uid = customUser.value?.uid
const Benodigdheden = ref<any | null>(null)

export default {
  components: {
    Container,
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
