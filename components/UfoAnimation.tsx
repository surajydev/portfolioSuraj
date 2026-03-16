'use client';

import { useEffect, useRef, useState } from 'react';

// Generate a random value between min and max
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Pick a random easing – mix of smooth curves, some snappy, some lazy
function randomEasing(): string {
  const easings = [
    'cubic-bezier(0.25, 0.1, 0.25, 1)',
    'cubic-bezier(0.42, 0, 0.58, 1)',
    'cubic-bezier(0.22, 0.61, 0.36, 1)',
    'cubic-bezier(0.65, 0, 0.35, 1)',
    'cubic-bezier(0.33, 1, 0.68, 1)',
    'cubic-bezier(0.76, 0, 0.24, 1)',
    'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
  ];
  return easings[Math.floor(Math.random() * easings.length)];
}

export default function UfoAnimation() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [, setVisible] = useState(false);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    let cancelled = false;

    // --- Entrance: emerge from the center, small → normal ---
    el.style.transition = 'opacity 2.5s ease-out, transform 2.5s ease-out';
    el.style.opacity = '0';
    el.style.transform = 'translate(-50%, -50%) scale(0.03)';

    // Trigger entrance after a frame
    requestAnimationFrame(() => {
      if (cancelled) return;
      setVisible(true);
      el.style.opacity = '0.9';
      el.style.transform = 'translate(-50%, -50%) scale(0.5)';
    });

    // --- After entrance, begin random patrol ---
    const entranceTimer = setTimeout(() => {
      if (cancelled) return;
      startPatrol();
    }, 2800);

    function flyToRandom() {
      if (cancelled || !el) return;

      // Random position across the hero section
      const tx = rand(-42, 42); // vw from center
      const ty = rand(-35, 35); // vh from center
      const sc = rand(0.22, 0.72);
      const rot = rand(-22, 22);
      const dur = rand(2.2, 5.5); // seconds
      const opacity = rand(0.75, 1);

      el.style.transition = [
        `left ${dur}s ${randomEasing()}`,
        `top ${dur}s ${randomEasing()}`,
        `transform ${dur}s ${randomEasing()}`,
        `opacity ${dur * 0.6}s ease`,
      ].join(', ');

      el.style.left = `calc(50% + ${tx}vw)`;
      el.style.top = `calc(50% + ${ty}vh)`;
      el.style.transform = `translate(-50%, -50%) scale(${sc}) rotate(${rot}deg)`;
      el.style.opacity = String(opacity);

      return dur * 1000; // return duration in ms
    }

    function startPatrol() {
      if (cancelled) return;

      const durMs = flyToRandom();
      if (durMs == null) return;

      // Schedule next waypoint slightly after current transition ends
      const jitter = rand(100, 600);
      const timer = setTimeout(() => {
        if (!cancelled) startPatrol();
      }, durMs + jitter);

      // Store for cleanup
      animFrameRef.current = timer as unknown as number;
    }

    return () => {
      cancelled = true;
      clearTimeout(entranceTimer);
      clearTimeout(animFrameRef.current);
    };
  }, []);

  const ufoSrc = '/—Pngtree—whimsical alien spaceships and ufo_15584223.png';

  return (
    <img
      ref={imgRef}
      src={ufoSrc}
      alt=""
      draggable={false}
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: 20,
        left: '50%',
        top: '50%',
        width: '180px',
        height: 'auto',
        opacity: 0,
        transform: 'translate(-50%, -50%) scale(0.03)',
        filter:
          'drop-shadow(0 0 18px rgba(0,212,255,0.45)) drop-shadow(0 0 40px rgba(0,255,157,0.18))',
        willChange: 'left, top, transform, opacity',
      }}
    />
  );
}
