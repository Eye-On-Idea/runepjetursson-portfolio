# Project Implementation Guide

## Tech stack (brief)
- Nuxt 4 + Vue 3 + TypeScript
- Nuxt UI (with Tailwind via `@tailwindcss/vite`), Sass, custom CSS tokens
- Pinia state, @nuxtjs/i18n (EN/DA), @vueuse/motion/@vueuse/core
- @nuxt/image, @tresjs/* (3D-ready), Three.js

## Architecture at a glance
- Entry: `app.vue` wraps the app in `UApp`, then `NuxtLayout`/`NuxtPage`.
- Layout shell: `layouts/default.vue` sets the global gradient background, header, footer, page transitions, custom cursor, and global loading overlay. Forces dark mode on mount and adds the body class needed for the custom cursor.
- Routing/pages: `pages/` contains home, cases (listing and dynamic), about, contact, and legal pages.
- Components: UI/animation helpers in `components/` (custom cursor, gradient mesh, tilt/glass cards, counters, typewriter, loading overlay, etc.) plus section blocks in `components/index` and `components/cases`.
- Composables: `composables/` holds motion utilities, SEO, cursor/tilt effects, loading state, counters, text effects, and data accessors (`useRuneContent`).
- Styling: `assets/css/main.css` defines the design tokens, fonts, scroll/animation helpers, page transitions, and glass/gradient utilities. `app.config.ts` maps Nuxt UI semantic colors to the custom brand/accent palette.
- Data & i18n: Base content in `runeportfoliocontent.json` plus locale-specific files under `i18n/locales`. `useRuneContent` merges per-locale overrides. Nuxt i18n is configured in `nuxt.config.ts`.
- SEO: Global defaults and structured data in `nuxt.config.ts`; per-page meta via `useSeo`; additional notes in `SEO-IMPLEMENTATION.md`.

## Rebuilding the look & feel in a new Nuxt project
1. **Install modules**: Nuxt UI, @nuxt/image, @nuxtjs/i18n, @pinia/nuxt, @vueuse/motion, @vueuse/core, @tresjs/nuxt, sass. Add `@tailwindcss/vite` to `vite.plugins`.
2. **Configure Nuxt** (`nuxt.config.ts`):
   - Add modules above; enable SSR/static prerender as needed.
   - Set `css: ["~/assets/css/main.css"]`.
   - Map color mode preferences; set runtime `public.siteUrl`; keep `routeRules` headers.
   - Configure i18n locales (en/da) with `langDir` and `strategy: "no_prefix"`.
   - Add head defaults (favicons, theme colors, fonts preconnect) and JSON-LD graph.
3. **Design tokens & base CSS** (`assets/css/main.css`):
   - Define `@theme` color scales for `brand` and `accent`, neutral palette, semantic roles.
   - Set font families (`Exo 2`, `Maven Pro`), hide native scrollbar, smooth scrolling, selection, focus-visible styles.
   - Provide animation keyframes (`fadeIn*`, `slideIn*`, `pulse-slow`, `shake`, `spin`) and helpers (`[data-scroll-animate]` visible toggle, `.animate-in`, skeleton shimmer).
   - Include glass/gradient helpers (`.glass-card`, `.gradient-overlay-*`), section spacing utilities, and page transition classes (`.page-*`).
4. **App shell** (`layouts/default.vue`):
   - Force dark mode via `useColorMode`; add body class `custom-cursor-active` only on non-touch devices.
   - Layer `GradientMesh` (blurred animated blobs) behind content.
   - Provide skip link, `MyHeader`, `NuxtPage` with `page` transition, `MyFooter`.
   - Mount `CustomCursor` and `GlobalLoadingOverlay`.
5. **Custom cursor**:
   - Composable `useCursorFollow` (tracks mouse with lerp, hover state, reduced-motion guard, mobile guard).
   - Component `components/CustomCursor.vue` renders dot + ring following `cursorX/Y`; toggles size/color on hover; hides native cursor via body class.
6. **Header with scroll bar** (`components/MyHeader.vue`):
   - Sticky `UHeader` with backdrop blur and border.
   - Progress bar using `<progress>` bound to scroll ratio (0–10000) updated on scroll.
   - Desktop/mobile nav variants with active-state underline and i18n labels; `LanguageSwitcher` on the right.
7. **Global loading**:
   - `useLoadingState` composable exposes `startLoading/stopLoading/setLoadingMessage`.
   - `components/GlobalLoadingOverlay.vue` listens to `loadingState` and shows `LoadingState` component inside a blurred overlay.
   - Wrap long async tasks with `useAsyncLoading` helper.
8. **Motion & animation system**:
   - `useAccessibleMotion` provides `prefersReducedMotion` check and presets (fade/slide/scale, icon/button variants, stagger helpers). Use with `v-motion`.
   - Scroll-trigger utilities: `useScrollAnimation`, `useScrollAnimationRef`, `useStaggeredScrollAnimation`, plus CSS `[data-scroll-animate]` visible class.
   - Counters: `useCounterAnimation` and `useScrollTriggeredCounter` power `components/AnimatedCounter.vue`.
   - Text effects: `useTextReveal`, `useTypewriter`, `useTextScramble`; components `TypewriterText.vue`, `RotatingTypewriter.vue`, `RevealText.vue`.
   - Card tilt: `useCardTilt` (3D tilt + glare, reduced-motion aware) and `components/TiltCard.vue`.
   - Page transitions: `.page-enter/leave` classes defined in `assets/css/main.css`; `NuxtPage` uses `name: "page"` in the layout.
9. **Visual components & effects**:
   - `GradientMesh.vue` renders animated radial blobs; respects reduced motion.
   - Section cards often wrap `GlassCard.vue`/`TiltCard.vue` for glassmorphism + depth.
   - Animated backgrounds on pages (e.g., `pages/index.vue` fixed gradient blobs with `pulse-slow`).
   - Hero image carousel and rotating titles in `components/index/IndexHero.vue`.
10. **Content & localization**:
    - Base data in `runeportfoliocontent.json`; per-locale overrides in `i18n/locales/*`.
    - `useRuneContent` returns computed getters (`getPersonal`, `getHeadline`, etc.) that auto-switch with `locale`.
    - i18n strings live under `i18n/locales/{en,da}`; navigation labels referenced throughout components.
11. **SEO**:
    - Use `useSeo` composable per page (title, description, keywords, breadcrumbs, structuredData, canonical, twitter card).
    - Global head defaults and JSON-LD graph in `nuxt.config.ts` (`Person`, `Organization`, `WebSite`, services, breadcrumbs).
    - See `SEO-IMPLEMENTATION.md` for validation steps and checklist.
12. **Preferences & theming**:
    - `stores/preferences.ts` persists language/theme/unit (localStorage); `plugins/init-preferences.client.ts` loads on start.
    - `plugins/force-dark-mode.client.ts` locks color mode to dark (overrides user toggles).
    - Nuxt UI color mapping in `app.config.ts` ties semantic colors to the custom `brand`/`accent` palette.
13. **Background systems & 3D readiness**:
    - TresJS and Three.js are installed for 3D scenes (see `@tresjs/nuxt`); add scenes/components under `components` as needed.
    - `ParticleBackground.vue` and related visuals can be used for layered effects (not mounted by default).

## Key file map (copy into new project as needed)
- Shell: `app.vue`, `layouts/default.vue`
- Styling: `assets/css/main.css`, `app.config.ts`
- Components: `CustomCursor.vue`, `GradientMesh.vue`, `GlobalLoadingOverlay.vue`, `MyHeader.vue`, `MyFooter.vue`, `AnimatedCounter.vue`, `TiltCard.vue`, `TypewriterText.vue`, `RevealText.vue`, `RotatingTypewriter.vue`
- Composables: `useCursorFollow.ts`, `useCardTilt.ts`, `useAccessibleMotion.ts`, `useScrollAnimation.ts`, `useCounterAnimation.ts`, `useTextReveal.ts`, `useLoadingState.ts`, `useSeo.ts`, `useRuneContent.ts`
- Data/i18n: `runeportfoliocontent.json`, `i18n/locales/**`
- SEO reference: `SEO-IMPLEMENTATION.md`; animations reference: `ANIMATIONS.md`

## Usage patterns and examples
- **Animating sections on scroll:** add `data-scroll-animate` to an element, then in `onMounted` call `observeElement` from `useScrollAnimation`.
- **Using motion presets:** `const { variant, animationPresets } = useAccessibleMotion(); const fadeUp = variant(animationPresets.fadeInUp);` then bind to `v-motion` props.
- **Tilting cards:** wrap card contents in `<TiltCard :max-tilt="8" :scale="1.03">...</TiltCard>`; the composable applies transform and glare automatically.
- **Counters:** `<AnimatedCounter :value="120" suffix="+" label="Projects" />` animates when scrolled into view.
- **SEO per page:** in a page setup, call `useSeo({ title: 'Cases', description: t('...'), breadcrumbs: [...] });`.
- **Loading overlay:** `const { startLoading, stopLoading } = useLoadingState();` around async tasks to show the global overlay.

## Development flow
- Install deps: `npm install`
- Run dev server: `npm run dev`
- Type-check: `npm run typecheck`
- Build static site: `npm run generate` (outputs to `dist/` for static hosting)

This guide plus the referenced files should let another developer recreate the styling, motion system, and special touches (custom cursor, header scroll bar, gradient background, global loaders, text/counter effects) in a fresh Nuxt project.
