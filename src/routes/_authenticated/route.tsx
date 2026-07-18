import { createFileRoute, Outlet, redirect, Link, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useRoles } from "@/hooks/use-session";
import { LayoutDashboard, Ticket, FileText, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user } = useSession();
  const { roles, has } = useRoles(user);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/account", label: "Account", icon: LayoutDashboard, show: true },
    { to: "/dealer-portal", label: "Dealer Portal", icon: FileText, show: has("dealer") || has("admin") },
    { to: "/support-portal", label: "Support Portal", icon: Ticket, show: has("support") || has("admin") || roles.length >= 0 },
    { to: "/admin", label: "Admin CMS", icon: LayoutDashboard, show: has("admin") || has("editor") },
  ] as const;

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-6 py-10">
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="rounded-2xl border border-hairline bg-white p-4">
          <div className="mb-3 px-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Signed in
          </div>
          <div className="mb-4 truncate px-2 text-sm font-medium">{user?.email}</div>
          <nav className="flex flex-col gap-1">
            {links
              .filter((l) => l.show)
              .map((l) => {
                const active = pathname.startsWith(l.to);
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                      active ? "bg-secondary font-medium text-foreground" : "text-muted-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <l.icon className="size-4" />
                    {l.label}
                  </Link>
                );
              })}
          </nav>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
