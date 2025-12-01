<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const { locale, setLocale } = useI18n();
const preferencesStore = usePreferencesStore();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const availableLocales = [
  { code: "en", name: "English", icon: "i-circle-flags-gb" },
  { code: "da", name: "Dansk", icon: "i-circle-flags-dk" },
];

const currentLanguage = computed(() => {
  const found = availableLocales.find((lang) => lang.code === locale.value);
  return found ?? availableLocales[0];
});

const currentLanguageName = computed(
  () => currentLanguage.value?.name ?? "English"
);

const switchLanguage = async (langCode: string) => {
  if (locale.value === langCode) {
    isOpen.value = false;
    return;
  }

  await setLocale(langCode as any);
  await preferencesStore.setLanguage(langCode);
  isOpen.value = false;
};

// Watch for language changes from preferences store (e.g., loaded from localStorage)
watch(
  () => preferencesStore.language,
  async (newLanguage) => {
    if (newLanguage && locale.value !== newLanguage) {
      await setLocale(newLanguage as any);
    }
  },
  { immediate: true }
);

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Language Button -->
    <button
      @click="toggleDropdown"
      class="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors flex items-center gap-2"
      aria-label="Select Language"
      :aria-expanded="isOpen"
    >
      <UIcon
        :name="currentLanguage?.icon ?? 'i-circle-flags-gb'"
        class="w-5 h-5"
      />
      <span class="hidden sm:inline">{{ currentLanguageName }}</span>
      <UIcon
        name="i-lucide-chevron-down"
        class="h-4 w-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 z-50"
      >
        <div class="py-1" role="menu">
          <button
            v-for="lang in availableLocales"
            :key="lang.code"
            @click="switchLanguage(lang.code)"
            class="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left"
            :class="{ 'bg-zinc-100 dark:bg-zinc-800': locale === lang.code }"
            role="menuitem"
          >
            <UIcon :name="lang.icon" class="h-5 w-5" />
            <span>{{ lang.name }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
