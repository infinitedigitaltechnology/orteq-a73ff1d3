CREATE TABLE public.zz_hasrole_test(id int primary key);
GRANT SELECT ON public.zz_hasrole_test TO anon;
ALTER TABLE public.zz_hasrole_test ENABLE ROW LEVEL SECURITY;
CREATE POLICY "t" ON public.zz_hasrole_test FOR SELECT TO anon USING (public.has_role(auth.uid(), 'admin') OR true);
INSERT INTO public.zz_hasrole_test VALUES (1);