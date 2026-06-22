'use client';

import { useEffect, useRef, useState } from 'react';

interface Project {
  id: string;
  ticket: string;
  title: string;
  type: string;
  status: 'DEPLOYED' | 'MAINTAINED' | 'INTEGRATED';
  date: string;
  stack: string[];
  summary: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: 'proj-001',
    ticket: 'TKT-001',
    title: 'E-Commerce Platform',
    type: 'COMMERCE_SYS',
    status: 'DEPLOYED',
    date: '2024-Q3',
    stack: ['Django', 'Python', 'MySQL', 'React', 'AWS S3'],
    summary: 'Full-featured e-commerce system with product catalog, dynamic filtering, shopping cart, and integrated payment gateway. Built and maintained in production for a retail client.',
    highlights: [
      'Designed normalized MySQL schema for products, variants, and orders',
      'Integrated Razorpay/Stripe with webhook handlers and idempotency keys',
      'Optimized product filtering using select_related and prefetch_related',
      'Implemented AWS S3 for media storage with signed URL generation',
      'Debugged cart session persistence issues in production deployment',
    ],
  },
  {
    id: 'proj-002',
    ticket: 'TKT-002',
    title: 'Learning Management System',
    type: 'BUSINESS_APP',
    status: 'MAINTAINED',
    date: '2024-Q2',
    stack: ['Django', 'DRF', 'React', 'MySQL'],
    summary: 'LMS for managing courses, enrollments, progress tracking, and assessments. Built REST API backend consumed by a React frontend.',
    highlights: [
      'Designed course enrollment and progress tracking models',
      'Built REST API for course CRUD, enrollment, and quiz submissions',
      'Implemented role-based access control (student / instructor / admin)',
      'Resolved complex migration dependency errors after model restructuring',
      'Built admin dashboard with course completion analytics',
    ],
  },
  {
    id: 'proj-003',
    ticket: 'TKT-003',
    title: 'Hospital Management System',
    type: 'BUSINESS_APP',
    status: 'DEPLOYED',
    date: '2024-Q1',
    stack: ['Django', '.NET', 'Angular', 'MySQL'],
    summary: 'Multi-module HMS covering patient registration, appointment scheduling, billing, and staff management. Contributed to backend API and Angular frontend integration.',
    highlights: [
      'Built appointment scheduling API with conflict detection logic',
      'Developed billing module with itemized invoice generation',
      'Integrated .NET service for legacy report generation',
      'Resolved Angular HTTP interceptor and dependency injection issues',
      'Optimized patient search queries via database indexing',
    ],
  },
  {
    id: 'proj-004',
    ticket: 'TKT-004',
    title: 'Admin Dashboard Suite',
    type: 'INTERNAL_TOOL',
    status: 'INTEGRATED',
    date: '2023-Q4',
    stack: ['Django', 'Python', 'React', 'MySQL', 'AWS S3'],
    summary: 'Multi-tenant admin dashboard for managing platform data, user permissions, and third-party integrations. Focus on performance and real-time data refresh.',
    highlights: [
      'Built permission matrix system with custom Django middleware',
      'Integrated third-party analytics API with rate limiting and caching',
      'Developed export functionality (CSV / Excel) for large datasets',
      'Fixed WSGI server misconfiguration causing production 502 errors',
      'Implemented bulk operations with transaction.atomic() safety',
    ],
  },
];

const STATUS_CONFIG = {
  DEPLOYED: { color: '#28ca41', bg: 'rgba(40,202,65,0.08)', label: '● DEPLOYED' },
  MAINTAINED: { color: '#bf5fff', bg: 'rgba(191,95,255,0.08)', label: '● MAINTAINED' },
  INTEGRATED: { color: '#00e5ff', bg: 'rgba(0,229,255,0.08)', label: '● INTEGRATED' },
};

function ProjectCard({ project, index, visible }: { project: Project; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const sc = STATUS_CONFIG[project.status];

  return (
    <article
      id={project.id}
      style={{
        background: expanded ? 'rgba(14, 14, 14, 0.95)' : 'rgba(10, 10, 10, 0.8)',
        border: `2px solid ${expanded ? 'var(--border)' : 'var(--border-subtle)'}`,
        clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        overflow: 'hidden',
        transition: 'all 0.2s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transitionDelay: `${0.1 + index * 0.12}s`,
      }}
    >
      {/* Status color-coded top strip */}
      <div
        style={{
          height: '3px',
          background: `repeating-linear-gradient(90deg, ${sc.color} 0px, ${sc.color} 4px, transparent 4px, transparent 8px)`,
          opacity: 0.7,
        }}
        aria-hidden="true"
      />

      <button
        id={`project-card-${project.id}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left"
        style={{ padding: '20px 24px' }}
        aria-expanded={expanded}
      >
        {/* Row 1: ticket + title + status */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <div>
            {/* Ticket ID in pixel font */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  padding: '3px 8px',
                  border: '1px solid var(--border)',
                  background: 'rgba(191,95,255,0.05)',
                  clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
                }}
              >
                <span className="pixel-label" style={{ color: 'var(--accent)' }}>{project.ticket}</span>
              </div>
              <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>{project.type}</span>
            </div>
            <h3 className="pixel-heading-md" style={{ color: 'var(--text-primary)', display: 'block', lineHeight: '2.2' }}>
              {project.title.toUpperCase()}
            </h3>
          </div>

          {/* Status + expand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div
              style={{
                padding: '4px 10px',
                background: sc.bg,
                border: `1px solid ${sc.color}`,
                clipPath: 'polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))',
              }}
            >
              <span className="pixel-label" style={{ color: sc.color }}>{sc.label}</span>
            </div>
            <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>{project.date}</span>
          </div>
        </div>

        {/* Stack tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '10px',
                padding: '2px 8px',
                color: 'var(--text-secondary)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Summary */}
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.7', textAlign: 'left' }}>
          {project.summary}
        </p>

        {/* Expand indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <div
            style={{
              height: '1px',
              flex: 1,
              background: 'repeating-linear-gradient(90deg, var(--border-subtle) 0px, var(--border-subtle) 3px, transparent 3px, transparent 6px)',
            }}
          />
          <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>
            {expanded ? '▾ COLLAPSE' : '▸ HIGHLIGHTS'}
          </span>
        </div>
      </button>

      {/* Expanded highlights */}
      {expanded && (
        <div
          style={{
            borderTop: '2px solid var(--border-subtle)',
            padding: '16px 24px 24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div className="w-2 h-2" style={{ background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />
            <span className="pixel-label pixel-glow">SYS.HIGHLIGHTS</span>
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.highlights.map((hl, i) => (
              <li
                key={i}
                style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-pixel)',
                    fontSize: '6px',
                    color: 'var(--accent)',
                    marginTop: '3px',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '13px', lineHeight: '1.6' }}>
                  {hl}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default function DeploymentLog() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative px-6 py-24 md:py-32"
      style={{ zIndex: 1 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 20% 60%, rgba(191,95,255,0.02) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="section-label">// SECTION_04</span>
            <div
              className="flex-1 h-px"
              style={{ background: 'repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)' }}
            />
            <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>SYS LOG</span>
          </div>
          <h2 className="pixel-heading-xl pixel-glow-white" style={{ display: 'block', lineHeight: '2.6' }}>
            DEPLOYMENT_LOG
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: '14px', marginTop: '8px' }}>
            Production systems shipped and maintained. Click any ticket to read highlights.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} visible={visible} />
          ))}
        </div>

        {/* Footer log line */}
        <div
          style={{
            marginTop: '24px',
            padding: '12px 16px',
            border: '2px solid var(--border-subtle)',
            clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.6s',
          }}
        >
          <span className="pixel-label" style={{ color: 'var(--text-muted)' }}>
            // ALL PROJECTS: PRODUCTION DEPLOYED · THIRD-PARTY INTEGRATION · ACTIVE MAINTENANCE
          </span>
        </div>
      </div>
    </section>
  );
}
