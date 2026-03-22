'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import CosmicBackground from '../CosmicBackground';
import TypingText from '../TypingText';

interface Education {
  institution: string;
  degree: string;
  date: string;
  location: string;
  textColor: string;
}

const layers: {
  education: Education | null;
  innerColor: string;
  outerColor: string;
  borderColor: string;
  thickness: number;
}[] = [
    {
      education: null,
      innerColor: 'rgba(120, 90, 200, 0.5)',
      outerColor: 'rgba(120, 90, 200, 0.5)',
      borderColor: 'rgba(120, 90, 200, 0.25)',
      thickness: 80,
    },
    {
      education: null,
      innerColor: 'rgba(100, 200, 150, 0.5)',
      outerColor: 'rgba(100, 200, 150, 0.5)',
      borderColor: 'rgba(100, 200, 150, 0.3)',
      thickness: 90,
    },
    {
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
      thickness: 130,
    },
    {
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
      thickness: 120,
    },
    {
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
      thickness: 110,
    },
  ];

const earthRadius = 700;
const lineSpacing = 80;
const layerOffsets = layers.map((_, idx) => (layers.length - idx) * lineSpacing);

/** Build an SVG arc path (segment of the layer circle) at a given y position */
function buildArcPath(R: number, y: number): string {
  const dy = R - y;
  const halfChord = Math.sqrt(Math.max(0, R * R - dy * dy));
  return `M ${R - halfChord} ${y} A ${R} ${R} 0 0 1 ${R + halfChord} ${y}`;
}

export default function EducationSection() {
  const totalLayerHeight = layers.length * lineSpacing + 100;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const [earthScale, setEarthScale] = useState(1);
  const earthRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEarthScale(prev => {
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      return Math.min(3, Math.max(0.5, prev + delta));
    });
  }, []);

  useEffect(() => {
    const el = earthRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
      return () => el.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);



  return (
    <section ref={sectionRef} id="education" className="relative" style={{ paddingTop: 64, paddingBottom: 0, contain: 'layout style', overflowX: 'clip', overflowY: 'visible' }}>
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/323-135992580.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(1.2)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/60 via-[#0a0e1a]/30 to-[#0a0e1a]/60" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0e1a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0e1a] to-transparent" />
      </div>
      <CosmicBackground variant="aurora" />

      {/* Section Heading */}
      <motion.div className="relative z-10 text-center mb-8 -mt-8"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="font-orbitron text-2xl md:text-3xl font-bold uppercase tracking-wider"
          style={{ background: 'linear-gradient(135deg, #e2e8f0 0%, #00d4ff 40%, #0066ff 70%, #00ff9d 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          <TypingText text="Education" speed={80} cursorColor="#00d4ff" pauseMs={3000} />
        </h2>
        <div className="h-0.5 mt-4 mx-auto w-24 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
      </motion.div>

      {/* Voyager 1 Satellite */}
      <motion.div
        className="absolute z-[6] pointer-events-none"
        style={{ top: '32.5%', right: '8%' }}
        animate={{
          x: [0, 30, -15, 25, -10, 0],
          y: [0, -20, 10, -25, 15, 0],
          rotate: [0, 5, -3, 4, -2, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          src="/voyager1.png"
          alt="Voyager 1"
          className="w-[60px] md:w-[80px] object-contain"
          style={{ filter: 'drop-shadow(0 0 15px rgba(0,212,255,0.5)) drop-shadow(0 0 30px rgba(0,212,255,0.2))' }}
          animate={{ scale: [1, 1.05, 0.98, 1.03, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Hot Air Balloon */}
      <motion.div
        className="absolute z-[6] pointer-events-none"
        style={{ bottom: '25%', left: '20%' }}
        animate={{
          x: [0, 40, -20, 50, -30, 20, 0],
          y: [0, -30, -10, -40, -5, -25, 0],
          rotate: [0, 3, -2, 4, -3, 2, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.img
          src="/—Pngtree—hot air baloon vector_12161839.png"
          alt="Hot Air Balloon"
          className="w-[70px] md:w-[100px] object-contain"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4)) drop-shadow(0 0 20px rgba(255,158,0,0.15))' }}
          animate={{ y: [0, -8, 4, -6, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Wind particle lines */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`wind-${i}`}
          className="absolute z-[5] pointer-events-none"
          style={{
            top: `${15 + i * 12}%`,
            left: '-10%',
            width: `${60 + Math.random() * 80}px`,
            height: '1px',
            background: `linear-gradient(90deg, transparent, rgba(255,255,255,${0.04 + Math.random() * 0.06}), transparent)`,
          }}
          animate={{ x: ['0vw', '120vw'] }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
        />
      ))}

      {/* Atmosphere lines + Earth container */}
      <div
        className="relative w-full"
        style={{ height: totalLayerHeight + 280 }}
      >
        {layers.map((layer, idx) => {
          const radius = earthRadius + layerOffsets[idx];
          const extraDown = idx === 2 ? 127 : idx === 3 ? 52 : 0;
          const yLine1 = radius - layerOffsets[idx] + 129 + extraDown;
          const yLine2 = radius - layerOffsets[idx] + 137 + extraDown;

          return (
            <motion.div
              key={idx}
              className="absolute left-1/2 atmosphere-layer"
              style={{
                width: radius * 2,
                height: radius * 2,
                marginLeft: -radius,
                bottom: -(radius) - 260,
                borderRadius: '50%',
                border: `1.5px solid ${layer.borderColor}`,
                pointerEvents: 'auto',
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
                boxShadow: `inset 0 0 80px ${layer.borderColor}, inset 0 0 40px ${layer.borderColor}, inset 0 0 120px ${layer.innerColor}`,
                animation: `atmosphere-breathe 8s cubic-bezier(0.4, 0, 0.2, 1) infinite ${idx * 0.6}s, layer-glow-cascade 12s cubic-bezier(0.4, 0, 0.2, 1) infinite ${(4 - idx) * 1}s`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
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

        {/* Earth model */}
        <motion.div
          className="absolute left-1/2 z-10 flex items-center justify-center pointer-events-auto"
          style={{
            width: 2000,
            height: 2000,
            marginLeft: -1000,
            bottom: -900,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            ref={earthRef}
            className="relative w-[400px] h-[400px] md:w-[550px] md:h-[550px] lg:w-[576px] lg:h-[576px] rounded-full cursor-grab active:cursor-grabbing"
            onMouseLeave={() => setEarthScale(1)}
            onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            style={{
              transform: `scale(${earthScale})`,
              transition: earthScale === 1 ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
          >
            {/* @ts-expect-error - model-viewer is a web component */}
            <model-viewer
              src="https://pub-37f5a13b98614f0ebd7e5db4e5874f30.r2.dev/earth1.glb"
              alt="3D Earth Model"
              autoplay
              auto-rotate
              rotation-per-second="15deg"
              camera-controls
              disable-zoom
              disable-tap
              interaction-prompt="none"
              loading="eager"
              reveal="auto"
              style={{ width: '100%', height: '100%', background: 'transparent' }}
            />
          </div>
        </motion.div>
      </div>

      <style>{`
        .atmosphere-layer {
          /* base — overridden inline with combined animations */
        }
        @keyframes layer-glow-cascade {
          0% { filter: drop-shadow(0 0 0px transparent); }
          5% { filter: drop-shadow(0 0 35px rgba(140, 210, 255, 0.6)); }
          50% { filter: drop-shadow(0 0 35px rgba(140, 210, 255, 0.6)); }
          62% { filter: drop-shadow(0 0 0px transparent); }
          100% { filter: drop-shadow(0 0 0px transparent); }
        }
        @keyframes atmosphere-breathe {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 1; }
        }
        @keyframes edu-carousel {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .edu-text-carousel {
          animation: edu-carousel 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .edu-text-hidden {
          opacity: 0;
        }
        .edu-delay-2-1 { animation-delay: 0.3s; opacity: 0; }
        .edu-delay-2-2 { animation-delay: 0.5s; opacity: 0; }
        .edu-delay-3-1 { animation-delay: 0.7s; opacity: 0; }
        .edu-delay-3-2 { animation-delay: 0.9s; opacity: 0; }
        .edu-delay-4-1 { animation-delay: 1.1s; opacity: 0; }
        .edu-delay-4-2 { animation-delay: 1.3s; opacity: 0; }
      `}</style>
    </section>
  );
}
