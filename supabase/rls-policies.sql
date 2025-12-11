-- =====================================================
-- Jamu Online Shop - Row Level Security (RLS) Policies
-- =====================================================
-- Run this script AFTER schema.sql in Supabase SQL Editor
-- This sets up security policies for public and authenticated access

-- =====================================================
-- Enable RLS on all tables
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CATEGORIES - Public read access
-- =====================================================
-- Anyone can view categories
CREATE POLICY "Public can view categories"
    ON categories
    FOR SELECT
    TO public
    USING (true);

-- Only authenticated users with admin role can insert/update/delete
CREATE POLICY "Admins can manage categories"
    ON categories
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =====================================================
-- PRODUCTS - Public read access for active products
-- =====================================================
-- Anyone can view active products
CREATE POLICY "Public can view active products"
    ON products
    FOR SELECT
    TO public
    USING (is_active = true);

-- Authenticated admins can view all products (including inactive)
CREATE POLICY "Admins can view all products"
    ON products
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Only admins can insert/update/delete products
CREATE POLICY "Admins can manage products"
    ON products
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =====================================================
-- CUSTOMERS - User can view/update their own data
-- =====================================================
-- Users can view their own customer record
CREATE POLICY "Users can view own customer data"
    ON customers
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can insert their own customer record
CREATE POLICY "Users can create own customer record"
    ON customers
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can update their own customer record
CREATE POLICY "Users can update own customer data"
    ON customers
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Admins can view all customers
CREATE POLICY "Admins can view all customers"
    ON customers
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =====================================================
-- ORDERS - Users can view their own orders
-- =====================================================
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
    ON orders
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT id FROM customers WHERE user_id = auth.uid()
        )
    );

-- Users can create their own orders
CREATE POLICY "Users can create own orders"
    ON orders
    FOR INSERT
    TO authenticated
    WITH CHECK (
        customer_id IN (
            SELECT id FROM customers WHERE user_id = auth.uid()
        )
    );

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
    ON orders
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Admins can update orders (e.g., change status)
CREATE POLICY "Admins can update orders"
    ON orders
    FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =====================================================
-- ORDER_ITEMS - Users can view items in their orders
-- =====================================================
-- Users can view order items for their own orders
CREATE POLICY "Users can view own order items"
    ON order_items
    FOR SELECT
    TO authenticated
    USING (
        order_id IN (
            SELECT o.id FROM orders o
            JOIN customers c ON o.customer_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

-- Users can create order items for their own orders
CREATE POLICY "Users can create own order items"
    ON order_items
    FOR INSERT
    TO authenticated
    WITH CHECK (
        order_id IN (
            SELECT o.id FROM orders o
            JOIN customers c ON o.customer_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

-- Admins can view all order items
CREATE POLICY "Admins can view all order items"
    ON order_items
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. Admin role is checked via: auth.users.raw_user_meta_data->>'role' = 'admin'
--    You'll need to set this in Supabase Auth when creating admin users
-- 2. For guest checkout, you may want to add additional policies
--    or handle guest orders differently (e.g., via service role key on server)
-- 3. These policies provide a good baseline - adjust based on your specific needs
