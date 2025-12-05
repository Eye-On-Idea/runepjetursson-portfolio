<script lang="ts" setup>
const colorMode = useColorMode();

// Force dark mode
onMounted(() => {
  colorMode.preference = "dark";

  // Add class to body for custom cursor (only on desktop)
  if (typeof window !== 'undefined') {
    const isMobile =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 1024px)').matches;

    if (!isMobile) {
      document.body.classList.add('custom-cursor-active');
    }
  }
});

onUnmounted(() => {
  // Clean up cursor class
  if (typeof window !== 'undefined') {
    document.body.classList.remove('custom-cursor-active');
  }
});
</script>

<template>
  <div class="default-layout min-h-screen text-default flex flex-col relative">
    <!-- Background Effects -->
    <GradientMesh :opacity="0.12" :speed="0.8" />

    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
    >
      Skip to main content
    </a>
    <MyHeader />
    <main id="main-content" class="flex-1">
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
        duration: 300
      }" />
    </main>
    <MyFooter />

    <!-- Custom Cursor -->
    <CustomCursor />

    <!-- Global Loading Overlay -->
    <GlobalLoadingOverlay />
  </div>
</template>

<style></style>
