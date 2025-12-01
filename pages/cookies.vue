<!-- pages/cookies.vue -->
<script setup lang="ts">
const { t } = useI18n()

// SEO optimization
useSeo({
  title: t('legal.cookies.metaTitle'),
  description: t('legal.cookies.metaDescription'),
  keywords: ['cookie policy', 'cookies', 'tracking', 'privacy settings', 'cookie consent', 'data collection'],
  type: 'website',
})
</script>

<template>
  <LegalLegalPageLayout
    :title="t('legal.cookies.title')"
    :last-updated="t('legal.cookies.lastUpdated')"
  >
    <section>
      <p class="text-lg text-zinc-700 dark:text-zinc-300 mb-8">
        {{ t('legal.cookies.intro') }}
      </p>

      <h2>{{ t('legal.cookies.sections.whatAreCookies.title') }}</h2>
      <p>{{ t('legal.cookies.sections.whatAreCookies.content') }}</p>

      <h2>{{ t('legal.cookies.sections.howWeUse.title') }}</h2>
      <p>{{ t('legal.cookies.sections.howWeUse.content') }}</p>

      <h2>{{ t('legal.cookies.sections.typesOfCookies.title') }}</h2>

      <h3>{{ t('legal.cookies.sections.typesOfCookies.essential.title') }}</h3>
      <p>{{ t('legal.cookies.sections.typesOfCookies.essential.content') }}</p>
      <ul>
        <li>{{ t('legal.cookies.sections.typesOfCookies.essential.items.auth') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.essential.items.security') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.essential.items.preferences') }}</li>
      </ul>

      <h3>{{ t('legal.cookies.sections.typesOfCookies.analytics.title') }}</h3>
      <p>{{ t('legal.cookies.sections.typesOfCookies.analytics.content') }}</p>
      <ul>
        <li>{{ t('legal.cookies.sections.typesOfCookies.analytics.items.usage') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.analytics.items.performance') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.analytics.items.errors') }}</li>
      </ul>

      <h3>{{ t('legal.cookies.sections.typesOfCookies.functional.title') }}</h3>
      <p>{{ t('legal.cookies.sections.typesOfCookies.functional.content') }}</p>
      <ul>
        <li>{{ t('legal.cookies.sections.typesOfCookies.functional.items.language') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.functional.items.theme') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.functional.items.customization') }}</li>
      </ul>

      <h3>{{ t('legal.cookies.sections.typesOfCookies.marketing.title') }}</h3>
      <p>{{ t('legal.cookies.sections.typesOfCookies.marketing.content') }}</p>
      <ul>
        <li>{{ t('legal.cookies.sections.typesOfCookies.marketing.items.targeting') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.marketing.items.retargeting') }}</li>
        <li>{{ t('legal.cookies.sections.typesOfCookies.marketing.items.social') }}</li>
      </ul>

      <h2>{{ t('legal.cookies.sections.thirdParty.title') }}</h2>
      <p>{{ t('legal.cookies.sections.thirdParty.content') }}</p>
      <ul>
        <li><strong>Google Analytics:</strong> {{ t('legal.cookies.sections.thirdParty.items.analytics') }}</li>
        <li><strong>{{ t('legal.cookies.sections.thirdParty.items.social.title') }}</strong> {{ t('legal.cookies.sections.thirdParty.items.social.content') }}</li>
      </ul>

      <h2>{{ t('legal.cookies.sections.control.title') }}</h2>
      <p>{{ t('legal.cookies.sections.control.content') }}</p>

      <h3>{{ t('legal.cookies.sections.control.browser.title') }}</h3>
      <p>{{ t('legal.cookies.sections.control.browser.content') }}</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" class="text-brand-600 dark:text-brand-400 hover:underline">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" class="text-brand-600 dark:text-brand-400 hover:underline">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" class="text-brand-600 dark:text-brand-400 hover:underline">Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" class="text-brand-600 dark:text-brand-400 hover:underline">Microsoft Edge</a></li>
      </ul>

      <h3>{{ t('legal.cookies.sections.control.optOut.title') }}</h3>
      <p>{{ t('legal.cookies.sections.control.optOut.content') }}</p>

      <h2>{{ t('legal.cookies.sections.changes.title') }}</h2>
      <p>{{ t('legal.cookies.sections.changes.content') }}</p>

      <h2>{{ t('legal.cookies.sections.contact.title') }}</h2>
      <p>
        {{ t('legal.cookies.sections.contact.content') }}
        <a href="mailto:privacy@herqulez.com" class="text-brand-600 dark:text-brand-400 hover:underline">
          privacy@herqulez.com
        </a>
      </p>
    </section>
  </LegalLegalPageLayout>
</template>
