-- 1. Restrict cms-media reads to staff only
DROP POLICY IF EXISTS "cms-media read" ON storage.objects;
CREATE POLICY "cms-media staff read" ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'cms-media'
  AND (private.has_role(auth.uid(), 'admin'::app_role) OR private.has_role(auth.uid(), 'editor'::app_role))
);

-- 2. Stop leaking staff-only admin_notes into quote status history
CREATE OR REPLACE FUNCTION public.log_quote_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.quote_status_history (quote_id, from_status, to_status, changed_by)
    VALUES (NEW.id, NULL, NEW.status, auth.uid());
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.quote_status_history (quote_id, from_status, to_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$function$;

-- Scrub any previously copied admin notes
UPDATE public.quote_status_history SET note = NULL WHERE note IS NOT NULL;

-- 3. Prevent post-insert manipulation of the ownership column used by RLS
CREATE OR REPLACE FUNCTION public.prevent_quote_owner_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.dealer_user_id IS DISTINCT FROM OLD.dealer_user_id
     AND NOT private.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'dealer_user_id cannot be reassigned';
  END IF;
  RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION public.prevent_quote_owner_change() FROM public, anon, authenticated;

DROP TRIGGER IF EXISTS trg_prevent_quote_owner_change ON public.quote_requests;
CREATE TRIGGER trg_prevent_quote_owner_change
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW EXECUTE FUNCTION public.prevent_quote_owner_change();