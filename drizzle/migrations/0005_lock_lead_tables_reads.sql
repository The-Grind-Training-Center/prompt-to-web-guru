DROP POLICY IF EXISTS "Authenticated can read leads" ON public.backstop_leads;
REVOKE SELECT, UPDATE, DELETE ON public.backstop_leads FROM authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM authenticated;