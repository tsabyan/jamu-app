-- Fix Schema Permissions
-- Run this in Supabase SQL Editor

-- Grant USAGE on schema public to anon and authenticated roles
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant SELECT on all tables in public schema to anon role
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;

-- Grant SELECT on all sequences (for auto-increment IDs)
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Make sure future tables also get these permissions
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON SEQUENCES TO anon, authenticated;
