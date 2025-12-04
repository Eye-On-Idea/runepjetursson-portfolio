<script setup lang="ts">
const props = defineProps<{
  maxTilt?: number
  scale?: number
  glare?: boolean
}>();

const { cardRef, cardStyle, glareStyle } = useCardTilt({
  maxTilt: props.maxTilt || 8,
  scale: props.scale || 1.03,
  glare: props.glare !== false,
});
</script>

<template>
  <div ref="cardRef" class="tilt-card-wrapper" :style="cardStyle">
    <!-- Content slot -->
    <slot />

    <!-- Glare overlay -->
    <div v-if="glare !== false" class="tilt-card-glare" :style="glareStyle"></div>
  </div>
</template>

<style scoped>
.tilt-card-wrapper {
  position: relative;
  transform-style: preserve-3d;
}

.tilt-card-glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  z-index: 1;
}

/* Ensure child content has proper z-index */
.tilt-card-wrapper > :not(.tilt-card-glare) {
  position: relative;
  z-index: 2;
}
</style>
