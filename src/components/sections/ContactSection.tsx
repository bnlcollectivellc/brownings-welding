'use client';

import { useState } from 'react';
import { FileText, Wrench, PenTool, MessageSquare, ArrowRight } from 'lucide-react';
import CustomQuoteModal from '@/components/modals/CustomQuoteModal';

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

  const handleCardClick = (action: string) => {
    if (action === 'quote') {
      setIsQuoteModalOpen(true);
    }
    // TODO: Handle other actions in Phase 2
  };

  return (
    <>
      <section id="contact" className="bg-browning-red py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Ready to start your project?
            </h2>
            <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto">
              Choose how you&apos;d like to get started. Whether you have a complete design
              or just an idea, we&apos;re here to help bring it to life.
            </p>
          </div>

          {/* Entry Cards - 2 cols on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
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
    </>
  );
}
