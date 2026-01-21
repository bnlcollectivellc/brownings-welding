'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import QuoteFormModal from '@/components/modals/QuoteFormModal';
import Navbar from '@/components/layout/Navbar';

export default function AboutPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar alwaysVisible />

      {/* Hero Section with 1995 Photo */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end justify-center overflow-hidden pb-12 md:pb-16">
        <Image
          src="/images/about/1995-team.jpg"
          alt="Browning's Welding Team in 1995"
          fill
          className="object-cover object-[center_25%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            50 years of faith, family, and fabrication
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Founders Photo - Above text */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/team/tommy-peggy-browning.jpg"
                alt="Tommy and Peggy Browning, Founders"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg w-full h-auto"
              />
              <p className="text-center text-browning-gray mt-4 text-sm">
                Tommy and Peggy Browning, Founders
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-browning-gray leading-relaxed mb-6">
              Founded in 1972 by Tommy and Peggy Browning, Browning&apos;s Welding Service, Inc. started as a small welding shop in Greenbrier, Arkansas. What began as a one-man operation driven by dedication and craftsmanship has grown into a full-service metal fabrication facility serving customers across the nation.
            </p>
            <p className="text-lg text-browning-gray leading-relaxed mb-6">
              For over 50 years, our commitment to quality has never wavered. From our early days of agricultural repairs to today&apos;s precision cooling assemblies for data centers, we&apos;ve always believed that every weld, every cut, and every bend represents our family&apos;s reputation.
            </p>
            <p className="text-lg text-browning-gray leading-relaxed">
              Now in our second generation of family leadership, we continue to invest in the latest technology and equipment while honoring the values that built this company: integrity, quality, and treating every customer like family.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="text-4xl mb-4">+</div>
              <h3 className="text-xl font-bold text-browning-charcoal mb-4">Faith</h3>
              <p className="text-browning-gray">
                Our foundation is built on faith, guiding every decision we make and every relationship we build.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="text-4xl mb-4">&#9829;</div>
              <h3 className="text-xl font-bold text-browning-charcoal mb-4">Family</h3>
              <p className="text-browning-gray">
                We treat our employees and customers as family, creating lasting partnerships built on trust.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="text-4xl mb-4">&#9881;</div>
              <h3 className="text-xl font-bold text-browning-charcoal mb-4">Fabrication</h3>
              <p className="text-browning-gray">
                Excellence in craftsmanship is our legacy, delivering precision and quality in every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Made in USA */}
      <section className="py-16 bg-browning-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-6">&#127482;&#127480;</div>
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal mb-4">
            Proudly Made in the USA
          </h2>
          <p className="text-lg text-browning-gray">
            Since 1972, every product that leaves our shop has been manufactured right here in Greenbrier, Arkansas. We&apos;re proud to be an American manufacturer, supporting local jobs and delivering American-made quality.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-browning-charcoal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-300 mb-8">
            Experience the difference that 50 years of dedication makes.
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
