'use client';

export default function CRTOverlay() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        // SVG filter for chromatic aberration is defined in layout.tsx
        filter: 'url(#crt-aberration)',
      }}
      aria-hidden="true"
    >
      {/* Scanline pattern — very subtle overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          mixBlendMode: 'multiply',
        }}
      />
      
      {/* CRT curvature vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 60%, var(--vignette, rgba(0,0,0,0.7)) 150%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.4)',
        }}
      />

      {/* Screen tint / reflection */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 40%, var(--crt-tint, rgba(50,0,80,0.04)) 100%)',
        }}
      />
    </div>
  );
}
