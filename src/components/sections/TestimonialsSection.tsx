'use client';

import { useRef, useEffect, useCallback } from 'react';
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

// Triple for seamless infinite scroll
const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  const startAnimation = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Initialize scroll position to middle set
    const singleSetWidth = container.scrollWidth / 3;
    if (container.scrollLeft < singleSetWidth * 0.5 || container.scrollLeft > singleSetWidth * 2.5) {
      container.scrollLeft = singleSetWidth;
    }

    lastTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const container = scrollRef.current;
      if (!container) return;

      const deltaTime = Math.min(currentTime - lastTimeRef.current, 50);
      lastTimeRef.current = currentTime;

      // Speed: pixels per millisecond (slower for testimonials)
      const isMobile = window.innerWidth < 768;
      const speed = isMobile ? 0.06 : 0.03;

      container.scrollLeft += speed * deltaTime;

      const setWidth = container.scrollWidth / 3;

      // Seamless loop
      if (container.scrollLeft >= setWidth * 2) {
        container.scrollLeft -= setWidth;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Start animation on mount and handle visibility changes
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      startAnimation();
    }, 100);

    // Handle tab visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        lastTimeRef.current = performance.now();
        startAnimation();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(initTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startAnimation]);

  return (
    <section
      id="testimonials"
      className="bg-gray-50 py-16 overflow-hidden"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      {/* Section Header - inside container */}
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

      {/* Carousel Container - full width for edge-to-edge fades */}
      <div className="relative">
        {/* Fade Left - at screen edge */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Fade Right - at screen edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Scrollable Carousel Track */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden"
        >
          {infiniteTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] xl:w-[28vw] 2xl:w-[22vw] mx-3 lg:mx-4 bg-white rounded-xl border border-gray-200 p-6 lg:p-8 hover:border-browning-red/30 transition-colors"
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
          ))}
        </div>
      </div>
    </section>
  );
}
