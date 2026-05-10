-- Rush Coach initial Supabase schema.
-- Apply in Supabase SQL editor or with `supabase db push` after linking a project.

create extension if not exists pgcrypto;

create type motivation_level as enum ('1', '2', '3');
create type theme_preference as enum ('system', 'light', 'dark');
create type running_goal as enum ('distance', 'time', 'frequency');
create type subscription_plan as enum ('free', 'premium_monthly');
create type subscription_status as enum ('inactive', 'trialing', 'active', 'past_due', 'cancelled', 'expired');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  date_of_birth date not null,
  weight_kg numeric(5,2),
  running_goal running_goal not null default 'frequency',
  motivation_level motivation_level not null default '1',
  theme_preference theme_preference not null default 'system',
  is_premium boolean not null default false,
  roast_lite_terms_accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_weight_reasonable check (weight_kg is null or (weight_kg > 0 and weight_kg <= 350)),
  constraint profiles_level_3_requires_terms check (motivation_level <> '3' or roast_lite_terms_accepted_at is not null),
  constraint profiles_level_3_adult_only check (motivation_level <> '3' or date_of_birth <= (current_date - interval '18 years'))
);

create table public.routes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text,
  polyline text not null,
  start_lat double precision not null,
  start_lng double precision not null,
  end_lat double precision not null,
  end_lng double precision not null,
  is_private boolean not null default true,
  created_at timestamptz not null default now(),
  constraint routes_private_mvp check (is_private = true),
  constraint routes_lat_valid check (start_lat between -90 and 90 and end_lat between -90 and 90),
  constraint routes_lng_valid check (start_lng between -180 and 180 and end_lng between -180 and 180)
);

create table public.runs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  started_at timestamptz not null,
  ended_at timestamptz not null,
  duration_seconds integer not null,
  distance_meters integer not null,
  avg_pace_seconds_per_km integer,
  estimated_calories integer,
  avg_heart_rate integer,
  route_id uuid references public.routes(id) on delete set null,
  created_at timestamptz not null default now(),
  constraint runs_time_order check (ended_at >= started_at),
  constraint runs_metrics_non_negative check (duration_seconds >= 0 and distance_meters >= 0),
  constraint runs_calories_non_negative check (estimated_calories is null or estimated_calories >= 0)
);

create table public.hydration_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date,
  amount_ml integer not null,
  goal_ml integer not null default 2000,
  created_at timestamptz not null default now(),
  constraint hydration_amount_valid check (amount_ml >= 0 and goal_ml > 0)
);

create table public.motivation_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  level motivation_level not null,
  message text not null,
  context text not null,
  created_at timestamptz not null default now()
);

create table public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  push_enabled boolean not null default false,
  hydration_reminders_enabled boolean not null default false,
  warmup_enabled boolean not null default true,
  theme theme_preference not null default 'system',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan subscription_plan not null default 'free',
  status subscription_status not null default 'inactive',
  started_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index profiles_user_id_idx on public.profiles(user_id);
create index routes_user_created_idx on public.routes(user_id, created_at desc);
create index runs_user_started_idx on public.runs(user_id, started_at desc);
create index runs_route_id_idx on public.runs(route_id);
create index hydration_user_date_idx on public.hydration_logs(user_id, date desc);
create index motivation_user_created_idx on public.motivation_events(user_id, created_at desc);
create index settings_user_idx on public.user_settings(user_id);
create index subscriptions_user_status_idx on public.subscriptions(user_id, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger user_settings_set_updated_at before update on public.user_settings for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.routes enable row level security;
alter table public.runs enable row level security;
alter table public.hydration_logs enable row level security;
alter table public.motivation_events enable row level security;
alter table public.user_settings enable row level security;
alter table public.subscriptions enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = user_id);

create policy "routes_select_own" on public.routes for select using (auth.uid() = user_id and is_private = true);
create policy "routes_insert_own_private" on public.routes for insert with check (auth.uid() = user_id and is_private = true);
create policy "routes_update_own_private" on public.routes for update using (auth.uid() = user_id) with check (auth.uid() = user_id and is_private = true);
create policy "routes_delete_own" on public.routes for delete using (auth.uid() = user_id);

create policy "runs_select_own" on public.runs for select using (auth.uid() = user_id);
create policy "runs_insert_own" on public.runs for insert with check (auth.uid() = user_id);
create policy "runs_update_own" on public.runs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "runs_delete_own" on public.runs for delete using (auth.uid() = user_id);

create policy "hydration_select_own" on public.hydration_logs for select using (auth.uid() = user_id);
create policy "hydration_insert_own" on public.hydration_logs for insert with check (auth.uid() = user_id);
create policy "hydration_update_own" on public.hydration_logs for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "hydration_delete_own" on public.hydration_logs for delete using (auth.uid() = user_id);

create policy "motivation_select_own" on public.motivation_events for select using (auth.uid() = user_id);
create policy "motivation_insert_own" on public.motivation_events for insert with check (auth.uid() = user_id);
create policy "motivation_delete_own" on public.motivation_events for delete using (auth.uid() = user_id);

create policy "settings_select_own" on public.user_settings for select using (auth.uid() = user_id);
create policy "settings_insert_own" on public.user_settings for insert with check (auth.uid() = user_id);
create policy "settings_update_own" on public.user_settings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "settings_delete_own" on public.user_settings for delete using (auth.uid() = user_id);

create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id);
create policy "subscriptions_insert_own_free_only" on public.subscriptions for insert with check (auth.uid() = user_id and plan = 'free');
create policy "subscriptions_delete_own" on public.subscriptions for delete using (auth.uid() = user_id);
-- Premium status changes should be performed by a trusted Edge Function/service role, never by the mobile client.
