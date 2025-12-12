-- Reset RLS Policies
-- Run this in Supabase SQL Editor

-- 1. Drop existing policies to avoid "already exists" error
DROP POLICY IF EXISTS "Public can view categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Public can view active products" ON products;
DROP POLICY IF EXISTS "Admins can view all products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
-- Add drops for other tables if needed, but Products is the focus

-- 2. Re-create Policies

-- CATEGORIES
CREATE POLICY "Public can view categories"
    ON categories
    FOR SELECT
    TO public
    USING (true);

-- PRODUCTS
CREATE POLICY "Public can view active products"
    ON products
    FOR SELECT
    TO public
    USING (is_active = true);
