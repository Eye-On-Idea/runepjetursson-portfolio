<script setup lang="ts">
const props = defineProps<{
  text: string
  delay?: number
  letterDelay?: number
  mode?: 'letter' | 'word'
  autoStart?: boolean
}>();

const { revealedUnits, startReveal } = useTextReveal(props.text, {
  delay: props.delay || 0,
  letterDelay: props.letterDelay || 50,
  mode: props.mode || 'letter',
});

// Auto-start animation on mount if enabled
onMounted(() => {
  if (props.autoStart !== false) {
    startReveal()
  }
})

defineExpose({ startReveal })
</script>

<template>
  <span class="reveal-text inline-block">
    <template v-if="mode === 'word'">
      <span
        v-for="(unit, index) in revealedUnits"
        :key="index"
        :class="['reveal-unit', { 'is-revealed': unit.isRevealed }]"
      >
        {{ unit.content }}{{ index < revealedUnits.length - 1 ? ' ' : '' }}
      </span>
    </template>
    <template v-else>
      <span
        v-for="(unit, index) in revealedUnits"
        :key="index"
        :class="['reveal-unit', { 'is-revealed': unit.isRevealed }]"
      >
        {{ unit.content }}
      </span>
    </template>
  </span>
</template>

<style scoped>
.reveal-text {
  font-variant-numeric: tabular-nums;
}

.reveal-unit {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) rotateX(-90deg);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.reveal-unit.is-revealed {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

/* Reduced motion fallback */
@media (prefers-reduced-motion: reduce) {
  .reveal-unit {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
