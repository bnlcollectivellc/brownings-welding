'use client';

import { useState } from 'react';
import { Flame, Scissors, Box, Cog, Search, Shield, Wind } from 'lucide-react';
import Link from 'next/link';
import QuoteFormModal from '@/components/modals/QuoteFormModal';
import Navbar from '@/components/layout/Navbar';

const services = [
  {
    icon: Wind,
    title: 'Air & Liquid Cooling Assemblies',
    description: 'Specialized fabrication of air and liquid cooling assemblies for data centers and industrial applications. Our work includes painted and powder coated steel frames, square tubing, angle iron, channel, and pipe welding, as well as mild steel and stainless pipe fitting and welding.',
    features: ['Data Center Cooling', 'Heat Exchangers', 'Coolant Distribution', 'Custom Manifolds', 'Leak Testing', 'Production Assembly'],
    highlight: true,
  },
  {
    icon: Flame,
    title: 'Welding',
    description: 'Expert MIG, TIG, spot, and stick welding services for all metals and applications. Our certified welders bring decades of experience to every project, ensuring strong, precise welds that meet the highest industry standards.',
    features: ['MIG Welding', 'TIG Welding', 'Spot Welding', 'Stick Welding', 'Aluminum Welding', 'Stainless Steel Welding'],
  },
  {
    icon: Cog,
    title: 'CNC Machining',
    description: 'Precision mill and lathe capabilities for complex parts and prototypes. Our CNC department delivers tight-tolerance components with excellent surface finishes.',
    features: ['CNC Milling', 'CNC Turning', 'Prototyping', 'Production Machining', 'Tight Tolerances', 'Various Materials'],
  },
  {
    icon: Scissors,
    title: 'Laser Cutting',
    description: 'Precision laser cutting for intricate designs and clean edges on sheet metal. Our state-of-the-art CO2 laser technology delivers exceptional accuracy and speed for both prototype and production runs.',
    features: ['CO2 Laser Technology', 'Fiber Engraving Technology', 'Tight Tolerances', 'Complex Geometries', 'Fast Turnaround', 'Various Materials'],
  },
  {
    icon: Box,
    title: 'Sheet Metal Fabrication',
    description: 'Comprehensive bending, forming, shearing, and rolling capabilities for custom sheet metal work. From simple brackets to complex enclosures, we handle projects of all sizes.',
    features: ['CNC Press Brake', 'Shearing', 'Rolling', 'Forming', 'Punching', 'Assembly'],
  },
  {
    icon: Search,
    title: 'Oilfield Tube/Pipe Inspection',
    description: 'Comprehensive tube and pipe inspection services ensuring structural integrity and compliance. Our inspection processes verify quality for critical oilfield applications.',
    features: ['Electromagnetic Interference (EMI)', 'Descale', 'Rethreading', 'Visual Inspection', 'Quality Assurance', 'Documentation'],
  },
  {
    icon: Shield,
    title: 'Finishing Services',
    description: 'Complete finishing solutions including powder coating, galvanizing, and plating. We coordinate with trusted partners to deliver fully finished parts ready for use.',
    features: ['Powder Coating', 'Galvanizing', 'Anodizing', 'Plating', 'Painting', 'Surface Preparation'],
  },
];

export default function ServicesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar alwaysVisible />

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end justify-center overflow-hidden pb-12 md:pb-16">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/services-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Fabrication Services
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto whitespace-nowrap">
            From concept to completion, comprehensive metal fabrication solutions
          </p>
        </div>
      </section>

      {/* Services Description */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-browning-gray leading-relaxed">
            Browning&apos;s Welding &amp; Fabrication offers a complete range of metal fabrication services under one roof. With over 50 years of experience and state-of-the-art equipment, we deliver precision, quality, and reliability on every project, from one-off prototypes to high-volume production runs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm border transition-all hover:shadow-md ${
                  service.highlight
                    ? 'border-browning-red/30 bg-gradient-to-br from-white to-red-50'
                    : 'border-gray-100'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  service.highlight ? 'bg-browning-red/20' : 'bg-browning-light'
                }`}>
                  <service.icon className={service.highlight ? 'text-browning-red' : 'text-browning-charcoal'} size={28} />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-browning-charcoal">{service.title}</h3>
                  {service.highlight && (
                    <span className="text-xs font-semibold text-browning-red bg-browning-red/10 px-2 py-1 rounded-full">
                      Specialty
                    </span>
                  )}
                </div>

                <p className="text-browning-gray mb-6">{service.description}</p>

                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="text-xs font-medium text-browning-charcoal bg-gray-100 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-browning-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 mb-8">
            Get a custom quote for your fabrication needs. Our team is ready to help bring your vision to life.
          </p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="bg-browning-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Get Your Quote
          </button>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16">
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-browning-red hover:text-red-700 font-semibold transition-colors"
          >
            &larr; Back to Home
          </Link>
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
