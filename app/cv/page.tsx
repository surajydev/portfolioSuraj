'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Mail, Github, Linkedin, Phone, FileText, Briefcase } from 'lucide-react';
import Link from 'next/link';

const tabs = [
  { id: 'general', label: 'General CV', icon: FileText, pdf: '/suraj-cv.pdf', downloadName: 'Suraj_Yadav_CV.pdf' },
  { id: 'specialized', label: 'Specialized CV', icon: Briefcase, pdf: '/suraj-specialized-cv.pdf', downloadName: 'Suraj_Yadav_Specialized_CV.pdf' },
] as const;

type TabId = (typeof tabs)[number]['id'];

const skills = {
  'Languages': 'C++, JavaScript, C, Java, Python',
  'Frameworks': 'HTML and CSS, Bootstrap, Node.js, React, Spring',
  'Tools/Platforms': 'MySQL, AWS, MongoDB',
  'Soft Skills': 'Innovative, Research-Oriented, Interactive, Adaptive, Strategic Problem-Solving',
};

const projects = [
  {
    title: 'PayPal Clone – Microservices-Based FinTech Platform',
    period: 'Oct 2025 – Nov 2025',
    points: [
      'Built a modular PayPal-style system with microservices for users, wallets, transactions and notifications, improving overall application structure by around 25%',
      'Configured Kafka and Redis for event streaming and caching, reducing transaction delays by 15–20% in test runs',
      'Deployed all services using Docker and API Gateway with Eureka, enabling smoother routing and service discovery across the application',
    ],
    tech: 'Spring Boot, Microservices, Kafka, JWT, Docker, API Gateway, Config Server, Eureka',
  },
  {
    title: 'UniUnite - Campus Networking Platform',
    period: 'Feb 2025 – Apr 2025',
    points: [
      'Designed the Profile Module UI using HTML, CSS, and JavaScript, organizing bio, education, and skills sections for better clarity and responsiveness',
      'Analyzed student needs and converted findings into UI/UX designs in Figma, improving feature flow for communities, events, and notes',
      'Assisted in campus promotions and navigation testing during beta launch, supporting early user engagement and usability feedback',
    ],
    tech: 'HTML, CSS, JavaScript, UI/UX, Figma, Font Awesome',
  },
  {
    title: 'Healthcare App - UI/UX Prototype',
    period: 'Oct 2024',
    points: [
      'Developed a hospital-service prototype with cleaner appointments, insurance and resource navigation, reducing user confusion by 25%',
      'Analyzed user flows and optimized booking steps, lowering the interaction sequence by roughly 30% through clearer transitions',
      'Crafted responsive screens for appointments, insurance and resources, improving readability and visual balance by about 20% across devices',
    ],
    tech: 'Figma, UI/UX Design, Wireframing, Prototyping',
  },
];

const training = {
  title: 'Think Design Prototype – Design Thinking and Figma',
  period: 'Jun 2025 – Jul 2025',
  points: [
    'Explored core Design Thinking concepts, improving ability to frame problems and identify user pain points by around 30% through structured exercises',
    'Practiced Figma for wireframing and prototyping, strengthening layout and interaction design skills by nearly 40% across weekly tasks',
    'Learned to apply user feedback and design principles to refine interfaces, enhancing usability evaluation skills by about 25% during guided reviews',
  ],
  tech: 'Figma, Design Thinking Frameworks, UX Research Tools',
};

const certificates = [
  { name: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM', issuer: 'Infosys', date: 'Aug 2025' },
  { name: 'Software Engineering: Implementation Testing', issuer: 'Coursera', date: 'Apr 2024' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', date: 'Nov 2023' },
];

const activities = [
  'Led NGO-based community drives, coordinating awareness and plantation activities with 50+ participants',
  'Participated in the Binary Blitz hackathon and qualified for the second round among 20+ competing teams',
  'Organized event operations as a Student Coordinator during the Inter Hostel Competition for 100+ students',
];

const education = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology - Computer Science and Engineering; CGPA: 8.60',
    period: 'August 2023 - Present',
  },
  {
    institution: 'Reliance Academy',
    location: 'Gorakhpur, Uttar Pradesh',
    degree: 'Intermediate; Percentage: 85.8%',
    period: 'June 2021 - June 2022',
  },
  {
    institution: 'Academic Heights Public School',
    location: 'Gorakhpur, Uttar Pradesh',
    degree: 'Matriculation; Percentage: 85%',
    period: 'April 2019 - March 2020',
  },
];

// Reusable section heading
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-orbitron text-lg md:text-xl text-[#00d4ff] tracking-wider uppercase mb-6 pb-3 border-b border-[#00d4ff]/20">
      {children}
    </h2>
  );
}

function GeneralCVContent() {
  return (
    <>
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
          <span className="text-glow-cyan text-[#00d4ff]">Suraj Yadav</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#94a3b8]">
          <a href="mailto:surajyadav052005@gmail.com" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Mail size={14} /> surajyadav052005@gmail.com
          </a>
          <a href="tel:+917071076349" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Phone size={14} /> +91-7071076349
          </a>
          <a href="https://github.com/surajydev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Github size={14} /> surajydev
          </a>
          <a href="https://www.linkedin.com/in/surajyadav/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Linkedin size={14} /> surajyadav
          </a>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <SectionTitle>Skills</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="glass rounded-lg p-4">
              <span className="font-orbitron text-xs text-[#00ff9d] tracking-wider uppercase">{category}</span>
              <p className="mt-2 text-sm text-[#c8d0dd] leading-relaxed">{items}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SectionTitle>Projects</SectionTitle>
        <div className="space-y-6">
          {projects.map((project, i) => (
            <div key={i} className="glass rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="font-orbitron text-sm text-[#e2e8f0] tracking-wide">{project.title}</h3>
                <span className="font-exo text-xs text-[#00d4ff] mt-1 sm:mt-0 whitespace-nowrap">{project.period}</span>
              </div>
              <ul className="space-y-2 mb-3">
                {project.points.map((point, j) => (
                  <li key={j} className="text-sm text-[#c8d0dd] leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#00ff9d]">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#94a3b8]">
                <span className="text-[#00d4ff]">Tech Stack:</span> {project.tech}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Training */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SectionTitle>Training</SectionTitle>
        <div className="glass rounded-lg p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="font-orbitron text-sm text-[#e2e8f0] tracking-wide">{training.title}</h3>
            <span className="font-exo text-xs text-[#00d4ff] mt-1 sm:mt-0 whitespace-nowrap">{training.period}</span>
          </div>
          <ul className="space-y-2 mb-3">
            {training.points.map((point, j) => (
              <li key={j} className="text-sm text-[#c8d0dd] leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#00ff9d]">
                {point}
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#94a3b8]">
            <span className="text-[#00d4ff]">Tech Stack:</span> {training.tech}
          </p>
        </div>
      </motion.section>

      {/* Certificates */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SectionTitle>Certificates</SectionTitle>
        <div className="space-y-3">
          {certificates.map((cert, i) => (
            <div key={i} className="glass rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm text-[#e2e8f0]">{cert.name}</h3>
                <p className="text-xs text-[#94a3b8] mt-1">{cert.issuer}</p>
              </div>
              <span className="font-exo text-xs text-[#00d4ff] mt-2 sm:mt-0 whitespace-nowrap">{cert.date}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Extra-Curricular Activities */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <SectionTitle>Extra-Curricular Activities</SectionTitle>
        <div className="glass rounded-lg p-5">
          <ul className="space-y-2">
            {activities.map((activity, i) => (
              <li key={i} className="text-sm text-[#c8d0dd] leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#00ff9d]">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-4">
          {education.map((edu, i) => (
            <div key={i} className="glass rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="font-orbitron text-sm text-[#e2e8f0] tracking-wide">{edu.institution}</h3>
                <span className="font-exo text-xs text-[#94a3b8] mt-1 sm:mt-0 whitespace-nowrap">{edu.location}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#c8d0dd]">{edu.degree}</p>
                <span className="font-exo text-xs text-[#00d4ff] mt-1 sm:mt-0 whitespace-nowrap">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

const specializedProjects = [
  {
    title: 'PayPal Clone',
    period: 'Oct 2025 – Nov 2025',
    points: [
      'Built a modular PayPal-style system with microservices for users, wallets, transactions and notifications, improving overall application structure by around 25%',
      'Configured Kafka and Redis for event streaming and caching, reducing transaction delays by 15–20% in test runs',
      'Deployed all services using Docker and API Gateway with Eureka, enabling smoother routing and service discovery across the application',
    ],
    tech: 'Spring Boot, Microservices, Kafka, JWT, Docker, API Gateway, Eureka',
  },
  {
    title: 'UniUnite',
    period: 'Feb 2025 – Apr 2025',
    points: [
      'Designed the Profile Module UI using HTML, CSS, and JavaScript, organizing bio, education, and skills sections for better clarity and responsiveness',
      'Analyzed student needs and converted findings into UI/UX designs in Figma, improving feature flow for communities, events, and notes',
      'Assisted in campus promotions and navigation testing during beta launch, supporting early user engagement and usability feedback',
    ],
    tech: 'HTML, CSS, JavaScript, UI/UX, Figma, Font Awesome',
  },
  {
    title: 'Healthcare App',
    period: 'Oct 2024',
    points: [
      'Developed a hospital-service prototype with cleaner appointments, insurance and resource navigation, reducing user confusion by 25%',
      'Analyzed user flows and optimized booking steps, lowering the interaction sequence by 30% through clearer transitions',
      'Crafted responsive screens for appointments, insurance and resources, improving readability and visual balance by about 20% across devices',
    ],
    tech: 'Figma, UI/UX Design, Wireframing, Prototyping',
  },
];

const specializedTraining = {
  title: 'Think Design Prototype',
  period: 'Jun 2025 – Jul 2025',
  points: [
    'Explored core Design Thinking concepts, improving ability to frame problems and identify user pain points by around 30% through structured exercises',
    'Practiced Figma for wireframing and prototyping, strengthening layout and interaction design skills by nearly 40% across weekly tasks',
    'Learned to apply user feedback and design principles to refine interfaces, enhancing usability evaluation skills by about 25% during guided reviews',
  ],
  tech: 'Figma, Design Thinking Frameworks, UX Research Tools',
};

const specializedSkills = {
  'Languages': 'C++, JavaScript, C, Java, Python',
  'Frameworks': 'HTML and CSS, Bootstrap, Node.js, React, Spring',
  'Tools/Platforms': 'MySQL, AWS, MongoDB',
  'Soft Skills': 'Innovative, Research-Oriented, Interactive, Adaptive, Strategic Problem-Solving',
};

const specializedCertificates = [
  { name: 'ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM', issuer: 'Infosys', date: 'Aug 2025' },
  { name: 'Software Engineering: Implementation Testing', issuer: 'Coursera', date: 'Apr 2024' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', date: 'Nov 2023' },
];

const specializedActivities = [
  'Led NGO-based community drives, coordinating awareness and plantation activities with 50+ participants',
  'Participated in the Binary Blitz hackathon and qualified for the second round among 20+ competing teams',
  'Organized event operations as a Student Coordinator during the Inter Hostel Competition for 100+ students',
];

const specializedEducation = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology – Computer Science and Engineering; CGPA: 8.60',
    period: 'August 2023 – Present',
  },
  {
    institution: 'Reliance Academy',
    location: 'Gorakhpur, Uttar Pradesh',
    degree: 'Intermediate; Percentage: 85.8%',
    period: 'June 2021 – June 2022',
  },
  {
    institution: 'Academic Heights Public School',
    location: 'Gorakhpur, Uttar Pradesh',
    degree: 'Matriculation; Percentage: 85%',
    period: 'April 2019 – March 2020',
  },
];

function SpecializedCVContent() {
  return (
    <>
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
          <span className="text-glow-cyan text-[#00d4ff]">Suraj Yadav</span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#94a3b8]">
          <a href="mailto:surajyadav052005@gmail.com" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Mail size={14} /> surajyadav052005@gmail.com
          </a>
          <a href="tel:+917071076349" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Phone size={14} /> +91-7071076349
          </a>
          <a href="https://github.com/surajydev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Github size={14} /> surajydev
          </a>
          <a href="https://www.linkedin.com/in/surajyadav/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00d4ff] transition-colors">
            <Linkedin size={14} /> surajyadav
          </a>
        </div>
      </motion.div>

      {/* Projects */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <SectionTitle>Projects</SectionTitle>
        <div className="space-y-6">
          {specializedProjects.map((project, i) => (
            <div key={i} className="glass rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <h3 className="font-orbitron text-sm text-[#e2e8f0] tracking-wide">{project.title}</h3>
                <span className="font-exo text-xs text-[#00d4ff] mt-1 sm:mt-0 whitespace-nowrap">{project.period}</span>
              </div>
              <ul className="space-y-2 mb-3">
                {project.points.map((point, j) => (
                  <li key={j} className="text-sm text-[#c8d0dd] leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#00ff9d]">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#94a3b8]">
                <span className="text-[#00d4ff]">Tech Stack:</span> {project.tech}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Training */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <SectionTitle>Training</SectionTitle>
        <div className="glass rounded-lg p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
            <h3 className="font-orbitron text-sm text-[#e2e8f0] tracking-wide">{specializedTraining.title}</h3>
            <span className="font-exo text-xs text-[#00d4ff] mt-1 sm:mt-0 whitespace-nowrap">{specializedTraining.period}</span>
          </div>
          <ul className="space-y-2 mb-3">
            {specializedTraining.points.map((point, j) => (
              <li key={j} className="text-sm text-[#c8d0dd] leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#00ff9d]">
                {point}
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#94a3b8]">
            <span className="text-[#00d4ff]">Tech Stack:</span> {specializedTraining.tech}
          </p>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <SectionTitle>Skills</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(specializedSkills).map(([category, items]) => (
            <div key={category} className="glass rounded-lg p-4">
              <span className="font-orbitron text-xs text-[#00ff9d] tracking-wider uppercase">{category}</span>
              <p className="mt-2 text-sm text-[#c8d0dd] leading-relaxed">{items}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certificates */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <SectionTitle>Certificates</SectionTitle>
        <div className="space-y-3">
          {specializedCertificates.map((cert, i) => (
            <div key={i} className="glass rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm text-[#e2e8f0]">{cert.name}</h3>
                <p className="text-xs text-[#94a3b8] mt-1">{cert.issuer}</p>
              </div>
              <span className="font-exo text-xs text-[#00d4ff] mt-2 sm:mt-0 whitespace-nowrap">{cert.date}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Extra-Curricular Activities */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <SectionTitle>Extra-Curricular Activities</SectionTitle>
        <div className="glass rounded-lg p-5">
          <ul className="space-y-2">
            {specializedActivities.map((activity, i) => (
              <li key={i} className="text-sm text-[#c8d0dd] leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#00ff9d]">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </motion.section>

      {/* Education */}
      <motion.section
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <SectionTitle>Education</SectionTitle>
        <div className="space-y-4">
          {specializedEducation.map((edu, i) => (
            <div key={i} className="glass rounded-lg p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-1">
                <h3 className="font-orbitron text-sm text-[#e2e8f0] tracking-wide">{edu.institution}</h3>
                <span className="font-exo text-xs text-[#94a3b8] mt-1 sm:mt-0 whitespace-nowrap">{edu.location}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#c8d0dd]">{edu.degree}</p>
                <span className="font-exo text-xs text-[#00d4ff] mt-1 sm:mt-0 whitespace-nowrap">{edu.period}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </>
  );
}

export default function CVPage() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const currentTab = tabs.find((t) => t.id === activeTab)!;

  return (
    <main className="relative min-h-screen bg-[#020817] text-[#e2e8f0]">
      {/* Fixed top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#020817]/90 backdrop-blur-xl border-b border-[#00d4ff]/10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#home">
            <motion.button
              className="flex items-center gap-2 glass rounded-full px-5 py-2.5 group"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <ArrowLeft size={16} className="text-[#00d4ff] group-hover:-translate-x-1 transition-transform" />
              <span className="font-orbitron text-xs tracking-wider text-[#00d4ff] uppercase">Back</span>
            </motion.button>
          </Link>

        </div>
      </div>

      {/* CV Content */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 font-orbitron text-xs tracking-wider uppercase px-6 py-3 rounded-lg
                  transition-all duration-300 border
                  ${isActive
                    ? 'bg-[#00d4ff]/15 border-[#00d4ff]/60 text-[#00d4ff] shadow-[0_0_25px_rgba(0,212,255,0.2)]'
                    : 'bg-transparent border-[#1e293b] text-[#64748b] hover:border-[#00d4ff]/30 hover:text-[#94a3b8]'
                  }
                `}
              >
                <Icon size={14} />
                {tab.label}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-px left-4 right-4 h-px bg-[#00d4ff]"
                    layoutId="activeTabIndicator"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'general' ? <GeneralCVContent /> : <SpecializedCVContent />}
          </motion.div>
        </AnimatePresence>

        {/* Bottom download button */}
        <motion.div
          className="text-center pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a href={currentTab.pdf} download={currentTab.downloadName}>
            <motion.button
              className="inline-flex items-center gap-2 rounded-full px-8 py-3 bg-[#00d4ff]/10 border border-[#00d4ff]/40 text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/80 transition-all duration-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.15)' }}
            >
              <Download size={18} />
              <span className="font-orbitron text-sm tracking-wider uppercase">
                Download {activeTab === 'general' ? 'General' : 'Specialized'} CV as PDF
              </span>
            </motion.button>
          </a>
        </motion.div>
      </div>
    </main>
  );
}
