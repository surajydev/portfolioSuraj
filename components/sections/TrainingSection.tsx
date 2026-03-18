'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import CosmicBackground from '../CosmicBackground';
import Image from 'next/image';

const MOON_SIZE = 280;

const trainingBullets = [
  'Explored core Design Thinking concepts, improving ability to frame problems and identify user pain points through structured exercises.',
  'Practiced Figma for wireframing and prototyping, strengthening layout and interaction design skills across weekly tasks.',
  'Applied user feedback and design principles to refine interfaces, enhancing usability evaluation skills during guided reviews.',
];

const trainingTech = ['Figma', 'Design Thinking Frameworks', 'UX Research Tools'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function TrainingSection() {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <section id="training" className="relative py-24 overflow-hidden" style={{ height: '120vh' }}>
      <CosmicBackground variant="binary" />

      {/* CSS orbit keyframes — matches ProjectsSection satellite pattern */}
      <style jsx>{`
        @keyframes training-ellipse-revolve {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
        }

        @keyframes training-depth-toggle {
          0%    { z-index: 20; }
          64%   { z-index: 20; }
          65%   { z-index: 1; }
          85%   { z-index: 1; }
          86%   { z-index: 20; }
          100%  { z-index: 20; }
        }

        .training-orbit-path {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 700px;
          height: 270px;
          margin-left: -350px;
          margin-top: -135px;
          transform: rotateZ(-20deg);
          transform-style: preserve-3d;
        }

        .training-sat-mover {
          offset-path: ellipse(350px 135px);
          offset-rotate: 0deg;
          animation: training-ellipse-revolve 20s linear infinite;
        }

        .training-depth-wrap {
          animation: training-depth-toggle 20s step-end infinite;
        }

        /* Counter-rotate so station stays upright */
        .training-sat-mover > div {
          transform: rotateZ(20deg);
        }

        /* Pause orbit on hover for easy clicking */
        .training-depth-wrap:has(:hover) {
          animation-play-state: paused !important;
        }
        .training-sat-mover:hover {
          animation-play-state: paused;
        }

        /* Moon glow pulse */
        @keyframes moon-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(180,195,210,0.2), 0 0 80px rgba(180,195,210,0.1); }
          50% { box-shadow: 0 0 60px rgba(180,195,210,0.35), 0 0 100px rgba(180,195,210,0.15); }
        }
        .moon-glow {
          animation: moon-glow 4s ease-in-out infinite;
        }

        /* Renaissance orbit — ISS-like: wider near-circular, 52° inclination */
        .renaissance-orbit-path {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 880px;
          height: 340px;
          margin-left: -440px;
          margin-top: -170px;
          transform: rotateZ(25deg);
          transform-style: preserve-3d;
        }
        .renaissance-mover {
          offset-path: ellipse(440px 170px);
          offset-rotate: 0deg;
          animation: training-ellipse-revolve 25s linear infinite;
          animation-delay: -8s;
        }
        .renaissance-depth {
          animation: renaissance-depth-toggle 25s step-end infinite;
          animation-delay: -8s;
        }
        @keyframes renaissance-depth-toggle {
          0%    { z-index: 20; }
          39%   { z-index: 20; }
          40%   { z-index: 1; }
          60%   { z-index: 1; }
          61%   { z-index: 20; }
          100%  { z-index: 20; }
        }
        .renaissance-mover > div { transform: rotateZ(-25deg); }
        .renaissance-depth:has(:hover) { animation-play-state: paused !important; }
        .renaissance-mover:hover { animation-play-state: paused; }

        /* Artemis orbit — NRHO-inspired: elongated, high inclination, slower */
        .artemis-orbit-path {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 1060px;
          height: 280px;
          margin-left: -530px;
          margin-top: -140px;
          transform: rotateZ(-40deg);
          transform-style: preserve-3d;
        }
        .artemis-mover {
          offset-path: ellipse(530px 140px);
          offset-rotate: 0deg;
          animation: training-ellipse-revolve 38s linear infinite;
          animation-delay: -15s;
        }
        .artemis-depth {
          animation: artemis-depth-toggle 38s step-end infinite;
          animation-delay: -15s;
        }
        @keyframes artemis-depth-toggle {
          0%    { z-index: 20; }
          64%   { z-index: 20; }
          65%   { z-index: 1; }
          85%   { z-index: 1; }
          86%   { z-index: 20; }
          100%  { z-index: 20; }
        }
        .artemis-mover > div { transform: rotateZ(40deg); }
        .artemis-depth:has(:hover) { animation-play-state: paused !important; }
        .artemis-mover:hover { animation-play-state: paused; }

        /* Responsive */
        @media (max-width: 1023px) {
          .training-orbit-path { width: 520px; height: 200px; margin-left: -260px; margin-top: -100px; }
          .training-sat-mover { offset-path: ellipse(260px 100px); offset-rotate: 0deg; }
          .renaissance-orbit-path { width: 660px; height: 255px; margin-left: -330px; margin-top: -127px; }
          .renaissance-mover { offset-path: ellipse(330px 127px); offset-rotate: 0deg; }
          .artemis-orbit-path { width: 800px; height: 210px; margin-left: -400px; margin-top: -105px; }
          .artemis-mover { offset-path: ellipse(400px 105px); offset-rotate: 0deg; }
        }
        @media (max-width: 767px) {
          .training-orbit-path { width: 380px; height: 146px; margin-left: -190px; margin-top: -73px; }
          .training-sat-mover { offset-path: ellipse(190px 73px); offset-rotate: 0deg; }
          .renaissance-orbit-path { width: 480px; height: 185px; margin-left: -240px; margin-top: -92px; }
          .renaissance-mover { offset-path: ellipse(240px 92px); offset-rotate: 0deg; }
          .artemis-orbit-path { width: 580px; height: 153px; margin-left: -290px; margin-top: -76px; }
          .artemis-mover { offset-path: ellipse(290px 76px); offset-rotate: 0deg; }
        }
      `}</style>

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/beautiful-shot-starry-night-sky.jpg" alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-[#020817]/60" />
      </div>

      {/* Moon + Orbiting Space Station */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 5, paddingTop: 280 }}>
        {/* Earth – background planet */}
        <div className="absolute" style={{ top: '12%', left: '15%', zIndex: 2, opacity: 0.7 }}>
          <Image
            src="/earth.png"
            alt="Earth"
            width={60}
            height={60}
            className="rounded-full object-cover"
            style={{ filter: 'brightness(0.9) drop-shadow(0 0 12px rgba(60,130,255,0.35))' }}
          />
        </div>
        {/* Mars – background planet */}
        <div className="absolute" style={{ top: '18%', right: '18%', zIndex: 2, opacity: 0.6 }}>
          <Image
            src="/mars.jpeg"
            alt="Mars"
            width={40}
            height={40}
            className="rounded-full object-cover"
            style={{ filter: 'brightness(0.85) drop-shadow(0 0 10px rgba(200,80,40,0.3))' }}
          />
        </div>

        {/* Moon + orbit container */}
        <div className="relative" style={{ width: MOON_SIZE, height: MOON_SIZE }}>
          {/* Moon glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,210,220,0.25) 0%, transparent 70%)',
              filter: 'blur(24px)',
              transform: 'scale(1.6)',
            }}
          />
          {/* Moon image */}
          <Image
            src="/beautiful-glowing-gray-full-moon.jpg"
            alt="Moon"
            width={MOON_SIZE}
            height={MOON_SIZE}
            className="rounded-full object-cover relative moon-glow"
            style={{ zIndex: 10, filter: 'brightness(0.85) contrast(1.1)' }}
          />

          {/* Renaissance — ISS-like orbit */}
          <div className="renaissance-orbit-path pointer-events-none">
            <div className="w-full h-full rounded-[50%]" style={{ border: '1px solid rgba(0,212,255,0.08)' }} />
          </div>
          <div className="renaissance-orbit-path renaissance-depth">
            <div className="renaissance-mover" style={{ position: 'absolute', left: 0, top: 0 }}>
              <div className="relative pointer-events-none">
                <div className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">
                  <Image
                    src="/space-station-orbit-around-earth.png"
                    alt="Renaissance"
                    width={56}
                    height={56}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[8px] md:text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md"
                  style={{ color: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.25)' }}
                >
                  Renaissance
                </div>
              </div>
            </div>
          </div>

          {/* Artemis — NRHO-inspired orbit */}
          <div className="artemis-orbit-path pointer-events-none">
            <div className="w-full h-full rounded-[50%]" style={{ border: '1px solid rgba(138,92,246,0.08)' }} />
          </div>
          <div className="artemis-orbit-path artemis-depth">
            <div className="artemis-mover" style={{ position: 'absolute', left: 0, top: 0 }}>
              <div className="relative pointer-events-none">
                <div className="w-10 h-10 md:w-12 md:h-12 drop-shadow-[0_0_10px_rgba(138,92,246,0.5)]">
                  <Image
                    src="/freepik__upload__82721.png"
                    alt="Artemis"
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[8px] md:text-[10px] px-2 py-0.5 rounded-full backdrop-blur-md"
                  style={{ color: '#8b5cf6', backgroundColor: 'rgba(138,92,246,0.08)', border: '1px solid rgba(138,92,246,0.25)' }}
                >
                  Artemis
                </div>
              </div>
            </div>
          </div>

          {/* Orbit ring (visual) */}
          <div className="training-orbit-path pointer-events-none">
            <div
              className="w-full h-full rounded-[50%]"
              style={{ border: '1px solid rgba(0,255,157,0.1)' }}
            />
          </div>

          {/* Satellite — CSS offset-path orbit */}
          <div className="training-orbit-path training-depth-wrap">
            <div className="training-sat-mover" style={{ position: 'absolute', left: 0, top: 0 }}>
              <div
                className="relative group cursor-pointer pointer-events-auto"
                onClick={() => setIsCardOpen((v) => !v)}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 transition-all duration-300 hover:scale-125 drop-shadow-[0_0_12px_rgba(0,255,157,0.5)]">
                  <Image
                    src="/—Pngtree—space station with solar panels_16350001.png"
                    alt="Think Design Prototype"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>
                {/* Label pill */}
                <div
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[9px] md:text-[11px] px-3 py-1 rounded-full backdrop-blur-md"
                  style={{
                    color: '#00ff9d',
                    backgroundColor: 'rgba(0,255,157,0.08)',
                    border: '1px solid rgba(0,255,157,0.25)',
                  }}
                >
                  Think Design Prototype
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Training heading */}
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
      </div>

      {/* Project detail card overlay — matches ProjectsSection pattern */}
      {isCardOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsCardOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative glass rounded-xl p-6 md:p-8 max-w-lg w-full z-10"
            style={{
              borderLeftWidth: '4px',
              borderLeftColor: '#00ff9d',
              boxShadow: '0 8px 40px rgba(0,255,157,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCardOpen(false)}
              className="absolute top-3 right-3 text-[#94a3b8] hover:text-white text-lg"
            >✕</button>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 flex items-center justify-center">
                  <BookOpen size={16} className="text-[#00ff9d]" />
                </div>
              </div>
              <span className="font-exo text-xs px-3 py-1 rounded-full bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/25">
                Jun 2025 – Jul 2025
              </span>
            </div>
            <h4 className="font-orbitron text-lg font-semibold text-[#e2e8f0] mb-1">Think Design Prototype</h4>
            <p className="font-exo text-sm text-[#94a3b8] mb-4">Design Thinking &amp; Figma Certification Training</p>
            <ul className="space-y-2 mb-4">
              {trainingBullets.map((b, i) => (
                <li key={i} className="font-exo text-xs text-[#94a3b8] leading-relaxed flex gap-2">
                  <CheckCircle2 size={14} className="text-[#00ff9d] mt-0.5 flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1.5">
              {trainingTech.map((t) => (
                <span key={t} className="font-exo text-[10px] px-2 py-0.5 rounded border border-[#94a3b8]/20 text-[#94a3b8] bg-[#0f172a]/50">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
