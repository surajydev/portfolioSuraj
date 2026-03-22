'use client';

import { motion } from 'framer-motion';
import {
  Rocket, Shield, Cpu, Clock, Zap,
  ChevronRight, MapPin, Calendar, Users, Trophy, TreePine,
  Sparkles, Medal, Crosshair, Signal, Radio, Award,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import CosmicBackground from '../CosmicBackground';
import TypingText from '../TypingText';

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const training = {
  title: 'Think Design Prototype',
  subtitle: 'Design Thinking and Figma',
  location: 'Remote',
  date: 'Jun 2025 – Jul 2025',
  status: 'COMPLETED',
  color: '#00d4ff',
  description: 'Explored core Design Thinking concepts and practiced Figma for wireframing and prototyping.',
  highlights: [
    'Explored core Design Thinking concepts, improving ability to frame problems and identify user pain points by around 30% through structured exercises',
    'Practiced Figma for wireframing and prototyping, strengthening layout and interaction design skills by nearly 40% across weekly tasks',
    'Learned to apply user feedback and design principles to refine interfaces, enhancing usability evaluation skills by about 25% during guided reviews',
  ],
  tech: ['Figma', 'Design Thinking Frameworks', 'UX Research Tools'],
};

const activities = [
  {
    id: 'act-1',
    title: 'NGO Community Drives',
    description: 'Led NGO-based community drives, coordinating awareness and plantation activities with 50+ participants',
    icon: TreePine,
    color: '#00ff9d',
    stat: '50+',
    statLabel: 'PARTICIPANTS',
    tag: 'LEADERSHIP',
  },
  {
    id: 'act-2',
    title: 'Binary Blitz Hackathon',
    description: 'Participated in the Binary Blitz hackathon and qualified for the second round among 20+ competing teams',
    icon: Trophy,
    color: '#f59e0b',
    stat: 'R2',
    statLabel: 'QUALIFIED',
    tag: 'HACKATHON',
  },
  {
    id: 'act-3',
    title: 'Inter Hostel Competition',
    description: 'Organized event operations as a Student Coordinator during the Inter Hostel Competition for 100+ students',
    icon: Users,
    color: '#a78bfa',
    stat: '100+',
    statLabel: 'STUDENTS',
    tag: 'COORDINATION',
  },
];

const achievements = [
  {
    id: 'ach-1',
    title: 'GFG Innovathon — 3rd Rank',
    description: 'Achieved 3rd rank in the GeeksforGeeks Innovathon, competing against numerous teams with an innovative solution',
    icon: Medal,
    color: '#f472b6',
    stat: '3rd',
    statLabel: 'RANK',
    tag: 'ACHIEVEMENT',
  },
];

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

function ProgressRing({ val, color, size = 64 }: { val: number; color: string; size?: number }) {
  const r = size / 2 - 4;
  const c = 2 * Math.PI * r;
  const o = c - (val / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(0,212,255,0.06)" strokeWidth="3" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3"
          strokeLinecap="round" strokeDasharray={c}
          initial={{ strokeDashoffset: c }} whileInView={{ strokeDashoffset: o }}
          viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 4px ${color}60)` }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-orbitron text-[11px] font-bold" style={{ color }}>{val}%</span>
      </div>
    </div>
  );
}

function SignalWave({ color }: { color: string }) {
  const pts = useMemo(() => {
    const a: string[] = [];
    for (let i = 0; i <= 200; i += 2) {
      a.push(`${i},${20 + Math.sin((i / 200) * Math.PI * 4) * 12}`);
    }
    return a.join(' ');
  }, []);
  return (
    <svg viewBox="0 0 200 40" className="w-full h-5" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth={1.5}
        strokeOpacity={0.7} points={pts}
        style={{
          strokeDasharray: '4 2',
          animation: 'waveMove 1.5s linear infinite',
          filter: `drop-shadow(0 0 3px ${color})`,
        }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function TrainingSection() {
  const [clock, setClock] = useState('00:00:00');
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);

  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => {
      const e = Math.floor((Date.now() - t0) / 1000);
      setClock(
        `${String(Math.floor(e / 3600)).padStart(2, '0')}:${String(Math.floor((e % 3600) / 60)).padStart(2, '0')}:${String(e % 60).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="training" className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[#020612]" />
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img src="/beautiful-shot-starry-night-sky.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.3, filter: 'saturate(0.5) brightness(0.4)' }} />
      </div>
      <CosmicBackground variant="binary" />

      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4">

        {/* ═══ Section Header ═══ */}
        <motion.div className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <Rocket size={20} className="text-[#f472b6]" />
            <h2 className="font-orbitron text-lg md:text-xl font-bold text-[#f472b6] uppercase tracking-[0.35em]"
              style={{ textShadow: '0 0 20px rgba(244,114,182,0.3)' }}>
              <TypingText text="Mission Control" speed={70} cursorColor="#f472b6" />
            </h2>
            <Rocket size={20} className="text-[#f472b6]" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <p className="font-orbitron text-[12px] font-semibold tracking-[0.5em] text-[#94a3b8]" style={{ textShadow: '0 0 8px rgba(244,114,182,0.3)' }}>
            TRAINING &amp; ACTIVITIES • DEEP SPACE OPERATIONS LOG v3.0
          </p>
          <div className="h-px mt-2 bg-gradient-to-r from-transparent via-[#f472b6] to-transparent opacity-25" />
        </motion.div>

        {/* ══════════════════════════════════════════════
           TRAINING — Featured Full-Width Card
           ══════════════════════════════════════════════ */}
        <motion.div className="rounded-xl relative overflow-hidden mb-10"
          style={{
            background: 'linear-gradient(135deg, rgba(2,6,18,0.98) 0%, rgba(4,12,32,0.98) 50%, rgba(2,6,18,0.98) 100%)',
            border: '1px solid rgba(0,212,255,0.1)',
            boxShadow: '0 0 60px rgba(0,212,255,0.04), inset 0 1px 0 rgba(0,212,255,0.08)',
          }}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-2 flex-wrap gap-x-4 gap-y-1"
            style={{ borderBottom: '1px solid rgba(0,212,255,0.06)', background: 'rgba(0,212,255,0.015)' }}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" style={{ boxShadow: '0 0 6px #00ff9d' }} />
                <span className="font-orbitron text-[7px] tracking-widest text-[#00ff9d]">TRAINING LOG</span>
              </span>
              <span className="font-orbitron text-[7px] text-[#1e293b]">|</span>
              <span className="flex items-center gap-1"><Shield size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">VERIFIED</span></span>
              <span className="flex items-center gap-1"><Cpu size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">MISSION ALPHA</span></span>
            </div>
            <span className="flex items-center gap-1"><Clock size={9} className="text-[#475569]" /><span className="font-orbitron text-[8px] text-[#64748b]">T+ {clock}</span></span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Signal size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">SIGNAL 100%</span></span>
              <span className="flex items-center gap-1"><Radio size={9} className="text-[#00ff9d]" style={{ animation: 'breathe 2s ease-in-out infinite' }} /><span className="font-orbitron text-[7px] text-[#475569]">LIVE</span></span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-5 md:p-6">

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-orbitron text-[7px] tracking-[0.3em] px-2.5 py-1 rounded-full"
                    style={{ color: '#0066ff', background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)' }}>
                    {training.status}
                  </span>
                </div>
                <h3 className="font-orbitron text-xl md:text-2xl font-bold tracking-wider mb-1"
                  style={{ color: training.color, textShadow: `0 0 15px ${training.color}30` }}>
                  {training.title}
                </h3>
                <p className="font-exo text-base md:text-lg text-[#cbd5e1] mb-1">{training.subtitle}</p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-[#475569]" /><span className="font-exo text-sm text-[#94a3b8]">{training.location}</span></span>
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-[#475569]" /><span className="font-exo text-sm text-[#94a3b8]">{training.date}</span></span>
                </div>
                <p className="font-exo text-base text-[#64748b] leading-relaxed max-w-2xl">{training.description}</p>
              </div>

              {/* Progress ring */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <ProgressRing val={100} color={training.color} size={72} />
                <span className="font-orbitron text-[6px] tracking-wider text-[#334155]">COMPLETION</span>
              </div>
            </div>

            {/* Signal wave divider */}
            <div className="mb-4">
              <SignalWave color={training.color} />
            </div>

            {/* Two-column: Objectives + Tech */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-5">

              {/* Objectives */}
              <div className="rounded-lg p-4"
                style={{ background: 'rgba(0,212,255,0.02)', border: '1px solid rgba(0,212,255,0.05)' }}>
                <div className="flex items-center gap-1.5 mb-3">
                  <Crosshair size={12} style={{ color: training.color }} />
                  <span className="font-orbitron text-[10px] tracking-[0.2em] text-[#475569]">MISSION OBJECTIVES</span>
                </div>

                <div className="space-y-3">
                  {training.highlights.map((h, i) => (
                    <motion.div key={i} className="flex gap-2.5 items-start"
                      initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.4 }}>
                      <ChevronRight size={14} style={{ color: training.color, marginTop: 2 }}
                        className="shrink-0" />
                      <p className="font-exo text-sm text-[#94a3b8] leading-relaxed">{h}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="rounded-lg p-4 md:min-w-[200px]"
                style={{ background: 'rgba(0,212,255,0.02)', border: '1px solid rgba(0,212,255,0.05)' }}>
                <span className="font-orbitron text-[8px] tracking-[0.2em] text-[#334155] block mb-3">TECH ARSENAL</span>
                <div className="flex flex-col gap-2">
                  {training.tech.map((t) => (
                    <div key={t} className="flex items-center gap-2 font-exo text-sm px-3 py-2 rounded-md"
                      style={{
                        color: training.color,
                        background: `${training.color}08`,
                        border: `1px solid ${training.color}15`,
                      }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: training.color, boxShadow: `0 0 4px ${training.color}` }} />
                      {t}
                    </div>
                  ))}
                </div>

                {/* Mini stats */}
                <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${training.color}10` }}>
                  <span className="font-orbitron text-[6px] tracking-[0.2em] text-[#334155] block mb-2">STATUS BOARD</span>
                  {[
                    { l: 'SIGNAL', v: 'STRONG', c: '#00ff9d' },
                    { l: 'DATA', v: 'SYNCED', c: '#00d4ff' },
                    { l: 'REPORT', v: 'ARCHIVED', c: '#0066ff' },
                  ].map(({ l, v, c }) => (
                    <div key={l} className="flex items-center justify-between py-1"
                      style={{ borderBottom: '1px solid rgba(0,212,255,0.03)' }}>
                      <span className="font-orbitron text-[6px] tracking-wider text-[#3e4c5e]">{l}</span>
                      <span className="flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full" style={{ background: c, boxShadow: `0 0 3px ${c}` }} />
                        <span className="font-orbitron text-[6px]" style={{ color: c }}>{v}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-4 py-1.5"
            style={{ borderTop: '1px solid rgba(0,212,255,0.05)', background: 'rgba(0,212,255,0.01)' }}>
            <div className="flex items-center gap-2">
              <Zap size={9} className="text-[#00d4ff] opacity-40" />
              <span className="font-orbitron text-[6px] text-[#334155]">ALL SYSTEMS NOMINAL</span>
            </div>
            <span className="font-orbitron text-[6px] text-[#1e293b]">MISSION CTRL • v3.0</span>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════
           EXTRA-CURRICULAR — Field Operations
           ══════════════════════════════════════════════ */}

        <motion.div className="mb-6 text-center"
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <Sparkles size={16} className="text-[#a78bfa]" />
            <h3 className="font-orbitron text-lg md:text-xl font-bold text-[#a78bfa] uppercase tracking-[0.35em]"
              style={{ textShadow: '0 0 15px rgba(167,139,250,0.3)' }}>
              <TypingText text="Field Operations" speed={80} cursorColor="#a78bfa" />
            </h3>
            <Sparkles size={16} className="text-[#a78bfa]" />
          </div>
          <p className="font-orbitron text-[12px] tracking-[0.5em] text-[#334155]">
            EXTRA-CURRICULAR ACTIVITIES • FIELD DEPLOYMENT LOG
          </p>
          <div className="h-px mt-2 bg-gradient-to-r from-transparent via-[#a78bfa] to-transparent opacity-20" />
        </motion.div>

        {/* 2×2 Activity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            const isHovered = hoveredActivity === act.id;
            return (
              <motion.div
                key={act.id}
                className="relative rounded-xl overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(160deg, rgba(4,10,28,0.95) 0%, rgba(2,6,18,0.98) 100%)',
                  border: `1px solid ${isHovered ? act.color + '35' : 'rgba(167,139,250,0.06)'}`,
                  boxShadow: isHovered
                    ? `0 0 35px ${act.color}12, inset 0 1px 0 ${act.color}10`
                    : 'inset 0 1px 0 rgba(167,139,250,0.03)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredActivity(act.id)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                {/* Top glow */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${act.color}${isHovered ? '50' : '15'}, transparent)`,
                    transition: 'background 0.3s',
                  }} />

                {/* Scan line */}
                {isHovered && (
                  <motion.div className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-full h-px absolute"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${act.color}30, transparent)`,
                        animation: 'scanLine 3s ease-in-out infinite',
                      }} />
                  </motion.div>
                )}

                <div className="relative p-5">
                  {/* Top row: Tag + Stat */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-orbitron text-[7px] tracking-[0.3em] px-2.5 py-1 rounded-full"
                      style={{
                        color: act.color,
                        background: `${act.color}10`,
                        border: `1px solid ${act.color}20`,
                      }}>
                      {act.tag}
                    </span>

                    {/* Stat badge */}
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron text-xl font-bold" style={{ color: act.color, textShadow: isHovered ? `0 0 10px ${act.color}40` : 'none' }}>
                        {act.stat}
                      </span>
                      <span className="font-orbitron text-[6px] tracking-[0.15em] text-[#475569]">
                        {act.statLabel}
                      </span>
                    </div>
                  </div>

                  {/* Icon + Title + Description */}
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: `${act.color}08`,
                        border: `1px solid ${act.color}20`,
                        boxShadow: isHovered ? `0 0 15px ${act.color}20` : 'none',
                        transition: 'box-shadow 0.3s',
                      }}>
                      <Icon size={20} style={{ color: act.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-orbitron text-xs tracking-wider mb-1.5"
                        style={{ color: act.color, textShadow: isHovered ? `0 0 8px ${act.color}30` : 'none' }}>
                        {act.title}
                      </h4>
                      <p className="font-exo text-sm text-[#7c8ca3] leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                  </div>

                  {/* Bottom signal bar */}
                  <div className="flex items-center justify-between mt-4 pt-3"
                    style={{ borderTop: `1px solid ${act.color}08` }}>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full" style={{
                        background: act.color,
                        boxShadow: `0 0 4px ${act.color}`,
                        animation: 'breathe 2s ease-in-out infinite',
                      }} />
                      <span className="font-orbitron text-[6px] tracking-wider" style={{ color: act.color, opacity: 0.5 }}>
                        LOGGED
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[0.3, 0.5, 0.7, 0.9, 1].map((h, i) => (
                        <motion.div key={i} className="w-[3px] rounded-full"
                          style={{
                            background: act.color,
                            opacity: isHovered ? 0.8 : 0.2,
                            transition: 'opacity 0.3s',
                          }}
                          animate={{ height: isHovered ? `${h * 16}px` : '4px' }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════════
           ACHIEVEMENTS
           ══════════════════════════════════════════════ */}

        <motion.div className="mt-10 mb-6 text-center"
          initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <Award size={16} className="text-[#f59e0b]" />
            <h3 className="font-orbitron text-lg md:text-xl font-bold text-[#f59e0b] uppercase tracking-[0.35em]"
              style={{ textShadow: '0 0 15px rgba(245,158,11,0.3)' }}>
              <TypingText text="Achievements" speed={80} cursorColor="#f59e0b" />
            </h3>
            <Award size={16} className="text-[#f59e0b]" />
          </div>
          <p className="font-orbitron text-[12px] tracking-[0.5em] text-[#334155]">
            RECOGNITION &amp; MILESTONES • COMMENDATION LOG
          </p>
          <div className="h-px mt-2 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent opacity-20" />
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 gap-4">
          {achievements.map((ach, idx) => {
            const Icon = ach.icon;
            const isHovered = hoveredActivity === ach.id;
            return (
              <motion.div
                key={ach.id}
                className="relative rounded-xl overflow-hidden cursor-default"
                style={{
                  background: 'linear-gradient(160deg, rgba(4,10,28,0.95) 0%, rgba(2,6,18,0.98) 100%)',
                  border: `1px solid ${isHovered ? ach.color + '35' : 'rgba(245,158,11,0.08)'}`,
                  boxShadow: isHovered
                    ? `0 0 40px ${ach.color}15, inset 0 1px 0 ${ach.color}10`
                    : 'inset 0 1px 0 rgba(245,158,11,0.04)',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                }}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredActivity(ach.id)}
                onMouseLeave={() => setHoveredActivity(null)}
              >
                {/* Top glow */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${ach.color}${isHovered ? '50' : '20'}, transparent)`,
                    transition: 'background 0.3s',
                  }} />

                {/* Scan line */}
                {isHovered && (
                  <motion.div className="absolute inset-0 pointer-events-none overflow-hidden"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="w-full h-px absolute"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${ach.color}30, transparent)`,
                        animation: 'scanLine 3s ease-in-out infinite',
                      }} />
                  </motion.div>
                )}

                <div className="relative p-5 md:p-6">
                  <div className="flex items-center gap-5 flex-wrap">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${ach.color}08`,
                        border: `1px solid ${ach.color}20`,
                        boxShadow: isHovered ? `0 0 20px ${ach.color}20` : 'none',
                        transition: 'box-shadow 0.3s',
                      }}>
                      <Icon size={26} style={{ color: ach.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-orbitron text-[7px] tracking-[0.3em] px-2.5 py-1 rounded-full"
                          style={{
                            color: ach.color,
                            background: `${ach.color}10`,
                            border: `1px solid ${ach.color}20`,
                          }}>
                          {ach.tag}
                        </span>
                      </div>
                      <h4 className="font-orbitron text-sm md:text-base tracking-wider mb-1"
                        style={{ color: ach.color, textShadow: isHovered ? `0 0 10px ${ach.color}30` : 'none' }}>
                        {ach.title}
                      </h4>
                      <p className="font-exo text-sm text-[#7c8ca3] leading-relaxed max-w-2xl">
                        {ach.description}
                      </p>
                    </div>

                    {/* Stat */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <span className="font-orbitron text-3xl md:text-4xl font-bold block" style={{ color: ach.color, textShadow: isHovered ? `0 0 15px ${ach.color}40` : 'none' }}>
                          {ach.stat}
                        </span>
                        <span className="font-orbitron text-[7px] tracking-[0.2em] text-[#475569]">
                          {ach.statLabel}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        {[0.3, 0.5, 0.7, 0.9, 1].map((h, i) => (
                          <motion.div key={i} className="h-[3px] rounded-full"
                            style={{
                              background: ach.color,
                              opacity: isHovered ? 0.8 : 0.2,
                              transition: 'opacity 0.3s',
                            }}
                            animate={{ width: isHovered ? `${h * 20}px` : '4px' }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom summary */}
        <motion.div className="mt-8 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-[rgba(167,139,250,0.15)]" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ background: 'rgba(167,139,250,0.04)', border: '1px solid rgba(167,139,250,0.08)' }}>
            <Sparkles size={8} className="text-[#a78bfa] opacity-50" />
            <span className="font-orbitron text-[6px] tracking-[0.3em] text-[#475569]">
              1 TRAINING • {activities.length} ACTIVITIES • {achievements.length} ACHIEVEMENT
            </span>
            <Sparkles size={8} className="text-[#a78bfa] opacity-50" />
          </div>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-[rgba(167,139,250,0.15)]" />
        </motion.div>

      </div>

      <style jsx>{`
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        @keyframes waveMove {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: 30; }
        }
        @keyframes scanLine {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
