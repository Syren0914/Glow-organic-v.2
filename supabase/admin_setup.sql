-- Admin allowlist, menu tables, and RLS policies for menu editing

create table if not exists service_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  sort_order integer
);

create table if not exists service_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references service_categories(id) on delete cascade,
  title text not null,
  description text,
  price text,
  duration text,
  sort_order integer
);

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table service_categories enable row level security;
alter table service_items enable row level security;

create policy "public read categories"
on service_categories for select using (true);

create policy "public read items"
on service_items for select using (true);

create policy "admins update categories"
on service_categories for update
using (exists (select 1 from admin_users where user_id = auth.uid()));

create policy "admins update items"
on service_items for update
using (exists (select 1 from admin_users where user_id = auth.uid()));

-- After you sign in with Google once, add your account as admin:
-- insert into admin_users (user_id)
-- select id from auth.users where email = 'YOUR_GOOGLE_EMAIL';
