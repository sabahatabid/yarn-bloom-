import Link from 'next/link';
import { Camera, Share2, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2d1f1f] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-script text-3xl text-[#f2c4ce] mb-1">Yarn &amp; Bloom</p>
              <p className="text-xs text-[#c4a898] tracking-[3px] uppercase font-light">
                Handmade with Love 🌷
              </p>
            </div>
            <p className="text-sm text-[#c4a898] leading-relaxed mb-6">
              Every piece is crafted by hand with premium cotton yarn and a whole lot of love.
              We believe handmade gifts carry a warmth that nothing store-bought ever can.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#f2c4ce] hover:bg-[#d4838e] hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Camera size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#f2c4ce] hover:bg-[#d4838e] hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Share2 size={16} />
              </a>
              <a
                href="mailto:hello@yarnandbloom.pk"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#f2c4ce] hover:bg-[#d4838e] hover:text-white transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-[#f2c4ce] font-semibold text-base mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Shop All', href: '/shop' },
                { label: 'Best Sellers', href: '/shop?filter=best-sellers' },
                { label: 'New Arrivals', href: '/shop?filter=new-arrivals' },
                { label: 'Customized Gifts', href: '/shop?category=customized-gifts' },
                { label: 'Gift Sets', href: '/shop?category=gift-sets' },
                { label: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#c4a898] hover:text-[#f2c4ce] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#d4838e] rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-display text-[#f2c4ce] font-semibold text-base mb-5">
              Customer Care
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Track My Order', href: '/account/orders' },
                { label: 'My Account', href: '/account' },
                { label: 'Returns & Exchange', href: '/returns' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#c4a898] hover:text-[#f2c4ce] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-[#d4838e] rounded-full group-hover:w-2 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-[#f2c4ce] font-semibold text-base mb-5">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#d4838e] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+923000000000" className="text-sm text-[#c4a898] hover:text-[#f2c4ce] transition-colors">+92 300 0000000</a>
                  <p className="text-xs text-[#8c7070]">WhatsApp available</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#d4838e] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:hello@yarnandbloom.pk"
                  className="text-sm text-[#c4a898] hover:text-[#f2c4ce] transition-colors"
                >
                  hello@yarnandbloom.pk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#d4838e] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#c4a898]">Lahore, Pakistan</p>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-[#c4a898] mb-1 font-medium">Delivery Time</p>
              <p className="text-sm text-white">3–7 business days</p>
              <p className="text-xs text-[#c4a898] mt-1">Custom orders: 5–10 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#8c7070] text-center sm:text-left">
            &copy; 2026 Yarn &amp; Bloom. All rights reserved. Made with{' '}
            <Heart size={10} className="inline text-[#d4838e] fill-current" /> in Pakistan.
          </p>
          <p className="text-xs text-[#8c7070]">
            Cash on Delivery &middot; Secure Packaging
          </p>
        </div>
      </div>
    </footer>
  );
}
