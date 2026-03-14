'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import UfoAnimation from '@/components/UfoAnimation';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play on mount (Windows browsers sometimes block autoplay)
    const tryPlay = () => {
      video.play().catch(() => {
        // If autoplay is blocked, try again on user interaction
        const resumePlay = () => {
          video.play();
          document.removeEventListener('click', resumePlay);
          document.removeEventListener('scroll', resumePlay);
        };
        document.addEventListener('click', resumePlay, { once: true });
        document.addEventListener('scroll', resumePlay, { once: true });
      });
    };

    // Ensure loop works as a fallback
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('ended', handleEnded);

    // Wait for loadeddata before playing
    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center w-full overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0, transform: 'translateZ(0)' }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Semi-transparent overlay — keeps video visible but text readable */}
      <div className="absolute inset-0 bg-[#020817]/35" style={{ zIndex: 1 }} />

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020817] to-transparent" style={{ zIndex: 1 }} />

      {/* UFO Inspector Animation */}
      <UfoAnimation />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-blink" />
            <span className="font-exo text-xs text-[#00ff9d] tracking-wider">Open to Opportunities</span>
          </div>
        </motion.div>

        <motion.h1
          className="font-orbitron font-bold text-glow-cyan leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Hi, I&apos;m <span className="text-[#00d4ff]">Suraj Yadav</span>
        </motion.h1>

        <motion.div
          className="h-10 mb-6 font-orbitron text-xl md:text-2xl text-[#94a3b8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer', 2000,
              '', 500,
              'UI/UX Designer', 2000,
              '', 500,
              'Microservices Engineer', 2000,
              '', 500,
              'Problem Solver', 2000,
              '', 500,
            ]}
            speed={50}
            deletionSpeed={60}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          className="font-exo text-[#c8d0dd] text-base md:text-lg max-w-2xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          CSE Student at Lovely Professional University · CGPA: <span className="text-[#00d4ff] font-semibold">8.60</span> · Building scalable systems &amp; intuitive interfaces.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="font-orbitron text-xs uppercase tracking-wider px-6 py-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/80 hover:scale-[1.04] transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)' }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="font-orbitron text-xs uppercase tracking-wider px-6 py-3 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/40 text-[#00ff9d] hover:bg-[#00ff9d]/20 hover:border-[#00ff9d]/80 hover:scale-[1.04] transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 157, 0.15)' }}
          >
            Contact Me
          </a>
          <a
            href="/cv"
            className="font-orbitron text-xs uppercase tracking-wider px-6 py-3 rounded-lg bg-[#00b4d8]/10 border border-[#00b4d8]/40 text-[#00b4d8] hover:bg-[#00b4d8]/20 hover:border-[#00b4d8]/80 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(0,180,216,0.3)] transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(0, 180, 216, 0.15)' }}
          >
            Download CV
          </a>
        </motion.div>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <a href="https://github.com/surajydev" target="_blank" rel="noopener noreferrer"
            className="glass w-11 h-11 rounded-full flex items-center justify-center hover:border-[#00d4ff]/60 hover:scale-[1.04] transition-all duration-300">
            <Github size={18} className="text-[#e2e8f0]" />
          </a>
          <a href="https://www.linkedin.com/in/surajyadav/" target="_blank" rel="noopener noreferrer"
            className="glass w-11 h-11 rounded-full flex items-center justify-center hover:border-[#00d4ff]/60 hover:scale-[1.04] transition-all duration-300">
            <Linkedin size={18} className="text-[#e2e8f0]" />
          </a>
          <a href="mailto:surajyadav052005@gmail.com"
            className="glass w-11 h-11 rounded-full flex items-center justify-center hover:border-[#00d4ff]/60 hover:scale-[1.04] transition-all duration-300">
            <Mail size={18} className="text-[#e2e8f0]" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={24} className="text-[#00d4ff]/60" />
      </motion.div>
    </section>
  );
}
