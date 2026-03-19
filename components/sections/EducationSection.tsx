'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import CosmicBackground from '../CosmicBackground';

interface Education {
  institution: string;
  degree: string;
  date: string;
  location: string;
  textColor: string;
}

const layers: {
  name: string;
  education: Education | null;
  innerColor: string;
  outerColor: string;
  borderColor: string;
  labelColor: string;
  thickness: number;
}[] = [
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
        degree: 'Bachelor of Technology - Computer Science and Engineering',
        date: 'August 2023 – Present',
        location: 'Phagwara, Punjab',
        textColor: '#00d4ff',
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
        degree: 'Intermediate',
        date: 'June 2021 – June 2022',
        location: 'Gorakhpur, Uttar Pradesh',
        textColor: '#00b4d8',
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
        degree: 'Matriculation',
        date: '2019 – March 2020',
        location: 'Gorakhpur, Uttar Pradesh',
        textColor: '#00ff9d',
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

/** Build an SVG arc path (segment of the layer circle) at a given y position */
function buildArcPath(R: number, y: number): string {
  const dy = R - y;
  const halfChord = Math.sqrt(Math.max(0, R * R - dy * dy));
  // Sweep-flag 1 = clockwise in SVG → upper arc from left to right
  return `M ${R - halfChord} ${y} A ${R} ${R} 0 0 1 ${R + halfChord} ${y}`;
}

export default function EducationSection() {
  const totalLayerHeight = layers.length * lineSpacing + 100;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });

  useEffect(() => {
    // Load model-viewer script once
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section ref={sectionRef} id="education" className="relative overflow-hidden" style={{ paddingTop: 64, paddingBottom: 0 }}>
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


          // Curved text positions (y within the circle SVG)
          // Per-layer vertical adjustments
          const extraDown = idx === 2 ? 127 : idx === 3 ? 52 : 0;
          const yLine1 = radius - layerOffsets[idx] + 129 + extraDown;
          const yLine2 = radius - layerOffsets[idx] + 137 + extraDown;

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
                border: `1.5px solid ${layer.borderColor}`,
                pointerEvents: 'auto',
                ['--layer-border' as string]: layer.borderColor,
                ['--layer-glow' as string]: layer.innerColor,
                animationDelay: `${idx * 0.6}s`,
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
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 layer-dot"
                  style={{ backgroundColor: layer.labelColor, boxShadow: `0 0 8px ${layer.labelColor}, 0 0 16px ${layer.labelColor}` }}
                />
                <span
                  className="font-orbitron text-[9px] uppercase tracking-[2px] whitespace-nowrap"
                  style={{ color: layer.labelColor }}
                >
                  {layer.name}
                </span>
              </div>

              {/* Curved education text following layer curvature */}
              {layer.education && (
                <svg
                  className="absolute inset-0"
                  width={radius * 2}
                  height={radius * 2}
                  style={{ pointerEvents: 'none', zIndex: 30 }}
                >
                  <defs>
                    <path id={`arc1-${idx}`} d={buildArcPath(radius, yLine1)} fill="none" />
                    <path id={`arc2-${idx}`} d={buildArcPath(radius, yLine2)} fill="none" />
                  </defs>
                  {/* Line 1: Institution  •  Location */}
                  <text
                    fontSize="13"
                    fontWeight="600"
                    fill="#e2e8f0"
                    className={isInView ? `edu-text-carousel edu-delay-${idx}-1` : 'edu-text-hidden'}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    <textPath
                      href={`#arc1-${idx}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {layer.education.institution}  •  {layer.education.location}
                    </textPath>
                  </text>
                  {/* Line 2: Degree  •  Date */}
                  <text
                    fontSize="11"
                    fill={layer.education.textColor}
                    className={isInView ? `edu-text-carousel edu-delay-${idx}-2` : 'edu-text-hidden'}
                    style={{ fontFamily: "'Exo 2', sans-serif" }}
                  >
                    <textPath
                      href={`#arc2-${idx}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {layer.education.degree}  •  {layer.education.date}
                    </textPath>
                  </text>
                </svg>
              )}
            </motion.div>
          );
        })}

        {/* Earth — Large semicircle at bottom spanning full width */}
        <motion.div
          className="absolute left-1/2 z-10 flex items-center justify-center pointer-events-auto"
          style={{
            width: 2000,
            height: 2000,
            marginLeft: -1000,
            bottom: -900,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] lg:w-[550px] lg:h-[550px] rounded-full overflow-hidden">
            {/* @ts-expect-error - model-viewer is a web component */}
            <model-viewer
              src="/r2/earth.glb"
              alt="3D Earth Model"
              auto-rotate
              camera-controls
              disable-zoom
              disable-pan
              loading="lazy"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </div>
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
          animation: atmosphere-pulse 6s ease-in-out infinite, atmosphere-glow 8s ease-in-out infinite;
        }
        @keyframes atmosphere-pulse {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3); }
        }
        @keyframes atmosphere-glow {
          0%, 100% {
            box-shadow:
              inset 0 0 60px var(--layer-border),
              inset 0 0 30px var(--layer-border),
              inset 0 0 100px var(--layer-glow);
          }
          35% {
            box-shadow:
              inset 0 0 100px var(--layer-border),
              inset 0 0 50px var(--layer-border),
              inset 0 0 160px var(--layer-glow);
          }
          65% {
            box-shadow:
              inset 0 0 110px var(--layer-border),
              inset 0 0 55px var(--layer-border),
              inset 0 0 170px var(--layer-glow);
          }
          100% {
            box-shadow:
              inset 0 0 60px var(--layer-border),
              inset 0 0 30px var(--layer-border),
              inset 0 0 100px var(--layer-glow);
          }
        }
        .layer-dot {
          animation: dot-pulse 2s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 1; }
        }
        @keyframes edu-carousel {
          0% { opacity: 0; transform: translateX(-40px); filter: blur(4px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .edu-text-carousel {
          animation: edu-carousel 2s ease-out forwards;
        }
        .edu-text-hidden {
          opacity: 0;
        }
        .edu-delay-2-1 { animation-delay: 0.3s; opacity: 0; }
        .edu-delay-2-2 { animation-delay: 0.6s; opacity: 0; }
        .edu-delay-3-1 { animation-delay: 0.9s; opacity: 0; }
        .edu-delay-3-2 { animation-delay: 1.2s; opacity: 0; }
        .edu-delay-4-1 { animation-delay: 1.5s; opacity: 0; }
        .edu-delay-4-2 { animation-delay: 1.8s; opacity: 0; }
      `}</style>
    </section>
  );
}
