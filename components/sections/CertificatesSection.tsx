'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, Navigation, Radio, Zap, Orbit, Clock, Weight, Gauge,
  Shield, Wifi, Cpu, Target, Crosshair, Radar,
  Activity, Thermometer, Fuel, Signal,
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import CosmicBackground from '../CosmicBackground';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const EarthHologram = dynamic(() => import('../EarthHologram'), { ssr: false });

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const certificates = [
  {
    id: 'nexora',
    title: 'ChatGPT-4 Prompt Engineering',
    issuer: 'Infosys',
    category: 'Generative AI & LLM',
    date: 'Aug 2025',
    planet: 'Nexora Prime',
    planetImg: '/neptune.png',
    color: '#00d4ff',
    dim: 'rgba(0,212,255,0.08)',
    distance: 4.2,
    gravity: 1.3,
    eta: '2y 147d',
    temp: '312K',
    atmo: 'Argon-Neon',
    vel: 0.87,
    fuel: 47.2,
    freq: 3,
    certImg: '/suraj_prompteng_gpt4.png',
  },
  {
    id: 'veridium',
    title: 'Software Engineering',
    issuer: 'Coursera',
    category: 'Software Engineering',
    date: 'Apr 2024',
    planet: 'Veridium-7',
    planetImg: '/jupiter.png',
    color: '#0066ff',
    dim: 'rgba(0,102,255,0.08)',
    distance: 8.7,
    gravity: 0.8,
    eta: '5y 82d',
    temp: '198K',
    atmo: 'Nitrogen-Helium',
    vel: 0.72,
    fuel: 89.6,
    freq: 5,
    certImg: '/suraj_softwareeng.jpeg',
  },
  {
    id: 'chloris',
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    category: 'Web Development',
    date: 'Nov 2023',
    planet: 'Chloris Sigma',
    planetImg: '/saturn.png',
    color: '#00ff9d',
    dim: 'rgba(0,255,157,0.08)',
    distance: 12.4,
    gravity: 1.1,
    eta: '7y 210d',
    temp: '274K',
    atmo: 'Methane-Oxygen',
    vel: 0.64,
    fuel: 134.1,
    freq: 4,
    certImg: '/suraj_responsivewebdesign.png',
  },
];


const probes = [
  { name: 'Voyager-1', img: '/voyager1.png', status: 'TRANSMITTING', dist: '24.1B km' },
  { name: 'Hubble', img: '/hubble-space-telescope.png', status: 'OBSERVING', dist: 'LEO 547km' },
  { name: 'JWST', img: '/james-webb-space-telescope-jwst.png', status: 'SCANNING', dist: 'L2 1.5M km' },
  { name: 'ISS', img: '/international-space-station-iss-space.png', status: 'ORBITING', dist: 'LEO 408km' },
];

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

/* Waveform */
function Wave({ color, freq, active }: { color: string; freq: number; active: boolean }) {
  const pts = useMemo(() => {
    const a: string[] = [];
    for (let i = 0; i <= 200; i += 2) {
      a.push(`${i},${20 + Math.sin((i / 200) * Math.PI * freq) * (active ? 14 : 4)}`);
    }
    return a.join(' ');
  }, [freq, active]);
  return (
    <svg viewBox="0 0 200 40" className="w-full h-6" preserveAspectRatio="none">
      <polyline fill="none" stroke={color} strokeWidth={active ? 1.5 : 0.6}
        strokeOpacity={active ? 0.9 : 0.25} points={pts}
        style={{ strokeDasharray: '4 2', animation: active ? 'waveMove 1.5s linear infinite' : 'none',
          filter: active ? `drop-shadow(0 0 3px ${color})` : 'none' }} />
    </svg>
  );
}

/* Circular gauge */
function CG({ val, max, color, label, unit }: { val: number; max: number; color: string; label: string; unit: string }) {
  const c = 2 * Math.PI * 24;
  const o = c - (val / max) * c;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(0,212,255,0.05)" strokeWidth="2.5" />
          <motion.circle cx="28" cy="28" r="24" fill="none" stroke={color} strokeWidth="2.5"
            strokeLinecap="round" strokeDasharray={c}
            initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: o }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 3px ${color}50)` }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-orbitron text-[9px]" style={{ color }}>{val}{unit}</span>
        </div>
      </div>
      <span className="font-orbitron text-[6px] tracking-[0.15em] text-[#3e4c5e] mt-0.5">{label}</span>
    </div>
  );
}

/* Bar chart columns */
function BarCols({ color, count = 8 }: { color: string; count?: number }) {
  return (
    <div className="flex items-end gap-px h-10">
      {Array.from({ length: count }).map((_, i) => {
        const h = 20 + Math.random() * 80;
        return (
          <motion.div key={i} className="w-1.5 rounded-t-sm"
            style={{ background: `linear-gradient(to top, ${color}10, ${color}80)`, boxShadow: `0 0 3px ${color}20` }}
            initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.05 }} />
        );
      })}
    </div>
  );
}

/* Dot matrix grid */
function DotGrid({ color, rows = 4, cols = 8 }: { color: string; rows?: number; cols?: number }) {
  return (
    <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-sm"
          style={{ background: Math.random() > 0.3 ? `${color}${Math.random() > 0.5 ? '60' : '25'}` : 'transparent' }} />
      ))}
    </div>
  );
}

/* Rotating HUD ring (SVG) */
function HudRing({ size, color, speed, reverse, dashes }: {
  size: number; color: string; speed: number; reverse?: boolean; dashes: string;
}) {
  const r = size / 2 - 4;
  return (
    <svg width={size} height={size} className="absolute top-1/2 left-1/2" style={{
      marginTop: -size / 2, marginLeft: -size / 2,
      animation: `radarSweep ${speed}s linear infinite ${reverse ? 'reverse' : ''}`,
    }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth="1" strokeDasharray={dashes} strokeOpacity="0.4" />
      {/* Tick marks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = size / 2 + Math.cos(angle) * (r - 4);
        const y1 = size / 2 + Math.sin(angle) * (r - 4);
        const x2 = size / 2 + Math.cos(angle) * r;
        const y2 = size / 2 + Math.sin(angle) * r;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeOpacity="0.3" />;
      })}
    </svg>
  );
}

/* Probe card */
function ProbeCard({ p }: { p: typeof probes[0] }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-2 rounded" style={{ background: 'rgba(0,212,255,0.02)', border: '1px solid rgba(0,212,255,0.05)' }}>
      <Image src={p.img} alt={p.name} width={28} height={28} className="object-contain opacity-50"
        style={{ filter: 'drop-shadow(0 0 3px rgba(0,212,255,0.3))' }} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-[#00ff9d]" style={{ boxShadow: '0 0 3px #00ff9d', animation: 'breathe 2s ease-in-out infinite' }} />
          <span className="font-orbitron text-[7px] tracking-wider text-[#64748b]">{p.name}</span>
        </div>
        <span className="font-orbitron text-[6px] text-[#334155]">{p.status} • {p.dist}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

export default function CertificatesSection() {
  const [selId, setSelId] = useState(certificates[0].id);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lightning, setLightning] = useState(false);

  const [showCerts, setShowCerts] = useState(false);
  const [clock, setClock] = useState('00:00:00');
  const sel = certificates.find((c) => c.id === selId) || certificates[0];

  useEffect(() => {
    const t0 = Date.now();
    const id = setInterval(() => {
      const e = Math.floor((Date.now() - t0) / 1000);
      setClock(`${String(Math.floor(e / 3600)).padStart(2, '0')}:${String(Math.floor((e % 3600) / 60)).padStart(2, '0')}:${String(e % 60).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="certificates" className="relative py-16 overflow-hidden">
      {/* Background cockpit image */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image src="/ChatGPT Image Mar 18, 2026, 05_37_27 AM.png" alt="" fill className="object-cover object-center" style={{ opacity: 1, filter: 'saturate(0.7) brightness(0.8)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(2,6,18,0.5) 0%, rgba(2,6,18,0.2) 50%, rgba(2,6,18,0.6) 100%)' }} />
      </div>
      <CosmicBackground variant="spiral" />

      {/* ── Floating decorative objects ── */}
      <div className="absolute top-8 right-[10%] z-[5] pointer-events-none opacity-20" style={{ animation: 'planetFloat 6s ease-in-out infinite' }}>
        <Image src="/—Pngtree—whimsical alien spaceships and ufo_15584223.png" alt="UFO" width={100} height={100} className="object-contain" style={{ filter: 'drop-shadow(0 0 12px rgba(0,255,157,0.3))' }} />
      </div>
      <div className="absolute bottom-12 left-[5%] z-[5] pointer-events-none opacity-20" style={{ animation: 'planetFloat 8s ease-in-out infinite 2s' }}>
        <Image src="/—Pngtree—3d rendering of the mars_14532328.png" alt="Rover" width={90} height={90} className="object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.2))' }} />
      </div>
      <div className="absolute top-[40%] left-[2%] z-[5] pointer-events-none opacity-15" style={{ animation: 'planetFloat 7s ease-in-out infinite 1s' }}>
        <Image src="/asteroid.png" alt="Asteroid" width={50} height={50} className="object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.2))' }} />
      </div>
      <div className="absolute top-16 left-[15%] z-[5] pointer-events-none opacity-15" style={{ animation: 'planetFloat 5s ease-in-out infinite 3s' }}>
        <Image src="/—Pngtree—twinkling star_244329.png" alt="Star" width={35} height={35} className="object-contain" style={{ filter: 'drop-shadow(0 0 8px rgba(0,212,255,0.4))' }} />
      </div>
      <div className="absolute bottom-20 right-[8%] z-[5] pointer-events-none opacity-15" style={{ animation: 'planetFloat 9s ease-in-out infinite 1.5s' }}>
        <Image src="/—Pngtree—fire explosion blast flame on_15577307.png" alt="Thruster" width={40} height={40} className="object-contain" style={{ filter: 'drop-shadow(0 0 6px rgba(255,100,0,0.3)) hue-rotate(160deg)' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-3">
        {/* ═══ Header ═══ */}
        <motion.div className="mb-6 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-3 mb-1">
            <Radar size={20} className="text-[#00b4d8]" />
            <h2 className="font-orbitron text-lg md:text-xl font-bold text-[#00b4d8] text-glow-teal uppercase tracking-[0.35em]">Starship Command</h2>
            <Radar size={20} className="text-[#00b4d8]" style={{ transform: 'scaleX(-1)' }} />
          </div>
          <p className="font-orbitron text-[8px] tracking-[0.5em] text-[#334155]">CERTIFICATES & CREDENTIALS • NAVIGATION CONSOLE v4.7</p>
          <div className="h-px mt-2 bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent opacity-25" />
        </motion.div>

        {/* ═══ Main Console ═══ */}
        <motion.div className="rounded-xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, rgba(2,6,18,0.98) 0%, rgba(4,10,28,0.98) 50%, rgba(2,6,18,0.98) 100%)',
            border: '1px solid rgba(0,212,255,0.08)',
            boxShadow: '0 0 80px rgba(0,212,255,0.03), inset 0 1px 0 rgba(0,212,255,0.06)',
          }}
          initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

          {/* ── Top Status Bar ── */}
          <div className="flex items-center justify-between px-3 py-1.5 flex-wrap gap-x-4 gap-y-1" style={{ borderBottom: '1px solid rgba(0,212,255,0.05)', background: 'rgba(0,212,255,0.015)' }}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]" style={{ boxShadow: '0 0 4px #00ff9d' }} /><span className="font-orbitron text-[7px] tracking-widest text-[#00ff9d]">ONLINE</span></span>
              <span className="font-orbitron text-[7px] text-[#1e293b]">|</span>
              <span className="flex items-center gap-1"><Shield size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">SHIELD 98.2%</span></span>
              <span className="flex items-center gap-1"><Cpu size={9} className="text-[#0066ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">CPU 12%</span></span>
              <span className="flex items-center gap-1"><Fuel size={9} className="text-[#00ff9d] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">FUEL 87%</span></span>
            </div>
            <span className="flex items-center gap-1"><Clock size={9} className="text-[#475569]" /><span className="font-orbitron text-[8px] text-[#64748b]">T+ {clock}</span></span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Signal size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">SIG 100%</span></span>
              <span className="flex items-center gap-1"><Wifi size={9} className="text-[#00d4ff] opacity-40" /><span className="font-orbitron text-[7px] text-[#334155]">COMM</span></span>
              <span className="flex items-center gap-1"><Radio size={9} className="text-[#00d4ff]" style={{ animation: 'breathe 2s ease-in-out infinite' }} /><span className="font-orbitron text-[7px] text-[#475569]">ACTIVE</span></span>
            </div>
          </div>

          {/* ── 3-Column Layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-0">

            {/* ═══════ LEFT PANEL ═══════ */}
            <div className="p-2.5 lg:border-r space-y-2" style={{ borderColor: 'rgba(0,212,255,0.05)' }}>

              {/* Target destinations */}
              <div className="flex items-center gap-1 mb-1">
                <Target size={9} className="text-[#475569]" />
                <span className="font-orbitron text-[6px] tracking-[0.3em] text-[#475569]">TARGET DESTINATIONS</span>
              </div>
              {certificates.map((c) => {
                const active = c.id === selId;
                return (
                  <motion.button key={c.id} onClick={() => setSelId(c.id)}
                    className="w-full text-left rounded-lg p-2 relative overflow-hidden cursor-pointer transition-all duration-300"
                    style={{ background: active ? c.dim : 'rgba(0,212,255,0.015)', border: `1px solid ${active ? c.color + '30' : 'rgba(0,212,255,0.04)'}` }}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <div className="flex items-center gap-2">
                      <Image src={c.planetImg} alt={c.planet} width={30} height={30} className="rounded-full object-cover shrink-0"
                        style={{ filter: active ? `drop-shadow(0 0 6px ${c.color}80)` : 'brightness(0.4)' }} />
                      <div className="min-w-0 flex-1">
                        <p className="font-orbitron text-[8px] tracking-wider" style={{ color: c.color, opacity: active ? 1 : 0.5 }}>{c.planet}</p>
                        <p className="font-exo text-[9px] text-[#94a3b8] truncate" style={{ opacity: active ? 0.9 : 0.4 }}>{c.title}</p>
                        <div className="flex gap-2 mt-0.5">
                          <span className="font-orbitron text-[6px] text-[#3e4c5e]">{c.distance}ly</span>
                          <span className="font-orbitron text-[6px] text-[#3e4c5e]">{c.gravity}g</span>
                          <span className="font-orbitron text-[6px] text-[#3e4c5e]">{c.vel}c</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {/* Signal waveforms */}
              <div className="pt-1.5" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">SIGNAL WAVEFORMS</span>
                {certificates.map((c) => (
                  <div key={c.id} className="relative">
                    <Wave color={c.color} freq={c.freq} active={c.id === selId} />
                    <span className="absolute right-0 top-0 font-orbitron text-[5px]" style={{ color: c.color, opacity: c.id === selId ? 0.7 : 0.15 }}>{c.freq}GHz</span>
                  </div>
                ))}
              </div>

              {/* Column bars */}
              <div className="pt-1.5" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">POWER OUTPUT</span>
                <BarCols color={sel.color} count={12} />
              </div>

              {/* Dot matrix */}
              <div className="pt-1.5" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">SENSOR ARRAY</span>
                <DotGrid color={sel.color} rows={5} cols={10} />
              </div>

              {/* Probe tracker */}
              <div className="pt-1.5 space-y-1" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">PROBE TRACKER</span>
                {probes.map((p, i) => <ProbeCard key={i} p={p} />)}
              </div>
            </div>

            {/* ═══════ CENTER PANEL ═══════ */}
            <div className="p-3 flex flex-col items-center relative">

              {/* ── Top Instrument Strip ── */}
              <div className="w-full flex items-center justify-between px-2 py-1.5 mb-2 rounded-md" style={{ background: 'rgba(0,212,255,0.02)', border: '1px solid rgba(0,212,255,0.04)' }}>
                <div className="text-center">
                  <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155] block">HEADING</span>
                  <span className="font-orbitron text-[11px] text-[#00d4ff]">247.3°</span>
                </div>
                <div className="text-center">
                  <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155] block">PITCH</span>
                  <span className="font-orbitron text-[11px] text-[#00ff9d]">+12.4°</span>
                </div>
                <div className="text-center">
                  <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155] block">SECTOR</span>
                  <span className="font-orbitron text-[11px] text-[#0066ff]">7-G α</span>
                </div>
                <div className="text-center">
                  <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155] block">ALTITUDE</span>
                  <span className="font-orbitron text-[11px] text-[#00d4ff]">∞</span>
                </div>
                <div className="text-center">
                  <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155] block">SPEED</span>
                  <motion.span className="font-orbitron text-[11px]" style={{ color: sel.color }}
                    key={sel.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {sel.vel}c
                  </motion.span>
                </div>
              </div>

              {/* ── Radar + Side HUD Readouts ── */}
              <div className="w-full flex items-start gap-2">

                {/* Left HUD column */}
                <div className="hidden md:flex flex-col gap-1.5 w-20 shrink-0 pt-8">
                  {[
                    { l: 'THROTTLE', v: '87%', c: '#00ff9d' },
                    { l: 'PITCH', v: '+12.4°', c: '#00d4ff' },
                    { l: 'YAW', v: '-3.2°', c: '#0066ff' },
                    { l: 'ROLL', v: '0.0°', c: '#00d4ff' },
                    { l: 'WARP', v: `${sel.vel}c`, c: sel.color },
                  ].map(({ l, v, c }) => (
                    <div key={l} className="text-right">
                      <span className="font-orbitron text-[5px] tracking-[0.15em] text-[#1e293b] block">{l}</span>
                      <span className="font-orbitron text-[9px]" style={{ color: c }}>{v}</span>
                      <div className="h-px mt-0.5" style={{ background: `linear-gradient(90deg, transparent, ${c}20)` }} />
                    </div>
                  ))}
                  {/* Vertical bar gauges */}
                  <div className="flex gap-1 mt-2 justify-end">
                    {[85, 92, 67, 98, 73].map((h, i) => (
                      <div key={i} className="w-1.5 h-12 rounded-sm bg-[rgba(0,212,255,0.04)] relative overflow-hidden">
                        <motion.div className="absolute bottom-0 w-full rounded-sm"
                          style={{ background: `linear-gradient(to top, ${sel.color}80, ${sel.color}20)` }}
                          initial={{ height: 0 }} whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Radar */}
                <div className="relative w-[260px] h-[260px] md:w-[320px] md:h-[320px] mx-auto shrink-0">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="absolute rounded-full border"
                      style={{ width: `${i * 20}%`, height: `${i * 20}%`, top: `${50 - i * 10}%`, left: `${50 - i * 10}%`,
                        borderColor: `rgba(0,212,255,${0.03 + i * 0.015})` }} />
                  ))}
                  {[0, 45, 90, 135].map((deg) => (
                    <div key={deg} className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: `rotate(${deg}deg)` }}>
                      <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(0,212,255,${deg % 90 === 0 ? 0.1 : 0.04}), transparent)` }} />
                    </div>
                  ))}
                  <HudRing size={300} color="#00d4ff" speed={20} dashes="8 6" />
                  <HudRing size={260} color="#0066ff" speed={15} reverse dashes="4 8 2 8" />
                  <HudRing size={190} color="#00ff9d" speed={25} dashes="2 4" />
                  <div className="absolute inset-[10%] rounded-full pointer-events-none"
                    style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,212,255,0.08) 45deg, transparent 90deg)', animation: 'radarSweep 4s linear infinite' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-3 h-3 rounded-full bg-[#00d4ff]" style={{ boxShadow: '0 0 10px #00d4ff, 0 0 20px rgba(0,212,255,0.4)' }} />
                    <Crosshair size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00d4ff] opacity-25" />
                  </div>
                  {certificates.map((c, idx) => {
                    const angle = (idx * 120 - 90) * (Math.PI / 180);
                    const r = 35;
                    const x = 50 + Math.cos(angle) * r;
                    const y = 50 + Math.sin(angle) * r;
                    const active = c.id === selId;
                    return (
                      <button key={c.id} onClick={() => setSelId(c.id)} className="absolute z-30 cursor-pointer group"
                        aria-label={c.planet}
                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', animation: active ? 'planetFloat 4s ease-in-out infinite' : 'none' }}>
                        {active && <div className="absolute rounded-full" style={{ width: 56, height: 56, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', border: `1px solid ${c.color}40`, animation: 'pulseRing 2s ease-out infinite' }} />}
                        <Image src={c.planetImg} alt={c.planet} width={active ? 46 : 32} height={active ? 46 : 32}
                          className="rounded-full object-cover transition-all duration-400"
                          style={{ filter: active ? `drop-shadow(0 0 14px ${c.color}) drop-shadow(0 0 28px ${c.color}30)` : `brightness(0.5) drop-shadow(0 0 4px ${c.color}40)` }} />
                        <span className="absolute whitespace-nowrap font-orbitron text-[7px] tracking-wider pointer-events-none"
                          style={{ color: c.color, top: '115%', left: '50%', transform: 'translateX(-50%)', opacity: active ? 1 : 0.35 }}>
                          {c.planet}
                        </span>
                      </button>
                    );
                  })}
                  <div className="absolute left-1/2 top-0 w-px h-full pointer-events-none -translate-x-1/2"
                    style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.15), transparent)', animation: 'scanLine 3s ease-in-out infinite' }} />
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="absolute font-orbitron text-[5px] text-[#1e293b] pointer-events-none"
                      style={{ bottom: `${50 - i * 10}%`, right: '47%' }}>{i * 5}ly</span>
                  ))}
                </div>

                {/* ══ Ship Health Scanner ══ */}
                <div className="relative w-[260px] h-[260px] md:w-[300px] md:h-[300px] shrink-0 hidden lg:block rounded-full overflow-hidden"
                  style={{ background: 'rgba(0,212,255,0.015)', border: '1px solid rgba(0,212,255,0.06)' }}>

                  {/* Header */}
                  <div className="absolute top-1.5 left-2 z-30 flex items-center gap-1">
                    <Activity size={8} className="text-[#00d4ff] opacity-60" />
                    <span className="font-orbitron text-[6px] tracking-[0.2em] text-[#334155]">SHIP DIAGNOSTIC X-RAY</span>
                  </div>
                  <div className="absolute top-1.5 right-2 z-30 flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#00ff9d]" style={{ boxShadow: '0 0 3px #00ff9d', animation: 'breathe 2s ease-in-out infinite' }} />
                    <span className="font-orbitron text-[5px] text-[#00ff9d]">SCANNING</span>
                  </div>

                  {/* Grid overlay */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ opacity: 0.15 }}>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <line key={`h${i}`} x1="0" y1={`${(i + 1) * 6.66}%`} x2="100%" y2={`${(i + 1) * 6.66}%`} stroke="#00d4ff" strokeWidth="0.3" />
                    ))}
                    {Array.from({ length: 15 }).map((_, i) => (
                      <line key={`v${i}`} x1={`${(i + 1) * 6.66}%`} y1="0" x2={`${(i + 1) * 6.66}%`} y2="100%" stroke="#00d4ff" strokeWidth="0.3" />
                    ))}
                  </svg>

                  {/* 3D Spaceship model — X-ray look — clickable */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer"
                    onClick={() => setShowCerts(true)}>
                    {/* @ts-expect-error - model-viewer is a web component */}
                    <model-viewer
                      src="/hull_spaceship.glb"
                      alt="Ship Schematic"
                      auto-rotate
                      camera-controls
                      disable-zoom
                      rotation-per-second="20deg"
                      shadow-intensity="0"
                      environment-image="neutral"
                      style={{
                        width: '280px',
                        height: '280px',
                        background: 'transparent',
                        '--poster-color': 'transparent',
                        filter: 'drop-shadow(0 0 10px rgba(0,212,255,0.2))',
                      } as React.CSSProperties}
                    />
                  </div>

                  {/* Rotating scan line */}
                  <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px]"
                      style={{
                        background: 'linear-gradient(90deg, transparent 10%, rgba(0,212,255,0.5) 50%, transparent 90%)',
                        boxShadow: '0 0 8px rgba(0,212,255,0.3), 0 2px 12px rgba(0,212,255,0.15)',
                        animation: 'scanLine 3s ease-in-out infinite',
                      }} />
                  </div>

                  {/* Scan ring */}
                  <div className="absolute inset-[15%] z-10 pointer-events-none">
                    <svg className="w-full h-full" style={{ animation: 'radarSweep 8s linear infinite' }}>
                      <ellipse cx="50%" cy="50%" rx="48%" ry="48%" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                    </svg>
                  </div>

                  {/* Health labels on ship sections */}
                  {[
                    { label: 'BRIDGE', val: '100%', x: '50%', y: '22%', c: '#00ff9d' },
                    { label: 'HULL FORE', val: '100%', x: '50%', y: '40%', c: '#00ff9d' },
                    { label: 'PORT ENG', val: '98.4%', x: '18%', y: '55%', c: '#00d4ff' },
                    { label: 'STBD ENG', val: '99.1%', x: '82%', y: '55%', c: '#00d4ff' },
                    { label: 'AFT ENG', val: '97.6%', x: '50%', y: '75%', c: '#00d4ff' },
                  ].map((s) => (
                    <div key={s.label} className="absolute z-30 text-center pointer-events-none" style={{ left: s.x, top: s.y, transform: 'translate(-50%,-50%)' }}>
                      <div className="w-1 h-1 rounded-full mx-auto mb-0.5" style={{ background: s.c, boxShadow: `0 0 4px ${s.c}`, animation: 'breathe 3s ease-in-out infinite' }} />
                      <span className="font-orbitron text-[5px] tracking-wider block" style={{ color: s.c, textShadow: `0 0 4px ${s.c}40` }}>{s.label}</span>
                      <span className="font-orbitron text-[7px] font-bold" style={{ color: s.c }}>{s.val}</span>
                    </div>
                  ))}

                  {/* Bottom health summary */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 px-2 py-1.5" style={{ background: 'rgba(2,6,18,0.8)', borderTop: '1px solid rgba(0,212,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155]">OVERALL INTEGRITY</span>
                      <span className="font-orbitron text-[7px] text-[#00ff9d]">99.02%</span>
                    </div>
                    <div className="w-full h-1 rounded-full bg-[rgba(0,212,255,0.04)] overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #00ff9d, #00d4ff)', boxShadow: '0 0 6px rgba(0,255,157,0.3)' }}
                        initial={{ width: 0 }} whileInView={{ width: '99%' }}
                        viewport={{ once: true }} transition={{ duration: 1.5, ease: 'easeOut' }} />
                    </div>
                    <div className="flex justify-between mt-1">
                      {[
                        { l: 'HULL', v: '100%' },
                        { l: 'SHIELD', v: '98.2%' },
                        { l: 'POWER', v: '94.7%' },
                        { l: 'LIFE', v: '99.1%' },
                      ].map((s) => (
                        <div key={s.l} className="text-center">
                          <span className="font-orbitron text-[4px] text-[#1e293b] block">{s.l}</span>
                          <span className="font-orbitron text-[6px] text-[#4a5568]">{s.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right HUD column */}
                <div className="hidden md:flex flex-col gap-1.5 w-20 shrink-0 pt-8">
                  {[
                    { l: 'SHIELDS', v: '98.2%', c: '#00ff9d' },
                    { l: 'HULL', v: '100%', c: '#00d4ff' },
                    { l: 'POWER', v: '94.7%', c: '#0066ff' },
                    { l: 'O₂ LVL', v: '99.1%', c: '#00ff9d' },
                    { l: 'FUEL', v: `${sel.fuel}PJ`, c: sel.color },
                  ].map(({ l, v, c }) => (
                    <div key={l} className="text-left">
                      <span className="font-orbitron text-[5px] tracking-[0.15em] text-[#1e293b] block">{l}</span>
                      <span className="font-orbitron text-[9px]" style={{ color: c }}>{v}</span>
                      <div className="h-px mt-0.5" style={{ background: `linear-gradient(270deg, transparent, ${c}20)` }} />
                    </div>
                  ))}
                  {/* Mini circular indicators */}
                  <div className="flex gap-2 mt-2">
                    {[
                      { v: 98, c: '#00ff9d', l: 'SH' },
                      { v: 87, c: '#00d4ff', l: 'PW' },
                      { v: 95, c: '#0066ff', l: 'EN' },
                    ].map(({ v, c, l }) => {
                      const circ = 2 * Math.PI * 10;
                      return (
                        <div key={l} className="text-center">
                          <svg width="28" height="28" className="-rotate-90">
                            <circle cx="14" cy="14" r="10" fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="2" />
                            <circle cx="14" cy="14" r="10" fill="none" stroke={c} strokeWidth="2"
                              strokeDasharray={circ} strokeDashoffset={circ - (v / 100) * circ}
                              strokeLinecap="round" style={{ filter: `drop-shadow(0 0 2px ${c}40)` }} />
                          </svg>
                          <span className="font-orbitron text-[5px] text-[#334155]">{l}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ── Viewport + Hand Controller Row ── */}
              <div className="mt-3 w-full flex flex-col lg:flex-row gap-3 items-stretch">

                {/* Viewport Window: Selected Planet */}
                <AnimatePresence mode="wait">
                  <motion.div key={sel.id} className="flex-1 min-w-0"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>

                    <div className="relative rounded-lg p-4 overflow-hidden h-full" style={{
                      background: 'rgba(0,212,255,0.015)',
                      border: `1px solid ${sel.color}15`,
                      boxShadow: `inset 0 0 30px ${sel.color}05`,
                    }}>
                      {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                        <div key={i} className={`absolute ${pos} w-5 h-5 pointer-events-none`}>
                          <div className="absolute top-0 left-0 w-full h-px" style={{ background: sel.color, opacity: 0.4 }} />
                          <div className="absolute top-0 left-0 h-full w-px" style={{ background: sel.color, opacity: 0.4 }} />
                        </div>
                      ))}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="w-full h-px absolute" style={{
                          background: `linear-gradient(90deg, transparent, ${sel.color}20, transparent)`,
                          animation: 'scanLine 4s ease-in-out infinite',
                        }} />
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0" style={{ animation: 'planetFloat 5s ease-in-out infinite' }}>
                          <div className="absolute inset-[-15px] rounded-full" style={{ background: `radial-gradient(circle, ${sel.color}10 0%, transparent 70%)`, animation: 'pulseGlow 3s ease-in-out infinite' }} />
                          <Image src={sel.planetImg} alt={sel.planet} width={90} height={90} className="rounded-full object-cover relative z-10"
                            style={{ filter: `drop-shadow(0 0 20px ${sel.color}50) drop-shadow(0 0 40px ${sel.color}15)` }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-orbitron text-sm font-semibold tracking-wider" style={{ color: sel.color, textShadow: `0 0 8px ${sel.color}30` }}>{sel.planet}</h3>
                          <p className="font-exo text-[10px] text-[#94a3b8] mt-0.5">{sel.title}</p>
                          <p className="font-exo text-[8px] text-[#4a5568]">{sel.issuer} • {sel.date}</p>
                          <div className="flex gap-3 mt-2">
                            <span className="font-orbitron text-[8px]" style={{ color: sel.color }}>{sel.distance}ly</span>
                            <span className="font-orbitron text-[8px]" style={{ color: sel.color }}>{sel.gravity}g</span>
                            <span className="font-orbitron text-[8px]" style={{ color: sel.color }}>{sel.vel}c</span>
                            <span className="font-orbitron text-[8px]" style={{ color: sel.color }}>{sel.temp}</span>
                          </div>
                          <Wave color={sel.color} freq={sel.freq} active={true} />
                        </div>
                      </div>

                      <div className="absolute top-1 left-2 font-orbitron text-[5px] text-[#334155]">VIEWPORT-01 • LIVE</div>
                      <div className="absolute top-1 right-2 flex items-center gap-1">
                        <div className="w-1 h-1 rounded-full bg-[#ff4444]" style={{ animation: 'breathe 1s ease-in-out infinite' }} />
                        <span className="font-orbitron text-[5px] text-[#ff4444]">REC</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* 3D Earth Hologram — side by side */}
                <div className="w-full lg:w-[280px] shrink-0 flex flex-col">
                  <div className="flex items-center gap-1 mb-1">
                    <Orbit size={8} className="text-[#334155]" />
                    <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155]">HOLOGRAPHIC DISPLAY</span>
                  </div>
                  <div className="relative flex-1 min-h-[180px] rounded-lg overflow-hidden"
                    style={{ background: 'rgba(0,212,255,0.01)', border: '1px solid rgba(0,212,255,0.08)' }}>
                    {/* Scan line overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                      <div className="w-full h-px absolute" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)', animation: 'scanLine 4s ease-in-out infinite' }} />
                    </div>
                    {/* Corner brackets */}
                    {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                      <div key={i} className={`absolute ${pos} w-4 h-4 pointer-events-none z-10`}>
                        <div className="absolute top-0 left-0 w-full h-px bg-[#00d4ff] opacity-30" />
                        <div className="absolute top-0 left-0 h-full w-px bg-[#00d4ff] opacity-30" />
                      </div>
                    ))}
                    {/* 3D Canvas */}
                    <EarthHologram />
                    {/* Bottom label */}
                    <div className="absolute bottom-1.5 left-0 right-0 flex justify-center z-10 pointer-events-none">
                      <span className="font-orbitron text-[6px] tracking-[0.3em] text-[#334155]">EARTH HOLOGRAM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Flight Trajectory ── */}
              <div className="w-full max-w-md mx-auto mt-2">
                <div className="flex items-center gap-1 mb-1">
                  <Navigation size={8} className="text-[#334155]" />
                  <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#334155]">FLIGHT TRAJECTORY</span>
                </div>
                <svg viewBox="0 0 400 50" className="w-full h-8" preserveAspectRatio="none">
                  {/* Grid */}
                  {[0, 100, 200, 300, 400].map((x) => (
                    <line key={x} x1={x} y1="0" x2={x} y2="50" stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" />
                  ))}
                  {[0, 25, 50].map((y) => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" />
                  ))}
                  {/* Trajectory path */}
                  <motion.path
                    d="M 20,40 C 80,38 120,15 180,20 S 280,35 350,12 L 390,10"
                    fill="none" stroke={sel.color} strokeWidth="1.5" strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 3px ${sel.color}40)` }}
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                  {/* Origin dot */}
                  <circle cx="20" cy="40" r="3" fill="#00ff9d" style={{ filter: 'drop-shadow(0 0 3px #00ff9d)' }} />
                  <text x="25" y="48" fill="#334155" className="font-orbitron" fontSize="4">ORIGIN</text>
                  {/* Destination dot */}
                  <motion.circle cx="390" cy="10" r="3" fill={sel.color}
                    style={{ filter: `drop-shadow(0 0 3px ${sel.color})` }}
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  <text x="370" y="8" fill={sel.color} className="font-orbitron" fontSize="4">{sel.planet.split(' ')[0]}</text>
                </svg>
              </div>

              {/* ── Gauges Row ── */}
              <div className="flex gap-3 mt-2 justify-center">
                <CG val={sel.distance} max={15} color={sel.color} label="DIST (ly)" unit="" />
                <CG val={sel.gravity} max={2} color={sel.color} label="GRAVITY" unit="g" />
                <CG val={Math.round(sel.vel * 100)} max={100} color={sel.color} label="VELOCITY" unit="%" />
                <CG val={Math.round(sel.fuel)} max={150} color={sel.color} label="FUEL (PJ)" unit="" />
                <CG val={98} max={100} color="#00ff9d" label="SHIELD" unit="%" />
                <CG val={100} max={100} color="#00d4ff" label="HULL" unit="%" />
              </div>

              {/* ── Navigation Controls ── */}
              <div className="flex gap-2 mt-3 justify-center">
                {[
                  { label: 'ENGAGE', icon: Zap, c: '#00ff9d' },
                  { label: 'SCAN', icon: Radar, c: '#00d4ff' },
                  { label: 'LOCK ON', icon: Target, c: '#0066ff' },
                  { label: 'WARP', icon: Orbit, c: sel.color },
                ].map(({ label, icon: Icon, c }) => (
                  <motion.div key={label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md cursor-pointer select-none"
                    style={{ background: `${c}08`, border: `1px solid ${c}20` }}
                    whileHover={{ scale: 1.05, boxShadow: `0 0 12px ${c}15` }}
                    whileTap={{ scale: 0.95 }}>
                    <Icon size={10} style={{ color: c }} />
                    <span className="font-orbitron text-[7px] tracking-wider" style={{ color: c }}>{label}</span>
                  </motion.div>
                ))}
              </div>



              {/* ── Lightning Flash Overlay ── */}
              <AnimatePresence>
                {lightning && (
                  <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.08 }}>

                    {/* Bright white flash */}
                    <motion.div className="absolute inset-0"
                      style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.25) 0%, rgba(0,212,255,0.08) 40%, transparent 75%)' }}
                      animate={{ opacity: [0, 1, 0.3, 0.7, 0] }}
                      transition={{ duration: 0.5, ease: 'easeOut' }} />

                    {/* Cyan flash layer */}
                    <motion.div className="absolute inset-0"
                      style={{ background: 'radial-gradient(circle at center, rgba(0,212,255,0.2) 0%, transparent 60%)' }}
                      animate={{ opacity: [1, 0.4, 0.9, 0.2, 0] }}
                      transition={{ duration: 0.6, ease: 'easeOut' }} />

                    {/* Lightning bolts SVG — 5 bolts for realism */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
                      {/* Main center bolt - thick */}
                      <motion.path
                        d="M 960,0 L 945,120 L 975,140 L 935,280 L 965,300 L 925,440 L 955,460 L 915,600 L 945,620 L 905,760 L 960,800 L 920,940 L 950,980 L 960,1080"
                        fill="none" stroke="white" strokeWidth="3" strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 20px #00d4ff) drop-shadow(0 0 40px rgba(0,212,255,0.8)) drop-shadow(0 0 60px rgba(255,255,255,0.3))' }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 1, 0.9, 1, 0.6, 0], pathLength: [0, 1] }}
                        transition={{ duration: 0.35 }} />
                      {/* Center glow fill */}
                      <motion.path
                        d="M 960,0 L 945,120 L 975,140 L 935,280 L 965,300 L 925,440 L 955,460 L 915,600 L 945,620 L 905,760 L 960,800 L 920,940 L 950,980 L 960,1080"
                        fill="none" stroke="rgba(0,212,255,0.6)" strokeWidth="8" strokeLinejoin="round"
                        style={{ filter: 'blur(3px)' }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 0.8, 0.4, 0], pathLength: [0, 1] }}
                        transition={{ duration: 0.4 }} />

                      {/* Left bolt */}
                      <motion.path
                        d="M 350,0 L 370,100 L 340,130 L 380,250 L 350,280 L 390,400 L 360,430 L 400,560 L 370,590 L 340,720"
                        fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 15px #00d4ff) drop-shadow(0 0 30px rgba(0,212,255,0.6))' }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 1, 0.7, 0], pathLength: [0, 1] }}
                        transition={{ duration: 0.3, delay: 0.04 }} />

                      {/* Right bolt */}
                      <motion.path
                        d="M 1550,0 L 1530,90 L 1560,120 L 1520,260 L 1550,290 L 1510,420 L 1540,450 L 1500,580 L 1530,610 L 1560,740"
                        fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 15px #00d4ff) drop-shadow(0 0 30px rgba(0,212,255,0.6))' }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 0.9, 0.5, 0], pathLength: [0, 1] }}
                        transition={{ duration: 0.28, delay: 0.08 }} />

                      {/* Branch bolt - left of center */}
                      <motion.path
                        d="M 935,280 L 880,340 L 860,420 L 830,480"
                        fill="none" stroke="rgba(200,240,255,0.8)" strokeWidth="1.5" strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 1, 0], pathLength: [0, 1] }}
                        transition={{ duration: 0.25, delay: 0.1 }} />

                      {/* Branch bolt - right of center */}
                      <motion.path
                        d="M 965,300 L 1020,370 L 1040,440 L 1070,510"
                        fill="none" stroke="rgba(200,240,255,0.8)" strokeWidth="1.5" strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 10px #00d4ff)' }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: [0, 1, 0], pathLength: [0, 1] }}
                        transition={{ duration: 0.22, delay: 0.12 }} />
                    </svg>

                    {/* Screen flicker */}
                    <motion.div className="absolute inset-0"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                      animate={{ opacity: [0, 1, 0, 0.5, 0, 0.3, 0] }}
                      transition={{ duration: 0.5, ease: 'linear' }} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Certificate Popup Modal ── */}
              <AnimatePresence>
                {showCerts && (
                  <motion.div
                    className="fixed inset-0 z-[9998] flex items-center justify-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}>

                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCerts(false)} />

                    {/* Modal */}
                    <motion.div
                      className="relative z-10 w-[90vw] max-w-3xl rounded-xl p-6 overflow-hidden"
                      style={{ background: 'rgba(2,6,18,0.95)', border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 60px rgba(0,212,255,0.1), inset 0 0 40px rgba(0,212,255,0.02)' }}
                      initial={{ scale: 0.8, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 30 }}
                      transition={{ type: 'spring', damping: 20, stiffness: 200 }}>

                      {/* Scan line */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="w-full h-px absolute" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)', animation: 'scanLine 4s ease-in-out infinite' }} />
                      </div>

                      {/* Corner brackets */}
                      {['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'].map((pos, i) => (
                        <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`}>
                          <div className="absolute top-0 left-0 w-full h-px bg-[#00d4ff] opacity-40" />
                          <div className="absolute top-0 left-0 h-full w-px bg-[#00d4ff] opacity-40" />
                        </div>
                      ))}

                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-[#00d4ff]" />
                          <span className="font-orbitron text-xs tracking-[0.3em] text-[#00d4ff]">SHIP CARGO — CERTIFICATES</span>
                        </div>
                        <button onClick={() => setShowCerts(false)} className="font-orbitron text-xs text-[#ff4444] hover:text-[#ff6666] transition-colors tracking-wider">✕ CLOSE</button>
                      </div>

                      {/* Certificate grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {certificates.map((cert) => (
                          <motion.div key={cert.id}
                            className="relative rounded-lg overflow-hidden group"
                            style={{ background: 'rgba(0,212,255,0.02)', border: `1px solid ${cert.color}20` }}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: certificates.indexOf(cert) * 0.1 }}
                            whileHover={{ borderColor: `${cert.color}50`, boxShadow: `0 0 20px ${cert.color}15` }}>
                            <div className="relative w-full aspect-[4/3] overflow-hidden">
                              <Image src={cert.certImg} alt={cert.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 60%, rgba(2,6,18,0.9) 100%)` }} />
                            </div>
                            <div className="p-3 -mt-6 relative z-10">
                              <h4 className="font-orbitron text-[10px] font-semibold tracking-wider" style={{ color: cert.color }}>{cert.planet}</h4>
                              <p className="font-exo text-[9px] text-[#94a3b8] mt-0.5">{cert.title}</p>
                              <p className="font-exo text-[7px] text-[#4a5568]">{cert.issuer} • {cert.date}</p>
                              <div className="flex items-center gap-2 mt-1.5">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ background: cert.color, boxShadow: `0 0 4px ${cert.color}` }} />
                                <span className="font-orbitron text-[6px] text-[#4a5568]">VERIFIED</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Bottom Coordinates ── */}
              <div className="w-full flex justify-between mt-2 px-1">
                <span className="font-orbitron text-[5px] text-[#0f1729]">X: 0047.392</span>
                <span className="font-orbitron text-[5px] text-[#0f1729]">Y: -0122.441</span>
                <span className="font-orbitron text-[5px] text-[#0f1729]">Z: 0008.710</span>
              </div>
            </div>

            {/* ═══════ RIGHT PANEL ═══════ */}
            <div className="p-2.5 lg:border-l space-y-2" style={{ borderColor: 'rgba(0,212,255,0.05)' }}>

              {/* Mission data header */}
              <div className="flex items-center gap-1">
                <Gauge size={9} className="text-[#475569]" />
                <span className="font-orbitron text-[6px] tracking-[0.3em] text-[#475569]">MISSION DATA</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={sel.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.3 }} className="space-y-2">

                  {/* Credential card */}
                  <div className="rounded-lg p-2" style={{ background: sel.dim, border: `1px solid ${sel.color}15` }}>
                    <div className="flex items-center gap-1.5 mb-1">
                      <Award size={12} style={{ color: sel.color }} />
                      <span className="font-orbitron text-[7px] tracking-wider" style={{ color: sel.color }}>CREDENTIAL FILE</span>
                    </div>
                    <p className="font-exo text-[10px] text-[#cbd5e1] leading-relaxed">{sel.title}</p>
                    <p className="font-exo text-[8px] text-[#4a5568] mt-0.5">Issued: {sel.issuer} • {sel.date}</p>
                    <span className="inline-block font-orbitron text-[6px] px-1.5 py-0.5 rounded-full mt-1"
                      style={{ color: sel.color, background: `${sel.color}08`, border: `1px solid ${sel.color}15` }}>{sel.category}</span>
                  </div>

                  {/* Nav data readouts */}
                  <div className="space-y-0.5">
                    <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b] block">NAVIGATION</span>
                    {[
                      { icon: Navigation, l: 'DIST', v: `${sel.distance} ly` },
                      { icon: Weight, l: 'GRAV', v: `${sel.gravity}g` },
                      { icon: Clock, l: 'ETA', v: sel.eta },
                      { icon: Thermometer, l: 'TEMP', v: sel.temp },
                      { icon: Activity, l: 'ATMO', v: sel.atmo },
                      { icon: Gauge, l: 'VEL', v: `${sel.vel}c` },
                      { icon: Fuel, l: 'FUEL', v: `${sel.fuel} PJ` },
                    ].map(({ icon: I, l, v }) => (
                      <div key={l} className="flex items-center gap-1.5 py-0.5">
                        <I size={10} style={{ color: sel.color, opacity: 0.5 }} />
                        <span className="font-orbitron text-[7px] tracking-widest text-[#3e4c5e] w-11">{l}</span>
                        <span className="font-orbitron text-[9px] tracking-wider" style={{ color: sel.color }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-1.5" style={{ borderTop: '1px solid rgba(0,212,255,0.03)', paddingTop: 6 }}>
                    {[
                      { label: 'DISTANCE', val: sel.distance, max: 15, color: sel.color },
                      { label: 'FUEL REQ', val: sel.fuel, max: 150, color: '#00ff9d' },
                      { label: 'VELOCITY', val: sel.vel * 100, max: 100, color: '#0066ff' },
                    ].map((b) => (
                      <div key={b.label}>
                        <div className="flex justify-between mb-0.5">
                          <span className="font-orbitron text-[5px] tracking-[0.15em] text-[#334155]">{b.label}</span>
                          <span className="font-orbitron text-[6px]" style={{ color: b.color }}>{Math.round(b.val)}/{b.max}</span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-[rgba(0,212,255,0.03)] overflow-hidden">
                          <motion.div className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${b.color}, ${b.color}40)`, boxShadow: `0 0 4px ${b.color}25` }}
                            initial={{ width: 0 }} animate={{ width: `${(b.val / b.max) * 100}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Column bars */}
                  <div style={{ borderTop: '1px solid rgba(0,212,255,0.03)', paddingTop: 6 }}>
                    <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">SIGNAL QUALITY</span>
                    <BarCols color={sel.color} count={16} />
                  </div>

                  {/* Dot matrix */}
                  <div style={{ borderTop: '1px solid rgba(0,212,255,0.03)', paddingTop: 6 }}>
                    <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">COMM MATRIX</span>
                    <DotGrid color={sel.color} rows={4} cols={12} />
                  </div>

                  {/* Satellite row */}
                  <div className="flex justify-between pt-1.5" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                    {[
                      { img: '/james-webb-space-telescope-jwst.png', name: 'JWST' },
                      { img: '/hubble-space-telescope.png', name: 'HUBBLE' },
                      { img: '/voyager1.png', name: 'VOYAGER' },
                      { img: '/international-space-station-iss-space.png', name: 'ISS' },
                    ].map((s) => (
                      <div key={s.name} className="text-center">
                        <Image src={s.img} alt={s.name} width={30} height={30} className="opacity-35 mx-auto hover:opacity-70 transition-opacity"
                          style={{ filter: 'drop-shadow(0 0 3px rgba(0,212,255,0.25))' }} />
                        <span className="font-orbitron text-[4px] text-[#1e293b] block mt-0.5">{s.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mini gauges row */}
                  <div className="flex justify-between pt-1.5 px-1" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                    <CG val={98} max={100} color="#00ff9d" label="SHIELD" unit="%" />
                    <CG val={87} max={100} color="#00d4ff" label="HULL" unit="%" />
                    <CG val={12} max={100} color="#0066ff" label="LOAD" unit="%" />
                  </div>

                  {/* Subsystems */}
                  <div className="space-y-0.5 pt-1" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                    <span className="font-orbitron text-[5px] tracking-[0.3em] text-[#1e293b]">SUBSYSTEMS</span>
                    {[
                      { label: 'WARP DRIVE', value: 'READY', on: true },
                      { label: 'NAV ARRAY', value: 'LOCKED', on: true },
                      { label: 'DEFLECTOR', value: 'ACTIVE', on: true },
                      { label: 'LIFE SUPPORT', value: '100%', on: true },
                      { label: 'QUANTUM CORE', value: 'STABLE', on: true },
                      { label: 'HYPERDRIVE', value: 'STANDBY', on: true },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center gap-1 py-0.5">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: s.on ? '#00ff9d' : '#ff4444', boxShadow: `0 0 3px ${s.on ? '#00ff9d' : '#ff4444'}`, animation: 'breathe 2s ease-in-out infinite' }} />
                        <span className="font-orbitron text-[6px] tracking-wider text-[#3e4c5e]">{s.label}</span>
                        <span className="font-orbitron text-[7px] ml-auto" style={{ color: sel.color }}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Origin */}
                  <div className="flex items-center gap-2 pt-1.5 pb-1" style={{ borderTop: '1px solid rgba(0,212,255,0.03)' }}>
                    <Image src="/earth-depicted-anime-style (1).png" alt="Origin" width={24} height={24} className="rounded-full opacity-50"
                      style={{ filter: 'drop-shadow(0 0 3px rgba(0,212,255,0.3))' }} />
                    <div>
                      <span className="font-orbitron text-[5px] tracking-[0.2em] text-[#1e293b] block">ORIGIN</span>
                      <span className="font-orbitron text-[7px] text-[#4a5568]">Earth • Sol System</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Bottom Ticker ── */}
          <div className="w-full overflow-hidden h-4 relative" style={{ borderTop: '1px solid rgba(0,212,255,0.04)' }}>
            <div className="absolute whitespace-nowrap font-orbitron text-[6px] tracking-[0.25em] text-[#0f1729] leading-4"
              style={{ animation: 'tickerScroll 30s linear infinite' }}>
              ◆ NAV-SYS v4.7.2 ONLINE ◆ WARP CORE STABLE ◆ SHIELD 98.2% ◆ ANTIMATTER CONTAINMENT SECURE ◆ GRAVITON FIELD NOMINAL ◆ HULL INTEGRITY 100% ◆ COMM ARRAY ACTIVE ◆ QUANTUM LOCK ENGAGED ◆ HYPERSPACE ROUTE CALCULATED ◆ NEURAL LINK SYNCED ◆ DEFLECTORS ONLINE ◆ LIFE SUPPORT NOMINAL ◆ CARGO SEALED ◆ COORDINATES LOCKED ◆
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
