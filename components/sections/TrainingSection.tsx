'use client';

import { useEffect } from 'react';
import CosmicBackground from '../CosmicBackground';

export default function TrainingSection() {
  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section id="training" className="relative py-24 overflow-hidden" style={{ minHeight: '1000px' }}>
      {/* Dark space background */}
      <div className="absolute inset-0 z-0 bg-[#0a0e1a]" />
      <CosmicBackground variant="binary" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
      </div>

      {/* Moon surface + rover scene at the bottom */}
      <div
        className="absolute bottom-0 left-0 w-full z-10"
        style={{ height: '600px' }}
      >
        {/* Moon surface — fills the bottom, camera looks at it from front/slightly above */}
        <div className="absolute inset-0" style={{ zIndex: 1 }}>
          {/* @ts-ignore */}
          <model-viewer
            src="/moon_surface.glb"
            alt="Moon Surface"
            camera-orbit="0deg 50deg 150%"
            min-camera-orbit="auto auto auto"
            max-camera-orbit="auto auto auto"
            disable-zoom
            disable-pan
            disable-tap
            interaction-prompt="none"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              '--poster-color': 'transparent',
            } as React.CSSProperties}
          />
        </div>

        {/* Rover — moves across the surface */}
        <div
          className="rover-wrapper"
          style={{
            position: 'absolute',
            bottom: '120px',
            width: '220px',
            height: '180px',
            zIndex: 2,
            animation: 'roverMove 22s linear infinite',
          }}
        >
          {/* @ts-ignore */}
          <model-viewer
            src="/perseverance_mars_rover.glb"
            alt="Mars Rover"
            camera-orbit="210deg 65deg 105%"
            disable-zoom
            disable-pan
            disable-tap
            interaction-prompt="none"
            shadow-intensity="0"
            style={{
              width: '100%',
              height: '100%',
              background: 'transparent',
              '--poster-color': 'transparent',
              animation: 'roverBounce 1.5s ease-in-out infinite',
            } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Gradient fade from section content to moon surface */}
      <div
        className="absolute left-0 w-full z-5 pointer-events-none"
        style={{
          bottom: '500px',
          height: '200px',
          background: 'linear-gradient(to bottom, #0a0e1a, transparent)',
        }}
      />

      <style jsx>{`
        @keyframes roverMove {
          0% { left: -240px; }
          100% { left: 100%; }
        }
        @keyframes roverBounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}
