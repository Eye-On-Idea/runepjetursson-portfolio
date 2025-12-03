<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    displacementScale?: number;
    blurAmount?: number;
    cornerRadius?: number;
    saturation?: number;
    wrapperClass?: string | string[];
    overLight?: boolean;
  }>(),
  {},
);
</script>

<template>
  <UCard
    :class="props.wrapperClass"
    :ui="{ root: '', body: 'p-0', header: 'p-0', footer: 'p-0' }"
    :padded="false"
    role="presentation"
  >
    <slot />
  </UCard>
</template>
