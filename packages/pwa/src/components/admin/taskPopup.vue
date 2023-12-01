<template>
    <div class="w-[70%] h-[70%] bg-white">
        <p>aaaaaaaaaaaaaaaaaaa</p>
    </div>
</template>

<script lang="ts">
    export default {
        setup(props, {emit}) {
            const closeModal = () => {
                emit('close-modal')
            }
            
            return {
                closeModal,
            }
        }
    }
</script>