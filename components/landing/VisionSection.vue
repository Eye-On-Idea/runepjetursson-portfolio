<!-- components/landing/VisionSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { t } = useI18n()
const { observeElement } = useScrollAnimation()

const visionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (visionRef.value) {
    observeElement(visionRef.value)
  }
})
</script>

<template>
  <section
    id="vision"
    class="relative py-24 px-6 md:px-12 overflow-hidden bg-white dark:bg-zinc-900"
    aria-labelledby="vision-title"
  >
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-5" aria-hidden="true">
      <div class="absolute w-full h-full bg-linear-to-br from-brand-500 via-accent-500 to-purple-500 blur-3xl" />
    </div>

    <div ref="visionRef" class="relative max-w-7xl mx-auto" data-scroll-animate>
      <!-- Header -->
      <header class="text-center mb-16">
        <div class="inline-block px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-500/20 mb-6" role="status" aria-label="Section label">
          <span class="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider">
            {{ t('landing.vision.badge') }}
          </span>
        </div>
        <h2 id="vision-title" class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-brand-50 mb-6">
          {{ t('landing.vision.title') }}
        </h2>
        <p class="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-4xl mx-auto leading-relaxed">
          {{ t('landing.vision.subtitle') }}
        </p>
      </header>

      <!-- Vision Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" role="list">
        <!-- Modular Ecosystem -->
        <article class="group relative p-8 bg-linear-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl" role="listitem">
          <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 mb-6 shadow-lg" aria-hidden="true">
            <span class="i-lucide-puzzle h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-zinc-900 dark:text-brand-50 mb-4">
            {{ t('landing.vision.cards.modular.title') }}
          </h3>
          <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {{ t('landing.vision.cards.modular.description') }}
          </p>
        </article>

        <!-- Data-Driven -->
        <article class="group relative p-8 bg-linear-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl" role="listitem">
          <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-accent-500 to-accent-600 dark:from-accent-600 dark:to-accent-700 mb-6 shadow-lg" aria-hidden="true">
            <span class="i-lucide-brain h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-zinc-900 dark:text-brand-50 mb-4">
            {{ t('landing.vision.cards.dataDriven.title') }}
          </h3>
          <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {{ t('landing.vision.cards.dataDriven.description') }}
          </p>
        </article>

        <!-- Community Powered -->
        <article class="group relative p-8 bg-linear-to-br from-white/50 to-white/30 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl" role="listitem">
          <div class="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 mb-6 shadow-lg" aria-hidden="true">
            <span class="i-lucide-users h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold text-zinc-900 dark:text-brand-50 mb-4">
            {{ t('landing.vision.cards.community.title') }}
          </h3>
          <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {{ t('landing.vision.cards.community.description') }}
          </p>
        </article>
      </div>

      <!-- Main Vision Statement -->
      <aside class="relative p-12 md:p-16 bg-linear-to-br from-brand-500/10 to-accent-500/10 dark:from-brand-500/20 dark:to-accent-500/20 backdrop-blur-xl rounded-3xl border border-brand-500/20 dark:border-brand-400/20 overflow-hidden" aria-label="Vision statement">
        <div class="absolute inset-0 opacity-10" aria-hidden="true">
          <div class="absolute w-96 h-96 -top-48 -right-48 rounded-full blur-3xl bg-linear-to-br from-brand-500 to-accent-500" />
          <div class="absolute w-96 h-96 -bottom-48 -left-48 rounded-full blur-3xl bg-linear-to-br from-accent-500 to-purple-500" />
        </div>

        <div class="relative z-10 text-center">
          <p class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-brand-50 mb-6 leading-relaxed">
            {{ t('landing.vision.statement.line1') }}
          </p>
          <p class="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto">
            {{ t('landing.vision.statement.line2') }}
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>
