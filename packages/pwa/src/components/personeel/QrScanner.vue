<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from 'vue'
import { useRouter } from 'vue-router'
import { QrCode, X } from 'lucide-vue-next'
// import { QrcodeStream } from 'vue-qrcode-reader'

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

  </div>
</template>
