
-- cms-media: staff can write, anyone signed in can read (public reads via signed URL from server)
CREATE POLICY "cms-media staff write" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms-media' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')));
CREATE POLICY "cms-media staff update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms-media' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')));
CREATE POLICY "cms-media staff delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms-media' AND (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')));
CREATE POLICY "cms-media read" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'cms-media');
CREATE POLICY "cms-media anon read" ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'cms-media');

-- ticket-attachments: uploader path convention: <ticket_id>/<filename>
CREATE POLICY "ticket attach insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'ticket-attachments' AND
    EXISTS (
      SELECT 1 FROM public.support_tickets t
      WHERE t.id::text = split_part(name, '/', 1)
        AND (t.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'))
    )
  );
CREATE POLICY "ticket attach read" ON storage.objects FOR SELECT TO authenticated
  USING (
    bucket_id = 'ticket-attachments' AND
    EXISTS (
      SELECT 1 FROM public.support_tickets t
      WHERE t.id::text = split_part(name, '/', 1)
        AND (t.created_by = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'))
    )
  );
