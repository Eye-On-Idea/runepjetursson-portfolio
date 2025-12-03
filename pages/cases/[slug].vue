<!-- pages/cases/[slug].vue -->
<script setup lang="ts">
const route = useRoute();
const { t, tm, locale } = useI18n();

interface CaseStudy {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  company: string;
  role: string;
  year: string;
  duration?: string;
  url?: string;
  thumbnail?: string;
  tags?: string[];
  overview: {
    challenge: string;
    solution: string;
    outcome: string;
  };
  keyMetrics?: Array<{ label: string; value: string; description?: string }>;
  technologies?: string[];
  process?: Array<{
    phase: string;
    description: string;
    deliverables?: string[];
  }>;
  challenges?: Array<{
    title: string;
    problem: string;
    solution: string;
  }>;
  results?: { summary: string; highlights?: string[] };
  learnings?: string[];
  gallery?: string[];
  nextSteps?: string[];
  category?: string;
}

// Gallery modal state
const isGalleryOpen = ref(false);
const selectedImageIndex = ref(0);

const openGallery = (index: number) => {
  selectedImageIndex.value = index;
  isGalleryOpen.value = true;
};

const closeGallery = () => {
  isGalleryOpen.value = false;
};

// Get case studies from i18n
const caseStudies = computed<CaseStudy[]>(() => {
  const studies = tm("caseStudiesContent.caseStudies") as unknown;
  if (Array.isArray(studies)) {
    return studies as CaseStudy[];
  }
  if (studies && typeof studies === "object") {
    return Object.values(studies) as CaseStudy[];
  }
  return [];
});

// Get the current case study
const caseStudy = computed<CaseStudy | undefined>(() =>
  caseStudies.value.find((c) => c.slug === route.params.slug)
);

// Check if case study exists and redirect if not
if (import.meta.client && !caseStudy.value) {
  navigateTo("/cases");
}

const config = useRuntimeConfig();
const baseUrl = config.public.siteUrl || "https://runepjetursson.com";

// SEO optimization - with null check
useSeo({
  title: caseStudy.value
    ? `${caseStudy.value.title}`
    : t("pages.cases.metaTitle"),
  description:
    caseStudy.value?.overview.challenge || t("pages.cases.metaDescription"),
  keywords: caseStudy.value?.tags || [],
  type: "portfolio",
  image: caseStudy.value?.thumbnail
    ? `${baseUrl}${caseStudy.value.thumbnail}`
    : undefined,
  publishedTime: caseStudy.value?.year
    ? `${caseStudy.value.year}-01-01`
    : undefined,
  breadcrumbs: [
    { name: "Home", url: `${baseUrl}` },
    { name: t("pages.cases.metaTitle"), url: `${baseUrl}/cases` },
    {
      name: caseStudy.value?.title || "Case Study",
      url: `${baseUrl}/cases/${route.params.slug}`,
    },
  ],
  structuredData: caseStudy.value
    ? {
        "@type": "CreativeWork",
        "@id": `${baseUrl}/cases/${caseStudy.value.slug}`,
        name: caseStudy.value.title,
        description: caseStudy.value.overview.challenge,
        creator: {
          "@type": "Person",
          name: "Rune Pjetursson",
          url: baseUrl,
        },
        image: caseStudy.value.thumbnail
          ? `${baseUrl}${caseStudy.value.thumbnail}`
          : undefined,
        keywords: caseStudy.value.tags?.join(", "),
        inLanguage: locale.value,
      }
    : undefined,
});

// Get next and previous case studies for navigation
const currentIndex = computed(() =>
  caseStudies.value.findIndex((c) => c.slug === route.params.slug)
);

const nextCase = computed<CaseStudy | undefined>(() => {
  if (!caseStudies.value.length) return undefined;
  if (currentIndex.value === -1) return caseStudies.value[0];
  const nextIndex = (currentIndex.value + 1) % caseStudies.value.length;
  return caseStudies.value[nextIndex];
});

const previousCase = computed<CaseStudy | undefined>(() => {
  if (!caseStudies.value.length) return undefined;
  if (currentIndex.value === -1)
    return caseStudies.value[caseStudies.value.length - 1];
  const prevIndex =
    currentIndex.value === 0
      ? caseStudies.value.length - 1
      : currentIndex.value - 1;
  return caseStudies.value[prevIndex];
});

// Badge label helper
const getBadgeLabel = (company: string) => {
  if (company === "Eye On Idea") return t("pages.cases.badges.eyeOnIdea");
  if (company === "Herqulez") return t("pages.cases.badges.herqulez");
  return company;
};

// Check if company is own company (not a client)
const isOwnCompany = (company: string) => {
  return company === "Eye On Idea" || company === "Herqulez";
};

// Get color classes based on company type
const getColorClasses = (
  company: string,
  type: "border" | "text" | "bg" | "accent" | "gradient"
) => {
  const isOwn = isOwnCompany(company);

  if (type === "border") {
    return isOwn
      ? "border-brand-500/20 hover:border-brand-500 dark:hover:border-brand-500"
      : "border-blue-500/20 hover:border-blue-500 dark:hover:border-blue-500";
  }
  if (type === "text") {
    return isOwn
      ? "text-brand-600 dark:text-brand-400"
      : "text-blue-600 dark:text-blue-400";
  }
  if (type === "bg") {
    return isOwn
      ? "bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 border-brand-500/20"
      : "bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/20";
  }
  if (type === "accent") {
    return isOwn
      ? "from-brand-500/5 to-accent-500/5 dark:from-brand-500/10 dark:to-accent-500/10 border-brand-500/10 dark:border-brand-500/20"
      : "from-blue-500/5 to-cyan-500/5 dark:from-blue-500/10 dark:to-cyan-500/10 border-blue-500/10 dark:border-blue-500/20";
  }
  if (type === "gradient") {
    return isOwn ? "from-brand-500 to-accent-500" : "from-blue-500 to-cyan-500";
  }
  return "";
};
</script>

<template>
  <div
    v-if="!caseStudy"
    class="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center"
    role="status"
    aria-live="polite"
  >
    <div class="text-center">
      <UIcon
        name="i-lucide-loader-2"
        class="w-12 h-12 text-brand-500 animate-spin mx-auto mb-4"
      />
      <p class="text-zinc-600 dark:text-zinc-400">Loading case study...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
    <!-- Back Navigation -->
    <div
      class="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <NuxtLink
          to="/cases"
          :class="[
            'inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 transition-colors',
            isOwnCompany(caseStudy.company)
              ? 'hover:text-brand-600 dark:hover:text-brand-400'
              : 'hover:text-blue-600 dark:hover:text-blue-400',
          ]"
        >
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          {{ t("pages.cases.navigation.backToCases") }}
        </NuxtLink>
      </div>
    </div>

    <!-- Hero Section -->
    <section
      class="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
    >
      <div class="absolute inset-0 opacity-5">
        <div
          :class="[
            'absolute w-96 h-96 -top-48 -right-48 rounded-full blur-3xl bg-linear-to-br',
            getColorClasses(caseStudy.company, 'gradient'),
          ]"
        />
        <div
          :class="[
            'absolute w-96 h-96 -bottom-48 -left-48 rounded-full blur-3xl bg-linear-to-br',
            isOwnCompany(caseStudy.company)
              ? 'from-accent-500 to-brand-500'
              : 'from-cyan-500 to-blue-500',
          ]"
        />
      </div>

      <div class="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div class="max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="mb-6">
            <span
              :class="[
                'inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border',
                getColorClasses(caseStudy.company, 'bg'),
              ]"
            >
              {{ getBadgeLabel(caseStudy.company) }}
            </span>
          </div>

          <!-- Title & Subtitle -->
          <h1
            class="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-4"
          >
            {{ caseStudy.title }}
          </h1>
          <p class="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-8">
            {{ caseStudy.subtitle }}
          </p>

          <!-- Meta Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p class="text-sm text-zinc-500 dark:text-zinc-500 mb-1">
                {{ t("pages.cases.stats.role") }}
              </p>
              <p
                class="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {{ caseStudy.role }}
              </p>
            </div>
            <div>
              <p class="text-sm text-zinc-500 dark:text-zinc-500 mb-1">
                {{ t("pages.cases.stats.year") }}
              </p>
              <p
                class="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {{ caseStudy.year }}
              </p>
            </div>
            <div>
              <p class="text-sm text-zinc-500 dark:text-zinc-500 mb-1">
                {{ t("pages.cases.stats.duration") }}
              </p>
              <p
                class="text-base font-semibold text-zinc-900 dark:text-zinc-100"
              >
                {{ caseStudy.duration }}
              </p>
            </div>
            <div>
              <a
                v-if="caseStudy.url"
                :href="caseStudy.url"
                target="_blank"
                rel="noopener noreferrer"
                :class="[
                  'inline-flex items-center gap-2 hover:underline font-semibold',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ t("pages.cases.cta.visitSite") }}
                <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div class="max-w-4xl mx-auto">
        <!-- Overview Section -->
        <section class="mb-16">
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.overview") }}
          </h2>

          <div class="grid md:grid-cols-3 gap-8">
            <div
              class="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <h3
                :class="[
                  'text-lg font-bold mb-3',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ t("pages.cases.sections.challenge") }}
              </h3>
              <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {{ caseStudy.overview.challenge }}
              </p>
            </div>

            <div
              class="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <h3
                :class="[
                  'text-lg font-bold mb-3',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ t("pages.cases.sections.solution") }}
              </h3>
              <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {{ caseStudy.overview.solution }}
              </p>
            </div>

            <div
              class="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <h3
                :class="[
                  'text-lg font-bold mb-3',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ t("pages.cases.sections.outcome") }}
              </h3>
              <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {{ caseStudy.overview.outcome }}
              </p>
            </div>
          </div>
        </section>

        <!-- Key Metrics -->
        <section
          v-if="caseStudy.keyMetrics && caseStudy.keyMetrics.length"
          :class="[
            'mb-16 p-8 bg-linear-to-br rounded-2xl border',
            getColorClasses(caseStudy.company, 'accent'),
          ]"
        >
          <h2
            class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center"
          >
            {{ t("pages.cases.sections.keyMetrics") }}
          </h2>

          <div class="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div
              v-for="metric in caseStudy.keyMetrics"
              :key="metric.label"
              class="text-center"
            >
              <p
                :class="[
                  'text-4xl font-extrabold mb-2',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ metric.value }}
              </p>
              <p
                class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1"
              >
                {{ metric.label }}
              </p>
              <p class="text-sm text-zinc-600 dark:text-zinc-400">
                {{ metric.description }}
              </p>
            </div>
          </div>
        </section>

        <!-- Technologies -->
        <section
          v-if="caseStudy.technologies && caseStudy.technologies.length"
          class="mb-16"
        >
          <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            {{ t("pages.cases.stats.technologies") }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="tech in caseStudy.technologies"
              :key="tech"
              class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
            >
              {{ tech }}
            </span>
          </div>
        </section>

        <!-- Process Section -->
        <section
          v-if="caseStudy.process && caseStudy.process.length"
          class="mb-16"
        >
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.process") }}
          </h2>

          <div class="space-y-8">
            <div
              v-for="(phase, index) in caseStudy.process"
              :key="index"
              :class="[
                'relative pl-8 border-l-2',
                isOwnCompany(caseStudy.company)
                  ? 'border-brand-500 dark:border-brand-400'
                  : 'border-blue-500 dark:border-blue-400',
              ]"
            >
              <!-- Phase number indicator -->
              <div
                :class="[
                  'absolute -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm',
                  isOwnCompany(caseStudy.company)
                    ? 'bg-brand-500 dark:bg-brand-400'
                    : 'bg-blue-500 dark:bg-blue-400',
                ]"
              >
                {{ index + 1 }}
              </div>

              <h3
                class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3"
              >
                {{ phase.phase }}
              </h3>
              <p class="text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                {{ phase.description }}
              </p>

              <!-- Deliverables -->
              <div
                v-if="phase.deliverables && phase.deliverables.length"
                class="flex flex-wrap gap-2"
              >
                <span
                  v-for="deliverable in phase.deliverables"
                  :key="deliverable"
                  class="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  {{ deliverable }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- Challenges & Solutions -->
        <section
          v-if="caseStudy.challenges && caseStudy.challenges.length"
          class="mb-16"
        >
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.challenges") }}
          </h2>

          <div class="space-y-6">
            <div
              v-for="challenge in caseStudy.challenges"
              :key="challenge.title"
              class="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"
            >
              <h3
                class="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3"
              >
                {{ challenge.title }}
              </h3>
              <div class="space-y-3">
                <div>
                  <p
                    class="text-sm font-semibold text-red-600 dark:text-red-400 mb-1"
                  >
                    Problem:
                  </p>
                  <p class="text-zinc-700 dark:text-zinc-300">
                    {{ challenge.problem }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-sm font-semibold text-green-600 dark:text-green-400 mb-1"
                  >
                    Solution:
                  </p>
                  <p class="text-zinc-700 dark:text-zinc-300">
                    {{ challenge.solution }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Results -->
        <section v-if="caseStudy.results" class="mb-16">
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.results") }}
          </h2>

          <div
            class="p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800"
          >
            <p
              class="text-lg text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed"
            >
              {{ caseStudy.results.summary }}
            </p>

            <ul v-if="caseStudy.results.highlights" class="space-y-3">
              <li
                v-for="highlight in caseStudy.results.highlights"
                :key="highlight"
                class="flex items-start gap-3"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5"
                />
                <span class="text-zinc-700 dark:text-zinc-300">{{
                  highlight
                }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Key Learnings -->
        <section
          v-if="caseStudy.learnings && caseStudy.learnings.length"
          class="mb-16"
        >
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.learnings") }}
          </h2>

          <div
            class="p-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
          >
            <ul class="space-y-4">
              <li
                v-for="learning in caseStudy.learnings"
                :key="learning"
                class="flex items-start gap-3"
              >
                <UIcon
                  name="i-lucide-lightbulb"
                  class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
                />
                <span class="text-zinc-700 dark:text-zinc-300">{{
                  learning
                }}</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Gallery -->
        <section
          v-if="caseStudy.gallery && caseStudy.gallery.length"
          class="mb-16"
        >
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.gallery") }}
          </h2>

          <div class="grid md:grid-cols-2 gap-6">
            <button
              v-for="(image, index) in caseStudy.gallery"
              :key="index"
              type="button"
              class="relative group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-400 transition-all"
              :aria-label="`${caseStudy.title} screenshot ${index + 1}, open gallery`"
              @click="openGallery(index)"
            >
              <img
                :src="image"
                :alt="`${caseStudy.title} screenshot ${index + 1}`"
                class="w-full h-auto object-cover transition-transform group-hover:scale-105"
              />
              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"
              >
                <div
                  class="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div
                    class="p-3 rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm"
                  >
                    <UIcon
                      name="i-lucide-maximize-2"
                      class="w-6 h-6 text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </section>

        <!-- Image Gallery Modal -->
        <CasesImageGalleryModal
          v-if="caseStudy.gallery"
          :images="caseStudy.gallery"
          :title="caseStudy.title"
          :is-open="isGalleryOpen"
          :initial-index="selectedImageIndex"
          @close="closeGallery"
          @index-change="(index) => (selectedImageIndex = index)"
        />

        <!-- Next Steps -->
        <section
          v-if="caseStudy.nextSteps && caseStudy.nextSteps.length"
          class="mb-16"
        >
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">
            {{ t("pages.cases.sections.nextSteps") }}
          </h2>

          <div
            class="p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800"
          >
            <ul class="space-y-3">
              <li
                v-for="step in caseStudy.nextSteps"
                :key="step"
                class="flex items-start gap-3"
              >
                <UIcon
                  name="i-lucide-arrow-right"
                  :class="[
                    'w-5 h-5 shrink-0 mt-0.5',
                    getColorClasses(caseStudy.company, 'text'),
                  ]"
                />
                <span class="text-zinc-700 dark:text-zinc-300">{{ step }}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>

    <!-- Case Navigation -->
    <section
      v-if="previousCase && nextCase"
      class="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
    >
      <div class="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Previous Case -->
          <NuxtLink
            :to="`/cases/${previousCase.slug}`"
            :class="[
              'group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl',
              getColorClasses(caseStudy.company, 'border'),
              isOwnCompany(caseStudy.company)
                ? 'hover:shadow-brand-500/10'
                : 'hover:shadow-blue-500/10',
            ]"
          >
            <p class="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
              {{ t("pages.cases.navigation.previousCase") }}
            </p>
            <h3
              :class="[
                'text-xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors',
                isOwnCompany(caseStudy.company)
                  ? 'group-hover:text-brand-600 dark:group-hover:text-brand-400'
                  : 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
              ]"
            >
              {{ previousCase.title }}
            </h3>
          </NuxtLink>

          <!-- Next Case -->
          <NuxtLink
            :to="`/cases/${nextCase.slug}`"
            :class="[
              'group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl text-right',
              getColorClasses(caseStudy.company, 'border'),
              isOwnCompany(caseStudy.company)
                ? 'hover:shadow-brand-500/10'
                : 'hover:shadow-blue-500/10',
            ]"
          >
            <p class="text-sm text-zinc-500 dark:text-zinc-500 mb-2">
              {{ t("pages.cases.navigation.nextCase") }}
            </p>
            <h3
              :class="[
                'text-xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors',
                isOwnCompany(caseStudy.company)
                  ? 'group-hover:text-brand-600 dark:group-hover:text-brand-400'
                  : 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
              ]"
            >
              {{ nextCase.title }}
            </h3>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div
        :class="[
          'relative bg-linear-to-br rounded-3xl p-12 md:p-16 overflow-hidden',
          getColorClasses(caseStudy.company, 'gradient'),
        ]"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />

        <div class="relative z-10 max-w-3xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            {{ t("pages.cases.contact.title") }}
          </h2>
          <p class="text-xl text-white/90 mb-8">
            {{ t("pages.cases.contact.description") }}
          </p>
          <UButton
            to="/contact"
            size="xl"
            :class="[
              'bg-white hover:bg-zinc-100',
              isOwnCompany(caseStudy.company)
                ? 'text-brand-600'
                : 'text-blue-600',
            ]"
          >
            {{ t("pages.cases.contact.button") }}
            <template #trailing>
              <UIcon name="i-lucide-arrow-right" class="w-5 h-5" />
            </template>
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
