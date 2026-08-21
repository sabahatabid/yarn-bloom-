'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useWishlistStore } from '@/lib/store/wishlistStore';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-[0.2em] mb-2">Saved with love</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#2d1f1f]">My Wishlist</h1>
          </div>
          <Heart className="hidden sm:block text-[#d4838e]" size={34} fill="currentColor" aria-hidden="true" />
        </div>

        {items.length === 0 ? (
          <section className="bg-white border border-[#f0e6e0] rounded-2xl text-center py-20 px-6">
            <Heart className="mx-auto text-[#d4838e] mb-5" size={42} strokeWidth={1.5} aria-hidden="true" />
            <h2 className="font-display text-2xl font-semibold text-[#2d1f1f]">Your wishlist is waiting</h2>
            <p className="text-[#8c7070] mt-3 mb-7">Tap the heart on any piece you love and it will appear here.</p>
            <Link href="/shop" className="btn-primary">Explore the shop</Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((product) => {
              const price = product.sale_price ?? product.price;
              return (
                <article key={product.id} className="bg-white border border-[#f0e6e0] rounded-2xl overflow-hidden">
                  <Link href={`/shop/${product.slug}`} className="block aspect-[4/3] bg-[#fbe8ec] relative overflow-hidden">
                    {product.primary_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.primary_image} alt={product.name} className="w-full h-full object-cover" />
                    ) : <span className="absolute inset-0 flex items-center justify-center text-6xl">🌸</span>}
                  </Link>
                  <div className="p-5">
                    <Link href={`/shop/${product.slug}`} className="font-display text-lg font-semibold text-[#2d1f1f] hover:text-[#d4838e]">{product.name}</Link>
                    <p className="text-[#d4838e] font-bold mt-2">{formatPrice(price)}</p>
                    <div className="flex gap-2 mt-5">
                      <button onClick={() => addItem(product)} className="btn-primary flex-1 justify-center text-xs"><ShoppingBag size={15} /> Add to cart</button>
                      <button onClick={() => removeItem(product.id)} className="p-3 rounded-xl border border-[#f0e6e0] text-[#8c7070] hover:text-[#b5616e] hover:bg-[#fbe8ec]" aria-label={`Remove ${product.name} from wishlist`}><Trash2 size={17} /></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
