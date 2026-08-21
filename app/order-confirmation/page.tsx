import Link from 'next/link';
import { CheckCircle2, PackageCheck } from 'lucide-react';

interface OrderConfirmationProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function OrderConfirmationPage({ searchParams }: OrderConfirmationProps) {
  const { order } = await searchParams;

  return (
    <main className="min-h-screen bg-[#faf6f1] px-4 py-12 sm:py-20 flex items-center justify-center">
      <section className="w-full max-w-xl bg-white border border-[#f0e6e0] rounded-3xl p-7 sm:p-12 text-center shadow-[0_18px_50px_rgba(140,112,112,0.08)]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#eef6ed] text-[#6d8b70]">
          <CheckCircle2 size={34} strokeWidth={1.7} aria-hidden="true" />
        </div>
        <p className="font-script text-2xl text-[#b87364]">Thank you for choosing handmade</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2d1f1f] mt-2">🎉 Your order has been placed successfully!</h1>
        {order && <p className="mt-4 text-sm text-[#8c7070]">Order number: <span className="font-semibold text-[#5a4040]">{order}</span></p>}

        <div className="mt-8 rounded-2xl bg-[#fff9f6] border border-[#f0e6e0] p-5 text-left space-y-4">
          <div className="flex items-center gap-3">
            <PackageCheck size={20} className="text-[#b65f65]" aria-hidden="true" />
            <div><p className="text-sm text-[#8c7070]">Payment Method</p><p className="font-semibold text-[#2d1f1f]">Cash on Delivery</p></div>
          </div>
          <div className="flex justify-between gap-4 text-sm"><span className="text-[#8c7070]">Payment Status</span><span className="font-semibold text-[#6d8b70]">Pay on Delivery</span></div>
          <div className="flex justify-between gap-4 text-sm"><span className="text-[#8c7070]">Order Status</span><span className="font-semibold text-[#b87364]">Pending Confirmation</span></div>
        </div>

        <p className="mt-6 text-sm leading-6 text-[#8c7070]">We will contact you shortly to confirm your order and delivery details.</p>
        <Link href="/shop" className="btn-primary inline-flex mt-7">Continue Shopping</Link>
      </section>
    </main>
  );
}
