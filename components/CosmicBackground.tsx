'use client';

import { useEffect, useRef } from 'react';

interface CosmicStar {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: [number, number, number];
  drift: { x: number; y: number };
}

interface ClusterCenter {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number];
}

type Variant = 'nebula' | 'cluster' | 'constellation' | 'aurora' | 'deep-space' | 'binary' | 'spiral';

const VARIANT_CONFIGS: Record<Variant, {
  starCount: number;
  clusters: number;
  colors: [number, number, number][];
  driftSpeed: number;
  clusterSpread: number;
}> = {
  nebula: {
    starCount: 180,
    clusters: 3,
    colors: [[0, 212, 255], [0, 255, 157], [100, 150, 255]],
    driftSpeed: 0.15,
    clusterSpread: 0.3,
  },
  cluster: {
    starCount: 220,
    clusters: 5,
    colors: [[0, 212, 255], [0, 180, 216], [255, 255, 255]],
    driftSpeed: 0.1,
    clusterSpread: 0.2,
  },
  constellation: {
    starCount: 120,
    clusters: 2,
    colors: [[0, 255, 157], [0, 212, 255], [200, 200, 255]],
    driftSpeed: 0.08,
    clusterSpread: 0.5,
  },
  aurora: {
    starCount: 160,
    clusters: 4,
    colors: [[0, 255, 157], [0, 180, 216], [100, 255, 200]],
    driftSpeed: 0.2,
    clusterSpread: 0.25,
  },
  'deep-space': {
    starCount: 250,
    clusters: 6,
    colors: [[0, 102, 255], [0, 212, 255], [180, 180, 255]],
    driftSpeed: 0.05,
    clusterSpread: 0.15,
  },
  binary: {
    starCount: 140,
    clusters: 2,
    colors: [[0, 212, 255], [255, 200, 100], [255, 255, 255]],
    driftSpeed: 0.12,
    clusterSpread: 0.35,
  },
  spiral: {
    starCount: 200,
    clusters: 4,
    colors: [[0, 180, 216], [0, 255, 157], [0, 102, 255]],
    driftSpeed: 0.1,
    clusterSpread: 0.2,
  },
};

export default function CosmicBackground({ variant = 'nebula' }: { variant?: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<CosmicStar[]>([]);
  const animRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const config = VARIANT_CONFIGS[variant];

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    // Generate cluster centers
    const clusters: ClusterCenter[] = Array.from({ length: config.clusters }, (_, i) => ({
      x: (0.15 + Math.random() * 0.7),
      y: (0.15 + Math.random() * 0.7),
      radius: config.clusterSpread * (0.5 + Math.random() * 0.5),
      color: config.colors[i % config.colors.length],
    }));

    // Generate stars
    starsRef.current = Array.from({ length: config.starCount }, () => {
      const inCluster = Math.random() < 0.6;
      const cluster = clusters[Math.floor(Math.random() * clusters.length)];
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];

      let x: number, y: number;
      if (inCluster) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * cluster.radius;
        x = cluster.x + Math.cos(angle) * dist;
        y = cluster.y + Math.sin(angle) * dist;
      } else {
        x = Math.random();
        y = Math.random();
      }

      return {
        x,
        y,
        size: 0.3 + Math.random() * (inCluster ? 2.5 : 1.5),
        opacity: 0.15 + Math.random() * (inCluster ? 0.7 : 0.4),
        twinkleSpeed: 0.3 + Math.random() * 2.5,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: inCluster ? cluster.color : color,
        drift: {
          x: (Math.random() - 0.5) * config.driftSpeed * 0.5,
          y: -config.driftSpeed * (0.3 + Math.random() * 0.7) * 0.3,
        },
      };
    });

    // IntersectionObserver for performance
    const io = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    io.observe(parent);

    const animate = (time: number) => {
      if (!visibleRef.current) {
        animRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle nebula glow per cluster
      clusters.forEach((c) => {
        const gx = c.x * canvas.width;
        const gy = c.y * canvas.height;
        const gr = c.radius * Math.max(canvas.width, canvas.height) * 0.8;
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        grad.addColorStop(0, `rgba(${c.color[0]}, ${c.color[1]}, ${c.color[2]}, 0.03)`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      const t = time * 0.001;

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const curOpacity = star.opacity * (0.4 + 0.6 * ((twinkle + 1) / 2));
        const curSize = star.size * (0.7 + 0.3 * ((twinkle + 1) / 2));

        const px = star.x * canvas.width;
        const py = star.y * canvas.height;

        // Glow
        if (curSize > 1.2) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, curSize * 3);
          glow.addColorStop(0, `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${curOpacity * 0.3})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.fillRect(px - curSize * 3, py - curSize * 3, curSize * 6, curSize * 6);
        }

        ctx.beginPath();
        ctx.arc(px, py, curSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${curOpacity})`;
        ctx.fill();

        // Drift
        star.x += star.drift.x * 0.0003;
        star.y += star.drift.y * 0.0003;

        // Wrap
        if (star.y < -0.05) { star.y = 1.05; star.x = Math.random(); }
        if (star.x < -0.05) star.x = 1.05;
        if (star.x > 1.05) star.x = -0.05;
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
