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
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="/freepik__talk__13752.png" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0a0e1a]/30" />
      </div>
      <CosmicBackground variant="binary" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
      </div>
    </section>
  );
}
