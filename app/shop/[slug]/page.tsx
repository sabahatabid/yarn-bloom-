import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductDetailsClient from '@/components/product/ProductDetails';
import { getProductBySlug, getRelatedProducts } from '@/lib/supabase/queries';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  return {
    title: product ? `${product.name} — Yarn & Bloom` : 'Product Not Found',
    description: product?.short_description ?? product?.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold text-[#2d1f1f] mb-2">Product not found</h2>
            <p className="text-[#8c7070]">We couldn't find that product. Try searching or go back to the shop.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = await getRelatedProducts(product.id, product.category_id);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f1]">
      <Navbar />
      <main className="flex-1">
        <ProductDetailsClient product={product} relatedProducts={related} />
      </main>
      <Footer />
    </div>
  );
}
