'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import QuoteFormModal from '@/components/modals/QuoteFormModal';

const allTeamMembers = [
  // Browning Family
  { name: 'Tommy Browning Sr.', role: 'Founder', image: '/images/team/tommy-browning-sr.jpg', category: 'Leadership' },
  { name: 'Tommy Lynn Browning', role: 'President', image: '/images/team/tommy-lynn-browning.jpg', category: 'Leadership' },
  { name: 'Tammy Browning', role: 'Vice-President', image: '/images/team/tammy-browning.jpg', category: 'Leadership' },
  // Management
  { name: 'Aidan Conley', role: 'Operations Manager', image: '/images/team/aidan-conley.jpg', category: 'Management' },
  { name: 'Scott Hance', role: 'Shop Floor Manager', image: '/images/team/scott-hance.jpg', category: 'Management' },
  { name: 'Josh Cummins', role: 'Design Engineer / Estimator', image: '/images/team/josh-cummins.jpg', category: 'Management' },
  // Lead / Specialized
  { name: 'Walt Pruitt', role: 'Lead Welder / Fitter', image: '/images/team/walt-pruitt.jpg', category: 'Specialized' },
  { name: 'Jarrod Short', role: 'Laser Operator', image: '/images/team/jarrod-short.jpg', category: 'Specialized' },
  { name: 'Leevi Evans', role: 'Saw Operator', image: '/images/team/leevi-evans.jpg', category: 'Specialized' },
  // Machinists
  { name: 'Benny Gonzales', role: 'Machinist', image: '/images/team/benny-gonzales.jpg', category: 'Machinists' },
  { name: 'Riley Short', role: 'Machinist', image: '/images/team/riley-short.jpg', category: 'Machinists' },
  { name: 'Tom Eades', role: 'Machinist', image: '/images/team/tom-eades.jpg', category: 'Machinists' },
  { name: 'Trey Scanlon', role: 'Machinist', image: '/images/team/trey-scanlon.jpg', category: 'Machinists' },
  // Welders
  { name: 'Bobby Harrison', role: 'Welder', image: '/images/team/bobby-harrison.jpg', category: 'Welders' },
  { name: 'Cody Kesterson', role: 'Welder', image: '/images/team/cody-kesterson.jpg', category: 'Welders' },
  { name: 'Dixon Hagler', role: 'Welder', image: '/images/team/dixon-hagler.jpg', category: 'Welders' },
  { name: 'Jeff Watts', role: 'Welder', image: '/images/team/jeff-watts.jpg', category: 'Welders' },
  { name: 'Lain Verser', role: 'Welder', image: '/images/team/lain-verser.jpg', category: 'Welders' },
  { name: 'Lane Hayes', role: 'Welder', image: '/images/team/lane-hayes.jpg', category: 'Welders' },
  { name: 'Ryan Bixler', role: 'Welder', image: '/images/team/ryan-bixler.jpg', category: 'Welders' },
  { name: 'Terry Milliser', role: 'Welder', image: '/images/team/terry-milliser.jpg', category: 'Welders' },
  { name: 'Tim Newkirk', role: 'Welder', image: '/images/team/tim-newkirk.jpg', category: 'Welders' },
  { name: 'Tommy Newsom', role: 'Welder', image: '/images/team/tommy-newsom.jpg', category: 'Welders' },
];

export default function TeamPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Team Photo */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/team-group.jpg"
          alt="Browning's Welding Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Meet the Family
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            The dedicated team behind Browning&apos;s Welding &amp; Fabrication
          </p>
        </div>
      </section>

      {/* Team Description Placeholder */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-browning-gray leading-relaxed">
            {/* Placeholder for team copy */}
            At Browning&apos;s Welding, we&apos;re more than just a team—we&apos;re a family. With over 50 years of combined experience, our skilled craftsmen bring dedication, precision, and pride to every project. From our leadership to our shop floor, every member shares a commitment to quality and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {allTeamMembers.map((member, index) => (
              <div
                key={index}
                className="group"
              >
                {/* Photo */}
                <div className="aspect-[4/5] bg-gray-200 rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4">
                  {member.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <User className="text-gray-300" size={60} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-browning-charcoal font-semibold text-sm md:text-base">
                  {member.name}
                </h3>
                <p className="text-browning-gray text-xs md:text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-browning-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-300 mb-8">
            Get a custom quote for your fabrication project. Our team is ready to help.
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
