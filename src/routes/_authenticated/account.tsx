import { createFileRoute, Link } from "@tanstack/react-router";
import { useSession, useRoles } from "@/hooks/use-session";

export const Route = createFileRoute("/_authenticated/account")({
  component: AccountPage,
});

function AccountPage() {
  const { user } = useSession();
  const { roles } = useRoles(user);
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">{user?.email}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {roles.length ? roles.map((r) => (
          <span key={r} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium capitalize">{r}</span>
        )) : (
          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">customer</span>
        )}
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <PortalCard to="/dealer-portal" title="Dealer Portal" description="Apply, submit quote requests, track status." />
        <PortalCard to="/support-portal" title="Support Portal" description="Raise tickets, upload attachments, view replies." />
        <PortalCard to="/admin" title="Admin CMS" description="Manage products, industries, solutions, projects, downloads, blog." />
      </div>
    </div>
  );
}

function PortalCard({ to, title, description }: { to: string; title: string; description: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-hairline bg-white p-5 transition-shadow hover:shadow-md">
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}
