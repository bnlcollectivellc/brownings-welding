'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

const clients = [
  { name: 'Banded', logo: '/images/clients/banded-vertical.png', large: true },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
  { name: 'Snap-On Equipment', logo: '/images/clients/snapon-red.png' },
  { name: 'Tyson Foods', logo: '/images/clients/tyson-foods.png' },
  { name: 'Skippy', logo: '/images/clients/skippy.png' },
];

// Triple the items for seamless infinite scroll
const infiniteClients = [...clients, ...clients, ...clients];

export default function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0.5);
  const isHoveredRef = useRef(false);
  const [, setForceUpdate] = useState(0); // For re-render on hover state change if needed
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  // Initialize scroll position ONCE on mount
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }
  }, []); // Empty dependency - only runs once

  // Animation loop - separate effect, no dependencies that would cause re-init
  useEffect(() => {
    const autoScroll = () => {
      // Smoothly interpolate speed toward target
      const targetSpeed = isHoveredRef.current ? 0 : 0.5;
      speedRef.current += (targetSpeed - speedRef.current) * 0.05;

      // Only scroll if speed is meaningful
      if (scrollRef.current && !isScrollingRef.current && Math.abs(speedRef.current) > 0.01) {
        scrollRef.current.scrollLeft += speedRef.current;
      }
      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency - animation runs continuously

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

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Only pause if touching directly on the carousel content (not page scroll)
    if (e.target !== scrollRef.current) {
      isHoveredRef.current = true;
    }
  }, []);

  const handleTouchMove = useCallback(() => {
    // Pause during active drag
    isHoveredRef.current = true;
  }, []);

  const handleTouchEnd = useCallback(() => {
    setTimeout(() => {
      isHoveredRef.current = false;
    }, 1500);
  }, []);

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
        {/* Section Header - Clickable */}
        <div className="text-center mb-10">
          <Link href="/industries" className="inline-block group">
            <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal group-hover:text-browning-red transition-colors">
              Our Trusted Partners
            </h2>
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative py-4">
          {/* Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

          {/* Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-12 md:gap-20 items-center overflow-x-auto scrollbar-hide px-10 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteClients.map((client, index) => (
              <Link
                href="/industries"
                key={index}
                className="flex-shrink-0 flex items-center justify-center grayscale-0 md:grayscale md:hover:grayscale-0 opacity-100 md:opacity-70 md:hover:opacity-100 hover:scale-110 transition-all duration-300"
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
      </div>
    </section>
  );
}
