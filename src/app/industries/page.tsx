'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import QuoteFormModal from '@/components/modals/QuoteFormModal';
import Navbar from '@/components/layout/Navbar';

const industries = [
  { name: 'Banded', logo: '/images/clients/banded.png', large: true },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
  { name: 'Snap-On Equipment', logo: '/images/clients/snapon.png' },
  { name: 'Tyson Foods', logo: '/images/clients/tyson-foods.png' },
  { name: 'Skippy', logo: '/images/clients/skippy.png' },
];

// Triple the items for seamless infinite scroll
const infiniteIndustries = [...industries, ...industries, ...industries];

export default function IndustriesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0.5);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize scroll position to middle set and start auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }

    // Auto-scroll animation with variable speed
    const autoScroll = () => {
      if (scrollRef.current && !isScrollingRef.current) {
        // Gradually adjust speed based on hover state
        const targetSpeed = isHovered ? 0.1 : 0.5;
        speedRef.current += (targetSpeed - speedRef.current) * 0.05;
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
  }, [isHovered]);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-browning-charcoal">
        <div className="absolute inset-0 bg-gradient-to-br from-browning-charcoal to-gray-900" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Industries We Serve
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted by leading companies across multiple industries
          </p>
        </div>
      </section>

      {/* Industry Description Placeholder */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-browning-gray leading-relaxed">
            From food processing giants to outdoor recreation brands, Browning&apos;s Welding serves a diverse range of industries. Our expertise in custom fabrication, precision welding, and specialized cooling assemblies makes us the trusted partner for companies that demand quality and reliability.
          </p>
        </div>
      </section>

      {/* Industry Logos Carousel */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal text-center mb-12">
            Our Trusted Partners
          </h2>

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
              className="flex gap-12 md:gap-20 items-center overflow-x-auto scrollbar-hide px-10 py-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {infiniteIndustries.map((industry, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={industry.logo}
                    alt={industry.name}
                    className={`w-auto object-contain ${industry.large ? 'h-20 md:h-28' : 'h-16 md:h-20'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Sectors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal text-center mb-12">
            Sectors We Support
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Data Centers', description: 'Precision cooling assemblies and custom infrastructure components for the rapidly growing data center industry.' },
              { title: 'Food & Beverage', description: 'Stainless steel fabrication and sanitary equipment for food processing and packaging facilities.' },
              { title: 'Agriculture', description: 'Durable equipment repairs and custom fabrication for farming and agricultural operations.' },
              { title: 'Automotive', description: 'Precision tooling, fixtures, and equipment for automotive manufacturing and service.' },
              { title: 'Construction', description: 'Structural steel fabrication and custom metalwork for commercial and industrial construction.' },
              { title: 'Recreation', description: 'Custom fabrication for outdoor recreation, hunting, and sporting goods industries.' },
            ].map((sector, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-browning-charcoal mb-2">{sector.title}</h3>
                <p className="text-browning-gray text-sm">{sector.description}</p>
              </div>
            ))}
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
