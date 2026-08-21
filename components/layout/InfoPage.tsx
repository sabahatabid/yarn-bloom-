import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function InfoPage({ eyebrow, title, intro, icon: Icon, children }: InfoPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <header className="text-center mb-12 sm:mb-16">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fbe8ec] text-[#b5616e]"><Icon size={27} /></div>
            <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-[0.2em] mb-3">{eyebrow}</p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#2d1f1f]">{title}</h1>
            <p className="max-w-2xl mx-auto mt-5 text-[#8c7070] leading-7">{intro}</p>
          </header>
          <div className="space-y-5">{children}</div>
          <div className="text-center mt-12"><Link href="/shop" className="btn-primary">Continue Shopping</Link></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="bg-white border border-[#f0e6e0] rounded-2xl p-6 sm:p-8"><h2 className="font-display text-2xl font-semibold text-[#2d1f1f] mb-3">{title}</h2><div className="text-sm leading-7 text-[#6d5656]">{children}</div></section>;
}
