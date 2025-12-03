<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Image gallery"
        @click="handleBackdropClick"
        @keydown.escape="closeModal"
        @keydown.left="previousImage"
        @keydown.right="nextImage"
        @keydown.home="goToFirst"
        @keydown.end="goToLast"
      >
        <!-- Modal Container -->
        <div class="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-8 flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4 text-white">
            <!-- Image Counter -->
            <div class="text-sm md:text-base font-medium">
              <span class="text-zinc-400">{{ currentIndex + 1 }}</span>
              <span class="text-zinc-600 mx-1">/</span>
              <span class="text-zinc-400">{{ images.length }}</span>
            </div>

            <!-- Close Button -->
            <button
              type="button"
              class="p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close gallery"
              @click="closeModal"
            >
              <UIcon name="i-lucide-x" class="w-6 h-6" />
            </button>
          </div>

          <!-- Image Container -->
          <div class="flex-1 flex items-center justify-center relative overflow-hidden rounded-xl" @click.stop>
            <!-- Previous Button -->
            <button
              v-if="images.length > 1"
              type="button"
              class="absolute left-2 md:left-4 z-10 p-2 md:p-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Previous image"
              :disabled="currentIndex === 0"
              @click="previousImage"
            >
              <UIcon name="i-lucide-chevron-left" class="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            <!-- Image Display -->
            <TransitionGroup
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition-all duration-200 ease-in absolute inset-0"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
              mode="out-in"
            >
              <div
                v-for="(image, index) in [images[currentIndex]]"
                :key="index"
                class="flex items-center justify-center max-w-full max-h-full"
              >
                <img
                  :src="image"
                  :alt="`${title} - Image ${currentIndex + 1} of ${images.length}`"
                  class="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  @load="handleImageLoad"
                />
              </div>
            </TransitionGroup>

            <!-- Next Button -->
            <button
              v-if="images.length > 1"
              type="button"
              class="absolute right-2 md:right-4 z-10 p-2 md:p-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Next image"
              :disabled="currentIndex === images.length - 1"
              @click="nextImage"
            >
              <UIcon name="i-lucide-chevron-right" class="w-6 h-6 md:w-8 md:h-8 text-white" />
            </button>

            <!-- Loading Indicator -->
            <div
              v-if="isLoading"
              class="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
            >
              <UIcon name="i-lucide-loader-2" class="w-8 h-8 text-white animate-spin" />
            </div>
          </div>

          <!-- Navigation Dots -->
          <div v-if="images.length > 1" class="flex items-center justify-center gap-2 mt-4 md:mt-6">
            <button
              v-for="(image, index) in images"
              :key="index"
              type="button"
              class="group relative p-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
              :aria-label="`Go to image ${index + 1}`"
              :aria-current="currentIndex === index ? 'true' : 'false'"
              @click="goToImage(index)"
            >
              <span
                :class="[
                  'block rounded-full transition-all',
                  currentIndex === index
                    ? 'w-8 md:w-10 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 group-hover:bg-white/60 group-hover:scale-125'
                ]"
              />
            </button>
          </div>

          <!-- Keyboard Shortcuts Hint -->
          <div class="hidden md:flex items-center justify-center gap-4 mt-4 text-xs text-zinc-400">
            <span class="flex items-center gap-1">
              <kbd class="px-2 py-1 rounded bg-white/10 text-white font-mono">←</kbd>
              <kbd class="px-2 py-1 rounded bg-white/10 text-white font-mono">→</kbd>
              Navigate
            </span>
            <span class="flex items-center gap-1">
              <kbd class="px-2 py-1 rounded bg-white/10 text-white font-mono">ESC</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  title: string
  isOpen: boolean
  initialIndex?: number
}>()

const emit = defineEmits<{
  close: []
  indexChange: [number]
}>()

const currentIndex = ref(props.initialIndex ?? 0)
const isLoading = ref(false)

// Watch for initial index changes
watch(() => props.initialIndex, (newIndex) => {
  if (newIndex !== undefined) {
    currentIndex.value = newIndex
  }
})

// Watch for open state to reset body scroll
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Navigation functions
const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++
    emit('indexChange', currentIndex.value)
  }
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    emit('indexChange', currentIndex.value)
  }
}

const goToImage = (index: number) => {
  currentIndex.value = index
  emit('indexChange', index)
}

const goToFirst = () => {
  currentIndex.value = 0
  emit('indexChange', 0)
}

const goToLast = () => {
  currentIndex.value = props.images.length - 1
  emit('indexChange', props.images.length - 1)
}

const closeModal = () => {
  emit('close')
}

const handleBackdropClick = (event: MouseEvent) => {
  // Only close if clicking the backdrop directly
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

const handleImageLoad = () => {
  isLoading.value = false
}

// Watch for image changes to show loading state
watch(currentIndex, () => {
  isLoading.value = true
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
