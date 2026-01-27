'use client';

import { useState } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import ClientsSection from '@/components/sections/ClientsSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import JobApplicationModal from '@/components/modals/JobApplicationModal';

export default function Home() {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesShowcase />
      <TestimonialsSection />
      <AboutSection />
      <TeamSection onJoinClick={() => setIsJobModalOpen(true)} />
      <ContactSection />

      <JobApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
      />
    </>
  );
}
