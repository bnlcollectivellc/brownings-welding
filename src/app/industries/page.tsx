'use client';

import { useState } from 'react';
import Link from 'next/link';
import QuoteFormModal from '@/components/modals/QuoteFormModal';

const industries = [
  { name: 'Banded', logo: '/images/clients/banded.png' },
  { name: 'Westrock Coffee', logo: '/images/clients/westrock-coffee.png' },
  { name: 'Snap-On Equipment', logo: '/images/clients/snapon.png' },
  { name: 'Tyson Foods', logo: '/images/clients/tyson-foods.png' },
  { name: 'Skippy', logo: '/images/clients/skippy.png' },
];

export default function IndustriesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
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
            {/* Placeholder for industries copy */}
            From food processing giants to outdoor recreation brands, Browning&apos;s Welding serves a diverse range of industries. Our expertise in custom fabrication, precision welding, and specialized cooling assemblies makes us the trusted partner for companies that demand quality and reliability.
          </p>
        </div>
      </section>

      {/* Industry Logos Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal text-center mb-12">
            Our Trusted Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={industry.logo}
                  alt={industry.name}
                  className="max-h-16 md:max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Sectors - Placeholder */}
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
