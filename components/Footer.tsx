'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact Me', href: '/contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/surajydev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/surajyadav/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:surajyadav052005@gmail.com', label: 'Email' },
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [typed1, setTyped1] = useState('');
  const [typed2, setTyped2] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);
  const name = 'Suraj Yadav';
  const desc = 'Full Stack Developer & UI/UX Designer crafting scalable systems and intuitive interfaces.';

  // Trigger on scroll into view
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Typing effect
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t1 = setInterval(() => {
      i++;
      setTyped1(name.slice(0, i));
      if (i >= name.length) clearInterval(t1);
    }, 80);
    const t2Delay = setTimeout(() => {
      let j = 0;
      const t2 = setInterval(() => {
        j++;
        setTyped2(desc.slice(0, j));
        if (j >= desc.length) clearInterval(t2);
      }, 25);
      return () => clearInterval(t2);
    }, name.length * 80 + 200);
    return () => { clearInterval(t1); clearTimeout(t2Delay); };
  }, [started]);

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const cols = Math.floor(canvas.width / 16);
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -50);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(2, 8, 23, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0';
        const x = i * 16;
        const y = drops[i] * 16;

        const brightness = Math.random();
        if (brightness > 0.7) {
          ctx.fillStyle = 'rgba(0, 212, 255, 0.9)';
          ctx.shadowColor = '#00d4ff';
          ctx.shadowBlur = 6;
        } else if (brightness > 0.4) {
          ctx.fillStyle = 'rgba(0, 255, 157, 0.5)';
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = 'rgba(0, 102, 255, 0.3)';
          ctx.shadowBlur = 0;
        }

        ctx.font = '13px Orbitron, monospace';
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.4 + Math.random() * 0.3;
      }

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden border-t border-[#00d4ff]/10">
      {/* Animated binary rain background */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, #010510 0%, #060e1f 50%, #010510 100%)' }}>
        <canvas ref={canvasRef} className="w-full h-full" style={{ opacity: 0.4 }} />
      </div>
      {/* Subtle glow overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-orbitron text-xl font-bold text-[#00d4ff] text-glow-cyan mb-3">
              {typed1}<span style={{ opacity: showCursor && typed2.length === 0 ? 1 : 0 }} className="text-[#00d4ff] animate-pulse">_</span>
            </h3>
            <p className="font-exo text-sm text-[#94a3b8] leading-relaxed font-mono">
              <span className="text-[#00ff9d] mr-1">&gt;</span>{typed2}<span style={{ opacity: showCursor && typed2.length > 0 && typed2.length < desc.length ? 1 : 0 }} className="text-[#00ff9d]">█</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-xs uppercase tracking-wider text-[#e2e8f0] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-exo text-sm text-[#94a3b8] hover:text-[#00d4ff] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-orbitron text-xs uppercase tracking-wider text-[#e2e8f0] mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass w-10 h-10 rounded-full flex items-center justify-center hover:border-[#00d4ff]/60 hover:scale-[1.04] transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon size={16} className="text-[#e2e8f0]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent mb-6" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-exo text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} Suraj Yadav. All rights reserved.
          </p>
          <p className="font-exo text-xs text-[#94a3b8] flex items-center gap-1">
            Built with <Heart size={12} className="text-[#00ff9d]" /> and React
          </p>
        </div>
      </div>
    </footer>
  );
}
