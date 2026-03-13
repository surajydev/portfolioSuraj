'use client';

import { useEffect, useState, useRef } from 'react';
import { StaggerChild } from '../SectionPanel';

function AnimatedNumber({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((eased * target).toFixed(target % 1 !== 0 ? 2 : 0)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span ref={ref}>{value}</span>;
}

const softSkills = ['Innovative', 'Research-Oriented', 'Interactive', 'Adaptive', 'Strategic Problem-Solving'];

export default function AboutSection() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column — Avatar */}
        <StaggerChild className="flex flex-col items-center">
          <div className="relative mb-8">
            {/* Rotating ring */}
            <div
              className="absolute -inset-4 rounded-full border border-dashed border-[#00d4ff]/30"
              style={{ animation: 'rotateRing 12s linear infinite' }}
            />
            {/* Avatar circle */}
            <div
              className="w-40 h-40 rounded-full border-[3px] border-[#00d4ff] flex items-center justify-center"
              style={{ boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(0, 212, 255, 0.2)' }}
            >
              <span className="font-orbitron text-4xl font-bold text-[#00d4ff] text-glow-cyan">SY</span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="flex gap-4">
            {[
              { num: 8.6, label: 'CGPA', isDecimal: true },
              { num: 3, label: 'Projects', suffix: '+' },
              { num: 5, label: 'Certificates', suffix: '+' },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-xl px-5 py-3 text-center min-w-[80px]">
                <div className="font-orbitron text-xl font-bold text-[#00d4ff]">
                  <AnimatedNumber target={stat.num} />
                  {stat.suffix || ''}
                </div>
                <div className="font-orbitron text-[9px] text-[#94a3b8] uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </StaggerChild>

        {/* Right Column — Bio */}
        <div>
          <StaggerChild>
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00d4ff] text-glow-cyan uppercase mb-6">
              About Me
            </h2>
          </StaggerChild>

          <StaggerChild>
            <p className="font-exo text-[#94a3b8] leading-relaxed mb-8">
              I&apos;m a Computer Science Engineering student passionate about building scalable systems and intuitive interfaces. I blend backend engineering with UI/UX design thinking to craft products that are both powerful and elegant. Whether it&apos;s architecting microservices with Spring Boot and Kafka, or wireframing pixel-perfect screens in Figma — I approach every challenge with curiosity and precision.
            </p>
          </StaggerChild>

          <StaggerChild>
            <h3 className="font-orbitron text-sm uppercase tracking-wider text-[#e2e8f0] mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="font-exo text-xs px-3 py-1.5 rounded-full border border-[#00d4ff]/30 text-[#00d4ff] bg-[#00d4ff]/5"
                >
                  {skill}
                </span>
              ))}
            </div>
          </StaggerChild>
        </div>
      </div>
    </div>
  );
}
