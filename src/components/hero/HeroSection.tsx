'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import QuoteFormModal from '@/components/modals/QuoteFormModal';

export default function HeroSection() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Staggered fade-in states
  const [showLogo, setShowLogo] = useState(false);
  const [showFaith, setShowFaith] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [heroDarkness, setHeroDarkness] = useState(0.2);

  useEffect(() => {
    // Logo fades in after 0.15s
    const logoTimer = setTimeout(() => setShowLogo(true), 150);
    // Faith section fades in 1s after logo (1.5s total)
    const faithTimer = setTimeout(() => setShowFaith(true), 1500);
    // Button fades in 0.5s after faith (2s total)
    const buttonTimer = setTimeout(() => setShowButton(true), 2000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(faithTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  // Adjust darkness based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 300;
      const darkness = Math.max(0, 0.2 - (scrollY / threshold) * 0.2);
      setHeroDarkness(darkness);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <p className="text-sm md:text-base text-gray-300 mb-8 max-w-md mx-auto">
                Commercial fabrication solutions for your business
              </p>
            </div>

            {/* Prominent Get Your Quote Button */}
            <div className={`transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="quote-btn-pulse inline-flex items-center gap-3 bg-browning-red text-white px-12 py-5 rounded-full font-bold text-xl md:text-2xl transition-all duration-300 hover:bg-white hover:text-browning-red border-2 border-browning-red hover:shadow-lg"
              >
                Get Your Quote
                <ArrowRight size={28} className="transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-gray-400 text-sm mt-6 max-w-sm mx-auto">
                Upload your drawings and get a custom quote for your project
              </p>
            </div>
          </div>

          {/* Future CruLink: Forge iframe will be placed here */}
          {/* <div className="max-w-4xl mx-auto">
            <iframe src="https://crulink.forge/configurator" ... />
          </div> */}
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
