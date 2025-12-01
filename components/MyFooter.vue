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

const companyLinks = [{ name: "Om mig", href: "/about" }];

const supportLinks = [{ name: "Kontakt", href: "/contact" }];

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
  <footer
    class="relative bg-neutral-950 border-t border-white/10 overflow-hidden"
  >
    <!-- Decorative background gradient -->
    <div class="absolute inset-0 pointer-events-none opacity-10">
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-brand-500/30"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-accent-500/30"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-4 mb-6 group">
            <span
              class="text-2xl font-extrabold tracking-widest text-white uppercase group-hover:text-brand-300 transition-colors"
            >
              {{ personal.full_name }}
            </span>
          </div>
          <p class="text-neutral-300 text-lg mb-8 max-w-sm leading-relaxed">
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
              class="group flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all duration-300 smooth-hover"
              :aria-label="social.name"
            >
              <UIcon
                :name="social.icon"
                class="w-6 h-6 text-neutral-300 group-hover:text-brand-300 transition-colors"
              />
            </a>
          </div>
        </div>

        <!-- Ecosystem Links -->
        <div>
          <h3
            class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] mb-5"
          >
            Sektioner
          </h3>
          <ul class="space-y-3">
            <li v-for="link in ecosystemLinks" :key="link.name">
              <a
                :href="link.href"
                class="group text-neutral-300 hover:text-white transition-colors duration-300 text-base font-medium flex items-center gap-2"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-brand-400 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Company Links -->
        <div>
          <h3
            class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] mb-5"
          >
            Om
          </h3>
          <ul class="space-y-3">
            <li v-for="link in companyLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="group text-neutral-300 hover:text-white transition-colors duration-300 text-base font-medium flex items-center gap-2"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-brand-400 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h3
            class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] mb-5"
          >
            Kontakt
          </h3>
          <ul class="space-y-3">
            <li v-for="link in supportLinks" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="group text-neutral-300 hover:text-white transition-colors duration-300 text-base font-medium flex items-center gap-2"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-brand-400 opacity-0 group-hover:opacity-100 transition-opacity"
                ></span>
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
        class="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <p class="text-base text-neutral-400 font-medium">
          © {{ currentYear }}
          <span class="text-white font-bold">{{ personal.full_name }}</span> ·
          {{ personal.company_freelance }}
        </p>

        <div class="flex flex-wrap gap-8">
          <NuxtLink
            v-for="link in legalLinks"
            :key="link.name"
            :to="link.href"
            class="text-base text-neutral-400 hover:text-brand-300 transition-colors duration-300 font-medium"
          >
            {{ link.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
