<template>
    Event: {{ eventId }}
</template>

<script lang="ts">
import {useRoute} from 'vue-router'


export default {
    setup() {
        const { params } = useRoute()
        
        console.log('*')
        console.log(params)

        return {
            eventId: params.eventId
        }
    },
}
</script>
