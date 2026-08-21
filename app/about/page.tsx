import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, WandSparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet Yarn & Bloom, a handmade crochet gift studio creating thoughtful pieces that last.',
};

const values = [
  { icon: Heart, title: 'Made with heart', text: 'Every stitch is carefully made by hand, with patience and a personal touch.' },
  { icon: Sparkles, title: 'Made to feel special', text: 'From color choices to gift wrapping, small details turn a present into a memory.' },
  { icon: WandSparkles, title: 'Made to last', text: 'Our crochet flowers never wilt, so your thoughtful gesture can stay beautiful for years.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#f5ede3] pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="absolute -right-20 top-20 text-[10rem] leading-none opacity-20 rotate-12">🌷</div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-[0.2em] mb-4">Our story</p>
              <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight text-[#2d1f1f]">Small stitches.<br /><span className="text-gradient">Big feelings.</span></h1>
              <p className="font-script text-2xl text-[#8b6355] mt-5">Handmade pieces made to be remembered.</p>
              <p className="max-w-xl mt-6 text-[#5a4040] leading-8">Yarn &amp; Bloom began with a simple idea: the best gifts do not need to be loud. They need to feel personal. We create crochet bouquets, flowers and keepsakes in Lahore, Pakistan, one thoughtful stitch at a time.</p>
              <Link href="/shop" className="btn-primary mt-8">Explore our pieces <ArrowRight size={17} /></Link>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-[#fbe8ec] via-white to-[#c8dbc5] flex items-center justify-center border border-white shadow-[0_24px_60px_rgba(140,112,112,0.12)]">
                <div className="text-center"><div className="text-8xl mb-5">💐</div><p className="font-display text-2xl font-semibold text-[#2d1f1f]">A little bloom<br />that lasts.</p></div>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white border border-[#f0e6e0] px-5 py-4 shadow-lg"><p className="font-script text-xl text-[#b5616e]">crafted slowly</p><p className="text-xs text-[#8c7070] mt-1">with premium cotton yarn</p></div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-14 items-start">
            <div><p className="text-[#d4838e] text-sm font-semibold uppercase tracking-[0.2em] mb-3">The Yarn &amp; Bloom way</p><h2 className="font-display text-4xl sm:text-5xl font-bold text-[#2d1f1f]">Thoughtful gifts,<br />made by hand.</h2></div>
            <div><p className="text-[#5a4040] leading-8">There is something quietly magical about a handmade gift. It carries time, care and intention. That is what we want every Yarn &amp; Bloom piece to hold. Whether it is a cheerful bouquet, a delicate gajra or a tiny personalized keepsake, we make it for the moment it will create when someone opens it.</p><div className="grid sm:grid-cols-3 gap-4 mt-10">{values.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl bg-[#faf6f1] border border-[#f0e6e0] p-5"><Icon size={23} className="text-[#d4838e] mb-5" /><h3 className="font-semibold text-[#2d1f1f] mb-2">{title}</h3><p className="text-sm leading-6 text-[#8c7070]">{text}</p></div>)}</div></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
