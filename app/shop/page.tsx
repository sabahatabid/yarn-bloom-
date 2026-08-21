import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShopPageClient from './ShopPageClient';
import { getProducts, getCategories } from '@/lib/supabase/queries';
import type { ProductFilters } from '@/types';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description:
    'Browse our full collection of handmade crochet bouquets, flowers, gajras, keychains and personalized gifts.',
};

interface ShopPageProps {
  searchParams: Promise<{
    category?: string;
    filter?: string;
    search?: string;
    sort?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;

  const filters: ProductFilters = {};
  if (params.category) filters.category = params.category;
  if (params.filter === 'best-sellers') filters.is_best_seller = true;
  if (params.filter === 'new-arrivals') filters.is_new_arrival = true;
  if (params.search) filters.search = params.search;
  if (params.sort) {
    filters.sort = params.sort as ProductFilters['sort'];
  }
  if (params.min_price) filters.min_price = Number(params.min_price);
  if (params.max_price) filters.max_price = Number(params.max_price);

  const [products, categories] = await Promise.all([
    getProducts(filters),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <ShopPageClient
          initialProducts={products}
          categories={categories}
          initialFilters={filters}
          searchQuery={params.search ?? ''}
        />
      </main>
      <Footer />
    </div>
  );
}
