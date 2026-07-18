import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { PRODUCTS, INDUSTRIES, SOLUTIONS } from "@/lib/site-data";
import { useSession } from "@/hooks/use-session";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products", mega: "products" as const },
  { to: "/industries", label: "Industries", mega: "industries" as const },
  { to: "/solutions", label: "Solutions", mega: "solutions" as const },
  { to: "/projects", label: "Projects" },
  { to: "/downloads", label: "Downloads" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState<null | "products" | "industries" | "solutions">(null);
  const { user } = useSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "glass-panel" : "bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2">
            <span className="size-5 rounded-sm bg-primary" aria-hidden />
            <span className="font-display text-lg font-semibold tracking-tight">ORTEQ</span>
          </Link>
          <nav
            className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex"
            onMouseLeave={() => setMega(null)}
          >
            {NAV.slice(1, 5).map((item) => (
              <div key={item.to} className="relative" onMouseEnter={() => setMega(item.mega ?? null)}>
                <Link
                  to={item.to}
                  className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-primary"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                  {item.mega ? <ChevronDown className="size-3.5 opacity-60" aria-hidden /> : null}
                </Link>
              </div>
            ))}
            {NAV.slice(5).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-foreground/70 transition-colors hover:text-primary"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/account"
              className="hidden items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2 text-xs font-medium hover:border-foreground md:inline-flex"
            >
              <User className="size-3.5" /> Account
            </Link>
          ) : (
            <Link
              to="/auth"
              className="hidden text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary md:inline"
            >
              Sign in
            </Link>
          )}
          <Link
            to="/contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary transition-transform hover:brightness-110 active:scale-95"
          >
            Get Quote
          </Link>
          <button
            aria-label="Open menu"
            className="ml-1 inline-flex size-9 items-center justify-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      {mega ? (
        <div
          onMouseLeave={() => setMega(null)}
          className="hidden border-t border-hairline bg-background/95 backdrop-blur-xl lg:block"
        >
          <div className="mx-auto max-w-7xl px-6 py-8">
            {mega === "products" ? (
              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                {PRODUCTS.map((p) => (
                  <Link
                    key={p.slug}
                    to="/products/$slug"
                    params={{ slug: p.slug }}
                    className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-secondary"
                  >
                    <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img src={p.image} alt="" width={56} height={56} loading="lazy" className="size-full object-cover" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-medium">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
            {mega === "industries" ? (
              <div className="grid grid-cols-4 gap-3">
                {INDUSTRIES.map((i) => (
                  <Link
                    key={i.slug}
                    to="/industries/$slug"
                    params={{ slug: i.slug }}
                    className="rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {i.name}
                  </Link>
                ))}
              </div>
            ) : null}
            {mega === "solutions" ? (
              <div className="grid grid-cols-4 gap-3">
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.slug}
                    to="/solutions/$slug"
                    params={{ slug: s.slug }}
                    className="rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Mobile drawer */}
      {open ? (
        <div className="border-t border-hairline bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
                activeProps={{ className: "text-primary" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
