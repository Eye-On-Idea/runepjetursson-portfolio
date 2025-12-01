<!-- components/landing/EcosystemCard.vue -->
<script setup lang="ts">
interface Props {
  icon: string;
  iconBorderColor: string;
  title: string;
  description: string;
  gradient: string;
  darkGradient: string;
}

defineProps<Props>();
</script>

<template>
  <article
    class="group relative p-8 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-white/40 dark:hover:border-white/20"
  >
    <!-- Hover gradient overlay -->
    <div
      class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-linear-to-br"
      :class="[gradient, darkGradient]"
      aria-hidden="true"
    />

    <!-- Content -->
    <div class="relative z-10">
      <!-- Icon with thick outlined square -->
      <div class="mb-6">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl border-[3px] transition-transform duration-300 group-hover:scale-110 ring-2"
          :class="iconBorderColor"
          aria-hidden="true"
        >
          <Icon :name="icon" class="w-10 h-10" />
        </div>
      </div>

      <!-- Text -->
      <h3 class="text-xl font-bold text-zinc-900 dark:text-brand-50 mb-3">
        {{ title }}
      </h3>
      <p class="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {{ description }}
      </p>
    </div>

    <!-- Decorative corner accent -->
    <div
      class="absolute top-0 right-0 w-20 h-20 rounded-bl-2xl opacity-10 bg-linear-to-br transition-opacity duration-300 group-hover:opacity-20"
      :class="[gradient, darkGradient]"
      aria-hidden="true"
    />
  </article>
</template>
