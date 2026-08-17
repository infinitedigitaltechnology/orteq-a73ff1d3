import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/site/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo variant="footer" />
            </div>
            <p className="max-w-[36ch] text-sm leading-relaxed text-muted-foreground text-pretty">
              Leading the visual revolution with high-performance commercial displays engineered for
              India's next generation of infrastructure.
            </p>
            <form
              className="mt-6 flex max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLFormElement).reset();
              }}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="Your work email"
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
          <FooterCol
            title="Products"
            items={[
              ["All-In-One", "/products/all-in-one-displays"],
              ["LED Walls", "/products/digital-led-walls"],
              ["Interactive Panels", "/products/interactive-flat-panels"],
              ["Digital Signage", "/products/commercial-displays"],
              ["Video Walls", "/products/lcd-video-walls"],
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              ["About Us", "/about"],
              ["Projects", "/projects"],
              ["Blog", "/blog"],
              ["Become a Dealer", "/dealer"],
              ["Partner Program", "/partner"],
            ]}
          />
          <FooterCol
            title="Support"
            items={[
              ["Contact", "/contact"],
              ["Downloads", "/downloads"],
              ["Raise a Ticket", "/support"],
              ["Warranty", "/support"],
              ["Service Network", "/contact"],
            ]}
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-[10px] font-medium uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} ORTEQ India Pvt Ltd. All rights reserved.</span>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="/sitemap.xml" className="hover:text-primary">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-6 text-sm font-semibold font-display">{title}</h4>
      <ul className="space-y-4 text-sm text-muted-foreground">
        {items.map(([label, href]) => (
          <li key={href}>
            <Link to={href as any} className="hover:text-primary transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
