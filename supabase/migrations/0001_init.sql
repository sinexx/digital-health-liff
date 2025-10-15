-- Users table stores core identity from LINE plus organization fields
create table if not exists public.users (
  user_id text primary key,
  display_name text,
  picture_url text,
  role text default 'user',
  email text,
  department text,
  position text,
  phone text,
  updated_at timestamptz default now()
);

-- User settings as JSON (separated to keep flexible)
create table if not exists public.user_settings (
  user_id text primary key references public.users(user_id) on delete cascade,
  settings jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.user_settings enable row level security;

-- Example RLS policies
-- Policy group: service role (full access). This relies on using service role key on server.
drop policy if exists users_service_role_all on public.users;
create policy users_service_role_all on public.users
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists user_settings_service_role_all on public.user_settings;
create policy user_settings_service_role_all on public.user_settings
  for all
  to service_role
  using (true)
  with check (true);

-- Optional: allow anon (client) to read only their own rows if you attach auth
-- For this project we route all writes via server. If later integrating Supabase Auth,
-- you could map auth.uid() to user_id and enable self-read policies like below.
-- create policy users_self_read on public.users for select to anon using (user_id = auth.uid());
-- create policy settings_self_read on public.user_settings for select to anon using (user_id = auth.uid());

-- Helpful indexes
create index if not exists idx_user_settings_gin on public.user_settings using gin(settings);
