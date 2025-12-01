<!-- components/landing/OnPageNavigation.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface NavigationItem {
  id: string;
  label: string;
  description: string;
}

const { t } = useI18n();

const navigationItems = computed<NavigationItem[]>(() => [
  {
    id: "hero",
    label: t("landing.nav.hero"),
    description: t("landing.nav.heroDesc"),
  },
  {
    id: "ecosystem",
    label: t("landing.nav.ecosystem"),
    description: t("landing.nav.ecosystemDesc"),
  },

  {
    id: "vision",
    label: t("landing.nav.vision"),
    description: t("landing.nav.visionDesc"),
  },
  {
    id: "full-ecosystem",
    label: t("landing.nav.fullEcosystem"),
    description: t("landing.nav.fullEcosystemDesc"),
  },
  {
    id: "valor-system",
    label: t("landing.nav.valorSystem"),
    description: t("landing.nav.valorSystemDesc"),
  },
]);

const activeSection = ref<string>("hero");
const hoveredItem = ref<string | null>(null);

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Track active section based on scroll position
const updateActiveSection = () => {
  const sections = navigationItems.value.map((item) => item.id);
  const scrollPosition = window.scrollY + window.innerHeight / 3;

  for (let i = sections.length - 1; i >= 0; i--) {
    const element = document.getElementById(sections[i]);
    if (element && element.offsetTop <= scrollPosition) {
      activeSection.value = sections[i];
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateActiveSection);
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveSection);
});
</script>

<template>
  <nav
    class="fixed left-16 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
    aria-label="On-page navigation"
  >
    <div class="relative p-4 rounded-2xl">
      <!-- Vertical line -->
      <div
        class="absolute left-6 top-8 bottom-8 w-0.5 bg-linear-to-b from-brand-500/20 via-brand-400/40 to-brand-500/20"
        aria-hidden="true"
      />

      <ul class="relative space-y-6 flex flex-col gap-5">
        <li v-for="item in navigationItems" :key="item.id" class="relative">
          <button
            @click="scrollToSection(item.id)"
            @mouseenter="hoveredItem = item.id"
            @mouseleave="hoveredItem = null"
            class="group relative flex items-start gap-3 text-left transition-all duration-300"
            :aria-label="`Navigate to ${item.label}`"
            :aria-current="activeSection === item.id ? 'location' : undefined"
          >
            <!-- Indicator dot -->
            <div
              class="relative flex items-center justify-center w-4 h-4 mt-1 shrink-0"
            >
              <div
                class="absolute w-4 h-4 rounded-full transition-all duration-300"
                :class="
                  activeSection === item.id
                    ? 'bg-brand-400 dark:bg-brand-400 ring-4 ring-brand-400/20'
                    : hoveredItem === item.id
                    ? 'bg-brand-500/60 dark:bg-brand-500/60 ring-2 ring-brand-500/30'
                    : 'bg-zinc-400/40 dark:bg-zinc-600/40'
                "
              />
              <div
                v-if="activeSection === item.id"
                class="absolute w-2 h-2 rounded-full bg-white animate-pulse"
                aria-hidden="true"
              />
            </div>

            <!-- Text content -->
            <div class="flex-1 min-w-0 overflow-hidden">
              <div
                class="text-sm font-medium transition-all duration-900 whitespace-nowrap"
                :class="
                  activeSection === item.id
                    ? 'text-brand-400 dark:text-brand-400 font-bold'
                    : hoveredItem === item.id
                    ? 'text-brand-400 dark:text-brand-400'
                    : 'text-zinc-500 dark:text-zinc-400'
                "
              >
                {{ item.label }}
              </div>

              <!-- Description (shown on hover) -->
              <Transition
                enter-active-class="transition-all duration-400 ease-out"
                enter-from-class="opacity-0 -translate-y-1 max-h-0"
                enter-to-class="opacity-100 translate-y-0 max-h-20"
                leave-active-class="transition-all duration-400 ease-in"
                leave-from-class="opacity-100 translate-y-0 max-h-20"
                leave-to-class="opacity-0 -translate-y-1 max-h-0"
              >
                <p
                  v-if="hoveredItem === item.id"
                  class="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-tight"
                >
                  {{ item.description }}
                </p>
              </Transition>
            </div>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Ensure smooth transitions for description height */
.max-h-0 {
  max-height: 0;
}

.max-h-20 {
  max-height: 5rem;
}
</style>
