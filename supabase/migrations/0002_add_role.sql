-- Add role column to users if it doesn't exist (for existing databases)
alter table if exists public.users
  add column if not exists role text default 'user';
