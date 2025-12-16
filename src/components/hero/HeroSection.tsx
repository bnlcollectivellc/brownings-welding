'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Upload, Wrench, PenTool, MessageSquare, ArrowRight } from 'lucide-react';
import CustomQuoteModal from '@/components/modals/CustomQuoteModal';
import DesignServicesModal from '@/components/modals/DesignServicesModal';
import CADUploadModal from '@/components/modals/CADUploadModal';
import { useConfigurator, EntryPath } from '@/store/useConfigurator';

const ACCEPTED_FILES = ['.ai', '.dxf', '.dwg', '.eps', '.stp', '.step'];

export default function HeroSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isCADUploadOpen, setIsCADUploadOpen] = useState(false);
  const [initialFiles, setInitialFiles] = useState<File[]>([]);
  const { openConfigurator } = useConfigurator();

  // Staggered fade-in states
  const [showLogo, setShowLogo] = useState(false);
  const [showFaith, setShowFaith] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);
  const [heroDarkness, setHeroDarkness] = useState(0.2); // Extra 20% darkness

  useEffect(() => {
    // Logo fades in after 0.15s
    const logoTimer = setTimeout(() => setShowLogo(true), 150);
    // Faith section fades in 1s after logo (1.5s total)
    const faithTimer = setTimeout(() => setShowFaith(true), 1500);
    // Configurator fades in 1s after faith (2.5s total)
    const configTimer = setTimeout(() => setShowConfigurator(true), 2500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(faithTimer);
      clearTimeout(configTimer);
    };
  }, []);

  // Adjust darkness based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 300; // When configurator becomes visible
      // Fade from 0.2 (dark) to 0 (normal) as we scroll
      const darkness = Math.max(0, 0.2 - (scrollY / threshold) * 0.2);
      setHeroDarkness(darkness);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const files = Array.from(e.dataTransfer.files).slice(0, 10);
    if (files.length > 0) {
      setInitialFiles(files);
      setIsCADUploadOpen(true);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).slice(0, 10) : [];
    if (files.length > 0) {
      setInitialFiles(files);
      setIsCADUploadOpen(true);
    }
  }, []);

  const handleCardClick = (action: string) => {
    if (action === 'quote') {
      setIsQuoteModalOpen(true);
    } else if (action === 'design') {
      setIsDesignModalOpen(true);
    } else if (action === 'builder') {
      openConfigurator(action as EntryPath);
    }
  };

  const entryCards = [
    {
      icon: Wrench,
      title: 'Sheet Metal Parts Builder',
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
          preload="auto"
          className="video-background"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Dynamic Darkness Overlay */}
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: heroDarkness }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full mt-[5px]">

          {/* Centered Hero Content */}
          <div className="text-center mb-12 md:mb-16 pt-12 md:pt-16">
            {/* Logo */}
            <div className={`mb-20 md:mb-24 transition-opacity duration-1000 ${showLogo ? 'opacity-100' : 'opacity-0'}`}>
              <Image
                src="/images/logo-hero.png"
                alt="Browning's Welding & Fabrication"
                width={720}
                height={240}
                className="mx-auto h-auto w-[403px] md:w-[576px] lg:w-[720px]"
                priority
              />
            </div>

            {/* Faith Section */}
            <div className={`transition-opacity duration-1000 ${showFaith ? 'opacity-100' : 'opacity-0'}`}>
              {/* Since 1972 Badge */}
              <p className="text-gray-400 text-xs mb-2">Since 1972</p>

              {/* Header Text */}
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                Faith, Family, & Fabrication
              </h1>
              <p className="text-sm md:text-base text-gray-300 mb-4 max-w-md mx-auto">
                Commercial fabrication solutions for your business
              </p>

              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 bg-browning-red hover:bg-red-700 text-white px-7 py-3 rounded-full font-semibold transition-colors text-lg"
              >
                Get Your Quote!
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Configurator Section */}
          <div className={`max-w-2xl mx-auto transition-opacity duration-1000 ${showConfigurator ? 'opacity-100' : 'opacity-0'}`}>
            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px bg-white/30 flex-1 max-w-16"></div>
              <span className="text-white/60 text-sm whitespace-nowrap">or choose how to start</span>
              <div className="h-px bg-white/30 flex-1 max-w-16"></div>
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
                  <Upload className="mx-auto mb-3 text-gray-300" size={36} />
                  <p className="text-base md:text-lg font-medium text-white mb-2">
                    Drop up to 10 files here to get started
                  </p>
                  <p className="text-gray-400 mb-3">or</p>
                  <label className="inline-block">
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      accept={ACCEPTED_FILES.join(',')}
                      onChange={handleFileSelect}
                    />
                    <span className="bg-browning-red hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer transition-colors inline-block">
                      BROWSE FILES
                    </span>
                  </label>
                  <p className="text-gray-400 mt-3 text-xs md:text-sm">
                    {ACCEPTED_FILES.join('  ')}
                  </p>
                </div>

                <p className="text-center text-gray-400 text-xs mt-3">
                  Your design is safe! Any design uploaded is secure, and you retain 100% of the intellectual property.
                </p>
              </div>

              {/* Entry Cards - 3 cols */}
              <div className="grid grid-cols-3 gap-2 md:gap-3">
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
      </section>

      {/* Custom Quote Modal */}
      <CustomQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Design Services Modal */}
      <DesignServicesModal
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
      />

      {/* CAD Upload Modal */}
      <CADUploadModal
        isOpen={isCADUploadOpen}
        onClose={() => {
          setIsCADUploadOpen(false);
          setInitialFiles([]);
        }}
        initialFiles={initialFiles}
      />
    </>
  );
}
