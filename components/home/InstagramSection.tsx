import { Camera } from 'lucide-react';

const instaPosts = [
  {
    id: 1,
    emoji: '🌸',
    bg: 'from-[#fbe8ec] to-[#f5ede3]',
    caption: 'Crochet Rose Bouquet',
  },
  {
    id: 2,
    emoji: '💐',
    bg: 'from-[#c8dbc5] to-[#faf6f1]',
    caption: 'Pastel Collection',
  },
  {
    id: 3,
    emoji: '🎀',
    bg: 'from-[#f5ede3] to-[#fbe8ec]',
    caption: 'Gift Set',
  },
  {
    id: 4,
    emoji: '🌺',
    bg: 'from-[#fbe8ec] to-[#c8dbc5]',
    caption: 'Crochet Gajra',
  },
  {
    id: 5,
    emoji: '🔑',
    bg: 'from-[#faf6f1] to-[#fbe8ec]',
    caption: 'Heart Keychains',
  },
  {
    id: 6,
    emoji: '🌷',
    bg: 'from-[#c8dbc5] to-[#faf6f1]',
    caption: 'Custom Bouquet',
  },
];

export default function InstagramSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[#d4838e] mb-3">
            <Camera size={20} />
            <p className="text-sm font-semibold uppercase tracking-widest">
              @yarnandbloom.pk
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#2d1f1f]">
            Follow Along on Instagram
          </h2>
          <p className="text-[#8c7070] text-sm mt-2">
            Behind-the-scenes, new drops, and happy customers — join us!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br ${post.bg} flex items-center justify-center hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-md`}
              aria-label={post.caption}
            >
              <span className="text-4xl sm:text-5xl">{post.emoji}</span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#d4838e]/0 group-hover:bg-[#d4838e]/20 transition-all duration-300 flex items-center justify-center">
                <Camera
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4838e] to-[#b5616e] text-white px-6 py-3 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-rose-200/50 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Camera size={16} />
            Follow @yarnandbloom.pk
          </a>
        </div>
      </div>
    </section>
  );
}
