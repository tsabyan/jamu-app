-- =====================================================
-- Jamu Online Shop - Database Schema
-- =====================================================
-- Run this script in Supabase SQL Editor
-- This will create all tables with proper constraints and indexes

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: categories
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster slug lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- =====================================================
-- TABLE: products
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL CHECK (price >= 0),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    thumbnail_url TEXT,
    benefits TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active) WHERE is_active = TRUE;

-- =====================================================
-- TABLE: customers
-- =====================================================
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- =====================================================
-- TABLE: orders
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')),
    total_amount INTEGER NOT NULL CHECK (total_amount >= 0),
    payment_method TEXT NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- =====================================================
-- TABLE: order_items
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
    subtotal INTEGER NOT NULL CHECK (subtotal >= 0)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- =====================================================
-- COMMENTS (for documentation)
-- =====================================================
COMMENT ON TABLE categories IS 'Product categories for Jamu drinks';
COMMENT ON TABLE products IS 'Jamu products with pricing and inventory';
COMMENT ON TABLE customers IS 'Customer information, linked to auth.users for registered users';
COMMENT ON TABLE orders IS 'Customer orders with status tracking';
COMMENT ON TABLE order_items IS 'Line items for each order';
