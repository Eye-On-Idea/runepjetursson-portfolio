<!-- components/MyFooter.vue -->
<script setup lang="ts">
const currentYear = new Date().getFullYear();
const { getPersonal, getHeadline, getContactCta } = useRuneContent();
const personal = computed(() => getPersonal());
const headline = computed(() => getHeadline());

const ecosystemLinks = [
  { name: "Ydelser", href: "/#services" },
  { name: "Projekter", href: "/#projects" },
  { name: "Erfaring", href: "/#experience" },
];

const companyLinks = [
  { name: "Om mig", href: "/about" },
];

const supportLinks = [
  { name: "Kontakt", href: "/contact" },
];

const legalLinks = [];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: "i-lucide-linkedin",
    href: "https://www.linkedin.com/in/rune-m-p-pjetursson-361870115/",
  },
  {
    name: "Mail",
    icon: "i-lucide-mail",
    href: "mailto:hello@runepjetursson.com",
  },
];
</script>

<template>
  <footer class="bg-zinc-900 dark:bg-zinc-900 border-t border-zinc-800">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
            >
              <img
                src="/assets/logo/logosvg_sunrise.svg"
                alt="Rune Pjetursson logo"
                class="w-8 h-8"
              />
            </div>
            <span
              class="text-2xl font-extrabold tracking-widest text-brand-50 uppercase"
            >
              {{ personal.full_name }}
            </span>
          </div>
          <p class="text-zinc-400 mb-6 max-w-sm leading-relaxed">
            {{ headline.short }}
          </p>

          <!-- Social Links -->
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group"
              :aria-label="social.name"
            >
              <UIcon :name="social.icon" class="size-6" />
            </a>
          </div>
        </div>

        <!-- Ecosystem Links -->
        <div>
          <h3
            class="text-sm font-bold text-brand-200 uppercase tracking-wider mb-4"
          >
            Sektioner
          </h3>
          <ul class="space-y-3">
            <li v-for="link in ecosystemLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-zinc-400 hover:text-brand-300 transition-colors duration-200 text-sm"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3
            class="text-sm font-bold text-brand-200 uppercase tracking-wider mb-4"
          >
            Om
          </h3>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-zinc-400 hover:text-brand-300 transition-colors duration-200 text-sm"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3
            class="text-sm font-bold text-brand-200 uppercase tracking-wider mb-4"
          >
            Kontakt
          </h3>
          <ul class="space-y-3">
            <li v-for="link in supportLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-zinc-400 hover:text-brand-300 transition-colors duration-200 text-sm"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Newsletter Section 
      <div class="py-8 border-t border-zinc-800">
        <div class="max-w-md">
          <h3 class="text-lg font-bold text-brand-100 mb-2">
            {{ t("footer.newsletter.title") }}
          </h3>
          <p class="text-sm text-zinc-400 mb-4">
            {{ t("footer.newsletter.description") }}
          </p>
          <form class="flex gap-2" @submit.prevent>
            <input
              type="email"
              :placeholder="t('footer.newsletter.placeholder')"
              class="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all text-sm"
            />
            <UButton type="submit" color="primary" size="md" class="shrink-0">
              {{ t("footer.newsletter.subscribe") }}
            </UButton>
          </form>
        </div>
      </div>
      -->
      <!-- Bottom Bar -->
      <div
        class="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-sm text-zinc-500">
          © {{ currentYear }} {{ personal.full_name }} · {{ personal.company_freelance }}
        </p>

        <div class="flex flex-wrap gap-6">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.name"
            :to="link.href"
            class="text-sm text-zinc-500 hover:text-brand-300 transition-colors duration-200"
          >
            {{ t(link.name) }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
