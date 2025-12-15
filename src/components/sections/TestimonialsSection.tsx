'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from '@/hooks/useScrollAnimations';

const testimonials = [
  {
    id: 1,
    name: 'Josh McKay',
    text: 'I was in need of custom fabrication and repair work done on my duck boat and motor. Took it to Browning\'s Welding who KNOCKED IT OUT OF THE PARK! Their team was able to complete my project for under the price quoted.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Luke Barnett',
    text: 'I worked with Tommy at Browning Welding for a small machined metal project and was blown away at their in-house abilities. They can make just about anything out of metal. No job was too small.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Jake Briley',
    text: 'Brownings did a fantastic job completely designing and building a piece of equipment for our airport. I would recommend them above all else.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Murphy Brown',
    text: 'Fast and easy to work with. More catered to bigger businesses, but they haven\'t turned us little guys down yet! Great group of guys.',
    rating: 5,
  },
  {
    id: 5,
    name: 'John Yates',
    text: 'Needed the slots elongated on the bracket for my Harley windshield. They did it fast and at a very reasonable price. They did such a good job that you can\'t tell it from factory original. Great business to deal with, highly recommended.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Paxton Wallace',
    text: 'Great people! They can do anything you need!',
    rating: 5,
  },
  {
    id: 7,
    name: 'Scott Havens',
    text: 'Browning Welding gives you what you ask for with good prices and excellent work. Very good and honest people.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, sectionVisible] = useInView(0.2);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="bg-gray-50 py-16 md:py-24"
      ref={sectionRef}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-browning-charcoal mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600">5.0 rating from {testimonials.length} Google reviews</p>
        </div>

        {/* Testimonial Card */}
        <div
          className={`relative bg-white rounded-2xl shadow-lg p-8 md:p-12 transition-all duration-700 delay-200 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Quote Icon */}
          <Quote
            size={48}
            className="absolute top-6 left-6 text-browning-red/10"
          />

          {/* Testimonial Content */}
          <div className="relative z-10 text-center">
            <p className="text-lg md:text-xl text-gray-700 mb-6 italic leading-relaxed">
              &ldquo;{currentTestimonial.text}&rdquo;
            </p>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>

            {/* Author */}
            <p className="font-semibold text-browning-charcoal text-lg">
              {currentTestimonial.name}
            </p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-browning-red w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Google Attribution */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Reviews from Google
        </p>
      </div>
    </section>
  );
}
