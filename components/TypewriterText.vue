<script setup lang="ts">
const props = defineProps<{
  text: string
  delay?: number
  speed?: number
  cursor?: boolean
  autoStart?: boolean
}>();

const { displayText, startTyping } = useTypewriter(props.text, {
  delay: props.delay || 0,
  speed: props.speed || 100,
  cursor: props.cursor !== false,
});

onMounted(() => {
  if (props.autoStart !== false) {
    startTyping()
  }
})

defineExpose({ startTyping })
</script>

<template>
  <span class="typewriter-text">{{ displayText }}</span>
</template>

<style scoped>
.typewriter-text {
  font-variant-numeric: tabular-nums;
}

/* Blinking cursor animation */
.typewriter-text::after {
  animation: blink 1s infinite;
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
  .typewriter-text::after {
    animation: none;
  }
}
</style>
