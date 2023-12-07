<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { QrCode, X } from 'lucide-vue-next'
import { QrcodeStream } from 'vue-qrcode-reader'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  value: {
    type: String,
  },
  isPopup: {
    type: Boolean,
    default: false,
  },
})

const router = useRouter()
const emits = defineEmits()

// Example for paintOutline function
const paintOutline = (detectedCodes: any, ctx: any) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)

    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }

    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}

// Example for paintBoundingBox function
const paintBoundingBox = (detectedCodes: any, ctx: any) => {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'

    ctx.strokeRect(x, y, width, height)
  }
}

// Example for paintCenterText function
const paintCenterText = (detectedCodes: any, ctx: any) => {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}

const options = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox },
]
const selected = options[1]
const logErrors = console.error

// wanneer er op de button geklikt wordt, wordt de scanner geopend
const handleClick = () => {
  console.log('click')
  const qrcodeStream = document.getElementById('qrcode-stream')

  if (qrcodeStream) {
    // Trigger the QR code scanning
    qrcodeStream.click()
  }
}

// wanneer er op de button geklikt wordt, wordt de scanner geopend
const isScannerActive = ref(false)

const handleClickQR = () => {
  console.log('click - QR')
  // Toggle the visibility of the qrcode-stream
  isScannerActive.value = !isScannerActive.value

  // Clear the input value when the scanner is closed
  if (!isScannerActive.value) {
    inputValue.value = '';
  }

  const qrcodeStream = document.getElementById('qrcode-stream')

  if (qrcodeStream) {
    // Trigger the QR code scanning
    qrcodeStream.click()
  }
}

// eerst controle of bedrag is ingevuld
const inputValue = ref('')
const isQrCodeStreamVisible = computed(() => {
  return !!inputValue.value; // Show if inputValue is not empty
});
</script>

<template>
  <div class="rounded-md m-5 flex flex-col items-center justify-center shadow-md bg-custom-blue">
    <button
      class="rounded-md m-5 flex flex-col items-center justify-center text-white"
      @click="handleClickQR"
    >
      <div>
        <p class="font-bold text-2xl self-start font-body px-3">Scanner</p>
        <div class="flex justify-center items-center my-2">
          <QrCode class="w-12 h-12" />
        </div>
      </div>
    </button>

    <div
      v-if="isScannerActive === true"
      class="fixed z-1 left-0 top-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="h-1/2 w-7/8 bg-white rounded-md flex justify-center relative">
        <button
          @click="handleClickQR"
          class="absolute top-[-1rem] right-[-0.5rem] flex flex-row bg-[#D5573B] rounded-lg h-12 w-12 justify-center items-center"
        >
          <X class="h-10 w-10 stroke-white" />
        </button>
        <div class="flex flex-col justify-start items-center h-full w-full">
          <h1 class="text-3xl font-body font-bold text-custom-orange my-6">
            Scan een QR-code
          </h1>
          <p class="flex self-start pl-4">Geef het bedrag in</p>
          <input
            v-model="inputValue"
            type="number"
            max="100"
            min="0"
            class="block font-pop w-[90%] border-b-2 border-custom-darkGreen p-1 focus:outline-none focus:border-b-4 focus:border-custom-darkGreen text-xl"
          />
          <qrcode-stream
            v-show="isQrCodeStreamVisible"
            :track="selected.value"
            @error="logErrors"
            class="p-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>
