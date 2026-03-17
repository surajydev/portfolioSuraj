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
    <section id="training" className="relative py-24 overflow-hidden" style={{ minHeight: '1000px' }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/freepik__talk__13752.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0e1a]/30" />
      </div>
      <CosmicBackground variant="binary" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
      </div>

      {/* Rover moving on moon surface */}
      <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none" style={{ height: '220px' }}>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            animation: 'roverMove 18s linear infinite, roverTerrain 18s linear infinite',
          }}
        >
          <img
            src="/—Pngtree—3d rendering of the mars_14532328.png"
            alt="Moon Rover"
            style={{
              width: '200px',
              height: 'auto',
              filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.3))',
              animation: 'roverVibrate 0.1s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Rover animation keyframes */}
      <style jsx>{`
        @keyframes roverMove {
          0% {
            left: -220px;
          }
          100% {
            left: 100%;
          }
        }
        @keyframes roverTerrain {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          5% { transform: translateY(-5px) rotate(-3deg); }
          10% { transform: translateY(0px) rotate(0deg); }
          15% { transform: translateY(8px) rotate(8deg); }
          20% { transform: translateY(15px) rotate(0deg); }
          25% { transform: translateY(8px) rotate(-8deg); }
          30% { transform: translateY(0px) rotate(0deg); }
          35% { transform: translateY(-3px) rotate(-2deg); }
          40% { transform: translateY(0px) rotate(0deg); }
          45% { transform: translateY(10px) rotate(10deg); }
          50% { transform: translateY(20px) rotate(0deg); }
          55% { transform: translateY(10px) rotate(-10deg); }
          60% { transform: translateY(0px) rotate(0deg); }
          65% { transform: translateY(5px) rotate(5deg); }
          70% { transform: translateY(10px) rotate(0deg); }
          75% { transform: translateY(5px) rotate(-5deg); }
          80% { transform: translateY(0px) rotate(0deg); }
          85% { transform: translateY(12px) rotate(12deg); }
          90% { transform: translateY(22px) rotate(0deg); }
          95% { transform: translateY(12px) rotate(-12deg); }
        }
        @keyframes roverVibrate {
          0%, 100% { margin-top: 0px; }
          50% { margin-top: 1px; }
        }
      `}</style>
    </section>
  );
}
