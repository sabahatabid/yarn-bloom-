'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SAMPLE_CATEGORIES } from '@/lib/data/sample-products';

const categoryEmojis: Record<string, string> = {
  'crochet-bouquets': '💐',
  'crochet-flowers': '🌸',
  gajras: '🌺',
  keychains: '🔑',
  'baby-gifts': '🍼',
  'customized-gifts': '🎁',
  'gift-sets': '🎀',
};

export default function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-widest mb-3">
            Browse by Category
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2d1f1f] mb-4">
            Our Collections
          </h2>
          <p className="text-[#5a4040] text-base max-w-md mx-auto">
            From bouquets to keychains — each collection is full of handmade magic.
          </p>
          <div className="section-divider mt-6" />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {SAMPLE_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center p-4 rounded-2xl border border-[#f0e6e0] bg-[#faf6f1] hover:bg-[#fbe8ec] hover:border-[#f2c4ce] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-110 duration-300">
                {categoryEmojis[cat.slug] ?? '🌷'}
              </div>
              <p className="text-xs font-semibold text-[#2d1f1f] text-center leading-tight group-hover:text-[#d4838e] transition-colors">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#d4838e] font-semibold text-sm hover:text-[#b5616e] transition-colors group"
          >
            View All Products
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
