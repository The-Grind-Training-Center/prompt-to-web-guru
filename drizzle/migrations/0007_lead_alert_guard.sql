ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notified_at timestamptz;
ALTER TABLE public.backstop_leads ADD COLUMN IF NOT EXISTS notified_at timestamptz;