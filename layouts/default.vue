<script lang="ts" setup>
const colorMode = useColorMode();

// Force dark mode
onMounted(() => {
  colorMode.preference = 'dark';
});
</script>

<template>
  <div
    class="default-layout min-h-screen bg-default text-default flex flex-col"
  >
    <MyHeader />
    <main class="flex-1 bg-default">
      <slot />
    </main>
    <MyFooter />
  </div>
</template>

<style></style>
