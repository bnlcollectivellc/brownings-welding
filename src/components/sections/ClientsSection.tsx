'use client';

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const clients = [
  { name: 'Client One', logo: null },
  { name: 'Client Two', logo: null },
  { name: 'Client Three', logo: null },
  { name: 'Client Four', logo: null },
  { name: 'Client Five', logo: null },
  { name: 'Client Six', logo: null },
  { name: 'Client Seven', logo: null },
  { name: 'Client Eight', logo: null },
];

export default function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {clients.map((client, index) => (
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
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              canScrollLeft
                ? 'border-browning-red text-browning-red hover:bg-browning-red hover:text-white'
                : 'border-gray-300 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
              canScrollRight
                ? 'border-browning-red text-browning-red hover:bg-browning-red hover:text-white'
                : 'border-gray-300 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
