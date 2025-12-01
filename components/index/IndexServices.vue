<script setup lang="ts">
const props = defineProps<{
  services: Array<{
    id: string | number;
    title: string;
    description: string;
    keywords?: string[];
  }>;
}>();

const { t } = useI18n();
</script>

<template>
  <section id="services" class="section-spacing">
    <header class="space-y-4 mb-12 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
      <div class="inline-block">
        <p class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">
          {{ t("portfolio.sections.services.title") }}
        </p>
      </div>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
        {{ t("portfolio.sections.services.title") }}
      </h2>
      <p class="text-lg md:text-xl text-neutral-300 leading-relaxed">
        {{ t("portfolio.sections.services.subtitle") }}
      </p>
    </header>
    <ul class="grid md:grid-cols-2 gap-6 lg:gap-8 list-none p-0">
      <li v-for="service in props.services" :key="service.id" class="h-full">
        <GlassCard
          :displacement-scale="48"
          :blur-amount="0.08"
          :corner-radius="20"
          wrapper-class="group p-8 rounded-2xl bg-white/5 border border-white/10 h-full space-y-5 glass-card-hover"
        >
          <article class="space-y-5 h-full">
            <header class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-sparkles" class="w-6 h-6 text-brand-300" />
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {{ service.title }}
                </h3>
              </div>
            </header>
            <p class="text-neutral-200 leading-relaxed text-base">{{ service.description }}</p>
            <ul class="flex flex-wrap gap-2 pt-2 list-none p-0">
              <li v-for="keyword in service.keywords || []" :key="keyword">
                <UBadge color="primary" variant="soft" class="font-semibold text-xs px-3 py-1">
                  {{ keyword }}
                </UBadge>
              </li>
            </ul>
          </article>
        </GlassCard>
      </li>
    </ul>
  </section>
</template>
