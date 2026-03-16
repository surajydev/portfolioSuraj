'use client';

import { useEffect } from 'react';

export default function AnimatedFavicon() {
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/profile.jpg';

    img.onload = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;

      let hue = 0;
      let frame = 0;

      const link =
        (document.querySelector("link[rel*='icon']") as HTMLLinkElement) ||
        document.createElement('link');
      link.type = 'image/png';
      link.rel = 'icon';
      if (!link.parentNode) document.head.appendChild(link);

      const draw = () => {
        ctx.clearRect(0, 0, size, size);

        // Circular clip
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw profile image
        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;
        ctx.drawImage(img, sx, sy, minDim, minDim, 2, 2, size - 4, size - 4);
        ctx.restore();

        // Animated glowing border ring
        const gradient = ctx.createConicGradient(
          (frame * Math.PI) / 90,
          size / 2,
          size / 2
        );
        gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, 1)`);
        gradient.addColorStop(0.25, `hsla(${hue + 90}, 100%, 60%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${hue + 180}, 100%, 60%, 1)`);
        gradient.addColorStop(0.75, `hsla(${hue + 270}, 100%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, 1)`);

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.stroke();

        link.href = canvas.toDataURL('image/png');

        hue = (hue + 2) % 360;
        frame++;
      };

      // Run animation at ~10fps to avoid overhead
      draw();
      const interval = setInterval(draw, 100);

      return () => clearInterval(interval);
    };
  }, []);

  return null;
}
