<script setup lang="ts">
import GlassCard from "~/components/GlassCard.vue";

const { t } = useI18n();
const {
  getPersonal,
  getHeadline,
  getProfile,
  getValuesAndWorkstyle,
  getSkills,
  getExperience,
  getProjects,
} = useRuneContent();

const personal = computed(() => getPersonal());
const headline = computed(() => getHeadline());
const profile = computed(() => getProfile());
const values = computed(() => getValuesAndWorkstyle());
const skills = computed(() => getSkills());
const experience = computed(() => getExperience());
const projects = computed(() => getProjects());

useSeo({
  title: `${personal.value.full_name} – ${t("portfolio.about.title")}`,
  description: profile.value.short,
  type: "profile",
});
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-50">
    <div class="absolute inset-0 pointer-events-none opacity-25">
      <div class="absolute -top-32 right-10 w-96 h-96 rounded-full blur-3xl bg-brand-500/30" />
      <div class="absolute bottom-0 left-0 w-[520px] h-[520px] rounded-full blur-3xl bg-accent-500/25" />
    </div>
    <div class="relative max-w-5xl mx-auto px-6 md:px-10 py-16 space-y-14">
      <header class="space-y-4">
        <p class="text-sm font-semibold text-brand-200">{{ personal.company_freelance }}</p>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white">
          {{ t("portfolio.about.title") }} {{ personal.full_name }}
        </h1>
        <p class="text-lg text-neutral-200">{{ headline.tagline }}</p>
      </header>

      <GlassCard
        :displacement-scale="48"
        :blur-amount="0.08"
        :corner-radius="22"
        wrapper-class="space-y-6 p-6 rounded-3xl bg-white/5 border border-white/10"
      >
        <h2 class="text-2xl font-bold text-white">{{ t("portfolio.about.sections.background") }}</h2>
        <p class="text-neutral-200 whitespace-pre-line leading-relaxed">
          {{ profile.long }}
        </p>
      </GlassCard>

      <div class="grid md:grid-cols-3 gap-6">
        <GlassCard
          v-for="block in [
            { title: t('portfolio.valuesLabels.environment'), body: values.work_environment },
            { title: t('portfolio.valuesLabels.management'), body: values.management_preference },
            { title: t('portfolio.valuesLabels.strengths'), body: values.strengths.join(' • ') },
          ]"
          :key="block.title"
          :displacement-scale="32"
          :blur-amount="0.06"
          :corner-radius="18"
          wrapper-class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 h-full"
        >
          <h3 class="font-bold text-white">{{ block.title }}</h3>
          <p class="text-neutral-200 leading-relaxed">{{ block.body }}</p>
        </GlassCard>
      </div>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-white">{{ t("portfolio.about.sections.skills") }}</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <GlassCard :displacement-scale="28" :blur-amount="0.05" :corner-radius="16" wrapper-class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="font-semibold mb-2 text-white">{{ t("portfolio.sections.skills.core") }}</h3>
            <ul class="space-y-2 text-neutral-200">
              <li v-for="item in skills.core" :key="item">• {{ item }}</li>
            </ul>
          </GlassCard>
          <GlassCard :displacement-scale="28" :blur-amount="0.05" :corner-radius="16" wrapper-class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="font-semibold mb-2 text-white">{{ t("portfolio.sections.skills.tech") }}</h3>
            <ul class="space-y-2 text-neutral-200">
              <li v-for="item in skills.technologies" :key="item">• {{ item }}</li>
            </ul>
          </GlassCard>
          <GlassCard :displacement-scale="28" :blur-amount="0.05" :corner-radius="16" wrapper-class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h3 class="font-semibold mb-2 text-white">{{ t("portfolio.sections.skills.tools") }}</h3>
            <ul class="space-y-2 text-neutral-200">
              <li v-for="item in [...(skills.tools || []), ...(skills.methods || [])]" :key="item">
                • {{ item }}
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      <section class="space-y-4">
        <h2 class="text-2xl font-bold text-white">{{ t("portfolio.about.sections.cases") }}</h2>
        <div class="space-y-4">
          <GlassCard
            v-for="project in projects"
            :key="project.name"
            :displacement-scale="32"
            :blur-amount="0.06"
            :corner-radius="18"
            wrapper-class="p-5 rounded-2xl bg-white/5 border border-white/10"
          >
            <h3 class="text-xl font-bold text-white">{{ project.name }}</h3>
            <p class="text-sm text-neutral-400">{{ project.role }} · {{ project.type }}</p>
            <p class="text-neutral-200 mt-2">{{ project.summary }}</p>
          </GlassCard>
        </div>
      </section>

      <GlassCard :displacement-scale="28" :blur-amount="0.05" :corner-radius="16" wrapper-class="space-y-3 p-5 rounded-2xl bg-white/5 border border-white/10">
        <h2 class="text-2xl font-bold text-white">{{ t("portfolio.about.sections.approach") }}</h2>
        <p class="text-neutral-200">{{ values.approach }}</p>
      </GlassCard>
    </div>
  </div>
</template>
