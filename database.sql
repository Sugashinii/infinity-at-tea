-- Create the `kits` table
create table public.kits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  business_name text not null,
  business_type text not null,
  location text,
  phone_number text,
  description text,
  language text,
  result_data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.kits enable row level security;

-- Policies
create policy "Users can insert their own kits."
  on public.kits for insert
  with check ( auth.uid() = user_id );

create policy "Users can view their own kits."
  on public.kits for select
  using ( auth.uid() = user_id );

-- Allow public viewing of individual kits via shareable link
create policy "Anyone can view kits by id."
  on public.kits for select
  using ( true );
