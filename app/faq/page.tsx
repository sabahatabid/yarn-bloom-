import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers about Yarn & Bloom products, custom orders, delivery and care.',
};

const faqs = [
  ['Are all products handmade?', 'Yes. Every Yarn & Bloom piece is crocheted and finished by hand using premium cotton yarn. Small variations are part of its handmade charm.'],
  ['How long does delivery take?', 'Ready-to-ship orders usually arrive within 3–7 business days across Pakistan. Custom orders may take 5–10 business days before delivery.'],
  ['Do you offer Cash on Delivery?', 'Yes. Cash on Delivery is available for all eligible orders. You pay the total amount in cash when your order arrives.'],
  ['Can I customize a gift?', 'Yes. You can request colors, combinations and personalization for selected products. Add your note at checkout or contact us before ordering.'],
  ['How should I care for crochet flowers?', 'Keep them away from moisture, dust them gently and store them in a cool, dry place. With a little care, they can stay beautiful for years.'],
  ['Can I return or exchange an order?', 'Please contact us within 48 hours of delivery if your order arrives damaged or incorrect. Customized items are generally not eligible for return.'],
  ['How do I track my order?', 'After your order is confirmed, we share delivery updates through your provided contact details. You can also reach us through email or WhatsApp.'],
  ['What if I need help with my order?', 'We are happy to help. Email hello@yarnandbloom.pk with your order number and we will get back to you as soon as possible.'],
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <header className="text-center mb-12 sm:mb-16"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fbe8ec] text-[#b5616e]"><HelpCircle size={28} /></div><p className="text-[#d4838e] text-sm font-semibold uppercase tracking-[0.2em] mb-3">Need to know</p><h1 className="font-display text-5xl sm:text-6xl font-bold text-[#2d1f1f]">Frequently Asked Questions</h1><p className="max-w-xl mx-auto mt-5 text-[#8c7070] leading-7">Everything you need to know before your next thoughtful gift.</p></header>
          <div className="space-y-3">{faqs.map(([question, answer]) => <details key={question} className="group bg-white border border-[#f0e6e0] rounded-2xl px-5 sm:px-7"><summary className="cursor-pointer list-none py-5 pr-8 font-semibold text-[#2d1f1f] relative marker:hidden after:absolute after:right-1 after:top-5 after:text-2xl after:font-light after:text-[#d4838e] after:content-['+'] group-open:after:content-['−']">{question}</summary><p className="max-w-3xl pb-6 pr-6 text-sm leading-7 text-[#8c7070]">{answer}</p></details>)}</div>
          <div className="mt-14 rounded-3xl bg-[#f5ede3] border border-[#eadbd0] p-7 sm:p-10 text-center"><h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#2d1f1f]">Still have a question?</h2><p className="mt-3 text-sm text-[#8c7070]">We would love to help with your order or custom idea.</p><Link href="mailto:hello@yarnandbloom.pk" className="btn-outline mt-6">Get in touch <ArrowRight size={16} /></Link></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
