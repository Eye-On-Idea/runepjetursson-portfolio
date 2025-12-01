<script setup lang="ts">
const props = defineProps<{
  valueBlocks: Array<
    | { title: string; body: string; icon: string }
    | { title: string; list: string[]; icon: string }
  >;
  approach: string;
}>();

const { t } = useI18n();
</script>

<template>
  <section id="values" class="section-spacing">
    <header class="space-y-4 mb-12 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
      <div class="inline-block">
        <p class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">
          {{ t("portfolio.sections.values") }}
        </p>
      </div>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
        {{ t("portfolio.sections.values") }}
      </h2>
    </header>
    <ul class="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8 list-none p-0">
      <li v-for="block in props.valueBlocks" :key="block.title" class="h-full">
        <GlassCard
          :displacement-scale="28"
          :blur-amount="0.05"
          :corner-radius="18"
          wrapper-class="group p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 h-full glass-card-hover"
        >
          <article class="space-y-4 h-full">
            <header class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0">
                <UIcon :name="block.icon" class="w-5 h-5 text-brand-300" />
              </div>
              <h3 class="text-lg font-bold text-white">{{ block.title }}</h3>
            </header>
            <p v-if="'body' in block" class="text-neutral-200 leading-relaxed text-base">{{ block.body }}</p>
            <ul v-else class="space-y-2 text-neutral-200 text-base list-none p-0">
              <li v-for="item in block.list" :key="item" class="flex gap-3 items-start">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </GlassCard>
      </li>
    </ul>
    <GlassCard
      :displacement-scale="32"
      :blur-amount="0.06"
      :corner-radius="18"
      wrapper-class="p-8 lg:p-10 rounded-2xl bg-white/5 border border-white/10 space-y-4 glass-card-hover"
    >
      <article class="space-y-4">
        <header class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-lightbulb" class="w-5 h-5 text-brand-300" />
          </div>
          <h3 class="text-lg font-bold text-white">{{ t("portfolio.valuesLabels.approach") }}</h3>
        </header>
        <p class="text-neutral-200 leading-relaxed text-base lg:text-lg">{{ props.approach }}</p>
      </article>
    </GlassCard>
  </section>
</template>
