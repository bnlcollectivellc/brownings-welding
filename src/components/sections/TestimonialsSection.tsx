'use client';

import { Star } from 'lucide-react';
import { useInView, useParallax } from '@/hooks/useScrollAnimations';

const testimonials = [
  {
    id: 1,
    name: 'Joe Whisenhunt III',
    company: 'Whisinvest Realty, LLC',
    text: 'Browning\'s Welding Service is the best welding service in Arkansas. Their workmanship consistently meets the highest professional and industry standards, demonstrating exceptional skill, precision, and durability. Their attention to detail, commitment to safety, and clear communication throughout the project reflect a strong dedication to quality and client satisfaction. With competitive pricing and reliable results, Browning\'s Welding Service is a trusted partner and great resource for any fabrication needs.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Evan Dillon',
    company: 'Lexicon, Inc.',
    text: 'Great company, even better people. They do some awesome work!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Brian Burrows',
    company: '2020 Olympic Bronze Medalist, Ironwood Axe Throwing Owner',
    text: 'Great operation run by down-to-earth people. They do high-quality work and stand behind what they build. One of the best families I know, and it shows in how they operate their business. Highly recommend.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Paxton Wallace',
    company: 'G1 Athletics',
    text: 'Great people! They can do anything you need!',
    rating: 5,
  },
  {
    id: 5,
    name: 'Josh McKay',
    company: 'RE/MAX Real Estate',
    text: 'I was in need of custom fabrication and repair work done on my duck boat and motor. Took it to Browning\'s Welding who KNOCKED IT OUT OF THE PARK! Their team was able to complete my project for under the price quoted.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Luke Barnett',
    company: 'Lean Feast',
    text: 'I worked with Tommy at Browning Welding for a small machined metal project and was blown away at their in-house abilities. They can make just about anything out of metal. No job was too small.',
    rating: 5,
  },
  {
    id: 7,
    name: 'Jake Briley',
    company: 'Conway Municipal Airport',
    text: 'Brownings did a fantastic job completely designing and building a piece of equipment for our airport. I would recommend them above all else.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Murphy Brown',
    company: 'Central Arkansas Supply',
    text: 'Fast and easy to work with. More catered to bigger businesses, but they haven\'t turned us little guys down yet! Great group of guys.',
    rating: 5,
  },
  {
    id: 9,
    name: 'John Yates',
    company: null,
    text: 'Needed the slots elongated on the bracket for my Harley windshield. They did it fast and at a very reasonable price. They did such a good job that you can\'t tell it from factory original. Great business to deal with, highly recommended.',
    rating: 5,
  },
];

// Triple for seamless loop on large displays (9 testimonials x 3 = 27 items per track)
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  // Render a single testimonial card
  const TestimonialCard = ({ testimonial, keyPrefix = '' }: { testimonial: typeof testimonials[0], keyPrefix?: string }) => (
    <div
      key={`${keyPrefix}${testimonial.id}`}
      className="flex-shrink-0 w-[320px] md:w-[380px] lg:w-[420px] mx-3 lg:mx-4 bg-white rounded-xl border border-gray-200 p-6 lg:p-8"
    >
      {/* Review Text */}
      <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-4 line-clamp-4">
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-2">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400 lg:w-4 lg:h-4" />
        ))}
      </div>

      {/* Author */}
      <p className="font-bold text-browning-charcoal lg:text-lg">
        {testimonial.name}
      </p>
      {testimonial.company && (
        <p className="text-sm lg:text-base text-browning-gray">{testimonial.company}</p>
      )}
    </div>
  );

  return (
    <section
      id="testimonials"
      className="bg-white py-16 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Section Header */}
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal">
            What Our Customers Say
          </h2>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee wrapper - two extended tracks side by side */}
        <div className="marquee marquee--slow">
          {/* First track */}
          <div className="marquee__content">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </div>
          {/* Second track (duplicate for seamless loop) */}
          <div className="marquee__content" aria-hidden="true">
            {extendedTestimonials.map((testimonial, index) => (
              <TestimonialCard key={`dup-${testimonial.id}-${index}`} testimonial={testimonial} keyPrefix="dup-" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
