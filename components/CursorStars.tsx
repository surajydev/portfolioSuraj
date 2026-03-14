'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export default function CursorStars() {
  const lastSpawn = useRef(0);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const spawnStar = useCallback((x: number, y: number) => {
    if (typeof document === 'undefined') return;

    const star = document.createElement('img');
    star.src = '/cursor-star.png';
    const size = 16 + Math.random() * 24;
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;
    const rotation = Math.random() * 360;
    const driftX = (Math.random() - 0.5) * 60;
    const driftY = Math.random() * 40; // Fall slightly

    Object.assign(star.style, {
      position: 'fixed',
      left: `${x + offsetX - size / 2}px`, 
      top: `${y + offsetY - size / 2}px`,  
      width: `${size}px`,
      height: `${size}px`,
      pointerEvents: 'none',
      zIndex: '2147483647', // Max z-index
      transform: `rotate(${rotation}deg) scale(0.5)`,
      opacity: '1',
      transition: 'none',
    });

    document.body.appendChild(star);

    // Force reflow
    void star.offsetWidth;

    requestAnimationFrame(() => {
      Object.assign(star.style, {
        transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
        transform: `translate(${driftX}px, ${driftY}px) rotate(${rotation + 180}deg) scale(1.5)`,
        opacity: '0',
      });
    });

    setTimeout(() => {
      if (star.parentNode) {
        star.parentNode.removeChild(star);
      }
    }, 850);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const cursor = glowRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.animate(
          {
            left: `${e.clientX}px`,
            top: `${e.clientY}px`,
          },
          { duration: 800, fill: "forwards", easing: "ease" }
        );
      }

      const now = Date.now();
      if (now - lastSpawn.current < 25) return; // throttle (~40 ticks per sec)
      lastSpawn.current = now;

      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        spawnStar(e.clientX, e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [spawnStar, mounted]);

  if (!mounted) return null;

  return (
    <>
      <svg className="hidden">
        <defs>
          <filter id="liquid-warp">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.004 0.004" 
              numOctaves="2"
              result="noise"
            />
            {/* Smoother, gentler water-current distortion map */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="35" 
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      
      <div 
        ref={glowRef} 
        /* Enlarged area, much smoother fluid distortion */
        className="pointer-events-none fixed w-[800px] h-[800px] rounded-full -translate-x-1/2 -translate-y-1/2 z-[9000] opacity-0 transition-opacity duration-1000 group-hover:opacity-100 mix-blend-screen"
        style={{ 
          left: '-1000px', 
          top: '-1000px', 
          backdropFilter: 'url(#liquid-warp)', 
          WebkitBackdropFilter: 'url(#liquid-warp)',
          background: 'none',
          maskImage: 'radial-gradient(circle, black 0%, transparent 60%)',
          WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 60%)',
          opacity: 1 
        }}
      />
    </>
  );
}
