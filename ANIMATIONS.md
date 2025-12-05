# Animation System Documentation

This document explains all the animations used in this Nuxt 3 portfolio project and how to replicate them.

## Table of Contents

1. [Dependencies](#dependencies)
2. [Core Animation Composables](#core-animation-composables)
3. [Custom Cursor](#custom-cursor)
4. [Typewriter Effect](#typewriter-effect)
5. [Image Carousel](#image-carousel)
6. [Page Transitions](#page-transitions)
7. [Scroll Animations](#scroll-animations)
8. [Form Validation Animations](#form-validation-animations)
9. [Loading States](#loading-states)
10. [Accessibility](#accessibility)

---

## Dependencies

Install the following packages:

```bash
npm install @vueuse/motion @vueuse/core
```

Add to `nuxt.config.ts`:

```typescript
modules: [
  '@vueuse/motion/nuxt',
]
```

---

## Core Animation Composables

### useAccessibleMotion

Location: `composables/useAccessibleMotion.ts`

This composable respects user's motion preferences and provides animation variants.

```typescript
import { usePreferredReducedMotion } from '@vueuse/core'

export function useAccessibleMotion() {
  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const variant = (animation: any) => {
    if (prefersReducedMotion.value) {
      return {
        initial: {},
        visible: {},
      }
    }
    return animation
  }

  const animationPresets = {
    fadeIn: {
      initial: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 500 } },
    },
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 500 } },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1, transition: { duration: 400 } },
    },
  }

  return {
    prefersReducedMotion,
    variant,
    animationPresets,
  }
}
```

**Usage:**

```vue
<script setup>
const { variant, animationPresets } = useAccessibleMotion()
const fadeVariant = variant(animationPresets.fadeIn)
</script>

<template>
  <div v-motion :initial="fadeVariant.initial" :visible="fadeVariant.visible">
    Content
  </div>
</template>
```

---

## Custom Cursor

### Implementation

The custom cursor system consists of three parts:

#### 1. Cursor Composable (`composables/useCursorFollow.ts`)

```typescript
export function useCursorFollow() {
  const reducedMotionPreference = usePreferredReducedMotion()
  const prefersReducedMotion = computed(() => reducedMotionPreference.value === 'reduce')

  const cursorX = ref(0)
  const cursorY = ref(0)
  const isHovering = ref(false)

  let animationFrameId: number | null = null
  let targetX = 0
  let targetY = 0

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const updateCursorPosition = () => {
    if (prefersReducedMotion.value) {
      cursorX.value = targetX
      cursorY.value = targetY
    } else {
      cursorX.value = lerp(cursorX.value, targetX, 0.15)
      cursorY.value = lerp(cursorY.value, targetY, 0.15)
    }
    animationFrameId = requestAnimationFrame(updateCursorPosition)
  }

  const handleMouseMove = (e: MouseEvent) => {
    targetX = e.clientX
    targetY = e.clientY
  }

  const handleMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target &&
      (target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.classList?.contains('cursor-interactive'))
    ) {
      isHovering.value = true
    }
  }

  const handleMouseLeave = () => {
    isHovering.value = false
  }

  onMounted(() => {
    // Don't run on mobile or with reduced motion
    const isMobile =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 1024px)').matches

    if (prefersReducedMotion.value || isMobile) return

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { capture: true })
    document.addEventListener('mouseleave', handleMouseLeave, { capture: true })

    animationFrameId = requestAnimationFrame(updateCursorPosition)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseenter', handleMouseEnter, { capture: true })
    document.removeEventListener('mouseleave', handleMouseLeave, { capture: true })

    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
    }
  })

  return {
    cursorX,
    cursorY,
    isHovering,
    prefersReducedMotion,
  }
}
```

#### 2. Cursor Component (`components/CustomCursor.vue`)

```vue
<script setup lang="ts">
const { cursorX, cursorY, isHovering, prefersReducedMotion } = useCursorFollow()

const isMobile = ref(false)

onMounted(() => {
  isMobile.value =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(max-width: 1024px)').matches
})

const showCursor = computed(() => !prefersReducedMotion.value && !isMobile.value)
</script>

<template>
  <div v-if="showCursor" class="custom-cursor-wrapper">
    <div
      class="custom-cursor-dot"
      :style="{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }"
      :class="{ 'cursor-hovering': isHovering }"
    ></div>

    <div
      class="custom-cursor-ring"
      :style="{
        transform: `translate(${cursorX}px, ${cursorY}px)`,
      }"
      :class="{ 'cursor-hovering': isHovering }"
    ></div>
  </div>
</template>

<style scoped>
.custom-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}

.custom-cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: var(--color-brand-400);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
  margin-left: -4px;
  margin-top: -4px;
}

.custom-cursor-dot.cursor-hovering {
  width: 16px;
  height: 16px;
  margin-left: -8px;
  margin-top: -8px;
  background: var(--color-accent-400);
}

.custom-cursor-ring {
  position: fixed;
  width: 32px;
  height: 32px;
  border: 2px solid var(--color-brand-300);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.5;
  transition: width 0.3s ease, height 0.3s ease, opacity 0.3s ease, border-color 0.3s ease;
  margin-left: -16px;
  margin-top: -16px;
}

.custom-cursor-ring.cursor-hovering {
  width: 48px;
  height: 48px;
  margin-left: -24px;
  margin-top: -24px;
  opacity: 0.8;
  border-color: var(--color-accent-300);
}

:global(body.custom-cursor-active) {
  cursor: none;
}

:global(body.custom-cursor-active a),
:global(body.custom-cursor-active button),
:global(body.custom-cursor-active .cursor-interactive) {
  cursor: none;
}
</style>
```

#### 3. Layout Integration (`layouts/default.vue`)

```vue
<script setup>
onMounted(() => {
  // Add class to body for custom cursor (only on desktop)
  if (typeof window !== 'undefined') {
    const isMobile =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(max-width: 1024px)').matches

    if (!isMobile) {
      document.body.classList.add('custom-cursor-active')
    }
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    document.body.classList.remove('custom-cursor-active')
  }
})
</script>

<template>
  <div>
    <NuxtPage />
    <CustomCursor />
  </div>
</template>
```

**Key Features:**
- Smooth lerp animation with `requestAnimationFrame`
- Expands on hover over interactive elements (links, buttons)
- Automatically disabled on mobile devices
- Respects `prefers-reduced-motion`

---

## Typewriter Effect

### Implementation (`components/RotatingTypewriter.vue`)

```vue
<script setup lang="ts">
const props = defineProps<{
  titles: string[]
  speed?: number // Typing speed in ms per character
  pauseDuration?: number // Pause before switching to next title
  deleteSpeed?: number // Deletion speed in ms per character
  random?: boolean // Randomize title order
}>()

const displayText = ref('')
const isDeleting = ref(false)
const isPaused = ref(false)

const { prefersReducedMotion } = useAccessibleMotion()

const shuffledTitles = ref<string[]>([])
const currentIndex = ref(0)

let timeoutId: ReturnType<typeof setTimeout> | null = null

const shuffleArray = (array: string[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const typewriterEffect = () => {
  if (prefersReducedMotion.value) {
    displayText.value = shuffledTitles.value[0] || ''
    return
  }

  if (shuffledTitles.value.length === 0) return

  const currentTitle = shuffledTitles.value[currentIndex.value]

  if (isPaused.value) {
    timeoutId = setTimeout(() => {
      isPaused.value = false
      isDeleting.value = true
      typewriterEffect()
    }, props.pauseDuration || 2000)
    return
  }

  if (isDeleting.value) {
    if (displayText.value.length > 0) {
      displayText.value = displayText.value.slice(0, -1)
      timeoutId = setTimeout(typewriterEffect, props.deleteSpeed || 40)
    } else {
      isDeleting.value = false

      // Increment index first
      currentIndex.value = currentIndex.value + 1

      // Re-shuffle when we complete a full cycle through all titles
      if (currentIndex.value >= shuffledTitles.value.length) {
        currentIndex.value = 0
        if (props.random !== false) {
          shuffledTitles.value = shuffleArray(props.titles)
        }
      }

      timeoutId = setTimeout(typewriterEffect, 500)
    }
  } else {
    if (displayText.value.length < currentTitle.length) {
      displayText.value = currentTitle.slice(0, displayText.value.length + 1)
      timeoutId = setTimeout(typewriterEffect, props.speed || 80)
    } else {
      isPaused.value = true
      typewriterEffect()
    }
  }
}

onMounted(() => {
  shuffledTitles.value = props.random !== false
    ? shuffleArray(props.titles)
    : [...props.titles]

  setTimeout(() => {
    typewriterEffect()
  }, 800)
})

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

<template>
  <span class="rotating-typewriter inline-flex items-baseline">
    <span class="typewriter-text">{{ displayText }}</span>
    <span
      v-if="!prefersReducedMotion"
      class="typewriter-cursor ml-0.5"
      :class="{ 'cursor-blink': isPaused }"
    >|</span>
  </span>
</template>

<style scoped>
.typewriter-text {
  font-variant-numeric: tabular-nums;
  min-height: 1.2em;
  display: inline-block;
}

.typewriter-cursor {
  font-weight: 300;
  opacity: 1;
  transition: opacity 0.1s;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    animation: none;
    opacity: 0;
  }
}
</style>
```

**Usage:**

```vue
<RotatingTypewriter
  :titles="[
    'Digital Product Designer',
    'Front-End Developer',
    'UI/UX Designer'
  ]"
  :speed="60"
  :deleteSpeed="30"
  :pauseDuration="2500"
  :random="false"
/>
```

**Props:**
- `titles`: Array of strings to cycle through
- `speed`: Typing speed in milliseconds per character (default: 80)
- `deleteSpeed`: Deletion speed in milliseconds per character (default: 40)
- `pauseDuration`: Pause duration in milliseconds before deleting (default: 2000)
- `random`: Whether to randomize the order (default: true)

---

## Image Carousel

### Implementation

Simple rotating image carousel with smooth transitions:

```vue
<script setup>
const images = [
  { src: "/assets/img/image1.png", alt: "Description" },
  { src: "/assets/img/image2.png", alt: "Description" },
]

const currentImageIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.length
  }, 5000) // Change every 5 seconds
})

const currentImage = computed(() => images[currentImageIndex.value])
</script>

<template>
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
</template>
```

**Key Features:**
- Auto-rotates every 5 seconds
- Smooth scale and rotate transitions
- `mode="out-in"` ensures only one image visible at a time

---

## Page Transitions

### Global Page Transition

Add to `nuxt.config.ts`:

```typescript
app: {
  pageTransition: {
    name: 'page',
    mode: 'out-in',
    duration: 300
  }
}
```

Add to global CSS (`assets/css/main.css`):

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
```

---

## Scroll Animations

### Using v-motion

```vue
<script setup>
const { variant, animationPresets } = useAccessibleMotion()
const fadeInUpVariant = variant(animationPresets.fadeInUp)
</script>

<template>
  <div
    v-motion
    :initial="fadeInUpVariant.initial"
    :visible="fadeInUpVariant.visible"
  >
    Content appears on scroll
  </div>
</template>
```

### Custom Staggered Animation

```vue
<script setup>
const { variant } = useAccessibleMotion()

const itemVariant = (index: number) => variant({
  initial: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 400,
      delay: index * 100, // Stagger by 100ms
    },
  },
})
</script>

<template>
  <div v-for="(item, index) in items" :key="index">
    <div
      v-motion
      :initial="itemVariant(index).initial"
      :visible="itemVariant(index).visible"
    >
      {{ item }}
    </div>
  </div>
</template>
```

---

## Form Validation Animations

### Shake Animation on Error

```vue
<script setup>
const hasError = ref(false)

const shake = () => {
  hasError.value = true
  setTimeout(() => {
    hasError.value = false
  }, 500)
}
</script>

<template>
  <input
    :class="{ 'shake-animation': hasError }"
    @submit.prevent="validate"
  />
</template>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.shake-animation {
  animation: shake 0.5s ease-in-out;
}
</style>
```

---

## Loading States

### Spinner Component

```vue
<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--color-brand-400);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
    border-top-color: var(--color-brand-400);
    border-right-color: var(--color-brand-400);
  }
}
</style>
```

---

## Accessibility

### Best Practices

1. **Always respect `prefers-reduced-motion`:**

```typescript
const { prefersReducedMotion } = useAccessibleMotion()

// Disable animations
if (prefersReducedMotion.value) {
  // Show static content
}
```

2. **Provide alternative feedback:**

```vue
<button @click="submit">
  <span v-if="!isLoading">Submit</span>
  <span v-else>
    <span class="sr-only">Loading...</span>
    <span class="spinner" aria-hidden="true"></span>
  </span>
</button>
```

3. **Use semantic HTML:**

```vue
<!-- Good -->
<nav aria-label="Main navigation">
  <a href="/about">About</a>
</nav>

<!-- Bad -->
<div class="nav">
  <div onclick="navigate()">About</div>
</div>
```

4. **Focus management:**

```typescript
const focusElement = (selector: string) => {
  nextTick(() => {
    const el = document.querySelector(selector) as HTMLElement
    el?.focus()
  })
}
```

---

## CSS Variables

Define these in your Tailwind config or global CSS:

```css
:root {
  --color-brand-300: #7dd3fc;
  --color-brand-400: #0ea5e9;
  --color-brand-500: #0284c7;
  --color-accent-300: #f9a8d4;
  --color-accent-400: #ec4899;
  --color-accent-500: #db2777;
}
```

---

## Performance Tips

1. **Use `will-change` sparingly:**

```css
.animated-element {
  will-change: transform, opacity;
}

.animated-element.is-animating {
  /* Only during animation */
}
```

2. **Prefer `transform` and `opacity`:**

```css
/* Good - GPU accelerated */
.element {
  transform: translateX(10px);
  opacity: 0.5;
}

/* Bad - causes reflow */
.element {
  left: 10px;
  margin-left: 10px;
}
```

3. **Use `requestAnimationFrame`:**

```typescript
const animate = () => {
  // Update animation state
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
```

4. **Cleanup on unmount:**

```typescript
let animationId: number

onMounted(() => {
  animationId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
```

---

## Summary

This animation system provides:

- ✅ Smooth, performant animations
- ✅ Full accessibility support
- ✅ Mobile-optimized (disables heavy animations)
- ✅ Respects user preferences
- ✅ Easy to replicate and extend
- ✅ Type-safe with TypeScript

For questions or issues, refer to:
- [@vueuse/motion documentation](https://motion.vueuse.org/)
- [@vueuse/core documentation](https://vueuse.org/)
