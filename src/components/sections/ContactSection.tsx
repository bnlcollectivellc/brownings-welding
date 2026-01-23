'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import QuoteFormModal from '@/components/modals/QuoteFormModal';

export default function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [headerRef, headerVisible] = useInView(0.2);
  const [buttonRef, buttonVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  return (
    <>
      <section
        id="contact"
        className="bg-browning-red py-16 md:py-24"
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
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Ready to start your project?
            </h2>
            <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto">
              Whether you have a complete design or just an idea, we&apos;re here to help bring it to life.
            </p>
          </div>

          {/* Get Your Quote Button */}
          <div
            ref={buttonRef}
            className={`text-center transition-all duration-700 delay-200 ${
              buttonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="inline-flex items-center gap-3 bg-white text-browning-red px-10 py-4 rounded-full font-bold text-lg md:text-xl transition-all duration-300 hover:bg-browning-dark hover:text-white border-2 border-white hover:border-browning-dark shadow-lg hover:shadow-xl"
            >
              Get Your Quote
              <ArrowRight size={24} />
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-10 md:mt-16 text-center">
            <p className="text-white/90 mb-4 text-sm md:text-base">
              Prefer to talk directly? Give us a call or send an email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
              <a
                href="tel:+15016792184"
                className="text-white font-semibold text-base md:text-lg hover:text-white/80 transition-colors"
              >
                +1 (501) 679-2184
              </a>
              <span className="hidden sm:block text-white/40">|</span>
              <a
                href="mailto:info@browningswelding.com"
                className="text-white font-semibold text-base md:text-lg hover:text-white/80 transition-colors"
              >
                info@browningswelding.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
