<script setup lang="ts">
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

const valueBlocks = computed(() => [
  {
    title: t("portfolio.valuesLabels.environment"),
    body: values.value.work_environment,
    icon: "i-lucide-users",
  },
  {
    title: t("portfolio.valuesLabels.management"),
    body: values.value.management_preference,
    icon: "i-lucide-target",
  },
  {
    title: t("portfolio.valuesLabels.strengths"),
    list: values.value.strengths,
    icon: "i-lucide-zap",
  },
]);

const stats = computed(() => [
  {
    label: t("portfolio.stats.experience"),
    value: `${experience.value.length}+`,
  },
  { label: t("portfolio.stats.services"), value: `${services.value.length}` },
  { label: t("portfolio.stats.projects"), value: `${projects.value.length}` },
  { label: t("portfolio.stats.education"), value: `${education.value.length}` },
]);

const focusChips = computed(() =>
  [
    personal.value.location,
    ...skills.value.core.slice(0, 3),
    skills.value.languages?.[1] || "",
  ].filter(Boolean)
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
  <div class="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden">
    <!-- Animated background gradients -->
    <div
      class="fixed inset-0 pointer-events-none opacity-20"
      aria-hidden="true"
    >
      <div
        class="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-brand-500/40 animate-[pulse-slow_8s_ease-in-out_infinite]"
      />
      <div
        class="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-accent-500/40 animate-[pulse-slow_10s_ease-in-out_infinite]"
      />
      <div
        class="absolute bottom-0 left-1/4 w-[450px] h-[450px] rounded-full blur-[100px] bg-brand-400/30 animate-[pulse-slow_12s_ease-in-out_infinite]"
      />
    </div>

    <main
      class="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-20 md:space-y-28"
    >
      <IndexHero
        :personal="personal"
        :headline="headline"
        :profile-short="profile.short"
        :stats="stats"
        :focus-chips="focusChips"
      />
      <IndexBusinessCont />
      <IndexServices :services="services" />

      <IndexExperienceEducation
        :experience="experience"
        :education="education"
      />

      <IndexValues :value-blocks="valueBlocks" :approach="values.approach" />

      <IndexContact :contact-cta="contactCta" />
    </main>
  </div>
</template>
