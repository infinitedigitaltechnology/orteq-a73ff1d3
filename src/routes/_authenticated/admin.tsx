import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useRoles } from "@/hooks/use-session";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Check, X, ShieldOff } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin CMS — ORTEQ India" }] }),
  component: AdminPage,
});

type ContentStatus = "draft" | "published";
type TableName = "products" | "industries" | "solutions" | "projects" | "downloads" | "blog_posts";

type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "json" | "select";
  options?: { value: string; label: string }[];
  placeholder?: string;
  span?: 1 | 2;
};

const SHARED_META: FieldDef[] = [
  { key: "slug", label: "Slug", placeholder: "unique-slug" },
  { key: "title", label: "Title", span: 2 },
  { key: "tagline", label: "Tagline", span: 2 },
  { key: "cover_image", label: "Cover image URL", span: 2 },
  { key: "body", label: "Body / description", type: "textarea", span: 2 },
  { key: "sort_order", label: "Sort order", type: "number" },
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { value: "draft", label: "Draft" },
      { value: "published", label: "Published" },
    ],
  },
  { key: "seo_title", label: "SEO title", span: 2 },
  { key: "seo_description", label: "SEO description", type: "textarea", span: 2 },
];

const TABLE_CONFIG: Record<TableName, { label: string; fields: FieldDef[] }> = {
  products: {
    label: "Products",
    fields: [
      ...SHARED_META,
      { key: "category", label: "Category" },
      { key: "features", label: "Features (JSON array of strings)", type: "json", span: 2 },
      { key: "specs", label: "Specs (JSON array of {label,value})", type: "json", span: 2 },
      { key: "gallery", label: "Gallery (JSON array of URLs)", type: "json", span: 2 },
    ],
  },
  industries: {
    label: "Industries",
    fields: [
      ...SHARED_META,
      { key: "challenges", label: "Challenges (JSON array)", type: "json", span: 2 },
      { key: "outcomes", label: "Outcomes (JSON array)", type: "json", span: 2 },
    ],
  },
  solutions: {
    label: "Solutions",
    fields: [
      ...SHARED_META,
      { key: "highlights", label: "Highlights (JSON array)", type: "json", span: 2 },
    ],
  },
  projects: {
    label: "Projects",
    fields: [
      ...SHARED_META,
      { key: "client", label: "Client" },
      { key: "location", label: "Location" },
      { key: "year", label: "Year", type: "number" },
      { key: "gallery", label: "Gallery (JSON array of URLs)", type: "json", span: 2 },
    ],
  },
  downloads: {
    label: "Downloads",
    fields: [
      { key: "slug", label: "Slug" },
      { key: "title", label: "Title", span: 2 },
      { key: "description", label: "Description", type: "textarea", span: 2 },
      { key: "file_url", label: "File URL", span: 2 },
      { key: "file_size", label: "File size (bytes)", type: "number" },
      { key: "category", label: "Category" },
      { key: "sort_order", label: "Sort order", type: "number" },
      {
        key: "status", label: "Status", type: "select",
        options: [{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }],
      },
    ],
  },
  blog_posts: {
    label: "Blog posts",
    fields: [
      ...SHARED_META.filter((f) => f.key !== "sort_order"),
      { key: "excerpt", label: "Excerpt", type: "textarea", span: 2 },
      { key: "category", label: "Category" },
      { key: "author", label: "Author" },
    ],
  },
};

const JSON_KEYS = new Set(["features", "specs", "gallery", "challenges", "outcomes", "highlights"]);

function AdminPage() {
  const { user } = useSession();
  const { roles, loading: rolesLoading, has } = useRoles(user);
  const [tab, setTab] = useState<TableName | "leads">("products");

  if (rolesLoading) return <div className="flex h-40 items-center justify-center"><Loader2 className="size-5 animate-spin" /></div>;
  if (!has("admin") && !has("editor")) {
    return (
      <div className="rounded-2xl border border-hairline bg-white p-8 text-center">
        <ShieldOff className="mx-auto size-8 text-muted-foreground" />
        <h2 className="mt-3 font-display text-lg font-semibold">Admin access required</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account doesn't have the admin or editor role. Roles: {roles.join(", ") || "none"}.
        </p>
      </div>
    );
  }

  const tabs: { key: typeof tab; label: string }[] = [
    { key: "products", label: "Products" },
    { key: "industries", label: "Industries" },
    { key: "solutions", label: "Solutions" },
    { key: "projects", label: "Projects" },
    { key: "downloads", label: "Downloads" },
    { key: "blog_posts", label: "Blog" },
    { key: "leads", label: "Dealer leads" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Admin CMS</h1>
      <p className="mt-1 text-sm text-muted-foreground">Create and update content that powers the public site.</p>
      <div className="mt-6 flex flex-wrap gap-1 rounded-full border border-hairline bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {tab === "leads" ? <LeadsPanel isAdmin={has("admin")} /> : <CmsPanel table={tab} />}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;

function CmsPanel({ table }: { table: TableName }) {
  const cfg = TABLE_CONFIG[table];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);

  async function load() {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase as any).from(table).select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }
  useEffect(() => { load(); setEditing(null); }, [table]);

  async function del(id: string) {
    if (!confirm("Delete this record?")) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from(table).delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted.");
    load();
  }

  const emptyRow: Row = useMemo(() => {
    const base: Row = { status: "draft", sort_order: 0 };
    for (const f of cfg.fields) if (JSON_KEYS.has(f.key)) base[f.key] = [];
    return base;
  }, [cfg]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">{cfg.label}</h2>
        <button
          onClick={() => setEditing(emptyRow)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
        >
          <Plus className="size-4" /> New
        </button>
      </div>
      {editing && (
        <EditForm
          table={table}
          fields={cfg.fields}
          row={editing}
          onCancel={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
      {loading ? (
        <div className="flex h-32 items-center justify-center"><Loader2 className="size-5 animate-spin" /></div>
      ) : rows.length === 0 ? (
        <p className="rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">No entries yet.</p>
      ) : (
        <div className="divide-y divide-hairline rounded-2xl border border-hairline bg-white">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center justify-between gap-3 px-5 py-3">
              <div className="min-w-0">
                <div className="font-medium truncate">{r.title ?? r.slug ?? r.id}</div>
                <div className="text-xs text-muted-foreground">{r.slug} · <span className="capitalize">{r.status ?? "—"}</span></div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditing(r)} className="rounded-full border border-border p-2 hover:border-primary">
                  <Pencil className="size-3.5" />
                </button>
                <button onClick={() => del(r.id)} className="rounded-full border border-border p-2 hover:border-red-500 hover:text-red-500">
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EditForm({
  table, fields, row, onCancel, onSaved,
}: {
  table: TableName;
  fields: FieldDef[];
  row: Row;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [state, setState] = useState<Row>(() => {
    const initial: Row = { ...row };
    for (const f of fields) {
      if (JSON_KEYS.has(f.key) && initial[f.key] != null && typeof initial[f.key] !== "string") {
        initial[f.key] = JSON.stringify(initial[f.key], null, 2);
      }
    }
    return initial;
  });
  const [saving, setSaving] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload: Row = {};
    for (const f of fields) {
      let v = state[f.key];
      if (v === "" || v === undefined) v = null;
      if (JSON_KEYS.has(f.key) && typeof v === "string") {
        try { v = JSON.parse(v); } catch { setSaving(false); return toast.error(`Invalid JSON in ${f.label}`); }
      }
      if (f.type === "number" && v != null && v !== "") v = Number(v);
      payload[f.key] = v;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q = supabase.from(table) as any;
    const { error } = row.id
      ? await q.update(payload).eq("id", row.id)
      : await q.insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(row.id ? "Updated." : "Created.");
    onSaved();
  }

  return (
    <form onSubmit={save} className="mb-4 rounded-2xl border border-hairline bg-white p-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {fields.map((f) => {
          const value = state[f.key] ?? "";
          const set = (v: unknown) => setState((s) => ({ ...s, [f.key]: v }));
          const cls = f.span === 2 ? "md:col-span-2" : "";
          if (f.type === "textarea" || f.type === "json") {
            return (
              <label key={f.key} className={cls}>
                <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{f.label}</span>
                <textarea
                  value={value as string}
                  onChange={(e) => set(e.target.value)}
                  rows={f.type === "json" ? 5 : 3}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 font-mono text-xs outline-none focus:border-primary"
                />
              </label>
            );
          }
          if (f.type === "select") {
            return (
              <label key={f.key} className={cls}>
                <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{f.label}</span>
                <select
                  value={value as string}
                  onChange={(e) => set(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </label>
            );
          }
          return (
            <label key={f.key} className={cls}>
              <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{f.label}</span>
              <input
                type={f.type === "number" ? "number" : "text"}
                value={value as string}
                onChange={(e) => set(e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          );
        })}
      </div>
      <div className="mt-4 flex gap-2">
        <button
          disabled={saving}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60"
        >
          {saving ? "Saving..." : row.id ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-border bg-white px-5 py-2 text-sm font-medium hover:bg-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

type Dealer = Database["public"]["Tables"]["dealers"]["Row"];
type Quote = Database["public"]["Tables"]["quote_requests"]["Row"];

function LeadsPanel({ isAdmin }: { isAdmin: boolean }) {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const [{ data: d }, { data: q }] = await Promise.all([
      supabase.from("dealers").select("*").order("created_at", { ascending: false }),
      supabase.from("quote_requests").select("*").order("created_at", { ascending: false }),
    ]);
    setDealers(d ?? []);
    setQuotes(q ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setDealerStatus(id: string, status: Dealer["status"]) {
    if (!isAdmin) return toast.error("Only admins can change dealer status.");
    const { error } = await supabase.from("dealers").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Dealer ${status}.`);
    load();
  }

  async function setQuoteStatus(id: string, status: Quote["status"]) {
    const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Updated.");
    load();
  }

  if (loading) return <div className="flex h-32 items-center justify-center"><Loader2 className="size-5 animate-spin" /></div>;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Dealer applications</h2>
        {dealers.length === 0 ? (
          <p className="rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">No applications.</p>
        ) : (
          <div className="divide-y divide-hairline rounded-2xl border border-hairline bg-white">
            {dealers.map((d) => (
              <div key={d.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{d.company} — {d.contact_name}</div>
                  <div className="text-xs text-muted-foreground">{d.email} · {d.city ?? "—"}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">{d.status}</span>
                  {d.status === "pending" && isAdmin && (
                    <>
                      <button onClick={() => setDealerStatus(d.id, "approved")} className="rounded-full border border-emerald-300 bg-emerald-50 p-2 text-emerald-700 hover:bg-emerald-100">
                        <Check className="size-3.5" />
                      </button>
                      <button onClick={() => setDealerStatus(d.id, "rejected")} className="rounded-full border border-red-300 bg-red-50 p-2 text-red-700 hover:bg-red-100">
                        <X className="size-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-display text-lg font-semibold">Quote requests</h2>
        {quotes.length === 0 ? (
          <p className="rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">No quote requests.</p>
        ) : (
          <div className="divide-y divide-hairline rounded-2xl border border-hairline bg-white">
            {quotes.map((q) => (
              <div key={q.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <div className="font-medium truncate">{q.customer_name} — {q.customer_company ?? "—"}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(q.created_at).toLocaleDateString()} · {(q.product_slugs as string[]).join(", ")}
                  </div>
                </div>
                <select
                  value={q.status}
                  onChange={(e) => setQuoteStatus(q.id, e.target.value as Quote["status"])}
                  className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium"
                >
                  {["draft","submitted","in_review","quoted","won","lost","cancelled"].map((s) => (
                    <option key={s} value={s}>{s.replace("_"," ")}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
