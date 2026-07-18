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
      <div className="mt-12 rounded-3xl border border-hairline bg-secondary/40 p-8 text-center">
        <h3 className="font-display text-xl font-semibold">Ready to apply?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Send us a note at partners@orteq.in — response within 3 business days.</p>
      </div>
    </div>
  );
}
