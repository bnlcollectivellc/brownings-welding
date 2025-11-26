'use client';

import { useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';

const team = [
  {
    name: 'Team Member 1',
    role: 'Founder / CEO',
    image: '/images/team/team-1.jpg',
  },
  {
    name: 'Team Member 2',
    role: 'Operations Manager',
    image: '/images/team/team-2.jpg',
  },
  {
    name: 'Team Member 3',
    role: 'Lead Fabricator',
    image: '/images/team/team-3.jpg',
  },
  {
    name: 'Team Member 4',
    role: 'Quality Control',
    image: '/images/team/team-4.jpg',
  },
  {
    name: 'Team Member 5',
    role: 'Sales Director',
    image: '/images/team/team-5.jpg',
  },
  {
    name: 'Team Member 7',
    role: 'Welder',
    image: '/images/team/team-7.jpg',
  },
  {
    name: 'Team Member 6',
    role: 'Production Manager',
    image: '/images/team/team-6.jpg',
  },
  {
    name: 'Team Member 8',
    role: 'Fabricator',
    image: '/images/team/team-8.jpg',
  },
];

// Triple the items for seamless infinite scroll
const infiniteTeam = [...team, ...team, ...team];

export default function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const [headerRef, headerVisible] = useInView(0.2);
  const [carouselRef, carouselVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

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
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="team"
      className="bg-browning-light py-16 md:py-24"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-browning-charcoal">
            Meet the Family
          </h2>
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
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-8 md:px-12 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteTeam.map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 md:w-64"
              >
                {/* Photo */}
                <div className="aspect-[4/5] bg-gray-200 rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="text-gray-300" size={60} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-browning-charcoal font-semibold text-base md:text-lg">
                  {member.name}
                </h3>
                <p className="text-browning-gray text-xs md:text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-3 mt-6 md:mt-8">
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
