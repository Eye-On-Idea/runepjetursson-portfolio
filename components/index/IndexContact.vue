<script setup lang="ts">
const props = defineProps<{
  contactCta: {
    heading: string;
    body: string;
    preferred_collaborations: string[];
  };
}>();

const { t } = useI18n();
const { variant, animationPresets } = useAccessibleMotion();

// Section animation
const sectionVariant = variant(animationPresets.scaleIn);
</script>

<template>
  <section id="contact" class="pb-12 md:pb-20">
    <div
      v-motion
      :initial="sectionVariant.initial"
      :visible="sectionVariant.visible"
    >
    <GlassCard
      :displacement-scale="56"
      :blur-amount="0.09"
      :corner-radius="32"
      wrapper-class="relative overflow-hidden p-10 lg:p-16 rounded-4xl bg-linear-to-br from-brand-500/20 via-accent-500/15 to-brand-400/20 border border-white/20 shadow-2xl space-y-8"
    >
      <div
        class="absolute inset-0 bg-linear-to-br from-brand-500/10 via-transparent to-accent-500/10 pointer-events-none"
      ></div>

      <header class="relative space-y-6">
        <div class="inline-block">
          <p
            class="text-sm font-bold text-brand-200 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-white/10 border border-white/20"
          >
            {{ t("portfolio.sections.contact.title") }}
          </p>
        </div>
        <h2
          class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-3xl"
        >
          {{ props.contactCta.heading }}
        </h2>
        <p
          class="text-xl md:text-2xl text-neutral-100 leading-relaxed max-w-2xl"
        >
          {{ props.contactCta.body }}
        </p>
      </header>

      <div
        class="relative grid md:grid-cols-2 gap-8 lg:gap-12 text-neutral-100"
      >
        <section class="space-y-4" aria-label="Preferred collaborations">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-sparkles" class="w-6 h-6 text-brand-300" />
            <p class="text-lg font-bold text-white">
              {{ t("portfolio.sections.contact.preferred") }}
            </p>
          </div>
          <ul class="space-y-3 list-none p-0">
            <li
              v-for="item in props.contactCta.preferred_collaborations"
              :key="item"
              class="flex gap-3 items-start"
            >
              <UIcon
                name="i-lucide-check-circle"
                class="w-5 h-5 text-brand-300 shrink-0 mt-0.5"
              />
              <span class="text-base">{{ item }}</span>
            </li>
          </ul>
        </section>
        <section class="space-y-5" aria-label="Contact methods">
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-mail" class="w-6 h-6 text-brand-300" />
            <p class="text-lg font-bold text-white">
              {{ t("portfolio.sections.contact.contactInfo") }}
            </p>
          </div>
          <ul class="space-y-4 list-none p-0">
            <li>
              <a
                href="mailto:hello@runepjetursson.com"
                class="group flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all smooth-hover"
              >
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-brand-300" />
                <span class="text-white font-bold"
                  >hello@runepjetursson.com</span
                >
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/rune-m-p-pjetursson-361870115/"
                target="_blank"
                rel="noopener"
                class="group flex items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all smooth-hover"
              >
                <UIcon
                  name="i-lucide-linkedin"
                  class="w-5 h-5 text-brand-300"
                />
                <span class="text-white font-bold">LinkedIn</span>
                <UIcon
                  name="i-lucide-external-link"
                  class="w-4 h-4 text-neutral-300 ml-auto group-hover:translate-x-1 transition-transform"
                />
              </a>
            </li>
          </ul>
        </section>
      </div>

      <nav
        class="relative flex flex-wrap gap-4 pt-6"
        aria-label="Contact actions"
      >
        <NuxtLink
          to="/contact"
          class="group px-8 py-4 rounded-xl bg-white text-brand-700 font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            {{ t("portfolio.sections.contact.ctaPrimary") }}
            <UIcon
              name="i-lucide-arrow-right"
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </NuxtLink>
        <NuxtLink
          to="/cases"
          class="px-8 py-4 rounded-xl border-2 border-white/40 text-white font-bold hover:bg-white/15 hover:border-white/60 hover:-translate-y-1 transition-all duration-300"
        >
          {{ t("portfolio.sections.contact.ctaSecondary") }}
        </NuxtLink>
      </nav>
    </GlassCard>
    </div>
  </section>
</template>
