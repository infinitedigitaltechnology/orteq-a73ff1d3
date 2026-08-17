import { createFileRoute, Link } from "@tanstack/react-router";
import { INDUSTRIES } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries Served | Display Solutions | ORTEQ India" },
      {
        name: "description",
        content:
          "ORTEQ India engineers tailored display architectures for Education, Corporate, Healthcare, Retail, and Infrastructure sectors.",
      },
      { property: "og:title", content: "Industries Served | ORTEQ India" },
      { property: "og:description", content: "Visual technology solutions engineered per vertical." },
      { property: "og:url", content: "/industries" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Industries"
        title="Configured for every context."
        description="Every industry has its own visual language. ORTEQ designs and delivers the right system for yours."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((ind) => (
          <Link
            key={ind.slug}
            to="/industries/$slug"
            params={{ slug: ind.slug }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl bg-secondary ring-1 ring-hairline"
          >
            <img src={ind.image} alt={ind.name} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="font-display text-xl font-semibold">{ind.name}</h3>
              <p className="mt-1 max-w-[36ch] text-sm text-white/80 text-pretty line-clamp-2">{ind.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
