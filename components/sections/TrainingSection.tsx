'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket, Radio, Wifi, Shield, Cpu, Clock, Zap, Target,
  Navigation, Orbit, Radar, Activity, Signal, Crosshair,
  ChevronRight, MapPin, Calendar,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import CosmicBackground from '../CosmicBackground';

/* ═══════════════════════════════════════════
   TRAINING / EXPERIENCE DATA
   ═══════════════════════════════════════════ */

const missions = [
  {
    id: 'mission-alpha',
    codename: 'MISSION ALPHA',
    title: 'Flutter Developer Intern',
    organization: 'Jeevani Health',
    location: 'Remote',
    date: 'Jan 2025 – Present',
    status: 'ACTIVE',
    statusColor: '#00ff9d',
    color: '#00d4ff',
    dim: 'rgba(0,212,255,0.08)',
    progress: 85,
    description: 'Building cross-platform healthcare mobile applications with Flutter and Dart.',
    highlights: [
      'Developed responsive UI components for patient management system',
      'Integrated REST APIs and state management using Provider/Riverpod',
      'Implemented real-time notification system for healthcare alerts',
      'Collaborated with backend team for secure medical data handling',
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Firebase', 'Provider'],
    metrics: { systems: 12, uptime: '99.2%', missions: 3 },
  },
  {
    id: 'mission-beta',
    codename: 'MISSION BETA',
    title: 'Campus Ambassador',
    organization: 'Internshala',
    location: 'LPU, Punjab',
    date: 'Aug 2024 – Dec 2024',
    status: 'COMPLETED',
    statusColor: '#0066ff',
    color: '#0066ff',
    dim: 'rgba(0,102,255,0.08)',
    progress: 100,
    description: 'Led campus outreach and student engagement programs for career development.',
    highlights: [
      'Organized workshop events reaching 200+ students on campus',
      'Created social media campaigns increasing platform sign-ups by 35%',
      'Mentored peers on internship applications and profile optimization',
      'Awarded Top Performer for consistent engagement metrics',
    ],
    tech: ['Marketing', 'Leadership', 'Event Management', 'Communication'],
    metrics: { systems: 8, uptime: '100%', missions: 5 },
  },
  {
    id: 'mission-gamma',
    codename: 'MISSION GAMMA',
    title: 'Web Development Trainee',
    organization: 'Bharat Intern',
    location: 'Remote',
    date: 'Jun 2024 – Aug 2024',
    status: 'COMPLETED',
    statusColor: '#0066ff',
    color: '#00ff9d',
    dim: 'rgba(0,255,157,0.08)',
    progress: 100,
    description: 'Intensive training in full-stack web development with modern frameworks.',
    highlights: [
      'Built 3 production-ready web applications during training period',
      'Mastered responsive design patterns and accessibility standards',
      'Learned Git workflow, code review practices, and CI/CD basics',
      'Received certification with distinction for outstanding performance',
    ],
    tech: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Git'],
    metrics: { systems: 6, uptime: '98.7%', missions: 3 },
  },
];

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

/* Animated signal wave */
function SignalWave({ color, active }: { color: string; active: boolean }) {
  const pts = useMemo(() => {
    const a: string[] = [];
    for (let i = 0; i <= 200; i += 2) {
      a.push(`${i},${20 + Math.sin((i / 200) * Math.PI * 4) * (active ? 12 : 3)}`);
    }
    return a.join(' ');
  }, [active]);
  return (
    <svg viewBox="0 0 200 40" className="w-full h-5" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth={active ? 1.5 : 0.5}
        strokeOpacity={active ? 0.9 : 0.2} points={pts}
        style={{
          strokeDasharray: '4 2',
          animation: active ? 'waveMove 1.5s linear infinite' : 'none',
          filter: active ? `drop-shadow(0 0 3px ${color})` : 'none',
        }} />
    </svg>
  );
}

/* Progress ring */
function ProgressRing({ val, color, size = 56 }: { val: number; color: string; size?: number }) {
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
        <span className="font-orbitron text-[10px] font-bold" style={{ color }}>{val}%</span>
      </div>
    </div>
  );
}

/* Timeline connector dot */
function TimelineDot({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-3 h-3 rounded-full z-10"
        style={{
          background: active ? color : 'rgba(0,212,255,0.15)',
          boxShadow: active ? `0 0 10px ${color}, 0 0 20px ${color}40` : 'none',
          animation: active ? 'breathe 2s ease-in-out infinite' : 'none',
        }} />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function TrainingSection() {
  const [selId, setSelId] = useState(missions[0].id);
  const [clock, setClock] = useState('00:00:00');
  const sel = missions.find((m) => m.id === selId) || missions[0];

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

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-[1300px] mx-auto px-4">

        {/* ═══ Header ═══ */}
        <motion.div className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <Rocket size={20} className="text-[#f472b6]" />
            <h2 className="font-orbitron text-lg md:text-xl font-bold text-[#f472b6] uppercase tracking-[0.35em]"
              style={{ textShadow: '0 0 20px rgba(244,114,182,0.3)' }}>
              Mission Control
            </h2>
            <Rocket size={20} className="text-[#f472b6]" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <p className="font-orbitron text-[8px] tracking-[0.5em] text-[#334155]">
            TRAINING & EXPERIENCE • DEEP SPACE OPERATIONS LOG v2.1
          </p>
          <div className="h-px mt-2 bg-gradient-to-r from-transparent via-[#f472b6] to-transparent opacity-25" />
        </motion.div>

        {/* ═══ Main Console ═══ */}
        <motion.div className="rounded-xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(2,6,18,0.98) 0%, rgba(4,10,28,0.98) 50%, rgba(2,6,18,0.98) 100%)',
            border: '1px solid rgba(244,114,182,0.08)',
            boxShadow: '0 0 80px rgba(244,114,182,0.03), inset 0 1px 0 rgba(244,114,182,0.06)',
          }}
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>

          {/* ── Top Status Bar ── */}
          <div className="flex items-center justify-between px-3 py-1.5 flex-wrap gap-x-4 gap-y-1"
            style={{ borderBottom: '1px solid rgba(244,114,182,0.05)', background: 'rgba(244,114,182,0.015)' }}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" style={{ boxShadow: '0 0 4px #00ff9d' }} />
                <span className="font-orbitron text-[7px] tracking-widest text-[#00ff9d]">MISSION CTRL</span>
              </span>
              <span className="font-orbitron text-[7px] text-[#1e293b]">|</span>
              <span className="flex items-center gap-1"><Shield size={9} className="text-[#f472b6] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">SECURE</span></span>
              <span className="flex items-center gap-1"><Cpu size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">SYS OK</span></span>
            </div>
            <span className="flex items-center gap-1"><Clock size={9} className="text-[#475569]" /><span className="font-orbitron text-[8px] text-[#64748b]">T+ {clock}</span></span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Signal size={9} className="text-[#f472b6] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">COMMS 100%</span></span>
              <span className="flex items-center gap-1"><Radio size={9} className="text-[#f472b6]" style={{ animation: 'breathe 2s ease-in-out infinite' }} /><span className="font-orbitron text-[7px] text-[#475569]">LIVE</span></span>
            </div>
          </div>

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">

            {/* ═══════ LEFT PANEL — Mission Selector ═══════ */}
            <div className="p-3 lg:border-r space-y-2" style={{ borderColor: 'rgba(244,114,182,0.05)' }}>

              <div className="flex items-center gap-1 mb-2">
                <Target size={9} className="text-[#475569]" />
                <span className="font-orbitron text-[6px] tracking-[0.3em] text-[#475569]">MISSION REGISTRY</span>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[rgba(244,114,182,0.15)] to-transparent" />

                {missions.map((m, idx) => {
                  const active = m.id === selId;
                  return (
                    <motion.button key={m.id} onClick={() => setSelId(m.id)}
                      className="w-full text-left pl-6 py-2.5 relative cursor-pointer transition-all duration-300"
                      whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2">
                        <TimelineDot color={m.color} active={active} />
                      </div>

                      <div className="rounded-lg p-2.5 relative overflow-hidden"
                        style={{
                          background: active ? m.dim : 'rgba(244,114,182,0.01)',
                          border: `1px solid ${active ? m.color + '30' : 'rgba(244,114,182,0.04)'}`,
                        }}>
                        {/* Status badge */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-orbitron text-[6px] tracking-[0.2em]"
                            style={{ color: m.statusColor }}>{m.status}</span>
                          <span className="font-orbitron text-[5px] text-[#334155]">{m.codename}</span>
                        </div>
                        <p className="font-orbitron text-[9px] tracking-wider mb-0.5"
                          style={{ color: m.color, opacity: active ? 1 : 0.5 }}>{m.title}</p>
                        <p className="font-exo text-[8px] text-[#94a3b8] truncate"
                          style={{ opacity: active ? 0.9 : 0.4 }}>{m.organization}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-0.5"><MapPin size={7} className="text-[#475569]" /><span className="font-orbitron text-[5px] text-[#3e4c5e]">{m.location}</span></span>
                          <span className="flex items-center gap-0.5"><Calendar size={7} className="text-[#475569]" /><span className="font-orbitron text-[5px] text-[#3e4c5e]">{m.date}</span></span>
                        </div>
                        {/* Progress bar */}
                        <div className="mt-1.5 h-0.5 rounded-full bg-[rgba(0,212,255,0.04)] overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${m.color}40, ${m.color})` }}
                            initial={{ width: 0 }} whileInView={{ width: `${m.progress}%` }}
                            viewport={{ once: true }} transition={{ duration: 1, delay: idx * 0.15 }} />
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Signal monitor */}
              <div className="pt-2" style={{ borderTop: '1px solid rgba(244,114,182,0.03)' }}>
                <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">MISSION SIGNALS</span>
                {missions.map((m) => (
                  <div key={m.id} className="relative">
                    <SignalWave color={m.color} active={m.id === selId} />
                    <span className="absolute right-0 top-0 font-orbitron text-[5px]"
                      style={{ color: m.color, opacity: m.id === selId ? 0.7 : 0.15 }}>
                      {m.id === selId ? 'ACTIVE' : 'IDLE'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick stats */}
              <div className="pt-2 grid grid-cols-3 gap-1" style={{ borderTop: '1px solid rgba(244,114,182,0.03)' }}>
                {[
                  { label: 'MISSIONS', val: missions.length, c: '#f472b6' },
                  { label: 'ACTIVE', val: missions.filter(m => m.status === 'ACTIVE').length, c: '#00ff9d' },
                  { label: 'COMPLETE', val: missions.filter(m => m.status === 'COMPLETED').length, c: '#0066ff' },
                ].map(({ label, val, c }) => (
                  <div key={label} className="text-center p-1.5 rounded"
                    style={{ background: 'rgba(0,212,255,0.015)', border: '1px solid rgba(0,212,255,0.04)' }}>
                    <span className="font-orbitron text-[12px] font-bold block" style={{ color: c }}>{val}</span>
                    <span className="font-orbitron text-[5px] tracking-wider text-[#334155]">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══════ RIGHT PANEL — Mission Details ═══════ */}
            <div className="p-4">

              <AnimatePresence mode="wait">
                <motion.div key={sel.id}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35 }}>

                  {/* Mission Header Card */}
                  <div className="rounded-lg p-4 mb-3 relative overflow-hidden"
                    style={{
                      background: sel.dim,
                      border: `1px solid ${sel.color}15`,
                      boxShadow: `inset 0 0 40px ${sel.color}05`,
                    }}>
                    {/* Corner brackets */}
                    {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                      <div key={i} className={`absolute ${pos} w-4 h-4 pointer-events-none`}>
                        <div className="absolute top-0 left-0 w-full h-px" style={{ background: sel.color, opacity: 0.4 }} />
                        <div className="absolute top-0 left-0 h-full w-px" style={{ background: sel.color, opacity: 0.4 }} />
                      </div>
                    ))}

                    {/* Scan line */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div className="w-full h-px absolute"
                        style={{ background: `linear-gradient(90deg, transparent, ${sel.color}20, transparent)`, animation: 'scanLine 4s ease-in-out infinite' }} />
                    </div>

                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-orbitron text-[6px] tracking-[0.3em] px-2 py-0.5 rounded-full"
                            style={{ color: sel.statusColor, background: `${sel.statusColor}10`, border: `1px solid ${sel.statusColor}20` }}>
                            {sel.status}
                          </span>
                          <span className="font-orbitron text-[6px] tracking-[0.2em] text-[#334155]">{sel.codename}</span>
                        </div>
                        <h3 className="font-orbitron text-base md:text-lg font-semibold tracking-wider mb-0.5"
                          style={{ color: sel.color, textShadow: `0 0 10px ${sel.color}30` }}>
                          {sel.title}
                        </h3>
                        <p className="font-exo text-sm text-[#e2e8f0] mb-0.5">{sel.organization}</p>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1"><MapPin size={10} className="text-[#475569]" /><span className="font-exo text-[10px] text-[#94a3b8]">{sel.location}</span></span>
                          <span className="flex items-center gap-1"><Calendar size={10} className="text-[#475569]" /><span className="font-exo text-[10px] text-[#94a3b8]">{sel.date}</span></span>
                        </div>
                        <p className="font-exo text-xs text-[#64748b] mt-2 leading-relaxed">{sel.description}</p>
                      </div>

                      {/* Progress ring */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <ProgressRing val={sel.progress} color={sel.color} size={64} />
                        <span className="font-orbitron text-[5px] tracking-wider text-[#334155]">COMPLETION</span>
                      </div>
                    </div>
                  </div>

                  {/* Two-column layout for details */}
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">

                    {/* Mission Highlights */}
                    <div className="rounded-lg p-3"
                      style={{ background: 'rgba(0,212,255,0.015)', border: '1px solid rgba(0,212,255,0.04)' }}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Crosshair size={10} style={{ color: sel.color }} />
                        <span className="font-orbitron text-[7px] tracking-[0.2em] text-[#475569]">MISSION OBJECTIVES</span>
                      </div>

                      <div className="space-y-2">
                        {sel.highlights.map((h, i) => (
                          <motion.div key={i} className="flex gap-2 items-start"
                            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                            <ChevronRight size={12} style={{ color: sel.color, marginTop: 2 }}
                              className="shrink-0" />
                            <p className="font-exo text-[11px] text-[#94a3b8] leading-relaxed">{h}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="mt-3 pt-2" style={{ borderTop: `1px solid ${sel.color}08` }}>
                        <span className="font-orbitron text-[6px] tracking-[0.2em] text-[#334155] block mb-1.5">TECH ARSENAL</span>
                        <div className="flex flex-wrap gap-1.5">
                          {sel.tech.map((t) => (
                            <span key={t} className="font-exo text-[9px] px-2 py-0.5 rounded"
                              style={{
                                color: sel.color,
                                background: `${sel.color}08`,
                                border: `1px solid ${sel.color}15`,
                              }}>{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right side — Stats and monitoring */}
                    <div className="space-y-2">

                      {/* Systems overview */}
                      <div className="rounded-lg p-2.5"
                        style={{ background: 'rgba(0,212,255,0.015)', border: '1px solid rgba(0,212,255,0.04)' }}>
                        <div className="flex items-center gap-1 mb-2">
                          <Activity size={8} style={{ color: sel.color }} />
                          <span className="font-orbitron text-[6px] tracking-[0.2em] text-[#334155]">SYSTEMS TELEMETRY</span>
                        </div>

                        {[
                          { label: 'SUBSYSTEMS', val: sel.metrics.systems, max: 15, icon: Cpu },
                          { label: 'UPTIME', val: parseFloat(sel.metrics.uptime), max: 100, icon: Wifi },
                          { label: 'OPS COUNT', val: sel.metrics.missions, max: 8, icon: Orbit },
                        ].map(({ label, val, max, icon: Icon }) => (
                          <div key={label} className="mb-2">
                            <div className="flex items-center justify-between mb-0.5">
                              <span className="flex items-center gap-1">
                                <Icon size={7} className="text-[#334155]" />
                                <span className="font-orbitron text-[5px] tracking-wider text-[#3e4c5e]">{label}</span>
                              </span>
                              <span className="font-orbitron text-[8px]" style={{ color: sel.color }}>{val}</span>
                            </div>
                            <div className="h-1 rounded-full bg-[rgba(0,212,255,0.04)] overflow-hidden">
                              <motion.div className="h-full rounded-full"
                                style={{ background: `linear-gradient(90deg, ${sel.color}40, ${sel.color})`, boxShadow: `0 0 4px ${sel.color}30` }}
                                initial={{ width: 0 }} whileInView={{ width: `${(Number(val) / max) * 100}%` }}
                                viewport={{ once: true }} transition={{ duration: 1, ease: 'easeOut' }} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mission status indicators */}
                      <div className="rounded-lg p-2.5"
                        style={{ background: 'rgba(0,212,255,0.015)', border: '1px solid rgba(0,212,255,0.04)' }}>
                        <div className="flex items-center gap-1 mb-2">
                          <Radar size={8} className="text-[#334155]" />
                          <span className="font-orbitron text-[6px] tracking-[0.2em] text-[#334155]">STATUS BOARD</span>
                        </div>

                        {[
                          { l: 'COMM LINK', v: 'ESTABLISHED', c: '#00ff9d' },
                          { l: 'DATA SYNC', v: 'ACTIVE', c: '#00d4ff' },
                          { l: 'REPORTING', v: sel.status === 'ACTIVE' ? 'LIVE' : 'ARCHIVED', c: sel.status === 'ACTIVE' ? '#00ff9d' : '#0066ff' },
                          { l: 'CLEARANCE', v: 'LEVEL 3', c: '#f472b6' },
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

                      {/* Circular gauges */}
                      <div className="flex justify-around">
                        {[
                          { v: 98, l: 'PERF', c: '#00ff9d' },
                          { v: sel.progress, l: 'PROG', c: sel.color },
                          { v: 87, l: 'SYNC', c: '#f472b6' },
                        ].map(({ v, l, c }) => {
                          const r2 = 14;
                          const circ = 2 * Math.PI * r2;
                          return (
                            <div key={l} className="text-center">
                              <svg width="36" height="36" className="-rotate-90">
                                <circle cx="18" cy="18" r={r2} fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="2.5" />
                                <motion.circle cx="18" cy="18" r={r2} fill="none" stroke={c} strokeWidth="2.5"
                                  strokeDasharray={circ} strokeLinecap="round"
                                  initial={{ strokeDashoffset: circ }}
                                  whileInView={{ strokeDashoffset: circ - (v / 100) * circ }}
                                  viewport={{ once: true }} transition={{ duration: 1 }}
                                  style={{ filter: `drop-shadow(0 0 2px ${c}40)` }} />
                              </svg>
                              <span className="font-orbitron text-[5px] text-[#334155] block mt-0.5">{l}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* ── Bottom Bar ── */}
          <div className="flex items-center justify-between px-3 py-1.5 flex-wrap gap-2"
            style={{ borderTop: '1px solid rgba(244,114,182,0.05)', background: 'rgba(244,114,182,0.01)' }}>
            <div className="flex items-center gap-3">
              {missions.map((m) => (
                <button key={m.id} onClick={() => setSelId(m.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer"
                  style={{
                    background: m.id === selId ? `${m.color}10` : 'transparent',
                    border: `1px solid ${m.id === selId ? m.color + '25' : 'rgba(0,212,255,0.04)'}`,
                  }}>
                  <Navigation size={8} style={{ color: m.color, opacity: m.id === selId ? 1 : 0.3 }} />
                  <span className="font-orbitron text-[6px] tracking-wider"
                    style={{ color: m.color, opacity: m.id === selId ? 1 : 0.3 }}>{m.codename}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Zap size={9} className="text-[#f472b6] opacity-40" />
              <span className="font-orbitron text-[6px] text-[#334155]">ALL SYSTEMS NOMINAL</span>
            </div>
          </div>

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
