<template>
    <div class="block fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
        <div class="h-1/2 w-7/8 bg-white rounded-md flex items-center justify-center relative">
            <button @click="closeModal" class="absolute top-[-1rem] right-[-0.5rem] flex flex-row justify-end bg-[#D5573B] rounded-lg h-12 w-12 flex justify-center items-center"><X class="h-10 w-10 stroke-white"/> </button>
            <img :src="qrcode" alt="QR Code" class="w-full"/>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next';
import { useQRCode } from '@vueuse/integrations/useQRCode'

const text = ref('text-to-encode')
const qrcode = useQRCode(text)

export default {
    components: {
        X
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        }
    },
    setup(props) {
        
        text.value = props.id
        return {
            qrcode,
            text
        }
    }
}

</script>