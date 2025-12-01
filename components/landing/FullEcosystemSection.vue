<!-- components/landing/FullEcosystemSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { t } = useI18n()
const { observeElement } = useScrollAnimation()

const fullEcosystemRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (fullEcosystemRef.value) {
    observeElement(fullEcosystemRef.value)
  }
})

const modules = [
  {
    name: "landing.fullEcosystem.modules.coreFitness.name",
    description: "landing.fullEcosystem.modules.coreFitness.description",
    icon: "i-lucide-dumbbell",
    gradient: "from-accent-500 to-accent-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.nutrition.name",
    description: "landing.fullEcosystem.modules.nutrition.description",
    icon: "i-lucide-utensils",
    gradient: "from-green-500 to-emerald-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.whiteLabel.name",
    description: "landing.fullEcosystem.modules.whiteLabel.description",
    icon: "i-lucide-store",
    gradient: "from-blue-500 to-cyan-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.recovery.name",
    description: "landing.fullEcosystem.modules.recovery.description",
    icon: "i-lucide-heart-pulse",
    gradient: "from-purple-500 to-indigo-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.sportSpecific.name",
    description: "landing.fullEcosystem.modules.sportSpecific.description",
    icon: "i-lucide-bike",
    gradient: "from-orange-500 to-red-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.wellness.name",
    description: "landing.fullEcosystem.modules.wellness.description",
    icon: "i-lucide-sparkles",
    gradient: "from-pink-500 to-rose-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.analytics.name",
    description: "landing.fullEcosystem.modules.analytics.description",
    icon: "i-lucide-bar-chart-3",
    gradient: "from-teal-500 to-cyan-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.corporate.name",
    description: "landing.fullEcosystem.modules.corporate.description",
    icon: "i-lucide-building-2",
    gradient: "from-brand-500 to-brand-600",
    available: false,
  },
  {
    name: "landing.fullEcosystem.modules.travel.name",
    description: "landing.fullEcosystem.modules.travel.description",
    icon: "i-lucide-plane",
    gradient: "from-sky-500 to-blue-600",
    available: false,
  },
];
</script>

<template>
  <section
    id="full-ecosystem"
    class="py-24 px-6 md:px-12 bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900"
    aria-labelledby="full-ecosystem-title"
  >
    <div ref="fullEcosystemRef" class="max-w-7xl mx-auto" data-scroll-animate>
      <!-- Header -->
      <header class="text-center mb-16">
        <div
          class="inline-block px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-500/20 mb-6"
          role="status"
          aria-label="Section label"
        >
          <span
            class="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider"
          >
            {{ t("landing.fullEcosystem.badge") }}
          </span>
        </div>
        <h2
          id="full-ecosystem-title"
          class="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-brand-50 mb-6"
        >
          {{ t("landing.fullEcosystem.title") }}
        </h2>
        <p class="text-xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
          {{ t("landing.fullEcosystem.subtitle") }}
        </p>
      </header>

      <!-- Modules Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        <article
          v-for="(module, index) in modules"
          :key="index"
          class="group relative p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-xl hover:border-brand-500/30 dark:hover:border-brand-500/30"
          role="listitem"
          :aria-label="`${t(module.name)} - ${
            module.available
              ? t('landing.fullEcosystem.availableNow')
              : t('landing.fullEcosystem.comingSoon')
          }`"
        >
          <!-- Coming Soon Badge -->
          <div v-if="!module.available" class="absolute top-4 right-4">
            <span
              class="px-2 py-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800 rounded-full"
              role="status"
            >
              {{ t("landing.fullEcosystem.comingSoon") }}
            </span>
          </div>

          <!-- Available Now Badge -->
          <div v-else class="absolute top-4 right-4">
            <span
              class="px-2 py-1 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full"
              role="status"
            >
              {{ t("landing.fullEcosystem.availableNow") }}
            </span>
          </div>

          <!-- Icon -->
          <div
            class="flex items-center justify-center w-14 h-14 rounded-xl text-white mb-4 bg-linear-to-br transition-transform duration-300 group-hover:scale-110"
            :class="module.gradient"
            aria-hidden="true"
          >
            <span :class="module.icon" class="h-7 w-7" />
          </div>

          <!-- Content -->
          <h3 class="text-xl font-bold text-zinc-900 dark:text-brand-50 mb-2">
            {{ t(module.name) }}
          </h3>
          <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {{ t(module.description) }}
          </p>
        </article>
      </div>

      <!-- Bottom Note -->
      <footer class="mt-16 text-center">
        <p class="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          {{ t("landing.fullEcosystem.note") }}
        </p>
      </footer>
    </div>
  </section>
</template>
