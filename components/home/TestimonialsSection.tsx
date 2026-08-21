'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha R.',
    location: 'Lahore',
    rating: 5,
    review:
      'I ordered a customized bouquet for my best friend\'s wedding and it was absolutely stunning! She cried happy tears. The quality is incredible — you can feel the love in every stitch. Will definitely order again!',
    product: 'Customized Crochet Bouquet',
    emoji: '💐',
  },
  {
    id: 2,
    name: 'Sana M.',
    location: 'Karachi',
    rating: 5,
    review:
      'The crochet gajra was perfect for my mehndi night! It looked just like real jasmine flowers but lasted so much longer. Everyone kept asking where I got it from. Absolutely obsessed with Yarn & Bloom!',
    product: 'Crochet Gajra',
    emoji: '🌺',
  },
  {
    id: 3,
    name: 'Fatima K.',
    location: 'Islamabad',
    rating: 5,
    review:
      'Ordered the mini gift set for my niece\'s birthday. The packaging was so beautiful, it looked like it came from a luxury boutique! My niece loved everything inside. Super fast delivery too!',
    product: 'Mini Gift Set',
    emoji: '🎁',
  },
  {
    id: 4,
    name: 'Zara N.',
    location: 'Lahore',
    rating: 5,
    review:
      'I bought the rose bouquet as a gift for my mom and she absolutely loved it! It\'s been 3 months and it still looks perfect. Real flowers would have wilted in a week. These are truly forever flowers.',
    product: 'Crochet Rose Bouquet',
    emoji: '🌹',
  },
  {
    id: 5,
    name: 'Hira A.',
    location: 'Faisalabad',
    rating: 4,
    review:
      'The heart keychains were so adorable! I ordered 5 for my friends and everyone loves them. Great quality, very well packed. The seller was also very responsive to my questions.',
    product: 'Crochet Heart Keychain',
    emoji: '💕',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  }
  function next() {
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  }

  const featured = testimonials[current];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#fbe8ec]/40 to-[#faf6f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-widest mb-3">
            Customer Love
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2d1f1f] mb-4">
            What They Say
          </h2>
          <p className="text-[#5a4040] text-base max-w-md mx-auto">
            Words from the hearts of customers who've gifted and received our handmade creations.
          </p>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Featured review */}
          <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#f0e6e0]">
            <Quote
              size={48}
              className="text-[#f2c4ce] mb-6 fill-current opacity-60"
            />

            <StarRating rating={featured.rating} size={20} className="mb-5" />

            <p className="text-[#2d1f1f] text-lg leading-relaxed font-medium mb-8 italic">
              &ldquo;{featured.review}&rdquo;
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#fbe8ec] rounded-full flex items-center justify-center text-2xl">
                  {featured.emoji}
                </div>
                <div>
                  <p className="font-semibold text-[#2d1f1f]">{featured.name}</p>
                  <p className="text-sm text-[#8c7070]">{featured.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#d4838e] font-semibold">Purchased:</p>
                <p className="text-xs text-[#8c7070]">{featured.product}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border-2 border-[#e8d5cc] flex items-center justify-center text-[#5a4040] hover:border-[#d4838e] hover:text-[#d4838e] transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft size={18} />
              </button>
              {/* Dots */}
              <div className="flex gap-2 flex-1 justify-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? 'bg-[#d4838e] w-6 h-2'
                        : 'bg-[#e8d5cc] w-2 h-2 hover:bg-[#f2c4ce]'
                    }`}
                    aria-label={`Review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border-2 border-[#e8d5cc] flex items-center justify-center text-[#5a4040] hover:border-[#d4838e] hover:text-[#d4838e] transition-all"
                aria-label="Next review"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mini reviews grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.filter((_, i) => i !== current).slice(0, 4).map((t) => (
              <button
                key={t.id}
                onClick={() => setCurrent(testimonials.indexOf(t))}
                className="text-left p-5 bg-white rounded-2xl border border-[#f0e6e0] hover:border-[#f2c4ce] hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{t.emoji}</span>
                  <div>
                    <p className="font-semibold text-[#2d1f1f] text-sm">{t.name}</p>
                    <StarRating rating={t.rating} size={11} />
                  </div>
                </div>
                <p className="text-xs text-[#5a4040] line-clamp-3 leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-md border border-[#f0e6e0]">
            <StarRating rating={4.9} size={20} />
            <span className="font-display text-2xl font-bold text-[#d4838e]">4.9/5</span>
            <span className="text-sm text-[#8c7070]">from 150+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
