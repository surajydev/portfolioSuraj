"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Cpu, Mail, Search, Menu, X, Sun, GraduationCap, Dumbbell, Award, FileText } from 'lucide-react';

const planets = [
  { name: 'Home', icon: Home, color: '#38bdf8', angleOffset: 0 },
  { name: 'About', icon: User, color: '#34d399', angleOffset: (Math.PI * 2) * 0.2 },
  { name: 'Projects', icon: Briefcase, color: '#a78bfa', angleOffset: (Math.PI * 2) * 0.4 },
  { name: 'Skills', icon: Cpu, color: '#fbbf24', angleOffset: (Math.PI * 2) * 0.6 },
  { name: 'Contact', icon: Mail, color: '#f87171', angleOffset: (Math.PI * 2) * 0.8 },
];

const menuItems = [
  { name: 'Home', icon: Home, color: '#38bdf8', subtitle: 'Launch Pad', href: '#home' },
  { name: 'About', icon: User, color: '#34d399', subtitle: 'Identity', href: '#about' },
  { name: 'Skills', icon: Cpu, color: '#fbbf24', subtitle: 'Arsenal', href: '#skills' },
  { name: 'Projects', icon: Briefcase, color: '#a78bfa', subtitle: 'Creations', href: '#projects' },
  { name: 'Education', icon: GraduationCap, color: '#60a5fa', subtitle: 'Academics', href: '#education' },
  { name: 'Training', icon: Dumbbell, color: '#f472b6', subtitle: 'Experience', href: '#training' },
  { name: 'Certificates', icon: Award, color: '#fb923c', subtitle: 'Achievements', href: '#certificates' },
  { name: 'Contact', icon: Mail, color: '#f87171', subtitle: 'Connect', href: '#contact' },
  { name: 'Resume', icon: FileText, color: '#2dd4bf', subtitle: 'Download CV', href: '/cv', isPage: true },
];

function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

const EnergyParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full blur-[1px]"
    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
    animate={{ 
      x: (Math.random() - 0.5) * 80, 
      y: (Math.random() - 0.5) * 80, 
      opacity: 0,
      scale: 0 
    }}
    transition={{ 
      duration: 1.5 + Math.random(), 
      repeat: Infinity, 
      delay,
      ease: "easeOut" 
    }}
  />
);

const SunLogo = () => (
  <div className="relative flex items-center justify-center cursor-pointer group w-20 h-20">
    <div className="absolute w-16 h-16 bg-yellow-400 rounded-full blur-[20px] opacity-90 group-hover:opacity-100 group-hover:blur-[28px] transition-all duration-500 animate-[pulse_2s_ease-in-out_infinite]" />
    <Sun className="relative text-yellow-100 w-16 h-16 group-hover:rotate-90 transition-transform duration-700 ease-in-out z-10" />
    {[...Array(8)].map((_, i) => (
      <EnergyParticle key={i} delay={i * 0.3} />
    ))}
  </div>
);

export default function Navbar() {
  const requestRef = useRef<number>();
  const angleRef = useRef<number>(0);
  const currentRxRef = useRef(250);
  const currentRyRef = useRef(45);
  
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);


  // Use refs for mouse position to avoid re-renders on every mouse move
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const brandingRef = useRef<HTMLDivElement>(null);

  // Refs for animation loop closure
  const isMobileRef = useRef(false);
  const isScrolledRef = useRef(false);
  const mobileExpandedRef = useRef(false);
  const hoveredRef = useRef<string | null>(null);

  useEffect(() => {
    isMobileRef.current = isMobile;
    isScrolledRef.current = isScrolled;
    mobileExpandedRef.current = isMobileExpanded;
    hoveredRef.current = hoveredPlanet;
  }, [isMobile, isScrolled, isMobileExpanded, hoveredPlanet]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth - 0.5) * 20;
      mouseYRef.current = (e.clientY / window.innerHeight - 0.5) * 20;
      // Update branding transform directly via DOM (no React re-render)
      if (brandingRef.current) {
        brandingRef.current.style.transform = `translate(${mouseXRef.current * 0.1}px, ${mouseYRef.current * 0.1}px)`;
      }
    };

    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animate = () => {
      let targetRx = 0;
      let targetRy = 0;
      let speed = 0.002;

      if (isMobileRef.current) {
        if (mobileExpandedRef.current) {
          targetRx = 120;
          targetRy = 120; 
          speed = 0.0005; 
        } else {
          targetRx = 0;
          targetRy = 0;
          speed = 0;
        }
      } else {
        targetRx = isScrolledRef.current ? 100 : 150;
        targetRy = isScrolledRef.current ? 18 : 30;
        speed = isScrolledRef.current ? 0.002 : 0.003;
        if (hoveredRef.current) speed = 0.0005; // slowdown on hover
      }

      currentRxRef.current = lerp(currentRxRef.current, targetRx, 0.05);
      currentRyRef.current = lerp(currentRyRef.current, targetRy, 0.05);
      
      angleRef.current += speed;

      planets.forEach((planet, i) => {
        const el = document.getElementById(`planet-${i}`);
        const track = document.getElementById('orbit-track');
        
        if (track) {
          track.style.width = `${currentRxRef.current * 2}px`;
          track.style.height = `${currentRyRef.current * 2}px`;
          track.style.opacity = (isMobileRef.current && !mobileExpandedRef.current) ? '0' : (isScrolledRef.current ? '0.3' : '0.6');
        }

        if (el) {
          const theta = angleRef.current + planet.angleOffset;
          const x = currentRxRef.current * Math.cos(theta);
          const y = currentRyRef.current * Math.sin(theta);
          
          let scale = 1;
          let opacity = 1;
          let zIndex = 10;

          if (!isMobileRef.current || (isMobileRef.current && mobileExpandedRef.current)) {
             scale = 1 + Math.sin(theta) * 0.15;
             opacity = Math.max(0.3, 0.6 + Math.sin(theta) * 0.4);
             zIndex = Math.sin(theta) > 0 ? 30 : 10;
          } else {
             scale = 0;
             opacity = 0;
          }
          
          if (hoveredRef.current === planet.name) {
             scale *= 1.3;
             opacity = 1;
             zIndex = 40;
          }

          el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${Math.max(0, scale)})`;
          el.style.zIndex = zIndex.toString();
          el.style.opacity = opacity.toString();
        }
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'py-3 bg-[#020817]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'py-6 bg-transparent'
        }`}
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center relative h-16 sm:h-20">
          
          {/* Left: Branding (Sun + Name + Orbiting Planets) */}
          <div className="flex-1 flex items-center relative z-40">
            <div ref={brandingRef} className="flex items-center gap-4 cursor-pointer" onClick={() => { if (isMobile) setIsMobileExpanded(!isMobileExpanded); }}>
              
              {/* Solar System (Sun + Planets) */}
              <div className="relative flex items-center justify-center min-w-[140px] sm:min-w-[180px]" style={{ marginLeft: '-20px' }}>
                
                {/* Orbit Track */}
                <div 
                  id="orbit-track"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full pointer-events-none transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)_inset]"
                />

                {/* Central Sun */}
                <div className="relative z-20">
                  <SunLogo />
                </div>

                {/* Planets */}
                {planets.map((planet, i) => (
                  <div
                    key={planet.name}
                    id={`planet-${i}`}
                    className="absolute top-1/2 left-1/2 cursor-pointer transition-shadow duration-300 flex items-center justify-center group/planet"
                    onMouseEnter={() => setHoveredPlanet(planet.name)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#020817',
                      opacity: 0,
                      border: hoveredPlanet === planet.name ? `1px solid ${planet.color}` : `1px solid ${planet.color}40`,
                      boxShadow: hoveredPlanet === planet.name 
                        ? `0 0 20px ${planet.color}80, inset 0 0 10px ${planet.color}40` 
                        : `0 0 10px ${planet.color}20`,
                    }}
                  >
                    <planet.icon 
                      className="w-3.5 h-3.5 transition-all duration-300" 
                      style={{ 
                        color: planet.color,
                        filter: hoveredPlanet === planet.name ? `drop-shadow(0 0 8px ${planet.color})` : 'none'
                      }} 
                    />
                    
                    {/* Tooltip */}
                    <div 
                      className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#020817]/90 backdrop-blur-md border border-white/10 rounded-md text-[10px] tracking-wider font-medium whitespace-nowrap text-white transition-all duration-300 ${
                        hoveredPlanet === planet.name 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                      }`}
                      style={{ boxShadow: `0 4px 12px ${planet.color}20` }}
                    >
                      {planet.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Developer Name */}
              <motion.div
                animate={{ 
                  textShadow: [
                    "0px 0px 10px rgba(34,211,238,0.5)", 
                    "0px 0px 25px rgba(217,70,239,0.8)", 
                    "0px 0px 10px rgba(34,211,238,0.5)"
                  ] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="font-extrabold tracking-[0.2em] text-lg lg:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 uppercase hidden sm:block whitespace-nowrap"
              >
                Suraj Yadav
              </motion.div>
            </div>
          </div>

          {/* Right: Actions (Search + Hamburger Menu) */}
          <div className="flex-shrink-0 flex items-center gap-4 relative z-50">
            {/* Floating Glassmorphism Search Bar */}
            <div className={`transition-all duration-500 hidden sm:block ${
                isMobile && !isMobileExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              <div className="relative group w-36 lg:w-48 z-50">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center bg-[#050b1a]/80 backdrop-blur-xl rounded-full px-3 py-1.5 border border-white/10 group-focus-within:border-white/30 transition-colors">
                  <Search className="w-3.5 h-3.5 text-cyan-400 mr-2 opacity-50 group-focus-within:opacity-100 transition-opacity" />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-gray-500"
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative p-2 rounded-full border border-white/10 bg-[#020817]/50 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              {menuOpen ? <X className="relative text-white w-4 h-4 z-10" /> : <Menu className="relative text-white w-4 h-4 z-10" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Right-Side Slide-In Menu Panel — rendered via portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <>
              {/* Backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[44] bg-black/60 backdrop-blur-sm"
                onClick={() => setMenuOpen(false)}
              />

              {/* Slide-in panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 z-[46] w-[85vw] max-w-[420px] flex flex-col"
                style={{
                  backgroundImage: 'url(/menu-bg.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Gradient glow on left edge */}
                <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-pink-500/30 pointer-events-none" />
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-cyan-400/5 to-transparent pointer-events-none" />

                {/* Decorative gradient orbs */}
                <div className="absolute top-[15%] right-[10%] w-48 h-48 bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />
                <div className="absolute bottom-[20%] left-[5%] w-56 h-56 bg-purple-500/8 rounded-full blur-[90px] pointer-events-none" />
                <div className="absolute top-[60%] right-[30%] w-32 h-32 bg-pink-500/5 rounded-full blur-[60px] pointer-events-none" />

                {/* Header: close button */}
                <div className="flex justify-end items-center px-6 pt-6 pb-2">
                  <motion.button
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    onClick={() => setMenuOpen(false)}
                    className="relative p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <X className="relative w-5 h-5 text-white/70 group-hover:text-white transition-colors z-10" />
                  </motion.button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 flex flex-col justify-center px-8 sm:px-10 gap-1 overflow-y-auto scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                  {menuItems.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 40, opacity: 0 }}
                      transition={{ delay: i * 0.06 + 0.12, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="group relative flex items-center gap-4 py-3 px-4 rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/[0.04]"
                      onClick={(e) => {
                        e.preventDefault();
                        setMenuOpen(false);
                        if ((item as any).isPage) {
                          setTimeout(() => { window.location.href = item.href; }, 350);
                        } else {
                          const sectionId = item.href.replace('#', '');
                          const el = document.getElementById(sectionId);
                          if (el) {
                            setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 350);
                          }
                        }
                      }}
                    >
                      {/* Left accent bar (visible on hover) */}
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 group-hover:h-8 rounded-full transition-all duration-300"
                        style={{ backgroundColor: item.color }}
                      />

                      {/* Icon container */}
                      <div
                        className="relative flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-300"
                        style={{
                          borderColor: `${item.color}20`,
                          backgroundColor: `${item.color}08`,
                        }}
                      >
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            boxShadow: `inset 0 0 20px ${item.color}15, 0 0 20px ${item.color}10`,
                          }}
                        />
                        <item.icon
                          className="relative w-4.5 h-4.5 transition-all duration-300 group-hover:scale-110"
                          style={{
                            color: item.color,
                            filter: `drop-shadow(0 0 0px transparent)`,
                          }}
                        />
                      </div>

                      {/* Label */}
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-light tracking-[0.12em] text-white/60 group-hover:text-white transition-colors duration-300 font-exo">
                          {item.name}
                        </span>
                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 group-hover:text-white/40 transition-colors duration-300 mt-0.5">
                          {item.subtitle}
                        </span>
                      </div>

                      {/* Arrow indicator */}
                      <div className="ml-auto opacity-0 group-hover:opacity-60 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M6 4L10 8L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </motion.a>
                  ))}
                </nav>

                {/* Footer */}
                <div className="px-8 sm:px-10 pb-8 pt-4">
                  {/* Gradient separator */}
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center text-[10px] tracking-[0.4em] uppercase text-white/20"
                    style={{ textShadow: '0 0 20px rgba(0,212,255,0.15)' }}
                  >
                    Explore the Universe
                  </motion.p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.documentElement
      )}
    </>
  );
}
