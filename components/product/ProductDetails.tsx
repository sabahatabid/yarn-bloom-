'use client';

import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import StarRating from '@/components/ui/StarRating';
import { useCartStore } from '@/lib/store/cartStore';
import ProductCard from './ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetails({ product, relatedProducts }: Props) {
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState<string | undefined>(
    product.variants?.[0]?.value
  );
  const [note, setNote] = useState('');

  const addItem = useCartStore((s) => s.addItem);

  const price = product.sale_price ?? product.price;

  function handleAdd() {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addItem(product, qty, variant, note);
    toast.success('Added to cart');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white rounded-2xl overflow-hidden border border-[#f0e6e0]">
          <div style={{ aspectRatio: '4/5' }} className="relative bg-[#faf6f1]">
            {product.primary_image ? (
              <Image src={product.primary_image} alt={product.name} fill sizes="(max-width: 1024px) 80vw, 50vw" className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-6xl">🌸</div>
            )}
          </div>
        </div>

        <div className="lg:col-span-6">
          <h1 className="font-display text-3xl font-bold text-[#2d1f1f] mb-2">{product.name}</h1>
          <p className="text-sm text-[#8c7070] mb-4">{product.short_description}</p>

          <div className="mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#d4838e]">{formatPrice(price)}</span>
              {product.sale_price && (
                <span className="text-sm line-through text-[#b0a0a0]">{formatPrice(product.price)}</span>
              )}
            </div>
            <div className="mt-2">
              <StarRating rating={product.average_rating ?? 0} showCount count={product.review_count} />
            </div>
          </div>

          <p className="text-[#5a4040] mb-4 whitespace-pre-line">{product.description}</p>

          <div className="mb-4 space-y-3">
            <div>
              <span className="text-sm font-medium text-[#5a4040]">Stock:</span>
              <span className={`ml-2 font-semibold ${product.stock === 0 ? 'text-amber-600' : 'text-[#2d1f1f]'}`}>
                {product.stock === 0 ? 'Out of stock' : `${product.stock} available`}
              </span>
            </div>

            {product.variants && product.variants.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-[#5a4040] mb-2">Options</label>
                <div className="flex gap-2 flex-wrap">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariant(v.value)}
                      className={`px-3 py-1.5 rounded-full border ${variant === v.value ? 'bg-[#d4838e] text-white border-[#d4838e]' : 'bg-white text-[#5a4040]'}`}
                    >
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.is_customizable && (
              <div>
                <label className="block text-sm font-medium text-[#5a4040] mb-2">Customization</label>
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Name / color / instructions" className="input-brand w-full" />
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-full overflow-hidden">
                <button aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2">-</button>
                <div className="px-6 py-2 font-semibold">{qty}</div>
                <button aria-label="Increase" onClick={() => setQty((q) => q + 1)} className="px-4 py-2">+</button>
              </div>

              <div className="flex gap-2">
                <button onClick={handleAdd} className="btn-primary px-6 py-2 rounded-xl">Add to Cart</button>
                <button onClick={() => toast('Checkout not implemented')} className="px-6 py-2 rounded-xl border border-[#f0e6e0]">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="mt-12">
        <h3 className="font-display text-2xl font-semibold text-[#2d1f1f] mb-4">Related products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
