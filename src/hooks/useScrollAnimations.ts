'use client';

import { useEffect, useRef, useState } from 'react';

// Hook to detect when element is in viewport
// Fades in when scrolling down, fades out when scrolling back up past the element
// rootMargin adds 25px buffer so animations trigger earlier
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      lastScrollY.current = currentScrollY;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element is in viewport (with 25px buffer)
      const isInView = rect.top < windowHeight - 25 && rect.bottom > 25;

      if (isInView && !isScrollingUp) {
        // Scrolling down and element is in view - show it
        setIsVisible(true);
        setHasBeenVisible(true);
      } else if (isScrollingUp && hasBeenVisible) {
        // Scrolling up - check if we've scrolled past where element originally appeared
        const elementTop = rect.top + currentScrollY;
        if (currentScrollY < elementTop - windowHeight + 100) {
          // We've scrolled back up past the trigger point - hide it
          setIsVisible(false);
          setHasBeenVisible(false);
        }
      }
    };

    // Initial check
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 25 && rect.bottom > 25) {
      setIsVisible(true);
      setHasBeenVisible(true);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, hasBeenVisible]);

  return [ref, isVisible] as const;
}

// Hook for parallax effect
export function useParallax<T extends HTMLElement = HTMLElement>(speed = 0.5) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;
      const elementTop = rect.top + scrolled;
      const relativeScroll = scrolled - elementTop + window.innerHeight;

      // Only apply parallax when element is in view
      if (relativeScroll > 0 && rect.bottom > 0) {
        setOffset(relativeScroll * speed * 0.20);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset] as const;
}
