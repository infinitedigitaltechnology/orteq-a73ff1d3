import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { FloatingCTA } from "../components/site/FloatingCTA";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 inline-flex size-2 items-center rounded-sm bg-primary" />
        <h1 className="font-display text-7xl font-semibold text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl font-medium text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ORTEQ India — Premium Display Solutions" },
      {
        name: "description",
        content:
          "Premium LED walls, interactive panels, video walls and digital signage engineered for India's most demanding environments.",
      },
      { name: "author", content: "ORTEQ India Pvt Ltd" },
      { name: "theme-color", content: "#D71920" },
      { property: "og:title", content: "ORTEQ India — Premium Display Solutions" },
      {
        property: "og:description",
        content:
          "Premium LED walls, interactive panels, video walls and digital signage engineered for India's most demanding environments.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "ORTEQ India" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@orteqindia" },
      { name: "twitter:title", content: "ORTEQ India — Premium Display Solutions" },
      { name: "twitter:description", content: "Premium LED walls, interactive panels, video walls and digital signage engineered for India's most demanding environments." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/k5eR6dUi2teyBqdSkQTxYd1hc302/social-images/social-1784574956204-Image_Editor.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/k5eR6dUi2teyBqdSkQTxYd1hc302/social-images/social-1784574956204-Image_Editor.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ORTEQ India Pvt Ltd",
          url: "https://www.orteq.in",
          logo: "https://www.orteq.in/favicon.png",
          sameAs: [],
          description:
            "ORTEQ India is a leading commercial display solutions company providing LED walls, interactive flat panels, video walls, digital signage, industrial and enterprise displays.",
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "sales",
              areaServed: "IN",
              availableLanguage: ["English", "Hindi"],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
        <FloatingCTA />
        <Toaster />

      </div>
    </QueryClientProvider>
  );
}
