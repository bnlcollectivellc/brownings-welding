'use client';

import { useState } from 'react';
import { FileText, Wrench, PenTool, MessageSquare, ArrowRight } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import CustomQuoteModal from '@/components/modals/CustomQuoteModal';
import CADUploadModal from '@/components/modals/CADUploadModal';
import DesignServicesModal from '@/components/modals/DesignServicesModal';
import { useConfigurator } from '@/store/useConfigurator';

const entryCards = [
  {
    icon: FileText,
    title: 'Upload CAD',
    description: 'Upload your CAD file for instant pricing',
    action: 'upload',
  },
  {
    icon: Wrench,
    title: 'Parts Builder',
    description: 'Customize our templates',
    action: 'builder',
  },
  {
    icon: PenTool,
    title: 'Design Services',
    description: 'We\'ll create it for you',
    action: 'design',
  },
  {
    icon: MessageSquare,
    title: 'Custom Quote',
    description: 'For unique projects',
    action: 'quote',
  },
];

export default function ContactSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const { openConfigurator } = useConfigurator();
  const [headerRef, headerVisible] = useInView(0.2);
  const [cardsRef, cardsVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  const handleCardClick = (action: string) => {
    if (action === 'quote') {
      setIsQuoteModalOpen(true);
    } else if (action === 'upload') {
      setIsUploadModalOpen(true);
    } else if (action === 'design') {
      setIsDesignModalOpen(true);
    } else if (action === 'builder') {
      openConfigurator('builder');
    }
  };

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
              Choose how you&apos;d like to get started. Whether you have a complete design
              or just an idea, we&apos;re here to help bring it to life.
            </p>
          </div>

          {/* Entry Cards - 2 cols on mobile */}
          <div
            ref={cardsRef}
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 transition-all duration-700 delay-200 ${
              cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {entryCards.map((card) => (
              <button
                key={card.action}
                onClick={() => handleCardClick(card.action)}
                className="entry-card bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 md:p-6 text-left hover:bg-white/20 group"
              >
                <card.icon className="text-white mb-2 md:mb-4" size={24} />
                <h3 className="text-white font-semibold text-sm md:text-lg mb-1 md:mb-2">{card.title}</h3>
                <p className="text-white/80 text-xs md:text-sm mb-2 md:mb-4 hidden md:block">{card.description}</p>
                <div className="flex items-center text-white font-medium text-sm">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
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
                (501) 679-2184
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

      {/* Custom Quote Modal */}
      <CustomQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* CAD Upload Modal */}
      <CADUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      {/* Design Services Modal */}
      <DesignServicesModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />
    </>
  );
}
