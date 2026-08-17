import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Visual Solutions | Smart Classrooms & Digital Signage | ORTEQ India" },
      {
        name: "description",
        content:
          "Explore ORTEQ's turnkey visual systems: boardroom LED, digital kiosks, control room video walls, and smart classroom interactivity.",
      },
      { property: "og:title", content: "Turnkey Visual Solutions | ORTEQ India" },
      { property: "og:url", content: "/solutions" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Solutions"
        title="Turnkey visual systems."
        description="Every ORTEQ solution is a fully-engineered outcome — hardware, software, service and support delivered as one."
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((s) => (
          <Link
            key={s.slug}
            to="/solutions/$slug"
            params={{ slug: s.slug }}
            className="group flex items-start justify-between gap-4 rounded-3xl border border-hairline bg-white p-6 transition-shadow hover:shadow-lift"
          >
            <div>
              <h3 className="font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-2 max-w-[36ch] text-sm text-muted-foreground text-pretty">{s.summary}</p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </div>
  );
}
