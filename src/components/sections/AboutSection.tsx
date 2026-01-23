'use client';

import { Award, Users, Factory, Heart } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';
import Link from 'next/link';

const highlights = [
  {
    icon: Award,
    label: 'Since 1972',
    description: '50+ years of excellence',
  },
  {
    icon: Factory,
    label: 'Made in USA',
    description: 'American manufacturing',
  },
  {
    icon: Users,
    label: 'Family Owned',
    description: 'Three generations strong',
  },
  {
    icon: Heart,
    label: 'Faith Driven',
    description: 'Values that matter',
  },
];

export default function AboutSection() {
  const [leftRef, leftVisible] = useInView(0.2);
  const [rightRef, rightVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.2);

  return (
    <section
      id="about"
      className="bg-browning-light py-24"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div
            ref={leftRef}
            className={`transition-all duration-700 ${
              leftVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <span className="text-browning-red font-semibold text-sm uppercase tracking-wider">
              About Browning&apos;s
            </span>
            <Link href="/about" className="block group">
              <h2 className="text-3xl md:text-4xl font-bold text-browning-charcoal mt-4 mb-6 group-hover:text-browning-red transition-colors">
                Manufacturing Excellence,<br />Home Grown Values
              </h2>
            </Link>
            <p className="text-browning-gray text-lg mb-6">
              For over five decades, Browning&apos;s Welding & Fabrication has been a cornerstone of
              American manufacturing. What started as a small family operation in 1972 has grown
              into a full-service fabrication facility, serving clients across the nation.
            </p>
            <p className="text-browning-gray text-lg mb-8">
              Our commitment to quality, integrity, and customer satisfaction has remained
              unchanged since day one. We believe in doing things right, whether it&apos;s a simple
              bracket or a complex industrial project.
            </p>

            {/* Tagline */}
            <div className="bg-white border-l-4 border-browning-red p-6 rounded-r-xl shadow-sm">
              <p className="text-browning-charcoal text-xl font-semibold italic">
                &quot;Faith, Family, & Fabrication&quot;
              </p>
              <p className="text-browning-gray mt-2">- The Browning Family</p>
            </div>
          </div>

          {/* Right - Stats/Highlights */}
          <div
            ref={rightRef}
            className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-200 ${
              rightVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {highlights.map((item) => (
              <Link
                href="/about"
                key={item.label}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-browning-red/30 hover:shadow-lg transition-all group"
              >
                <div className="bg-browning-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-browning-red" size={32} />
                </div>
                <h3 className="text-browning-charcoal font-bold text-xl mb-1 group-hover:text-browning-red transition-colors">{item.label}</h3>
                <p className="text-browning-gray text-sm">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
