<script setup lang="ts">
import { computed } from 'vue'
import { usePreferredReducedMotion } from '@vueuse/core'

defineProps<{
  colors?: string[] // Array of gradient colors
  speed?: number // Animation speed multiplier
  opacity?: number
}>();

const reducedMotionPreference = usePreferredReducedMotion()
const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')
</script>

<template>
  <div
    v-if="!prefersReducedMotion"
    class="gradient-mesh fixed inset-0 pointer-events-none overflow-hidden"
    :style="{ opacity: opacity || 0.15, zIndex: 0 }"
  >
    <!-- Animated gradient blobs -->
    <div
      class="gradient-blob gradient-blob-1"
      :style="{
        '--gradient-color-1': colors?.[0] || 'var(--color-brand-500)',
        '--gradient-color-2': colors?.[1] || 'var(--color-accent-500)',
        animationDuration: `${(speed || 1) * 20}s`,
      }"
    ></div>
    <div
      class="gradient-blob gradient-blob-2"
      :style="{
        '--gradient-color-1': colors?.[1] || 'var(--color-accent-500)',
        '--gradient-color-2': colors?.[2] || 'var(--color-brand-400)',
        animationDuration: `${(speed || 1) * 25}s`,
      }"
    ></div>
    <div
      class="gradient-blob gradient-blob-3"
      :style="{
        '--gradient-color-1': colors?.[2] || 'var(--color-brand-400)',
        '--gradient-color-2': colors?.[0] || 'var(--color-brand-500)',
        animationDuration: `${(speed || 1) * 30}s`,
      }"
    ></div>
  </div>
</template>

<style scoped>
.gradient-mesh {
  filter: blur(80px);
}

.gradient-blob {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--gradient-color-1) 0%,
    var(--gradient-color-2) 50%,
    transparent 100%
  );
  opacity: 0.6;
  animation: float-blob linear infinite;
}

.gradient-blob-1 {
  width: 60vw;
  height: 60vw;
  top: -20%;
  left: -10%;
}

.gradient-blob-2 {
  width: 50vw;
  height: 50vw;
  bottom: -15%;
  right: -10%;
  animation-delay: -5s;
}

.gradient-blob-3 {
  width: 55vw;
  height: 55vw;
  top: 40%;
  left: 30%;
  animation-delay: -10s;
}

@keyframes float-blob {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(10%, -10%) scale(1.1);
  }
  50% {
    transform: translate(-5%, 10%) scale(0.9);
  }
  75% {
    transform: translate(-10%, -5%) scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gradient-blob {
    animation: none;
  }
}
</style>
