<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { X, PlusCircle } from 'lucide-vue-next'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ITEM } from '@/graphql/artiest.mutation'

const { mutate: createItem } = useMutation(CREATE_ITEM)

const newItemName = ref('')
const newItemAantal = ref('')
const newItemCategorie = ref('')

const showAddItemPopup = ref(false)

const openAddItemPopup = () => {
  showAddItemPopup.value = true
}

const closeAddItemPopup = () => {
  showAddItemPopup.value = false
}

import useCustomUser from '@/composables/useCustomUser'

const { customUser } = useCustomUser()
const uid = customUser.value?.uid

const addItem = () => {
  if (newItemName.value && newItemAantal.value && newItemCategorie.value) {
    const newItem = {
      naam: newItemName.value,
      aantal: newItemAantal.value,
      categorie: newItemCategorie.value,
    }
    // newItemName.value = ''
    // newItemAantal.value = ''
    // newItemCategorie.value = ''
    showAddItemPopup.value = false

    const instance = getCurrentInstance()
    if (instance) {
      instance.emit('Item-added', newItem)
    }

    // addItem({
    //   createItemInput: {
    //     naam: newItemName.value,
    //     aantal: newItemAantal.value,
    //     categorie: newItemCategorie.value,
    //   },
    // })

    createItem({
      createBenodigdhedenInput: {
        item: newItemName.value.toLocaleLowerCase(),
        aantal: +newItemAantal.value,
        categorie: newItemCategorie.value,
      },
      uid: uid,
    }).then(graphqlresult => {
      console.log('🎉 new item created in our database')
      console.log(graphqlresult)
    })
}
}
</script>

<template>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-xl">item</h1>
      <button @click="openAddItemPopup">
        <PlusCircle class="stroke-custom-blue" />
      </button>
    </div>
    <div
      v-if="showAddItemPopup"
      class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <div class="flex justify-between mb-4 items-center">
          <h2 class="text-xl font-semibold">Add Item</h2>
          <button
            @click="closeAddItemPopup"
            class="bg-gray-300 text-gray-700 px-2 py-1 rounded hover-bg-gray-400"
          >
            <X/>
          </button>
        </div>
        <input
          v-model="newItemName"
          type="text"
          placeholder="Item Name"
          class="w-full px-3 py-2 border border-gray-300 rounded mb-4"
        />
        <!-- <input
          v-model="newItemCategorie"
          type="text"
          placeholder="Categorie"
          class="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          /> -->

        <select v-model="newItemCategorie" class="w-full px-3 py-2 border border-gray-300 rounded mb-4" >
          <option disabled value="">Categorie </option>
          <option>Drank</option>
          <option>Eten</option>
          <option>Geluid</option>
          <option>Instrument</option>
          <option>Licht</option>
          <option>andere</option>
        </select>
        <input
          v-model="newItemAantal"
          type="number"
          placeholder="Aantal"
          class="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          />  
        <div class="flex justify-end">
          <button
            @click="addItem"
            class="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 mr-2"
          >
            Add
          </button>
          <!-- <button
            @click="closeAddItemPopup"
            class="bg-gray-300 text-gray-700 px-4 py-2 rounded hover-bg-gray-400"
          >
            Close
          </button> -->
        </div>
      </div>
    </div>
</template>
