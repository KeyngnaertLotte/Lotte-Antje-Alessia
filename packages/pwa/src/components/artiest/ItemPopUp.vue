<template>
  <div
    class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
      <button
        @click="closeModal"
        class="absolute top-[-1rem] right-[-0.5rem] flex flex-row bg-custom-orange rounded-lg h-12 w-12 flex justify-center items-center"
      >
        <X class="h-10 w-10 stroke-white" />
      </button>

      <div class="p-6 flex flex-col items-center justify-between">
        <h1 class="text-2xl font-body font-bold text-custom-orange my-6">
          Voeg een item toe
        </h1>
        <input
          v-model="newItemName"
          type="text"
          placeholder="Naam item"
          class="block w-full border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
        />
        <input
          v-model="newItemAantal"
          type="number"
          placeholder="Aantal"
          class="block w-full border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
        />

        <select
          v-model="newItemCategorie"
          class="w-full bg-gray-200 rounded p-2 text-xl focus:outline-none"
        >
          <option disabled value="" class="text-gray">Categorie</option>
          <option class="text-black">Drank</option>
          <option class="text-black">Eten</option>
          <option class="text-black">Geluid</option>
          <option class="text-black">Instrument</option>
          <option class="text-black">Licht</option>
          <option class="text-black">Andere</option>
        </select>

        <input
          v-model="newItemDeadline"
          type="time"
          class="block w-9/10 border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
        />

        <button
          @click="addItem"
          class="mt-6 w-full rounded-md bg-custom-orange py-2 font-body font-bold text-2xl text-white flex items-center justify-center gap-4"
        >
          Voeg toe
        </button>
        <p
          v-if="toegevoegdMessage"
          :class="[
            { 'text-black': toegevoegdMessage === 'Item toegevoegd!' },
            'text-red',
          ]"
        >
          {{ toegevoegdMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMutation } from '@vue/apollo-composable'
import { CREATE_ITEM } from '@/graphql/artiest.mutation'
import useCustomUser from '@/composables/useCustomUser'
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

const { mutate: createItem } = useMutation(CREATE_ITEM)
const newItemName = ref('')
const newItemAantal = ref('')
const newItemCategorie = ref('')
const newItemDeadline = ref('')
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
    console.log(newItemDeadline.value)
    const addItem = () => {
      if (newItemName.value && newItemAantal.value && newItemCategorie.value) {
        showAddItemPopup.value = false

        // console.log(newItemDeadline.value)
        // console.log(typeof newItemDeadline.value)
        createItem({
          createBenodigdhedenInput: {
            item: newItemName.value.toLocaleLowerCase(),
            aantal: +newItemAantal.value,
            categorie: newItemCategorie.value,
            deadline: newItemDeadline.value,
          },
          uid: uid,
        })
          .then(graphqlresult => {
            // console.log('🎉 new item created in our database')
            // console.log(graphqlresult)
            toegevoegdMessage.value = 'Item toegevoegd!'

            newItemName.value = ''
            newItemAantal.value = ''
            newItemCategorie.value = ''
            newItemDeadline.value = ''
          })
          .catch(error => {
            console.error('Error creating item:', error)
            toegevoegdMessage.value = error.message
          })
      }
    }

    text.value = props.id
    return {
      text,
      newItemName,
      newItemCategorie,
      newItemAantal,
      newItemDeadline,
      addItem,
      toegevoegdMessage,
    }
  },
}
</script>
