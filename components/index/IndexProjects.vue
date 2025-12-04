<script setup lang="ts">
const props = defineProps<{
  projects: Array<{
    name: string;
    role: string;
    type: string;
    summary: string;
    contributions: string[];
  }>;
}>();

const { t } = useI18n();
const { variant, animationPresets } = useAccessibleMotion();

// Project card animation
const projectVariant = variant(animationPresets.fadeInUpScale);
</script>

<template>
  <section id="projects" class="section-spacing">
    <header class="space-y-4 mb-12 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
      <div class="inline-block">
        <p class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">
          {{ t("portfolio.sections.projects") }}
        </p>
      </div>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
        {{ t("portfolio.sections.projects") }}
      </h2>
    </header>
    <ol class="space-y-8 list-none p-0">
      <li
        v-for="(project, index) in props.projects"
        :key="project.name"
        v-motion
        :initial="projectVariant.initial"
        :visible="{
          ...projectVariant.visible,
          transition: {
            ...projectVariant.visible.transition,
            delay: index * 0.15,
          },
        }"
        class="m-0"
      >
        <GlassCard
          :displacement-scale="40"
          :blur-amount="0.07"
          :corner-radius="22"
          wrapper-class="group p-8 lg:p-10 rounded-2xl bg-white/5 border border-white/10 space-y-6 glass-card-hover"
        >
          <article class="space-y-6">
            <header class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div class="flex-1 space-y-3">
                <h3 class="text-2xl md:text-3xl font-bold text-white group-hover:text-brand-300 transition-colors">
                  {{ project.name }}
                </h3>
                <div class="flex flex-wrap items-center gap-3">
                  <UBadge color="primary" variant="solid" class="font-semibold">{{ project.role }}</UBadge>
                  <span class="text-sm text-neutral-400">{{ project.type }}</span>
                </div>
                <p class="text-neutral-200 text-lg leading-relaxed">{{ project.summary }}</p>
              </div>
            </header>
            <div class="border-t border-white/10 pt-6">
              <h4 class="text-sm font-bold text-brand-200 uppercase tracking-wider mb-4">Key Contributions</h4>
              <ul class="grid md:grid-cols-2 gap-4 text-neutral-200">
                <li v-for="item in project.contributions" :key="item" class="flex gap-3 items-start group/item">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="w-5 h-5 text-brand-400 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200"
                  />
                  <span class="text-base">{{ item }}</span>
                </li>
              </ul>
            </div>
          </article>
        </GlassCard>
      </li>
    </ol>
  </section>
</template>
