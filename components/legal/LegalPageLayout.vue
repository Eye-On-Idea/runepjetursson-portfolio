<!-- components/legal/LegalPageLayout.vue -->
<script setup lang="ts">
interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface Props {
  title: string;
  lastUpdated?: string;
  tableOfContents?: TableOfContentsItem[];
}

const props = defineProps<Props>();

const { t } = useI18n();

// Active section tracking for scroll spy
const activeSection = ref("");

// Smooth scroll to section
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Simple scroll spy
onMounted(() => {
  if (typeof window !== "undefined" && props.tableOfContents) {
    const handleScroll = () => {
      const sections =
        props.tableOfContents
          ?.map((item) => document.getElementById(item.id))
          .filter(Boolean) || [];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            activeSection.value = section.id;
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900"
  >
    <!-- Header -->
    <div
      class="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800"
    >
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <span class="i-lucide-arrow-left h-4 w-4" />
            {{ t("common.back") }}
          </NuxtLink>

          <div v-if="lastUpdated" class="flex items-center gap-3">
            <span
              class="text-xs text-zinc-500 dark:text-zinc-400 hidden sm:block"
            >
              {{ t("legal.lastUpdated") }}: {{ lastUpdated }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div
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

      <div
        class="relative max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 text-center"
      >
        <div
          class="inline-block px-4 py-2 bg-brand-500/10 dark:bg-brand-500/20 rounded-full border border-brand-500/20 mb-6"
        >
          <span
            class="text-xs font-semibold text-brand-700 dark:text-brand-300 uppercase tracking-wider"
          >
            Legal
          </span>
        </div>
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-brand-50 mb-4"
        >
          {{ title }}
        </h1>
        <p v-if="lastUpdated" class="text-sm text-zinc-600 dark:text-zinc-400 sm:hidden">
          {{ t("legal.lastUpdated") }}: {{ lastUpdated }}
        </p>
      </div>
    </div>

    <!-- Content Layout -->
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
      <div class="flex gap-12">
        <!-- Table of Contents Sidebar (Desktop) -->
        <aside
          v-if="tableOfContents && tableOfContents.length > 0"
          class="hidden lg:block w-64 shrink-0"
        >
          <div class="sticky top-32">
            <div
              class="p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10"
            >
              <h2
                class="text-sm font-bold text-zinc-900 dark:text-brand-100 uppercase tracking-wider mb-4"
              >
                {{ t("legal.tableOfContents") }}
              </h2>
              <nav class="space-y-2">
                <a
                  v-for="item in tableOfContents"
                  :key="item.id"
                  @click.prevent="scrollToSection(item.id)"
                  :class="[
                    'block text-sm py-2 px-3 rounded-lg transition-all duration-200 cursor-pointer',
                    item.level === 3 ? 'pl-6' : '',
                    activeSection === item.id
                      ? 'bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 font-medium'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800',
                  ]"
                >
                  {{ item.title }}
                </a>
              </nav>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <article class="prose prose-zinc dark:prose-invert max-w-none">
            <div
              class="p-8 md:p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <slot />
            </div>
          </article>

          <!-- Bottom Navigation -->
          <div
            class="mt-12 p-6 bg-linear-to-br from-brand-500/5 to-accent-500/5 dark:from-brand-500/10 dark:to-accent-500/10 rounded-2xl border border-brand-500/10 dark:border-brand-500/20"
          >
            <div
              class="flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div>
                <h3
                  class="text-lg font-bold text-zinc-900 dark:text-brand-100 mb-1"
                >
                  {{ t("legal.questions") }}
                </h3>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">
                  {{ t("legal.questionsDesc") }}
                </p>
              </div>
              <UButton to="/contact" color="primary" size="lg" class="shrink-0">
                {{ t("legal.contactUs") }}
                <template #trailing>
                  <span class="i-lucide-arrow-right h-4 w-4" />
                </template>
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom prose styles for better readability */
:deep(.prose) {
  @apply text-zinc-800 dark:text-zinc-200;
}

:deep(.prose h2) {
  @apply text-3xl font-extrabold text-zinc-900 dark:text-brand-50 mt-16 mb-6 pb-3 border-b border-zinc-200 dark:border-zinc-800 scroll-mt-32;
}

:deep(.prose h3) {
  @apply text-xl font-bold text-zinc-900 dark:text-brand-100 mt-10 mb-4 scroll-mt-32;
}

:deep(.prose p) {
  @apply text-base leading-relaxed mb-6 text-zinc-700 dark:text-zinc-300;
}

:deep(.prose ul) {
  @apply list-none pl-0 mb-6 space-y-3;
}

:deep(.prose ol) {
  @apply list-decimal pl-6 mb-6 space-y-3;
}

:deep(.prose li) {
  @apply text-zinc-700 dark:text-zinc-300 pl-8 relative;
}

:deep(.prose ul li::before) {
  content: "";
  @apply absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-brand-500;
}

:deep(.prose strong) {
  @apply font-semibold text-zinc-900 dark:text-brand-100;
}

:deep(.prose a) {
  @apply text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 underline decoration-brand-500/30 hover:decoration-brand-500 transition-all;
}

:deep(.prose code) {
  @apply bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-sm font-mono;
}

:deep(.prose .text-lg) {
  @apply text-lg font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed;
}
</style>
