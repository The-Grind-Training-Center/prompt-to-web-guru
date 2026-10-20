create table if not exists public.pastdue_accounts (
  key text primary key,
  sort integer not null,
  data jsonb not null
);
GRANT ALL ON public.pastdue_accounts TO service_role;
create table if not exists public.pastdue_marks (
  key text primary key references public.pastdue_accounts(key) on delete cascade,
  status text not null default '' check (status in ('', 'sent', 'not')),
  other boolean not null default false,
  note text not null default '' check (char_length(note) <= 500),
  by_name text not null default '' check (char_length(by_name) <= 40),
  updated_at timestamptz not null default now()
);
GRANT ALL ON public.pastdue_marks TO service_role;
create table if not exists public.pastdue_config (
  id integer primary key default 1 check (id = 1),
  passkey_sha256 text not null
);
GRANT ALL ON public.pastdue_config TO service_role;
alter table public.pastdue_accounts enable row level security;
alter table public.pastdue_marks enable row level security;
alter table public.pastdue_config enable row level security;
-- No policies on purpose: only the pastdue edge function (service role) reads or writes these tables.