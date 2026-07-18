import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — ORTEQ India" },
      { name: "description", content: "Raise a service ticket, request warranty support, or reach ORTEQ's technical helpdesk." },
      { property: "og:url", content: "/support" },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: SupportPage,
});

function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Support"
        title="Raise a service ticket."
        description="Certified engineers respond within 48 hours across 85+ Indian cities."
      />
      {submitted ? (
        <div className="rounded-3xl border border-hairline bg-white p-8">
          <h3 className="font-display text-xl font-semibold">Ticket received.</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Our helpdesk will reach out within 4 business hours.
          </p>
        </div>
      ) : (
        <form
          className="grid grid-cols-1 gap-4 rounded-3xl border border-hairline bg-white p-8 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Field label="Full name" name="name" required />
          <Field label="Company" name="company" />
          <Field label="Email" type="email" name="email" required />
          <Field label="Phone" type="tel" name="phone" required />
          <Field label="Installation site" name="site" className="md:col-span-2" />
          <Field label="Serial / invoice number" name="serial" className="md:col-span-2" />
          <label className="md:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Issue</span>
            <textarea
              name="issue"
              rows={4}
              required
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <button className="md:col-span-2 justify-self-start rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:brightness-110">
            Submit ticket
          </button>
        </form>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
