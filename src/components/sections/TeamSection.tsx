'use client';

import { useRef, useEffect, useCallback } from 'react';
import { User } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

// Management team only for homepage carousel
const managementTeam = [
  { name: 'Tommy Lynn Browning', role: 'President', image: '/images/team/tommy-lynn-browning.jpg' },
  { name: 'Tammy Browning', role: 'Controller', image: '/images/team/tammy-browning.jpg' },
  { name: 'Aidan Conley', role: 'Operations Manager', image: '/images/team/aidan-conley.jpg' },
  { name: 'Josh Cummins', role: 'Design Engineer / Estimator', image: '/images/team/josh-cummins.jpg' },
  { name: 'Scott Hance', role: 'Shop Floor Manager', image: '/images/team/scott-hance.jpg' },
];

// Triple the items for seamless infinite scroll
const infiniteTeam = [...managementTeam, ...managementTeam, ...managementTeam];

export default function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0.5);
  const isHoveredRef = useRef(false);
  const [headerRef, headerVisible] = useInView(0.2);
  const [carouselRef, carouselVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

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
      id="team"
      className="bg-browning-light py-16 md:py-24"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clickable */}
        <div
          ref={headerRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link href="/team" className="inline-block group">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-browning-charcoal group-hover:text-browning-red transition-colors">
              Meet the Family
            </h2>
          </Link>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className={`relative transition-all duration-700 delay-200 ${
            carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-browning-light to-transparent z-10 pointer-events-none" />

          {/* Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-browning-light to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-8 md:px-12 pt-4 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteTeam.map((member, index) => (
              <Link
                href="/team"
                key={index}
                className="flex-shrink-0 w-48 md:w-64 group cursor-pointer pt-2"
              >
                {/* Photo */}
                <div className="aspect-[4/5] bg-gray-200 rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4 group-hover:ring-4 group-hover:ring-browning-red/30 transition-all">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="text-gray-300" size={60} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-browning-charcoal font-semibold text-base md:text-lg group-hover:text-browning-red transition-colors">
                  {member.name}
                </h3>
                <p className="text-browning-gray text-xs md:text-sm">{member.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
