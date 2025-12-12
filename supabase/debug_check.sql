-- Quick test to verify Supabase connection and RLS
-- Run this in Supabase SQL Editor

-- 1. Check if products table has data
SELECT COUNT(*) as total_products FROM products;

-- 2. Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'products';

-- 3. Check existing policies on products table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'products';

-- 4. Test a simple select (this simulates what your app does)
SELECT id, name, slug, is_active FROM products WHERE is_active = true LIMIT 5;
