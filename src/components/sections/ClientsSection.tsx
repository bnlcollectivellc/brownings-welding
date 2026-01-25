'use client';

import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

const clients = [
  { name: 'Banded', logo: '/images/clients/banded-vertical.png', large: true },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
  { name: 'Snap-On Equipment', logo: '/images/clients/snapon-red.png' },
  { name: 'Tyson Foods', logo: '/images/clients/tyson-foods.png' },
  { name: 'Skippy', logo: '/images/clients/skippy.png' },
];

export default function ClientsSection() {
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  return (
    <section
      className="bg-white py-16 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Section Header - inside container */}
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-10">
          <Link href="/industries" className="inline-block group">
            <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal group-hover:text-browning-red transition-colors">
              Our Trusted Partners
            </h2>
          </Link>
        </div>
      </div>

      {/* Carousel Container - full width for edge-to-edge fades */}
      <div className="relative py-4">
        {/* Fade Left - at screen edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Fade Right - at screen edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Mobile clickable overlay - links entire carousel area */}
        <Link
          href="/industries"
          className="absolute inset-0 z-20 md:hidden"
          aria-label="View all industries"
        />

        {/* CSS Animated Carousel Track - 2 sets for seamless infinite loop */}
        <div className="flex animate-carousel-mobile md:animate-carousel hover:pause-animation">
          {/* Render 2 sets - animation scrolls exactly 50% then loops seamlessly */}
          {[...clients, ...clients].map((client, index) => (
            <Link
              href="/industries"
              key={index}
              className="flex-shrink-0 px-6 md:px-10 flex items-center justify-center grayscale-0 md:grayscale md:hover:grayscale-0 opacity-100 md:opacity-70 md:hover:opacity-100 hover:scale-110 transition-all duration-300"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`w-auto object-contain ${client.large ? 'h-20 md:h-28' : 'h-16 md:h-20'}`}
                />
              ) : (
                <span className="text-browning-gray font-medium text-sm text-center px-2">
                  {client.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
