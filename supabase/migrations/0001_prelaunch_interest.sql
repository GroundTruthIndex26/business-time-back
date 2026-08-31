-- Pre-launch interest signups from businesstimeback.com.
--
-- Written only by the prelaunch-interest edge function, which inserts with the
-- service role key (service_role bypasses RLS). RLS is enabled with no policies,
-- so the anon and publishable keys can neither read nor write this table and the
-- list cannot be enumerated through the REST API.
--
-- email is the primary key: a repeat signup surfaces as 23505, which the
-- function treats as a returning visitor rather than a failure.

create table if not exists public.prelaunch_interest (
  email      text primary key,
  created_at timestamptz not null default now()
);

alter table public.prelaunch_interest enable row level security;
