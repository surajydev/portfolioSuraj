'use client';

import Starfield from '@/components/Starfield';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#020817]">
      <Starfield />
      <Navbar />
      <ContactSection />
      <Footer />
    </main>
  );
}
