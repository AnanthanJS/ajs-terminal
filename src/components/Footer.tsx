export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative px-6 py-10"
      style={{ zIndex: 1 }}
    >
      {/* Pixel-march top border */}
      <div
        style={{
          height: '3px',
          marginBottom: '32px',
          background: 'repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--accent-dim)',
              border: '2px solid var(--accent)',
              clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
              boxShadow: '0 0 8px var(--accent-glow)'
            }}
            aria-hidden="true"
          >
            <span className="pixel-label pixel-glow" style={{ color: 'var(--accent)' }}>A</span>
          </div>
          <span className="pixel-heading-sm pixel-glow-white">AJS.TERMINAL</span>
          <span className="pixel-label" style={{ color: 'var(--accent)', textShadow: '0 0 8px var(--accent-glow)' }}>v2.0.0</span>
        </div>

        <span className="pixel-label" style={{ color: 'var(--text-primary)', textAlign: 'center', textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
          © {year} ANANTHAKRISHNAN J S — BUILT WITH NEXTJS
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div
            className="w-1.5 h-1.5"
            style={{ background: '#28ca41', boxShadow: '0 0 6px #28ca41' }}
            aria-hidden="true"
          />
          <span className="pixel-label" style={{ color: '#28ca41' }}>ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
