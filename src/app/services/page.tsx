'use client';

import { useState } from 'react';
import QuoteFormModal from '@/components/modals/QuoteFormModal';
import Navbar from '@/components/layout/Navbar';
import ServicesShowcase from '@/components/sections/ServicesShowcase';

export default function ServicesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="relative h-[55vh] md:h-[65vh] flex items-end justify-center overflow-hidden pb-12 md:pb-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/services-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Fabrication Services
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            From concept to completion, comprehensive metal fabrication solutions
          </p>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-browning-gray leading-relaxed">
            Browning&apos;s Welding &amp; Fabrication offers a complete range of metal fabrication services under one roof. With over 50 years of experience and state-of-the-art equipment, we deliver precision, quality, and reliability on every project—from one-off prototypes to high-volume production runs.
          </p>
        </div>
      </section>

      {/* Services Showcase */}
      <ServicesShowcase showLinecard={true} />

      {/* CTA Section */}
      <section className="py-16 bg-browning-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 mb-8">
            Contact us for your fabrication needs. Our team is ready to help bring your vision to life.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-browning-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Contact Us
          </button>
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
