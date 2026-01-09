'use client';

import { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';

const clients = [
  { name: 'Banded', logo: '/images/clients/banded.png' },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
];

// Triple the items for seamless infinite scroll
const infiniteClients = [...clients, ...clients, ...clients];

export default function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  // Initialize scroll position to middle set
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []);

  // Handle seamless looping
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !scrollRef.current) return;

    const container = scrollRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    // If scrolled to the end (third set), jump to middle set
    if (container.scrollLeft >= singleSetWidth * 2) {
      isScrollingRef.current = true;
      container.scrollLeft = container.scrollLeft - singleSetWidth;
      setTimeout(() => { isScrollingRef.current = false; }, 50);
    }
    // If scrolled to the beginning (first set), jump to middle set
    else if (container.scrollLeft <= 0) {
      isScrollingRef.current = true;
      container.scrollLeft = container.scrollLeft + singleSetWidth;
      setTimeout(() => { isScrollingRef.current = false; }, 50);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      className="bg-white py-16"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal">
            Who We&apos;ve Created For
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteClients.map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 bg-browning-light rounded-xl border border-gray-200 flex items-center justify-center hover:border-browning-red/30 transition-colors"
              >
                {client.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-12 max-w-[80%] object-contain"
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

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border-2 border-browning-red text-browning-red hover:bg-browning-red hover:text-white flex items-center justify-center transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border-2 border-browning-red text-browning-red hover:bg-browning-red hover:text-white flex items-center justify-center transition-all"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
