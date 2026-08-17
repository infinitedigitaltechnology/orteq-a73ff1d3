import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PRODUCTS } from "@/lib/site-data";
import { SectionHeading } from "@/components/site/SectionHeading";

export function ProductCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused) return;
    const id = window.setInterval(() => api.scrollNext(), 4000);
    return () => window.clearInterval(id);
  }, [api, paused]);

  return (
    <section className="border-b border-hairline bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Product range"
          title="The ORTEQ range"
          description="Swipe through the complete portfolio — every canvas engineered for a distinct professional context."
        />
      </div>

      <div
        className="mx-auto max-w-7xl px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Carousel opts={{ loop: true, align: "start" }} setApi={setApi}>
          <CarouselContent className="-ml-4">
            {PRODUCTS.map((p) => (
              <CarouselItem key={p.slug} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3">
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group block overflow-hidden rounded-3xl border border-hairline bg-white transition-shadow hover:shadow-lift"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-secondary">
                    <img
                      src={p.image}
                      alt={`${p.name} — ${p.tagline}`}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-[10px] font-medium uppercase tracking-widest text-primary">
                      {p.applications[0]}
                    </div>
                    <h3 className="mt-2 flex items-center justify-between gap-3 font-display text-xl font-semibold">
                      {p.name}
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.tagline}</p>
                    <span className="mt-4 inline-block text-xs font-medium text-primary underline-offset-4 group-hover:underline">
                      View product
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-2 hidden md:flex" />
          <CarouselNext className="-right-2 hidden md:flex" />
        </Carousel>

        <div className="mt-8 flex justify-center gap-2">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Go to ${p.name}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === selected ? "w-7 bg-primary" : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
