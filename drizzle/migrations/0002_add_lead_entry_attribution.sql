ALTER TABLE public.leads
  ADD COLUMN referrer text,
  ADD COLUMN landing_page text;

ALTER TABLE public.backstop_leads
  ADD COLUMN referrer text,
  ADD COLUMN landing_page text;