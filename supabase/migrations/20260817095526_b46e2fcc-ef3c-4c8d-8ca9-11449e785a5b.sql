
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, PUBLIC;

DROP POLICY IF EXISTS "cms-media anon read" ON storage.objects;

CREATE POLICY "Ticket attachments owner or staff update"
ON public.ticket_attachments FOR UPDATE TO authenticated
USING (
  uploaded_by = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'support')
)
WITH CHECK (
  uploaded_by = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'support')
);

CREATE POLICY "Ticket attachments owner or staff delete"
ON public.ticket_attachments FOR DELETE TO authenticated
USING (
  uploaded_by = auth.uid()
  OR public.has_role(auth.uid(), 'admin')
  OR public.has_role(auth.uid(), 'support')
);

CREATE POLICY "cms-media staff delete objects" ON storage.objects FOR SELECT TO authenticated USING (false);
DROP POLICY IF EXISTS "cms-media staff delete objects" ON storage.objects;
