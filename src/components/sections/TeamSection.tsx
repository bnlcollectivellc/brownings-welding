'use client';

import { useRef, useEffect } from 'react';
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
  const initializedRef = useRef(false);
  const [headerRef, headerVisible] = useInView(0.2);
  const [carouselRef, carouselVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  // Seamless infinite scroll animation
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Wait for next frame to ensure layout is complete
    requestAnimationFrame(() => {
      if (!container || initializedRef.current) return;

      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
      initializedRef.current = true;

      let lastTime = performance.now();

      const animate = (currentTime: number) => {
        const deltaTime = Math.min(currentTime - lastTime, 50); // Cap delta to prevent jumps after tab switch
        lastTime = currentTime;

        if (!container) return;

        // Speed: pixels per millisecond
        // Desktop: 0.05, Mobile: 0.1
        const isMobile = window.innerWidth < 768;
        const speed = isMobile ? 0.1 : 0.05;

        container.scrollLeft += speed * deltaTime;

        // Recalculate on each frame for accuracy
        const setWidth = container.scrollWidth / 3;

        // Seamless loop: when we've scrolled past the middle set, jump back
        if (container.scrollLeft >= setWidth * 2) {
          container.scrollLeft -= setWidth;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    });

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section
      id="team"
      className="bg-browning-light py-16 md:py-24 overflow-hidden"
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
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-browning-light to-transparent z-10 pointer-events-none" />

        {/* Fade Right - at screen edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-browning-light to-transparent z-10 pointer-events-none" />

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
              className="flex-shrink-0 w-48 md:w-64 px-2 md:px-3 group cursor-pointer"
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
