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

      {/* Services Showcase - Full Page */}
      <div className="pt-14 md:pt-20">
        <ServicesShowcase showLinecard={true} />
      </div>

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
