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
  <div class="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden">
    <!-- Animated background gradients -->
    <div class="fixed inset-0 pointer-events-none opacity-15">
      <div
        class="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-brand-500/40 animate-[pulse-slow_10s_ease-in-out_infinite]"
      />
      <div
        class="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] bg-accent-500/30 animate-[pulse-slow_12s_ease-in-out_infinite]"
      />
    </div>

    <div
      class="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-16 md:space-y-24"
    >
      <!-- Header -->
      <header class="space-y-6 text-center lg:text-left">
        <div class="flex flex-row align-middle justify-center gap-3 flex-wrap">
          <div
            class="w-55 h-55 p-2 rounded-full bg-linear-to-r from-brand-400 to-accent-400 shadow-md shadow-zinc-700"
          >
            <img
              src="/assets/img/rune-kontor.png"
              alt="Picture of Rune Pjetursson sitting with glasses on at desk, contemplating work"
            />
          </div>
          <div>
            <div class="flex flex-row gap-4">
              <p
                class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20"
              >
                Eye On Idea <small>| CEO </small>
              </p>
              <p
                class="text-sm font-bold text-accent-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20"
              >
                Herqulez <small>| CEO </small>
              </p>
            </div>
            <h1
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
            >
              {{ t("portfolio.about.title") }}
              <span class="text-brand-300">{{ personal.full_name }}</span>
            </h1>
            <p
              class="text-xl md:text-2xl text-neutral-200 leading-relaxed max-w-3xl mx-auto lg:mx-0"
            >
              {{ headline.tagline }}
            </p>
          </div>
        </div>
      </header>

      <!-- Background Section -->
      <GlassCard
        :displacement-scale="56"
        :blur-amount="0.09"
        :corner-radius="24"
        wrapper-class="p-8 lg:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6 glass-card-hover"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
          >
            <UIcon name="i-lucide-user" class="w-6 h-6 text-brand-300" />
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white">
            {{ t("portfolio.about.sections.background") }}
          </h2>
        </div>
        <p class="text-neutral-200 text-lg leading-relaxed whitespace-pre-line">
          {{ profile.long }}
        </p>
      </GlassCard>

      <!-- Values Grid -->
      <section class="space-y-8">
        <h2
          class="text-3xl md:text-4xl font-bold text-white text-center lg:text-left"
        >
          {{ t("portfolio.sections.values") }}
        </h2>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <GlassCard
            v-for="block in [
              {
                title: t('portfolio.valuesLabels.environment'),
                body: values.work_environment,
                icon: 'i-lucide-users',
              },
              {
                title: t('portfolio.valuesLabels.management'),
                body: values.management_preference,
                icon: 'i-lucide-target',
              },
              {
                title: t('portfolio.valuesLabels.strengths'),
                body: values.strengths.join(' • '),
                icon: 'i-lucide-zap',
              },
            ]"
            :key="block.title"
            :displacement-scale="32"
            :blur-amount="0.06"
            :corner-radius="18"
            wrapper-class="group p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 h-full glass-card-hover"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
              >
                <UIcon :name="block.icon" class="w-5 h-5 text-brand-300" />
              </div>
              <h3 class="text-lg font-bold text-white">{{ block.title }}</h3>
            </div>
            <p class="text-neutral-200 leading-relaxed text-base">
              {{ block.body }}
            </p>
          </GlassCard>
        </div>
      </section>

      <!-- Skills Section -->
      <section class="space-y-8">
        <h2
          class="text-3xl md:text-4xl font-bold text-white text-center lg:text-left"
        >
          {{ t("portfolio.about.sections.skills") }}
        </h2>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <GlassCard
            :displacement-scale="32"
            :blur-amount="0.06"
            :corner-radius="18"
            wrapper-class="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 glass-card-hover"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
              >
                <UIcon name="i-lucide-star" class="w-5 h-5 text-brand-300" />
              </div>
              <h3 class="text-lg font-bold text-white">
                {{ t("portfolio.sections.skills.core") }}
              </h3>
            </div>
            <ul class="space-y-3 text-neutral-200">
              <li
                v-for="item in skills.core"
                :key="item"
                class="flex gap-3 items-center"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"
                ></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard
            :displacement-scale="32"
            :blur-amount="0.06"
            :corner-radius="18"
            wrapper-class="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 glass-card-hover"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
              >
                <UIcon name="i-lucide-code" class="w-5 h-5 text-brand-300" />
              </div>
              <h3 class="text-lg font-bold text-white">
                {{ t("portfolio.sections.skills.tech") }}
              </h3>
            </div>
            <ul class="space-y-3 text-neutral-200">
              <li
                v-for="item in skills.technologies"
                :key="item"
                class="flex gap-3 items-center"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"
                ></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </GlassCard>
          <GlassCard
            :displacement-scale="32"
            :blur-amount="0.06"
            :corner-radius="18"
            wrapper-class="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 glass-card-hover"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
              >
                <UIcon name="i-lucide-wrench" class="w-5 h-5 text-brand-300" />
              </div>
              <h3 class="text-lg font-bold text-white">
                {{ t("portfolio.sections.skills.tools") }}
              </h3>
            </div>
            <ul class="space-y-3 text-neutral-200">
              <li
                v-for="item in [
                  ...(skills.tools || []),
                  ...(skills.methods || []),
                ]"
                :key="item"
                class="flex gap-3 items-center"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"
                ></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      <!-- Projects Section -->
      <section class="space-y-8">
        <h2
          class="text-3xl md:text-4xl font-bold text-white text-center lg:text-left"
        >
          {{ t("portfolio.about.sections.cases") }}
        </h2>
        <div class="space-y-6">
          <GlassCard
            v-for="project in projects"
            :key="project.name"
            :displacement-scale="36"
            :blur-amount="0.07"
            :corner-radius="20"
            wrapper-class="group p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 space-y-4 glass-card-hover"
          >
            <div class="space-y-2">
              <h3
                class="text-xl md:text-2xl font-bold text-white group-hover:text-brand-300 transition-colors"
              >
                {{ project.name }}
              </h3>
              <div class="flex flex-wrap items-center gap-3">
                <UBadge color="primary" variant="solid" class="font-semibold">{{
                  project.role
                }}</UBadge>
                <span class="text-sm text-neutral-400">{{ project.type }}</span>
              </div>
            </div>
            <p class="text-neutral-200 leading-relaxed">
              {{ project.summary }}
            </p>
          </GlassCard>
        </div>
      </section>

      <!-- Approach Section -->
      <GlassCard
        :displacement-scale="40"
        :blur-amount="0.07"
        :corner-radius="20"
        wrapper-class="p-8 lg:p-12 rounded-3xl bg-white/5 border border-white/10 space-y-6 glass-card-hover"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-xl bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
          >
            <UIcon name="i-lucide-lightbulb" class="w-6 h-6 text-brand-300" />
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-white">
            {{ t("portfolio.about.sections.approach") }}
          </h2>
        </div>
        <p class="text-neutral-200 text-lg leading-relaxed">
          {{ values.approach }}
        </p>
      </GlassCard>

      <!-- CTA -->
      <div class="text-center space-y-6 pt-8">
        <h3 class="text-2xl md:text-3xl font-bold text-white">
          Ready to work together?
        </h3>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-500 text-neutral-900 font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-1 transition-all duration-300"
        >
          <span>Get in touch</span>
          <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
