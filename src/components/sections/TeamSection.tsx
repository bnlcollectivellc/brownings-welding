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

// Triple for seamless infinite scroll
const infiniteTeam = [...managementTeam, ...managementTeam, ...managementTeam];

export default function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [headerRef, headerVisible] = useInView(0.2);
  const [carouselRef, carouselVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

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
      const speed = isMobile ? 0.05 : 0.05;

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
      id="team"
      className="bg-white py-16 md:py-24 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Section Header - inside container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Carousel Container - full width for edge-to-edge fades */}
      <div
        ref={carouselRef}
        className={`relative transition-all duration-700 delay-200 ${
          carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Fade Left - at screen edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Fade Right - at screen edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Mobile clickable overlay - links entire carousel area */}
        <Link
          href="/team"
          className="absolute inset-0 z-20 md:hidden"
          aria-label="View the team"
        />

        {/* Scrollable Carousel Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden py-4"
        >
          {infiniteTeam.map((member, index) => (
            <Link
              href="/team"
              key={index}
              className="flex-shrink-0 w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw] 2xl:w-[15vw] px-2 md:px-3 lg:px-4 group cursor-pointer"
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
    </section>
  );
}
