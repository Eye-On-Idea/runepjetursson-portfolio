<!-- components/MyHeader.vue -->
<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

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
</script>

<template>
  <UHeader
    class="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-white/10 shadow-lg shadow-black/20"
  >
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
        class="relative px-4 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 rounded-lg overflow-hidden group"
        :class="
          route.path === link.to.replace('/#', '/')
            ? 'text-brand-300 bg-brand-500/10'
            : 'text-neutral-200 hover:text-white hover:bg-white/10'
        "
      >
        <span class="relative z-10">{{ link.label }}</span>
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
            class="px-4 py-3 rounded-xl text-base font-bold transition-all duration-300"
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
</style>
