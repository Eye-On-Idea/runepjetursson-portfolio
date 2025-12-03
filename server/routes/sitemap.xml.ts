/**
 * Dynamic Sitemap Generation
 * Generates an XML sitemap with all pages and case studies
 */

import runeContent from "../../runeportfoliocontent.json";

// Import case studies from i18n - we'll use the English version as canonical
// Note: In a real scenario, you'd dynamically import these
const caseStudies = [
  { slug: "herqulez", lastmod: "2025-01-15" },
  { slug: "eye-on-idea", lastmod: "2025-02-01" },
  { slug: "tegetec", lastmod: "2024-12-10" },
];

export default defineEventHandler((event) => {
  const baseUrl = "https://runepjetursson.com";
  const currentDate = new Date().toISOString();

  // Define static pages with their priorities and change frequencies
  const staticPages = [
    {
      loc: "/",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      loc: "/about",
      lastmod: "2025-03-01",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: "/cases",
      lastmod: currentDate,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: "/contact",
      lastmod: "2025-02-15",
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      loc: "/privacy",
      lastmod: "2025-02-01",
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: "/terms",
      lastmod: "2025-02-01",
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: "/cookies",
      lastmod: "2025-02-01",
      changefreq: "yearly",
      priority: 0.3,
    },
  ];

  // Generate case study pages
  const casePages = caseStudies.map((caseStudy) => ({
    loc: `/cases/${caseStudy.slug}`,
    lastmod: caseStudy.lastmod,
    changefreq: "monthly",
    priority: 0.8,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...casePages];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <!-- Alternate language versions -->
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.loc}" />
    <xhtml:link rel="alternate" hreflang="da" href="${baseUrl}/da${page.loc}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.loc}" />
  </url>`
  )
  .join("\n")}
</urlset>`;

  // Set proper headers
  setHeader(event, "Content-Type", "application/xml");
  setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=3600");

  return sitemap;
});
