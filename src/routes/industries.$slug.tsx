import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { INDUSTRIES, PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = INDUSTRIES.find((i) => i.slug === params.slug);
    if (!industry) throw notFound();
    const recommended = industry.recommended
      .map((s) => PRODUCTS.find((p) => p.slug === s))
      .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));
    return { industry, recommended };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Industry not found — ORTEQ" }, { name: "robots", content: "noindex" }] };
    const { industry } = loaderData;
    return {
      meta: [
        { title: `${industry.name} — Display Solutions | ORTEQ India` },
        { name: "description", content: industry.description },
        { property: "og:title", content: `${industry.name} — Display Solutions | ORTEQ India` },
        { property: "og:description", content: industry.description },
        { property: "og:url", content: `/industries/${params.slug}` },
        { property: "og:image", content: industry.image },
      ],
      links: [{ rel: "canonical", href: `/industries/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Industry not found</h1>
      <Link to="/industries" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
        ← Back to industries
      </Link>
    </div>
  ),
  component: IndustryDetail,
});

function IndustryDetail() {
  const { industry, recommended } = Route.useLoaderData();
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={industry.image} alt="" className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-24 md:pt-40 md:pb-32 text-white">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">Industry</span>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight md:text-7xl text-balance">
            {industry.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty">
            {industry.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">Challenges</span>
            <ul className="mt-6 space-y-4">
              {industry.challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-base text-foreground/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">ORTEQ answers</span>
            <ul className="mt-6 space-y-4">
              {industry.solutions.map((c) => (
                <li key={c} className="flex items-start gap-3 text-base text-foreground/85">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-hairline bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 font-display text-2xl font-semibold">Recommended products</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recommended.map((p) => (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-3xl border border-hairline bg-white transition-shadow hover:shadow-lift"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  <img src={p.image} alt={p.name} className="size-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="flex items-center justify-between font-display text-lg font-semibold">
                    {p.name}
                    <ArrowRight className="size-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
