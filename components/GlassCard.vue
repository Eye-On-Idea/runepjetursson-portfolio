<script setup lang="ts">
import { LiquidGlass } from "@wxperia/liquid-glass-vue";

const props = defineProps<{
  displacementScale?: number;
  blurAmount?: number;
  cornerRadius?: number;
  saturation?: number;
  wrapperClass?: string | string[];
  overLight?: boolean;
}>();
</script>

<template>
  <ClientOnly>
    <LiquidGlass
      :displacement-scale="props.displacementScale ?? 40"
      :blur-amount="props.blurAmount ?? 0.06"
      :corner-radius="props.cornerRadius ?? 18"
      :saturation="props.saturation ?? 140"
      :over-light="props.overLight ?? false"
      class="block"
    >
      <div :class="wrapperClass">
        <slot />
      </div>
    </LiquidGlass>
    <template #fallback>
      <div :class="['glass-fallback', wrapperClass]">
        <slot />
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.glass-fallback {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
}
</style>
