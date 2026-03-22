'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import CosmicBackground from '../CosmicBackground';
import TypingText from '../TypingText';

const contactInfo = [
  {
    icon: Mail,
    color: '#00d4ff',
    text: 'surajyadav052005@gmail.com',
    href: 'mailto:surajyadav052005@gmail.com',
  },
  {
    icon: Phone,
    color: '#00ff9d',
    text: '+91-7071076349',
    href: 'tel:+917071076349',
  },
  {
    icon: Linkedin,
    color: '#00d4ff',
    text: 'linkedin.com/in/surajyadav/',
    href: 'https://www.linkedin.com/in/surajyadav/',
  },
  {
    icon: Github,
    color: '#e2e8f0',
    text: 'github.com/surajydev',
    href: 'https://github.com/surajydev',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const btn = btnRef.current;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setRipple({ x: rect.width / 2, y: rect.height / 2 });
    }

    setTimeout(() => {
      setSent(true);
      setRipple(null);
    }, 400);

    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <CosmicBackground variant="nebula" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6">
        <motion.div
          className="mb-4 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-[#00d4ff] text-glow-cyan uppercase">
            <TypingText text="Get In Touch" speed={70} cursorColor="#00d4ff" />
          </h2>
          <div className="h-0.5 mt-2 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />
        </motion.div>

        <motion.p
          className="mb-10 text-center font-exo text-[#94a3b8]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          Let&apos;s build something amazing together.
        </motion.p>

        {/* Contact Info Cards */}
        <motion.div
          className="w-full mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {contactInfo.map((info) => (
              <a
                key={info.text}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass rounded-xl p-4 flex items-center gap-3 group hover:scale-[1.02] transition-all duration-300"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${info.color}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${info.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                <info.icon size={18} style={{ color: info.color }} className="flex-shrink-0" />
                <span className="font-exo text-xs text-[#94a3b8] truncate">{info.text}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <form onSubmit={handleSubmit} className="glass rounded-xl p-8">
            {sent && (
              <div className="mb-4 text-center font-exo text-sm text-[#00ff9d]">
                ✓ Message sent successfully!
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="font-orbitron text-[10px] uppercase tracking-wider text-[#94a3b8] mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#0f172a]/60 border border-[#94a3b8]/20 rounded-lg px-4 py-3 font-exo text-sm text-[#e2e8f0] outline-none transition-all duration-300 focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30 focus:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="font-orbitron text-[10px] uppercase tracking-wider text-[#94a3b8] mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0f172a]/60 border border-[#94a3b8]/20 rounded-lg px-4 py-3 font-exo text-sm text-[#e2e8f0] outline-none transition-all duration-300 focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30 focus:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="font-orbitron text-[10px] uppercase tracking-wider text-[#94a3b8] mb-2 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#0f172a]/60 border border-[#94a3b8]/20 rounded-lg px-4 py-3 font-exo text-sm text-[#e2e8f0] outline-none transition-all duration-300 focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30 focus:shadow-[0_0_15px_rgba(0,212,255,0.15)] resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                ref={btnRef}
                type="submit"
                className="w-full relative overflow-hidden font-orbitron text-xs uppercase tracking-wider py-3.5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: sent ? '#00ff9d' : 'transparent',
                  border: sent ? '1px solid #00ff9d' : '1px solid rgba(0, 212, 255, 0.4)',
                  color: sent ? '#020817' : '#00d4ff',
                  boxShadow: sent
                    ? '0 0 20px rgba(0, 255, 157, 0.3)'
                    : '0 0 20px rgba(0, 212, 255, 0.15)',
                }}
              >
                {ripple && (
                  <span
                    className="absolute rounded-full bg-[#00d4ff]/30"
                    style={{
                      left: ripple.x - 20,
                      top: ripple.y - 20,
                      width: 40,
                      height: 40,
                      animation: 'pulseRing 0.6s ease-out forwards',
                    }}
                  />
                )}
                <span className="relative z-10">
                  {sent ? 'Message Sent ✓' : 'Send Message →'}
                </span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
