<script lang="ts" setup>
const colorMode = useColorMode();

// Force dark mode
onMounted(() => {
  colorMode.preference = "dark";
});
</script>

<template>
  <div class="default-layout min-h-screen text-default flex flex-col">
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-brand-500 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
    >
      Skip to main content
    </a>
    <MyHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <MyFooter />
  </div>
</template>

<style></style>
