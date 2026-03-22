'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import UfoAnimation from '@/components/UfoAnimation';
import TypingText from '../TypingText';

export default function HeroSection() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<'A' | 'B'>('A');
  const swappingRef = useRef(false);

  useEffect(() => {
    const videoA = videoARef.current;
    const videoB = videoBRef.current;
    if (!videoA || !videoB) return;

    // Long, gradual crossfade so the loop point is invisible
    const FADE_DURATION = 4;

    const tryPlay = (v: HTMLVideoElement) => {
      v.play().catch(() => {
        const resume = () => {
          v.play();
          document.removeEventListener('click', resume);
          document.removeEventListener('scroll', resume);
        };
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('scroll', resume, { once: true });
      });
    };

    // Start: A is visible and plays, B is hidden at time 0
    videoA.style.opacity = '1';
    videoB.style.opacity = '0';
    videoB.currentTime = 0;

    if (videoA.readyState >= 2) {
      tryPlay(videoA);
    } else {
      videoA.addEventListener('loadeddata', () => tryPlay(videoA), { once: true });
    }

    const handleTimeUpdate = () => {
      const active = activeRef.current === 'A' ? videoA : videoB;
      const standby = activeRef.current === 'A' ? videoB : videoA;

      if (swappingRef.current) return;
      if (!active.duration || active.duration === Infinity) return;

      const remaining = active.duration - active.currentTime;

      if (remaining <= FADE_DURATION && remaining > 0.1) {
        swappingRef.current = true;

        // Prepare standby: start from beginning
        standby.currentTime = 0;
        standby.style.transition = 'none';
        standby.style.opacity = '0';
        tryPlay(standby);

        // Give a frame for the standby to start rendering, then blend
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Fade standby in very gradually while active fades out
            standby.style.transition = `opacity ${FADE_DURATION}s linear`;
            active.style.transition = `opacity ${FADE_DURATION}s linear`;
            standby.style.opacity = '1';
            active.style.opacity = '0';

            // After crossfade, clean up and swap roles
            setTimeout(() => {
              active.pause();
              active.currentTime = 0;
              // Reset transitions immediately so next swap is clean
              active.style.transition = 'none';
              standby.style.transition = 'none';
              activeRef.current = activeRef.current === 'A' ? 'B' : 'A';
              swappingRef.current = false;
            }, FADE_DURATION * 1000 + 200);
          });
        });
      }
    };

    videoA.addEventListener('timeupdate', handleTimeUpdate);
    videoB.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      videoA.removeEventListener('timeupdate', handleTimeUpdate);
      videoB.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const videoStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    zIndex: 0,
    transform: 'translateZ(0)',
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center w-full overflow-hidden">
      {/* Background Video A */}
      <video
        ref={videoARef}
        muted
        playsInline
        preload="auto"
        style={{ ...videoStyle, zIndex: 0 }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Background Video B (crossfade partner) */}
      <video
        ref={videoBRef}
        muted
        playsInline
        preload="auto"
        style={{ ...videoStyle, zIndex: 0, opacity: 0 }}
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
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-blink" />
            <span className="font-exo text-xs text-[#00ff9d] tracking-wider">Open to Opportunities</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-glow-cyan leading-tight mb-6 whitespace-nowrap"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
            fontFamily: '"Doto", sans-serif',
            fontWeight: 900,
            fontStyle: 'normal',
            letterSpacing: '0.06em',
            fontVariationSettings: '"ROND" 12',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #00d4ff 40%, #0066ff 70%, #00ff9d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <TypingText text="Hi, I'm Suraj Yadav" speed={90} cursorColor="#00d4ff" pauseMs={3000} />
        </motion.h1>

        <motion.div
          className="h-10 mb-6 font-orbitron text-xl md:text-2xl text-[#94a3b8]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          CSE Student at Lovely Professional University · CGPA: <span className="text-[#00d4ff] font-semibold">8.60</span> · Building scalable systems &amp; intuitive interfaces.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown size={24} className="text-[#00d4ff]/60" />
      </motion.div>
    </section>
  );
}
