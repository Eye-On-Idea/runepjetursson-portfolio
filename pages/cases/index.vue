<!-- pages/cases.vue -->
<script setup lang="ts">
const { t, tm } = useI18n();

interface CaseStudy {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  company: string;
  role?: string;
  year: string;
  duration?: string;
  url?: string;
  thumbnail?: string;
  tags?: string[];
  category?: "myCompanies" | "clientWork" | "sideProjects" | string;
}

const config = useRuntimeConfig();
const baseUrl = config.public.siteUrl || "https://runepjetursson.com";

// SEO optimization
useSeo({
  title: t("pages.cases.metaTitle"),
  description: t("pages.cases.metaDescription"),
  keywords: [
    "portfolio",
    "case studies",
    "web development",
    "UX/UI design",
    "digital product design",
    "projects",
    "Eye On Idea",
    "Herqulez",
    "client work",
  ],
  type: "website",
  breadcrumbs: [
    { name: "Home", url: `${baseUrl}` },
    { name: t("pages.cases.metaTitle"), url: `${baseUrl}/cases` },
  ],
});

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

// Filter state
const selectedFilter = ref("all");

// Filtered case studies
const filteredCases = computed<CaseStudy[]>(() => {
  if (selectedFilter.value === "all") {
    return caseStudies.value;
  }
  return caseStudies.value.filter((caseStudy) =>
    (caseStudy.tags || []).some((tag: string) =>
      tag.toLowerCase().includes(selectedFilter.value.toLowerCase())
    )
  );
});

// Group cases by category
type CaseGroups = {
  myCompanies: CaseStudy[];
  clientWork: CaseStudy[];
  sideProjects: CaseStudy[];
  [key: string]: CaseStudy[];
};

const groupedCases = computed<CaseGroups>(() => {
  const groups: CaseGroups = {
    myCompanies: [],
    clientWork: [],
    sideProjects: [],
  };

  filteredCases.value.forEach((caseStudy) => {
    const category = caseStudy.category || "clientWork";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(caseStudy);
  });

  return groups;
});

// Get badge label for company
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
  type: "border" | "text" | "bg" | "shadow"
) => {
  const isOwn = isOwnCompany(company);

  if (type === "border") {
    return isOwn
      ? "hover:border-brand-500 dark:hover:border-brand-500"
      : "hover:border-blue-500 dark:hover:border-blue-500";
  }
  if (type === "text") {
    return isOwn
      ? "group-hover:text-brand-600 dark:group-hover:text-brand-400"
      : "group-hover:text-blue-600 dark:group-hover:text-blue-400";
  }
  if (type === "bg") {
    return isOwn
      ? "bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 border-brand-500/20"
      : "bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/20";
  }
  if (type === "shadow") {
    return isOwn ? "hover:shadow-brand-500/10" : "hover:shadow-blue-500/10";
  }
  return "";
};
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950">
    <!-- Hero Section -->
    <section
      class="relative bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
    >
      <!-- Decorative background -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute w-96 h-96 -top-48 -right-48 rounded-full blur-3xl bg-linear-to-br from-brand-500 to-accent-500"
        />
        <div
          class="absolute w-96 h-96 -bottom-48 -left-48 rounded-full blur-3xl bg-linear-to-br from-accent-500 to-brand-500"
        />
      </div>

      <div class="relative max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <div
            class="inline-block px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-500/20 mb-6"
          >
            <span
              class="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider"
            >
              Portfolio
            </span>
          </div>
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6"
          >
            {{ t("pages.cases.hero.title") }}
          </h1>
          <p
            class="text-xl md:text-2xl text-brand-600 dark:text-brand-400 font-medium mb-4"
          >
            {{ t("pages.cases.hero.subtitle") }}
          </p>
          <p class="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {{ t("pages.cases.hero.description") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Cases Grid -->
    <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- Filter Pills (Optional - commented out for now)
      <div class="flex flex-wrap gap-3 mb-12 justify-center">
        <button
          v-for="filter in ['all', 'webDev', 'uxui', 'branding', 'seo']"
          :key="filter"
          @click="selectedFilter = filter"
          :class="[
            'px-6 py-3 rounded-full font-medium transition-all duration-200',
            selectedFilter === filter
              ? 'bg-brand-500 text-white'
              : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
          ]"
        >
          {{ t(`pages.cases.filter.${filter}`) }}
        </button>
      </div>
      -->

      <!-- My Companies Section -->
      <div v-if="groupedCases.myCompanies.length > 0" class="mb-20">
        <div class="mb-8">
          <h2
            class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2"
          >
            {{ t("pages.cases.categories.myCompanies") }}
          </h2>
          <div
            class="h-1 w-20 bg-linear-to-r from-brand-500 to-accent-500 rounded-full"
          ></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="caseStudy in groupedCases.myCompanies"
            :key="caseStudy.id"
            :to="`/cases/${caseStudy.slug}`"
            :class="[
              'group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900',
              getColorClasses(caseStudy.company, 'border'),
              getColorClasses(caseStudy.company, 'shadow'),
            ]"
          >
            <!-- Thumbnail Logo -->
            <div
              class="relative aspect-16/10 bg-zinc-900 dark:bg-zinc-950 overflow-hidden flex items-center justify-center p-8"
            >
              <img
                :src="caseStudy.thumbnail"
                :alt="`${caseStudy.title} logo`"
                :class="[
                  'w-full h-full object-contain transition-transform group-hover:scale-105',
                  caseStudy.company === 'Herqulez'
                    ? 'max-w-[60%]'
                    : 'max-w-[70%]',
                ]"
              />
              <div class="absolute top-4 right-4">
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border',
                    getColorClasses(caseStudy.company, 'bg'),
                  ]"
                >
                  {{ getBadgeLabel(caseStudy.company) }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3
                :class="[
                  'text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 transition-colors',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ caseStudy.title }}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {{ caseStudy.subtitle }}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in (caseStudy.tags || []).slice(0, 3)"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  {{ tag }}
                </span>
              </div>

              <div
                class="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800"
              >
                <span>{{ caseStudy.year }}</span>
                <span class="flex items-center gap-2">
                  {{ t("pages.cases.cta.viewCase") }}
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Client Work Section -->
      <div v-if="groupedCases.clientWork.length > 0" class="mb-20">
        <div class="mb-8">
          <h2
            class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2"
          >
            {{ t("pages.cases.categories.clientWork") }}
          </h2>
          <div
            class="h-1 w-20 bg-linear-to-r from-blue-500 to-blue-600 rounded-full"
          ></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="caseStudy in groupedCases.clientWork"
            :key="caseStudy.id"
            :to="`/cases/${caseStudy.slug}`"
            :class="[
              'group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900',
              getColorClasses(caseStudy.company, 'border'),
              getColorClasses(caseStudy.company, 'shadow'),
            ]"
          >
            <div
              class="relative aspect-16/10 bg-zinc-900 dark:bg-zinc-950 overflow-hidden flex items-center justify-center p-8"
            >
              <img
                :src="caseStudy.thumbnail"
                :alt="`${caseStudy.title} logo`"
                :class="[
                  'w-full h-full object-contain transition-transform group-hover:scale-105',
                  caseStudy.company === 'Herqulez'
                    ? 'max-w-[60%]'
                    : 'max-w-[70%]',
                ]"
              />
              <div class="absolute top-4 right-4">
                <span
                  :class="[
                    'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border',
                    getColorClasses(caseStudy.company, 'bg'),
                  ]"
                >
                  {{ getBadgeLabel(caseStudy.company) }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3
                :class="[
                  'text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 transition-colors',
                  getColorClasses(caseStudy.company, 'text'),
                ]"
              >
                {{ caseStudy.title }}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {{ caseStudy.subtitle }}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in (caseStudy.tags || []).slice(0, 3)"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  {{ tag }}
                </span>
              </div>

              <div
                class="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800"
              >
                <span>{{ caseStudy.year }}</span>
                <span class="flex items-center gap-2">
                  {{ t("pages.cases.cta.viewCase") }}
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Side Projects Section -->
      <div v-if="groupedCases.sideProjects.length > 0" class="mb-20">
        <div class="mb-8">
          <h2
            class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2"
          >
            {{ t("pages.cases.categories.sideProjects") }}
          </h2>
          <div
            class="h-1 w-20 bg-linear-to-r from-purple-500 to-pink-500 rounded-full"
          ></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="caseStudy in groupedCases.sideProjects"
            :key="caseStudy.id"
            :to="`/cases/${caseStudy.slug}`"
            class="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-purple-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
          >
            <div
              class="relative aspect-16/10 bg-zinc-900 dark:bg-zinc-950 overflow-hidden flex items-center justify-center p-8"
            >
              <img
                :src="caseStudy.thumbnail"
                :alt="`${caseStudy.title} logo`"
                class="w-full h-full object-contain transition-transform group-hover:scale-105 max-w-[70%]"
              />
              <div class="absolute top-4 right-4">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-purple-500/20 text-purple-700 dark:text-purple-300"
                >
                  {{ getBadgeLabel(caseStudy.company) }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3
                class="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400"
              >
                {{ caseStudy.title }}
              </h3>
              <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                {{ caseStudy.subtitle }}
              </p>

              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in (caseStudy.tags || []).slice(0, 3)"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                >
                  {{ tag }}
                </span>
              </div>

              <div
                class="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500 pt-4 border-t border-zinc-200 dark:border-zinc-800"
              >
                <span>{{ caseStudy.year }}</span>
                <span class="flex items-center gap-2">
                  {{ t("pages.cases.cta.viewCase") }}
                  <UIcon
                    name="i-lucide-arrow-right"
                    class="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCases.length === 0" class="text-center py-16">
        <UIcon
          name="i-lucide-folder-search"
          class="w-16 h-16 text-zinc-400 dark:text-zinc-600 mx-auto mb-4"
        />
        <p class="text-lg text-zinc-600 dark:text-zinc-400">
          No case studies found for this filter.
        </p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-6 md:px-12 py-16 mb-16">
      <div
        class="relative bg-linear-to-br from-brand-500 to-accent-500 rounded-3xl p-12 md:p-16 overflow-hidden"
      >
        <!-- Decorative elements -->
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
            color="primary"
            variant="solid"
            class="text-brand-50! hover:bg-zinc-900!"
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
