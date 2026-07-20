import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Sparkles, Zap, Wrench } from "lucide-react";

import heroLedWall from "@/assets/hero-led-wall.jpg";
import { PRODUCTS, INDUSTRIES, PROJECTS, COUNTERS, CLIENTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

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
      { property: "og:description", content: "Premium LED walls, interactive panels, video walls and digital signage engineered for India's most demanding environments." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeClients />
      <Bento />
      <ProductsShowcase />
      <MetricsBand />
      <IndustriesGrid />
      <FeaturedProjects />
      <ClosingCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pt-16 pb-24 lg:grid-cols-12 lg:pt-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" /> India · Est. 2010
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] text-balance">
            Display solutions
            <br /> to <span className="text-primary">everyone.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            From boardrooms to skylines — ORTEQ engineers LED walls, interactive panels and mission-critical
            video systems that outperform every expectation.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
            >
              Explore products
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
            >
              Book a demo
            </Link>
          </div>
          <dl className="mt-14 grid max-w-lg grid-cols-4 gap-6 border-t border-hairline pt-8">
            {COUNTERS.map((c) => (
              <div key={c.label}>
                <dt className="font-display text-2xl font-semibold text-foreground">{c.value}</dt>
                <dd className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground leading-tight">
                  {c.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: 0.1 }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lift">
            <img
              src={heroLedWall}
              alt="ORTEQ 8K LED video wall installation"
              className="size-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-3 backdrop-blur-xl">
              <div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  Featured
                </div>
                <div className="font-display text-sm font-medium">All-In-One 165" LED</div>
              </div>
              <Link
                to="/products/$slug"
                params={{ slug: "all-in-one-displays" }}
                className="inline-flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
                aria-label="View product"
              >
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeClients() {
  const list = [...CLIENTS, ...CLIENTS];
  return (
    <section aria-label="Trusted by" className="border-y border-hairline bg-white py-8">
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

function Bento() {
  const items = PRODUCTS.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Signal Grid"
        title="Six flagship canvases. One studio."
        description="Each product is engineered for a distinct professional context — from boardrooms to city-scale outdoor advertising."
        action={
          <Link
            to="/products"
            className="hidden text-sm font-medium text-primary underline-offset-4 hover:underline md:inline"
          >
            View full range →
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:auto-rows-[18rem]">
        {items.map((p, idx) => {
          const large = idx === 0;
          return (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className={`group relative overflow-hidden rounded-3xl bg-secondary ring-1 ring-hairline transition-shadow hover:shadow-lift ${
                large ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={p.image}
                alt={p.name}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <div className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-75">
                  {p.tagline}
                </div>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{p.name}</h3>
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function ProductsShowcase() {
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
        <SectionHeading
          eyebrow="Engineered advantage"
          title="Built like flagship. Rated for industry."
        />
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

function MetricsBand() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
        {[
          ["100k hrs", "LED lifespan"],
          ["600 nits", "Peak brightness"],
          ["0.88 mm", "Combined bezel"],
          ["24 × 7", "Duty cycle"],
        ].map(([v, l]) => (
          <div key={l} className="border-l border-hairline pl-6">
            <div className="font-display text-4xl font-semibold text-foreground md:text-5xl">{v}</div>
            <div className="mt-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IndustriesGrid() {
  return (
    <section className="bg-foreground/[0.02] py-24">
      <div className="mx-auto max-w-7xl px-6">
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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {INDUSTRIES.slice(0, 8).map((ind) => (
            <Link
              key={ind.slug}
              to="/industries/$slug"
              params={{ slug: ind.slug }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary ring-1 ring-hairline"
            >
              <img
                src={ind.image}
                alt={ind.name}
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="font-display text-base font-medium text-white">{ind.name}</div>
                <div className="mt-1 flex items-center gap-1 text-[10px] font-medium uppercase tracking-widest text-white/75">
                  View solutions <ArrowRight className="size-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
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
      <div className="relative overflow-hidden rounded-4xl bg-foreground p-10 text-background md:p-16">
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
