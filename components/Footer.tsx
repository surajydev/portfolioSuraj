'use client';

import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/surajydev', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/surajyadav/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:surajyadav052005@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#00d4ff]/10">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/vecteezy_beautiful-cosmic-scene-of-saturn-and-its-rings-in-deep_52140291.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#020817]/60" style={{ zIndex: 1 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-orbitron text-xl font-bold text-[#00d4ff] text-glow-cyan mb-3">
              Suraj Yadav
            </h3>
            <p className="font-exo text-sm text-[#94a3b8] leading-relaxed">
              Full Stack Developer &amp; UI/UX Designer crafting scalable systems and intuitive interfaces.
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
