'use client';

import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail } from 'lucide-react';
import { StaggerChild } from '../SectionPanel';

interface HeroSectionProps {
  onNavigate: (nodeId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
      <StaggerChild>
        <div className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-blink" />
          <span className="font-exo text-xs text-[#00ff9d] tracking-wider">Open to Opportunities</span>
        </div>
      </StaggerChild>

      <StaggerChild>
        <h1 className="font-orbitron font-bold text-glow-cyan leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          Hi, I&apos;m <span className="text-[#00d4ff]">Suraj Yadav</span>
        </h1>
      </StaggerChild>

      <StaggerChild>
        <div className="h-10 mb-6 font-orbitron text-xl md:text-2xl text-[#94a3b8]">
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
        </div>
      </StaggerChild>

      <StaggerChild>
        <p className="font-exo text-[#94a3b8] text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          CSE Student at Lovely Professional University · CGPA: <span className="text-[#00d4ff] font-semibold">8.60</span> · Building scalable systems & intuitive interfaces.
        </p>
      </StaggerChild>

      <StaggerChild>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={() => onNavigate('projects')}
            className="font-orbitron text-xs uppercase tracking-wider px-6 py-3 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/80 hover:scale-[1.04] transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)' }}
          >
            View Projects
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="font-orbitron text-xs uppercase tracking-wider px-6 py-3 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/40 text-[#00ff9d] hover:bg-[#00ff9d]/20 hover:border-[#00ff9d]/80 hover:scale-[1.04] transition-all duration-300"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 157, 0.15)' }}
          >
            Contact Me
          </button>
          <a
            href="#"
            className="font-orbitron text-xs uppercase tracking-wider px-6 py-3 rounded-lg border border-[#94a3b8]/30 text-[#94a3b8] hover:border-[#94a3b8]/60 hover:scale-[1.04] transition-all duration-300"
          >
            Download CV
          </a>
        </div>
      </StaggerChild>

      <StaggerChild>
        <div className="flex items-center gap-4">
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
        </div>
      </StaggerChild>
    </div>
  );
}
