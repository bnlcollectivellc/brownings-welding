'use client';

import { useState, useEffect, useRef } from 'react';
import { Download, X, CheckCircle, Loader2 } from 'lucide-react';

// Service data with all 7 services - Air & Liquid Cooling first, Oilfield Pipe/Tube Inspection second
const services = [
  {
    id: 'cooling',
    title: 'Air & Liquid Cooling Assemblies',
    description: 'Specialized fabrication of air and liquid cooling assemblies for data centers and industrial applications. Our work includes painted and powder coated steel frames, square tubing, angle iron, channel, and pipe welding, as well as mild steel and stainless pipe fitting and welding.',
    features: ['Data Center Cooling', 'Heat Exchangers', 'Coolant Distribution', 'Custom Manifolds', 'Leak Testing', 'Production Assembly'],
    background: '/images/services/datacenter-bg.jpg',
    wireframeColor: '#E63329',
  },
  {
    id: 'pipe',
    title: 'Oilfield Pipe/Tube Inspection',
    description: 'Comprehensive oilfield tube and pipe inspection services ensuring structural integrity and compliance for critical applications. Our inspection processes include electromagnetic interference testing, descaling, rethreading, and thorough quality documentation.',
    features: ['EMI Inspection', 'Descale', 'Rethreading', 'Visual Inspection', 'Quality Assurance', 'Documentation'],
    background: '/images/services/pipe-bg.jpg',
    wireframeColor: '#E63329',
  },
  {
    id: 'welding',
    title: 'MIG/TIG Welding',
    description: 'Expert MIG, TIG, spot, and stick welding services for all metals and applications. Our certified welders bring decades of experience to every project, ensuring strong, precise welds that meet the highest industry standards.',
    features: ['MIG Welding', 'TIG Welding', 'Spot Welding', 'Stick Welding', 'Aluminum Welding', 'Stainless Steel'],
    background: '/images/services/welding-bg.jpg',
    wireframeColor: '#E63329',
  },
  {
    id: 'cnc',
    title: 'CNC Machining',
    description: 'Precision mill and lathe capabilities for complex parts and prototypes. Our CNC department delivers tight-tolerance components with excellent surface finishes using state-of-the-art Haas equipment.',
    features: ['CNC Milling', 'CNC Turning', 'Prototyping', 'Production Runs', '0.0005" Tolerances', 'Various Materials'],
    background: '/images/services/cnc-bg.jpg',
    wireframeColor: '#E63329',
  },
  {
    id: 'laser',
    title: 'Laser Cutting',
    description: 'Precision laser cutting for intricate designs and clean edges on sheet metal. Our state-of-the-art CO2 laser technology delivers exceptional accuracy and speed for both prototype and production runs.',
    features: ['CO2 Laser', 'Fiber Engraving', '0.0005" Tolerances', 'Up to 945 IPM', 'Complex Geometries', 'Fast Turnaround'],
    background: '/images/services/laser-bg.jpg',
    wireframeColor: '#E63329',
  },
  {
    id: 'structural',
    title: 'Structural Fabrication',
    description: 'Comprehensive bending, forming, shearing, and rolling capabilities for custom structural and sheet metal work. From simple brackets to complex enclosures and frames, we handle projects of all sizes.',
    features: ['Press Brake', 'Rolling', 'Shearing', 'Forming', 'Tube Bending', 'Assembly'],
    background: '/images/services/structural-bg.jpg',
    wireframeColor: '#E63329',
  },
  {
    id: 'custom',
    title: 'Custom Parts & Finishing',
    description: 'Complete custom part fabrication with finishing solutions including powder coating, galvanizing, and plating. We deliver fully finished parts ready for use, coordinating with trusted partners for specialized finishes.',
    features: ['Powder Coating', 'Galvanizing', 'Anodizing', 'Plating', 'Painting', 'Surface Prep'],
    background: '/images/services/finishing-bg.jpg',
    wireframeColor: '#E63329',
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

    // Set canvas size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // 3D projection function
    const project = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;

      // Rotate around X axis
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective projection
      const scale = 300 / (300 + z2);
      const px = x1 * scale;
      const py = y1 * scale;

      return { x: px, y: py, z: z2 };
    };

    // Different shapes for different services
    const getVertices = (id: string): [number, number, number][] => {
      const size = 80;
      switch (id) {
        case 'cooling':
          // Server rack shape
          return [
            [-size, -size * 1.2, -size * 0.4], [size, -size * 1.2, -size * 0.4],
            [size, size * 1.2, -size * 0.4], [-size, size * 1.2, -size * 0.4],
            [-size, -size * 1.2, size * 0.4], [size, -size * 1.2, size * 0.4],
            [size, size * 1.2, size * 0.4], [-size, size * 1.2, size * 0.4],
            // Internal lines for detail
            [-size * 0.7, -size * 0.8, -size * 0.4], [size * 0.7, -size * 0.8, -size * 0.4],
            [-size * 0.7, -size * 0.4, -size * 0.4], [size * 0.7, -size * 0.4, -size * 0.4],
            [-size * 0.7, 0, -size * 0.4], [size * 0.7, 0, -size * 0.4],
            [-size * 0.7, size * 0.4, -size * 0.4], [size * 0.7, size * 0.4, -size * 0.4],
            [-size * 0.7, size * 0.8, -size * 0.4], [size * 0.7, size * 0.8, -size * 0.4],
          ];
        case 'cnc':
          // CNC machine shape
          return [
            [-size, -size * 0.6, -size], [size, -size * 0.6, -size],
            [size, size * 0.6, -size], [-size, size * 0.6, -size],
            [-size, -size * 0.6, size], [size, -size * 0.6, size],
            [size, size * 0.6, size], [-size, size * 0.6, size],
            // Spindle
            [0, -size * 0.6, 0], [0, -size * 1.2, 0],
            [-size * 0.2, -size * 1.2, -size * 0.2], [size * 0.2, -size * 1.2, -size * 0.2],
            [size * 0.2, -size * 1.2, size * 0.2], [-size * 0.2, -size * 1.2, size * 0.2],
          ];
        case 'laser':
          // Flat sheet with cut pattern
          return [
            [-size * 1.2, 0, -size], [size * 1.2, 0, -size],
            [size * 1.2, 0, size], [-size * 1.2, 0, size],
            // Cut lines
            [-size * 0.8, 0, -size * 0.6], [size * 0.8, 0, -size * 0.6],
            [-size * 0.8, 0, -size * 0.2], [size * 0.8, 0, -size * 0.2],
            [-size * 0.8, 0, size * 0.2], [size * 0.8, 0, size * 0.2],
            [-size * 0.8, 0, size * 0.6], [size * 0.8, 0, size * 0.6],
            // Circle cut
            [-size * 0.3, 0, 0], [size * 0.3, 0, 0],
          ];
        case 'pipe':
          // Pipe/cylinder shape
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
        default:
          // Default cube
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
            [0, 1], [1, 2], [2, 3], [3, 0], // Front
            [4, 5], [5, 6], [6, 7], [7, 4], // Back
            [0, 4], [1, 5], [2, 6], [3, 7], // Sides
            [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], // Internal
          ];
        case 'cnc':
          return [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
            [8, 9], // Spindle
            [10, 11], [11, 12], [12, 13], [13, 10], // Spindle head
          ];
        case 'laser':
          return [
            [0, 1], [1, 2], [2, 3], [3, 0], // Outer
            [4, 5], [6, 7], [8, 9], [10, 11], // Cut lines
            [12, 13], // Circle
          ];
        case 'pipe':
          const pipeEdges: [number, number][] = [];
          const segments = 16;
          for (let i = 0; i < segments; i++) {
            const next = (i + 1) % segments;
            pipeEdges.push([i * 2, next * 2]); // Front ring
            pipeEdges.push([i * 2 + 1, next * 2 + 1]); // Back ring
            pipeEdges.push([i * 2, i * 2 + 1]); // Length
          }
          return pipeEdges;
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
      const centerY = rect.height / 2;

      // Project all vertices
      const projected = vertices.map(([x, y, z]) =>
        project(x, y, z, rotationRef.current.x, rotationRef.current.y)
      );

      // Draw edges
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.8;

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

      // Draw vertices as small dots
      ctx.fillStyle = color;
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, 2, 0, Math.PI * 2);
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
      // Send email to API for tracking
      const response = await fetch('/api/linecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
      // Trigger download after short delay
      setTimeout(() => {
        // TODO: Replace with actual linecard PDF path when available
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
      <div className="relative bg-white rounded-2xl p-8 max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Download Starting!</h3>
            <p className="text-gray-600">Your linecard download should begin automatically.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Download Capabilities Linecard</h3>
            <p className="text-gray-600 mb-6">
              Enter your email to download our complete capabilities and capacity matrix.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-browning-red focus:border-transparent transition-colors"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-sm">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-browning-red hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

export default function ServicesShowcase({ showLinecard = true }: ServicesShowcaseProps) {
  const [activeService, setActiveService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLinecardModalOpen, setIsLinecardModalOpen] = useState(false);

  const handleServiceChange = (index: number) => {
    if (index === activeService || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveService(index);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 300);
  };

  const currentService = services[activeService];

  return (
    <section className="relative min-h-[80vh] md:min-h-screen bg-browning-charcoal overflow-hidden">
      {/* Background Image with fade transition */}
      <div className="absolute inset-0 z-0">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeService && !isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${service.background})`,
              }}
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh]">
          {/* Left Side - Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Title */}
            <div
              className={`transition-all duration-300 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {currentService.title}
              </h2>
            </div>

            {/* Description */}
            <div
              className={`transition-all duration-300 delay-75 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {currentService.description}
              </p>
            </div>

            {/* Feature Tags */}
            <div
              className={`flex flex-wrap gap-2 transition-all duration-300 delay-100 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {currentService.features.map((feature, index) => (
                <span
                  key={index}
                  className="text-xs md:text-sm font-medium text-white/80 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Capabilities List */}
            <div className="pt-4 md:pt-8 border-t border-white/10">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                Capabilities
              </h3>
              <ul className="space-y-1">
                {services.map((service, index) => (
                  <li key={service.id}>
                    <button
                      onClick={() => handleServiceChange(index)}
                      className={`w-full text-left py-2 px-3 rounded transition-all duration-200 flex items-center gap-3 group ${
                        index === activeService
                          ? 'text-white bg-browning-red/20 border-l-2 border-browning-red'
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent'
                      }`}
                    >
                      <span className="text-sm md:text-base">{service.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Linecard Download */}
            {showLinecard && (
              <div className="pt-4">
                <button
                  className="inline-flex items-center gap-2 text-browning-red hover:text-white border border-browning-red hover:bg-browning-red px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                  onClick={() => setIsLinecardModalOpen(true)}
                >
                  <Download size={16} />
                  Download Capabilities Linecard
                </button>
              </div>
            )}
          </div>

          {/* Right Side - 3D Wireframe */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <WireframeObject
                serviceId={currentService.id}
                color={currentService.wireframeColor}
              />
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
