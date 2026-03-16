'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import CosmicBackground from '../CosmicBackground';

const layers = [
  {
    name: 'Exosphere',
    education: null,
    innerColor: 'rgba(120, 90, 200, 0.5)',
    outerColor: 'rgba(120, 90, 200, 0.5)',
    borderColor: 'rgba(120, 90, 200, 0.25)',
    labelColor: '#8070c0',
    thickness: 80,
  },
  {
    name: 'Thermosphere',
    education: null,
    innerColor: 'rgba(100, 200, 150, 0.5)',
    outerColor: 'rgba(100, 200, 150, 0.5)',
    borderColor: 'rgba(100, 200, 150, 0.3)',
    labelColor: '#60c890',
    thickness: 90,
  },
  {
    name: 'Mesosphere',
    education: {
      institution: 'Lovely Professional University',
      degree: 'B.Tech — Computer Science & Engineering',
      date: 'Aug 2023 – Present',
      location: 'Phagwara, Punjab',
      score: '8.60',
      scoreLabel: 'CGPA',
      scoreColor: '#00d4ff',
      chip: 'Currently Enrolled',
    },
    innerColor: 'rgba(30, 100, 200, 0.5)',
    outerColor: 'rgba(30, 100, 200, 0.5)',
    borderColor: 'rgba(30, 100, 200, 0.35)',
    labelColor: '#4090d0',
    thickness: 130,
  },
  {
    name: 'Stratosphere',
    education: {
      institution: 'Reliance Academy',
      degree: 'Intermediate (Class XII)',
      date: 'Jun 2021 – Jun 2022',
      location: 'Gorakhpur, Uttar Pradesh',
      score: '85.8%',
      scoreLabel: 'Percentage',
      scoreColor: '#00b4d8',
    },
    innerColor: 'rgba(0, 180, 220, 0.5)',
    outerColor: 'rgba(0, 180, 220, 0.5)',
    borderColor: 'rgba(0, 180, 220, 0.4)',
    labelColor: '#00c8e8',
    thickness: 120,
  },
  {
    name: 'Troposphere',
    education: {
      institution: 'Academic Heights Public School',
      degree: 'Matriculation (Class X)',
      date: 'Apr 2019 – Mar 2020',
      location: 'Gorakhpur, Uttar Pradesh',
      score: '85%',
      scoreLabel: 'Percentage',
      scoreColor: '#00ff9d',
    },
    innerColor: 'rgba(80, 200, 255, 0.5)',
    outerColor: 'rgba(80, 200, 255, 0.5)',
    borderColor: 'rgba(80, 200, 255, 0.5)',
    labelColor: '#60d0ff',
    thickness: 110,
  },
];

// Equal spacing for 5 concentric lines
const earthRadius = 700;
const lineSpacing = 80; // equal gap between each line
const layerOffsets = layers.map((_, idx) => (layers.length - idx) * lineSpacing);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function EducationSection() {
  const totalLayerHeight = layers.length * lineSpacing + 100;

  return (
    <section id="education" className="relative overflow-hidden" style={{ paddingTop: 64, paddingBottom: 0 }}>
      {/* Starry night background */}
      <div className="absolute inset-0 z-0">
        <img src="/beautiful-shot-starry-night-sky.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0e1a]/60" />
      </div>
      <CosmicBackground variant="aurora" />

      {/* Title */}
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00b4d8] text-glow-teal uppercase">
            Education
          </h2>
        </motion.div>
      </div>

      {/* Atmosphere lines + Earth container */}
      <div
        className="relative w-full"
        style={{ height: totalLayerHeight + 280 }}
      >
        {/* Each atmosphere layer as a concentric curved line with fill */}
        {layers.map((layer, idx) => {
          const radius = earthRadius + layerOffsets[idx];
          const innerRadius = idx < layers.length - 1 ? earthRadius + layerOffsets[idx + 1] : earthRadius;
          const innerPct = ((innerRadius / radius) * 100).toFixed(1);

          return (
            <motion.div
              key={layer.name}
              className="absolute left-1/2 atmosphere-layer"
              style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                bottom: -(radius) - 260,
                borderRadius: '50%',
                background: `radial-gradient(circle at 50% 100%, transparent ${innerPct}%, ${layer.innerColor} ${innerPct}%, ${layer.outerColor} 100%)`,
                border: `1.5px solid ${layer.borderColor}`,
                boxShadow: [
                  `inset 0 0 120px ${layer.borderColor}`,
                  `inset 0 0 50px ${layer.borderColor}`,
                  `inset 0 0 200px ${layer.innerColor.replace('0.5', '0.25')}`,
                ].join(', '),
                pointerEvents: 'auto',
                ['--layer-border' as string]: layer.borderColor,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {/* Layer label at the top of this arc */}
              <div
                className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
                style={{ top: radius - layerOffsets[idx] + 10 }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: layer.labelColor, boxShadow: `0 0 6px ${layer.labelColor}` }}
                />
                <span
                  className="font-orbitron text-[9px] uppercase tracking-[2px] whitespace-nowrap"
                  style={{ color: layer.labelColor }}
                >
                  {layer.name}
                </span>
              </div>

              {/* Education card in the center of the arc band */}
              {layer.education && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 z-20"
                  style={{
                    top: radius - layerOffsets[idx] + 30,
                    width: 'min(420px, 85vw)',
                    pointerEvents: 'auto',
                  }}
                >
                  <div
                    className="glass rounded-xl px-5 py-3.5 hover:scale-[1.02] transition-transform duration-300"
                    style={{
                      borderColor: `${layer.education.scoreColor}30`,
                      boxShadow: `0 0 20px ${layer.education.scoreColor}10`,
                    }}
                  >
                    <h3 className="font-orbitron text-xs md:text-sm font-semibold text-[#e2e8f0] mb-0.5">
                      {layer.education.institution}
                    </h3>
                    <p className="font-exo text-[11px] text-[#94a3b8] mb-1.5">{layer.education.degree}</p>

                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span
                        className="font-exo text-[10px] px-2 py-0.5 rounded-full"
                        style={{
                          color: layer.education.scoreColor,
                          backgroundColor: `${layer.education.scoreColor}15`,
                          border: `1px solid ${layer.education.scoreColor}30`,
                        }}
                      >
                        {layer.education.date}
                      </span>
                      <span className="flex items-center gap-1 text-[#94a3b8]">
                        <MapPin size={9} />
                        <span className="font-exo text-[10px]">{layer.education.location}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-orbitron text-lg font-bold" style={{ color: layer.education.scoreColor }}>
                        {layer.education.score}
                      </span>
                      <span className="font-orbitron text-[8px] text-[#94a3b8] uppercase tracking-wider">
                        {layer.education.scoreLabel}
                      </span>
                      {layer.education.chip && (
                        <span className="flex items-center gap-1 font-exo text-[9px] px-1.5 py-0.5 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/25 ml-auto">
                          <span className="w-1 h-1 rounded-full bg-[#00ff9d] animate-blink" />
                          {layer.education.chip}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Earth — Large semicircle at bottom spanning full width */}
        <motion.div
          className="absolute left-1/2 z-10"
          style={{
            width: earthRadius * 2,
            height: earthRadius * 2,
            marginLeft: -earthRadius,
            bottom: -(earthRadius) - 260,
            borderRadius: '50%',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Atmosphere glow on top edge */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: 'inset 0 -20px 60px rgba(0, 150, 255, 0.15), 0 0 80px rgba(0, 150, 255, 0.1)',
            }}
          />
          <Image
            src="/earth.png"
            alt="Earth"
            fill
            className="object-cover earth-spin"
            priority
          />
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .animate-blink {
          animation: blink 1.5s ease-in-out infinite;
        }
        @keyframes earth-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .earth-spin {
          animation: earth-rotate 60s linear infinite;
        }
        .atmosphere-layer {
          animation: atmosphere-pulse 4s ease-in-out infinite;
        }
        @keyframes atmosphere-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
        }
      `}</style>
    </section>
  );
}
