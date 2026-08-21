'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-hero" />

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#f2c4ce]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-[#c8dbc5]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fbe8ec]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating petals decoration */}
      <div className="absolute top-16 left-1/4 text-3xl animate-float opacity-60 pointer-events-none select-none">
        🌸
      </div>
      <div
        className="absolute top-1/3 right-1/4 text-2xl animate-float opacity-50 pointer-events-none select-none"
        style={{ animationDelay: '1s' }}
      >
        🌷
      </div>
      <div
        className="absolute bottom-1/4 left-1/3 text-xl animate-float opacity-40 pointer-events-none select-none"
        style={{ animationDelay: '2s' }}
      >
        🌺
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/70 border border-[#f2c4ce] text-[#d4838e] text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Sparkles size={12} />
              Handcrafted with premium cotton yarn
            </div>

            {/* Heading */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4 animate-fade-in-up">
              <span className="text-[#2d1f1f]">Yarn &</span>
              <br />
              <span className="text-gradient">Bloom</span>
            </h1>

            <p
              className="font-script text-2xl text-[#8b6355] mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Handmade pieces made to be remembered.
            </p>

            <p
              className="text-base text-[#5a4040] leading-relaxed max-w-md mx-auto lg:mx-0 mb-8 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Every bouquet, every flower, every tiny keychain is crafted by hand with love.
              Because some gifts deserve to last forever.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/shop" className="btn-primary text-base px-8 py-4 rounded-full">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop?filter=best-sellers"
                className="btn-outline text-base px-8 py-4 rounded-full"
              >
                Explore Collection
              </Link>
            </div>

            {/* Trust indicators */}
            <div
              className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              {[
                { icon: '🌷', label: '100% Handmade' },
                { icon: '💝', label: 'Made with Love' },
                { icon: '📦', label: 'Gift Packaging' },
                { icon: '⭐', label: '4.9★ Rated' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm text-[#5a4040] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product showcase */}
          <div className="relative lg:h-[560px] flex items-center justify-center">
            {/* Main card */}
            <div className="relative w-72 sm:w-80 lg:w-96 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#f0e6e0]">
                <div className="relative h-80 bg-gradient-to-br from-[#fbe8ec] to-[#faf6f1] flex items-center justify-center">
                  {/* Placeholder illustration */}
                  <div className="text-center px-8">
                    <div className="text-8xl mb-4 animate-float">🌸</div>
                    <p className="font-script text-2xl text-[#d4838e]">Crochet Rose Bouquet</p>
                    <p className="text-sm text-[#8c7070] mt-1">12 handcrafted roses</p>
                  </div>
                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-[#d4838e] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                    Rs. 2,500
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#d4838e] font-semibold uppercase tracking-wide mb-0.5">
                        Best Seller
                      </p>
                      <p className="font-display font-semibold text-[#2d1f1f]">
                        Crochet Rose Bouquet
                      </p>
                    </div>
                    <div className="flex -space-x-1">
                      {['🌹', '🌸', '💐'].map((e, i) => (
                        <span key={i} className="text-lg">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating mini cards */}
              <div className="absolute -top-6 -right-8 bg-white rounded-2xl shadow-lg p-3 border border-[#f0e6e0] animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💝</span>
                  <div>
                    <p className="text-xs font-semibold text-[#2d1f1f]">Customizable</p>
                    <p className="text-[10px] text-[#8c7070]">Choose your colors</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-lg p-3 border border-[#f0e6e0] animate-float" style={{ animationDelay: '1.2s' }}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="text-xs font-semibold text-[#2d1f1f]">4.9/5 Rating</p>
                    <p className="text-[10px] text-[#8c7070]">47 happy customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-9 border-2 border-[#d4838e]/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#d4838e]/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
