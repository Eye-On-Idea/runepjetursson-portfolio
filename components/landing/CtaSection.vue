<!-- components/landing/CtaSection.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { t } = useI18n()
const { observeElement } = useScrollAnimation()

const ctaRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (ctaRef.value) {
    observeElement(ctaRef.value)
  }
})
</script>

<template>
  <section
    id="cta"
    class="py-24 px-6 md:px-12"
    aria-labelledby="cta-title"
  >
    <div ref="ctaRef" class="max-w-4xl mx-auto text-center" data-scroll-animate>
      <div
        class="relative p-12 md:p-16 bg-linear-to-br from-brand-500/10 to-accent-500/10 dark:from-brand-500/20 dark:to-accent-500/20 backdrop-blur-xl rounded-3xl border border-brand-500/20 dark:border-brand-400/20 overflow-hidden"
      >
        <!-- Background decoration -->
        <div class="absolute inset-0 opacity-10" aria-hidden="true">
          <div
            class="absolute w-full h-full bg-linear-to-br from-brand-500 to-accent-500 blur-3xl"
          />
        </div>

        <div class="relative z-10">
          <h2
            id="cta-title"
            class="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-brand-50 mb-4"
          >
            {{ t("landing.cta.title") }}
          </h2>
          <p
            class="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto"
          >
            {{ t("landing.cta.description") }}
          </p>
          <UButton
            to="/contact"
            size="xl"
            color="primary"
            class="px-8 py-4 text-lg font-semibold shadow-xl"
            :aria-label="t('landing.cta.button') + ' - ' + t('landing.cta.description')"
          >
            {{ t("landing.cta.button") }}
            <template #trailing>
              <span class="i-lucide-arrow-right h-5 w-5" aria-hidden="true" />
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
