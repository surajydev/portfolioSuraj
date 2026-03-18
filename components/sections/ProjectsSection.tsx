'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// lucide-react icons available if needed
import Image from 'next/image';
import CosmicBackground from '../CosmicBackground';

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  updatedAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Java: '#b07219',
  Python: '#3776ab',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const mos = Math.floor(days / 30);
  return `${mos} month${mos > 1 ? 's' : ''} ago`;
}

const featuredProjects = [
  {
    title: 'PayPal Clone',
    subtitle: 'Microservices-Based FinTech Platform',
    color: '#0066ff',
    status: 'Completed',
    statusColor: '#00ff9d',
    date: 'Oct 2025 – Nov 2025',
    image: '/hubble-space-telescope.png',
    bullets: [
      'Built modular PayPal-style system with microservices for users, wallets, transactions and notifications — improved structure by 25%.',
      'Configured Kafka and Redis for event streaming and caching, reducing transaction delays by 15–20%.',
      'Deployed all services via Docker and API Gateway with Eureka for smoother routing and service discovery.',
    ],
    tech: ['Spring Boot', 'Kafka', 'JWT', 'Docker', 'API Gateway', 'REST APIs', 'Eureka'],
    stats: ['25% Better Structure', '15–20% Faster Transactions'],
  },
  {
    title: 'UniUnite',
    subtitle: 'Campus Networking Platform',
    color: '#00d4ff',
    status: 'Completed',
    statusColor: '#00ff9d',
    date: 'Feb 2025 – Apr 2025',
    image: '/international-space-station-iss-space.png',
    bullets: [
      'Designed Profile Module UI with HTML, CSS and JavaScript — organized bio, education and skills sections with responsiveness.',
      'Converted student needs into UI/UX Figma designs, improving feature flow for communities, events and notes.',
      'Assisted in campus promotions during beta launch, supporting early user engagement and usability feedback.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Font Awesome', 'UI/UX'],
    stats: [],
  },
  {
    title: 'Healthcare App',
    subtitle: 'UI/UX Prototype',
    color: '#00ff9d',
    status: 'UI/UX Prototype',
    statusColor: '#00b4d8',
    date: 'Oct 2024',
    image: '/james-webb-space-telescope-jwst.png',
    bullets: [
      'Developed hospital-service prototype with cleaner appointments, insurance and resource navigation — reduced user confusion by 25%.',
      'Optimized booking steps, lowering the interaction sequence by 30% through clearer transitions.',
      'Crafted responsive screens for appointments, insurance and resources, improving readability by 20% across devices.',
    ],
    tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    stats: ['25% Less Confusion', '30% Fewer Steps'],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function ProjectsSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Load model-viewer script once
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="projects" className="relative py-16 overflow-hidden section-highlight">
      {/* Starry night background */}
      <div className="absolute inset-0 z-0">
        <img src="/beautiful-shot-starry-night-sky.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0e1a]/70" />
      </div>
      <CosmicBackground variant="constellation" />

      {/* Constellation background — 6 unique patterns representing GitHub repos */}
      {repos.length > 0 && (
        <div className="absolute inset-0 z-[12] pointer-events-none overflow-hidden">
          <style>{`
            @keyframes twinkle {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 1; }
            }
            @keyframes twinkle-slow {
              0%, 100% { opacity: 0.15; }
              40% { opacity: 1; }
              60% { opacity: 0.8; }
            }
            .constellation-star {
              animation: twinkle 1.5s ease-in-out infinite;
            }
            .constellation-star-slow {
              animation: twinkle-slow 2.5s ease-in-out infinite;
            }
            .constellation-line {
              stroke: rgba(255, 255, 255, 0.25);
              stroke-width: 0.6;
              filter: drop-shadow(0 0 2px rgba(200, 220, 255, 0.5));
            }
            .constellation-label {
              fill: rgba(140, 200, 255, 0.6);
              font-family: 'Orbitron', sans-serif;
              font-size: 10px;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              pointer-events: auto;
              cursor: pointer;
              transition: fill 0.3s, filter 0.3s;
            }
            .constellation-label:hover {
              fill: rgba(200, 230, 255, 1);
              filter: drop-shadow(0 0 6px rgba(100, 180, 255, 0.8));
            }
          `}</style>
          <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
            {/* Constellation 1 — top-left */}
            <g>
              <line className="constellation-line" x1="100" y1="60" x2="150" y2="90" />
              <line className="constellation-line" x1="150" y1="90" x2="130" y2="140" />
              <line className="constellation-line" x1="150" y1="90" x2="200" y2="110" />
              <line className="constellation-line" x1="200" y1="110" x2="220" y2="80" />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="88" y="48" width="24" height="24" style={{ animationDelay: '0s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="139" y="79" width="22" height="22" style={{ animationDelay: '0.5s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="120" y="130" width="20" height="20" style={{ animationDelay: '1.2s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="188" y="98" width="24" height="24" style={{ animationDelay: '0.8s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="210" y="70" width="20" height="20" style={{ animationDelay: '1.5s' }} />
              <text className="constellation-label" x="115" y="170" onClick={() => window.open(repos[0]?.url, '_blank')}>{repos[0]?.name || ''}</text>
            </g>

            {/* Constellation 2 — top-right */}
            <g>
              <line className="constellation-line" x1="920" y1="50" x2="970" y2="80" />
              <line className="constellation-line" x1="970" y1="80" x2="1020" y2="60" />
              <line className="constellation-line" x1="970" y1="80" x2="990" y2="130" />
              <line className="constellation-line" x1="990" y1="130" x2="1050" y2="120" />
              <line className="constellation-line" x1="1050" y1="120" x2="1080" y2="80" />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="908" y="38" width="24" height="24" style={{ animationDelay: '0.3s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="958" y="68" width="24" height="24" style={{ animationDelay: '1s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="1010" y="50" width="20" height="20" style={{ animationDelay: '0.7s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="979" y="119" width="22" height="22" style={{ animationDelay: '1.8s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="1040" y="110" width="20" height="20" style={{ animationDelay: '2.1s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="1068" y="68" width="24" height="24" style={{ animationDelay: '0.4s' }} />
              <text className="constellation-label" x="955" y="155" onClick={() => window.open(repos[1]?.url, '_blank')}>{repos[1]?.name || ''}</text>
            </g>

            {/* Constellation 3 — mid-left */}
            <g>
              <line className="constellation-line" x1="80" y1="340" x2="120" y2="310" />
              <line className="constellation-line" x1="120" y1="310" x2="170" y2="330" />
              <line className="constellation-line" x1="170" y1="330" x2="150" y2="380" />
              <line className="constellation-line" x1="150" y1="380" x2="90" y2="390" />
              <line className="constellation-line" x1="90" y1="390" x2="80" y2="340" />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="68" y="328" width="24" height="24" style={{ animationDelay: '0.6s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="108" y="298" width="24" height="24" style={{ animationDelay: '1.3s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="160" y="320" width="20" height="20" style={{ animationDelay: '0.2s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="139" y="369" width="22" height="22" style={{ animationDelay: '2s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="78" y="378" width="24" height="24" style={{ animationDelay: '0.9s' }} />
              <text className="constellation-label" x="85" y="420" onClick={() => window.open(repos[2]?.url, '_blank')}>{repos[2]?.name || ''}</text>
            </g>

            {/* Constellation 4 — mid-right */}
            <g>
              <line className="constellation-line" x1="1020" y1="310" x2="1060" y2="340" />
              <line className="constellation-line" x1="1060" y1="340" x2="1090" y2="310" />
              <line className="constellation-line" x1="1060" y1="340" x2="1040" y2="390" />
              <line className="constellation-line" x1="1040" y1="390" x2="1080" y2="410" />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="1008" y="298" width="24" height="24" style={{ animationDelay: '1.1s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="1049" y="329" width="22" height="22" style={{ animationDelay: '0.4s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="1080" y="300" width="20" height="20" style={{ animationDelay: '1.7s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="1028" y="378" width="24" height="24" style={{ animationDelay: '2.3s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="1069" y="399" width="22" height="22" style={{ animationDelay: '0.7s' }} />
              <text className="constellation-label" x="1020" y="440" onClick={() => window.open(repos[3]?.url, '_blank')}>{repos[3]?.name || ''}</text>
            </g>

            {/* Constellation 5 — bottom-left */}
            <g>
              <line className="constellation-line" x1="150" y1="600" x2="190" y2="570" />
              <line className="constellation-line" x1="190" y1="570" x2="240" y2="590" />
              <line className="constellation-line" x1="240" y1="590" x2="270" y2="560" />
              <line className="constellation-line" x1="240" y1="590" x2="220" y2="640" />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="140" y="590" width="20" height="20" style={{ animationDelay: '1.4s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="178" y="558" width="24" height="24" style={{ animationDelay: '0.1s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="229" y="579" width="22" height="22" style={{ animationDelay: '2.2s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="260" y="550" width="20" height="20" style={{ animationDelay: '0.8s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="208" y="628" width="24" height="24" style={{ animationDelay: '1.6s' }} />
              <text className="constellation-label" x="160" y="670" onClick={() => window.open(repos[4]?.url, '_blank')}>{repos[4]?.name || ''}</text>
            </g>

            {/* Constellation 6 — bottom-right (zigzag arrow) */}
            <g>
              <line className="constellation-line" x1="920" y1="600" x2="950" y2="570" />
              <line className="constellation-line" x1="950" y1="570" x2="980" y2="610" />
              <line className="constellation-line" x1="980" y1="610" x2="1010" y2="580" />
              <line className="constellation-line" x1="1010" y1="580" x2="1040" y2="620" />
              <line className="constellation-line" x1="1040" y1="620" x2="1070" y2="590" />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="908" y="588" width="24" height="24" style={{ animationDelay: '0.5s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="939" y="559" width="22" height="22" style={{ animationDelay: '1.9s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="968" y="598" width="24" height="24" style={{ animationDelay: '0.3s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="999" y="569" width="22" height="22" style={{ animationDelay: '2.5s' }} />
              <image className="constellation-star-slow" href="/—Pngtree—twinkling star_244329.png" x="1028" y="608" width="24" height="24" style={{ animationDelay: '1.2s' }} />
              <image className="constellation-star" href="/—Pngtree—twinkling star_244329.png" x="1059" y="579" width="22" height="22" style={{ animationDelay: '0.7s' }} />
              <text className="constellation-label" x="950" y="650" onClick={() => window.open(repos[5]?.url, '_blank')}>{repos[5]?.name || ''}</text>
            </g>
          </svg>
        </div>
      )}

      {/* Elliptical orbital animation keyframes */}
      <style jsx>{`
        /* Elliptical orbit wrapper — each orbit is a rotated ellipse */
        .elliptical-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          transform-style: preserve-3d;
        }

        /* Orbit 1: innermost, tilted -20deg */
        .orbit-path-1 {
          width: 700px;
          height: 270px;
          margin-left: -350px;
          margin-top: -135px;
          transform: rotateZ(-20deg);
        }
        /* Orbit 2: middle, tilted 25deg */
        .orbit-path-2 {
          width: 880px;
          height: 340px;
          margin-left: -440px;
          margin-top: -170px;
          transform: rotateZ(25deg);
        }
        /* Orbit 3: outermost, tilted -45deg */
        .orbit-path-3 {
          width: 1060px;
          height: 400px;
          margin-left: -530px;
          margin-top: -200px;
          transform: rotateZ(-45deg);
        }

        /* The satellite moves along the ellipse using offset-path */
        @keyframes ellipse-revolve {
          from { offset-distance: 0%; }
          to   { offset-distance: 100%; }
        }

        /* Z-index depth animation — satellite goes behind Earth at far side of orbit.
           offset-path ellipse starts at right (0%), goes to bottom (25%), left (50%), top (75%).
           "Top" of the ellipse = far side = behind Earth. */
        @keyframes depth-toggle {
          0%    { z-index: 20; }
          39%   { z-index: 20; }
          40%   { z-index: 1; }
          60%   { z-index: 1; }
          61%   { z-index: 20; }
          100%  { z-index: 20; }
        }
        /* Satellite 1 (PayPal/Hubble) — orbit tilted -20deg, goes behind when moving upward (65%-85%) */
        @keyframes depth-toggle-1 {
          0%    { z-index: 20; }
          64%   { z-index: 20; }
          65%   { z-index: 1; }
          85%   { z-index: 1; }
          86%   { z-index: 20; }
          100%  { z-index: 20; }
        }

        .sat-mover-1 {
          offset-path: ellipse(350px 135px);
          offset-rotate: 0deg;
          animation: ellipse-revolve 20s linear infinite;
        }
        .sat-mover-2 {
          offset-path: ellipse(440px 170px);
          offset-rotate: 0deg;
          animation: ellipse-revolve 28s linear infinite;
          animation-delay: -9s;
        }
        .sat-mover-3 {
          offset-path: ellipse(530px 200px);
          offset-rotate: 0deg;
          animation: ellipse-revolve 35s linear infinite;
          animation-delay: -17s;
        }

        /* Depth wrappers — synced z-index toggle with same timing as orbit */
        .depth-wrap-1 {
          animation: depth-toggle-1 20s step-end infinite;
        }
        .depth-wrap-2 {
          animation: depth-toggle 28s step-end infinite;
          animation-delay: -9s;
        }
        .depth-wrap-3 {
          animation: depth-toggle 35s step-end infinite;
          animation-delay: -17s;
        }

        /* Pause depth animation when satellite is hovered — prevents z-index toggle mid-interaction */
        .depth-wrap-1:has(:hover),
        .depth-wrap-2:has(:hover),
        .depth-wrap-3:has(:hover) {
          animation-play-state: paused !important;
        }

        /* Counter-rotate the satellite so it stays upright */
        .sat-mover-1 > div { transform: rotateZ(20deg); }
        .sat-mover-2 > div { transform: rotateZ(-25deg); }
        .sat-mover-3 > div { transform: rotateZ(45deg); }

        .sat-mover-1:hover, .sat-mover-2:hover, .sat-mover-3:hover {
          animation-play-state: paused;
        }

        /* Responsive scaling */
        @media (max-width: 1023px) {
          .orbit-path-1 { width: 520px; height: 200px; margin-left: -260px; margin-top: -100px; }
          .orbit-path-2 { width: 660px; height: 255px; margin-left: -330px; margin-top: -127px; }
          .orbit-path-3 { width: 800px; height: 300px; margin-left: -400px; margin-top: -150px; }
          .sat-mover-1 { offset-path: ellipse(260px 100px); offset-rotate: 0deg; }
          .sat-mover-2 { offset-path: ellipse(330px 127px); offset-rotate: 0deg; }
          .sat-mover-3 { offset-path: ellipse(400px 150px); offset-rotate: 0deg; }
        }
        @media (max-width: 767px) {
          .orbit-path-1 { width: 380px; height: 146px; margin-left: -190px; margin-top: -73px; }
          .orbit-path-2 { width: 480px; height: 185px; margin-left: -240px; margin-top: -92px; }
          .orbit-path-3 { width: 580px; height: 220px; margin-left: -290px; margin-top: -110px; }
          .sat-mover-1 { offset-path: ellipse(190px 73px); offset-rotate: 0deg; }
          .sat-mover-2 { offset-path: ellipse(240px 92px); offset-rotate: 0deg; }
          .sat-mover-3 { offset-path: ellipse(290px 110px); offset-rotate: 0deg; }
        }
      `}</style>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#0066ff] text-glow-blue uppercase hover-glow cursor-default">
            Projects
          </h2>
        </motion.div>

        {/* Featured Projects — Elliptical Orbital Satellite System */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
        >
          <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-6 text-center">Featured Projects</h3>

          <div className="relative mx-auto" style={{ width: '100%', height: '750px' }}>

            {/* Elliptical orbit rings (visual only) */}
            {[
              { cls: 'orbit-path-1', color: 'rgba(0,102,255,0.12)' },
              { cls: 'orbit-path-2', color: 'rgba(0,212,255,0.10)' },
              { cls: 'orbit-path-3', color: 'rgba(0,255,157,0.08)' },
            ].map((ring) => (
              <div key={ring.cls} className={`elliptical-orbit ${ring.cls} pointer-events-none`}>
                <div
                  className="w-full h-full rounded-[50%]"
                  style={{ border: `1px solid ${ring.color}` }}
                />
              </div>
            ))}

            {/* Earth Center — large */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
              <div className="rounded-full">
                <div className="relative w-52 h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden">
                  {/* @ts-ignore - model-viewer is a web component */}
                  <model-viewer
                    src="/earth.glb"
                    alt="3D Earth Model"
                    auto-rotate
                    camera-controls
                    disable-zoom
                    disable-pan
                    style={{ width: '100%', height: '100%', background: 'transparent' }}
                  />
                </div>
              </div>
            </div>

            {/* Satellite 1 — innermost orbit */}
            <div className="elliptical-orbit orbit-path-1 depth-wrap-1">
              <div className="sat-mover-1" style={{ position: 'absolute', left: 0, top: 0 }}>
                <div
                  className="relative group cursor-pointer pointer-events-auto"
                  onClick={() => setActiveProject(activeProject === 0 ? null : 0)}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 transition-all duration-300 hover:scale-125 drop-shadow-[0_0_12px_rgba(0,102,255,0.5)]">
                    <Image src={featuredProjects[0].image} alt={featuredProjects[0].title} width={96} height={96} className="object-contain w-full h-full" />
                  </div>
                  <div
                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[9px] md:text-[11px] px-3 py-1 rounded-full backdrop-blur-md"
                    style={{ color: featuredProjects[0].color, backgroundColor: `${featuredProjects[0].color}15`, border: `1px solid ${featuredProjects[0].color}30` }}
                  >
                    {featuredProjects[0].title}
                  </div>
                </div>
              </div>
            </div>

            {/* Satellite 2 — middle orbit */}
            <div className="elliptical-orbit orbit-path-2 depth-wrap-2">
              <div className="sat-mover-2" style={{ position: 'absolute', left: 0, top: 0 }}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setActiveProject(activeProject === 1 ? null : 1)}
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 transition-all duration-300 hover:scale-125 drop-shadow-[0_0_12px_rgba(0,212,255,0.5)]">
                    <Image src={featuredProjects[1].image} alt={featuredProjects[1].title} width={112} height={112} className="object-contain w-full h-full" />
                  </div>
                  <div
                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[9px] md:text-[11px] px-3 py-1 rounded-full backdrop-blur-md"
                    style={{ color: featuredProjects[1].color, backgroundColor: `${featuredProjects[1].color}15`, border: `1px solid ${featuredProjects[1].color}30` }}
                  >
                    {featuredProjects[1].title}
                  </div>
                </div>
              </div>
            </div>

            {/* Satellite 3 — outermost orbit */}
            <div className="elliptical-orbit orbit-path-3 depth-wrap-3">
              <div className="sat-mover-3" style={{ position: 'absolute', left: 0, top: 0 }}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setActiveProject(activeProject === 2 ? null : 2)}
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 transition-all duration-300 hover:scale-125 drop-shadow-[0_0_12px_rgba(0,255,157,0.5)]">
                    <Image src={featuredProjects[2].image} alt={featuredProjects[2].title} width={96} height={96} className="object-contain w-full h-full" />
                  </div>
                  <div
                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap font-orbitron text-[9px] md:text-[11px] px-3 py-1 rounded-full backdrop-blur-md"
                    style={{ color: featuredProjects[2].color, backgroundColor: `${featuredProjects[2].color}15`, border: `1px solid ${featuredProjects[2].color}30` }}
                  >
                    {featuredProjects[2].title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project detail card overlay */}
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProject(null)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative glass rounded-xl p-6 md:p-8 max-w-lg w-full z-10"
              style={{
                borderLeftWidth: '4px',
                borderLeftColor: featuredProjects[activeProject].color,
                boxShadow: `0 8px 40px ${featuredProjects[activeProject].color}30`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-3 right-3 text-[#94a3b8] hover:text-white text-lg"
              >✕</button>
              <div className="flex items-center justify-between mb-3">
                <span className="font-exo text-xs text-[#94a3b8]">{featuredProjects[activeProject].date}</span>
                <span
                  className="font-exo text-xs px-3 py-1 rounded-full"
                  style={{
                    color: featuredProjects[activeProject].statusColor,
                    backgroundColor: `${featuredProjects[activeProject].statusColor}15`,
                    border: `1px solid ${featuredProjects[activeProject].statusColor}30`,
                  }}
                >
                  {featuredProjects[activeProject].status}
                </span>
              </div>
              <h4 className="font-orbitron text-lg font-semibold text-[#e2e8f0] mb-1">{featuredProjects[activeProject].title}</h4>
              <p className="font-exo text-sm text-[#94a3b8] mb-4">{featuredProjects[activeProject].subtitle}</p>
              <ul className="space-y-2 mb-4">
                {featuredProjects[activeProject].bullets.map((b, i) => (
                  <li key={i} className="font-exo text-xs text-[#94a3b8] leading-relaxed flex gap-2">
                    <span style={{ color: featuredProjects[activeProject].color }} className="mt-0.5 flex-shrink-0">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {featuredProjects[activeProject].tech.map((t) => (
                  <span key={t} className="font-exo text-[10px] px-2 py-0.5 rounded border border-[#94a3b8]/20 text-[#94a3b8] bg-[#0f172a]/50">
                    {t}
                  </span>
                ))}
              </div>
              {featuredProjects[activeProject].stats.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {featuredProjects[activeProject].stats.map((s) => (
                    <span key={s} className="font-orbitron text-[9px] px-2 py-1 rounded-full" style={{ color: featuredProjects[activeProject]!.color, backgroundColor: `${featuredProjects[activeProject]!.color}10`, border: `1px solid ${featuredProjects[activeProject]!.color}25` }}>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
