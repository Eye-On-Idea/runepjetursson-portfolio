<script setup lang="ts">
const props = defineProps<{
  value: number
  duration?: number
  decimals?: number
  suffix?: string
  prefix?: string
  easing?: 'linear' | 'easeOut' | 'easeInOut'
  label?: string
  description?: string
}>();

const { targetRef, formattedValue } = useScrollTriggeredCounter(props.value, {
  duration: props.duration || 2000,
  decimals: props.decimals || 0,
  suffix: props.suffix || '',
  prefix: props.prefix || '',
  easing: props.easing || 'easeOut',
  threshold: 0.5,
});
</script>

<template>
  <div
    ref="targetRef"
    class="animated-counter flex flex-col items-center text-center"
  >
    <div class="counter-value text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-brand-300 to-accent-400">
      {{ formattedValue }}
    </div>
    <div v-if="label" class="counter-label text-xl md:text-2xl font-bold text-white mt-2">
      {{ label }}
    </div>
    <div v-if="description" class="counter-description text-sm md:text-base text-neutral-300 mt-1 max-w-xs">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.counter-value {
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
</style>
