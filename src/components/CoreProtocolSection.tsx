'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  code: string;
}

const STATS: StatItem[] = [
  { value: 2.5, suffix: 'yr+', label: 'Production XP', code: 'T.001' },
  { value: 10, suffix: '+', label: 'Systems Deployed', code: 'T.002' },
  { value: 10, suffix: '+', label: 'Enterprise Builds', code: 'T.003' },
  { value: 100, suffix: '%', label: 'Debug Persistence', code: 'T.004' },
];

const PHILOSOPHY = [
  {
    id: 'p1',
    code: 'MOD.01',
    title: 'DEEP SYSTEM DIAGNOSTICS',
    body: 'Persistence in diagnosing complex backend bottlenecks, whether tracing EF Core queries in .NET, resolving async task deadlocks in Celery/Django, or debugging state issues in React. I go down to the raw SQL or memory profiler until the root cause is isolated.',
  },
  {
    id: 'p2',
    code: 'MOD.02',
    title: 'ROBUST ARCHITECTURE',
    body: 'Passionate about scalable, clean code. I implement strict architectural patterns—from CQRS in enterprise services to Local-First storage in mobile apps and decoupled serverless APIs—ensuring systems scale without becoming monolithic nightmares.',
  },
  {
    id: 'p3',
    code: 'MOD.03',
    title: 'FULL-STACK BRIDGE',
    body: 'Comfortable operating across the entire stack. From writing robust .NET and Python endpoints to rendering highly interactive, Framer Motion-powered React UIs and immersive 3D WebGL experiences. I eliminate friction between data and presentation layers.',
  },
];

function useCountUp(target: number, start: boolean, duration = 1500) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const isFloat = !Number.isInteger(target);
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const prog = Math.min((ts - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      const current = eased * target;
      setCount(isFloat ? Number(current.toFixed(1)) : Math.floor(current));
      if (prog < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatBlock({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const count = useCountUp(stat.value, animate);
  return (
    <div
      className="dot-matrix-surface-led p-4 relative overflow-hidden"
      style={{
        background: 'color-mix(in srgb, var(--bg-surface) 85%, transparent)',
        border: '2px solid var(--border)',
        clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))',
      }}
    >
      {/* Ticket ID */}
      <div className="pixel-label mb-2" style={{ color: 'var(--text-muted)' }}>{stat.code}</div>
      {/* Big pixel number */}
      <div
        className="pixel-heading-lg pixel-glow"
        style={{ display: 'block', marginBottom: '6px' }}
      >
        {count}{stat.suffix}
      </div>
      {/* Label */}
      <div className="pixel-label" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
      {/* Corner accent dot */}
      <div
        className="absolute bottom-2 right-2 w-1.5 h-1.5"
        style={{ background: 'var(--accent)', boxShadow: '0 0 4px var(--accent)' }}
        aria-hidden="true"
      />
    </div>
  );
}

function PhilosophyCard({ item, index }: { item: typeof PHILOSOPHY[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="overflow-hidden transition-all duration-200"
      style={{
        background: open ? 'rgba(191, 95, 255, 0.04)' : 'color-mix(in srgb, var(--bg-surface) 70%, transparent)',
        border: `2px solid ${open ? 'var(--accent)' : 'var(--border-subtle)'}`,
        clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))',
      }}
    >
      <button
        id={`protocol-${item.id}`}
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
        aria-expanded={open}
      >
        <div className="flex items-center gap-4">
          {/* LED index indicator */}
          <div
            className="shrink-0 w-6 h-6 flex items-center justify-center"
            style={{
              background: open ? 'var(--accent)' : 'transparent',
              border: `2px solid ${open ? 'var(--accent)' : 'var(--border)'}`,
              boxShadow: open ? '0 0 10px var(--accent-glow)' : 'none',
            }}
            aria-hidden="true"
          >
            <span className="pixel-label" style={{ color: open ? 'var(--bg-base)' : 'var(--text-muted)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div>
            <span className="pixel-heading-sm" style={{ color: open ? 'var(--accent)' : 'var(--text-primary)' }}>
              {item.title}
            </span>
          </div>
        </div>
        <span className="pixel-label shrink-0" style={{ color: 'var(--text-muted)' }}>
          {item.code} {open ? '▾' : '▸'}
        </span>
      </button>

      {open && (
        <div
          style={{
            borderTop: '2px solid var(--border-subtle)',
            padding: '16px 20px 20px',
          }}
        >
          {/* Dotted divider */}
          <div
            className="h-px mb-4"
            style={{
              background: 'repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 3px, transparent 3px, transparent 6px)',
              opacity: 0.3,
            }}
          />
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.7' }}>
            {item.body}
          </p>
        </div>
      )}
    </div>
  );
}

export default function CoreProtocolSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsAnimate, setStatsAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setStatsAnimate(true), 350);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
      style={{ zIndex: 1 }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 10% 50%, rgba(191,95,255,0.03) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="section-label">// SECTION_02</span>
            <div
              className="flex-1 h-px"
              style={{
                background: 'repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)',
              }}
            />
            <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>DIAGNOSTIC MODE</span>
          </div>

          <h2 className="pixel-heading-xl pixel-glow-white" style={{ display: 'block', lineHeight: '2.6' }}>
            CORE_PROTOCOL
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '14px', marginTop: '8px', maxWidth: '480px' }}>
            System diagnostic — how I think, debug, and build production systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: stats + bio */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            <div className="pixel-label mb-4" style={{ color: 'var(--text-muted)' }}>// SYSTEM METRICS</div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {STATS.map((stat) => (
                <StatBlock key={stat.code} stat={stat} animate={statsAnimate} />
              ))}
            </div>

            {/* Bio card */}
            <div
              className="dot-matrix-surface-subtle p-5 relative"
              style={{
                background: 'color-mix(in srgb, var(--bg-surface) 70%, transparent)',
                border: '2px solid var(--border-subtle)',
                clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))',
              }}
            >
              {/* Pixel heading for card */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} aria-hidden="true" />
                <span className="pixel-label pixel-glow">SYSTEM.BIO</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.75' }}>
                I&apos;m a practical problem solver with 2+ years of production experience.
                My primary strength is building and troubleshooting enterprise full-stack applications — specifically in the .NET Core ecosystem.
                When something breaks in production, I trace it methodically: EF Core query → Mediator pipeline → service layer → Angular UI.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.75', marginTop: '10px' }}>
                I bridge the frontend-backend gap — writing scalable .NET REST APIs that perform well, and building intuitive Angular UI components that consume them seamlessly.
              </p>
            </div>
          </div>

          {/* Right: philosophy modules */}
          <div
            className="space-y-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <div className="pixel-label mb-4" style={{ color: 'var(--text-muted)' }}>// EXPAND TO READ MODULE</div>
            {PHILOSOPHY.map((item, i) => (
              <PhilosophyCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
