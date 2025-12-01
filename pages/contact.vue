<script setup lang="ts">
import GlassCard from "~/components/GlassCard.vue";
import ContactMyContactForm from "~/components/contact/MyContactForm.vue";

const { getPersonal, getContactCta } = useRuneContent();
const { t } = useI18n();
const personal = computed(() => getPersonal());
const contact = computed(() => getContactCta());

useSeo({
  title: `${personal.value.full_name} – ${t(
    "portfolio.sections.contact.title"
  )}`,
  description: contact.value.body,
  type: "profile",
});

const methods = computed(() => [
  {
    label: "E-mail",
    value: "hello@runepjetursson.com",
    icon: "i-lucide-mail",
    link: "mailto:hello@runepjetursson.com",
    description: t("portfolio.sections.contact.emailDesc"),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/rune-m-p-pjetursson-361870115",
    icon: "i-lucide-linkedin",
    link: "https://www.linkedin.com/in/rune-m-p-pjetursson-361870115/",
    description: t("portfolio.sections.contact.linkedinDesc"),
  },
]);
</script>

<template>
  <div class="min-h-screen bg-neutral-950 text-neutral-50 overflow-hidden">
    <!-- Animated background gradients -->
    <div class="fixed inset-0 pointer-events-none opacity-15">
      <div
        class="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-brand-500/40 animate-[pulse-slow_9s_ease-in-out_infinite]"
      />
      <div
        class="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] bg-accent-500/30 animate-[pulse-slow_11s_ease-in-out_infinite]"
      />
    </div>

    <div
      class="relative max-w-6xl mx-auto px-5 sm:px-6 md:px-10 lg:px-12 py-12 md:py-20 space-y-12 md:space-y-16"
    >
      <!-- Header -->
      <header class="space-y-6 text-center max-w-3xl mx-auto">
        <div class="inline-block">
          <p
            class="text-sm font-bold text-brand-300 uppercase tracking-[0.12em] px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20"
          >
            {{ personal.company_freelance }}
          </p>
        </div>
        <h1
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
        >
          {{ contact.heading }}
        </h1>
        <p class="text-xl md:text-2xl text-neutral-200 leading-relaxed">
          {{ contact.body }}
        </p>
      </header>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Left Column - Info & Methods -->
        <div class="space-y-8">
          <!-- Preferred Collaborations -->
          <GlassCard
            :displacement-scale="40"
            :blur-amount="0.07"
            :corner-radius="20"
            wrapper-class="p-8 rounded-2xl bg-white/5 border border-white/10 space-y-6 glass-card-hover"
          >
            <div class="flex items-center gap-3">
              <h2 class="text-xl! font-bold text-white mb-2">
                {{ t("portfolio.sections.contact.preferred") }}
              </h2>
            </div>
            <ul class="space-y-4">
              <li
                v-for="item in contact.preferred_collaborations"
                :key="item"
                class="flex gap-3 items-start"
              >
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-5 h-5 text-brand-400 shrink-0 mt-0.5"
                />
                <span class="text-base text-neutral-200">{{ item }}</span>
              </li>
            </ul>
          </GlassCard>

          <!-- Contact Methods -->
          <div class="space-y-5">
            <div class="flex items-center gap-3 px-2">
              <UIcon name="i-lucide-mail" class="w-6 h-6 text-brand-300" />
              <h2 class="text-xl font-bold text-white">
                {{ t("portfolio.sections.contact.contactInfo") }}
              </h2>
            </div>
            <div class="space-y-4">
              <a
                v-for="method in methods"
                :key="method.label"
                :href="method.link"
                target="_blank"
                rel="noopener noreferrer"
                class="group block p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 smooth-hover"
              >
                <div class="flex gap-4 items-start">
                  <div
                    class="w-12 h-12 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  >
                    <UIcon :name="method.icon" class="w-6 h-6 text-brand-300" />
                  </div>
                  <div class="flex-1 space-y-2">
                    <p
                      class="text-lg font-bold text-white group-hover:text-brand-300 transition-colors"
                    >
                      {{ method.label }}
                    </p>
                    <p class="text-brand-300 font-semibold">
                      {{ method.value }}
                    </p>
                    <p class="text-sm text-neutral-300">
                      {{ method.description }}
                    </p>
                  </div>
                  <UIcon
                    name="i-lucide-external-link"
                    class="w-5 h-5 text-neutral-400 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column - Contact Form -->
        <GlassCard
          :displacement-scale="48"
          :blur-amount="0.08"
          :corner-radius="24"
          wrapper-class="p-8 lg:p-10 rounded-3xl bg-white/5 border border-white/10 space-y-6 glass-card-hover"
        >
          <div class="flex items-center gap-3 mb-2">
            <div
              class="w-10 h-10 rounded-lg bg-linear-to-br from-brand-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0"
            >
              <UIcon name="i-lucide-send" class="w-5 h-5 text-brand-300" />
            </div>
            <h2 class="text-2xl font-bold text-white">
              {{ t("portfolio.form.title") }}
            </h2>
          </div>
          <ContactMyContactForm />
        </GlassCard>
      </div>
    </div>
  </div>
</template>
