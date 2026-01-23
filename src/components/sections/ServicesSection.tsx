'use client';

import { useRef, useEffect } from 'react';
import { Flame, Scissors, Box, Cog, Search, Shield } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

const services = [
  {
    icon: Flame,
    title: 'Welding',
    description: 'Expert MIG, TIG, spot, and stick welding services for all metals and applications.',
  },
  {
    icon: Scissors,
    title: 'Laser Cutting',
    description: 'Precision laser cutting for intricate designs and clean edges on sheet metal.',
  },
  {
    icon: Box,
    title: 'Sheet Metal Fabrication',
    description: 'Bending, forming, shearing, and rolling for custom sheet metal work.',
  },
  {
    icon: Cog,
    title: 'CNC Machining',
    description: 'Precision mill and lathe capabilities for complex parts and prototypes.',
  },
  {
    icon: Search,
    title: 'Oilfield Tube/Pipe Inspection',
    description: 'Comprehensive tube inspection services ensuring quality and compliance.',
  },
  {
    icon: Shield,
    title: 'Finishing Services',
    description: 'Powder coating, galvanizing, and plating for durability and corrosion protection.',
  },
];

export default function ServicesSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [headerRef, headerVisible] = useInView(0.2);
  const [gridRef, gridVisible] = useInView(0.1);
  const [parallaxRef, parallaxOffset] = useParallax(0.3);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/services-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[50px]">
        {/* Section Header - Clickable */}
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-browning-red font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <Link href="/services" className="block group">
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4 group-hover:text-browning-red transition-colors">
              Our Fabrication Services
            </h2>
          </Link>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From concept to completion, we provide comprehensive metal fabrication solutions
            tailored to your exact specifications.
          </p>
        </div>

        {/* Services Grid - 2 cols on mobile, 2 on tablet, 3 on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
        >
          {services.map((service, index) => (
            <Link
              href="/services"
              key={service.title}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 md:p-8 hover:bg-white/20 hover:border-white/30 transition-all duration-500 group cursor-pointer ${
                gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: gridVisible ? `${index * 100}ms` : '0ms' }}
            >
              <div className="bg-browning-red/20 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:bg-browning-red/30 transition-colors">
                <service.icon className="text-browning-red" size={20} />
              </div>
              <h3 className="text-sm md:text-xl font-semibold text-white mb-1 md:mb-3 group-hover:text-browning-red transition-colors">{service.title}</h3>
              <p className="text-gray-300 text-xs md:text-base hidden md:block">{service.description}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
