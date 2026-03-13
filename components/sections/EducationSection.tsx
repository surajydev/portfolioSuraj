'use client';

import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerChild } from '../SectionPanel';

const educationData = [
  {
    name: 'Lovely Professional University',
    degree: 'B.Tech — Computer Science & Engineering',
    date: 'Aug 2023 – Present',
    location: 'Phagwara, Punjab',
    score: '8.60',
    scoreLabel: 'CGPA',
    scoreColor: '#00d4ff',
    dotSize: 18,
    dotColor: '#00d4ff',
    isCurrent: true,
    chip: 'Currently Enrolled',
  },
  {
    name: 'Reliance Academy',
    degree: 'Intermediate (Class XII)',
    date: 'Jun 2021 – Jun 2022',
    location: 'Gorakhpur, Uttar Pradesh',
    score: '85.8%',
    scoreLabel: 'Percentage',
    scoreColor: '#00d4ff',
    dotSize: 14,
    dotColor: '#00b4d8',
    isCurrent: false,
  },
  {
    name: 'Academic Heights Public School',
    degree: 'Matriculation (Class X)',
    date: 'Apr 2019 – Mar 2020',
    location: 'Gorakhpur, Uttar Pradesh',
    score: '85%',
    scoreLabel: 'Percentage',
    scoreColor: '#00ff9d',
    dotSize: 14,
    dotColor: '#00ff9d',
    isCurrent: false,
  },
];

export default function EducationSection() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16">
      <StaggerChild className="mb-12 text-center">
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00b4d8] text-glow-teal uppercase">
          Education
        </h2>
      </StaggerChild>

      <div className="relative max-w-[700px] w-full">
        {/* Timeline line */}
        <motion.div
          className="absolute left-6 top-0 bottom-0 w-[2px]"
          style={{ background: 'rgba(0, 212, 255, 0.3)' }}
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        <div className="space-y-12">
          {educationData.map((edu, idx) => (
            <StaggerChild key={idx}>
              <motion.div
                className="relative pl-16"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.2, duration: 0.5, ease: 'easeOut' }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-6 top-1 -translate-x-1/2 rounded-full z-10"
                  style={{
                    width: edu.dotSize,
                    height: edu.dotSize,
                    backgroundColor: edu.dotColor,
                    boxShadow: `0 0 12px ${edu.dotColor}80`,
                  }}
                >
                  {edu.isCurrent && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{
                        border: `2px solid ${edu.dotColor}`,
                        animation: 'pulseRing 2s ease-out infinite',
                      }}
                    />
                  )}
                </div>

                <h3 className="font-orbitron text-base md:text-lg font-semibold text-[#e2e8f0] mb-1">
                  {edu.name}
                </h3>
                <p className="font-exo text-sm text-[#94a3b8] mb-2">{edu.degree}</p>

                <span
                  className="inline-block font-exo text-[10px] px-2.5 py-0.5 rounded-full mb-2"
                  style={{
                    color: edu.dotColor,
                    backgroundColor: `${edu.dotColor}15`,
                    border: `1px solid ${edu.dotColor}30`,
                  }}
                >
                  {edu.date}
                </span>

                <div className="flex items-center gap-1.5 mb-3 text-[#94a3b8]">
                  <MapPin size={12} />
                  <span className="font-exo text-xs">{edu.location}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div>
                    <span className="font-orbitron text-2xl font-bold" style={{ color: edu.scoreColor }}>
                      {edu.score}
                    </span>
                    <span className="font-orbitron text-[10px] text-[#94a3b8] uppercase tracking-wider ml-2">
                      {edu.scoreLabel}
                    </span>
                  </div>

                  {edu.chip && (
                    <span className="flex items-center gap-1.5 font-exo text-[10px] px-2 py-0.5 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-blink" />
                      {edu.chip}
                    </span>
                  )}
                </div>
              </motion.div>
            </StaggerChild>
          ))}
        </div>
      </div>
    </div>
  );
}
