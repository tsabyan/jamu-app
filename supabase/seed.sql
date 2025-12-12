-- =====================================================
-- Jamu Online Shop - Sample Data (Optional)
-- =====================================================
-- Run this script AFTER schema.sql and rls-policies.sql
-- This provides sample data for testing

-- =====================================================
-- Sample Categories
-- =====================================================
INSERT INTO categories (name, slug, description) VALUES
    ('Jamu Tradisional', 'jamu-tradisional', 'Jamu tradisional Indonesia dengan resep turun-temurun'),
    ('Jamu Modern', 'jamu-modern', 'Jamu dengan formulasi modern dan praktis'),
    ('Minuman Herbal', 'minuman-herbal', 'Minuman herbal segar untuk kesehatan'),
    ('Jamu Instan', 'jamu-instan', 'Jamu dalam bentuk instan, mudah diseduh')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- Sample Products
-- =====================================================
-- Get category IDs for reference
DO $$
DECLARE
    cat_tradisional UUID;
    cat_modern UUID;
    cat_herbal UUID;
    cat_instan UUID;
BEGIN
    SELECT id INTO cat_tradisional FROM categories WHERE slug = 'jamu-tradisional';
    SELECT id INTO cat_modern FROM categories WHERE slug = 'jamu-modern';
    SELECT id INTO cat_herbal FROM categories WHERE slug = 'minuman-herbal';
    SELECT id INTO cat_instan FROM categories WHERE slug = 'jamu-instan';

    -- Insert sample products
    INSERT INTO products (category_id, name, slug, short_description, description, price, stock, is_featured, is_active, benefits) VALUES
        (cat_tradisional, 'Jamu Kunyit Asam', 'jamu-kunyit-asam', 'Jamu tradisional untuk kesehatan pencernaan', 'Jamu kunyit asam terbuat dari kunyit segar dan asam jawa pilihan. Berkhasiat untuk melancarkan pencernaan, menjaga kesehatan lambung, dan menyegarkan badan.', 15000, 100, true, true, ARRAY['Meredakan nyeri haid', 'Melancarkan pencernaan', 'Menyegarkan badan', 'Kaya antioksidan']),
        (cat_tradisional, 'Jamu Beras Kencur', 'jamu-beras-kencur', 'Penambah nafsu makan dan stamina', 'Jamu beras kencur dengan komposisi beras, kencur, jahe, dan rempah pilihan. Membantu meningkatkan nafsu makan, menambah stamina, dan menghangatkan tubuh.', 15000, 80, true, true, ARRAY['Menambah nafsu makan', 'Meningkatkan stamina', 'Menghangatkan tubuh', 'Meredakan batuk']),
        (cat_tradisional, 'Jamu Temulawak', 'jamu-temulawak', 'Untuk kesehatan hati dan pencernaan', 'Jamu temulawak murni yang berkhasiat menjaga kesehatan hati, meningkatkan nafsu makan, dan melancarkan pencernaan. Cocok diminum setiap hari.', 18000, 60, false, true, ARRAY['Menjaga kesehatan hati', 'Memperbaiki fungsi pencernaan', 'Menambah nafsu makan', 'Detoksifikasi alami']),
        (cat_modern, 'Jamu Glow Collagen', 'jamu-glow-collagen', 'Jamu modern untuk kecantikan kulit', 'Kombinasi jamu tradisional dengan kolagen untuk mencerahkan kulit, mengurangi kerutan, dan menjaga elastisitas kulit dari dalam.', 35000, 50, true, true, ARRAY['Mencerahkan kulit', 'Mengurangi kerutan halus', 'Menjaga elastisitas kulit', 'Rasa enak dan segar']),
        (cat_modern, 'Jamu Detox Plus', 'jamu-detox-plus', 'Detoksifikasi tubuh dengan rempah pilihan', 'Formula modern jamu detox dengan kunyit, jahe, lemon, dan madu. Membantu membersihkan racun dalam tubuh dan meningkatkan metabolisme.', 28000, 70, true, true, ARRAY['Membersihkan racun tubuh', 'Meningkatkan metabolisme', 'Membantu diet alami', 'Menyegarkan tubuh']),
        (cat_herbal, 'Wedang Jahe Merah', 'wedang-jahe-merah', 'Minuman jahe merah hangat dan segar', 'Wedang jahe merah asli dengan rasa pedas dan manis. Menghangatkan tubuh, meningkatkan imunitas, dan cocok diminum saat cuaca dingin.', 12000, 120, false, true, ARRAY['Menghangatkan tubuh', 'Meredakan masuk angin', 'Meningkatkan imunitas', 'Meredakan sakit tenggorokan']),
        (cat_herbal, 'Teh Rosella', 'teh-rosella', 'Teh bunga rosella kaya antioksidan', 'Teh rosella dengan warna merah alami, kaya antioksidan, membantu menurunkan kolesterol dan tekanan darah tinggi.', 20000, 90, false, true, ARRAY['Kaya Vitamin C', 'Menurunkan tekanan darah', 'Membantu menurunkan berat badan', 'Kaya antioksidan']),
        (cat_instan, 'Kunyit Asam Instan', 'kunyit-asam-instan', 'Jamu kunyit asam dalam bentuk praktis', 'Jamu kunyit asam dalam bentuk bubuk instan. Cukup seduh dengan air hangat, praktis dibawa kemana-mana.', 25000, 150, false, true, ARRAY['Praktis diseduh', 'Rasa konsisten', 'Tahan lama', 'Khasiat sama dengan segar']),
        (cat_instan, 'Jahe Instan Premium', 'jahe-instan-premium', 'Minuman jahe instan dengan gula aren', 'Jahe instan premium dengan campuran gula aren asli. Hangat, manis, dan praktis untuk menemani aktivitas Anda.', 22000, 130, false, true, ARRAY['Rasa jahe kuat', 'Gula aren asli', 'Tanpa pengawet buatan', 'Praktis'])
    ON CONFLICT (slug) DO UPDATE SET
        benefits = EXCLUDED.benefits,
        price = EXCLUDED.price,
        stock = EXCLUDED.stock,
        is_featured = EXCLUDED.is_featured,
        is_active = EXCLUDED.is_active,
        short_description = EXCLUDED.short_description,
        description = EXCLUDED.description;
END $$;

-- =====================================================
-- NOTES:
-- =====================================================
-- 1. This is sample data for testing purposes
-- 2. You can modify or delete this data as needed
-- 3. Product images (thumbnail_url) should be uploaded to Supabase Storage
--    and URLs updated accordingly
