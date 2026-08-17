import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/site-data";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product Not Found | ORTEQ India" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | ORTEQ India Premium Displays` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} | ORTEQ India` },
        { property: "og:description", content: product.description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/products/${params.slug}` },
        { property: "og:image", content: product.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: product.image },
      ],
      links: [{ rel: "canonical", href: `/products/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl font-semibold">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
        ← Back to all products
      </Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  return (
    <div>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pt-12 pb-16 md:grid-cols-2 md:pt-20 md:pb-24">
        <div className="relative order-first aspect-square overflow-hidden rounded-3xl bg-secondary md:aspect-[4/5]">
          <img src={product.image} alt={product.name} className="size-full object-cover" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            {product.applications[0]}
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl text-balance">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-xl font-medium text-foreground/80">{product.tagline}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground text-pretty">
            {product.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:brightness-110"
            >
              Request quote <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-medium hover:border-foreground"
            >
              Download datasheet
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hairline pt-8">
            {product.specs.map((s: { label: string; value: string }) => (
              <div key={s.label}>
                <dt className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-0.5 font-display text-sm font-semibold text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-y border-hairline bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold">Key features</h2>
              <ul className="mt-6 space-y-3">
                {product.features.map((f: string) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Why ORTEQ</h2>
              <ul className="mt-6 space-y-3">
                {product.advantages.map((f: string) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-8 font-display text-2xl font-semibold">Ideal applications</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {product.applications.map((a: string) => (
            <div
              key={a}
              className="rounded-2xl border border-hairline bg-white p-5 text-sm font-medium text-foreground"
            >
              {a}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
