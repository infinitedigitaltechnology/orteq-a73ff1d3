import { createFileRoute } from "@tanstack/react-router";
import { FileDown } from "lucide-react";
import { listCmsProducts, mergeProducts } from "@/lib/products.functions";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/downloads")({
  loader: async () => ({ products: mergeProducts(await listCmsProducts()) }),
  errorComponent: ({ error }) => (
    <div role="alert" className="mx-auto max-w-3xl px-6 py-24 text-center text-sm text-muted-foreground">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">No downloads found.</div>
  ),
  head: () => ({
    meta: [
      { title: "Downloads — ORTEQ India" },
      { name: "description", content: "Datasheets, brochures and installation guides for the full ORTEQ product range." },
      { property: "og:url", content: "/downloads" },
    ],
    links: [{ rel: "canonical", href: "/downloads" }],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  const { products } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Downloads"
        title="Datasheets & brochures."
        description="Everything you need to specify, procure and deploy an ORTEQ display system."
      />
      <ul className="divide-y divide-hairline rounded-3xl border border-hairline bg-white">
        {products.map((p) => (
          <li key={p.slug} className="flex items-center justify-between gap-4 px-6 py-4">
            <div>
              <div className="font-display text-base font-semibold">{p.name} datasheet</div>
              <div className="text-xs text-muted-foreground">PDF · 1.2 MB</div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <FileDown className="size-3.5" /> Request Datasheet
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
