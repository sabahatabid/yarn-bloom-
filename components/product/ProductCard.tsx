'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import StarRating from '@/components/ui/StarRating';
import Badge from '@/components/ui/Badge';
import { useCartStore } from '@/lib/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const discountPercent =
    product.sale_price
      ? Math.round(((product.price - product.sale_price) / product.price) * 100)
      : null;

  const displayPrice = product.sale_price ?? product.price;
  const outOfStock = product.stock === 0;

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    if (outOfStock) return;

    addItem(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);

    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? 'animate-fade-in-up' : 'opacity-0'} 
            bg-white rounded-2xl shadow-xl border border-[#f0e6e0] p-4 flex items-center gap-3 max-w-xs`}
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
    <article className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0e6e0] card-hover flex flex-col">
      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="block relative overflow-hidden bg-[#faf6f1]"
        style={{ aspectRatio: '3/4' }}
      >
        {!imageError && product.primary_image ? (
          <Image
            src={product.primary_image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#fbe8ec] to-[#faf6f1]">
            <span className="text-5xl">🌸</span>
          </div>
        )}

        {/* Out-of-stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-[#2d1f1f] text-white text-xs font-bold px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_best_seller && <Badge label="Best Seller" variant="rose" />}
          {product.is_new_arrival && <Badge label="New" variant="sage" />}
          {discountPercent && <Badge label={`-${discountPercent}%`} variant="sale" />}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setWishlisted((w) => !w);
          }}
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-[#d4838e] text-[#d4838e]' : 'text-[#8c7070]'}
          />
        </button>
      </Link>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/shop/${product.slug}`} className="block flex-1">
          <p className="text-xs text-[#d4838e] font-semibold uppercase tracking-wider mb-1">
            {product.category?.name}
          </p>
          <h3 className="font-display text-[#2d1f1f] font-semibold text-base leading-snug mb-2 group-hover:text-[#d4838e] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {product.average_rating !== undefined && (
            <div className="mb-3">
              <StarRating
                rating={product.average_rating}
                showCount
                count={product.review_count}
              />
            </div>
          )}
        </Link>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0e6e0]">
          <div>
            <span className="text-[#d4838e] font-bold text-lg">{formatPrice(displayPrice)}</span>
            {product.sale_price && (
              <span className="ml-2 text-[#b0a0a0] text-sm line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 
              ${outOfStock
                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                : justAdded
                ? 'bg-[#d4838e] text-white scale-110'
                : 'bg-[#fbe8ec] text-[#d4838e] hover:bg-[#d4838e] hover:text-white hover:scale-110'
              }`}
            aria-label={outOfStock ? 'Out of stock' : `Add ${product.name} to cart`}
          >
            {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
          </button>
        </div>

        {/* Stock warning */}
        {product.stock > 0 && product.stock <= 3 && (
          <p className="text-xs text-amber-600 mt-2 font-medium">
            Only {product.stock} left!
          </p>
        )}
      </div>
    </article>
  );
}
