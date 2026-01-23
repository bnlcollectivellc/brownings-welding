'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import QuoteFormModal from '@/components/modals/QuoteFormModal';

interface NavbarProps {
  alwaysVisible?: boolean;
}

export default function Navbar({ alwaysVisible = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isVisible = alwaysVisible || isScrolled || isHovered;

  return (
    <>
      {/* Hover detection zone for desktop - shows navbar when hovering near top */}
      {!alwaysVisible && !isScrolled && (
        <div
          className={`hidden md:block fixed top-0 left-0 right-0 h-24 z-50 ${
            isHovered ? 'pointer-events-none' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
        />
      )}

      {/* Mobile top bar - always visible, centered logo and hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo-icon.png"
            alt="Browning's Welding"
            width={40}
            height={40}
            className={`h-8 w-auto transition-all duration-300 ${
              isVisible || isMobileMenuOpen ? 'opacity-100' : 'opacity-90'
            }`}
            priority
          />
        </Link>

        {/* Hamburger */}
        <button
          className={`p-2 rounded-full transition-all duration-300 ${
            isVisible || isMobileMenuOpen
              ? 'text-browning-charcoal bg-white/80 backdrop-blur-md'
              : 'text-white bg-black/20 backdrop-blur-sm'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-500 ${
          isVisible
            ? 'opacity-100 bg-white/10 backdrop-blur-md border-b border-white/20 z-50'
            : 'opacity-0 pointer-events-none md:opacity-0 z-40'
        }`}
        onMouseEnter={() => !alwaysVisible && !isScrolled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-20">
            {/* Logo - Icon Only (desktop) */}
            <Link href="/" className="flex-shrink-0 hidden md:block">
              <Image
                src="/images/logo-icon.png"
                alt="Browning's Welding"
                width={50}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/about"
                className="font-medium transition-colors text-browning-red hover:text-red-700"
              >
                About
              </Link>
              <Link
                href="/industries"
                className="font-medium transition-colors text-browning-red hover:text-red-700"
              >
                Industries
              </Link>
              <Link
                href="/services"
                className="font-medium transition-colors text-browning-red hover:text-red-700"
              >
                Services
              </Link>
              <Link
                href="/team"
                className="font-medium transition-colors text-browning-red hover:text-red-700"
              >
                Family
              </Link>
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="bg-browning-red hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-semibold transition-colors"
              >
                Get Your Quote
              </button>
            </div>
          </div>
      </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-20">
          <div className="space-y-2 text-center px-4">
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center text-browning-charcoal hover:text-browning-red transition-colors font-medium py-3 text-lg"
            >
              About
            </Link>
            <Link
              href="/industries"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center text-browning-charcoal hover:text-browning-red transition-colors font-medium py-3 text-lg"
            >
              Industries
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center text-browning-charcoal hover:text-browning-red transition-colors font-medium py-3 text-lg"
            >
              Services
            </Link>
            <Link
              href="/team"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center text-browning-charcoal hover:text-browning-red transition-colors font-medium py-3 text-lg"
            >
              Family
            </Link>
            <button
              onClick={() => {
                setIsQuoteModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="inline-block bg-browning-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors mt-4"
            >
              Get Your Quote
            </button>
          </div>
        </div>
      )}

      {/* Quote Form Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  );
}
