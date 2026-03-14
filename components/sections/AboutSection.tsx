'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CosmicBackground from '../CosmicBackground';

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

const softSkills = ['Innovative', 'Research-Oriented', 'Interactive', 'Adaptive', 'Strategic Problem-Solving'];

const hobbies = [
  { emoji: '🚀', label: 'Space Exploration' },
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '📚', label: 'Reading Sci-Fi' },
  { emoji: '🎨', label: 'UI Design' },
  { emoji: '🏋️', label: 'Fitness' },
  { emoji: '🎵', label: 'Music' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <CosmicBackground variant="nebula" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00d4ff] text-glow-cyan uppercase inline-block">
            About Me
          </h2>
          <div className="h-0.5 mt-2 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column — Avatar */}
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <div className="relative mb-8">
              <div
                className="absolute -inset-4 rounded-full border border-dashed border-[#00d4ff]/30"
                style={{ animation: 'rotateRing 12s linear infinite' }}
              />
              <div
                className="w-40 h-40 rounded-full border-[3px] border-[#00d4ff] flex items-center justify-center"
                style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)' }}
              >
                <span className="font-orbitron text-4xl font-bold text-[#00d4ff] text-glow-cyan">SY</span>
              </div>
            </div>

            {/* Stat cards */}
            <div className="flex gap-4">
              {[
                { num: 8.6, label: 'CGPA', isDecimal: true },
                { num: 3, label: 'Projects', suffix: '+' },
                { num: 5, label: 'Certificates', suffix: '+' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center min-w-[80px]">
                  <div className="font-orbitron text-xl font-bold text-[#00d4ff]">
                    <AnimatedNumber target={stat.num} />
                    {stat.suffix || ''}
                  </div>
                  <div className="font-orbitron text-[9px] text-[#94a3b8] uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Bio */}
          <div>
            <motion.p
              className="font-exo text-[#94a3b8] leading-relaxed mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              I&apos;m a Computer Science Engineering student passionate about building scalable systems and intuitive interfaces. I blend backend engineering with UI/UX design thinking to craft products that are both powerful and elegant. Whether it&apos;s architecting microservices with Spring Boot and Kafka, or wireframing pixel-perfect screens in Figma — I approach every challenge with curiosity and precision.
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="font-exo text-xs px-3 py-1.5 rounded-full border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-4">Hobbies & Interests</h3>
              <div className="grid grid-cols-3 gap-2">
                {hobbies.map((hobby) => (
                  <div
                    key={hobby.label}
                    className="glass rounded-lg px-3 py-2.5 text-center hover:border-[#00ff9d]/40 hover:scale-[1.03] transition-all duration-300"
                  >
                    <div className="text-lg mb-1">{hobby.emoji}</div>
                    <div className="font-exo text-[10px] text-[#94a3b8]">{hobby.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
