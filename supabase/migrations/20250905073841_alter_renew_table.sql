-- create_or_alter_renewals.sql

ALTER TABLE renewals
DROP COLUMN IF EXISTS extended_days;

ALTER TABLE renewals
ADD COLUMN IF NOT EXISTS old_expiration timestamp with time zone,
ADD COLUMN IF NOT EXISTS new_expiration timestamp with time zone;

ALTER TABLE renewals
ADD COLUMN IF NOT EXISTS notes text;
