<script setup lang="ts">
import GlassCard from "~/components/GlassCard.vue";

const {
  getPersonal,
  getHeadline,
  getProfile,
  getSkills,
  getServices,
  getProjects,
  getExperience,
  getEducation,
  getValuesAndWorkstyle,
  getContactCta,
} = useRuneContent();

const personal = computed(() => getPersonal());
const headline = computed(() => getHeadline());
const profile = computed(() => getProfile());
const skills = computed(() => getSkills());
const services = computed(() => getServices());
const projects = computed(() => getProjects());
const experience = computed(() => getExperience());
const education = computed(() => getEducation());
const values = computed(() => getValuesAndWorkstyle());
const contactCta = computed(() => getContactCta());

const { t } = useI18n();

const stats = computed(() => [
  { label: t("portfolio.stats.experience"), value: `${experience.value.length}+` },
  { label: t("portfolio.stats.services"), value: `${services.value.length}` },
  { label: t("portfolio.stats.projects"), value: `${projects.value.length}` },
  { label: t("portfolio.stats.education"), value: `${education.value.length}` },
]);

const focusChips = computed(() =>
  [
    personal.value.location,
    ...skills.value.core.slice(0, 3),
    skills.value.languages?.[1] || "",
  ].filter(Boolean),
);

const config = useRuntimeConfig();
const baseUrl = config.public.siteUrl || "https://runepjetursson.com";

useSeo({
  title: personal.value.full_name,
  description: headline.value.short,
  keywords: [
    personal.value.full_name,
    personal.value.title_primary,
    personal.value.title_secondary,
    "UX/UI",
    "Frontend",
    "Digital product design",
  ],
  type: "website",
  image: `${baseUrl}/assets/logo/squared-light.png`,
  structuredData: [
    {
      "@type": "Person",
      name: personal.value.full_name,
      jobTitle: personal.value.title_primary,
      description: headline.value.tagline,
      url: baseUrl,
      worksFor: personal.value.company_freelance,
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-50">
    <div class="absolute inset-0 pointer-events-none opacity-30">
      <div class="absolute -top-32 -left-20 w-96 h-96 rounded-full blur-3xl bg-brand-500/30" />
      <div class="absolute top-40 right-0 w-[520px] h-[520px] rounded-full blur-3xl bg-accent-500/30" />
    </div>

    <main class="relative max-w-6xl mx-auto px-6 md:px-10 py-16 space-y-16">
      <!-- Hero -->
      <section id="hero" class="grid lg:grid-cols-2 gap-10 items-center">
        <div class="space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
            <span class="text-sm font-semibold text-neutral-100">{{ personal.company_freelance }}</span>
            <span class="text-neutral-400">•</span>
            <span class="text-sm text-neutral-200">{{ personal.location }}</span>
          </div>
          <div class="space-y-2">
            <p class="text-base text-accent-200 font-semibold">{{ personal.title_secondary }}</p>
            <h1 class="text-4xl md:text-5xl font-extrabold leading-tight text-white">
              {{ personal.full_name }} — {{ personal.title_primary }}
            </h1>
          </div>
          <p class="text-xl text-neutral-200">{{ headline.short }}</p>
          <p class="text-neutral-300">{{ headline.tagline }}</p>
          <div class="flex flex-wrap gap-3 pt-2">
            <NuxtLink to="/contact" class="px-5 py-3 rounded-xl bg-brand-500 text-neutral-900 font-semibold shadow-lg hover:bg-brand-400 transition-colors">
              {{ t("portfolio.hero.ctaPrimary") }}
            </NuxtLink>
            <NuxtLink to="#projects" class="px-5 py-3 rounded-xl border border-white/15 text-neutral-100 font-semibold hover:bg-white/5 transition-colors">
              {{ t("portfolio.hero.ctaSecondary") }}
            </NuxtLink>
          </div>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="chip in focusChips" :key="chip" color="primary" variant="soft" class="font-semibold">
              {{ chip }}
            </UBadge>
          </div>
        </div>

        <div class="space-y-4">
          <GlassCard :displacement-scale="64" :blur-amount="0.08" :corner-radius="24" wrapper-class="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
            <h3 class="text-xl font-bold text-white">{{ t("portfolio.about.cardTitle") }}</h3>
            <p class="text-neutral-200 leading-relaxed">{{ profile.short }}</p>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="stat in stats" :key="stat.label" class="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
                <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
                <div class="text-sm text-neutral-300">{{ stat.label }}</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      <!-- Services -->
      <section id="services" class="space-y-8">
        <header class="space-y-2">
          <p class="text-sm font-semibold text-brand-200 uppercase tracking-[0.08em]">{{ t("portfolio.sections.services.title") }}</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ t("portfolio.sections.services.title") }}</h2>
          <p class="text-neutral-300 max-w-3xl">
            {{ t("portfolio.sections.services.subtitle") }}
          </p>
        </header>
        <div class="grid md:grid-cols-2 gap-6">
          <GlassCard
            v-for="service in services"
            :key="service.id"
            :displacement-scale="48"
            :blur-amount="0.08"
            :corner-radius="20"
            wrapper-class="p-6 rounded-2xl bg-white/5 border border-white/10 h-full space-y-3"
          >
            <h3 class="text-xl font-bold text-white">{{ service.title }}</h3>
            <p class="text-neutral-200 leading-relaxed">{{ service.description }}</p>
            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="keyword in service.keywords || []"
                :key="keyword"
                color="primary"
                variant="soft"
                class="font-medium"
              >
                {{ keyword }}
              </UBadge>
            </div>
          </GlassCard>
        </div>
      </section>

      <!-- Projects -->
      <section id="projects" class="space-y-8">
        <header class="space-y-2">
          <p class="text-sm font-semibold text-brand-200 uppercase tracking-[0.08em]">{{ t("portfolio.sections.projects") }}</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ t("portfolio.sections.projects") }}</h2>
        </header>
        <div class="space-y-6">
          <GlassCard
            v-for="project in projects"
            :key="project.name"
            :displacement-scale="40"
            :blur-amount="0.07"
            :corner-radius="22"
            wrapper-class="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3"
          >
            <div class="flex flex-col gap-2">
              <h3 class="text-2xl font-bold text-white">{{ project.name }}</h3>
              <p class="text-sm text-neutral-400">{{ project.role }} · {{ project.type }}</p>
              <p class="text-neutral-200">{{ project.summary }}</p>
            </div>
            <ul class="grid md:grid-cols-2 gap-3 text-neutral-200">
              <li v-for="item in project.contributions" :key="item" class="flex gap-2">
                <span class="i-lucide-check-circle text-brand-400 mt-1" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </section>

      <!-- Experience & Education -->
      <section id="experience" class="space-y-10">
        <header class="space-y-2">
          <p class="text-sm font-semibold text-brand-200 uppercase tracking-[0.08em]">{{ t("portfolio.sections.experience") }}</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ t("portfolio.sections.experience") }}</h2>
          <p class="text-neutral-300">{{ t("portfolio.sections.experienceSubtitle") }}</p>
        </header>
        <div class="grid lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <GlassCard
              v-for="role in experience"
              :key="role.company + role.role"
              :displacement-scale="36"
              :blur-amount="0.06"
              :corner-radius="18"
              wrapper-class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3"
            >
              <div class="flex flex-wrap gap-3 items-center">
                <h3 class="text-xl font-bold text-white">{{ role.company }}</h3>
                <UBadge color="primary" variant="soft" class="font-semibold">{{ role.role }}</UBadge>
                <span class="text-sm text-neutral-400">{{ role.location }}</span>
              </div>
              <p class="text-neutral-200">{{ role.summary }}</p>
              <p class="text-sm text-neutral-400">
                {{ role.period.start }} – {{ role.period.end || "Nu" }}
                <span v-if="role.status"> · {{ role.status }}</span>
              </p>
              <ul class="space-y-2 text-neutral-200">
                <li v-for="item in role.highlights" :key="item" class="flex gap-2">
                  <span class="i-lucide-dot text-brand-400 mt-1" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </GlassCard>
          </div>

          <div class="space-y-4" id="education">
            <p class="text-sm font-semibold text-brand-200 uppercase tracking-[0.08em]">{{ t("portfolio.sections.education") }}</p>
            <p class="text-neutral-300">{{ t("portfolio.sections.educationSubtitle") }}</p>
            <GlassCard
              v-for="edu in education"
              :key="edu.institution + edu.program"
              :displacement-scale="36"
              :blur-amount="0.06"
              :corner-radius="18"
              wrapper-class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2"
            >
              <h3 class="text-xl font-bold text-white">{{ edu.institution }}</h3>
              <p class="text-neutral-200">{{ edu.program }} · {{ edu.level }}</p>
              <p class="text-sm text-neutral-400">
                {{ edu.period.start }} – {{ edu.period.end || "Nu" }} <span v-if="edu.status">({{ edu.status }})</span>
              </p>
              <ul class="space-y-1 text-neutral-200">
                <li v-for="item in edu.highlights || []" :key="item">• {{ item }}</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <!-- Values & Workstyle -->
      <section id="values" class="space-y-8">
        <header class="space-y-2">
          <p class="text-sm font-semibold text-brand-200 uppercase tracking-[0.08em]">{{ t("portfolio.sections.values") }}</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ t("portfolio.sections.values") }}</h2>
        </header>
        <div class="grid md:grid-cols-3 gap-6">
          <GlassCard
            v-for="block in [
              { title: t('portfolio.valuesLabels.environment'), body: values.work_environment },
              { title: t('portfolio.valuesLabels.management'), body: values.management_preference },
              { title: t('portfolio.valuesLabels.strengths'), body: values.strengths.join(' • ') },
            ]"
            :key="block.title"
            :displacement-scale="28"
            :blur-amount="0.05"
            :corner-radius="18"
            wrapper-class="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 h-full"
          >
            <h3 class="font-bold text-white">{{ block.title }}</h3>
            <p class="text-neutral-200 leading-relaxed">{{ block.body }}</p>
          </GlassCard>
        </div>
        <GlassCard :displacement-scale="32" :blur-amount="0.06" :corner-radius="18" wrapper-class="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 class="font-bold mb-2 text-white">{{ t("portfolio.valuesLabels.approach") }}</h3>
          <p class="text-neutral-200">{{ values.approach }}</p>
        </GlassCard>
      </section>

      <!-- Contact -->
      <section id="contact" class="space-y-6">
        <GlassCard :displacement-scale="48" :blur-amount="0.08" :corner-radius="24" wrapper-class="p-8 rounded-3xl bg-linear-to-r from-brand-500/20 to-accent-500/20 border border-white/15 shadow-lg space-y-4">
          <p class="text-sm font-semibold text-brand-50 uppercase tracking-[0.08em]">{{ t("portfolio.sections.contact.title") }}</p>
          <h2 class="text-3xl md:text-4xl font-bold text-white">{{ contactCta.heading }}</h2>
          <p class="text-lg text-neutral-100">{{ contactCta.body }}</p>
          <div class="grid md:grid-cols-2 gap-3 text-neutral-100">
            <div>
              <p class="font-semibold">{{ t("portfolio.sections.contact.preferred") }}</p>
              <ul class="mt-2 space-y-2">
                <li v-for="item in contactCta.preferred_collaborations" :key="item" class="flex gap-2">
                  <span class="i-lucide-check text-brand-200 mt-1" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
            <div class="space-y-2">
              <p class="font-semibold">{{ t("portfolio.sections.contact.contactInfo") }}</p>
              <a class="block text-white font-semibold hover:underline" href="mailto:hello@runepjetursson.com">
                hello@runepjetursson.com
              </a>
              <a class="block text-white hover:underline" href="https://www.linkedin.com/in/rune-m-p-pjetursson-361870115/" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>
          <div class="flex flex-wrap gap-3 pt-2">
            <NuxtLink to="/contact" class="px-5 py-3 rounded-xl bg-white text-brand-700 font-semibold shadow hover:-translate-y-0.5 transition">
              {{ t("portfolio.sections.contact.ctaPrimary") }}
            </NuxtLink>
            <NuxtLink to="#projects" class="px-5 py-3 rounded-xl border border-white/60 text-white font-semibold hover:bg-white/10 transition">
              {{ t("portfolio.sections.contact.ctaSecondary") }}
            </NuxtLink>
          </div>
        </GlassCard>
      </section>
    </main>
  </div>
</template>
