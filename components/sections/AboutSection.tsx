'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CosmicBackground from '../CosmicBackground';

/* ─── Animated counter ─── */
function AnimatedNumber({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * target).toFixed(target % 1 !== 0 ? 2 : 0)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span ref={ref}>{value}</span>;
}

/* ─── Data ─── */
const softSkills = ['Innovative', 'Research-Oriented', 'Interactive', 'Adaptive', 'Strategic Problem-Solving'];

const hobbies = [
  { emoji: '🚀', label: 'Space Exploration' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '📚', label: 'Reading Sci-Fi' },
  { emoji: '🎨', label: 'UI Design' },
  { emoji: '🏋️', label: 'Fitness' },
  { emoji: '🎵', label: 'Music' },
];

const stats = [
  { num: 8.6, label: 'CGPA', isDecimal: true },
  { num: 3, label: 'Projects', suffix: '+' },
  { num: 5, label: 'Certificates', suffix: '+' },
];

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

/* ─── Component ─── */
export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden section-highlight">
      <CosmicBackground variant="nebula" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00d4ff] text-glow-cyan uppercase inline-block hover-glow cursor-default">
            About Me
          </h2>
          <div className="h-0.5 mt-2 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN: Avatar with orbiting text + Stats ── */}
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {/* Avatar Ring with orbiting text */}
            <div className="relative w-[280px] h-[280px] flex items-center justify-center mb-10">
              {/* Outer rotating dashed ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#00d4ff]/20"
                style={{ animation: 'rotateRing 15s linear infinite' }}
              />

              {/* SVG Orbiting Text */}
              <svg
                className="absolute inset-[-20px] w-[320px] h-[320px] orbit-text-ring"
                viewBox="0 0 320 320"
              >
                <defs>
                  <path
                    id="orbitPath"
                    d="M 160,160 m -145,0 a 145,145 0 1,1 290,0 a 145,145 0 1,1 -290,0"
                  />
                </defs>
                <text className="fill-[#00d4ff]/40" style={{ fontSize: '11px', letterSpacing: '0.35em', fontFamily: 'Orbitron, sans-serif' }}>
                  <textPath href="#orbitPath">
                    DEVELOPER • DESIGNER • ENGINEER • ARCHITECT • INNOVATOR •&nbsp;
                  </textPath>
                </text>
              </svg>

              {/* Inner glow ring */}
              <div
                className="absolute inset-[20px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, rgba(0,212,255,0.15), transparent, rgba(139,92,246,0.1), transparent)',
                  animation: 'rotateRingReverse 10s linear infinite',
                }}
              />

              {/* Avatar circle */}
              <div
                className="relative w-[200px] h-[200px] rounded-full border-[3px] border-[#00d4ff]/60 flex items-center justify-center overflow-hidden group"
                style={{
                  boxShadow: '0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(0,212,255,0.1), inset 0 0 30px rgba(0,212,255,0.1)',
                }}
              >
                {/* Profile photo */}
                <div className="absolute inset-0 bg-black" />
                <img
                  src="/profile.jpg"
                  alt="Suraj Yadav"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ marginLeft: '15px', marginTop: '5px' }}
                />

                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(135deg, transparent 40%, rgba(0,212,255,0.08) 50%, transparent 60%)',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Floating particles around avatar */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <motion.div
                  key={deg}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#00d4ff' : '#a78bfa',
                    top: `${50 + 48 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 48 * Math.cos((deg * Math.PI) / 180)}%`,
                    boxShadow: `0 0 8px ${i % 2 === 0 ? '#00d4ff' : '#a78bfa'}`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Stat cards */}
            <motion.div
              className="flex gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeIn}
                  className="glass rounded-xl px-5 py-3 text-center min-w-[80px] hover:border-[#00d4ff]/40 hover:scale-105 transition-all duration-300 cursor-default"
                >
                  <div className="font-orbitron text-xl font-bold text-[#00d4ff]">
                    <AnimatedNumber target={stat.num} />
                    {stat.suffix || ''}
                  </div>
                  <div className="font-orbitron text-[9px] text-[#94a3b8] uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Bio + Soft Skills + Hobbies ── */}
          <div className="space-y-8">
            {/* Bio */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-4 hover-glow cursor-default inline-block">
                Who I Am
              </h3>
              <p className="font-exo text-[#94a3b8] leading-[1.9] text-[15px]">
                I&apos;m a{' '}
                <span className="text-[#00d4ff] hover-glow cursor-default">Computer Science Engineering</span>{' '}
                student passionate about building{' '}
                <span className="text-[#00ff9d] hover-glow cursor-default">scalable systems</span>{' '}
                and{' '}
                <span className="text-[#a78bfa] hover-glow cursor-default">intuitive interfaces</span>.
                I blend backend engineering with UI/UX design thinking to craft products
                that are both powerful and elegant. Whether it&apos;s architecting{' '}
                <span className="text-[#00d4ff] hover-glow cursor-default">microservices with Spring Boot and Kafka</span>,
                or wireframing pixel-perfect screens in{' '}
                <span className="text-[#00ff9d] hover-glow cursor-default">Figma</span>{' '}
                — I approach every challenge with curiosity and precision.
              </p>
            </motion.div>

            {/* Soft Skills */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-4 hover-glow cursor-default inline-block">
                Soft Skills
              </h3>
              <motion.div
                className="flex flex-wrap gap-2.5"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {softSkills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={fadeIn}
                    className="font-exo text-xs px-4 py-2 rounded-full border border-[#00d4ff]/25 text-[#00d4ff] bg-[#00d4ff]/5 cursor-default
                      hover:bg-[#00d4ff]/15 hover:border-[#00d4ff]/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]
                      transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Hobbies */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-4 hover-glow cursor-default inline-block">
                Hobbies & Interests
              </h3>
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-6 gap-3"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.label}
                    variants={fadeIn}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="glass rounded-xl px-3 py-3 text-center cursor-default hover:border-[#00ff9d]/40 transition-all duration-300 group"
                  >
                    <motion.div
                      className="text-xl mb-1.5"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {hobby.emoji}
                    </motion.div>
                    <div className="font-exo text-[10px] text-[#94a3b8] group-hover:text-[#e2e8f0] transition-colors duration-300">
                      {hobby.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
