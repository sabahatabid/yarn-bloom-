-- ============================================================
-- YARN & BLOOM — Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories(sort_order);

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  stock INTEGER NOT NULL DEFAULT 0,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_customizable BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  average_rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(is_best_seller) WHERE is_best_seller = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_primary ON product_images(product_id, is_primary);

-- ============================================================
-- PRODUCT VARIANTS
-- ============================================================
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  value TEXT NOT NULL,
  price_modifier DECIMAL(10,2) DEFAULT 0,
  stock INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CARTS
-- ============================================================
CREATE TABLE IF NOT EXISTS carts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_carts_user ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session ON carts(session_id);

-- ============================================================
-- CART ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  selected_variant TEXT,
  customization_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_items_unique ON cart_items(cart_id, product_id, selected_variant) 
  WHERE selected_variant IS NOT NULL;

-- ============================================================
-- ORDERS
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  city TEXT NOT NULL,
  order_notes TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'cash_on_delivery' 
  CHECK (payment_method IN ('COD', 'cash_on_delivery', 'bank_transfer')),
  payment_status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  tracking_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- Keep existing databases compatible with the COD checkout flow.
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;
ALTER TABLE orders ADD CONSTRAINT orders_payment_method_check
  CHECK (payment_method IN ('COD', 'cash_on_delivery', 'bank_transfer'));

-- ============================================================
-- ORDER ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  selected_variant TEXT,
  customization_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- ============================================================
-- REVIEWS
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title TEXT,
  comment TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- ============================================================
-- WISHLISTS
-- ============================================================
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);

-- ============================================================
-- NOTIFICATIONS (admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL DEFAULT 'new_order',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON notifications(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Products & categories: public read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are public" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Categories are public" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Product images are public" ON product_images FOR SELECT USING (true);
CREATE POLICY "Product variants are public" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Reviews are public" ON reviews FOR SELECT USING (true);

-- Products: admin write
CREATE POLICY "Admins can manage products" ON products 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Admins can manage categories" ON categories 
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Carts: users own their carts
CREATE POLICY "Users own carts" ON carts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Cart items via cart" ON cart_items FOR ALL USING (
  EXISTS (SELECT 1 FROM carts WHERE id = cart_items.cart_id AND user_id = auth.uid())
);

-- Orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage orders" ON orders FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Order items viewable" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND user_id = auth.uid())
);
CREATE POLICY "Order items insertable" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins view all order items" ON order_items FOR ALL 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Reviews
CREATE POLICY "Users can review" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wishlists
CREATE POLICY "Users own wishlists" ON wishlists FOR ALL USING (auth.uid() = user_id);

-- Notifications: admin only
CREATE POLICY "Admins read notifications" ON notifications FOR SELECT 
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- SEED DATA — Categories
-- ============================================================
INSERT INTO categories (name, slug, description, sort_order) VALUES
  ('Crochet Bouquets', 'crochet-bouquets', 'Beautiful handmade crochet flower bouquets', 1),
  ('Crochet Flowers', 'crochet-flowers', 'Individual handcrafted crochet flowers', 2),
  ('Gajras', 'gajras', 'Traditional crochet gajras for weddings and occasions', 3),
  ('Keychains', 'keychains', 'Cute handmade crochet keychains', 4),
  ('Baby Gifts', 'baby-gifts', 'Adorable crochet gifts for babies', 5),
  ('Customized Gifts', 'customized-gifts', 'Personalized crochet gifts made with love', 6),
  ('Gift Sets', 'gift-sets', 'Curated crochet gift sets for special occasions', 7)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED DATA — Products
-- ============================================================
-- Note: These use a subquery to get category IDs by slug
INSERT INTO products (
  name, slug, description, short_description, price, sale_price,
  stock, category_id, is_featured, is_best_seller, is_new_arrival,
  is_customizable, average_rating, review_count, tags
)
SELECT
  'Crochet Rose Bouquet',
  'crochet-rose-bouquet',
  'A stunning handmade bouquet of 12 crochet roses in your choice of colors. Each petal is crafted with premium cotton yarn, making this a timeless keepsake that will never wilt. Perfect for birthdays, anniversaries, or just because.',
  'Handmade bouquet of 12 crochet roses in your choice of colors.',
  2500, NULL, 15,
  (SELECT id FROM categories WHERE slug = 'crochet-bouquets'),
  true, true, false, true, 4.9, 47,
  ARRAY['bouquet','roses','gift','wedding']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'crochet-rose-bouquet');

INSERT INTO products (
  name, slug, description, short_description, price, stock,
  category_id, is_featured, is_best_seller, is_new_arrival,
  is_customizable, average_rating, review_count, tags
)
SELECT
  'Mini Crochet Flower',
  'mini-crochet-flower',
  'A delicate, handcrafted mini crochet flower perfect as a hair accessory, gift topper, or home decor. Made with soft cotton yarn and available in a wide range of colors.',
  'Delicate handcrafted mini crochet flower — perfect as a gift topper.',
  450, 50,
  (SELECT id FROM categories WHERE slug = 'crochet-flowers'),
  false, true, true, false, 4.7, 23,
  ARRAY['flower','accessory','mini']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'mini-crochet-flower');

INSERT INTO products (
  name, slug, description, short_description, price, sale_price, stock,
  category_id, is_featured, is_best_seller, is_new_arrival,
  is_customizable, average_rating, review_count, tags
)
SELECT
  'Crochet Gajra',
  'crochet-gajra',
  'A beautiful traditional-style gajra made entirely by hand with crochet flowers. Perfect for weddings, mehndi ceremonies, and special occasions. Unlike real flowers, this gajra lasts forever as a precious memento.',
  'Traditional handmade crochet gajra — perfect for weddings.',
  1200, 999, 20,
  (SELECT id FROM categories WHERE slug = 'gajras'),
  true, false, true, true, 4.8, 18,
  ARRAY['gajra','wedding','traditional','hair']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'crochet-gajra');

INSERT INTO products (
  name, slug, description, short_description, price, stock,
  category_id, is_featured, is_best_seller, is_new_arrival,
  is_customizable, average_rating, review_count, tags
)
SELECT
  'Crochet Heart Keychain',
  'crochet-heart-keychain',
  'A sweet, handmade crochet heart keychain filled with love. Each keychain is carefully crafted and stuffed with soft filling. Makes a wonderful little gift or a charming addition to your keys.',
  'Sweet handmade crochet heart keychain — a tiny gift full of love.',
  500, 35,
  (SELECT id FROM categories WHERE slug = 'keychains'),
  false, true, false, false, 4.6, 31,
  ARRAY['keychain','heart','gift']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'crochet-heart-keychain');

INSERT INTO products (
  name, slug, description, short_description, price, stock,
  category_id, is_featured, is_best_seller, is_new_arrival,
  is_customizable, average_rating, review_count, tags
)
SELECT
  'Customized Crochet Bouquet',
  'customized-crochet-bouquet',
  'Design your dream bouquet! Choose your flowers, colors, and arrangement. Add a personalized message tag. This is the ultimate handmade gift for someone special. Each bouquet is made to order with love and care.',
  'Your dream bouquet — fully customized with your choice of colors.',
  3500, 10,
  (SELECT id FROM categories WHERE slug = 'customized-gifts'),
  true, false, false, true, 5.0, 12,
  ARRAY['custom','bouquet','personalized','gift']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'customized-crochet-bouquet');

INSERT INTO products (
  name, slug, description, short_description, price, sale_price, stock,
  category_id, is_featured, is_best_seller, is_new_arrival,
  is_customizable, average_rating, review_count, tags
)
SELECT
  'Mini Gift Set',
  'mini-gift-set',
  'A curated set of our most beloved mini crochet pieces — perfect as a complete gift. Includes a mini bouquet, two keychains, and a small flower hair clip, all beautifully packaged in a gift box.',
  'Curated mini set — bouquet, keychains & hair clip in a gift box.',
  1800, 1500, 8,
  (SELECT id FROM categories WHERE slug = 'gift-sets'),
  true, true, false, false, 4.9, 28,
  ARRAY['gift set','bundle','value']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'mini-gift-set');

-- Seed product images (using placeholder URLs — replace with real Supabase Storage URLs)
INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
SELECT p.id,
  'https://images.unsplash.com/photo-1490750967868-88df5691cc3e?w=600&q=80',
  'Crochet Rose Bouquet', true, 1
FROM products p WHERE p.slug = 'crochet-rose-bouquet'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = p.id);

INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
SELECT p.id,
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
  'Mini Crochet Flower', true, 1
FROM products p WHERE p.slug = 'mini-crochet-flower'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = p.id);

INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
SELECT p.id,
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
  'Crochet Gajra', true, 1
FROM products p WHERE p.slug = 'crochet-gajra'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = p.id);

INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
SELECT p.id,
  'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
  'Crochet Heart Keychain', true, 1
FROM products p WHERE p.slug = 'crochet-heart-keychain'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = p.id);

INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
SELECT p.id,
  'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80',
  'Customized Crochet Bouquet', true, 1
FROM products p WHERE p.slug = 'customized-crochet-bouquet'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = p.id);

INSERT INTO product_images (product_id, url, alt_text, is_primary, sort_order)
SELECT p.id,
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80',
  'Mini Gift Set', true, 1
FROM products p WHERE p.slug = 'mini-gift-set'
AND NOT EXISTS (SELECT 1 FROM product_images WHERE product_id = p.id);

-- Seed product variants
INSERT INTO product_variants (product_id, name, value)
SELECT p.id, 'Color', v.value
FROM products p, (VALUES ('Red & Pink'), ('Pastel Mix'), ('White & Cream'), ('Custom Colors')) AS v(value)
WHERE p.slug = 'crochet-rose-bouquet'
AND NOT EXISTS (SELECT 1 FROM product_variants WHERE product_id = p.id);

INSERT INTO product_variants (product_id, name, value)
SELECT p.id, 'Color', v.value
FROM products p, (VALUES ('Red'), ('Pink'), ('Ivory')) AS v(value)
WHERE p.slug = 'crochet-heart-keychain'
AND NOT EXISTS (SELECT 1 FROM product_variants WHERE product_id = p.id);
