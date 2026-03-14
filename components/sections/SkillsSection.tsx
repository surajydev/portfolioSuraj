'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Database, Palette } from 'lucide-react';
import CosmicBackground from '../CosmicBackground';

interface SkillBar {
  name: string;
  percent: number;
}

const languagesSkills: SkillBar[] = [
  { name: 'C++', percent: 85 },
  { name: 'JavaScript', percent: 88 },
  { name: 'C', percent: 80 },
  { name: 'Java', percent: 75 },
  { name: 'Python', percent: 78 },
];

const frameworkSkills: SkillBar[] = [
  { name: 'HTML/CSS', percent: 90 },
  { name: 'Bootstrap', percent: 82 },
  { name: 'Node.js', percent: 80 },
  { name: 'React', percent: 83 },
  { name: 'Spring', percent: 75 },
];

const toolSkills = ['MySQL', 'AWS', 'MongoDB', 'Docker', 'Kafka', 'Redis', 'API Gateway', 'Eureka', 'JWT'];
const designSkills = ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping', 'Design Thinking'];

function SkillBarRow({ skill, color, animate }: { skill: SkillBar; color: string; animate: boolean }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-exo text-sm text-[#e2e8f0]">{skill.name}</span>
        <span className="font-orbitron text-xs" style={{ color }}>{skill.percent}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#0f172a]">
        <div
          className="h-full rounded-full skill-bar-fill"
          style={{
            width: animate ? `${skill.percent}%` : '0%',
            background: `linear-gradient(90deg, ${color}, #00ff9d)`,
            boxShadow: `0 0 8px ${color}40`,
          }}
        />
      </div>
    </div>
  );
}

function SkillCard({
  title,
  icon: Icon,
  color,
  children,
}: {
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="glass rounded-xl p-6 relative overflow-hidden"
      style={{ borderColor: `${color}20` }}
    >
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}30, transparent, transparent)`,
          animation: 'rotateRing 6s linear infinite',
          opacity: 0.3,
          filter: 'blur(1px)',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <Icon size={20} style={{ color }} />
          <h3 className="font-orbitron text-sm uppercase tracking-wider" style={{ color }}>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function SkillsSection() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <CosmicBackground variant="cluster" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00ff9d] text-glow-green uppercase inline-block">
            Skills
          </h2>
          <div className="h-0.5 mt-2 bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SkillCard title="Languages" icon={Code2} color="#00d4ff">
              {languagesSkills.map((s) => (
                <SkillBarRow key={s.name} skill={s} color="#00d4ff" animate={animate} />
              ))}
            </SkillCard>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SkillCard title="Frameworks" icon={Layers} color="#00ff9d">
              {frameworkSkills.map((s) => (
                <SkillBarRow key={s.name} skill={s} color="#00ff9d" animate={animate} />
              ))}
            </SkillCard>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SkillCard title="Tools & Platforms" icon={Database} color="#0066ff">
              <div className="flex flex-wrap gap-2">
                {toolSkills.map((s) => (
                  <span key={s} className="font-exo text-xs px-3 py-1.5 rounded-lg border border-[#0066ff]/30 text-[#0066ff] bg-[#0066ff]/5">
                    {s}
                  </span>
                ))}
              </div>
            </SkillCard>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <SkillCard title="Design" icon={Palette} color="#00b4d8">
              <div className="flex flex-wrap gap-2">
                {designSkills.map((s) => (
                  <span key={s} className="font-exo text-xs px-3 py-1.5 rounded-lg border border-[#00b4d8]/30 text-[#00b4d8] bg-[#00b4d8]/5">
                    {s}
                  </span>
                ))}
              </div>
            </SkillCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
