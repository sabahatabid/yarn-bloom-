'use client';

import { FormEvent, useState } from 'react';
import { PackageSearch, Search } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function OrdersPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (orderNumber.trim()) setSubmitted(true);
  }

  return <div className="min-h-screen flex flex-col bg-[#faf6f1]"><Navbar /><main className="flex-1 pt-32 pb-20 sm:pt-40 sm:pb-28"><div className="max-w-2xl mx-auto px-4 sm:px-6"><header className="text-center mb-12"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fbe8ec] text-[#b5616e]"><PackageSearch size={27} /></div><p className="text-[#d4838e] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Order updates</p><h1 className="font-display text-5xl sm:text-6xl font-bold text-[#2d1f1f]">Track My Order</h1><p className="mt-5 text-[#8c7070] leading-7">Enter the order number from your confirmation message to request an update.</p></header><section className="bg-white border border-[#f0e6e0] rounded-2xl p-6 sm:p-8"><form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3"><label htmlFor="order-number" className="sr-only">Order number</label><input id="order-number" value={orderNumber} onChange={(event) => { setOrderNumber(event.target.value); setSubmitted(false); }} placeholder="e.g. YB-ABC123-4567" className="input-brand flex-1" required /><button className="btn-primary justify-center" type="submit"><Search size={17} /> Check status</button></form>{submitted && <div className="mt-6 rounded-xl border border-[#c8dbc5] bg-[#eef6ed] p-4 text-sm leading-6 text-[#49644a]">We found your request for <strong>{orderNumber.trim()}</strong>. Your order is currently <strong>Pending Confirmation</strong>. We will contact you shortly to confirm delivery.</div>}<p className="mt-5 text-xs text-[#8c7070]">Need help? Email hello@yarnandbloom.pk with your order number.</p></section></div></main><Footer /></div>;
}
