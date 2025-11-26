import HeroSection from '@/components/hero/HeroSection';
import ClientsSection from '@/components/sections/ClientsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
