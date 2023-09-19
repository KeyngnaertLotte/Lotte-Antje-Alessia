<template>
    <div class="not-found">
        <h1>404</h1>
        <p>Page not found</p>
        <p>Ooops 😅</p>
        <p v-if="visible">extra info niet zichtbaar</p>
        <p v-else>dit zie je wel met v-else</p>
        <p>{{ visible }}</p>

        <button @click="visible = !visible">Toggle</button>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
    // Vue3 composition API
    setup(){
        const visible = ref<boolean>(false)
        
        return {
            visible,
        }
    }

    // useEffect(() => {
    //  //
    // })
};
</script>


<style>

</style>

