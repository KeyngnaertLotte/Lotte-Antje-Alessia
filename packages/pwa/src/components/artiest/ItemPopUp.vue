<script lang="ts">
// import { ref, getCurrentInstance } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ITEM } from '@/graphql/artiest.mutation'
import useCustomUser from '@/composables/useCustomUser'
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

const { mutate: createItem } = useMutation(CREATE_ITEM)
const newItemName = ref('')
const newItemAantal = ref('')
const newItemCategorie = ref('')
const showAddItemPopup = ref(false)
const { customUser } = useCustomUser()
const uid = customUser.value?.uid
const text = ref('text-to-encode')

const toegevoegdMessage = ref('')

export default {
  components: {
    X,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
  },
  setup(props) {
    const addItem = () => {
      if (newItemName.value && newItemAantal.value && newItemCategorie.value) {
        const newItem = {
          naam: newItemName.value,
          aantal: newItemAantal.value,
          categorie: newItemCategorie.value,
        }
        showAddItemPopup.value = false

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
          // Update the message after the item is added
          toegevoegdMessage.value = 'Item toegevoegd!'

          // You can also reset the input fields if needed
          newItemName.value = ''
          newItemAantal.value = ''
          newItemCategorie.value = ''
        })
      }
    }

    text.value = props.id
    return {
      text,
      newItemName,
      newItemCategorie,
      newItemAantal,
      addItem,
      toegevoegdMessage,
    }
  },
}
</script>

<!-- <template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="h-1/2 w-7/8 pl-8  bg-white rounded-md flex flex-col justify-center relative"
    >
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-start items-start"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>
      <div class="mb-4 ">
        <h1>Voeg een item toe dat je nodig hebt</h1>
      </div>
      <div class="px-3 py-2 border border-gray-300 rounded mb-4 mr-8">
        <input v-model="newItemName" type="text" placeholder="Item Name" />
      </div>
      <div class="px-3 py-2 border border-gray-300 rounded mb-4 mr-8">
        <input v-model="newItemAantal" type="number" placeholder="Aantal" />
      </div>
      <div class="px-3 py-2 pr-24 border border-gray-300 rounded mb-4 mr-8">
        <select v-model="newItemCategorie" class="text-gray" >
          <option disabled value="" class="text-gray">Categorie</option>
          <option class="text-black">Drank</option>
          <option class="text-black">Eten</option>
          <option class="text-black">Geluid</option>
          <option class="text-black">Instrument</option>
          <option class="text-black">Licht</option>
          <option class="text-black">Andere</option>
        </select>
      </div>

      <div class="flex justify-end mr-6">
        <button
          @click="addItem"
          class="bg-blue-500 text-white px-4 py-2 rounded hover-bg-blue-600 mr-2"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div
      class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative"
    >
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row  bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>

      <div class="p-6 flex flex-col  items-center justify-between">
        <h1 class="text-2xl font-body font-bold text-custom-orange my-6 ">Voeg een item toe</h1>
        <input
          v-model="newItemName"
          type="text"
          placeholder="Item Name"
          class="block font-pop w-full border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
        />
        <input
          v-model="newItemAantal"
          type="number"
          placeholder="Aantal"
          class="block font-pop w-full border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
        />
        <select v-model="newItemCategorie" class="w-full border-b-2 border-custom-darkGreen font-pop p-1 text-xl focus:border-b-4 focus:border-custom-darkGreen  focus:outline-none">
          <option disabled value="" class="text-gray">Categorie</option>
          <option class="text-black">Drank</option>
          <option class="text-black">Eten</option>
          <option class="text-black">Geluid</option>
          <option class="text-black">Instrument</option>
          <option class="text-black">Licht</option>
          <option class="text-black">Andere</option>
        </select>

        <button
          @click="addItem"
          class="mt-6 w-2/5 rounded-md bg-custom-orange py-2 font-body font-bold text-2xl text-white flex items-center justify-center gap-4"
        >
          Add
        </button>
      </div>
        
      <div class="flex justify-end mr-6">
        <p v-if="toegevoegdMessage" >
          {{ toegevoegdMessage }}
        </p>
      </div>
    </div>
  </div>
</template>
