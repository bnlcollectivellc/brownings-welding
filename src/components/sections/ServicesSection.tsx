import { Flame, Scissors, Box, Cog, Zap, Shield } from 'lucide-react';

const services = [
  {
    icon: Flame,
    title: 'Welding',
    description: 'Expert MIG, TIG, and stick welding services for all metals and applications.',
  },
  {
    icon: Scissors,
    title: 'Laser Cutting',
    description: 'Precision laser cutting for intricate designs and clean edges on various materials.',
  },
  {
    icon: Box,
    title: 'Sheet Metal Fabrication',
    description: 'Custom sheet metal work including bending, forming, and assembly.',
  },
  {
    icon: Cog,
    title: 'CNC Machining',
    description: 'Computer-controlled precision machining for complex parts and prototypes.',
  },
  {
    icon: Zap,
    title: 'Plasma Cutting',
    description: 'Fast and efficient plasma cutting for thicker materials and large projects.',
  },
  {
    icon: Shield,
    title: 'Finishing Services',
    description: 'Powder coating, anodizing, and other finishing options for durability and aesthetics.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-browning-red font-semibold text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-browning-charcoal mt-4 mb-4">
            Our Fabrication Services
          </h2>
          <p className="text-browning-gray text-lg max-w-2xl mx-auto">
            From concept to completion, we provide comprehensive metal fabrication solutions
            tailored to your exact specifications.
          </p>
        </div>

        {/* Services Grid - 2 cols on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-browning-light border border-gray-200 rounded-2xl p-4 md:p-8 hover:border-browning-red/30 hover:shadow-lg transition-all group"
            >
              <div className="bg-browning-red/10 w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-6 group-hover:bg-browning-red/20 transition-colors">
                <service.icon className="text-browning-red" size={20} />
              </div>
              <h3 className="text-sm md:text-xl font-semibold text-browning-charcoal mb-1 md:mb-3">{service.title}</h3>
              <p className="text-browning-gray text-xs md:text-base hidden md:block">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 bg-browning-red hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
