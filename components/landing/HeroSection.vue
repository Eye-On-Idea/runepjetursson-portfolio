<!-- components/landing/HeroSection.vue -->
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <section
    id="hero"
    class="relative py-24 px-6 md:px-12 overflow-hidden"
    aria-labelledby="hero-title"
  >
    <!-- Background decorative elements -->
    <div class="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
      <div
        class="absolute w-[500px] h-[500px] -top-[250px] -right-[250px] rounded-full blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(234, 176, 0, 0.15) 0%,
            transparent 70%
          );
        "
      />
      <div
        class="absolute w-[400px] h-[400px] -bottom-[200px] -left-[200px] rounded-full blur-3xl"
        style="
          background: radial-gradient(
            circle,
            rgba(45, 162, 255, 0.15) 0%,
            transparent 70%
          );
        "
      />
    </div>

    <div class="max-w-7xl mx-auto text-center relative z-10">
      <!-- Logo -->
      <div class="mb-8 flex justify-center">
        <div
          class="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-[24px] border-2 border-white/20 dark:border-white/10 shadow-2xl transition-transform duration-300 hover:scale-105"
          aria-hidden="true"
        >
          <img
            src="/assets/logo/logosvg_sunrise.svg"
            alt="Rune Pjetursson"
            class="w-16 h-16 md:w-20 md:h-20 p-1"
          />
        </div>
      </div>

      <!-- Badge -->
      <div
        class="mb-6 inline-block px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 backdrop-blur-sm rounded-full border border-brand-500/20"
        role="status"
        aria-label="Product status"
      >
        <span class="text-sm font-semibold text-brand-700 dark:text-brand-300">
          {{ t("landing.hero.badge") }}
        </span>
      </div>

      <!-- Title -->
      <h1
        id="hero-title"
        class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-brand-50 mb-6"
      >
        {{ t("landing.hero.title") }}
        <span
          class="text-transparent bg-clip-text bg-linear-to-r from-brand-500 to-accent-500"
        >
          {{ t("landing.hero.brandName") }}
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        class="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto"
      >
        {{ t("landing.hero.subtitle") }}
      </p>
    </div>
  </section>
</template>
