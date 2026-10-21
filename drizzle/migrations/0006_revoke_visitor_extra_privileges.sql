REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.backstop_leads FROM anon;
REVOKE ALL ON public.pastdue_accounts, public.pastdue_marks, public.pastdue_config, public.app_settings FROM anon, authenticated;