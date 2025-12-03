<!-- components/MyHeader.vue -->
<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref, onMounted, onBeforeUnmount } from "vue";

const route = useRoute();
const { t } = useI18n();
const { getPersonal } = useRuneContent();
const personal = computed(() => getPersonal());

const navLinks = computed(() => [
  { label: t("portfolio.nav.home"), to: "/" },
  { label: t("portfolio.nav.cases"), to: "/cases" },
  { label: t("portfolio.nav.about"), to: "/about" },
  { label: t("portfolio.nav.contact"), to: "/contact" },
]);

// Scroll bar
const progressMax = 10000;
const scrollProgress = ref(0);

const updateScrollProgress = () => {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const scrollHeight = doc.scrollHeight - window.innerHeight;

  // Prevent division by zero on very short pages
  const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

  scrollProgress.value = Math.round(ratio * progressMax);
};

onMounted(() => {
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollProgress);
});
</script>

<template>
  <UHeader
    class="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-white/10 shadow-lg shadow-black/20"
    ><div
      class="absolute -bottom-4.5 left-0 right-0 w-full h-auto z-49 bg-transparent"
    >
      <progress
        id="progressBar"
        :value="scrollProgress"
        :max="progressMax"
        :aria-valuenow="scrollProgress"
        :aria-valuemin="0"
        :aria-valuemax="progressMax"
        aria-label="Page scroll progress"
        class="w-full h-3"
      ></progress>
    </div>
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-3 group smooth-hover">
        <span
          class="hidden sm:block text-xl font-extrabold tracking-widest text-white group-hover:text-brand-300 transition-colors"
        >
          {{ personal.full_name }}
        </span>
      </NuxtLink>
    </template>

    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center gap-1">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="relative px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 rounded-lg overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400 focus-visible:ring-offset-neutral-900"
        :class="
          route.path === link.to.replace('/#', '/')
            ? 'text-brand-300 bg-brand-500/10'
            : 'text-neutral-200 hover:text-white hover:bg-white/10'
        "
      >
        <span class="relative z-10 text-accent-50!">{{ link.label }}</span>
        <div
          v-if="route.path === link.to.replace('/#', '/')"
          class="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-brand-400 to-accent-400"
        ></div>
      </NuxtLink>
    </nav>

    <template #right>
      <LanguageSwitcher />
    </template>

    <!-- Mobile Navigation -->
    <template #body>
      <div class="space-y-3 p-4">
        <div class="flex flex-col gap-2">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
          :to="link.to"
          class="px-4 py-3 rounded-xl text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400 focus-visible:ring-offset-neutral-900"
          :class="
            route.path === link.to.replace('/#', '/')
              ? 'bg-brand-500/10 text-brand-300 border border-brand-500/20'
                : 'text-neutral-200 hover:text-white hover:bg-white/10'
            "
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </template>
  </UHeader>
</template>

<style lang="scss" scoped>
svg {
  path,
  circle {
    fill: var(--color-brand-500);
    transition: fill 0.3s ease;
  }
}

a:hover svg {
  path,
  circle {
    fill: var(--color-brand-400);
  }
}

// Progress bar background (the empty track)
progress {
  appearance: none;
  border: none;
  overflow: hidden;
}

// WebKit browsers (Chrome, Edge, Safari)
progress::-webkit-progress-bar {
  background-color: transparent;
}

// VALUE (the filled part)
progress::-webkit-progress-value {
  background: linear-gradient(
    to right,
    var(--color-brand-400),
    var(--color-accent-400)
  );
}

// Firefox
progress::-moz-progress-bar {
  background: linear-gradient(
    to right,
    var(--color-brand-400),
    var(--color-accent-400)
  );
}
</style>
