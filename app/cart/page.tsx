"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const itemCount = useCartStore((s) => s.itemCount)();
  const subtotal = useCartStore((s) => s.subtotal)();
  const deliveryFee = useCartStore((s) => s.deliveryFee)();
  const total = useCartStore((s) => s.total)();
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-[#2d1f1f] mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#f0e6e0]">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="font-display text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-[#8c7070] mb-6">Add some lovely crochet goodies to your cart.</p>
            <button onClick={() => router.push('/shop')} className="btn-primary">Continue Shopping</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="bg-white p-4 rounded-2xl border border-[#f0e6e0] flex gap-4">
                  <div style={{ width: 110, height: 140 }} className="relative bg-[#faf6f1] rounded-md overflow-hidden">
                    {it.product.primary_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.product.primary_image} alt={it.product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-4xl">🌸</div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#2d1f1f]">{it.product.name}</h3>
                        <p className="text-sm text-[#8c7070]">{it.selected_variant ?? it.product.short_description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#d4838e]">{formatPrice(it.unit_price)}</div>
                        <div className="text-sm text-[#8c7070]">{formatPrice(it.unit_price * it.quantity)}</div>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border rounded-full overflow-hidden">
                        <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="px-3 py-1">-</button>
                        <div className="px-4 py-1">{it.quantity}</div>
                        <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-3 py-1">+</button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button onClick={() => removeItem(it.id)} className="text-sm text-[#d4838e]">Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="bg-white rounded-2xl border border-[#f0e6e0] p-6 h-fit">
              <h3 className="font-semibold text-[#2d1f1f] mb-4">Summary</h3>
              <div className="flex justify-between mb-2"><span className="text-sm text-[#8c7070]">Items ({itemCount})</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between mb-2"><span className="text-sm text-[#8c7070]">Delivery</span><span className="font-semibold">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span></div>
              <div className="border-t border-[#f0e6e0] mt-4 pt-4 flex justify-between items-center"><span className="font-bold text-lg">Total</span><span className="font-bold text-2xl text-[#d4838e]">{formatPrice(total)}</span></div>

              <div className="mt-6 space-y-3">
                <button onClick={() => router.push('/checkout')} className="btn-primary w-full py-3">Proceed to Checkout</button>
                <button onClick={() => clearCart()} className="w-full py-3 rounded-xl border border-[#f0e6e0]">Clear Cart</button>
                <button onClick={() => router.push('/shop')} className="w-full py-3 rounded-xl">Continue Shopping</button>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
