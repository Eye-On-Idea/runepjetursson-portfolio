<!-- components/landing/ValorSystemSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { t } = useI18n()
const { observeElement } = useScrollAnimation()

const valorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (valorRef.value) {
    observeElement(valorRef.value)
  }
})

const features = [
  {
    icon: 'i-lucide-zap',
    titleKey: 'landing.valorSystem.features.xp.title',
    descKey: 'landing.valorSystem.features.xp.description',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    icon: 'i-lucide-award',
    titleKey: 'landing.valorSystem.features.badges.title',
    descKey: 'landing.valorSystem.features.badges.description',
    gradient: 'from-brand-500 to-brand-600',
  },
  {
    icon: 'i-lucide-trophy',
    titleKey: 'landing.valorSystem.features.ranks.title',
    descKey: 'landing.valorSystem.features.ranks.description',
    gradient: 'from-accent-500 to-accent-600',
  },
  {
    icon: 'i-lucide-gift',
    titleKey: 'landing.valorSystem.features.rewards.title',
    descKey: 'landing.valorSystem.features.rewards.description',
    gradient: 'from-purple-500 to-indigo-600',
  },
]

const tiers = [
  { name: 'Bronze', gradient: 'from-orange-600 to-orange-700', icon: 'i-lucide-medal' },
  { name: 'Silver', gradient: 'from-zinc-400 to-zinc-500', icon: 'i-lucide-medal' },
  { name: 'Gold', gradient: 'from-yellow-500 to-yellow-600', icon: 'i-lucide-medal' },
  { name: 'Platinum', gradient: 'from-cyan-400 to-cyan-500', icon: 'i-lucide-crown' },
  { name: 'Diamond', gradient: 'from-blue-400 to-purple-500', icon: 'i-lucide-gem' },
]
</script>

<template>
  <section
    id="valor-system"
    class="relative py-24 px-6 md:px-12 overflow-hidden bg-linear-to-br from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-black"
    aria-labelledby="valor-system-title"
  >
    <!-- Animated background effects -->
    <div class="absolute inset-0 opacity-20" aria-hidden="true">
      <div class="absolute w-96 h-96 -top-48 -left-48 rounded-full blur-3xl bg-linear-to-br from-brand-500 to-accent-500 animate-pulse" />
      <div class="absolute w-96 h-96 -bottom-48 -right-48 rounded-full blur-3xl bg-linear-to-br from-purple-500 to-pink-500 animate-pulse" style="animation-delay: 1s;" />
    </div>

    <div ref="valorRef" class="relative max-w-7xl mx-auto" data-scroll-animate>
      <!-- Header -->
      <header class="text-center mb-16">
        <div class="inline-block px-4 py-2 bg-brand-500/20 dark:bg-brand-500/30 rounded-full border border-brand-500/30 mb-6" role="status" aria-label="Section label">
          <span class="text-xs font-semibold text-brand-300 uppercase tracking-wider">
            {{ t('landing.valorSystem.badge') }}
          </span>
        </div>
        <h2 id="valor-system-title" class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
          {{ t('landing.valorSystem.title') }}
        </h2>
        <p class="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto leading-relaxed">
          {{ t('landing.valorSystem.subtitle') }}
        </p>
      </header>

      <!-- Achievement Tiers Showcase -->
      <div class="mb-16">
        <h3 class="text-2xl md:text-3xl font-bold text-white text-center mb-8">
          {{ t('landing.valorSystem.tiers.title') }}
        </h3>
        <div class="flex flex-wrap justify-center gap-6" role="list" aria-label="Achievement tiers">
          <div
            v-for="tier in tiers"
            :key="tier.name"
            class="group relative flex flex-col items-center"
            role="listitem"
          >
            <div
              class="flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
              :class="tier.gradient"
              :aria-label="`${tier.name} tier badge`"
            >
              <span :class="tier.icon" class="h-10 w-10 text-white" aria-hidden="true" />
            </div>
            <span class="mt-3 text-sm font-bold text-zinc-300 uppercase tracking-wider">
              {{ tier.name }}
            </span>
          </div>
        </div>
        <p class="text-center text-zinc-400 mt-8 max-w-2xl mx-auto">
          {{ t('landing.valorSystem.tiers.description') }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" role="list" aria-label="Valor system features">
        <article
          v-for="feature in features"
          :key="feature.titleKey"
          class="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
          role="listitem"
        >
          <div
            class="flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110"
            :class="feature.gradient"
            aria-hidden="true"
          >
            <span :class="feature.icon" class="h-7 w-7 text-white" />
          </div>
          <h4 class="text-lg font-bold text-white mb-2">
            {{ t(feature.titleKey) }}
          </h4>
          <p class="text-sm text-zinc-400 leading-relaxed">
            {{ t(feature.descKey) }}
          </p>
        </article>
      </div>

      <!-- Cross-Module Integration Highlight -->
      <aside class="relative p-12 md:p-16 bg-linear-to-br from-brand-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-brand-500/20 overflow-hidden" aria-label="Integration information">
        <div class="absolute inset-0 opacity-10" aria-hidden="true">
          <div class="absolute w-96 h-96 -top-48 -right-48 rounded-full blur-3xl bg-linear-to-br from-brand-500 to-accent-500" />
          <div class="absolute w-96 h-96 -bottom-48 -left-48 rounded-full blur-3xl bg-linear-to-br from-purple-500 to-pink-500" />
        </div>

        <div class="relative z-10 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-brand-500 to-brand-600 mb-6 shadow-xl" aria-hidden="true">
            <span class="i-lucide-network h-8 w-8 text-white" />
          </div>
          <h3 class="text-2xl md:text-3xl font-bold text-white mb-6">
            {{ t('landing.valorSystem.integration.title') }}
          </h3>
          <p class="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            {{ t('landing.valorSystem.integration.description') }}
          </p>
        </div>
      </aside>
    </div>
  </section>
</template>
