<script setup lang="ts">
const props = defineProps<{
  titles: string[]
  speed?: number // Typing speed in ms per character
  pauseDuration?: number // Pause before switching to next title
  deleteSpeed?: number // Deletion speed in ms per character
}>();

const {
  speed = 80,
  pauseDuration = 2000,
  deleteSpeed = 40
} = props;

const displayText = ref('');
const currentTitleIndex = ref(0);
const isDeleting = ref(false);
const isPaused = ref(false);

const { prefersReducedMotion } = useAccessibleMotion();

let timeoutId: ReturnType<typeof setTimeout> | null = null;

const typewriterEffect = () => {
  // If reduced motion, just show the first title
  if (prefersReducedMotion.value) {
    displayText.value = props.titles[0];
    return;
  }

  const currentTitle = props.titles[currentTitleIndex.value];

  if (isPaused.value) {
    // Wait during pause
    timeoutId = setTimeout(() => {
      isPaused.value = false;
      isDeleting.value = true;
      typewriterEffect();
    }, pauseDuration);
    return;
  }

  if (isDeleting.value) {
    // Deleting characters
    if (displayText.value.length > 0) {
      displayText.value = displayText.value.slice(0, -1);
      timeoutId = setTimeout(typewriterEffect, deleteSpeed);
    } else {
      // Move to next title
      isDeleting.value = false;
      currentTitleIndex.value = (currentTitleIndex.value + 1) % props.titles.length;
      timeoutId = setTimeout(typewriterEffect, 500); // Brief pause before typing next
    }
  } else {
    // Typing characters
    if (displayText.value.length < currentTitle.length) {
      displayText.value = currentTitle.slice(0, displayText.value.length + 1);
      timeoutId = setTimeout(typewriterEffect, speed);
    } else {
      // Finished typing, pause before deleting
      isPaused.value = true;
      typewriterEffect();
    }
  }
};

onMounted(() => {
  // Start typing after a brief delay
  setTimeout(() => {
    typewriterEffect();
  }, 500);
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
