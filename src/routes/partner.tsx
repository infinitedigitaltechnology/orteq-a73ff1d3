import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner Program — ORTEQ India" },
      { name: "description", content: "System integrators, AV consultants and architects — partner with ORTEQ." },
      { property: "og:url", content: "/partner" },
    ],
    links: [{ rel: "canonical", href: "/partner" }],
  }),
  component: PartnerPage,
});

function PartnerPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Partner"
        title="For integrators, consultants & architects."
        description="ORTEQ works alongside your team — spec support, BOQ engineering and joint deployment."
      />
      <div className="rounded-3xl border border-hairline bg-white p-8">
        <p className="text-base leading-relaxed text-foreground/85">
          Whether you're an AV integrator, a design consultant or an architect specifying displays for a new
          build — ORTEQ's engineering team supports you from concept to commissioning. Write to us at
          <span className="font-medium text-primary"> partners@orteq.in</span> to be enrolled in our program.
        </p>
      </div>
    </div>
  );
}
