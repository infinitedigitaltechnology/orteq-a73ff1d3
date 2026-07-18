import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useRoles } from "@/hooks/use-session";
import { toast } from "sonner";
import { Plus, Loader2, Paperclip, Send } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/support-portal")({
  head: () => ({ meta: [{ title: "Support Portal — ORTEQ India" }] }),
  component: SupportPortalPage,
});

type Ticket = Database["public"]["Tables"]["support_tickets"]["Row"];
type Msg = Database["public"]["Tables"]["ticket_messages"]["Row"];
type Attachment = Database["public"]["Tables"]["ticket_attachments"]["Row"];
type Hist = Database["public"]["Tables"]["ticket_status_history"]["Row"];

function SupportPortalPage() {
  const { user } = useSession();
  const { has } = useRoles(user);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [active, setActive] = useState<Ticket | null>(null);
  const isStaff = has("admin") || has("support");

  async function load() {
    setLoading(true);
    // RLS handles filtering: customer sees own, staff sees all
    const { data } = await supabase.from("support_tickets").select("*").order("created_at", { ascending: false });
    setTickets(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (user) load();
  }, [user?.id]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Support Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isStaff ? "All customer tickets" : "Your tickets and their status history"}
          </p>
        </div>
        <button
          onClick={() => setShowNew((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
        >
          <Plus className="size-4" /> New ticket
        </button>
      </div>
      {showNew && <NewTicketForm onDone={() => { setShowNew(false); load(); }} />}
      {loading ? (
        <div className="flex h-40 items-center justify-center"><Loader2 className="size-5 animate-spin" /></div>
      ) : tickets.length === 0 ? (
        <p className="rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">No tickets yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="space-y-2">
            {tickets.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                  active?.id === t.id ? "border-primary bg-primary/5" : "border-hairline bg-white hover:bg-secondary/40"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium truncate">{t.subject}</div>
                  <StatusBadge status={t.status} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(t.created_at).toLocaleDateString()} · <span className="capitalize">{t.priority}</span>
                </div>
              </button>
            ))}
          </div>
          <div>
            {active ? (
              <TicketDetail
                key={active.id}
                ticket={active}
                isStaff={isStaff}
                onChange={(next) => {
                  setActive(next);
                  setTickets((ts) => ts.map((t) => (t.id === next.id ? next : t)));
                }}
              />
            ) : (
              <div className="rounded-2xl border border-hairline bg-white p-6 text-sm text-muted-foreground">
                Select a ticket to view the conversation.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Ticket["status"] }) {
  const map: Record<Ticket["status"], string> = {
    open: "bg-blue-50 text-blue-700",
    in_progress: "bg-amber-50 text-amber-700",
    waiting_customer: "bg-purple-50 text-purple-700",
    resolved: "bg-emerald-50 text-emerald-700",
    closed: "bg-gray-100 text-gray-700",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${map[status]}`}>{status.replace("_", " ")}</span>;
}

function NewTicketForm({ onDone }: { onDone: () => void }) {
  const { user } = useSession();
  const [form, setForm] = useState({
    subject: "",
    description: "",
    priority: "normal" as Ticket["priority"],
    product_slug: "",
    serial_number: "",
    site_location: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .insert({
        subject: form.subject,
        description: form.description,
        priority: form.priority,
        product_slug: form.product_slug || null,
        serial_number: form.serial_number || null,
        site_location: form.site_location || null,
        created_by: user.id,
        status: "open",
      })
      .select()
      .single();
    if (error || !ticket) {
      setSaving(false);
      return toast.error(error?.message ?? "Failed to create ticket");
    }
    if (file) {
      const path = `${ticket.id}/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("ticket-attachments").upload(path, file);
      if (upErr) {
        toast.error(`Ticket created but attachment failed: ${upErr.message}`);
      } else {
        await supabase.from("ticket_attachments").insert({
          ticket_id: ticket.id,
          file_name: file.name,
          file_path: path,
          file_size: file.size,
          content_type: file.type,
          uploaded_by: user.id,
        });
      }
    }
    setSaving(false);
    toast.success("Ticket created.");
    onDone();
  }

  return (
    <form onSubmit={submit} className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-hairline bg-white p-5 md:grid-cols-2">
      <Field label="Subject" required value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} className="md:col-span-2" />
      <Field label="Product slug" value={form.product_slug} onChange={(v) => setForm({ ...form, product_slug: v })} />
      <Field label="Serial number" value={form.serial_number} onChange={(v) => setForm({ ...form, serial_number: v })} />
      <Field label="Site location" value={form.site_location} onChange={(v) => setForm({ ...form, site_location: v })} className="md:col-span-2" />
      <label>
        <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Priority</span>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value as Ticket["priority"] })}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </label>
      <label>
        <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Attachment</span>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="w-full text-sm" />
      </label>
      <label className="md:col-span-2">
        <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted-foreground">Description</span>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          required
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </label>
      <button
        disabled={saving}
        className="justify-self-start rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60 md:col-span-2"
      >
        {saving ? "Submitting..." : "Create ticket"}
      </button>
    </form>
  );
}

function TicketDetail({
  ticket,
  isStaff,
  onChange,
}: {
  ticket: Ticket;
  isStaff: boolean;
  onChange: (t: Ticket) => void;
}) {
  const { user } = useSession();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [history, setHistory] = useState<Hist[]>([]);
  const [reply, setReply] = useState("");
  const [replyFile, setReplyFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  async function load() {
    const [{ data: m }, { data: a }, { data: h }] = await Promise.all([
      supabase.from("ticket_messages").select("*").eq("ticket_id", ticket.id).order("created_at"),
      supabase.from("ticket_attachments").select("*").eq("ticket_id", ticket.id).order("created_at"),
      supabase.from("ticket_status_history").select("*").eq("ticket_id", ticket.id).order("created_at"),
    ]);
    setMessages(m ?? []);
    setAttachments(a ?? []);
    setHistory(h ?? []);
  }

  useEffect(() => { load(); }, [ticket.id]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !reply.trim()) return;
    setSending(true);
    const { error } = await supabase.from("ticket_messages").insert({
      ticket_id: ticket.id,
      author_id: user.id,
      body: reply,
      is_staff: isStaff,
    });
    if (error) { setSending(false); return toast.error(error.message); }
    if (replyFile) {
      const path = `${ticket.id}/${Date.now()}-${replyFile.name}`;
      const { error: upErr } = await supabase.storage.from("ticket-attachments").upload(path, replyFile);
      if (!upErr) {
        await supabase.from("ticket_attachments").insert({
          ticket_id: ticket.id,
          file_name: replyFile.name,
          file_path: path,
          file_size: replyFile.size,
          content_type: replyFile.type,
          uploaded_by: user.id,
        });
      }
    }
    setReply("");
    setReplyFile(null);
    setSending(false);
    load();
  }

  async function updateStatus(next: Ticket["status"]) {
    const { data, error } = await supabase
      .from("support_tickets")
      .update({ status: next })
      .eq("id", ticket.id)
      .select()
      .single();
    if (error) return toast.error(error.message);
    if (data) onChange(data);
    load();
  }

  async function download(att: Attachment) {
    const { data, error } = await supabase.storage.from("ticket-attachments").createSignedUrl(att.file_path, 60);
    if (error) return toast.error(error.message);
    window.open(data.signedUrl, "_blank");
  }

  return (
    <div className="rounded-2xl border border-hairline bg-white">
      <div className="border-b border-hairline p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold">{ticket.subject}</h3>
            <div className="mt-1 text-xs text-muted-foreground">
              {ticket.product_slug ? `${ticket.product_slug} · ` : ""}
              Priority: <span className="capitalize">{ticket.priority}</span> · Created {new Date(ticket.created_at).toLocaleString()}
            </div>
          </div>
          {isStaff ? (
            <select
              value={ticket.status}
              onChange={(e) => updateStatus(e.target.value as Ticket["status"])}
              className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium"
            >
              <option value="open">Open</option>
              <option value="in_progress">In progress</option>
              <option value="waiting_customer">Waiting customer</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          ) : <StatusBadge status={ticket.status} />}
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/85">{ticket.description}</p>
      </div>

      {attachments.length > 0 && (
        <div className="border-b border-hairline px-5 py-3">
          <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">Attachments</div>
          <div className="flex flex-wrap gap-2">
            {attachments.map((a) => (
              <button
                key={a.id}
                onClick={() => download(a)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs hover:border-primary"
              >
                <Paperclip className="size-3" /> {a.file_name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-h-96 space-y-3 overflow-y-auto p-5">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No replies yet.</p>
        ) : messages.map((m) => (
          <div key={m.id} className={`rounded-xl p-3 text-sm ${m.is_staff ? "bg-primary/5" : "bg-secondary/60"}`}>
            <div className="mb-1 text-xs text-muted-foreground">
              {m.is_staff ? "ORTEQ Support" : "Customer"} · {new Date(m.created_at).toLocaleString()}
            </div>
            <div className="whitespace-pre-wrap">{m.body}</div>
          </div>
        ))}
        {history.length > 0 && (
          <div className="border-t border-hairline pt-3">
            <div className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">Status history</div>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {history.map((h) => (
                <li key={h.id} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" />
                  <span className="capitalize">{h.from_status?.replace("_", " ") ?? "created"} → {h.to_status.replace("_", " ")}</span>
                  <span>· {new Date(h.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <form onSubmit={send} className="border-t border-hairline p-4">
        <textarea
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={2}
          placeholder="Write a reply..."
          className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <input type="file" onChange={(e) => setReplyFile(e.target.files?.[0] ?? null)} className="text-xs text-muted-foreground" />
          <button
            disabled={sending || !reply.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60"
          >
            <Send className="size-3.5" /> Send
          </button>
        </div>
      </form>
    </div>
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
