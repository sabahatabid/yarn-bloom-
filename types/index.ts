// ============================================================
// YARN & BLOOM — Type Definitions
// ============================================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar_url?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt_text?: string;
  is_primary: boolean;
  sort_order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price_modifier?: number;
  stock?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description?: string;
  price: number;
  sale_price?: number;
  stock: number;
  category_id: string;
  category?: Category;
  images?: ProductImage[];
  primary_image?: string;
  variants?: ProductVariant[];
  is_featured: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  is_customizable: boolean;
  average_rating?: number;
  review_count?: number;
  tags?: string[];
  created_at: string;
  updated_at?: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  product: Product;
  quantity: number;
  selected_variant?: string;
  customization_note?: string;
  unit_price: number;
}

export interface Cart {
  id: string;
  user_id?: string;
  session_id?: string;
  items: CartItem[];
  created_at: string;
  updated_at?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'COD' | 'cash_on_delivery' | 'bank_transfer';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product?: Product;
  product_name: string;
  product_image?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  customization_note?: string;
  selected_variant?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  city: string;
  order_notes?: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  status: OrderStatus;
  tracking_number?: string;
  created_at: string;
  updated_at?: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user?: Profile;
  rating: number;
  title?: string;
  comment: string;
  is_verified: boolean;
  created_at: string;
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product?: Product;
  created_at: string;
}

export interface Notification {
  id: string;
  type: 'new_order' | 'order_update' | 'low_stock' | 'system';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export interface AdminStats {
  total_orders: number;
  pending_orders: number;
  processing_orders: number;
  delivered_orders: number;
  cancelled_orders: number;
  total_revenue: number;
  total_customers: number;
  total_products: number;
  low_stock_products: number;
}

export interface CheckoutFormData {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  delivery_address: string;
  order_notes?: string;
  payment_method: PaymentMethod;
}

export interface ProductFilters {
  category?: string;
  min_price?: number;
  max_price?: number;
  is_available?: boolean;
  is_best_seller?: boolean;
  is_new_arrival?: boolean;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popular' | 'rating';
}
