'use client';

import { User } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

interface TeamSectionProps {
  onJoinClick?: () => void;
}

// Management team only for homepage carousel
const managementTeam = [
  { name: 'Tommy Lynn Browning', role: 'President', image: '/images/team/tommy-lynn-browning.jpg' },
  { name: 'Tammy Browning', role: 'Controller', image: '/images/team/tammy-browning.jpg' },
  { name: 'Aidan Conley', role: 'Operations Manager', image: '/images/team/aidan-conley.jpg' },
  { name: 'Josh Cummins', role: 'Design Engineer / Estimator', image: '/images/team/josh-cummins.jpg' },
  { name: 'Scott Hance', role: 'Shop Floor Manager', image: '/images/team/scott-hance.jpg' },
];

export default function TeamSection({ onJoinClick }: TeamSectionProps) {
  const [headerRef, headerVisible] = useInView(0.2);
  const [carouselRef, carouselVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  return (
    <section
      id="team"
      className="bg-white py-16 md:py-24 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Section Header */}
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

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className={`relative transition-all duration-700 delay-200 ${
          carouselVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Clickable overlay for the entire carousel */}
        <Link
          href="/team"
          className="absolute inset-0 z-20"
          aria-label="View the team"
        />

        {/* Marquee wrapper - two identical tracks side by side */}
        <div className="flex py-4">
          {/* First track */}
          <div className="flex animate-marquee-team shrink-0">
            {managementTeam.map((member, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[200px] md:w-[240px] lg:w-[280px] px-3 md:px-4"
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
          {/* Second track (duplicate for seamless loop) */}
          <div className="flex animate-marquee-team shrink-0">
            {managementTeam.map((member, index) => (
              <div
                key={`dup-${index}`}
                className="flex-shrink-0 w-[200px] md:w-[240px] lg:w-[280px] px-3 md:px-4"
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
      </div>

      {/* Join the Family CTA */}
      {onJoinClick && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 text-center">
          <button
            onClick={onJoinClick}
            className="inline-flex items-center gap-2 bg-browning-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Join the Family
          </button>
        </div>
      )}
    </section>
  );
}
