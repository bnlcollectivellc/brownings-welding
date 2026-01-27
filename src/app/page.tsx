import HeroSection from '@/components/hero/HeroSection';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import ClientsSection from '@/components/sections/ClientsSection';
import AboutSection from '@/components/sections/AboutSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesShowcase />
      <TestimonialsSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
