import { createFileRoute } from "@tanstack/react-router";
import { COUNTERS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ORTEQ India | Leading Commercial Display Solutions" },
      {
        name: "description",
        content:
          "Founded in 2010, ORTEQ India Pvt Ltd is a pioneer in visual technology. We design and deliver premium LED walls, interactive panels and command centers across 85+ cities.",
      },
      { property: "og:title", content: "About ORTEQ India | Engineering India's Display Future" },
      { property: "og:url", content: "/about" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">About us</span>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight md:text-7xl text-balance">
          Engineering India's display future.
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
          Founded in 2010, ORTEQ India Pvt Ltd is one of the country's leading commercial display solutions
          companies. We design, deliver and service visual technology for enterprises, institutions and
          public infrastructure across 85+ cities.
        </p>
      </section>

      <section className="border-y border-hairline bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {COUNTERS.map((c) => (
              <div key={c.label}>
                <div className="font-display text-4xl font-semibold md:text-5xl">{c.value}</div>
                <div className="mt-2 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading eyebrow="Our approach" title="One studio. End-to-end." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            { t: "Design", c: "Site survey, sizing, and content architecture led by senior solutions engineers." },
            { t: "Deploy", c: "In-house installation crews certified for LED walls, video walls and interactive systems." },
            { t: "Support", c: "48-hour on-site SLA across 85+ cities, backed by a 3-year manufacturer warranty." },
          ].map((x) => (
            <div key={x.t} className="rounded-3xl border border-hairline bg-white p-8">
              <h3 className="font-display text-xl font-semibold">{x.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{x.c}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
