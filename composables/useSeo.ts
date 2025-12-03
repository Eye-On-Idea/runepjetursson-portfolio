/**
 * Enhanced SEO Composable for consistent meta tags across pages
 * Follows best practices for SEO optimization including:
 * - Open Graph & Twitter Cards
 * - Structured Data (JSON-LD)
 * - Multilingual support (hreflang)
 * - Breadcrumbs
 * - Rich snippets
 */

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile" | "product" | "portfolio";
  noindex?: boolean;
  canonical?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: any; // Additional structured data to merge
  breadcrumbs?: Array<{ name: string; url: string }>; // Breadcrumb navigation
  ogType?: string; // Override OG type
  twitterCard?: "summary" | "summary_large_image" | "app" | "player"; // Twitter card type
}

export const useSeo = (options: SeoOptions) => {
  const { getPersonal } = useRuneContent();
  const personal = getPersonal();
  const { locale } = useI18n();
  const route = useRoute();
  const config = useRuntimeConfig();

  // Base URL - update this with your actual domain
  const baseUrl = config.public.siteUrl || "https://runepjetursson.com";

  // Construct full URL
  const fullUrl = options.url || `${baseUrl}${route.path}`;

  // Default OG image - use a proper Open Graph image
  const ogImage = options.image || `${baseUrl}/android-chrome-512x512.png`;

  // Construct page title
  const pageTitle = options.title;
  const fullTitle =
    pageTitle === personal.full_name
      ? pageTitle
      : `${pageTitle} | ${personal.full_name}`;

  useHead({
    htmlAttrs: {
      lang: locale.value,
    },
    title: fullTitle,
    meta: [
      // Primary Meta Tags
      { name: "title", content: fullTitle },
      { name: "description", content: options.description },

      // Keywords (optional, less important now but still useful)
      ...(options.keywords
        ? [{ name: "keywords", content: options.keywords.join(", ") }]
        : []),

      // Author
      { name: "author", content: options.author || personal.full_name },

      // Robots
      ...(options.noindex
        ? [{ name: "robots", content: "noindex, nofollow" }]
        : [
            {
              name: "robots",
              content:
                "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
            },
          ]),

      // Additional SEO meta tags
      { name: "language", content: locale.value },
      { name: "revisit-after", content: "7 days" },
      { name: "distribution", content: "global" },
      { name: "rating", content: "general" },

      // Open Graph / Facebook
      { property: "og:type", content: options.type || "website" },
      { property: "og:url", content: fullUrl },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: options.description },
      { property: "og:image", content: ogImage },
      { property: "og:image:secure_url", content: ogImage },
      {
        property: "og:image:type",
        content: ogImage.endsWith(".png") ? "image/png" : "image/jpeg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: options.image ? "630" : "1200" }, // Adjust based on custom vs default
      { property: "og:image:alt", content: fullTitle },
      {
        property: "og:locale",
        content:
          locale.value === "en"
            ? "en_US"
            : `${locale.value}_${locale.value.toUpperCase()}`,
      },
      { property: "og:site_name", content: personal.full_name },

      // Article specific (for blog posts)
      ...(options.type === "article" && options.publishedTime
        ? [
            {
              property: "article:published_time",
              content: options.publishedTime,
            },
            {
              property: "article:author",
              content: options.author || personal.full_name,
            },
          ]
        : []),
      ...(options.type === "article" && options.modifiedTime
        ? [{ property: "article:modified_time", content: options.modifiedTime }]
        : []),

      // Twitter
      {
        name: "twitter:card",
        content: options.twitterCard || "summary_large_image",
      },
      { name: "twitter:url", content: fullUrl },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: options.description },
      { name: "twitter:image", content: ogImage },
      { name: "twitter:image:alt", content: fullTitle },
      { name: "twitter:site", content: "@runepjetursson" },
      { name: "twitter:creator", content: "@runepjetursson" },
      { name: "twitter:domain", content: "runepjetursson.com" },
    ],
    link: [
      // Canonical URL
      { rel: "canonical", href: options.canonical || fullUrl },

      // Alternate languages (hreflang)
      { rel: "alternate", hreflang: "en", href: `${baseUrl}/en${route.path}` },
      { rel: "alternate", hreflang: "da", href: `${baseUrl}/da${route.path}` },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: `${baseUrl}${route.path}`,
      },
    ],
  });

  // Structured Data (JSON-LD)
  const schemas: any[] = [];

  // Always add WebPage schema for all page types
  const webPageSchema: any = {
    "@type": "WebPage",
    "@id": fullUrl,
    url: fullUrl,
    name: fullTitle,
    description: options.description,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    inLanguage: locale.value,
    image: {
      "@type": "ImageObject",
      url: ogImage,
      width: 1200,
      height: options.image ? 630 : 1200,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
    datePublished: options.publishedTime,
    dateModified:
      options.modifiedTime || options.publishedTime || new Date().toISOString(),
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: options.author || personal.full_name,
    },
  };

  // Add breadcrumb to WebPage if provided
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    webPageSchema.breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": `${fullUrl}#breadcrumb`,
      itemListElement: options.breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }

  schemas.push(webPageSchema);

  // Article schema for blog posts and case studies
  if (options.type === "article" && options.publishedTime) {
    schemas.push({
      "@type": "Article",
      "@id": fullUrl,
      headline: fullTitle,
      description: options.description,
      image: {
        "@type": "ImageObject",
        url: ogImage,
        width: 1200,
        height: 630,
      },
      datePublished: options.publishedTime,
      dateModified: options.modifiedTime || options.publishedTime,
      author: {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: options.author || personal.full_name,
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: personal.company_freelance,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/android-chrome-512x512.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": fullUrl,
      },
    });
  }

  // Profile/Person schema for about page
  if (options.type === "profile") {
    schemas.push({
      "@type": "ProfilePage",
      "@id": fullUrl,
      mainEntity: {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: personal.full_name,
        jobTitle: personal.title_primary,
        description: options.description,
        url: baseUrl,
        image: {
          "@type": "ImageObject",
          url: `${baseUrl}/assets/img/rune-kontor.png`,
        },
        sameAs: [
          "https://www.linkedin.com/in/rune-m-p-pjetursson-361870115/",
          "https://runepjetursson.com",
        ],
        worksFor: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: personal.company_freelance,
        },
        knowsAbout: options.keywords || [],
      },
    });
  }

  // Portfolio/CreativeWork schema for case studies
  if (options.type === "portfolio") {
    schemas.push({
      "@type": "CreativeWork",
      "@id": fullUrl,
      name: fullTitle,
      description: options.description,
      image: {
        "@type": "ImageObject",
        url: ogImage,
      },
      creator: {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: personal.full_name,
      },
      datePublished: options.publishedTime,
      dateModified: options.modifiedTime || options.publishedTime,
      inLanguage: locale.value,
    });
  }

  // Add custom structured data if provided
  if (options.structuredData) {
    if (Array.isArray(options.structuredData)) {
      schemas.push(...options.structuredData);
    } else {
      schemas.push(options.structuredData);
    }
  }

  // Add schemas if any exist
  if (schemas.length > 0) {
    useSchemaOrg(schemas);
  }
};

// Helper composable for Schema.org structured data
const useSchemaOrg = (schemas: any[]) => {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas,
        }),
      },
    ],
  });
};
