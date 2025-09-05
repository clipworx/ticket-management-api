-- create_renew_table.sql

create table if not exists renewals (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid references tickets(id) on delete cascade,
    renewed_by uuid references users(id) on delete set null,
    renewed_at timestamp with time zone default now(),
    extended_days integer not null,
    notes text
);
