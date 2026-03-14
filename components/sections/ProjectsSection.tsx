'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, ExternalLink } from 'lucide-react';
import CosmicBackground from '../CosmicBackground';

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  updatedAt: string;
}

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github')
      .then((r) => r.json())
      .then((data) => {
        setRepos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="relative py-24 overflow-hidden section-highlight">
      <CosmicBackground variant="constellation" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#0066ff] text-glow-blue uppercase hover-glow cursor-default">
            Projects
          </h2>
          <div className="h-0.5 mt-2 bg-gradient-to-r from-transparent via-[#0066ff] to-transparent" />
        </motion.div>

        {/* GitHub Repos */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <Github size={22} className="text-[#e2e8f0]" />
            <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0]">GitHub Repositories</h3>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="glass rounded-xl p-5 min-w-[280px] flex-shrink-0 animate-pulse">
                    <div className="h-4 bg-[#0f172a] rounded w-3/4 mb-3" />
                    <div className="h-3 bg-[#0f172a] rounded w-full mb-2" />
                    <div className="h-3 bg-[#0f172a] rounded w-2/3" />
                  </div>
                ))
              : repos.length === 0
              ? <p className="font-exo text-sm text-[#94a3b8]">GitHub repos temporarily unavailable</p>
              : repos.map((repo) => (
                  <div key={repo.name} className="glass rounded-xl p-5 min-w-[280px] max-w-[300px] flex-shrink-0 hover:border-[#00d4ff]/40 transition-all duration-300 group">
                    <h4 className="font-orbitron text-sm text-[#e2e8f0] mb-2 truncate">{repo.name}</h4>
                    <p className="font-exo text-xs text-[#94a3b8] mb-3 line-clamp-2 min-h-[32px]">
                      {repo.description || 'No description'}
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs font-exo">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: LANG_COLORS[repo.language] || '#00d4ff' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-[#94a3b8]">
                        <Star size={12} /> {repo.stars}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#94a3b8] font-exo">{timeAgo(repo.updatedAt)}</span>
                      <a href={repo.url} target="_blank" rel="noopener noreferrer"
                        className="font-orbitron text-[10px] text-[#00d4ff] flex items-center gap-1 hover:underline">
                        View <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                ))}
          </div>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          className="mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-6">Featured Projects</h3>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredProjects.map((proj) => (
            <motion.div
              key={proj.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div
                className="glass rounded-xl p-6 h-full hover:-translate-y-2 transition-all duration-300 relative"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: proj.color,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px ${proj.color}20`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 0 transparent';
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-exo text-[10px] text-[#94a3b8]">{proj.date}</span>
                  <span
                    className="font-exo text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      color: proj.statusColor,
                      backgroundColor: `${proj.statusColor}15`,
                      border: `1px solid ${proj.statusColor}30`,
                    }}
                  >
                    {proj.status}
                  </span>
                </div>

                <h4 className="font-orbitron text-lg font-semibold text-[#e2e8f0] mb-1">{proj.title}</h4>
                <p className="font-exo text-xs text-[#94a3b8] mb-4">{proj.subtitle}</p>

                <ul className="space-y-2 mb-4">
                  {proj.bullets.map((b, i) => (
                    <li key={i} className="font-exo text-xs text-[#94a3b8] leading-relaxed flex gap-2">
                      <span style={{ color: proj.color }} className="mt-0.5">▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tech.map((t) => (
                    <span key={t} className="font-exo text-[10px] px-2 py-0.5 rounded border border-[#94a3b8]/20 text-[#94a3b8] bg-[#0f172a]/50 hover:border-[#00d4ff]/40 hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all duration-300 cursor-default">
                      {t}
                    </span>
                  ))}
                </div>

                {proj.stats.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {proj.stats.map((s) => (
                      <span key={s} className="font-orbitron text-[9px] px-2 py-1 rounded-full" style={{ color: proj.color, backgroundColor: `${proj.color}10`, border: `1px solid ${proj.color}25` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
