-- 2025-09-05_add_notes_location_to_tickets.sql

alter table tickets
add column location text;

alter table tickets
add column notes text;
