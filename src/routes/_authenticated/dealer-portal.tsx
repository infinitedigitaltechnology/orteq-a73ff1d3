import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/dealer-portal")({
  head: () => ({ meta: [{ title: "Dealer Portal — ORTEQ India" }] }),
  component: DealerPortalPage,
});

type Dealer = Database["public"]["Tables"]["dealers"]["Row"];
type QuoteRequest = Database["public"]["Tables"]["quote_requests"]["Row"];
type StatusEvent = Database["public"]["Tables"]["quote_status_history"]["Row"];

function DealerPortalPage() {
  const { user } = useSession();
  const [dealer, setDealer] = useState<Dealer | null>(null);
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data: d } = await supabase.from("dealers").select("*").eq("user_id", user.id).maybeSingle();
    setDealer(d ?? null);
    const { data: q } = await supabase
      .from("quote_requests")
      .select("*")
      .eq("dealer_user_id", user.id)
      .order("created_at", { ascending: false });
    setQuotes(q ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Dealer Portal</h1>
      {!dealer ? (
        <DealerApplicationForm onDone={load} />
      ) : (
        <>
          <DealerStatusCard dealer={dealer} />
          {dealer.status === "approved" ? (
            <QuotesSection quotes={quotes} onCreated={load} />
          ) : (
            <p className="mt-6 rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">
              Once your dealer application is approved, you'll be able to submit quote requests here.
            </p>
          )}
        </>
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="flex h-64 items-center justify-center text-muted-foreground">
      <Loader2 className="size-5 animate-spin" />
    </div>
  );
}

function DealerApplicationForm({ onDone }: { onDone: () => void }) {
  const { user } = useSession();
  const [form, setForm] = useState({
    company: "",
    contact_name: "",
    email: user?.email ?? "",
    phone: "",
    city: "",
    region: "",
    gst_number: "",
    website: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("dealers").insert({ ...form, user_id: user.id });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Application submitted. We'll review within 3 business days.");
    onDone();
  }

  return (
    <form onSubmit={submit} className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-hairline bg-white p-6 md:grid-cols-2">
      <h2 className="font-display text-lg font-semibold md:col-span-2">Apply to become an ORTEQ dealer</h2>
      <Field label="Company" required value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
      <Field label="Contact name" required value={form.contact_name} onChange={(v) => setForm({ ...form, contact_name: v })} />
      <Field label="Email" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
      <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
      <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
      <Field label="Region / State" value={form.region} onChange={(v) => setForm({ ...form, region: v })} />
      <Field label="GST number" value={form.gst_number} onChange={(v) => setForm({ ...form, gst_number: v })} />
      <Field label="Website" value={form.website} onChange={(v) => setForm({ ...form, website: v })} />
      <label className="md:col-span-2">
        <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Notes</span>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={3}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>
      <button
        disabled={saving}
        className="justify-self-start rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60 md:col-span-2"
      >
        {saving ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}

function DealerStatusCard({ dealer }: { dealer: Dealer }) {
  const color =
    dealer.status === "approved" ? "bg-emerald-50 text-emerald-700" :
    dealer.status === "rejected" ? "bg-red-50 text-red-700" :
    "bg-amber-50 text-amber-700";
  return (
    <div className="mt-6 rounded-2xl border border-hairline bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display text-lg font-semibold">{dealer.company}</div>
          <div className="text-sm text-muted-foreground">{dealer.city}{dealer.region ? `, ${dealer.region}` : ""}</div>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${color}`}>{dealer.status}</span>
      </div>
    </div>
  );
}

function QuotesSection({ quotes, onCreated }: { quotes: QuoteRequest[]; onCreated: () => void }) {
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [history, setHistory] = useState<Record<string, StatusEvent[]>>({});

  async function toggle(id: string) {
    if (expanded === id) return setExpanded(null);
    setExpanded(id);
    if (!history[id]) {
      const { data } = await supabase
        .from("quote_status_history")
        .select("*")
        .eq("quote_id", id)
        .order("created_at", { ascending: true });
      setHistory((h) => ({ ...h, [id]: data ?? [] }));
    }
  }

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Quote requests</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
        >
          <Plus className="size-4" /> New request
        </button>
      </div>
      {showForm && <NewQuoteForm onDone={() => { setShowForm(false); onCreated(); }} />}
      {quotes.length === 0 ? (
        <p className="rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">
          No quote requests yet.
        </p>
      ) : (
        <div className="space-y-2">
          {quotes.map((q) => (
            <div key={q.id} className="rounded-2xl border border-hairline bg-white">
              <button
                onClick={() => toggle(q.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div>
                  <div className="font-medium">{q.customer_name} · {q.customer_company ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(q.created_at).toLocaleDateString()} · {(q.product_slugs as string[]).join(", ") || "no products"}
                  </div>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">{q.status.replace("_", " ")}</span>
              </button>
              {expanded === q.id && (
                <div className="border-t border-hairline px-5 py-4">
                  <div className="mb-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                    <Info label="Email" value={q.customer_email} />
                    <Info label="Phone" value={q.customer_phone} />
                    <Info label="City" value={q.city} />
                    <Info label="Estimated value" value={q.estimated_value ? `₹${q.estimated_value.toLocaleString()}` : null} />
                  </div>
                  {q.requirements && (
                    <div className="mb-3 rounded-lg bg-secondary/60 p-3 text-sm">{q.requirements}</div>
                  )}
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">Status history</div>
                    <ul className="space-y-1 text-sm">
                      {(history[q.id] ?? []).map((h) => (
                        <li key={h.id} className="flex items-center gap-3">
                          <span className="size-1.5 rounded-full bg-primary" />
                          <span className="font-medium capitalize">{h.to_status.replace("_", " ")}</span>
                          <span className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString()}</span>
                          {h.note && <span className="text-xs text-muted-foreground">— {h.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewQuoteForm({ onDone }: { onDone: () => void }) {
  const { user } = useSession();
  const [form, setForm] = useState({
    customer_name: "",
    customer_company: "",
    customer_email: "",
    customer_phone: "",
    city: "",
    product_slugs: "",
    estimated_value: "",
    requirements: "",
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("quote_requests").insert({
      dealer_user_id: user.id,
      customer_name: form.customer_name,
      customer_company: form.customer_company || null,
      customer_email: form.customer_email || null,
      customer_phone: form.customer_phone || null,
      city: form.city || null,
      product_slugs: form.product_slugs.split(",").map((s) => s.trim()).filter(Boolean),
      estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
      requirements: form.requirements || null,
      status: "submitted",
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Quote request submitted.");
    onDone();
  }

  return (
    <form onSubmit={submit} className="mb-4 grid grid-cols-1 gap-3 rounded-2xl border border-hairline bg-white p-5 md:grid-cols-2">
      <Field label="Customer name" required value={form.customer_name} onChange={(v) => setForm({ ...form, customer_name: v })} />
      <Field label="Company" value={form.customer_company} onChange={(v) => setForm({ ...form, customer_company: v })} />
      <Field label="Email" type="email" value={form.customer_email} onChange={(v) => setForm({ ...form, customer_email: v })} />
      <Field label="Phone" value={form.customer_phone} onChange={(v) => setForm({ ...form, customer_phone: v })} />
      <Field label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
      <Field label="Estimated value (₹)" type="number" value={form.estimated_value} onChange={(v) => setForm({ ...form, estimated_value: v })} />
      <Field
        label="Product slugs (comma separated)"
        value={form.product_slugs}
        onChange={(v) => setForm({ ...form, product_slugs: v })}
        className="md:col-span-2"
      />
      <label className="md:col-span-2">
        <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Requirements</span>
        <textarea
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
          rows={3}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>
      <button
        disabled={saving}
        className="justify-self-start rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60 md:col-span-2"
      >
        {saving ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function Field({
  label, value, onChange, type = "text", required, className,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; className?: string }) {
  return (
    <label className={className}>
      <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function Info({ label, value }: { label: string; value: string | number | null }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5">{value ?? "—"}</div>
    </div>
  );
}
