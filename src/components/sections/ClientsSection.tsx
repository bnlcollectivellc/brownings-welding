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

// Double for seamless CSS animation loop
const infiniteClients = [...clients, ...clients];

export default function ClientsSection() {
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  return (
    <section
      className="bg-white pt-7 md:pt-14 pb-14 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Section Header */}
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

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Clickable overlay for the entire carousel */}
        <Link
          href="/industries"
          className="absolute inset-0 z-20"
          aria-label="View all industries"
        />

        {/* Animated Track - CSS animation only */}
        <div className="flex animate-scroll-clients">
          {infiniteClients.map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[40vw] md:w-[25vw] lg:w-[20vw] xl:w-[16vw] px-4 md:px-8 flex items-center justify-center"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`w-auto max-w-full object-contain grayscale-[50%] ${client.large ? 'h-20 md:h-24 lg:h-28' : 'h-14 md:h-18 lg:h-22'}`}
                />
              ) : (
                <span className="text-browning-gray font-medium text-sm text-center px-2">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
