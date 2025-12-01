// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import runeContent from "./runeportfoliocontent.json";

const personal = runeContent.personal;
const headline = runeContent.headline;
const servicesList = runeContent.services.map((service, index) => ({
  "@type": "ListItem",
  position: index + 1,
  name: service.title,
  description: service.description,
}));
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@tresjs/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],

  // Cloudflare Pages SSR configuration
  ssr: true,

  nitro: {
    preset: "cloudflare-pages",
    minify: true,
    sourceMap: false,
    output: {
      dir: "dist",
      publicDir: "dist",
    },
  },
  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: "", // use 'dark' class
    preference: "system", // 'light' | 'dark' | 'system'
    storageKey: "color-mode",
  },

  // i18n configuration with modular locale structure
  i18n: {
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en/index.ts" },
      { code: "da", iso: "da-DK", name: "Dansk", file: "da/index.ts" },
    ],
    defaultLocale: "en",
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
    // SEO: Enable automatic alternate links for better multilingual SEO
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://runepjetursson.com",
  },

  // Runtime configuration for environment variables
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://runepjetursson.com",
    },
  },

  // Security headers and route rules
  // NOTE: Temporarily disabled strict CSP to test deployment
  // Re-enable after confirming the app works on Cloudflare Pages
  routeRules: {
    "/**": {
      headers: {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        // Temporarily disabled for testing:
        // "Content-Security-Policy": [...]
        // "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
        // "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: false, // Disable for production
    },
    build: {
      cssMinify: "lightningcss",
      sourcemap: false, // Disable for production
    },
    server: {
      fs: {
        strict: false,
      },
    },
  },
  //SEO
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    head: {
      htmlAttrs: { lang: "en" },
      title: `${personal.full_name} - ${personal.title_primary}`,
      titleTemplate: `%s | ${personal.full_name}`,
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "dns-prefetch", href: "//fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossorigin: "",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0ea5e9" },
        {
          name: "theme-color",
          content: "#0f172a",
          media: "(prefers-color-scheme: dark)",
        },
        { name: "msapplication-TileColor", content: "#0ea5e9" },
        { name: "format-detection", content: "telephone=no" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "default" },

        // Global SEO defaults (override per page as needed)
        { name: "author", content: personal.full_name },
        {
          name: "robots",
          content:
            "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },
        {
          name: "description",
          content:
            headline.short,
        },
        {
          name: "keywords",
          content:
            [
              personal.full_name,
              personal.title_primary,
              personal.title_secondary,
              "UX/UI design",
              "Digital produktdesign",
              "Frontend udvikling",
              "Freelance designer Aalborg",
            ].join(", "),
        },
        // Additional SEO meta tags
        { name: "classification", content: "Portfolio" },
        { name: "category", content: "Digital Product Design" },
        { name: "coverage", content: "Worldwide" },
        { name: "distribution", content: "Global" },
        { name: "rating", content: "General" },
        { name: "revisit-after", content: "7 days" },
        { name: "target", content: "all" },
        { name: "HandheldFriendly", content: "True" },
        { name: "MobileOptimized", content: "320" },

        // Open Graph
        { property: "og:site_name", content: personal.full_name },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "da_DK" },
        {
          property: "og:title",
          content:
            `${personal.full_name} – ${personal.title_primary}`,
        },
        {
          property: "og:description",
          content:
            headline.tagline,
        },
        { property: "og:url", content: "https://runepjetursson.com" },
        {
          property: "og:image",
          content: "https://runepjetursson.com/assets/logo/squared-light.png",
        },
        {
          property: "og:image:secure_url",
          content:
            "https://runepjetursson.com/assets/logo/squared-light.png",
        },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "1200" },
        {
          property: "og:image:alt",
          content: `${personal.full_name} – ${personal.title_primary}`,
        },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@runepjetursson" },
        { name: "twitter:creator", content: "@runepjetursson" },
        {
          name: "twitter:title",
          content: `${personal.full_name} – ${personal.title_primary}`,
        },
        {
          name: "twitter:description",
          content:
            headline.tagline,
        },
        {
          name: "twitter:image",
          content:
            "https://runepjetursson.com/assets/logo/squared-light.png",
        },
        {
          name: "twitter:image:alt",
          content: `${personal.full_name} – ${personal.title_primary}`,
        },
        { name: "twitter:domain", content: "runepjetursson.com" },
      ],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                name: personal.full_name,
                url: "https://runepjetursson.com",
                description: headline.short,
                inLanguage: ["en", "da"],
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate:
                      "https://runepjetursson.com/search?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                publisher: { "@id": "https://runepjetursson.com#organization" },
              },
              {
                "@type": "Person",
                "@id": "https://runepjetursson.com#person",
                name: personal.full_name,
                jobTitle: personal.title_primary,
                url: "https://runepjetursson.com",
                worksFor: { "@id": "https://runepjetursson.com#organization" },
              },
              {
                "@type": "Organization",
                "@id": "https://runepjetursson.com#organization",
                name: personal.company_freelance,
                legalName: personal.company_freelance,
                url: "https://runepjetursson.com",
                description: headline.tagline,
                foundingDate: "2025",
                logo: {
                  "@type": "ImageObject",
                  url: "https://runepjetursson.com/assets/logo/squared-light.png",
                  contentUrl:
                    "https://runepjetursson.com/assets/logo/squared-light.png",
                  width: "438",
                  height: "412",
                  caption: personal.company_freelance,
                },
                image: "https://runepjetursson.com/assets/logo/squared-light.png",
                sameAs: [
                  "https://runepjetursson.com",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Business",
                  email: "hello@runepjetursson.com",
                  availableLanguage: [
                    "English",
                    "Dansk",
                  ],
                },
              },
              {
                "@type": "ItemList",
                name: "Services",
                itemListElement: servicesList,
              },
            ],
          }),
        },
      ],
    },
  },
});
