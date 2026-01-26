'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, X, CheckCircle, Loader2, Thermometer, Search, Flame, Cpu, Zap, Building2, Wrench } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';

// Service data with all 7 services - Air & Liquid Cooling first, Oilfield Pipe/Tube Inspection second
const services = [
  {
    id: 'cooling',
    title: 'Air & Liquid Cooling Assemblies',
    description: 'Specialized fabrication of air and liquid cooling assemblies for data centers and industrial applications. Our work includes painted and powder coated steel frames, square tubing, angle iron, channel, and pipe welding.',
    features: ['Data Center Cooling', 'Heat Exchangers', 'Coolant Distribution', 'Custom Manifolds', 'Leak Testing', 'Production Assembly'],
    icon: Thermometer,
  },
  {
    id: 'pipe',
    title: 'Oilfield Pipe/Tube Inspection',
    description: 'Comprehensive oilfield tube and pipe inspection services ensuring structural integrity and compliance. Our processes include electromagnetic interference testing, descaling, rethreading, and thorough quality documentation.',
    features: ['EMI Inspection', 'Descale', 'Rethreading', 'Visual Inspection', 'Quality Assurance', 'Documentation'],
    icon: Search,
  },
  {
    id: 'welding',
    title: 'MIG/TIG Welding',
    description: 'Expert MIG, TIG, spot, and stick welding services for all metals and applications. Our certified welders bring decades of experience to every project, ensuring strong, precise welds that meet the highest industry standards.',
    features: ['MIG Welding', 'TIG Welding', 'Spot Welding', 'Stick Welding', 'Aluminum Welding', 'Stainless Steel'],
    icon: Flame,
  },
  {
    id: 'cnc',
    title: 'CNC Machining',
    description: 'Precision mill and lathe capabilities for complex parts and prototypes. Our CNC department delivers tight-tolerance components with excellent surface finishes using state-of-the-art Haas equipment.',
    features: ['CNC Milling', 'CNC Turning', 'Prototyping', 'Production Runs', '0.0005" Tolerances', 'Various Materials'],
    icon: Cpu,
  },
  {
    id: 'laser',
    title: 'Laser Cutting',
    description: 'Precision laser cutting for intricate designs and clean edges on sheet metal. Our state-of-the-art CO2 laser technology delivers exceptional accuracy and speed for both prototype and production runs.',
    features: ['CO2 Laser', 'Fiber Engraving', '0.0005" Tolerances', 'Up to 945 IPM', 'Complex Geometries', 'Fast Turnaround'],
    icon: Zap,
  },
  {
    id: 'structural',
    title: 'Structural Fabrication',
    description: 'Comprehensive bending, forming, shearing, and rolling capabilities for custom structural and sheet metal work. From simple brackets to complex enclosures and frames, we handle projects of all sizes.',
    features: ['Press Brake', 'Rolling', 'Shearing', 'Forming', 'Tube Bending', 'Assembly'],
    icon: Building2,
  },
  {
    id: 'custom',
    title: 'Custom Parts & Finishing',
    description: 'Complete custom part fabrication with finishing solutions including powder coating, galvanizing, and plating. We deliver fully finished parts ready for use, coordinating with trusted partners for specialized finishes.',
    features: ['Powder Coating', 'Galvanizing', 'Anodizing', 'Plating', 'Painting', 'Surface Prep'],
    icon: Wrench,
  },
];

// 3D Wireframe component that rotates
function WireframeObject({ serviceId, color }: { serviceId: string; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D projection - 25% larger (scale multiplier 1.25)
    const project = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const scale = 300 / (300 + z2);
      // Apply 1.25x size multiplier
      const px = x1 * scale * 1.25;
      const py = y1 * scale * 1.25;

      return { x: px, y: py, z: z2 };
    };

    const getVertices = (id: string): [number, number, number][] => {
      const size = 80;
      switch (id) {
        case 'cooling':
          return [
            [-size, -size * 1.2, -size * 0.4], [size, -size * 1.2, -size * 0.4],
            [size, size * 1.2, -size * 0.4], [-size, size * 1.2, -size * 0.4],
            [-size, -size * 1.2, size * 0.4], [size, -size * 1.2, size * 0.4],
            [size, size * 1.2, size * 0.4], [-size, size * 1.2, size * 0.4],
            [-size * 0.7, -size * 0.8, -size * 0.4], [size * 0.7, -size * 0.8, -size * 0.4],
            [-size * 0.7, -size * 0.4, -size * 0.4], [size * 0.7, -size * 0.4, -size * 0.4],
            [-size * 0.7, 0, -size * 0.4], [size * 0.7, 0, -size * 0.4],
            [-size * 0.7, size * 0.4, -size * 0.4], [size * 0.7, size * 0.4, -size * 0.4],
            [-size * 0.7, size * 0.8, -size * 0.4], [size * 0.7, size * 0.8, -size * 0.4],
          ];
        case 'cnc':
          return [
            [-size, -size * 0.6, -size], [size, -size * 0.6, -size],
            [size, size * 0.6, -size], [-size, size * 0.6, -size],
            [-size, -size * 0.6, size], [size, -size * 0.6, size],
            [size, size * 0.6, size], [-size, size * 0.6, size],
            [0, -size * 0.6, 0], [0, -size * 1.2, 0],
            [-size * 0.2, -size * 1.2, -size * 0.2], [size * 0.2, -size * 1.2, -size * 0.2],
            [size * 0.2, -size * 1.2, size * 0.2], [-size * 0.2, -size * 1.2, size * 0.2],
          ];
        case 'laser':
          return [
            [-size * 1.2, 0, -size], [size * 1.2, 0, -size],
            [size * 1.2, 0, size], [-size * 1.2, 0, size],
            [-size * 0.8, 0, -size * 0.6], [size * 0.8, 0, -size * 0.6],
            [-size * 0.8, 0, -size * 0.2], [size * 0.8, 0, -size * 0.2],
            [-size * 0.8, 0, size * 0.2], [size * 0.8, 0, size * 0.2],
            [-size * 0.8, 0, size * 0.6], [size * 0.8, 0, size * 0.6],
            [-size * 0.3, 0, 0], [size * 0.3, 0, 0],
          ];
        case 'pipe':
          const pipeVerts: [number, number, number][] = [];
          const segments = 16;
          const radius = size * 0.5;
          const length = size * 1.5;
          for (let i = 0; i < segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            pipeVerts.push([x, y, -length]);
            pipeVerts.push([x, y, length]);
          }
          return pipeVerts;
        case 'welding':
          // Torch/flame shape
          return [
            [0, -size * 1.2, 0], [0, size * 0.4, 0], // main shaft
            [-size * 0.3, size * 0.4, -size * 0.3], [size * 0.3, size * 0.4, -size * 0.3],
            [size * 0.3, size * 0.4, size * 0.3], [-size * 0.3, size * 0.4, size * 0.3],
            [0, size * 1.2, 0], // flame tip
            [-size * 0.15, size * 0.8, 0], [size * 0.15, size * 0.8, 0],
          ];
        case 'structural':
          // I-beam shape
          return [
            [-size, -size, -size * 0.2], [size, -size, -size * 0.2],
            [size, -size, size * 0.2], [-size, -size, size * 0.2],
            [-size, size, -size * 0.2], [size, size, -size * 0.2],
            [size, size, size * 0.2], [-size, size, size * 0.2],
            [-size * 0.3, -size, 0], [size * 0.3, -size, 0],
            [-size * 0.3, size, 0], [size * 0.3, size, 0],
          ];
        default:
          return [
            [-size, -size, -size], [size, -size, -size],
            [size, size, -size], [-size, size, -size],
            [-size, -size, size], [size, -size, size],
            [size, size, size], [-size, size, size],
          ];
      }
    };

    const getEdges = (id: string): [number, number][] => {
      switch (id) {
        case 'cooling':
          return [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
            [8, 9], [10, 11], [12, 13], [14, 15], [16, 17],
          ];
        case 'cnc':
          return [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
            [8, 9],
            [10, 11], [11, 12], [12, 13], [13, 10],
          ];
        case 'laser':
          return [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [6, 7], [8, 9], [10, 11],
            [12, 13],
          ];
        case 'pipe':
          const pipeEdges: [number, number][] = [];
          const segments = 16;
          for (let i = 0; i < segments; i++) {
            const next = (i + 1) % segments;
            pipeEdges.push([i * 2, next * 2]);
            pipeEdges.push([i * 2 + 1, next * 2 + 1]);
            pipeEdges.push([i * 2, i * 2 + 1]);
          }
          return pipeEdges;
        case 'welding':
          return [
            [0, 1], [1, 2], [1, 3], [1, 4], [1, 5],
            [2, 3], [3, 4], [4, 5], [5, 2],
            [2, 6], [3, 6], [4, 6], [5, 6],
            [7, 8],
          ];
        case 'structural':
          return [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
            [8, 9], [10, 11], [8, 10], [9, 11],
          ];
        default:
          return [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
          ];
      }
    };

    const vertices = getVertices(serviceId);
    const edges = getEdges(serviceId);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      rotationRef.current.y += 0.008;
      rotationRef.current.x = Math.sin(Date.now() * 0.0005) * 0.2;

      const centerX = rect.width / 2;
      // Raise by 20% of section height (move center up)
      const centerY = rect.height / 2 - rect.height * 0.2;

      const projected = vertices.map(([x, y, z]) =>
        project(x, y, z, rotationRef.current.x, rotationRef.current.y)
      );

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.9;

      edges.forEach(([start, end]) => {
        if (start < projected.length && end < projected.length) {
          const p1 = projected[start];
          const p2 = projected[end];

          ctx.beginPath();
          ctx.moveTo(centerX + p1.x, centerY + p1.y);
          ctx.lineTo(centerX + p2.x, centerY + p2.y);
          ctx.stroke();
        }
      });

      ctx.fillStyle = color;
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [serviceId, color]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

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

          {/* Right - Service Detail with 3D Wireframe */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-browning-red/30 hover:shadow-lg transition-all">
            {/* 3D Wireframe */}
            <div className="relative h-64 md:h-80 bg-browning-light/50">
              <WireframeObject
                serviceId={currentService.id}
                color="#E63329"
              />
              {/* Title overlay at bottom */}
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
