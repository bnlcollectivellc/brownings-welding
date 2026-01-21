'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Server, Utensils, Tractor, Truck, Building2, Trees } from 'lucide-react';
import QuoteFormModal from '@/components/modals/QuoteFormModal';
import Navbar from '@/components/layout/Navbar';

const partners = [
  { name: 'Banded', logo: '/images/clients/banded-vertical.png', large: true },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
  { name: 'Snap-On Equipment', logo: '/images/clients/snapon-red.png' },
  { name: 'Tyson Foods', logo: '/images/clients/tyson-foods.png' },
  { name: 'Skippy', logo: '/images/clients/skippy.png' },
];

const sectors = [
  {
    icon: Server,
    title: 'Data Centers',
    description: 'Fabrication of steel and aluminum frames for air and liquid cooling assemblies, supporting the rapidly growing data center industry.',
    highlight: true,
  },
  {
    icon: Utensils,
    title: 'Food & Beverage',
    description: 'Stainless steel fabrication and sanitary equipment for food processing and packaging facilities.',
  },
  {
    icon: Tractor,
    title: 'Agriculture',
    description: 'Durable equipment repairs and custom fabrication for farming and agricultural operations.',
  },
  {
    icon: Truck,
    title: 'Heavy Equipment',
    description: 'Custom machine parts, fixtures, and fabricated products for heavy equipment manufacturing and related industries.',
  },
  {
    icon: Building2,
    title: 'Construction',
    description: 'Structural steel fabrication and pipe assemblies for commercial and industrial construction projects.',
  },
  {
    icon: Trees,
    title: 'Recreation',
    description: 'Custom fabrication for outdoor recreation, hunting, and sporting goods industries.',
  },
];

// Triple the items for seamless infinite scroll
const infinitePartners = [...partners, ...partners, ...partners];

export default function IndustriesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0.5);
  const isHoveredRef = useRef(false);

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
    <div className="min-h-screen bg-white">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-end justify-center overflow-hidden pb-12 md:pb-16 bg-browning-charcoal">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-browning-charcoal/50 to-browning-charcoal" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Industries We Serve
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Trusted by leading companies across multiple industries
          </p>
        </div>
      </section>

      {/* Industry Description */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-browning-gray leading-relaxed">
            From food processing giants to outdoor recreation brands, Browning&apos;s Welding serves a diverse range of industries. Our expertise in custom fabrication, precision welding, and specialized cooling assemblies makes us the trusted partner for companies that demand quality and reliability.
          </p>
        </div>
      </section>

      {/* Industry Sectors Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm border transition-all hover:shadow-md ${
                  sector.highlight
                    ? 'border-browning-red/30 bg-gradient-to-br from-white to-red-50'
                    : 'border-gray-100'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  sector.highlight ? 'bg-browning-red/20' : 'bg-browning-light'
                }`}>
                  <sector.icon className={sector.highlight ? 'text-browning-red' : 'text-browning-charcoal'} size={28} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-browning-charcoal">{sector.title}</h3>
                  {sector.highlight && (
                    <span className="text-xs font-semibold text-browning-red bg-browning-red/10 px-2 py-1 rounded-full">
                      Specialty
                    </span>
                  )}
                </div>

                <p className="text-browning-gray">{sector.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Logos Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal text-center mb-12">
            Our Trusted Partners
          </h2>

          {/* Carousel Container */}
          <div className="relative py-4">
            {/* Fade Left */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* Fade Right */}
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

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
              {infinitePartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center grayscale-0 md:grayscale md:hover:grayscale-0 opacity-100 md:opacity-70 md:hover:opacity-100 hover:scale-110 transition-all duration-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`w-auto object-contain ${partner.large ? 'h-20 md:h-28' : 'h-16 md:h-20'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-browning-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Partner With Us?
          </h2>
          <p className="text-gray-300 mb-8">
            Get a custom quote for your industry-specific fabrication needs.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-browning-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Get Your Quote
          </button>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-browning-red hover:text-red-700 font-semibold transition-colors"
          >
            &larr; Back to Home
          </Link>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
