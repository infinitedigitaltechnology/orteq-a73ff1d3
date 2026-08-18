import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ORTEQ India | Nationwide Display Solutions Support" },
      {
        name: "description",
        content:
          "Get in touch with ORTEQ India for product inquiries, site surveys, or technical support. Nationwide presence with 48-hour response guarantee.",
      },
      { property: "og:title", content: "Contact ORTEQ India | Talk to a Solutions Engineer" },
      { property: "og:url", content: "/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Talk to a solutions engineer."
        description="Tell us about your space. We'll size the right system and reply within 48 hours."
      />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6">
          <InfoCard icon={<Phone className="size-4" />} title="Sales">
            <div className="flex flex-col gap-1">
              <a href="tel:+919524733999" className="hover:text-primary transition-colors">+91 95247 33999</a>
              <a href="tel:+918122273295" className="hover:text-primary transition-colors">+91 81222 73295</a>
              <a href="tel:+919840909409" className="hover:text-primary transition-colors">+91 98409 09409</a>
            </div>
          </InfoCard>
          <InfoCard icon={<Mail className="size-4" />} title="Email">
            <a href="mailto:admin@orteq.in" className="hover:text-primary transition-colors">admin@orteq.in</a>
          </InfoCard>
          <InfoCard icon={<MapPin className="size-4" />} title="HQ">
            37, Old No.62, South West Boag Road,<br />
            T. Nagar, Chennai-600017
          </InfoCard>
          <div className="rounded-3xl bg-foreground p-8 text-background">
            <h3 className="font-display text-lg font-semibold">Response guarantee</h3>
            <p className="mt-2 text-sm text-background/70">
              Every enquiry gets a personalised, fully-costed proposal within 48 business hours.
            </p>
          </div>
        </div>
        <div className="md:col-span-3">
          {sent ? (
            <div className="rounded-3xl border border-hairline bg-white p-10">
              <h3 className="font-display text-2xl font-semibold">Thanks — we're on it.</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                An ORTEQ solutions engineer will be in touch shortly.
              </p>
            </div>
          ) : (
            <form
              className="grid grid-cols-1 gap-4 rounded-3xl border border-hairline bg-white p-8 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Field label="Full name" name="name" required />
              <Field label="Company" name="company" />
              <Field label="Work email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Interested in</span>
                <select
                  name="product"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                >
                  <option>All-In-One Displays</option>
                  <option>Digital LED Walls</option>
                  <option>Interactive Flat Panels</option>
                  <option>LCD Video Walls</option>
                  <option>Commercial Displays</option>
                  <option>Self-Service / POS</option>
                  <option>Industrial Displays</option>
                </select>
              </label>
              <label className="md:col-span-2">
                <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                />
              </label>
              <button className="md:col-span-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:brightness-110">
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-hairline bg-white p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</span>
      </div>
      <div className="mt-3 font-display text-base font-medium">{children}</div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
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
