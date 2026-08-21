"use client";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/lib/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Banknote, CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = useCartStore((s) => s.subtotal)();
  const deliveryFee = useCartStore((s) => s.deliveryFee)();
  const total = useCartStore((s) => s.total)();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();

    if (!items || items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            fullName,
            email,
            phone,
            city,
            address,
            orderNotes,
          },
          paymentMethod: 'COD',
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to place order');
      }

      clearCart();
      router.push(`/order-confirmation?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to place order');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-display text-3xl font-bold text-[#2d1f1f] mb-6">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#f0e6e0]">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="font-display text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-[#8c7070] mb-6">Add items in the shop to proceed to checkout.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#f0e6e0]">
              <h2 className="font-semibold text-[#2d1f1f]">Shipping Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" className="input-brand" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-brand" type="email" required />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="input-brand" required />
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="input-brand" required />
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery address" className="input-brand col-span-full" required />
              </div>

              <div>
                <h3 className="font-semibold text-[#2d1f1f] mb-2">Order Notes</h3>
                <textarea value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} placeholder="Any special instructions?" className="input-brand w-full min-h-[80px]" />
              </div>

              <section aria-labelledby="payment-method-title" className="border-t border-[#f0e6e0] pt-7">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#b87364] font-semibold mb-1">Secure and simple</p>
                    <h2 id="payment-method-title" className="font-display text-xl font-semibold text-[#2d1f1f]">Payment Method</h2>
                  </div>
                  <span className="text-xs font-semibold text-[#6d8b70] bg-[#eef6ed] px-3 py-1.5 rounded-full">COD only</span>
                </div>

                <div className="border-2 border-[#d4838e] bg-[#fff9f6] rounded-2xl p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f4d9d3] text-[#b65f65]">
                      <Banknote size={23} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input id="cod" type="radio" name="payment" value="COD" checked readOnly className="h-4 w-4 accent-[#d4838e]" />
                        <label htmlFor="cod" className="font-semibold text-[#2d1f1f]">Cash on Delivery (COD)</label>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-[#8c7070]">Pay with cash when your order is delivered to your doorstep.</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3 rounded-xl bg-white border border-[#f0e6e0] p-3.5 text-sm">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-[#6d8b70]" size={18} aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#2d1f1f]">Payment Status: Pay on Delivery</p>
                      <p className="mt-1 text-[#8c7070]">You will pay the total amount in cash when your order is delivered.</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={isSubmitting} className="btn-primary inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting && <Loader2 size={17} className="animate-spin" aria-hidden="true" />}
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>

            <aside className="bg-white rounded-2xl border border-[#f0e6e0] p-6 h-fit">
              <h3 className="font-semibold text-[#2d1f1f] mb-4">Summary</h3>
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-[#2d1f1f]">{it.product.name}</div>
                      <div className="text-sm text-[#8c7070]">{it.quantity} × {formatPrice(it.unit_price)}</div>
                    </div>
                    <div className="font-semibold">{formatPrice(it.unit_price * it.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#f0e6e0] mt-4 pt-4">
                <div className="flex justify-between mb-2"><span className="text-sm text-[#8c7070]">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between mb-2"><span className="text-sm text-[#8c7070]">Delivery</span><span className="font-semibold">{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span></div>
                <div className="flex justify-between mt-4 pt-4 border-t border-[#f0e6e0]"><span className="font-bold">Total</span><span className="font-bold text-[#d4838e]">{formatPrice(total)}</span></div>
              </div>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
