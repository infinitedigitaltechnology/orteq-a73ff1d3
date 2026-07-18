import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/products",
          "/industries",
          "/solutions",
          "/projects",
          "/blog",
          "/downloads",
          "/support",
          "/about",
          "/contact",
          "/dealer",
          "/partner",
        ];
        const { PRODUCTS, INDUSTRIES, SOLUTIONS } = await import("@/lib/site-data");
        const dynamicPaths = [
          ...PRODUCTS.map((p) => `/products/${p.slug}`),
          ...INDUSTRIES.map((i) => `/industries/${i.slug}`),
          ...SOLUTIONS.map((s) => `/solutions/${s.slug}`),
        ];
        const paths = [...staticPaths, ...dynamicPaths];

        const urls = paths
          .map(
            (p) =>
              `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
