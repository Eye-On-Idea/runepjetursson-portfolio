<script lang="ts" setup>
const colorMode = useColorMode();

// Force dark mode
onMounted(() => {
  colorMode.preference = "dark";
});
</script>

<template>
  <div class="default-layout min-h-screen text-default flex flex-col">
    <MyHeader />
    <main class="flex-1">
      <slot />
    </main>
    <MyFooter />
  </div>
</template>

<style></style>
