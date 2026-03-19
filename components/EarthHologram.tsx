'use client';

export default function EarthHologram() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ minHeight: 180 }}>
      {/* @ts-expect-error - model-viewer is a web component */}
      <model-viewer
        src="/r2/earth_hologram.glb"
        alt="Earth Hologram"
        auto-rotate
        camera-controls
        disable-zoom
        loading="lazy"
        reveal="auto"
        rotation-per-second="30deg"
        shadow-intensity="0"
        environment-image="neutral"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '180px',
          background: 'transparent',
          '--poster-color': 'transparent',
          filter: 'hue-rotate(190deg) saturate(2) brightness(0.8) drop-shadow(0 0 15px rgba(0,212,255,0.4))',
        } as React.CSSProperties}
      />
    </div>
  );
}
