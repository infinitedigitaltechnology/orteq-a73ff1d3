import { createFileRoute } from "@tanstack/react-router";
import { PROJECTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — ORTEQ India" },
      { name: "description", content: "Recent ORTEQ installations across corporate, education, retail and public infrastructure." },
      { property: "og:title", content: "Projects — ORTEQ India" },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Case studies"
        title="Installations. Delivered."
        description="A selection of recent ORTEQ deployments across India."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((p, idx) => (
          <article
            key={p.title}
            className={`overflow-hidden rounded-3xl border border-hairline bg-white ${
              idx === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="aspect-[16/9] overflow-hidden bg-secondary">
              <img src={p.image} alt={p.title} className="size-full object-cover" loading="lazy" />
            </div>
            <div className="p-8">
              <div className="text-[10px] font-medium uppercase tracking-widest text-primary">
                {p.industry} · {p.location}
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-balance">{p.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
