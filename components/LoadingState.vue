<script setup lang="ts">
const { variant, animationPresets } = useAccessibleMotion();

defineProps<{
  type?: 'spinner' | 'pulse' | 'dots' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}>();

const spinnerVariant = variant({
  initial: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 300, ease: 'easeOut' } }
});
</script>

<template>
  <div
    class="loading-state flex flex-col items-center justify-center gap-4"
    v-motion
    :initial="spinnerVariant.initial"
    :visible="spinnerVariant.visible"
  >
    <!-- Spinner Type -->
    <div
      v-if="type === 'spinner' || !type"
      :class="[
        'loading-spinner border-4 border-white/20 border-t-brand-400 rounded-full animate-spin',
        size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'
      ]"
    ></div>

    <!-- Pulse Type -->
    <div
      v-else-if="type === 'pulse'"
      :class="[
        'loading-pulse bg-brand-400 rounded-full animate-pulse',
        size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12'
      ]"
    ></div>

    <!-- Dots Type -->
    <div
      v-else-if="type === 'dots'"
      :class="[
        'loading-dots flex gap-2',
        size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-3' : 'gap-2'
      ]"
    >
      <div
        v-for="i in 3"
        :key="i"
        :class="[
          'bg-brand-400 rounded-full animate-bounce',
          size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'
        ]"
        :style="{
          animationDelay: `${i * 150}ms`,
          animationDuration: '1s'
        }"
      ></div>
    </div>

    <!-- Skeleton Type -->
    <div
      v-else-if="type === 'skeleton'"
      class="loading-skeleton space-y-3 w-full max-w-md"
    >
      <div
        v-for="i in 3"
        :key="i"
        :class="[
          'skeleton rounded-xl',
          size === 'sm' ? 'h-4' : size === 'lg' ? 'h-8' : 'h-6'
        ]"
        :style="{ width: `${100 - i * 15}%` }"
      ></div>
    </div>

    <!-- Loading Message -->
    <p
      v-if="message"
      class="text-neutral-300 text-sm font-medium animate-pulse"
    >
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

/* Stagger animation for dots */
@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
}
</style>
