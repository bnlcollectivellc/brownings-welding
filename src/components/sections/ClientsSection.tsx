'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

const clients = [
  { name: 'Banded', logo: '/images/clients/banded-vertical.png', large: true },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
  { name: 'Snap-On Equipment', logo: '/images/clients/snapon-red.png' },
  { name: 'Tyson Foods', logo: '/images/clients/tyson-foods.png' },
  { name: 'Skippy', logo: '/images/clients/skippy.png' },
];

// Triple for seamless infinite scroll
const infiniteClients = [...clients, ...clients, ...clients];

export default function ClientsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  const startAnimation = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Initialize scroll position to middle set
    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft < singleSetWidth * 0.5 || container.scrollLeft > singleSetWidth * 2.5) {
      container.scrollLeft = singleSetWidth;
    }

    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const container = scrollRef.current;
      if (!container) return;

      const deltaTime = Math.min(currentTime - lastTimeRef.current, 50);
      lastTimeRef.current = currentTime;

      // Speed: pixels per millisecond
      const isMobile = window.innerWidth < 768;
      const speed = isMobile ? 0.1 : 0.05;

      container.scrollLeft += speed * deltaTime;

      const setWidth = container.scrollWidth / 3;

      // Seamless loop
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation on mount and handle visibility changes
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      startAnimation();
    }, 100);

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        lastTimeRef.current = performance.now();
        startAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(initTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startAnimation]);

  return (
    <section
      className="bg-white py-14 overflow-hidden"
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
      <div className="relative overflow-hidden">
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

        {/* Scrollable Carousel Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
        >
          {infiniteClients.map((client, index) => (
            <Link
              href="/industries"
              key={index}
              className="flex-shrink-0 w-[40vw] md:w-[25vw] lg:w-[20vw] xl:w-[16vw] px-4 md:px-8 flex items-center justify-center grayscale-0 md:grayscale md:hover:grayscale-0 opacity-100 md:opacity-70 md:hover:opacity-100 hover:scale-110 transition-all duration-300"
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`w-auto max-w-full object-contain ${client.large ? 'h-20 md:h-24 lg:h-28' : 'h-14 md:h-18 lg:h-22'}`}
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
