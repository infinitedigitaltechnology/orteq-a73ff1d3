import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";

const POSTS = [
  { title: "How fine-pitch LED is redefining boardrooms", tag: "Insight", read: "6 min" },
  { title: "Digital signage ROI: a field guide for retailers", tag: "Retail", read: "8 min" },
  { title: "Building 24×7 command centers that never blink", tag: "Control rooms", read: "10 min" },
  { title: "The new physics of interactive classrooms", tag: "Education", read: "5 min" },
  { title: "Choosing between LCD video walls and LED", tag: "Comparison", read: "7 min" },
  { title: "IP-rated displays for Indian manufacturing", tag: "Industrial", read: "6 min" },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — ORTEQ India" },
      { name: "description", content: "Practical guides, case studies and industry insights from ORTEQ's display engineers." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading eyebrow="Insights" title="Ideas, engineered." />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <article key={p.title} className="rounded-3xl border border-hairline bg-white p-8">
            <div className="text-[10px] font-medium uppercase tracking-widest text-primary">{p.tag} · {p.read}</div>
            <h3 className="mt-3 font-display text-xl font-semibold text-balance">{p.title}</h3>
            <p className="mt-4 text-sm text-muted-foreground">Coming soon on the ORTEQ insights journal.</p>
          </article>
        ))}
      </div>
    </div>
  );
}
