/**
 * Supabase database query helpers for Yarn & Bloom.
 * These functions connect to Supabase when credentials are configured.
 * When Supabase is not configured (placeholder credentials), they
 * transparently fall back to the local sample data so the UI always works.
 */

import { createClient } from './client';
import {
  SAMPLE_PRODUCTS,
  SAMPLE_CATEGORIES,
} from '@/lib/data/sample-products';
import type { Product, Category, ProductFilters } from '@/types';

// Helper: check if Supabase is actually configured
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
  return (
    url.length > 0 &&
    !url.includes('placeholder') &&
    key.length > 0 &&
    !key.includes('placeholder')
  );
}

// ============================================================
// CATEGORIES
// ============================================================

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return SAMPLE_CATEGORIES;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error || !data) return SAMPLE_CATEGORIES;
    return data as Category[];
  } catch {
    return SAMPLE_CATEGORIES;
  }
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  if (!isSupabaseConfigured()) {
    return SAMPLE_CATEGORIES.find((c) => c.slug === slug) ?? null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return null;
    return data as Category;
  } catch {
    return null;
  }
}

// ============================================================
// PRODUCTS
// ============================================================

export async function getProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return applyFiltersToSampleData(SAMPLE_PRODUCTS, filters);
  }

  try {
    const supabase = createClient();
    let query = supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `
      )
      .eq('is_active', true);

    if (filters.category) {
      query = query.eq('categories.slug', filters.category);
    }
    if (filters.is_best_seller) {
      query = query.eq('is_best_seller', true);
    }
    if (filters.is_new_arrival) {
      query = query.eq('is_new_arrival', true);
    }
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    if (filters.min_price !== undefined) {
      query = query.gte('price', filters.min_price);
    }
    if (filters.max_price !== undefined) {
      query = query.lte('price', filters.max_price);
    }

    // Sorting
    switch (filters.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'popular':
        query = query.order('review_count', { ascending: false });
        break;
      case 'rating':
        query = query.order('average_rating', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data) return applyFiltersToSampleData(SAMPLE_PRODUCTS, filters);

    return data.map(normalizeProduct);
  } catch {
    return applyFiltersToSampleData(SAMPLE_PRODUCTS, filters);
  }
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `
      )
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return SAMPLE_PRODUCTS.find((p) => p.slug === slug) ?? null;
    }
    return normalizeProduct(data);
  } catch {
    return SAMPLE_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ sort: 'newest' }).then((p) =>
    p.filter((pr) => pr.is_featured).slice(0, 8)
  );
}

export async function getBestSellers(): Promise<Product[]> {
  return getProducts({ is_best_seller: true, sort: 'popular' }).then((p) =>
    p.slice(0, 8)
  );
}

export async function getNewArrivals(): Promise<Product[]> {
  return getProducts({ is_new_arrival: true, sort: 'newest' }).then((p) =>
    p.slice(0, 8)
  );
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string
): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return SAMPLE_PRODUCTS.filter(
      (p) => p.id !== productId && p.category_id === categoryId
    ).slice(0, 4);
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`*, category:categories(*), images:product_images(*)`)
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .neq('id', productId)
      .limit(4);

    if (error || !data) {
      return SAMPLE_PRODUCTS.filter(
        (p) => p.id !== productId && p.category_id === categoryId
      ).slice(0, 4);
    }
    return data.map(normalizeProduct);
  } catch {
    return SAMPLE_PRODUCTS.filter(
      (p) => p.id !== productId && p.category_id === categoryId
    ).slice(0, 4);
  }
}

// ============================================================
// Helpers
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProduct(raw: any): Product {
  const primaryImage =
    raw.images?.find((img: { is_primary: boolean; url: string }) => img.is_primary)?.url ??
    raw.images?.[0]?.url ??
    null;

  return {
    ...raw,
    category: raw.category ?? undefined,
    images: raw.images ?? [],
    primary_image: primaryImage,
    variants: raw.variants ?? [],
  } as Product;
}

function applyFiltersToSampleData(
  products: Product[],
  filters: ProductFilters
): Product[] {
  let result = [...products];

  if (filters.category) {
    result = result.filter((p) => p.category?.slug === filters.category);
  }
  if (filters.is_best_seller) {
    result = result.filter((p) => p.is_best_seller);
  }
  if (filters.is_new_arrival) {
    result = result.filter((p) => p.is_new_arrival);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }
  if (filters.min_price !== undefined) {
    result = result.filter((p) => p.price >= filters.min_price!);
  }
  if (filters.max_price !== undefined) {
    result = result.filter((p) => p.price <= filters.max_price!);
  }

  switch (filters.sort) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'popular':
      result.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0));
      break;
    case 'rating':
      result.sort((a, b) => (b.average_rating ?? 0) - (a.average_rating ?? 0));
      break;
    default:
      // newest first — already ordered
      break;
  }

  return result;
}
