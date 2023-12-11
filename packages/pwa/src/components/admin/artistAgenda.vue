<template>
  <button v-for="event in artist.agenda" :key="event.tijd" :class="calculateEventClass(event)" class="col-span-3 w-9/10 h-9/10 flex flex-col rounded-lg justify-self-center" @click="handleOpenModal(event)">
    <div class="flex flex-row justify-between w-full p-2">
    <h3 class="text-md font-bold ">{{ artist.naam }}</h3>
    <p>{{ event.tijd }}</p>
    </div>
    <p class="w-full p-2  pb-4 text-center">{{ event.taak }}</p>
  </button>
</template>

<script lang="ts">
import { Pencil } from 'lucide-vue-next';
import agendaTimes from '@/components/admin/agendaTimes.vue';
import EventPopup from '@/components/admin/eventPopup.vue';
import { computed, ref } from 'vue';

const isModalOpen = ref(false)
const selectedItem = ref<any | null>(null)


export default {
  props: {
    artist: {
      type: Object,
      default: () => [],
    },
  },
  components: {
    Pencil,
    agendaTimes,
    EventPopup
  },
  setup(props, { emit }) {
    const artist = props.artist;

    const handleOpenModal = (event: any) => {
      const newEvent = {...event, artiest: artist.uid}
      emit('open-modal', newEvent);
    
    };

    return { artist, editEvent, handleOpenModal, isModalOpen, selectedItem };
  },
  methods: {
    calculateEventClass(event: any) {
      const startTime = event.tijd.split('-')[0].trim();
      const endTime = event.tijd.split('-')[1].trim();
      const startRow = calculateRowFromTime(startTime);
      const endRow = calculateRowFromTime(endTime);
      const rowSpan = endRow - startRow + 1; // Number of rows to span

      // Set the col-start based on event.podium
      let colStart;
      let bgColor;
      let txtColor = 'text-black'
      switch (event.podium) {
        case 'Antje':
          colStart = 2;
          bgColor = 'darkGreen';
          break;
        case 'Lotte':
          colStart = 5;
          bgColor = 'purple';
          txtColor = 'text-white'
          break;
        case 'Aléssia':
          colStart = 8;
          bgColor = 'orange';
          txtColor = 'text-white'
          break;
        default:
          colStart = 2; 
      }
      let hoverColor;
      if (bgColor === 'darkGreen') hoverColor = "hover:bg-custom-lightGreen focus:bg-custom-lightGreen"
      else if (bgColor === 'purple') hoverColor = "hover:bg-[#9BA0C2] hover:text-black focus:bg-[#9BA0C2]"
      else if (bgColor === 'orange') hoverColor = "hover:bg-custom-brown focus:bg-custom-brown"
      

      return `col-start-${colStart} row-start-${startRow} row-span-${rowSpan} bg-custom-${bgColor}  ${hoverColor} ${txtColor}`;
    },
  },
};

function calculateRowFromTime(time: any) {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  // Assuming the grid starts at 08:00 and ends at 01:00 (next day)
  const gridStart = 8 * 60;
  const gridEnd = (24 + 8) * 60; // 01:00 of the next day
  let adjustedMinutes = totalMinutes - gridStart;

  // If the event spans across midnight, add 24 hours to adjustedMinutes
  if (adjustedMinutes < 0) {
    adjustedMinutes += 24 * 60;
  }

  // Ensure the adjustedMinutes is within the grid range
  const clampedMinutes = Math.max(0, Math.min(adjustedMinutes, gridEnd - gridStart));

  // Calculate the row based on 15-minute intervals
  return Math.floor(clampedMinutes / 15) + 1;
}

const editEvent = (event: any) => {
  console.log('Edit event:', event);
};


</script>
