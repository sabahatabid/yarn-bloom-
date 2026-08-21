import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramSection from '@/components/home/InstagramSection';
import NewsletterSection from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: 'Yarn & Bloom — Handmade Crochet Gifts & Bouquets',
  description:
    'Discover handmade crochet bouquets, flowers, gajras, keychains and personalized gifts crafted with love. Shop the Yarn & Bloom collection.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <WhyChooseUs />
        <TestimonialsSection />
        <InstagramSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
