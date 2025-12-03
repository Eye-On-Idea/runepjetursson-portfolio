<script setup lang="ts">
const props = defineProps<{
  personal: {
    company_freelance: string;
    location: string;
    title_secondary: string;
    full_name: string;
    title_primary: string;
  };
  headline: {
    short: string;
    tagline: string;
  };
  profileShort: string;
  stats: { label: string; value: string }[];
  focusChips: string[];
}>();

const { t } = useI18n();
</script>

<template>
  <section
    id="hero"
    class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-8 md:pt-12"
  >
    <header class="space-y-7 lg:space-y-8">
      <p
        class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/15 bg-white/6 backdrop-blur-sm smooth-hover"
      >
        <span class="text-sm font-bold text-neutral-50">{{
          props.personal.company_freelance
        }}</span>
        <span class="text-neutral-400" aria-hidden="true">&bull;</span>
        <span class="text-sm font-medium text-neutral-200">{{
          props.personal.location
        }}</span>
      </p>
      <div class="space-y-4">
        <p
          class="text-base md:text-lg text-accent-300 font-bold uppercase tracking-wide"
        >
          {{ props.personal.title_secondary }}
        </p>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-white bg-clip-text"
        >
          {{ props.personal.full_name }}
        </h1>
        <p
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-300 leading-tight"
        >
          {{ props.personal.title_primary }}
        </p>
      </div>
      <p class="text-lg md:text-xl text-neutral-200 leading-relaxed max-w-2xl">
        {{ props.headline.short }}
      </p>
      <p class="text-base md:text-lg text-neutral-300 leading-relaxed max-w-xl">
        {{ props.headline.tagline }}
      </p>
      <nav
        aria-label="Primary calls to action"
        class="flex flex-wrap gap-4 pt-4"
      >
        <NuxtLink
          to="/contact"
          class="group px-6 py-3.5 rounded-xl bg-brand-500 text-neutral-900 font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            {{ t("portfolio.hero.ctaPrimary") }}
            <UIcon
              name="i-lucide-arrow-right"
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </NuxtLink>
        <NuxtLink
          to="#projects"
          class="px-6 py-3.5 rounded-xl border-2 border-white/20 text-neutral-100 font-bold hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          {{ t("portfolio.hero.ctaSecondary") }}
        </NuxtLink>
      </nav>
      <ul class="flex flex-wrap gap-2.5 pt-2 list-none p-0">
        <li v-for="chip in props.focusChips" :key="chip">
          <UBadge
            color="primary"
            variant="soft"
            class="font-bold text-sm px-3 py-1.5"
          >
            {{ chip }}
          </UBadge>
        </li>
      </ul>
    </header>

    <!-- INSERT IMAGE HERE -->
    <div class="rightside">
      <GlassCard
        className="p-2 rounded-full bg-linear-to-br from-brand-500/20 to-accent-500/20 w-fit"
      >
        <img
          src="/assets/img/rune-kontor.png"
          alt="Image of Rune Pjetursson sitting contemplating work at his desk"
        />
      </GlassCard>

      <!-- <GlassCard>
        <div class="flex flex-row relative">
          <div class="left"></div>
        </div>
      </GlassCard> -->
    </div>
  </section>
</template>

<style lang="scss" scoped>
@media (max-width: 1030px) {
  .rightside {
    display: none;
  }
}
</style>
