-- Database Schema for Seth Lanka Spices (Supabase/PostgreSQL)

-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. Tables
-- ==========================================

-- Products Table
create table if not exists public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  category text,
  stock integer default 0,
  is_featured boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Collections Table (for discovery sections)
create table if not exists public.collections (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  slug text unique not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Contact Messages (from contact form)
create table if not exists public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'replied')),
  created_at timestamptz default now() not null
);

-- ==========================================
-- 2. Row Level Security (RLS)
-- ==========================================

-- Enable RLS
alter table public.products enable row level security;
alter table public.collections enable row level security;
alter table public.contact_messages enable row level security;

-- Policies for Products
-- Anyone can view products
create policy "Products are publicly visible" 
  on public.products for select 
  using (true);

-- Only authenticated users can modify products
create policy "Authenticated users can insert products" 
  on public.products for insert 
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update products" 
  on public.products for update 
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete products" 
  on public.products for delete 
  using (auth.role() = 'authenticated');

-- Policies for Collections
-- Anyone can view collections
create policy "Collections are publicly visible" 
  on public.collections for select 
  using (true);

-- Only authenticated users can modify collections
create policy "Authenticated users can insert collections" 
  on public.collections for insert 
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update collections" 
  on public.collections for update 
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete collections" 
  on public.collections for delete 
  using (auth.role() = 'authenticated');

-- Policies for Contact Messages
-- Anyone can submit a contact message
create policy "Anyone can insert contact messages" 
  on public.contact_messages for insert 
  with check (true);

-- Only authenticated users (admins) can view/manage messages
create policy "Authenticated users can view contact messages" 
  on public.contact_messages for select 
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update contact messages" 
  on public.contact_messages for update 
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete contact messages" 
  on public.contact_messages for delete 
  using (auth.role() = 'authenticated');

-- ==========================================
-- 3. Functions & Triggers
-- ==========================================

-- Function to handle updated_at timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for Products
create trigger handle_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

-- Trigger for Collections
create trigger handle_collections_updated_at
  before update on public.collections
  for each row
  execute function public.handle_updated_at();
