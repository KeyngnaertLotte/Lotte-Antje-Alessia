<template>
      <div v-for="event in artist.agenda" :key="event.tijd" :class="calculateEventClass(event)">
          <p>{{ event.tijd }}</p>
          <p>{{ event.taak }}</p>
        </div>
</template>



<script lang="ts">
import { Pencil  } from 'lucide-vue-next'
import agendaTimes from '@/components/admin/agendaTimes.vue'
import agendaLines from '@/components/admin/agendaLines.vue'


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
    agendaLines
  },
  setup(props) {
    const artist = props.artist;
    return { artist }
  },
  methods: {
    calculateEventClass(event: any) {
      const startTime = event.tijd.split('-')[0].trim();
      const endTime = event.tijd.split('-')[1].trim();
      const startRow = calculateRowFromTime(startTime);
      const endRow = calculateRowFromTime(endTime);
      const rowSpan = endRow - startRow + 1;

      // Set the col-start based on event.podium
      let colStart;
      switch (event.podium) {
        case 'Antje':
          colStart = 2;
          break;
        case 'Lotte':
          colStart = 5;
          break;
        case 'Aléssia':
          colStart = 8;
          break;
        default:
          colStart = 2; // Default to col-start-2 if the podium is not recognized
      }

      return `col-start-${colStart} row-start-${startRow} row-span-${rowSpan}`;
    },
  },
};

function calculateRowFromTime(time: any) {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  return Math.floor(totalMinutes / 30) + 1; // Add 1 because rows start from 1
}


</script>
