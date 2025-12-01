<script setup lang="ts">
const { t } = useI18n();

const form = reactive({
  name: "",
  email: "",
  project: "",
  message: "",
});
</script>

<template>
  <form
    class="space-y-5"
    action="https://formsubmit.co/hello@runepjetursson.com"
    method="POST"
  >
    <!-- Name -->
    <label class="block space-y-2">
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-user" class="w-4 h-4" />
        {{ t("portfolio.form.name") }}
      </span>
      <input
        v-model="form.name"
        type="text"
        name="name"
        class="w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
        :placeholder="t('portfolio.form.name')"
      />
    </label>
    <!-- Email -->
    <label class="block space-y-2">
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-mail" class="w-4 h-4" />
        {{ t("portfolio.form.email") }}
      </span>
      <input
        v-model="form.email"
        type="email"
        name="email"
        class="w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
        placeholder="you@example.com"
      />
    </label>
    <!-- Project -->
    <label class="block space-y-2">
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-briefcase" class="w-4 h-4" />
        {{ t("portfolio.form.project") }}
      </span>
      <input
        v-model="form.project"
        type="text"
        name="project"
        class="w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
        :placeholder="t('portfolio.form.project')"
      />
    </label>
    <!-- Message -->
    <label class="block space-y-2">
      <span class="text-sm font-bold text-neutral-200 flex items-center gap-2">
        <UIcon name="i-lucide-message-square" class="w-4 h-4" />
        {{ t("portfolio.form.message") }}
      </span>
      <textarea
        v-model="form.message"
        rows="5"
        name="message"
        class="w-full px-5 py-3.5 rounded-xl bg-neutral-900/50 backdrop-blur-sm border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all resize-none"
        :placeholder="t('portfolio.form.message')"
      ></textarea>
    </label>
    <!-- submit -->
    <button
      type="submit"
      class="group w-full px-6 py-4 rounded-xl bg-brand-500 text-neutral-900 font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <span>{{ t("portfolio.form.submit") }}</span>
      <UIcon
        name="i-lucide-send"
        class="w-5 h-5 group-hover:translate-x-1 transition-transform"
      />
    </button>
  </form>
</template>
