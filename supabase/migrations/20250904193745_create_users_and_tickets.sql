-- users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password text not null,
  full_name text,
  role text default 'user',
  created_at timestamp with time zone default now()
);

-- tickets table
create table if not exists tickets (
  id uuid primary key default gen_random_uuid(),
  ticket_number text unique not null,
  organization text not null,
  status text default 'active',
  expiration_date date,
  created_by uuid references users(id) on delete set null,
  created_at timestamp with time zone default now()
);

