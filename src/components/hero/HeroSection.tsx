'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Upload, FileText, Wrench, PenTool, MessageSquare, ArrowRight } from 'lucide-react';
import CustomQuoteModal from '@/components/modals/CustomQuoteModal';

const ACCEPTED_FILES = ['.ai', '.dxf', '.dwg', '.eps', '.stp', '.step'];

export default function HeroSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    console.log('Files dropped:', files);
    // TODO: Handle file upload - Phase 2
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    console.log('Files selected:', files);
    // TODO: Handle file upload - Phase 2
  }, []);

  const handleCardClick = (action: string) => {
    if (action === 'quote') {
      setIsQuoteModalOpen(true);
    }
    // TODO: Handle other actions in Phase 2
  };

  const entryCards = [
    {
      icon: FileText,
      title: 'Upload a CAD file',
      description: 'We accept .ai, .dxf, .dwg, .eps, .stp, and .step',
      action: 'upload',
    },
    {
      icon: Wrench,
      title: 'Use our Parts Builder',
      description: 'Customize one of our simple parts templates',
      action: 'builder',
    },
    {
      icon: PenTool,
      title: 'Try our Design Services',
      description: 'Send us a sketch or template and we\'ll create a file',
      action: 'design',
    },
    {
      icon: MessageSquare,
      title: 'Request a Custom Quote',
      description: 'For projects with unique needs or requirements',
      action: 'quote',
    },
  ];

  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-background"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full">

          {/* Desktop: Side by side layout - stretch to align tops and bottoms */}
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-12">

            {/* Left Column - Logo, tagline, CTA (flex column with space-between for top/bottom alignment) */}
            <div className="text-center lg:text-left lg:flex-1 mb-10 lg:mb-0 lg:flex lg:flex-col lg:justify-between">
              {/* Top content - Logo and tagline */}
              <div>
                {/* Logo */}
                <div className="mb-6">
                  <Image
                    src="/images/logo-hero.png"
                    alt="Browning's Welding & Fabrication"
                    width={500}
                    height={167}
                    className="mx-auto lg:mx-0 h-auto w-[260px] md:w-[380px] lg:w-[420px]"
                    priority
                  />
                </div>

                {/* Since 1972 Badge */}
                <p className="text-gray-300 text-sm mb-4">Since 1972</p>

                {/* Header Text */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                  Faith, Family, & Fabrication
                </h1>
                <p className="text-base md:text-lg text-gray-300 mb-6 lg:max-w-md lg:mb-0">
                  Commercial fabrication solutions for your business
                </p>
              </div>

              {/* Bottom content - CTA Button (aligned with bottom of entry cards) */}
              <div className="lg:mt-auto">
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-browning-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors text-lg"
                >
                  Get Your Quote!
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Right Column - Configurator */}
            <div className="lg:flex-1 lg:max-w-xl">
              {/* Divider - only on mobile */}
              <div className="flex items-center justify-center gap-4 mb-8 lg:hidden">
                <div className="h-px bg-white/30 w-24"></div>
                <span className="text-white/60 text-sm">or choose how to start</span>
                <div className="h-px bg-white/30 w-24"></div>
              </div>

              {/* Upload Zone */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 mb-6 border border-white/20">
                <div
                  className={`upload-zone border-2 border-dashed rounded-xl p-4 md:p-6 text-center cursor-pointer ${
                    isDragging
                      ? 'border-browning-red bg-browning-red/10 dragging'
                      : 'border-gray-400 hover:border-browning-red'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto mb-2 text-gray-300" size={36} />
                  <p className="text-base md:text-lg font-medium text-white mb-2">
                    Drop up to 10 files here to get started
                  </p>
                  <p className="text-gray-400 mb-2 text-sm">or</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept={ACCEPTED_FILES.join(',')}
                      onChange={handleFileSelect}
                    />
                    <span className="bg-browning-red hover:bg-red-700 text-white px-5 py-2 rounded-lg font-semibold cursor-pointer transition-colors inline-block text-sm">
                      BROWSE FILES
                    </span>
                  </label>
                  <p className="text-gray-400 mt-2 text-xs">
                    {ACCEPTED_FILES.join('  ')}
                  </p>
                </div>

                <p className="text-center text-gray-400 text-xs mt-3">
                  Your design is safe! Any design uploaded is secure, and you retain 100% of the intellectual property.
                </p>
              </div>

              {/* Entry Cards - 2 cols on mobile, 4 cols on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
                {entryCards.map((card) => (
                  <button
                    key={card.action}
                    onClick={() => handleCardClick(card.action)}
                    className="entry-card bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 text-left hover:bg-white/15 group"
                  >
                    <card.icon className="text-browning-red mb-2" size={22} />
                    <h3 className="text-white font-semibold text-xs md:text-sm mb-1">{card.title}</h3>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2 hidden md:block">{card.description}</p>
                    <div className="flex items-center text-browning-red font-medium text-xs">
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Disclaimer */}
              <p className="text-center text-gray-500 text-xs mt-4">
                Note: Pricing examples are general estimates. Upload your file for instant current pricing.
              </p>
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
