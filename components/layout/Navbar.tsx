'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/store/cartStore';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  {
    label: 'Collections',
    href: '/collections',
    children: [
      { label: 'Crochet Bouquets', href: '/shop?category=crochet-bouquets' },
      { label: 'Crochet Flowers', href: '/shop?category=crochet-flowers' },
      { label: 'Gajras', href: '/shop?category=gajras' },
      { label: 'Keychains', href: '/shop?category=keychains' },
      { label: 'Baby Gifts', href: '/shop?category=baby-gifts' },
      { label: 'Customized Gifts', href: '/shop?category=customized-gifts' },
      { label: 'Gift Sets', href: '/shop?category=gift-sets' },
    ],
  },
  { label: 'Best Sellers', href: '/shop?filter=best-sellers' },
  { label: 'New Arrivals', href: '/shop?filter=new-arrivals' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cart count from Zustand (only after hydration)
  const itemCount = useCartStore((s) => s.itemCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartCount = mounted ? itemCount() : 0;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#f0e6e0]'
            : 'bg-white/80 backdrop-blur-sm'
        )}
      >
        {/* Top banner */}
        <div className="bg-[#d4838e] text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
          🌷 Free delivery on orders above Rs. 3,000 — Handmade with love in Pakistan
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center group flex-shrink-0">
              <span className="font-script text-2xl text-[#d4838e] leading-none group-hover:text-[#b5616e] transition-colors">
                Yarn &amp; Bloom
              </span>
              <span className="text-[9px] text-[#8c7070] tracking-[3px] uppercase font-light">
                Handmade with Love
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setCollectionsOpen((v) => !v)}
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium transition-colors',
                        collectionsOpen
                          ? 'text-[#d4838e]'
                          : 'text-[#5a4040] hover:text-[#d4838e]'
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          collectionsOpen && 'rotate-180'
                        )}
                      />
                    </button>

                    {collectionsOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-[#f0e6e0] py-2 animate-scale-in z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-2.5 text-sm text-[#5a4040] hover:text-[#d4838e] hover:bg-[#fdf8f5] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors relative group',
                      pathname === link.href || pathname.startsWith(link.href + '?')
                        ? 'text-[#d4838e]'
                        : 'text-[#5a4040] hover:text-[#d4838e]'
                    )}
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#d4838e] group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>
                )
              )}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <button
                onClick={() => setSearchOpen((v) => !v)}
                className="p-2.5 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] hover:text-[#d4838e] transition-all"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="p-2.5 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] hover:text-[#d4838e] transition-all"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              {/* Cart with live count */}
              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] hover:text-[#d4838e] transition-all"
                aria-label={`Cart — ${cartCount} items`}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#d4838e] text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] px-1 leading-none animate-scale-in">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex p-2.5 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] hover:text-[#d4838e] transition-all"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-[#f0e6e0] bg-white px-4 py-3 animate-fade-in">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <div className="flex-1 relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a898]"
                />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for crochet bouquets, keychains, gifts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-brand pl-10 text-sm"
                />
              </div>
              <button type="submit" className="btn-primary text-sm py-2.5 px-6">
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2.5 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl mobile-menu-enter flex flex-col overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0e6e0]">
              <div>
                <p className="font-script text-2xl text-[#d4838e]">Yarn &amp; Bloom</p>
                <p className="text-[9px] text-[#8c7070] tracking-[2px] uppercase">Handmade with Love</p>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl text-[#5a4040] hover:bg-[#fbe8ec] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 py-4 px-4">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <div>
                      <button
                        onClick={() => setCollectionsOpen((v) => !v)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-[#2d1f1f] font-medium hover:bg-[#fdf8f5] hover:text-[#d4838e] transition-colors"
                      >
                        {link.label}
                        <ChevronDown
                          size={16}
                          className={cn('transition-transform duration-200', collectionsOpen && 'rotate-180')}
                        />
                      </button>
                      {collectionsOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-4 py-2.5 text-sm text-[#5a4040] hover:text-[#d4838e] hover:bg-[#fdf8f5] rounded-xl transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        'block px-4 py-3 rounded-xl font-medium transition-colors',
                        pathname === link.href
                          ? 'text-[#d4838e] bg-[#fbe8ec]'
                          : 'text-[#2d1f1f] hover:bg-[#fdf8f5] hover:text-[#d4838e]'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="border-t border-[#f0e6e0] p-4 space-y-2">
              <Link
                href="/account"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#2d1f1f] hover:bg-[#fdf8f5] hover:text-[#d4838e] transition-colors font-medium"
              >
                <User size={18} />
                My Account
              </Link>
              <Link
                href="/account/wishlist"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#2d1f1f] hover:bg-[#fdf8f5] hover:text-[#d4838e] transition-colors font-medium"
              >
                <Heart size={18} />
                Wishlist
              </Link>
              <Link
                href="/cart"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-[#2d1f1f] hover:bg-[#fdf8f5] hover:text-[#d4838e] transition-colors font-medium"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag size={18} />
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-[#d4838e] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-[104px]" />
    </>
  );
}
