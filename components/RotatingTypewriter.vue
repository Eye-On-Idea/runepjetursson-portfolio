<script setup lang="ts">
const props = defineProps<{
  titles: string[]
  speed?: number // Typing speed in ms per character
  pauseDuration?: number // Pause before switching to next title
  deleteSpeed?: number // Deletion speed in ms per character
  random?: boolean // Randomize title order
}>();

const displayText = ref('');
const isDeleting = ref(false);
const isPaused = ref(false);

const { prefersReducedMotion } = useAccessibleMotion();

// Shuffle array for random order
const shuffledTitles = ref<string[]>([]);
const currentIndex = ref(0);

let timeoutId: ReturnType<typeof setTimeout> | null = null;

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const typewriterEffect = () => {
  // If reduced motion, just show the first title
  if (prefersReducedMotion.value) {
    displayText.value = shuffledTitles.value[0] || '';
    return;
  }

  if (shuffledTitles.value.length === 0) return;

  const currentTitle = shuffledTitles.value[currentIndex.value];

  if (isPaused.value) {
    // Wait during pause
    timeoutId = setTimeout(() => {
      isPaused.value = false;
      isDeleting.value = true;
      typewriterEffect();
    }, props.pauseDuration || 2000);
    return;
  }

  if (isDeleting.value) {
    // Deleting characters
    if (displayText.value.length > 0) {
      displayText.value = displayText.value.slice(0, -1);
      timeoutId = setTimeout(typewriterEffect, props.deleteSpeed || 40);
    } else {
      // Move to next title
      isDeleting.value = false;

      // Increment index first
      currentIndex.value = currentIndex.value + 1;

      // Re-shuffle when we complete a full cycle through all titles
      if (currentIndex.value >= shuffledTitles.value.length) {
        currentIndex.value = 0;
        if (props.random !== false) {
          shuffledTitles.value = shuffleArray(props.titles);
        }
      }

      timeoutId = setTimeout(typewriterEffect, 500); // Brief pause before typing next
    }
  } else {
    // Typing characters
    if (displayText.value.length < currentTitle.length) {
      displayText.value = currentTitle.slice(0, displayText.value.length + 1);
      timeoutId = setTimeout(typewriterEffect, props.speed || 80);
    } else {
      // Finished typing, pause before deleting
      isPaused.value = true;
      typewriterEffect();
    }
  }
};

onMounted(() => {
  // Initialize shuffled titles
  shuffledTitles.value = props.random !== false
    ? shuffleArray(props.titles)
    : [...props.titles];

  // Start typing after a brief delay
  setTimeout(() => {
    typewriterEffect();
  }, 800);
});

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>

<template>
  <span class="rotating-typewriter inline-flex items-baseline">
    <span class="typewriter-text">{{ displayText }}</span>
    <span
      v-if="!prefersReducedMotion"
      class="typewriter-cursor ml-0.5"
      :class="{ 'cursor-blink': isPaused }"
    >|</span>
  </span>
</template>

<style scoped>
.typewriter-text {
  font-variant-numeric: tabular-nums;
  min-height: 1.2em; /* Prevent layout shift */
  display: inline-block;
}

.typewriter-cursor {
  font-weight: 300;
  opacity: 1;
  transition: opacity 0.1s;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none;
    opacity: 0;
  }
}
</style>
