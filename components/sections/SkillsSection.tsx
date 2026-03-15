'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

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
function OrbitingPlanet({ planet }: { planet: PlanetSkill }) {
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
      className="absolute pointer-events-auto cursor-default group"
      style={{ left: 0, top: 0 }}
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

/* ─── Main Component ─── */
export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 overflow-hidden"
      style={{ minHeight: '800px' }}
    >
      {/* Starry Night Sky Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/beautiful-view-stars-night-sky.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.35) saturate(1.2)' }}
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
                    <OrbitingPlanet key={p.planet} planet={p} />
                  ))}
                </div>
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
    </section>
  );
}
