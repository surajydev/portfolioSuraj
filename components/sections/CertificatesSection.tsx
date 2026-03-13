'use client';

import { Award } from 'lucide-react';
import { StaggerChild } from '../SectionPanel';
import { useRef } from 'react';

const certificates = [
  {
    title: 'ChatGPT-4 Prompt Engineering',
    issuer: 'Infosys',
    category: 'Generative AI & LLM',
    date: 'Aug 2025',
    color: '#00d4ff',
  },
  {
    title: 'Software Engineering: Implementation & Testing',
    issuer: 'Coursera',
    category: 'Software Engineering',
    date: 'Apr 2024',
    color: '#0066ff',
  },
  {
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    category: 'Web Development',
    date: 'Nov 2023',
    color: '#00ff9d',
  },
];

function CertificateCard({ cert }: { cert: typeof certificates[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    const shimmer = cardRef.current?.querySelector('.shimmer') as HTMLDivElement;
    if (shimmer) {
      shimmer.style.animation = 'shimmer 1.5s ease-in-out';
      shimmer.addEventListener('animationend', () => {
        shimmer.style.animation = 'none';
      }, { once: true });
    }
  };

  return (
    <div
      ref={cardRef}
      className="glass rounded-xl p-6 text-center relative overflow-hidden hover:border-opacity-60 transition-all duration-300"
      style={{ borderColor: `${cert.color}25` }}
      onMouseEnter={handleMouseEnter}
    >
      {/* Shimmer overlay */}
      <div
        className="shimmer absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(25deg, transparent 30%, ${cert.color}15 50%, transparent 70%)`,
          transform: 'translateX(-100%) rotate(25deg)',
        }}
      />

      <div className="relative z-10">
        <Award size={40} style={{ color: cert.color }} className="mx-auto mb-4" />
        <h3 className="font-orbitron text-sm font-semibold text-[#e2e8f0] mb-2 leading-snug">{cert.title}</h3>
        <p className="font-exo text-xs text-[#94a3b8] mb-3">{cert.issuer}</p>
        <span
          className="inline-block font-exo text-[10px] px-2.5 py-0.5 rounded-full mb-3"
          style={{ color: cert.color, backgroundColor: `${cert.color}10`, border: `1px solid ${cert.color}25` }}
        >
          {cert.category}
        </span>
        <div
          className="h-px my-3 mx-auto w-3/4"
          style={{
            background: `linear-gradient(90deg, transparent, ${cert.color}40, transparent)`,
            boxShadow: `0 0 8px ${cert.color}20`,
          }}
        />
        <p className="font-exo text-xs text-[#94a3b8]">{cert.date}</p>
      </div>
    </div>
  );
}

export default function CertificatesSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 max-w-4xl mx-auto">
      <StaggerChild className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3">
          <Award size={28} className="text-[#00b4d8]" />
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00b4d8] text-glow-teal uppercase">
            Certificates & Credentials
          </h2>
        </div>
      </StaggerChild>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {certificates.map((cert) => (
          <StaggerChild key={cert.title}>
            <CertificateCard cert={cert} />
          </StaggerChild>
        ))}
      </div>
    </div>
  );
}
