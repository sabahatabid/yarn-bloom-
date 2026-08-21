import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Yarn & Bloom — Handmade Crochet Gifts',
    template: '%s | Yarn & Bloom',
  },
  description:
    'Handmade crochet bouquets, flowers, gajras, keychains and personalized gifts crafted with love. Premium handmade gifts for every occasion.',
  keywords: [
    'crochet',
    'handmade',
    'crochet bouquet',
    'crochet flowers',
    'handmade gifts',
    'crochet gajra',
    'Pakistan',
    'yarn and bloom',
  ],
  openGraph: {
    title: 'Yarn & Bloom — Handmade Crochet Gifts',
    description:
      'Handmade crochet bouquets, flowers, gajras, keychains and personalized gifts crafted with love.',
    type: 'website',
    locale: 'en_PK',
    siteName: 'Yarn & Bloom',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'toast-brand',
            duration: 3000,
            style: {
              background: '#fff',
              color: '#2d1f1f',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(212,131,142,0.15)',
              border: '1px solid #f0e6e0',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  );
}
