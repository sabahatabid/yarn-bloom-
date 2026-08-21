'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { SAMPLE_PRODUCTS, BEST_SELLERS, NEW_ARRIVALS, FEATURED_PRODUCTS } from '@/lib/data/sample-products';
import type { Product } from '@/types';
import toast from 'react-hot-toast';

const TABS = [
  { key: 'featured', label: '✨ Featured', data: FEATURED_PRODUCTS },
  { key: 'best-sellers', label: '🔥 Best Sellers', data: BEST_SELLERS },
  { key: 'new-arrivals', label: '🌿 New Arrivals', data: NEW_ARRIVALS },
  { key: 'all', label: 'All Products', data: SAMPLE_PRODUCTS },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured');

  const activeProducts = TABS.find((t) => t.key === activeTab)?.data ?? FEATURED_PRODUCTS;

  function handleAddToCart(product: Product) {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-fade-in-up' : 'opacity-0'
          } bg-white rounded-2xl shadow-xl border border-[#f0e6e0] p-4 flex items-center gap-3 max-w-xs`}
        >
          <span className="text-2xl">🛒</span>
          <div>
            <p className="text-sm font-semibold text-[#2d1f1f]">{product.name}</p>
            <p className="text-xs text-[#8c7070]">Added to cart!</p>
          </div>
        </div>
      ),
      { duration: 2500 }
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#faf6f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Products
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2d1f1f]">
              Shop the Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#d4838e] font-semibold text-sm hover:text-[#b5616e] transition-colors group flex-shrink-0"
          >
            View all products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-[#d4838e] text-white shadow-md'
                  : 'bg-white text-[#5a4040] border border-[#e8d5cc] hover:border-[#d4838e] hover:text-[#d4838e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {activeProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-primary text-base px-10 py-4">
            Explore All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
