'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <section className="py-16 md:py-24 bg-[#2d1f1f] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4838e]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8faa8b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="text-5xl mb-6 animate-float inline-block">🌷</div>

        <p className="text-[#f2c4ce] text-sm font-semibold uppercase tracking-widest mb-3">
          Stay in the Loop
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          Join Our Little World
        </h2>

        <p className="text-[#c4a898] text-base mb-10 max-w-md mx-auto leading-relaxed">
          Be the first to know about new designs, seasonal collections, and exclusive offers.
          No spam, just love — and the occasional flower update. 🌸
        </p>

        {submitted ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl px-8 py-6 inline-block">
            <p className="text-3xl mb-3">💌</p>
            <p className="text-white font-semibold text-lg mb-1">You&apos;re in!</p>
            <p className="text-[#c4a898] text-sm">
              Welcome to the Yarn & Bloom family. We&apos;ll be in touch soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c4a898]"
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-[#8c7070] text-sm focus:outline-none focus:ring-2 focus:ring-[#f2c4ce] focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 py-3.5 flex-shrink-0 rounded-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
                  </svg>
                  Joining...
                </span>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-5 text-xs text-[#8c7070]">
          By subscribing you agree to our privacy policy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
