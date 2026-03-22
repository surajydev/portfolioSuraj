'use client';

import { useEffect, useRef, useState } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  cursorColor?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
  loop?: boolean;
  pauseMs?: number;
}

export default function TypingText({
  text,
  speed = 50,
  delay = 0,
  className = '',
  style,
  cursorColor = '#00d4ff',
  as: Tag = 'span',
  loop = true,
  pauseMs = 5000,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [blink, setBlink] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    const run = async () => {
      // Initial delay
      await wait(delay);

      while (!cancelled) {
        // Type forward
        for (let i = 1; i <= text.length; i++) {
          if (cancelled) return;
          setDisplayed(text.slice(0, i));
          await wait(speed);
        }

        if (!loop) return;

        // Pause at full text
        await wait(pauseMs);

        // Erase backward
        for (let i = text.length - 1; i >= 0; i--) {
          if (cancelled) return;
          setDisplayed(text.slice(0, i));
          await wait(speed / 2);
        }

        // Pause when empty
        await wait(pauseMs / 2);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [started, text, speed, delay, loop, pauseMs]);

  useEffect(() => {
    const id = setInterval(() => setBlink(p => !p), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={className} style={style}>
      {displayed}
      <span style={{ opacity: displayed.length === text.length ? 0 : (blink ? 1 : 0), color: cursorColor, transition: 'opacity 0.15s', fontWeight: 100 }}>|</span>
    </Tag>
  );
}

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
