<template>
    <div class="row-span-full col-span-2 p-6 bg-white rounded-lg shadow-md col-start-6">
      <h1 class="text-2xl font-bold font-body">Stuur melding</h1>
      <div class="flex flex-col justify-start h-full gap-4 mt-2">
          <div class="">
            <p class="">Het bericht is voor:</p>
          <div class="flex flex-row w-full items-center justify-around">
          <div>
            <input
              type="checkbox"
              id="all"
              name="all"
              value="all"
              class="mr-2"
              @click="disableOthers"
              v-model="allChecked"
              :disabled="isAllDisabled"
            />
            <label for="all">Iedereen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="visitors"
              name="visitors"
              value="visitors"
              class="mr-2"
              :disabled="allChecked"
              v-model="visitorsChecked"
            />
            <label for="visitors">Bezoekers</label>
          </div>
        </div>
        <div class="flex flex-row w-full items-center justify-around">
          <div>
            <input
              type="checkbox"
              id="artists"
              name="artists"
              value="artists"
              class="mr-2"
              :disabled="allChecked"
              v-model="artistsChecked"
            />
            <label for="artists">Artiesten</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="personel"
              name="personel"
              value="personel"
              class="mr-2"
              :disabled="allChecked"
              v-model="personeelChecked"
            />
            <label for="personel">Personeel</label>
          </div>
        </div>
          </div>
        <textarea
          placeholder="Typ hier je mededeling"
          v-model="messageContent"
          cols="50"
          rows="3"
          class="w-full block font-pop border-2 rounded-md p-1 focus:outline-none focus:border-4 focus:border-white bg-white h-7/10"
        ></textarea>
        <button
          @click="sendMessage"
          class="py-1 bg-custom-purple text-white rounded w-1/3 self-end"
        >
          VERZEND
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, watch } from 'vue';
  import useRealtime from '@/composables/useRealtime'

    const { emit } = useRealtime()
  
  export default {
    setup() {
      const allChecked = ref(false);
      const visitorsChecked = ref(false);
      const artistsChecked = ref(false);
      const personeelChecked = ref(false);
  
      const isAllDisabled = ref(false);
      const messageContent = ref('');
  
      const disableOthers = () => {
        console.log(allChecked.value);
        if (!allChecked.value) {
          isAllDisabled.value =
            visitorsChecked.value || artistsChecked.value || personeelChecked.value;
        } 
      };
  
      const sendMessage = () => {
        console.log('send');
        console.log(messageContent.value);
        if (allChecked.value) {
          console.log('all');
          emit('adminNotification:bezoeker', messageContent.value)
            emit('adminNotification:artiest', messageContent.value)
            emit('adminNotification:personeel', messageContent.value)
        }
        if (visitorsChecked.value) {
          console.log('visitors');
          emit('adminNotification:bezoeker', messageContent.value)
        }
        if (artistsChecked.value) {
          console.log('artists');
          emit('adminNotification:artiest', messageContent.value)

        }if (personeelChecked.value) {
          console.log('personeel');
          emit('adminNotification:personeel', messageContent.value)
        }
        if (!allChecked.value && !visitorsChecked.value && !artistsChecked.value && !personeelChecked.value) {
          console.log('none');
        }
      };
  
      // Watch for changes in individual checkboxes to update the "All" checkbox state
      watch([visitorsChecked, artistsChecked, personeelChecked], () => {
        isAllDisabled.value =
          visitorsChecked.value || artistsChecked.value || personeelChecked.value;
      });
  
      return {
        allChecked,
        visitorsChecked,
        artistsChecked,
        personeelChecked,
        disableOthers,
        sendMessage,
        isAllDisabled,
        messageContent,
      };
    },
  };
  </script>
  