import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS } from "@/lib/site-data";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = SOLUTIONS.find((s) => s.slug === params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Solution not found — ORTEQ" }, { name: "robots", content: "noindex" }] };
    const { solution } = loaderData;
    return {
      meta: [
        { title: `${solution.name} — ORTEQ India` },
        { name: "description", content: solution.summary },
        { property: "og:title", content: `${solution.name} — ORTEQ India` },
        { property: "og:description", content: solution.summary },
        { property: "og:url", content: `/solutions/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/solutions/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Solution not found</h1>
      <Link to="/solutions" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
        ← Back to solutions
      </Link>
    </div>
  ),
  component: SolutionDetail,
});

function SolutionDetail() {
  const { solution } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Solution</span>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl text-balance">
        {solution.name}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
        {solution.summary}
      </p>
      <div className="mt-10 rounded-3xl border border-hairline bg-secondary/40 p-8">
        <h2 className="font-display text-lg font-semibold">What's included</h2>
        <ul className="mt-4 space-y-2 text-sm text-foreground/85">
          <li>· Site survey & display sizing by certified engineer</li>
          <li>· Hardware, mounting and installation</li>
          <li>· Content management system & training</li>
          <li>· 3-year on-site warranty and 48-hour service SLA</li>
        </ul>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:brightness-110"
        >
          Request a proposal <ArrowRight className="size-4" />
        </Link>
        <Link to="/solutions" className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-medium hover:border-foreground">
          All solutions
        </Link>
      </div>
    </div>
  );
}
