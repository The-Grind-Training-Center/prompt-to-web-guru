CREATE TABLE public.backstop_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  parent_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  athlete_age integer NOT NULL,
  status text NOT NULL DEFAULT 'New',
  fbclid text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text
);

GRANT INSERT ON public.backstop_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backstop_leads TO authenticated;
GRANT ALL ON public.backstop_leads TO service_role;

ALTER TABLE public.backstop_leads ENABLE ROW LEVEL SECURITY;

-- Anyone (including ad traffic) may submit a lead; reads are admin-only.
CREATE POLICY "Anyone can submit a backstop lead"
ON public.backstop_leads
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Authenticated can read leads"
ON public.backstop_leads
FOR SELECT
TO authenticated
USING (true);