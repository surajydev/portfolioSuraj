'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  drift: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);
  const lastFrameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use devicePixelRatio of 1 to avoid rendering at 2x on high-DPI screens
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Reduced from 220 to 120 stars
    starsRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.3 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.5,
      speed: 0.1 + Math.random() * 0.25,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
      twinkleOffset: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.08,
    }));

    // Visibility observer — skip rendering when off-screen
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const animate = (time: number) => {
      animRef.current = requestAnimationFrame(animate);

      // Skip if not visible
      if (!visibleRef.current) return;

      // Throttle to ~30fps instead of 60fps
      if (time - lastFrameRef.current < 33) return;
      lastFrameRef.current = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = time * 0.001;

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const currentOpacity = star.opacity * (0.5 + 0.5 * twinkle);
        const currentSize = star.size * (0.8 + 0.2 * twinkle);

        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();

        // Drift upward
        star.y -= star.speed * 0.3;
        star.x += star.drift;

        if (star.y < -5) {
          star.y = canvas.height + 5;
          star.x = Math.random() * canvas.width;
        }
        if (star.x < -5) star.x = canvas.width + 5;
        if (star.x > canvas.width + 5) star.x = -5;
      });
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      io.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, transform: 'translateZ(0)' }}
    />
  );
}
