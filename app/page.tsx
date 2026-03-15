'use client';

import Starfield from '@/components/Starfield';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import TrainingSection from '@/components/sections/TrainingSection';
import CertificatesSection from '@/components/sections/CertificatesSection';

import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#020817]">
      <Starfield />
      <Navbar />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <TrainingSection />
      <CertificatesSection />

      <Footer />
    </main>
  );
}
