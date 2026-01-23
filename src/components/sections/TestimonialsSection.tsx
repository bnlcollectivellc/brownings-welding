'use client';

import { useRef, useCallback, useEffect } from 'react';
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

// Triple for infinite scroll
const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const speedRef = useRef(0.5);
  const isHoveredRef = useRef(false);
  const [sectionRef, sectionVisible] = useInView(0.2);
  const [parallaxRef, parallaxOffset] = useParallax(0.15);

  // Initialize scroll position and start animation
  useEffect(() => {
    let mounted = true;

    // Small delay to ensure DOM is fully rendered (important for mobile)
    const initTimeout = setTimeout(() => {
      if (!mounted || !scrollRef.current) return;

      const container = scrollRef.current;
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;

      // Start animation after positioning
      const autoScroll = () => {
        if (!mounted) return;

        // Smoothly interpolate speed toward target
        const targetSpeed = isHoveredRef.current ? 0 : 0.5;
        speedRef.current += (targetSpeed - speedRef.current) * 0.05;

        // Only scroll if speed is meaningful
        if (scrollRef.current && !isScrollingRef.current && Math.abs(speedRef.current) > 0.01) {
          scrollRef.current.scrollLeft += speedRef.current;
        }
        animationRef.current = requestAnimationFrame(autoScroll);
      };

      animationRef.current = requestAnimationFrame(autoScroll);
    }, 100);

    return () => {
      mounted = false;
      clearTimeout(initTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Empty dependency - runs once on mount

  // Handle seamless looping
  const handleScroll = useCallback(() => {
    if (isScrollingRef.current || !scrollRef.current) return;

    const container = scrollRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isScrollingRef.current = true;
      container.scrollLeft = container.scrollLeft - singleSetWidth;
      setTimeout(() => { isScrollingRef.current = false; }, 50);
    } else if (container.scrollLeft <= 0) {
      isScrollingRef.current = true;
      container.scrollLeft = container.scrollLeft + singleSetWidth;
      setTimeout(() => { isScrollingRef.current = false; }, 50);
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    // Only pause if user is actually swiping horizontally (more than 10px)
    if (deltaX > 10) {
      isDragging.current = true;
      isHoveredRef.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Only resume if we were actually dragging
    if (isDragging.current) {
      setTimeout(() => {
        isHoveredRef.current = false;
        isDragging.current = false;
      }, 1000);
    }
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-gray-50 py-16"
      ref={parallaxRef}
      style={{ transform: `translateY(${parallaxOffset}px)` }}
    >
      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-browning-charcoal">
            What Our Customers Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Fade Left */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Fade Right */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-6 overflow-x-scroll scrollbar-hide carousel-scroll px-10"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 bg-white rounded-xl border border-gray-200 p-6 hover:border-browning-red/30 transition-colors"
              >
                {/* Review Text */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Author */}
                <p className="font-bold text-browning-charcoal">
                  {testimonial.name}
                </p>
                {testimonial.company && (
                  <p className="text-sm text-browning-gray">{testimonial.company}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
