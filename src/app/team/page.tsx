'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import QuoteFormModal from '@/components/modals/QuoteFormModal';
import JobApplicationModal from '@/components/modals/JobApplicationModal';
import Navbar from '@/components/layout/Navbar';

const allTeamMembers = [
  // Founder
  { name: 'Tommy Browning Sr.', role: 'Founder', image: '/images/team/tommy-browning-sr.jpg', category: 'Leadership' },
  // Leadership
  { name: 'Tommy Lynn Browning', role: 'President', image: '/images/team/tommy-lynn-browning.jpg', category: 'Leadership' },
  { name: 'Tammy Browning', role: 'Controller', image: '/images/team/tammy-browning.jpg', category: 'Leadership' },
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
  // Placeholder for new team members
  { name: 'You?', role: 'Apply Now!', image: '/images/team/placeholder-silhouette.svg', category: 'Join Us', isPlaceholder: true },
];

export default function TeamPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar alwaysVisible />

      {/* Hero Section with Team Photo */}
      <section className="relative h-[40vh] md:h-[65vh] flex items-end justify-center overflow-hidden pb-12 md:pb-16">
        <Image
          src="/images/team-group.jpg"
          alt="Browning's Welding Team"
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
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
          <p className="text-lg text-browning-gray leading-relaxed mb-4">
At Browning&apos;s Welding, we&apos;re more than just a team, we&apos;re a family. With over 50 years in business, our skilled craftsmen bring dedication, precision, and pride to every project. From our leadership to our shop floor, every member shares a commitment to quality and customer satisfaction.
          </p>
          <p className="text-lg text-browning-gray leading-relaxed">
            Interested in joining our team?{' '}
            <button
              onClick={() => setIsJobModalOpen(true)}
              className="text-browning-red hover:text-red-700 font-semibold underline underline-offset-2 transition-colors"
            >
              Click here!
            </button>
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="pt-8 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {allTeamMembers.map((member, index) => {
              const isPlaceholder = 'isPlaceholder' in member && member.isPlaceholder;

              if (isPlaceholder) {
                return (
                  <button
                    key={index}
                    onClick={() => setIsJobModalOpen(true)}
                    className="group text-left"
                  >
                    {/* Photo */}
                    <div className="aspect-[4/5] bg-gray-200 rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4 group-hover:ring-4 group-hover:ring-browning-red/30 transition-all">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="text-browning-charcoal font-semibold text-sm md:text-base group-hover:text-browning-red transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-browning-red font-semibold text-xs md:text-sm">{member.role}</p>
                  </button>
                );
              }

              return (
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
              );
            })}
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

      {/* Quote Modal */}
      <QuoteFormModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
    </div>
  );
}
