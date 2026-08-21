'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import type { Product, Category, ProductFilters } from '@/types';
import { cn } from '@/lib/utils';

interface ShopPageClientProps {
  initialProducts: Product[];
  categories: Category[];
  initialFilters: ProductFilters;
  searchQuery: string;
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export default function ShopPageClient({
  initialProducts,
  categories,
  initialFilters,
  searchQuery,
}: ShopPageClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filterOpen, setFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  function updateUrl(params: Record<string, string | undefined>) {
    const current = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        current.set(key, value);
      } else {
        current.delete(key);
      }
    }
    startTransition(() => {
      router.push(`/shop?${current.toString()}`);
    });
  }

  function handleCategoryChange(slug: string | undefined) {
    updateUrl({ category: slug, filter: undefined });
  }

  function handleSortChange(sort: string) {
    updateUrl({ sort });
  }

  function handleFilterChange(filter: string | undefined) {
    updateUrl({ filter, category: undefined });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateUrl({ search: localSearch.trim() || undefined });
  }

  function handleClearFilters() {
    setLocalSearch('');
    startTransition(() => router.push('/shop'));
  }

  const hasActiveFilters =
    initialFilters.category ||
    initialFilters.is_best_seller ||
    initialFilters.is_new_arrival ||
    initialFilters.search ||
    initialFilters.sort;

  const activeCategory = initialFilters.category;
  const activeSort = initialFilters.sort ?? 'newest';

  return (
    <div className="min-h-screen bg-[#faf6f1]">
      {/* Header */}
      <div className="bg-white border-b border-[#f0e6e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#2d1f1f] mb-2">
            {initialFilters.search
              ? `Search: "${initialFilters.search}"`
              : initialFilters.is_best_seller
              ? '🔥 Best Sellers'
              : initialFilters.is_new_arrival
              ? '🌿 New Arrivals'
              : initialFilters.category
              ? categories.find((c) => c.slug === initialFilters.category)?.name ?? 'Products'
              : 'Shop All Products'}
          </h1>
          <p className="text-[#8c7070] text-sm">
            {initialProducts.length} product{initialProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search + Controls bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a898]" />
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="input-brand pl-10 text-sm h-11"
            />
          </form>

          {/* Sort */}
          <div className="relative">
            <select
              value={activeSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none input-brand pr-10 text-sm h-11 w-full sm:w-52 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c4a898] pointer-events-none" />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={cn(
              'flex items-center gap-2 px-4 h-11 rounded-xl border text-sm font-medium transition-all sm:hidden',
              filterOpen
                ? 'bg-[#d4838e] text-white border-[#d4838e]'
                : 'bg-white border-[#e8d5cc] text-[#5a4040]'
            )}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 px-4 h-11 rounded-xl bg-[#fbe8ec] text-[#d4838e] text-sm font-medium hover:bg-[#f2c4ce] transition-colors"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters — desktop */}
          <aside className="hidden sm:block w-56 flex-shrink-0 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-display font-semibold text-[#2d1f1f] mb-3 text-sm uppercase tracking-wide">
                Categories
              </h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => handleCategoryChange(undefined)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                      !activeCategory
                        ? 'bg-[#fbe8ec] text-[#d4838e] font-semibold'
                        : 'text-[#5a4040] hover:bg-[#fdf8f5]'
                    )}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                        activeCategory === cat.slug
                          ? 'bg-[#fbe8ec] text-[#d4838e] font-semibold'
                          : 'text-[#5a4040] hover:bg-[#fdf8f5]'
                      )}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick filters */}
            <div>
              <h3 className="font-display font-semibold text-[#2d1f1f] mb-3 text-sm uppercase tracking-wide">
                Filter By
              </h3>
              <ul className="space-y-1">
                {[
                  { key: 'best-sellers', label: '🔥 Best Sellers' },
                  { key: 'new-arrivals', label: '🌿 New Arrivals' },
                ].map(({ key, label }) => (
                  <li key={key}>
                    <button
                      onClick={() =>
                        handleFilterChange(
                          (initialFilters.is_best_seller && key === 'best-sellers') ||
                          (initialFilters.is_new_arrival && key === 'new-arrivals')
                            ? undefined
                            : key
                        )
                      }
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors',
                        (key === 'best-sellers' && initialFilters.is_best_seller) ||
                        (key === 'new-arrivals' && initialFilters.is_new_arrival)
                          ? 'bg-[#fbe8ec] text-[#d4838e] font-semibold'
                          : 'text-[#5a4040] hover:bg-[#fdf8f5]'
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {filterOpen && (
            <div className="sm:hidden fixed inset-0 z-30">
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setFilterOpen(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-display font-bold text-[#2d1f1f] text-lg">Filters</h3>
                  <button onClick={() => setFilterOpen(false)}>
                    <X size={20} className="text-[#5a4040]" />
                  </button>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#d4838e] mb-2">
                  Categories
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => { handleCategoryChange(undefined); setFilterOpen(false); }}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm border transition-colors',
                      !activeCategory ? 'bg-[#d4838e] text-white border-[#d4838e]' : 'border-[#e8d5cc] text-[#5a4040]'
                    )}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { handleCategoryChange(cat.slug); setFilterOpen(false); }}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-sm border transition-colors',
                        activeCategory === cat.slug ? 'bg-[#d4838e] text-white border-[#d4838e]' : 'border-[#e8d5cc] text-[#5a4040]'
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {isPending ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#f0e6e0]">
                    <div className="skeleton" style={{ aspectRatio: '3/4' }} />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-3 w-20 rounded" />
                      <div className="skeleton h-4 w-full rounded" />
                      <div className="skeleton h-4 w-3/4 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : initialProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🌸</div>
                <h3 className="font-display text-xl font-semibold text-[#2d1f1f] mb-2">
                  No products found
                </h3>
                <p className="text-[#8c7070] mb-6">
                  Try adjusting your search or filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="btn-primary"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {initialProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
