CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  offer text NOT NULL,
  parent_name text,
  phone text,
  email text,
  athlete_age int,
  details jsonb DEFAULT '{}'::jsonb,
  status text DEFAULT 'New',
  event_id text,
  fbclid text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text
);
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon WITH CHECK (true);