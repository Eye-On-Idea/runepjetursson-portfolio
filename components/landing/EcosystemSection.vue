<!-- components/landing/EcosystemSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Card {
  icon: string;
  iconBorderColor: string;
  title: string;
  description: string;
}

interface Props {
  sectionId: string;
  title: string;
  gradient: string;
  darkGradient: string;
  cards: Card[];
  features: string[];
}

defineProps<Props>();
const { observeElement } = useScrollAnimation()

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (sectionRef.value) {
    observeElement(sectionRef.value)
  }
})
</script>

<template>
  <section
    :id="sectionId"
    class="relative"
    :aria-labelledby="`${sectionId}-title`"
  >
    <div ref="sectionRef" data-scroll-animate>
    <!-- Section Header -->
    <header class="text-center mb-16">
      <h2
        :id="`${sectionId}-title`"
        class="text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-brand-50 mb-4"
      >
        {{ title }}
      </h2>
      <div
        class="w-24 h-1.5 mx-auto rounded-full bg-linear-to-r"
        :class="[gradient, darkGradient]"
        aria-hidden="true"
      />
    </header>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" role="list">
      <LandingEcosystemCard
        v-for="(card, idx) in cards"
        :key="idx"
        :icon="card.icon"
        :icon-border-color="card.iconBorderColor"
        :title="card.title"
        :description="card.description"
        :gradient="gradient"
        :dark-gradient="darkGradient"
        role="listitem"
      />
    </div>

    <!-- Key Features Panel -->
    <aside
      :aria-labelledby="`${sectionId}-features-title`"
      class="relative p-8 md:p-12 bg-white/40 dark:bg-white/3 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-white/10 overflow-hidden"
    >
      <!-- Background decoration -->
      <div class="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          class="absolute w-96 h-96 -top-48 -right-48 rounded-full blur-3xl bg-linear-to-br"
          :class="[gradient, darkGradient]"
        />
        <div
          class="absolute w-96 h-96 -bottom-48 -left-48 rounded-full blur-3xl bg-linear-to-br"
          :class="[gradient, darkGradient]"
        />
      </div>

      <div class="relative z-10">
        <h3
          :id="`${sectionId}-features-title`"
          class="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-brand-50 mb-8 flex items-center gap-3"
        >
          <span
            class="i-lucide-sparkles h-7 w-7 text-brand-500"
            aria-hidden="true"
          />
          Fokusområder
        </h3>

        <ul class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <li
            v-for="(feature, idx) in features"
            :key="idx"
            class="flex items-start gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/5 transition-all duration-200 hover:bg-white/50 dark:hover:bg-white/10"
          >
            <div class="shrink-0 mt-1" aria-hidden="true">
              <div
                class="flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-br"
                :class="[gradient, darkGradient]"
              >
                <span
                  class="i-lucide-check h-4 w-4 text-white"
                />
              </div>
            </div>
            <p
              class="text-sm md:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed"
            >
              {{ feature }}
            </p>
          </li>
        </ul>
      </div>
    </aside>
    </div>
  </section>
</template>
