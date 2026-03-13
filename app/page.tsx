'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Starfield from '@/components/Starfield';
import CustomCursor from '@/components/CustomCursor';
import SectionPanel from '@/components/SectionPanel';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import TrainingSection from '@/components/sections/TrainingSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import ContactSection from '@/components/sections/ContactSection';
import { NODES } from '@/lib/nodes';

const NeuralNetwork = dynamic(() => import('@/components/NeuralNetwork'), { ssr: false });

// Mobile neural network mini header
function MobileNavigation({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="md:hidden flex flex-col min-h-screen">
      {/* Mini decorative network header */}
      <div className="relative h-[200px] overflow-hidden flex items-center justify-center">
        <svg width="300" height="180" viewBox="0 0 300 180" className="opacity-60">
          {/* Simplified decorative network */}
          {[
            { x: 150, y: 90, r: 12, c: '#00d4ff' },
            { x: 80, y: 50, r: 8, c: '#00d4ff' },
            { x: 220, y: 45, r: 8, c: '#00ff9d' },
            { x: 240, y: 100, r: 10, c: '#0066ff' },
            { x: 90, y: 130, r: 8, c: '#00b4d8' },
            { x: 55, y: 85, r: 7, c: '#00ff9d' },
            { x: 190, y: 145, r: 7, c: '#00b4d8' },
            { x: 140, y: 35, r: 8, c: '#00d4ff' },
          ].map((n, i) => (
            <g key={i}>
              <line x1={150} y1={90} x2={n.x} y2={n.y} stroke={n.c} strokeWidth="0.5" strokeOpacity="0.2" />
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={0.6}>
                <animate attributeName="opacity" values="0.4;0.7;0.4" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="font-orbitron text-xl font-bold text-[#00d4ff] text-glow-cyan">SURAJ YADAV</h1>
          <p className="font-exo text-xs text-[#94a3b8] mt-1">Neural Network Portfolio</p>
        </div>
      </div>

      {/* Vertical card list */}
      <div className="flex-1 px-4 pb-8 space-y-3">
        {NODES.map((node) => (
          <button
            key={node.id}
            onClick={() => onOpen(node.id)}
            className="w-full glass rounded-xl p-4 flex items-center justify-between group text-left hover:scale-[1.01] transition-all duration-300"
            style={{ borderLeftWidth: '3px', borderLeftColor: node.color }}
          >
            <div>
              <span className="font-orbitron text-sm text-[#e2e8f0]">{node.label}</span>
              <p className="font-exo text-xs text-[#94a3b8] mt-0.5">{node.tooltip}</p>
            </div>
            <span className="text-[#94a3b8] group-hover:text-[#00d4ff] transition-colors">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [clickOrigin, setClickOrigin] = useState({ x: 0, y: 0 });

  const handleNodeClick = useCallback((nodeId: string, x: number, y: number) => {
    setClickOrigin({ x, y });
    setTimeout(() => {
      setActiveSection(nodeId);
      window.history.pushState(null, '', nodeId === 'home' ? '/' : `/#${nodeId}`);
    }, 200);
  }, []);

  const handleClose = useCallback(() => {
    setActiveSection(null);
    window.history.pushState(null, '', '/');
  }, []);

  const handleNavigate = useCallback((nodeId: string) => {
    const node = NODES.find(n => n.id === nodeId);
    if (node) {
      setClickOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setActiveSection(nodeId);
      window.history.pushState(null, '', `/#${nodeId}`);
    }
  }, []);

  const handleMobileOpen = useCallback((nodeId: string) => {
    setClickOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setActiveSection(nodeId);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection onNavigate={handleNavigate} />;
      case 'about':
        return <AboutSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'education':
        return <EducationSection />;
      case 'training':
        return <TrainingSection />;
      case 'certificates':
        return <CertificatesSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <main className="relative min-h-screen bg-[#020817]">
      <Starfield />
      <CustomCursor />

      {/* Desktop: Neural Network Canvas */}
      <div className="hidden md:block">
        <NeuralNetwork
          onNodeClick={handleNodeClick}
          visible={activeSection === null}
        />
      </div>

      {/* Mobile: Card Navigation */}
      {activeSection === null && (
        <MobileNavigation onOpen={handleMobileOpen} />
      )}

      {/* Section Panel */}
      <SectionPanel
        isOpen={activeSection !== null}
        onClose={handleClose}
        originX={clickOrigin.x}
        originY={clickOrigin.y}
      >
        {renderSection()}
      </SectionPanel>
    </main>
  );
}
