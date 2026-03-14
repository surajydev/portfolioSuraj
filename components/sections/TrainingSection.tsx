'use client';

import { motion } from 'framer-motion';
import { BookOpen, Sprout, Zap, Target, CheckCircle2 } from 'lucide-react';
import CosmicBackground from '../CosmicBackground';

const trainingBullets = [
  'Explored core Design Thinking concepts, improving ability to frame problems and identify user pain points through structured exercises.',
  'Practiced Figma for wireframing and prototyping, strengthening layout and interaction design skills across weekly tasks.',
  'Applied user feedback and design principles to refine interfaces, enhancing usability evaluation skills during guided reviews.',
];

const trainingTech = ['Figma', 'Design Thinking Frameworks', 'UX Research Tools'];

const activities = [
  {
    icon: Sprout,
    iconBg: '#00ff9d',
    color: '#00ff9d',
    title: 'NGO Community Leadership',
    desc: 'Led NGO-based community drives, coordinating awareness and plantation activities with 50+ participants.',
    badge: null,
  },
  {
    icon: Zap,
    iconBg: '#00d4ff',
    color: '#00d4ff',
    title: 'Binary Blitz Hackathon',
    desc: 'Qualified for Round 2 among 20+ competing teams through competitive coding and problem-solving.',
    badge: 'Round 2 Qualifier',
  },
  {
    icon: Target,
    iconBg: '#0066ff',
    color: '#0066ff',
    title: 'Student Event Coordinator',
    desc: 'Organized operations as Student Coordinator during the Inter Hostel Competition managing logistics for 100+ students.',
    badge: '100+ Students',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function TrainingSection() {
  return (
    <section id="training" className="relative py-24 overflow-hidden">
      <CosmicBackground variant="binary" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00ff9d] text-glow-green uppercase">
            Training
          </h2>
          <div className="h-0.5 mt-2 bg-gradient-to-r from-transparent via-[#00ff9d] to-transparent" />
        </motion.div>

        {/* Featured Training Card */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div
            className="glass rounded-xl p-8 relative overflow-hidden"
            style={{
              borderImage: 'conic-gradient(from var(--border-angle, 0deg), transparent 25%, #00ff9d 50%, transparent 75%) 1',
              animation: 'borderRotate 4s linear infinite',
              borderWidth: '2px',
              borderStyle: 'solid',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#00ff9d]/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-[#00ff9d]" />
                </div>
              </div>
              <span className="font-exo text-xs px-3 py-1 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/25">
                Jun 2025 – Jul 2025
              </span>
            </div>

            <h3 className="font-orbitron text-xl font-semibold text-[#e2e8f0] mb-2">Think Design Prototype</h3>
            <p className="font-exo text-sm text-[#94a3b8] mb-6">Design Thinking & Figma Certification Training</p>

            <ul className="space-y-3 mb-6">
              {trainingBullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00ff9d] mt-0.5 flex-shrink-0" />
                  <span className="font-exo text-sm text-[#94a3b8] leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {trainingTech.map((t) => (
                <span key={t} className="font-exo text-xs px-3 py-1 rounded-lg bg-[#00ff9d]/5 text-[#00ff9d] border border-[#00ff9d]/25">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Extra-Curricular Activities */}
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-6">Extra-Curricular Activities</h3>
        </motion.div>

        <div className="space-y-4">
          {activities.map((act) => (
            <motion.div
              key={act.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <div
                className="glass rounded-xl p-5 flex items-start gap-4"
                style={{ borderLeftWidth: '3px', borderLeftColor: act.color }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${act.iconBg}15` }}
                >
                  <act.icon size={18} style={{ color: act.iconBg }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-orbitron text-sm font-semibold text-[#e2e8f0] mb-1">{act.title}</h4>
                  <p className="font-exo text-xs text-[#94a3b8] leading-relaxed">{act.desc}</p>
                  {act.badge && (
                    <span
                      className="inline-block mt-2 font-exo text-[10px] px-2 py-0.5 rounded-full"
                      style={{ color: act.color, backgroundColor: `${act.color}10`, border: `1px solid ${act.color}25` }}
                    >
                      {act.badge}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
