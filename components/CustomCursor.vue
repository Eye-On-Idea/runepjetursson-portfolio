<script setup lang="ts">
const { cursorX, cursorY, isHovering, prefersReducedMotion } = useCursorFollow();

// Detect mobile/touch devices
const isMobile = ref(false);

onMounted(() => {
  // Check if device has touch capability or is mobile
  isMobile.value =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(max-width: 1024px)').matches;
});

// Show cursor only on desktop with no reduced motion preference
const showCursor = computed(() => !prefersReducedMotion.value && !isMobile.value);
</script>

<template>
  <!-- Only render on desktop with motion enabled -->
  <div v-if="showCursor" class="custom-cursor-wrapper">
    <!-- Main cursor dot -->
    <div
      class="custom-cursor-dot"
      :style="{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }"
      :class="{ 'cursor-hovering': isHovering }"
    ></div>

    <!-- Cursor ring (follows with delay) -->
    <div
      class="custom-cursor-ring"
      :style="{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }"
      :class="{ 'cursor-hovering': isHovering }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}

.custom-cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--color-brand-400);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
  transform-origin: center;
  margin-left: -4px;
  margin-top: -4px;
}

.custom-cursor-dot.cursor-hovering {
  width: 16px;
  height: 16px;
  margin-left: -8px;
  margin-top: -8px;
  background: var(--color-accent-400);
}

.custom-cursor-ring {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-brand-300);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.5;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease, border-color 0.3s ease;
  transform-origin: center;
  margin-left: -16px;
  margin-top: -16px;
}

.custom-cursor-ring.cursor-hovering {
  width: 48px;
  height: 48px;
  margin-left: -24px;
  margin-top: -24px;
  opacity: 0.8;
  border-color: var(--color-accent-300);
}

/* Hide default cursor on interactive elements */
:global(body.custom-cursor-active) {
  cursor: none;
}

:global(body.custom-cursor-active a),
:global(body.custom-cursor-active button),
:global(body.custom-cursor-active .cursor-interactive) {
  cursor: none;
}
</style>
