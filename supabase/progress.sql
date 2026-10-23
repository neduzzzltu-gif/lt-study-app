-- One row per user: their saved mistakes (same shape as localStorage)
create table if not exists public.progress (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null default '{}' check (pg_column_size(data) < 200000),
  updated_at timestamptz not null default now()
);
alter table public.progress enable row level security;
grant select, insert, update on public.progress to authenticated;
drop policy if exists "own progress" on public.progress;
create policy "own progress" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
