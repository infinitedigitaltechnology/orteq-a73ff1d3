import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — ORTEQ India" },
      {
        name: "description",
        content: "Explore the complete ORTEQ range: LED walls, interactive panels, video walls, signage, kiosks and industrial displays.",
      },
      { property: "og:title", content: "Products — ORTEQ India" },
      { property: "og:description", content: "Complete range of commercial display products." },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Product Range"
        title="Every screen, engineered for its stage."
        description="From flagship All-In-One LED to ruggedised industrial HMIs — a complete visual technology portfolio."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p) => (
          <Link
            key={p.slug}
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="group overflow-hidden rounded-3xl border border-hairline bg-white transition-shadow hover:shadow-lift"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.image}
                alt={p.name}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="text-[10px] font-medium uppercase tracking-widest text-primary">
                {p.applications[0]}
              </div>
              <h3 className="mt-2 flex items-center justify-between font-display text-xl font-semibold">
                {p.name}
                <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
