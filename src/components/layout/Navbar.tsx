'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'opacity-100 bg-white/10 backdrop-blur-md border-b border-white/20'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo - Icon Only */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo-icon.png"
              alt="Browning's Welding"
              width={50}
              height={50}
              className="h-9 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className={`font-medium transition-colors ${
                isScrolled
                  ? 'text-browning-charcoal hover:text-browning-red'
                  : 'text-white hover:text-browning-red'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`font-medium transition-colors ${
                isScrolled
                  ? 'text-browning-charcoal hover:text-browning-red'
                  : 'text-white hover:text-browning-red'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className={`font-medium transition-colors ${
                isScrolled
                  ? 'text-browning-charcoal hover:text-browning-red'
                  : 'text-white hover:text-browning-red'
              }`}
            >
              Team
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 ${isScrolled ? 'text-browning-charcoal' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('services')}
                className={`block w-full text-left hover:text-browning-red transition-colors font-medium py-2 ${
                  isScrolled ? 'text-browning-charcoal' : 'text-white'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`block w-full text-left hover:text-browning-red transition-colors font-medium py-2 ${
                  isScrolled ? 'text-browning-charcoal' : 'text-white'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className={`block w-full text-left hover:text-browning-red transition-colors font-medium py-2 ${
                  isScrolled ? 'text-browning-charcoal' : 'text-white'
                }`}
              >
                Team
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
