<script setup lang="ts">
const props = defineProps<{
  experience: Array<{
    company: string;
    role: string;
    location: string;
    summary: string;
    period: { start: string; end?: string };
    status?: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    program: string;
    level: string;
    period: { start: string; end?: string };
    status?: string;
    highlights?: string[];
  }>;
}>();

const { t } = useI18n();
const { variant, animationPresets } = useAccessibleMotion();

// Alternating slide animations for timeline effect
const slideLeftVariant = variant(animationPresets.slideInLeft);
const slideRightVariant = variant(animationPresets.slideInRight);
</script>

<template>
  <section id="experience" class="section-spacing">
    <header class="space-y-4 mb-12 text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
      <div class="inline-block">
        <p class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20">
          {{ t("portfolio.sections.experience") }}
        </p>
      </div>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
        {{ t("portfolio.sections.experience") }}
      </h2>
      <p class="text-lg md:text-xl text-neutral-300 leading-relaxed">{{ t("portfolio.sections.experienceSubtitle") }}</p>
    </header>
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-10">
      <section aria-label="Experience timeline" class="space-y-6">
        <ul class="space-y-6 list-none p-0">
          <li
            v-for="(role, index) in props.experience"
            :key="role.company + role.role"
            v-motion
            :initial="slideLeftVariant.initial"
            :visible="{
              ...slideLeftVariant.visible,
              transition: {
                ...slideLeftVariant.visible.transition,
                delay: index * 0.15,
              },
            }"
            class="m-0"
          >
            <GlassCard
              :displacement-scale="36"
              :blur-amount="0.06"
              :corner-radius="18"
              wrapper-class="group p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-5 glass-card-hover h-full"
            >
              <article class="space-y-5 h-full">
                <header class="space-y-3">
                  <div class="flex items-start justify-between gap-4">
                    <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                      {{ role.company }}
                    </h3>
                  </div>
                  <div class="flex flex-wrap items-center gap-3">
                    <UBadge color="primary" variant="solid" class="font-bold">{{ role.role }}</UBadge>
                    <span class="text-sm font-medium text-neutral-400">{{ role.location }}</span>
                  </div>
                </header>
                <p class="text-neutral-200 text-base leading-relaxed">{{ role.summary }}</p>
                <p class="flex items-center gap-2 text-sm text-neutral-400 font-medium">
                  <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                  <span>{{ role.period.start }} - {{ role.period.end || "Nu" }}</span>
                  <span v-if="role.status" class="flex items-center gap-1 text-brand-300">
                    <span aria-hidden="true">&middot;</span>
                    <span>{{ role.status }}</span>
                  </span>
                </p>
                <ul class="space-y-3 text-neutral-200 border-t border-white/10 pt-5">
                  <li v-for="item in role.highlights" :key="item" class="flex gap-3 items-start">
                    <UIcon name="i-lucide-circle-dot" class="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                    <span class="text-sm">{{ item }}</span>
                  </li>
                </ul>
              </article>
            </GlassCard>
          </li>
        </ul>
      </section>

      <section class="space-y-6" id="education" aria-label="Education">
        <header class="space-y-3">
          <p class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em]">{{ t("portfolio.sections.education") }}</p>
          <p class="text-neutral-300 text-lg leading-relaxed">{{ t("portfolio.sections.educationSubtitle") }}</p>
        </header>
        <ul class="space-y-6 list-none p-0">
          <li
            v-for="(edu, index) in props.education"
            :key="edu.institution + edu.program"
            v-motion
            :initial="slideRightVariant.initial"
            :visible="{
              ...slideRightVariant.visible,
              transition: {
                ...slideRightVariant.visible.transition,
                delay: index * 0.15,
              },
            }"
            class="m-0"
          >
            <GlassCard
              :displacement-scale="36"
              :blur-amount="0.06"
              :corner-radius="18"
              wrapper-class="group p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 glass-card-hover h-full"
            >
              <article class="space-y-4 h-full">
                <header class="space-y-2">
                  <h3 class="text-xl md:text-2xl font-bold text-white group-hover:text-brand-300 transition-colors">
                    {{ edu.institution }}
                  </h3>
                  <p class="text-neutral-200 text-base font-medium">
                    {{ edu.program }}
                    <span aria-hidden="true" class="px-2 text-neutral-400">&middot;</span>
                    {{ edu.level }}
                  </p>
                </header>
                <p class="flex items-center gap-2 text-sm text-neutral-400 font-medium">
                  <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                  <span>{{ edu.period.start }} - {{ edu.period.end || "Nu" }}</span>
                  <span v-if="edu.status" class="text-brand-300">({{ edu.status }})</span>
                </p>
                <ul v-if="edu.highlights?.length" class="space-y-2 text-neutral-200 text-sm border-t border-white/10 pt-4">
                  <li v-for="item in edu.highlights" :key="item" class="flex gap-2 items-start">
                    <UIcon name="i-lucide-check" class="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </article>
            </GlassCard>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
