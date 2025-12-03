<!-- pages/cookies.vue -->
<script setup lang="ts">
const { t } = useI18n();

// SEO optimization
useSeo({
  title: t("pages.cookies.metaTitle"),
  description: t("pages.cookies.metaDescription"),
  keywords: [
    "cookie policy",
    "cookies",
    "privacy",
    "GDPR",
    "data protection",
    "local storage",
  ],
  type: "website",
});

// Cookie data with proper typing
interface CookieItem {
  name: string;
  purpose: string;
  type: string;
  duration: string;
}

// Essential cookies - hardcoded with i18n access by index
const essentialCookies = computed<CookieItem[]>(() => [
  {
    name: t("pages.cookies.sections.cookiesWeUse.essential.items.0.name"),
    purpose: t("pages.cookies.sections.cookiesWeUse.essential.items.0.purpose"),
    type: t("pages.cookies.sections.cookiesWeUse.essential.items.0.type"),
    duration: t(
      "pages.cookies.sections.cookiesWeUse.essential.items.0.duration"
    ),
  },
]);

// Preference storage items
const preferencesStorage = computed<CookieItem[]>(() => [
  {
    name: t("pages.cookies.sections.cookiesWeUse.preferences.items.0.name"),
    purpose: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.0.purpose"
    ),
    type: t("pages.cookies.sections.cookiesWeUse.preferences.items.0.type"),
    duration: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.0.duration"
    ),
  },
  {
    name: t("pages.cookies.sections.cookiesWeUse.preferences.items.1.name"),
    purpose: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.1.purpose"
    ),
    type: t("pages.cookies.sections.cookiesWeUse.preferences.items.1.type"),
    duration: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.1.duration"
    ),
  },
  {
    name: t("pages.cookies.sections.cookiesWeUse.preferences.items.2.name"),
    purpose: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.2.purpose"
    ),
    type: t("pages.cookies.sections.cookiesWeUse.preferences.items.2.type"),
    duration: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.2.duration"
    ),
  },
  {
    name: t("pages.cookies.sections.cookiesWeUse.preferences.items.3.name"),
    purpose: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.3.purpose"
    ),
    type: t("pages.cookies.sections.cookiesWeUse.preferences.items.3.type"),
    duration: t(
      "pages.cookies.sections.cookiesWeUse.preferences.items.3.duration"
    ),
  },
]);

// Technical details points
const technicalPoints = computed(() => [
  t("pages.cookies.sections.technicalDetails.points.0"),
  t("pages.cookies.sections.technicalDetails.points.1"),
  t("pages.cookies.sections.technicalDetails.points.2"),
  t("pages.cookies.sections.technicalDetails.points.3"),
  t("pages.cookies.sections.technicalDetails.points.4"),
]);
</script>

<template>
  <div class="container">
    <!-- Introduction -->
    <section class="mb-12">
      <p class="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {{ t("pages.cookies.intro") }}
      </p>
    </section>

    <!-- What Are Cookies -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {{ t("pages.cookies.sections.whatAreCookies.title") }}
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {{ t("pages.cookies.sections.whatAreCookies.content") }}
      </p>
    </section>

    <!-- Cookies We Use -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {{ t("pages.cookies.sections.cookiesWeUse.title") }}
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
        {{ t("pages.cookies.sections.cookiesWeUse.intro") }}
      </p>

      <!-- Essential Cookies Table -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
          {{ t("pages.cookies.sections.cookiesWeUse.essential.title") }}
        </h3>
        <p class="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
          {{ t("pages.cookies.sections.cookiesWeUse.essential.description") }}
        </p>

        <div
          class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700"
        >
          <table class="w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Purpose
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr
                v-for="(item, index) in essentialCookies"
                :key="index"
                class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <td
                  class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400"
                >
                  {{ item.name }}
                </td>
                <td class="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {{ item.purpose }}
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-zinc-600 dark:text-zinc-400 text-xs">
                  {{ item.duration }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Preferences Storage Table -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-3">
          {{ t("pages.cookies.sections.cookiesWeUse.preferences.title") }}
        </h3>
        <p class="text-zinc-600 dark:text-zinc-400 mb-4 text-sm">
          {{ t("pages.cookies.sections.cookiesWeUse.preferences.description") }}
        </p>

        <div
          class="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700"
        >
          <table class="w-full text-sm">
            <thead class="bg-zinc-50 dark:bg-zinc-800/50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Purpose
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Type
                </th>
                <th
                  scope="col"
                  class="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-zinc-100"
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 dark:divide-zinc-700">
              <tr
                v-for="(item, index) in preferencesStorage"
                :key="index"
                class="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <td
                  class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400"
                >
                  {{ item.name }}
                </td>
                <td class="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                  {{ item.purpose }}
                </td>
                <td class="px-4 py-3">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td class="px-4 py-3 text-zinc-600 dark:text-zinc-400 text-xs">
                  {{ item.duration }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- No Tracking Notice -->
    <section
      class="mb-12 p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
    >
      <div class="flex items-start gap-3">
        <UIcon
          name="i-lucide-shield-check"
          class="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5"
        />
        <div>
          <h2 class="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
            {{ t("pages.cookies.sections.noTracking.title") }}
          </h2>
          <p class="text-green-800 dark:text-green-200 leading-relaxed">
            {{ t("pages.cookies.sections.noTracking.content") }}
          </p>
        </div>
      </div>
    </section>

    <!-- Technical Details -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {{ t("pages.cookies.sections.technicalDetails.title") }}
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
        {{ t("pages.cookies.sections.technicalDetails.content") }}
      </p>
      <ul class="space-y-2 ml-6">
        <li
          v-for="(point, index) in technicalPoints"
          :key="index"
          class="flex items-start gap-3"
        >
          <UIcon
            name="i-lucide-check"
            class="w-5 h-5 text-brand-500 shrink-0 mt-0.5"
          />
          <span class="text-zinc-700 dark:text-zinc-300">{{ point }}</span>
        </li>
      </ul>
    </section>

    <!-- Your Control -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {{ t("pages.cookies.sections.control.title") }}
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
        {{ t("pages.cookies.sections.control.intro") }}
      </p>

      <div class="space-y-6">
        <div>
          <h3
            class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2"
          >
            {{ t("pages.cookies.sections.control.localStorage.title") }}
          </h3>
          <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {{ t("pages.cookies.sections.control.localStorage.content") }}
          </p>
        </div>

        <div>
          <h3
            class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2"
          >
            {{ t("pages.cookies.sections.control.cookies.title") }}
          </h3>
          <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
            {{ t("pages.cookies.sections.control.cookies.content") }}
          </p>
          <ul class="space-y-2 ml-4">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-2"
              >
                Google Chrome
                <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-2"
              >
                Mozilla Firefox
                <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-2"
              >
                Safari
                <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                class="text-brand-600 dark:text-brand-400 hover:underline inline-flex items-center gap-2"
              >
                Microsoft Edge
                <UIcon name="i-lucide-external-link" class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-2"
          >
            {{ t("pages.cookies.sections.control.noImpact.title") }}
          </h3>
          <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {{ t("pages.cookies.sections.control.noImpact.content") }}
          </p>
        </div>
      </div>
    </section>

    <!-- GDPR Compliance -->
    <section
      class="mb-12 p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
    >
      <h2 class="text-xl font-bold text-blue-900 dark:text-blue-100 mb-3">
        {{ t("pages.cookies.sections.gdprCompliance.title") }}
      </h2>
      <p class="text-blue-800 dark:text-blue-200 leading-relaxed">
        {{ t("pages.cookies.sections.gdprCompliance.content") }}
      </p>
    </section>

    <!-- Changes to Policy -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {{ t("pages.cookies.sections.changes.title") }}
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {{ t("pages.cookies.sections.changes.content") }}
      </p>
    </section>

    <!-- Contact -->
    <section>
      <h2 class="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
        {{ t("pages.cookies.sections.contact.title") }}
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-2">
        {{ t("pages.cookies.sections.contact.content") }}
      </p>
      <a
        href="mailto:hello@runepjetursson.com"
        class="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-medium"
      >
        <UIcon name="i-lucide-mail" class="w-4 h-4" />
        hello@runepjetursson.com
      </a>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1440px;
  padding: 25px;
}
</style>
