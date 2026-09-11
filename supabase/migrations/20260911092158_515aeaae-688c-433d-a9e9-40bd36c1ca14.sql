ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS applications jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS advantages jsonb NOT NULL DEFAULT '[]'::jsonb;