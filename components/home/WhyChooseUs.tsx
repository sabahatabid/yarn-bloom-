const features = [
  {
    icon: '🌸',
    title: 'Truly Handmade',
    description:
      'Every single stitch is done by hand. No machines, no shortcuts — just genuine craftsmanship and care.',
  },
  {
    icon: '🎨',
    title: 'Fully Customizable',
    description:
      'Choose your colors, add a message, personalize your gift. We make it exactly the way you want it.',
  },
  {
    icon: '💝',
    title: 'Made with Love',
    description:
      'We pour our heart into every piece. When you gift Yarn & Bloom, you gift a feeling.',
  },
  {
    icon: '♻️',
    title: 'Lasts Forever',
    description:
      'Unlike real flowers that wilt in days, our crochet flowers stay beautiful for a lifetime.',
  },
  {
    icon: '📦',
    title: 'Beautiful Packaging',
    description:
      'Every order is wrapped in our signature gift packaging — ready to delight from the moment it arrives.',
  },
  {
    icon: '🚚',
    title: 'Safe Delivery',
    description:
      'We carefully package each item to ensure it arrives in perfect condition, anywhere in Pakistan.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#fbe8ec] to-[#faf6f1] rounded-3xl p-10 text-center">
              <div className="text-8xl mb-6 animate-float inline-block">🌷</div>
              <blockquote className="font-display text-2xl md:text-3xl text-[#2d1f1f] font-semibold italic leading-snug">
                "Made by hand,<br />made with heart."
              </blockquote>
              <p className="mt-4 text-[#8c7070] text-sm">— Yarn & Bloom</p>

              {/* Floating decorations */}
              <div className="absolute top-6 right-6 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>
                🌸
              </div>
              <div className="absolute bottom-6 left-6 text-2xl animate-float" style={{ animationDelay: '1.5s' }}>
                💐
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { num: '500+', label: 'Happy Customers' },
                { num: '50+', label: 'Unique Designs' },
                { num: '4.9★', label: 'Average Rating' },
              ].map(({ num, label }) => (
                <div key={label} className="text-center p-4 bg-[#faf6f1] rounded-2xl border border-[#f0e6e0]">
                  <p className="font-display text-2xl font-bold text-[#d4838e]">{num}</p>
                  <p className="text-xs text-[#8c7070] mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Features */}
          <div>
            <p className="text-[#d4838e] text-sm font-semibold uppercase tracking-widest mb-3">
              Why Us
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#2d1f1f] mb-4">
              Why Choose
              <br />
              Yarn & Bloom?
            </h2>
            <p className="text-[#5a4040] text-base mb-10">
              We&apos;re not just a shop — we&apos;re a labor of love. Here&apos;s what makes us different.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {features.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 rounded-2xl bg-[#faf6f1] border border-[#f0e6e0] hover:border-[#f2c4ce] hover:bg-[#fdf8f5] transition-all duration-300 group"
                >
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#2d1f1f] text-sm mb-1">{title}</h3>
                    <p className="text-xs text-[#8c7070] leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
