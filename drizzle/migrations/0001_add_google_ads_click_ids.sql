ALTER TABLE public.leads
  ADD COLUMN gclid text,
  ADD COLUMN gbraid text,
  ADD COLUMN wbraid text;

ALTER TABLE public.backstop_leads
  ADD COLUMN gclid text,
  ADD COLUMN gbraid text,
  ADD COLUMN wbraid text;