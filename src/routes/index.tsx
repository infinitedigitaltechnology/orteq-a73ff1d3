import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Zap, Wrench } from "lucide-react";

import { PRODUCTS, INDUSTRIES, PROJECTS, COUNTERS, CLIENTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroBanner } from "@/components/site/HeroBanner";
import { ProductCarousel } from "@/components/site/ProductCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ORTEQ India — Premium Display Solutions" },
      {
        name: "description",
        content:
          "Premium LED walls, interactive panels, video walls and digital signage engineered for India's most demanding environments.",
      },
      { property: "og:title", content: "ORTEQ India — Premium Display Solutions" },
      {
        property: "og:description",
        content:
          "Premium LED walls, interactive panels, video walls and digital signage engineered for India's most demanding environments.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatStrip />
      <MarqueeClients />
      <EditorialFeature />
      <ProductCarousel />
      <Pillars />
      <IndustriesMagazine />
      <MetricsBand />
      <FeaturedProjects />
      <ClosingCTA />
    </>
  );
}

function StatStrip() {
  return (
    <section className="border-b border-hairline bg-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 md:grid-cols-4">
        {COUNTERS.map((c) => (
          <div key={c.label} className="border-hairline py-8 md:border-l md:pl-8 md:first:border-l-0 md:first:pl-0">
            <dt className="font-display text-3xl font-semibold text-foreground md:text-4xl">{c.value}</dt>
            <dd className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {c.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function MarqueeClients() {
  const list = [...CLIENTS, ...CLIENTS];
  return (
    <section aria-label="Trusted by" className="border-b border-hairline bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-4 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Trusted by India's most demanding organisations
        </div>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee gap-14 whitespace-nowrap font-display text-lg font-semibold text-muted-foreground/70">
            {list.map((c, i) => (
              <span key={c + i} className="tracking-widest">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialFeature() {
  const hero = PRODUCTS[0];
  const side = PRODUCTS.slice(1, 4);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="lg:col-span-7"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Cover story</span>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tight text-foreground md:text-5xl text-balance">
            {hero.name} — the flagship canvas.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            {hero.description}
          </p>
          <Link
            to="/products/$slug"
            params={{ slug: hero.slug }}
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Read the full spec <ArrowRight className="size-4" />
          </Link>
          <div className="mt-8 overflow-hidden rounded-3xl border border-hairline bg-secondary">
            <img
              src={hero.image}
              alt={hero.name}
              className="aspect-[16/10] size-full object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        <div className="flex flex-col divide-y divide-hairline border-hairline lg:col-span-5 lg:border-l lg:pl-10">
          {side.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group flex gap-5 py-6 first:pt-0"
            >
              <div className="size-28 shrink-0 overflow-hidden rounded-2xl bg-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                  {p.applications[0]}
                </div>
                <h3 className="mt-1 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                  {p.name}
                  <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  const pillars = [
    {
      icon: Sparkles,
      title: "Studio-grade colour",
      copy: "10-bit panels, HDR10 pipelines, factory-calibrated Delta-E under 2.",
    },
    { icon: Zap, title: "3840 Hz refresh", copy: "Broadcast-safe playback with genlock synchronisation." },
    { icon: ShieldCheck, title: "3-year warranty", copy: "On-site coverage across 85+ Indian cities." },
    { icon: Wrench, title: "48-hour service SLA", copy: "Certified engineers, guaranteed response times." },
  ];
  return (
    <section className="border-y border-hairline bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Engineered advantage" title="Built like flagship. Rated for industry." />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="rounded-2xl border border-hairline bg-white p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-6 inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustriesMagazine() {
  const [lead, ...rest] = INDUSTRIES.slice(0, 7);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Industries"
        title="Every industry has its stage."
        description="ORTEQ engineers vertical-specific display architectures — configured, delivered and serviced end-to-end."
        action={
          <Link
            to="/industries"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline md:inline"
          >
            All industries →
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Link
          to="/industries/$slug"
          params={{ slug: lead.slug }}
          className="group relative min-h-[24rem] overflow-hidden rounded-3xl bg-secondary ring-1 ring-hairline lg:col-span-7 lg:min-h-[34rem]"
        >
          <img
            src={lead.image}
            alt={lead.name}
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-background">
            <div className="text-[10px] font-medium uppercase tracking-[0.22em] opacity-80">Featured industry</div>
            <h3 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{lead.name}</h3>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-widest">
              View solutions <ArrowRight className="size-3" />
            </span>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-2">
          {rest.map((ind) => (
            <Link
              key={ind.slug}
              to="/industries/$slug"
              params={{ slug: ind.slug }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary ring-1 ring-hairline"
            >
              <img
                src={ind.image}
                alt={ind.name}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-sm font-medium text-background">{ind.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsBand() {
  return (
    <section className="bg-foreground py-20 text-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 md:grid-cols-4">
        {[
          ["100k hrs", "LED lifespan"],
          ["600 nits", "Peak brightness"],
          ["0.88 mm", "Combined bezel"],
          ["24 × 7", "Duty cycle"],
        ].map(([v, l]) => (
          <div key={l} className="border-l border-background/15 pl-6">
            <div className="font-display text-4xl font-semibold md:text-5xl">{v}</div>
            <div className="mt-2 text-xs font-medium uppercase tracking-widest text-background/60">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Recent installations"
        title="Delivered across India."
        action={
          <Link
            to="/projects"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline md:inline"
          >
            All projects →
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="group overflow-hidden rounded-3xl border border-hairline bg-white transition-shadow hover:shadow-lift"
          >
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.image}
                alt={p.title}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <div className="text-[10px] font-medium uppercase tracking-widest text-primary">
                {p.industry} · {p.location}
              </div>
              <h3 className="mt-2 font-display text-lg font-semibold text-balance">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-4xl bg-brand-dark p-10 text-background md:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-primary/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-primary-foreground/80">
              Talk to an expert
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl text-balance">
              Let's engineer your visual system.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-background/70">
              A dedicated ORTEQ solutions engineer will audit your space, size the right hardware and
              deliver a fully-costed proposal within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
            >
              Book a demo <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
            >
              Get catalogue
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
