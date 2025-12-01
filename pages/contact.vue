<script setup lang="ts">
const { getPersonal, getContactCta } = useRuneContent();
const { t } = useI18n();
const personal = computed(() => getPersonal());
const contact = computed(() => getContactCta());

useSeo({
  title: `${personal.value.full_name} – ${t("portfolio.sections.contact.title")}`,
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

const form = ref({
  name: "",
  email: "",
  project: "",
  message: "",
});
</script>

<template>
  <div class="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
    <div class="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-12">
      <header class="space-y-3 text-center">
        <p class="text-sm font-semibold text-brand-600">{{ personal.company_freelance }}</p>
        <h1 class="text-4xl md:text-5xl font-extrabold">{{ contact.heading }}</h1>
        <p class="text-lg text-zinc-700 dark:text-zinc-300">{{ contact.body }}</p>
      </header>

      <section class="grid md:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h2 class="text-xl font-bold">{{ t("portfolio.sections.contact.preferred") }}</h2>
          <ul class="space-y-3 text-zinc-700 dark:text-zinc-300">
            <li v-for="item in contact.preferred_collaborations" :key="item" class="flex gap-2">
              <span class="i-lucide-check text-brand-500 mt-1" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="space-y-3">
            <h2 class="text-xl font-bold">{{ t("portfolio.sections.contact.contactInfo") }}</h2>
            <div
              v-for="method in methods"
              :key="method.label"
              class="p-4 rounded-xl bg-white/80 dark:bg-white/5 border border-white/30 dark:border-white/10 flex gap-3 items-start"
            >
              <UIcon :name="method.icon" class="h-5 w-5 text-brand-500 mt-1" />
              <div>
                <p class="font-semibold">{{ method.label }}</p>
                <a :href="method.link" class="text-brand-700 dark:text-brand-200 font-semibold hover:underline">
                  {{ method.value }}
                </a>
                <p class="text-sm text-zinc-600 dark:text-zinc-400">{{ method.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-2xl bg-white/80 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow space-y-4">
          <h2 class="text-xl font-bold">{{ t("portfolio.form.title") }}</h2>
          <form class="space-y-3" @submit.prevent>
            <label class="block space-y-1">
              <span class="text-sm font-semibold">{{ t("portfolio.form.name") }}</span>
              <input v-model="form.name" type="text" class="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500" :placeholder="t('portfolio.form.name')" />
            </label>
            <label class="block space-y-1">
              <span class="text-sm font-semibold">{{ t("portfolio.form.email") }}</span>
              <input v-model="form.email" type="email" class="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="you@example.com" />
            </label>
            <label class="block space-y-1">
              <span class="text-sm font-semibold">{{ t("portfolio.form.project") }}</span>
              <input v-model="form.project" type="text" class="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500" :placeholder="t('portfolio.form.project')" />
            </label>
            <label class="block space-y-1">
              <span class="text-sm font-semibold">{{ t("portfolio.form.message") }}</span>
              <textarea v-model="form.message" rows="4" class="w-full px-4 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-brand-500" :placeholder="t('portfolio.form.message')"></textarea>
            </label>
            <UButton type="submit" color="primary" size="lg" block>{{ t("portfolio.form.submit") }}</UButton>
          </form>
        </div>
      </section>
    </div>
  </div>
</template>
