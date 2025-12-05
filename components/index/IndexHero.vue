<script setup lang="ts">
const props = defineProps<{
  personal: {
    company_freelance: string;
    location: string;
    title_secondary: string;
    full_name: string;
    title_primary: string;
  };
  headline: {
    short: string;
    tagline: string;
  };
  profileShort: string;
  stats: { label: string; value: string }[];
  focusChips: string[];
}>();

const { t } = useI18n();
const { variant, animationPresets } = useAccessibleMotion();

// Hardcoded rotating titles
const rotatingTitles = [
  "Digital Product Designer",
  "Front-End Developer",
  "UI/UX Designer",
  "Product Designer",
  "React Native Developer",
  "Digital Concept Developer",
  "UX Engineer",
  "Product Design Lead",
  "Mobile App Designer",
  "Design Technologist",
  "Pixel Mechanic",
  "Front-End Wizard",
  "UX Therapist",
  "Bug Hunter Supreme",
  "Chief \"It Shouldn't Work But It Does\" Engineer"
];

// Animation variants with staggered delays
const badgeVariant = variant({
  initial: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 400, ease: "easeOut", delay: 0.1 },
  },
});

const titleVariant = variant(animationPresets.fadeInUp);

const ctaVariant = variant({
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 500, ease: "easeOut" },
  },
});

const imageVariant = variant({
  initial: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 600, ease: "easeOut", delay: 0.4 },
  },
});

// Image carousel logic
const images = [
  {
    src: "/assets/img/rune-kontor.png",
    alt: "Image of Rune Pjetursson sitting contemplating work at his desk",
  },
  {
    src: "/assets/img/rune-kontor2.png",
    alt: "Image of Rune Pjetursson sitting contemplating work at his desk",
  },
];

const currentImageIndex = ref(0);

// Auto-rotate images every 5 seconds
onMounted(() => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
  }, 5000);
});

const currentImage = computed(() => images[currentImageIndex.value]);
</script>

<template>
  <section
    id="hero"
    class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center pt-8 md:pt-12"
  >
    <header class="space-y-7 lg:space-y-8">
      <p
        v-motion
        :initial="badgeVariant.initial"
        :visible="badgeVariant.visible"
        class="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/15 bg-white/6 backdrop-blur-sm smooth-hover"
      >
        <span class="text-sm font-bold text-neutral-50">{{
          props.personal.company_freelance
        }}</span>
        <span class="text-neutral-400" aria-hidden="true">&bull;</span>
        <span class="text-sm font-medium text-neutral-200">{{
          props.personal.location
        }}</span>
      </p>
      <div class="space-y-4">
        <p
          v-motion
          :initial="titleVariant.initial"
          :visible="{
            ...titleVariant.visible,
            transition: { ...titleVariant.visible.transition, delay: 0.15 },
          }"
          class="text-base md:text-lg text-accent-300 font-bold uppercase tracking-wide min-h-7"
        >
          <RotatingTypewriter
            :titles="rotatingTitles"
            :speed="60"
            :deleteSpeed="30"
            :pauseDuration="2500"
            :random="false"
          />
        </p>
        <h1
          v-motion
          :initial="titleVariant.initial"
          :visible="{
            ...titleVariant.visible,
            transition: { ...titleVariant.visible.transition, delay: 0.3 },
          }"
          class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-white bg-clip-text"
        >
          {{ props.personal.full_name }}
        </h1>
        <p
          v-motion
          :initial="titleVariant.initial"
          :visible="{
            ...titleVariant.visible,
            transition: { ...titleVariant.visible.transition, delay: 0.45 },
          }"
          class="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-300 leading-tight"
        >
          {{ props.personal.title_primary }}
        </p>
      </div>
      <p
        v-motion
        :initial="titleVariant.initial"
        :visible="{
          ...titleVariant.visible,
          transition: { ...titleVariant.visible.transition, delay: 0.6 },
        }"
        class="text-lg md:text-xl text-neutral-200 leading-relaxed max-w-2xl"
      >
        {{ props.headline.short }}
      </p>
      <p
        v-motion
        :initial="titleVariant.initial"
        :visible="{
          ...titleVariant.visible,
          transition: { ...titleVariant.visible.transition, delay: 0.75 },
        }"
        class="text-base md:text-lg text-neutral-300 leading-relaxed max-w-xl"
      >
        {{ props.headline.tagline }}
      </p>
      <nav
        v-motion
        :initial="ctaVariant.initial"
        :visible="{
          ...ctaVariant.visible,
          transition: { ...ctaVariant.visible.transition, delay: 0.9 },
        }"
        aria-label="Primary calls to action"
        class="flex flex-wrap gap-4 pt-4"
      >
        <NuxtLink
          to="/contact"
          class="group px-6 py-3.5 rounded-xl bg-brand-500 text-neutral-900 font-bold shadow-lg shadow-brand-500/30 hover:bg-brand-400 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            {{ t("portfolio.hero.ctaPrimary") }}
            <UIcon
              name="i-lucide-arrow-right"
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
            />
          </span>
        </NuxtLink>
        <NuxtLink
          to="/cases"
          class="px-6 py-3.5 rounded-xl border-2 border-white/20 text-neutral-100 font-bold hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          {{ t("portfolio.hero.ctaSecondary") }}
        </NuxtLink>
      </nav>
      <ul class="flex flex-wrap gap-2.5 pt-2 list-none p-0">
        <li
          v-for="(chip, index) in props.focusChips"
          :key="chip"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visible="{
            opacity: 1,
            scale: 1,
            transition: {
              duration: 300,
              ease: 'easeOut',
              delay: 1.05 + index * 0.05,
            },
          }"
        >
          <UBadge
            color="primary"
            variant="soft"
            class="font-bold text-sm px-3 py-1.5"
          >
            {{ chip }}
          </UBadge>
        </li>
      </ul>
    </header>

    <!-- Rotating Image Carousel -->
    <div class="rightside">
      <div
        v-motion
        :initial="imageVariant.initial"
        :visible="imageVariant.visible"
        class="relative p-3 rounded-full bg-linear-to-br from-brand-500/20 to-accent-500/20 overflow-hidden w-[70%]"
      >
        <!-- Current Image -->
        <Transition
          enter-active-class="transition-all duration-700 ease-out"
          leave-active-class="transition-all duration-700 ease-in"
          enter-from-class="opacity-0 scale-110 rotate-12"
          enter-to-class="opacity-100 scale-100 rotate-0"
          leave-from-class="opacity-100 scale-100 rotate-0"
          leave-to-class="opacity-0 scale-90 -rotate-12"
          mode="out-in"
        >
          <img
            :key="currentImageIndex"
            :src="currentImage.src"
            :alt="currentImage.alt"
            class="w-full rounded-full"
          />
        </Transition>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@media (max-width: 1030px) {
  .rightside {
    display: none;
  }
}
</style>
