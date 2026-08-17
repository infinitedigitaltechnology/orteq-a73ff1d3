DROP POLICY "t" ON public.zz_hasrole_test;
CREATE POLICY "t" ON public.zz_hasrole_test FOR SELECT TO anon USING (public.has_role(auth.uid(), 'admin'));