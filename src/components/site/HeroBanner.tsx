import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { PRODUCTS } from "@/lib/site-data";

type Slide = {
  kicker: string;
  title: string;
  highlight: string;
  copy: string;
  image: string;
  kind: "product" | "solution";
  slug: string;
};

const bySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

const SLIDES: Slide[] = [
  {
    kicker: "Flagship · All-In-One LED",
    title: "Future technology",
    highlight: "in your hand.",
    copy: "165-inch plug-and-play LED canvases that turn any boardroom into a broadcast studio.",
    image: bySlug("all-in-one-displays")?.image ?? PRODUCTS[0].image,
    kind: "product",
    slug: "all-in-one-displays",
  },
  {
    kicker: "Smart classroom",
    title: "Interactive panels,",
    highlight: "in every classroom.",
    copy: "20-point 4K interactive flat panels that turn lectures into hands-on collaboration.",
    image: bySlug("interactive-flat-panels")?.image ?? PRODUCTS[0].image,
    kind: "product",
    slug: "interactive-flat-panels",
  },
  {
    kicker: "Self-service kiosk",
    title: "Queueless,",
    highlight: "effortless.",
    copy: "Rugged self-service kiosks for check-in, ordering and citizen service automation.",
    image: bySlug("self-service-displays")?.image ?? PRODUCTS[0].image,
    kind: "product",
    slug: "self-service-displays",
  },
  {
    kicker: "Aerial intelligence",
    title: "Eyes in the sky,",
    highlight: "ORTEQ ready.",
    copy: "Enterprise drones for surveillance, inspection, and mapping — from take-off to live stream.",
    image: bySlug("drones")?.image ?? PRODUCTS[0].image,
    kind: "product",
    slug: "drones",
  },
  {
    kicker: "Command & control",
    title: "Every pixel,",
    highlight: "mission-critical.",
    copy: "Seamless digital LED walls and ultra-narrow-bezel video walls built for 24×7 duty cycles.",
    image: bySlug("digital-led-walls")?.image ?? PRODUCTS[1].image,
    kind: "product",
    slug: "digital-led-walls",
  },
  {
    kicker: "Retail & signage",
    title: "Attention,",
    highlight: "engineered.",
    copy: "Cloud-managed signage networks that stay bright, in sync and on brand across every location.",
    image: bySlug("digital-standees")?.image ?? PRODUCTS[2].image,
    kind: "solution",
    slug: "digital-signage",
  },
];

export function HeroBanner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => window.clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];
  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);

  return (
    <section
      className="relative isolate overflow-hidden bg-foreground text-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="ORTEQ featured display solutions"
    >
      <AnimatePresence mode="sync">
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.title + " " + slide.highlight}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
          className="absolute inset-0 size-full object-cover"
          loading="eager"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/30" />
      <div className="pointer-events-none absolute -left-24 top-1/3 size-[28rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 size-[24rem] rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-24 md:min-h-[86vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-background/25 bg-background/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] backdrop-blur-xl">
              <span className="size-1.5 rounded-full bg-primary" />
              {slide.kicker}
            </span>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl lg:text-[5.25rem] text-balance">
              {slide.title}
              <br />
              <span className="text-primary">{slide.highlight}</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-background/75 text-pretty">
              {slide.copy}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {slide.kind === "product" ? (
                <Link
                  to="/products/$slug"
                  params={{ slug: slide.slug }}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
                >
                  Explore this range
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <Link
                  to="/solutions/$slug"
                  params={{ slug: slide.slug }}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
                >
                  Explore this solution
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                Book a demo
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex items-center gap-6">
          <div className="flex gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.kicker}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.kicker}`}
                className={`h-1 rounded-full transition-all ${
                  i === index ? "w-12 bg-primary" : "w-6 bg-background/30 hover:bg-background/60"
                }`}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="inline-flex size-10 items-center justify-center rounded-full border border-background/25 transition-colors hover:bg-background/10"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next slide"
              className="inline-flex size-10 items-center justify-center rounded-full border border-background/25 transition-colors hover:bg-background/10"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
