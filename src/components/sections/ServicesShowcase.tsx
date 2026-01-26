'use client';

import { useState } from 'react';
import { Download, X, CheckCircle, Loader2, Thermometer, Search, Flame, Cpu, Zap, Building2, Wrench } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Image from 'next/image';

// Service data with all 7 services - Air & Liquid Cooling first, Oilfield Pipe/Tube Inspection second
const services = [
  {
    id: 'cooling',
    title: 'Air & Liquid Cooling Assemblies',
    description: 'Specialized fabrication of air and liquid cooling assemblies for data centers and industrial applications. Our work includes painted and powder coated steel frames, square tubing, angle iron, channel, and pipe welding.',
    features: ['Data Center Cooling', 'Heat Exchangers', 'Coolant Distribution', 'Custom Manifolds', 'Leak Testing', 'Production Assembly'],
    icon: Thermometer,
    image: '/images/materials/aluminum.jpg',
  },
  {
    id: 'pipe',
    title: 'Oilfield Pipe/Tube Inspection',
    description: 'Comprehensive oilfield tube and pipe inspection services ensuring structural integrity and compliance. Our processes include electromagnetic interference testing, descaling, rethreading, and thorough quality documentation.',
    features: ['EMI Inspection', 'Descale', 'Rethreading', 'Visual Inspection', 'Quality Assurance', 'Documentation'],
    icon: Search,
    image: '/images/materials/carbon-steel.jpg',
  },
  {
    id: 'welding',
    title: 'MIG/TIG Welding',
    description: 'Expert MIG, TIG, spot, and stick welding services for all metals and applications. Our certified welders bring decades of experience to every project, ensuring strong, precise welds that meet the highest industry standards.',
    features: ['MIG Welding', 'TIG Welding', 'Spot Welding', 'Stick Welding', 'Aluminum Welding', 'Stainless Steel'],
    icon: Flame,
    image: '/images/materials/stainless-steel.png',
  },
  {
    id: 'cnc',
    title: 'CNC Machining',
    description: 'Precision mill and lathe capabilities for complex parts and prototypes. Our CNC department delivers tight-tolerance components with excellent surface finishes using state-of-the-art Haas equipment.',
    features: ['CNC Milling', 'CNC Turning', 'Prototyping', 'Production Runs', '0.0005" Tolerances', 'Various Materials'],
    icon: Cpu,
    image: '/images/materials/aluminum.jpg',
  },
  {
    id: 'laser',
    title: 'Laser Cutting',
    description: 'Precision laser cutting for intricate designs and clean edges on sheet metal. Our state-of-the-art CO2 laser technology delivers exceptional accuracy and speed for both prototype and production runs.',
    features: ['CO2 Laser', 'Fiber Engraving', '0.0005" Tolerances', 'Up to 945 IPM', 'Complex Geometries', 'Fast Turnaround'],
    icon: Zap,
    image: '/images/materials/carbon-steel.jpg',
  },
  {
    id: 'structural',
    title: 'Structural Fabrication',
    description: 'Comprehensive bending, forming, shearing, and rolling capabilities for custom structural and sheet metal work. From simple brackets to complex enclosures and frames, we handle projects of all sizes.',
    features: ['Press Brake', 'Rolling', 'Shearing', 'Forming', 'Tube Bending', 'Assembly'],
    icon: Building2,
    image: '/images/materials/stainless-steel.png',
  },
  {
    id: 'custom',
    title: 'Custom Parts & Finishing',
    description: 'Complete custom part fabrication with finishing solutions including powder coating, galvanizing, and plating. We deliver fully finished parts ready for use, coordinating with trusted partners for specialized finishes.',
    features: ['Powder Coating', 'Galvanizing', 'Anodizing', 'Plating', 'Painting', 'Surface Prep'],
    icon: Wrench,
    image: '/images/materials/aluminum.jpg',
  },
];

// Email capture modal for linecard download
function LinecardModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/linecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/docs/brownings-linecard.pdf';
        link.download = 'Brownings-Capabilities-Linecard.pdf';
        link.click();
      }, 1000);
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-bold text-browning-charcoal mb-2">Download Starting!</h3>
            <p className="text-browning-gray">Your linecard download should begin automatically.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-browning-charcoal mb-2">Download Capabilities Linecard</h3>
            <p className="text-browning-gray mb-6">
              Enter your email to download our complete capabilities and capacity matrix.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-browning-charcoal mb-1">
                  Email Address <span className="text-browning-red">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-browning-red/20 focus:border-browning-red transition-colors"
                />
              </div>

              {status === 'error' && (
                <p className="text-browning-red text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-browning-red hover:bg-red-700 text-white py-3 rounded-full font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download Linecard
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

interface ServicesShowcaseProps {
  showLinecard?: boolean;
}

export default function ServicesShowcase({ showLinecard = false }: ServicesShowcaseProps) {
  const [activeService, setActiveService] = useState(0);
  const [isLinecardModalOpen, setIsLinecardModalOpen] = useState(false);
  const [headerRef, headerVisible] = useInView(0.2);
  const [contentRef, contentVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.1);

  const currentService = services[activeService];
  const IconComponent = currentService.icon;

  return (
    <section
      id="services"
      className="bg-browning-light py-24"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-browning-red font-semibold text-sm uppercase tracking-wider">
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-browning-charcoal mt-4">
            Full-Service Fabrication
          </h2>
          <p className="text-browning-gray text-lg mt-4 max-w-2xl">
            From concept to completion, we provide comprehensive metal fabrication services
            backed by 50+ years of manufacturing excellence.
          </p>
        </div>

        {/* Main Content Grid */}
        <div
          ref={contentRef}
          className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-700 delay-200 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left - Service Selector List */}
          <div className="space-y-3">
            {services.map((service, index) => {
              const ServiceIcon = service.icon;
              const isActive = index === activeService;

              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 group flex items-center gap-4 ${
                    isActive
                      ? 'bg-white border-browning-red/30 shadow-lg'
                      : 'bg-white/50 border-gray-200 hover:bg-white hover:border-browning-red/30 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    isActive ? 'bg-browning-red/10' : 'bg-gray-100 group-hover:bg-browning-red/10'
                  }`}>
                    <ServiceIcon
                      className={`transition-colors ${
                        isActive ? 'text-browning-red' : 'text-browning-gray group-hover:text-browning-red'
                      }`}
                      size={24}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold transition-colors ${
                      isActive ? 'text-browning-red' : 'text-browning-charcoal group-hover:text-browning-red'
                    }`}>
                      {service.title}
                    </h3>
                    <p className="text-browning-gray text-sm line-clamp-1">
                      {service.features.slice(0, 3).join(' • ')}
                    </p>
                  </div>
                </button>
              );
            })}

            {/* Linecard Download */}
            {showLinecard && (
              <div className="pt-4">
                <button
                  onClick={() => setIsLinecardModalOpen(true)}
                  className="inline-flex items-center gap-2 text-browning-red hover:text-red-700 font-semibold transition-colors"
                >
                  <Download size={18} />
                  Download Capabilities Linecard
                </button>
              </div>
            )}
          </div>

          {/* Right - Service Detail Card */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-browning-red/30 hover:shadow-lg transition-all">
            {/* Image */}
            <div className="relative h-48 md:h-64 overflow-hidden">
              <Image
                src={currentService.image}
                alt={currentService.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 inline-flex items-center gap-3">
                  <div className="bg-browning-red/10 w-10 h-10 rounded-lg flex items-center justify-center">
                    <IconComponent className="text-browning-red" size={20} />
                  </div>
                  <h3 className="font-bold text-browning-charcoal text-lg">
                    {currentService.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-browning-gray leading-relaxed mb-6">
                {currentService.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2">
                {currentService.features.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium text-browning-charcoal bg-browning-light border border-gray-200 px-3 py-1.5 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Linecard Email Modal */}
      <LinecardModal
        isOpen={isLinecardModalOpen}
        onClose={() => setIsLinecardModalOpen(false)}
      />
    </section>
  );
}
