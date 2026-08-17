import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/dealer")({
  head: () => ({
    meta: [
      { title: "Become a Dealer — ORTEQ India" },
      { name: "description", content: "Join the ORTEQ dealer network. Preferred pricing, protected territories, engineering support." },
      { property: "og:url", content: "/dealer" },
    ],
    links: [{ rel: "canonical", href: "/dealer" }],
  }),
  component: DealerPage,
});

function DealerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Dealer program"
        title="Grow with ORTEQ."
        description="Join a national network of certified partners. Preferred pricing, protected territories and engineering-grade support."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          "Preferred dealer pricing",
          "Protected territories",
          "Certified installation training",
          "Marketing & lead sharing",
          "Priority technical support",
          "Demo unit program",
        ].map((f) => (
          <div key={f} className="flex items-start gap-3 rounded-2xl border border-hairline bg-white p-5">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span className="text-sm font-medium">{f}</span>
          </div>
        ))}
      </div>
      <div className="mt-12 rounded-3xl border border-hairline bg-secondary/40 p-10 text-center">
        <h3 className="font-display text-2xl font-semibold text-balance">Become a certified ORTEQ Partner</h3>
        <p className="mt-3 text-sm text-muted-foreground text-pretty max-w-xl mx-auto">
          Access protected pricing, engineering support, and qualified leads. Applications are reviewed within 3 business days.
        </p>
        <a 
          href="/dealer-portal"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground hover:brightness-110 transition-all"
        >
          Apply to Join Network
        </a>
      </div>
    </div>
  );
}
