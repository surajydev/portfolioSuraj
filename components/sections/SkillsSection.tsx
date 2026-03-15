'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Planet-Skill Mapping (ordered by priority, inner → outer orbit) ─── */
/* Real solar system diameter ratios (relative to Earth = 1):
   Mercury: 0.38, Venus: 0.95, Earth: 1.0, Mars: 0.53,
   Jupiter: 11.2, Saturn: 9.45, Uranus: 4.0, Neptune: 3.88, Pluto: 0.19
   Scaled down to fit UI (base size ~28px for Earth) */

interface PlanetSkill {
  name: string;
  category: string;
  planet: string;
  image: string;
  size: number;       // px diameter (proportional to real ratios)
  orbitA: number;     // semi-major axis (horizontal radius)
  orbitB: number;     // semi-minor axis (vertical radius)
  duration: number;   // orbit period in seconds
  startAngle: number; // initial angle offset in degrees
  color: string;
}

const planets: PlanetSkill[] = [
  {
    name: 'JavaScript',
    category: 'Language',
    planet: 'Mercury',
    image: '/mercury.png',
    size: 24,
    orbitA: 100,
    orbitB: 50,
    duration: 12,
    startAngle: 0,
    color: '#f7df1e',
  },
  {
    name: 'React',
    category: 'Framework',
    planet: 'Venus',
    image: '/venus.jpeg',
    size: 36,
    orbitA: 160,
    orbitB: 82,
    duration: 16,
    startAngle: 45,
    color: '#61dafb',
  },
  {
    name: 'HTML/CSS',
    category: 'Frontend',
    planet: 'Earth',
    image: '/earth.png',
    size: 40,
    orbitA: 220,
    orbitB: 114,
    duration: 20,
    startAngle: 120,
    color: '#e34c26',
  },
  {
    name: 'C++',
    category: 'Language',
    planet: 'Mars',
    image: '/mars.jpeg',
    size: 28,
    orbitA: 275,
    orbitB: 143,
    duration: 25,
    startAngle: 200,
    color: '#f34b7d',
  },
  {
    name: 'Java / Spring',
    category: 'Backend',
    planet: 'Jupiter',
    image: '/jupiter.png',
    size: 70,
    orbitA: 355,
    orbitB: 185,
    duration: 35,
    startAngle: 90,
    color: '#b07219',
  },
  {
    name: 'Node.js',
    category: 'Runtime',
    planet: 'Saturn',
    image: '/saturn.png',
    size: 60,
    orbitA: 440,
    orbitB: 228,
    duration: 42,
    startAngle: 270,
    color: '#68a063',
  },
  {
    name: 'Docker / Kafka',
    category: 'DevOps',
    planet: 'Uranus',
    image: '/uranus.png',
    size: 46,
    orbitA: 515,
    orbitB: 268,
    duration: 50,
    startAngle: 160,
    color: '#0db7ed',
  },
  {
    name: 'Python',
    category: 'Language',
    planet: 'Neptune',
    image: '/neptune.png',
    size: 42,
    orbitA: 580,
    orbitB: 302,
    duration: 58,
    startAngle: 300,
    color: '#3776ab',
  },
  {
    name: 'Figma / UI-UX',
    category: 'Design',
    planet: 'Pluto',
    image: '/pluto.png',
    size: 18,
    orbitA: 635,
    orbitB: 330,
    duration: 65,
    startAngle: 30,
    color: '#a259ff',
  },
];

/* ─── Orbit Path Component ─── */
function OrbitPath({ a, b }: { a: number; b: number; color: string }) {
  return (
    <ellipse
      cx={0}
      cy={0}
      rx={a}
      ry={b}
      fill="none"
      stroke="#ffffff"
      strokeWidth={0.4}
      opacity={0.15}
    />
  );
}

/* ─── Orbiting Planet Component ─── */
function OrbitingPlanet({ planet, onClick }: { planet: PlanetSkill; onClick?: () => void }) {
  const { name, category, image, size, orbitA, orbitB, duration, startAngle, color } = planet;

  // Generate keyframes for elliptical orbit (smooth 360° path)
  const steps = 120;
  const xKeyframes: number[] = [];
  const yKeyframes: number[] = [];
  const half = size / 2;

  for (let i = 0; i <= steps; i++) {
    const angle = ((startAngle + (i / steps) * 360) * Math.PI) / 180;
    // Offset by -half so the planet CENTER sits on the orbit line
    xKeyframes.push(Math.cos(angle) * orbitA - half);
    yKeyframes.push(Math.sin(angle) * orbitB - half);
  }

  return (
    <motion.div
      className={`absolute pointer-events-auto group ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ left: 0, top: 0 }}
      onClick={onClick}
      animate={{
        x: xKeyframes,
        y: yKeyframes,
      }}
      transition={{
        duration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <div className="flex items-center gap-2">
      {/* Planet image */}
      <div
        className="relative flex-shrink-0 rounded-full overflow-hidden"
        style={{
          width: size,
          height: size,
          boxShadow: `0 0 ${size * 0.6}px ${color}30, 0 0 ${size * 0.2}px ${color}50`,
        }}
      >
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
        {/* Hover glow ring */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 ${size * 0.3}px ${color}40, 0 0 ${size}px ${color}30`,
          }}
        />
      </div>

      {/* Skill label */}
      <div
        className="whitespace-nowrap opacity-70 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        style={{ transform: 'translateX(4px)' }}
      >
        <div
          className="font-orbitron text-[10px] font-semibold tracking-wider"
          style={{ color, textShadow: `0 0 8px ${color}40` }}
        >
          {name}
        </div>
        <div className="font-exo text-[8px] text-[#94a3b8] uppercase tracking-widest">
          {category}
        </div>
      </div>
      </div>
    </motion.div>
  );
}

/* ─── Moon Configurations (real diameter ratios, min 3px for visibility) ─── */
/* Moon/Planet real diameter ratios applied to UI planet sizes.
   Mars moons are microscopic IRL but rendered at 3px minimum. */
interface MoonConfig {
  name: string;
  size: number;
  orbitRadius: number;
  duration: number;
  startAngle: number;
}

const planetMoons: Record<string, MoonConfig[]> = {
  // Earth (40px) — Moon: 3474/12742 = 0.27 → 11px
  Earth: [
    { name: 'Moon', size: 11, orbitRadius: 32, duration: 5, startAngle: 0 },
  ],
  // Mars (28px) — Phobos: 22/6779 ≈ 0.003, Deimos: 12/6779 ≈ 0.002 → 3px min
  Mars: [
    { name: 'Phobos', size: 3, orbitRadius: 20, duration: 2, startAngle: 0 },
    { name: 'Deimos', size: 3, orbitRadius: 26, duration: 3.5, startAngle: 180 },
  ],
  // Jupiter (70px) — Galilean moons: Io/Europa/Ganymede/Callisto
  Jupiter: [
    { name: 'Io', size: 3, orbitRadius: 44, duration: 2.5, startAngle: 0 },
    { name: 'Europa', size: 3, orbitRadius: 50, duration: 3.5, startAngle: 90 },
    { name: 'Ganymede', size: 4, orbitRadius: 56, duration: 4.5, startAngle: 180 },
    { name: 'Callisto', size: 4, orbitRadius: 62, duration: 6, startAngle: 270 },
  ],
  // Saturn (60px) — 7 major moons
  Saturn: [
    { name: 'Mimas', size: 3, orbitRadius: 36, duration: 2, startAngle: 0 },
    { name: 'Enceladus', size: 3, orbitRadius: 40, duration: 2.5, startAngle: 51 },
    { name: 'Tethys', size: 3, orbitRadius: 44, duration: 3, startAngle: 103 },
    { name: 'Dione', size: 3, orbitRadius: 48, duration: 3.5, startAngle: 154 },
    { name: 'Rhea', size: 3, orbitRadius: 52, duration: 4, startAngle: 206 },
    { name: 'Titan', size: 4, orbitRadius: 58, duration: 5, startAngle: 257 },
    { name: 'Iapetus', size: 3, orbitRadius: 64, duration: 6.5, startAngle: 309 },
  ],
  // Uranus (46px) — 5 major moons
  Uranus: [
    { name: 'Miranda', size: 3, orbitRadius: 28, duration: 2, startAngle: 0 },
    { name: 'Ariel', size: 3, orbitRadius: 33, duration: 2.8, startAngle: 72 },
    { name: 'Umbriel', size: 3, orbitRadius: 38, duration: 3.5, startAngle: 144 },
    { name: 'Titania', size: 3, orbitRadius: 43, duration: 4.5, startAngle: 216 },
    { name: 'Oberon', size: 3, orbitRadius: 48, duration: 5.5, startAngle: 288 },
  ],
  // Neptune (42px) — Triton + Nereid
  Neptune: [
    { name: 'Triton', size: 3, orbitRadius: 28, duration: 3, startAngle: 0 },
    { name: 'Nereid', size: 3, orbitRadius: 36, duration: 5.5, startAngle: 180 },
  ],
  // Pluto (18px) — Charon: 1212/2377 = 0.51 → 9px
  Pluto: [
    { name: 'Charon', size: 9, orbitRadius: 16, duration: 3, startAngle: 0 },
    { name: 'Nix', size: 3, orbitRadius: 22, duration: 4, startAngle: 72 },
    { name: 'Hydra', size: 3, orbitRadius: 26, duration: 5, startAngle: 144 },
    { name: 'Kerberos', size: 3, orbitRadius: 20, duration: 3.5, startAngle: 216 },
    { name: 'Styx', size: 3, orbitRadius: 18, duration: 2.5, startAngle: 288 },
  ],
};

/* ─── Generalized Moon Sub-Orbit Component ─── */
function PlanetMoonOrbit({ planet, moon }: { planet: PlanetSkill; moon: MoonConfig }) {
  const { orbitA, orbitB, duration: parentDuration, startAngle: parentStart } = planet;
  const moonHalf = moon.size / 2;
  const steps = 120;
  const xKeyframes: number[] = [];
  const yKeyframes: number[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Parent planet position on solar orbit
    const pAngle = ((parentStart + t * 360) * Math.PI) / 180;
    const pX = Math.cos(pAngle) * orbitA;
    const pY = Math.sin(pAngle) * orbitB;
    // Moon sub-orbit around parent
    const moonRevs = parentDuration / moon.duration;
    const mAngle = ((moon.startAngle + t * 360 * moonRevs) * Math.PI) / 180;
    xKeyframes.push(pX + Math.cos(mAngle) * moon.orbitRadius - moonHalf);
    yKeyframes.push(pY + Math.sin(mAngle) * moon.orbitRadius - moonHalf);
  }

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: 0, top: 0 }}
      animate={{ x: xKeyframes, y: yKeyframes }}
      transition={{ duration: parentDuration, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
    >
      <div
        className="rounded-full overflow-hidden"
        style={{
          width: moon.size,
          height: moon.size,
          boxShadow: `0 0 ${Math.max(3, moon.size * 0.5)}px rgba(200,200,220,0.4)`,
        }}
      >
        <img
          src="/moon.png"
          alt={moon.name}
          className="w-full h-full object-cover rounded-full"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}

/* ─── Pole Star (Polaris) ─── */
function PoleStar() {
  return (
    <div
      className="absolute z-10"
      style={{ top: 45, right: 60 }}
    >
      {/* Outer glow — slow pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 28,
          height: 28,
          top: -10,
          left: -10,
          background: 'radial-gradient(circle, rgba(220,240,255,0.25) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.6, 1, 1.3, 1], opacity: [0.4, 1, 0.3, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Star cross rays — twinkle */}
      <motion.div
        className="absolute"
        style={{
          width: 1,
          height: 18,
          top: -5,
          left: 3.5,
          background: 'linear-gradient(to bottom, transparent, rgba(220,240,255,0.8), transparent)',
        }}
        animate={{ scaleY: [1, 1.5, 0.6, 1.3, 1], opacity: [0.6, 1, 0.3, 0.9, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute"
        style={{
          width: 18,
          height: 1,
          top: 3.5,
          left: -5,
          background: 'linear-gradient(to right, transparent, rgba(220,240,255,0.8), transparent)',
        }}
        animate={{ scaleX: [1, 1.5, 0.6, 1.3, 1], opacity: [0.6, 1, 0.3, 0.9, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Core — twinkle brightness */}
      <motion.div
        className="rounded-full"
        style={{
          width: 8,
          height: 8,
          background: 'radial-gradient(circle, #f0f4ff 0%, #a8c8ff 60%, transparent 100%)',
          boxShadow: '0 0 4px #ddeaff, 0 0 10px rgba(180,210,255,0.5)',
        }}
        animate={{
          scale: [1, 1.2, 0.9, 1.15, 1],
          opacity: [0.8, 1, 0.5, 1, 0.8],
          boxShadow: [
            '0 0 4px #ddeaff, 0 0 10px rgba(180,210,255,0.5)',
            '0 0 8px #ddeaff, 0 0 20px rgba(180,210,255,0.8)',
            '0 0 3px #ddeaff, 0 0 6px rgba(180,210,255,0.3)',
            '0 0 7px #ddeaff, 0 0 16px rgba(180,210,255,0.7)',
            '0 0 4px #ddeaff, 0 0 10px rgba(180,210,255,0.5)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Label */}
      <div
        className="absolute font-orbitron text-[7px] text-[#a8c8ff] tracking-[0.15em] whitespace-nowrap"
        style={{ top: 14, left: -8, opacity: 0.7 }}
      >
        POLARIS
      </div>
    </div>
  );
}

/* ─── Seamless Video Background Hook ─── */
const FADE_DURATION = 1.5; // seconds for crossfade
const VIDEO_SRC = '/323-135992580.mp4';

function useSeamlessVideoLoop() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<'A' | 'B'>('A');

  const handleTimeUpdate = useCallback((source: 'A' | 'B') => {
    const current = source === 'A' ? videoARef.current : videoBRef.current;
    const next = source === 'A' ? videoBRef.current : videoARef.current;
    if (!current || !next) return;

    const timeLeft = current.duration - current.currentTime;
    if (timeLeft <= FADE_DURATION && activeVideo === source) {
      // Start the next video and crossfade
      next.currentTime = 0;
      next.play().catch(() => {});
      setActiveVideo(source === 'A' ? 'B' : 'A');
    }
  }, [activeVideo]);

  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return;

    const onTimeA = () => handleTimeUpdate('A');
    const onTimeB = () => handleTimeUpdate('B');
    vA.addEventListener('timeupdate', onTimeA);
    vB.addEventListener('timeupdate', onTimeB);

    // Kick off video A
    vA.play().catch(() => {});

    return () => {
      vA.removeEventListener('timeupdate', onTimeA);
      vB.removeEventListener('timeupdate', onTimeB);
    };
  }, [handleTimeUpdate]);

  return { videoARef, videoBRef, activeVideo };
}

/* ─── Main Component ─── */
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { videoARef, videoBRef, activeVideo } = useSeamlessVideoLoop();
  const [zoomedOnEarth, setZoomedOnEarth] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 overflow-hidden"
      style={{ minHeight: '800px' }}
    >
      {/* Seamless Looping Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoARef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.55) saturate(1.2)',
            opacity: activeVideo === 'A' ? 1 : 0,
            transition: `opacity ${FADE_DURATION}s ease-in-out`,
          }}
        />
        <video
          ref={videoBRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.55) saturate(1.2)',
            opacity: activeVideo === 'B' ? 1 : 0,
            transition: `opacity ${FADE_DURATION}s ease-in-out`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/60 via-[#020817]/30 to-[#020817]/60" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#020817] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#020817] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-white uppercase tracking-wider hover-glow cursor-default">
            Skills
          </h2>
          <p className="font-exo text-sm text-[#94a3b8] mt-2">Each planet orbits a skill — closer means higher priority</p>
          <div className="h-0.5 mt-3 mx-auto w-24 bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent" />
        </motion.div>

        {/* Solar System Container */}
        <div
          className="relative mx-auto"
          style={{ width: '100%', height: '700px' }}
        >
          {/* Orbit center reference point */}
          {(() => {
            const CX = '50%';
            const CY = 350; // vertical center of the container
            return (
              <>
                {/* SVG Orbit Paths */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ overflow: 'visible' }}
                >
                  {planets.map((p) => (
                    <ellipse
                      key={p.planet}
                      cx="50%"
                      cy={CY}
                      rx={p.orbitA}
                      ry={p.orbitB}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth={0.6}
                      opacity={0.18}
                    />
                  ))}
                </svg>

                {/* Sun */}
                <motion.div
                  className="absolute z-20"
                  style={{
                    left: CX,
                    top: CY,
                    marginLeft: -55,
                    marginTop: -55,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <div
                    className="relative rounded-full overflow-hidden"
                    style={{
                      width: 110,
                      height: 110,
                      boxShadow: '0 0 60px rgba(255, 200, 50, 0.5), 0 0 120px rgba(255, 150, 0, 0.3), 0 0 200px rgba(255, 100, 0, 0.15)',
                    }}
                  >
                    <img
                      src="/sunnn.png"
                      alt="Sun — Skills Core"
                      className="w-full h-full object-cover rounded-full"
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: 'inset 0 0 30px rgba(255, 200, 50, 0.3)' }}
                      animate={{
                        boxShadow: [
                          'inset 0 0 30px rgba(255, 200, 50, 0.3)',
                          'inset 0 0 50px rgba(255, 200, 50, 0.5)',
                          'inset 0 0 30px rgba(255, 200, 50, 0.3)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <span className="font-orbitron text-[10px] text-[#ffd700] uppercase tracking-[0.3em]">
                      Core
                    </span>
                  </div>
                </motion.div>

                {/* Orbiting Planets — origin at sun center */}
                <div
                  className="absolute"
                  style={{
                    left: CX,
                    top: CY,
                    width: 0,
                    height: 0,
                  }}
                >
                  {planets.map((p) => (
                    <OrbitingPlanet
                      key={p.planet}
                      planet={p}
                      onClick={p.planet === 'Earth' ? () => setZoomedOnEarth(true) : undefined}
                    />
                  ))}
                  {/* All planet moons */}
                  {planets.map((p) =>
                    (planetMoons[p.planet] || []).map((moon) => (
                      <PlanetMoonOrbit key={`${p.planet}-${moon.name}`} planet={p} moon={moon} />
                    ))
                  )}
                </div>

                {/* Pole Star */}
                <PoleStar />
              </>
            );
          })()}
        </div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {planets.map((p) => (
            <div key={p.planet} className="flex items-center gap-1.5 cursor-default group">
              <div
                className="w-2.5 h-2.5 rounded-full group-hover:scale-150 transition-transform duration-300"
                style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}60` }}
              />
              <span className="font-exo text-[10px] text-[#94a3b8] group-hover:text-white transition-colors duration-300">
                {p.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Earth Zoom-Through Transition to Projects */}
      <AnimatePresence>
        {zoomedOnEarth && (
          <EarthZoomTransition onComplete={() => setZoomedOnEarth(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Earth Zoom-Through Transition ─── */
function EarthZoomTransition({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'zoom-in' | 'zoom-deep' | 'fade-out'>('zoom-in');

  useEffect(() => {
    // Phase 1 → Phase 2: gentle zoom deeper after initial zoom
    const t1 = setTimeout(() => setPhase('zoom-deep'), 1200);
    // Phase 2 → Phase 3: fade out and scroll to projects
    const t2 = setTimeout(() => {
      setPhase('fade-out');
      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
    // Cleanup overlay
    const t3 = setTimeout(() => onComplete(), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #0a1628 0%, #000000 100%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: phase === 'fade-out' ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: phase === 'fade-out' ? 1 : 0.6, ease: 'easeInOut' }}
    >
      {/* Stars streaking past during zoom */}
      {Array.from({ length: 60 }).map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: 2,
              height: phase === 'zoom-deep' ? 12 : 2,
              top: `${y}%`,
              left: `${x}%`,
              transition: 'height 0.5s ease',
            }}
            animate={{
              opacity: phase === 'zoom-deep' ? [0.8, 0] : [0.2, 0.6, 0.2],
              y: phase === 'zoom-deep' ? [0, (y > 50 ? 200 : -200)] : 0,
              x: phase === 'zoom-deep' ? [0, (x > 50 ? 100 : -100)] : 0,
            }}
            transition={{
              duration: phase === 'zoom-deep' ? 1.5 : 2 + Math.random() * 2,
              ease: 'easeOut',
              repeat: phase === 'zoom-deep' ? 0 : Infinity,
              delay: Math.random() * 0.5,
            }}
          />
        );
      })}

      {/* Earth zooming in */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          scale: phase === 'zoom-in' ? 1 : phase === 'zoom-deep' ? 4 : 5,
          opacity: phase === 'fade-out' ? 0 : 1,
        }}
        initial={{ scale: 0.1, opacity: 0 }}
        transition={{
          scale: {
            duration: phase === 'zoom-in' ? 1 : 1.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
          opacity: { duration: 0.6, ease: 'easeInOut' },
        }}
      >
        <div className="relative">
          <div
            className="rounded-full overflow-hidden"
            style={{
              width: 250,
              height: 250,
              boxShadow: '0 0 60px rgba(100,180,255,0.3), 0 0 120px rgba(50,120,200,0.15), inset -20px -10px 40px rgba(0,0,0,0.4)',
            }}
          >
            <img
              src="/earth.png"
              alt="Earth"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          {/* Moon */}
          <motion.div
            className="absolute"
            style={{ top: 125, left: 125 }}
            animate={{
              x: Array.from({ length: 121 }, (_, i) => Math.cos((i / 120) * Math.PI * 2) * 170 - 17),
              y: Array.from({ length: 121 }, (_, i) => Math.sin((i / 120) * Math.PI * 2) * 170 - 17),
            }}
            transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{ width: 34, height: 34, boxShadow: '0 0 12px rgba(200,200,220,0.4)' }}
            >
              <img src="/moon.png" alt="Moon" className="w-full h-full object-cover rounded-full" draggable={false} />
            </div>
          </motion.div>

          {/* Atmospheric glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 40px rgba(100,180,255,0.2)' }}
            animate={{
              boxShadow: [
                '0 0 40px rgba(100,180,255,0.2)',
                '0 0 60px rgba(100,180,255,0.35)',
                '0 0 40px rgba(100,180,255,0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Label — only in phase 1 */}
        <motion.div
          className="mt-8 text-center"
          animate={{ opacity: phase === 'zoom-in' ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <h3
            className="font-orbitron text-2xl font-bold tracking-wider"
            style={{ color: '#e34c26', textShadow: '0 0 20px rgba(227,76,38,0.4)' }}
          >
            HTML / CSS
          </h3>
          <p className="font-exo text-sm text-[#94a3b8] mt-1 uppercase tracking-widest">Frontend</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
