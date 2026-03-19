-- Carson Dougherty Platform — Database Schema
-- Run this in the Supabase SQL editor after creating your project.

-- ============================================================
-- PROFILES
-- Extends auth.users. Created automatically via trigger below.
-- ============================================================
create table if not exists profiles (
  id          uuid references auth.users on delete cascade primary key,
  email       text not null,
  full_name   text,
  is_admin    boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row when a new auth user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists products (
  id               uuid default gen_random_uuid() primary key,
  title            text not null,
  slug             text unique not null,
  description      text,
  price_cents      integer not null,
  stripe_price_id  text,
  file_path        text,       -- Supabase Storage path for downloadable file
  published        boolean not null default false,
  created_at       timestamptz not null default now()
);

-- ============================================================
-- PURCHASES
-- Top-level record per Stripe Checkout session
-- ============================================================
create table if not exists purchases (
  id                 uuid default gen_random_uuid() primary key,
  user_id            uuid references profiles(id) on delete cascade,
  stripe_session_id  text unique,
  amount_cents       integer not null,
  status             text not null default 'pending', -- pending | completed | refunded
  created_at         timestamptz not null default now()
);

-- ============================================================
-- PURCHASE ITEMS
-- Individual products within a purchase
-- ============================================================
create table if not exists purchase_items (
  id           uuid default gen_random_uuid() primary key,
  purchase_id  uuid references purchases(id) on delete cascade not null,
  product_id   uuid references products(id) not null,
  price_cents  integer not null
);

-- ============================================================
-- USER ENTITLEMENTS
-- What a user has access to (one row per product per user)
-- ============================================================
create table if not exists user_entitlements (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references profiles(id) on delete cascade not null,
  product_id       uuid references products(id) not null,
  purchase_item_id uuid references purchase_items(id),
  created_at       timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profiles enable row level security;
alter table products enable row level security;
alter table purchases enable row level security;
alter table purchase_items enable row level security;
alter table user_entitlements enable row level security;

-- Profiles: users can read and update their own row
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- Products: anyone can read published products
create policy "Public can view published products"
  on products for select using (published = true);

-- Purchases: users can view their own purchases
create policy "Users can view own purchases"
  on purchases for select using (auth.uid() = user_id);

-- Purchase items: users can view items on their own purchases
create policy "Users can view own purchase items"
  on purchase_items for select
  using (
    exists (
      select 1 from purchases
      where purchases.id = purchase_items.purchase_id
        and purchases.user_id = auth.uid()
    )
  );

-- Entitlements: users can view their own entitlements
create policy "Users can view own entitlements"
  on user_entitlements for select using (auth.uid() = user_id);

-- ============================================================
-- SEED DATA
-- Uncomment and fill in stripe_price_id before running.
-- Create the Price in Stripe Dashboard first, then paste the
-- price ID (price_...) below.
-- ============================================================

-- insert into products (title, slug, description, price_cents, stripe_price_id, published)
-- values (
--   'Grounding Meditation',
--   'grounding-meditation',
--   'A 15-minute guided meditation to settle, ground, and return to yourself. Includes a somatic grounding sequence, gentle breath practice, and short visualization.',
--   2700,           -- $27.00
--   'price_...',    -- Replace with your Stripe Price ID
--   true
-- );
