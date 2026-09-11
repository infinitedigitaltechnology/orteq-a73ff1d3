import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { PRODUCTS, type Product } from "@/lib/site-data";
import fallbackImage from "@/assets/hero-led-wall.jpg";

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function toSpecs(value: unknown): { label: string; value: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is { label: string; value: string } =>
      !!v && typeof v === "object" && "label" in v && "value" in v,
    )
    .map((v) => ({ label: String(v.label), value: String(v.value) }));
}

/** Published products managed from the admin CMS, merged over the built-in catalogue. */
export const listCmsProducts = createServerFn({ method: "GET" }).handler(async () => {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return [] as Product[];

  const supabasePublic = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { data, error } = await supabasePublic
    .from("products")
    .select("slug, title, tagline, body, cover_image, category, features, specs, applications, advantages")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data) return [] as Product[];

  return data.map<Product>((row) => ({
    slug: row.slug,
    name: row.title,
    tagline: row.tagline ?? "",
    description: row.body ?? row.tagline ?? "",
    image: row.cover_image || fallbackImage,
    applications: toStringArray(row.applications).length
      ? toStringArray(row.applications)
      : [row.category ?? "Commercial displays"],
    features: toStringArray(row.features),
    advantages: toStringArray(row.advantages),
    specs: toSpecs(row.specs),
  }));
});

export function mergeProducts(cms: Product[]): Product[] {
  const bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));
  for (const p of cms) bySlug.set(p.slug, p);
  return [...bySlug.values()];
}
